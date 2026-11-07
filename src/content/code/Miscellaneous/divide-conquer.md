---
title: "Divide and Conquer"
description: "recursively breaks down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly."
time: "Mon Oct 20, 2025"
---

# Divide and Conquer

## Quick Sort (快速排序)

```cpp
template<class T> void quick_sort(T *a, int l, int r) { // sorts a[l..r]
    int i = l, j = r; T mid = a[l + (r - l) / 2]; //基准存值而不是下标（交换会移动a[mid]）
    while (i <= j) { //等号不能少
        while (a[i] < mid) i++; //左半寻找不小于mid的（用<=会越界）
        while (a[j] > mid) j--; //右半寻找不大于mid的
        if (i <= j) swap(a[i++], a[j--]); //交换大小，使得mid左边都小于mid，右边都大于mid
    }
    if (i < r) quick_sort(a, i, r); //区间边界
    if (j > l) quick_sort(a, l, j);
}
```

## Merge Sort (归并排序)

$O(n \log n)$, 稳定排序算法，适合链表排序和大数据排序（外部排序）。

```cpp
template<class T> ll merge_sort(T *a, T *b, int l, int r) { // sorts a[l..r] (b: buffer of the same size), returns the number of inversions
    if (l >= r) return 0; //base case
    int mid = (l + r) >> 1;
    ll inv = merge_sort(a, b, l, mid) + merge_sort(a, b, mid + 1, r);
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) { //排序
        if (a[i] <= a[j]) b[k++] = a[i++];
        else b[k++] = a[j++], inv += mid - i + 1; //a[i..mid] are all > a[j]
    }
    while (i <= mid) b[k++] = a[i++]; //左剩余
    while (j <= r) b[k++] = a[j++]; //右剩余
    for (int u = l; u <= r; u++) a[u] = b[u]; //剩余转移
    return inv;
}
```

## Binary Exponentiation (快速幂)

```cpp
ll binpow(ll a, ll b, ll p) { // a^b mod p, b >= 0
    ll res = 1 % p; //p = 1 时结果为 0
    a %= p; if (a < 0) a += p; //防止a过大
    for (; b; b >>= 1, a = (__int128)a * a % p) //__int128: p may exceed 2^31
        if (b & 1) res = (__int128)res * a % p; //奇数补一项
    return res;
}
```

## Binary Search (二分查找)

数组有序

```cpp
// a[l..r] sorted ascending; first position of aim, or -1
template<class T> int binary_search(const T *a, int l, int r, T aim) {
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] > aim) r = mid - 1;
        else if (a[mid] < aim) l = mid + 1;
        else ans = mid, r = mid - 1; //找到后继续向左，得到最左边的aim
    }
    return ans;
}
// with STL: lower_bound(a + l, a + r + 1, aim) - a  (first >= aim)
//           upper_bound(a + l, a + r + 1, aim) - a  (first >  aim)
```

## Karatsuba Multiplication

- Input: two $n$-digit big numbers $X$ and $Y$.  
- Output: the product $Z = X \cdot Y$.

Core idea: reduce the number of multiplications from 4 to 3.

Algorithm:
1. Split $X$ and $Y$ into two halves: $m = \lfloor \frac{n}{2} \rfloor$.
    - $X = X_l \cdot 10^{m} + X_r$
    - $Y = Y_l \cdot 10^{m} + Y_r$
    - $Z = (X_l Y_l) \cdot 10^{2m} + (X_l Y_r + X_r Y_l) \cdot 10^{m} + (X_r Y_r)$
2. Compute three products recursively:
    - $P_1 = X_l \cdot Y_l$
    - $P_2 = X_r \cdot Y_r$
    - $P_3 = (X_l + X_r) \cdot (Y_l + Y_r)$
3. Combine the results:
$$Z = P_1 \cdot 10^{2m} + (P_3 - P_1 - P_2) \cdot 10^{m} + P_2$$

$T(n) = 3T(\frac{n}{2}) + O(n)$.  
$O(n^{\log_2 3})$, faster than the traditional $O(n^2)$ algorithm.

```cpp
ll karatsuba(ll X, ll Y) { // illustration only: real big numbers use digit vectors (see Bignum / FFT)
    if (X < 10 || Y < 10) return X * Y; // base case
    int m = max(to_string(X).size(), to_string(Y).size()) / 2;
    ll power = 1;
    for (int i = 0; i < m; i++) power *= 10;
    ll Xl = X / power, Xr = X % power;
    ll Yl = Y / power, Yr = Y % power;
    ll P1 = karatsuba(Xl, Yl);
    ll P2 = karatsuba(Xr, Yr);
    ll P3 = karatsuba(Xl + Xr, Yl + Yr);
    return P1 * power * power + (P3 - P1 - P2) * power + P2;
}
```

### Toom-Cook Multiplication

Split the numbers into $k$ parts

$O(n^{\log_k (2k - 1)})$.

## k-th Rank Selection (第k小数)

- Input: an array $A$ of $n$ numbers and an integer $k$.
- Output: the $k$-th smallest number in $A$.

Steps:
1. Randomly select a pivot $p$ from $A$.
2. Partition $A$ into three parts:
   - $A_1 = \{x \in A | x < p\}$
   - $A_2 = \{x \in A | x = p\}$
   - $A_3 = \{x \in A | x > p\}$
3. If $|A_1| \geq k$, the $k$-th smallest number is in $A_1$.
4. If $|A_1| + |A_2| \geq k$, the $k$-th smallest number is $p$.

```cpp
template<class T> T kth_rank(T *a, int l, int r, int k) { // k-th smallest of a[l..r] (1-based k), reorders a; O(n) expected
    static mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    while (l < r) {
        T pivot = a[l + rng() % (r - l + 1)]; //随机选取一个数作为pivot
        int i = l, j = r;
        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;
            if (i <= j) swap(a[i++], a[j--]);
        }
        if (k <= j - l + 1) r = j;
        else if (k > i - l) k -= i - l, l = i;
        else return pivot;
    }
    return a[l];
}
// with STL: nth_element(a + l, a + l + k - 1, a + r + 1); a[l + k - 1]
```

## Closest Pair of Points (最近点对)

Complexity: $O(n \log n)$: the recursion also merge-sorts the points by $y$, so the strip is already sorted. Distances are squared and exact (`ll`); take `sqrt` at the end if needed.

Steps:
1. Sort the points by their x-coordinates.
2. Divide the points into two halves.
3. Recursively find the closest pair in each half.
4. Find the closest pair that straddles the dividing line.
5. Use a strip of width $2d$ centered on the dividing line, where $d$ is the minimum distance found in the two halves.
6. For each point in the strip, check only the next 7 points in the sorted order by y-coordinate to find the closest pair.

```cpp
struct Pt { ll x, y; };
ll closest_pair(vector<Pt> p) { // minimum squared distance, p.size() >= 2, |x|, |y| <= 1e9
    auto d2 = [](const Pt &a, const Pt &b) { return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y); };
    auto byy = [](const Pt &a, const Pt &b) { return a.y < b.y; };
    sort(p.begin(), p.end(), [](const Pt &a, const Pt &b) { return a.x < b.x; });
    vector<Pt> strip(p.size());
    function<ll(int, int)> rec = [&](int l, int r) -> ll { // [l, r), returns sorted by y
        if (r - l <= 3) { // base case
            ll d = LLONG_MAX;
            for (int i = l; i < r; i++) for (int j = i + 1; j < r; j++) d = min(d, d2(p[i], p[j]));
            sort(p.begin() + l, p.begin() + r, byy);
            return d;
        }
        int m = (l + r) / 2; ll midx = p[m].x;
        ll d = min(rec(l, m), rec(m, r));
        inplace_merge(p.begin() + l, p.begin() + m, p.begin() + r, byy);
        int k = 0;
        for (int i = l; i < r; i++) {
            if ((p[i].x - midx) * (p[i].x - midx) >= d) continue; // outside the strip of width 2d
            for (int j = k - 1; j >= 0 && (p[i].y - strip[j].y) * (p[i].y - strip[j].y) < d; j--)
                d = min(d, d2(p[i], strip[j]));
            strip[k++] = p[i];
        }
        return d;
    };
    return rec(0, p.size());
}
```