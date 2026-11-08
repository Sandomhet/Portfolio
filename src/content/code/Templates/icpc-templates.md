---
title: "ICPC Templates"
description: "Printable ICPC C++ templates ordered by priority, with the minimum notes needed to recall each one."
time: "Sat Oct 3, 2026"
---

# ICPC Templates

**1. Starter & Essentials**: Starter, Discretization, Binary / Ternary Search on Answer, Fast Power  
**2. Data Structures**: Disjoint Set Union, Binary Indexed Tree, Sparse Table (RMQ), Segment Tree (Lazy), Dynamic Segment Tree + Merge, Persistent Segment Tree, FHQ Treap, Splay, Mo's Algorithm, Square Root Decomposition, Li Chao Tree, Segment Tree Beats, Cartesian Tree, K-D Tree  
**3. Graph & Tree**: Graph Storage, Dijkstra, SPFA / Negative Cycle, 0-1 BFS, Floyd, Topological Sort, Minimum Spanning Tree, LCA (Binary Lifting, Tarjan), Heavy-Light Decomposition, Tarjan: SCC, Cut Vertex, Bridge, 2-SAT, Max Flow (Dinic) and Min-Cost Flow, Bipartite Graph, Centroid Decomposition, Virtual Tree  
**4. Math**: GCD, Exgcd, Inverse, Primes and Sieves, Combinatorics, CRT / exCRT, BSGS, Matrix Fast Power, Gaussian Elimination, XOR Linear Basis, Möbius Inversion  
**5. String**: String Hash, KMP, Manacher, Trie, Aho–Corasick  
**6. Dynamic Programming**: Knapsack, LIS / LCS, Interval DP  
**7. Miscellaneous**: Simulated Annealing, Closest Pair of Points, Cantor Expansion, Bignum (Minimal)  
**8. Polynomial**: FFT, NTT  
**9. Appendix**: STL Cheat Sheet, Fast I/O, Stress Test (Linux)  

## 1. Starter & Essentials

### 1.1 Starter

Each topic keeps one indexing base and one container style throughout, stated in the comments of its code (for example `a[1..n]`); different topics may differ when their problems call for it.

```cpp
// g++ -std=c++17 -O2 test.cpp -o p && ./p < test.in > test.out
#define sandom signed
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std; using ll = long long; using ull = unsigned long long; using pii = pair<int, int>;
const int Z = 1e5 + 10, inf = 2e9, mod = 998244353;

int n, m, k, ans;
sandom main() {
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    return 0;
}
/**/
```

### 1.2 Discretization

Value $\to$ rank among distinct values, order preserved. $O(n \log n)$

```cpp
// a[1..n] (a.size() == n + 1) becomes ranks 1..len; returns vals[1..len], vals[r] = the original value of rank r
vector<ll> discrete(vector<ll> &a) {
    vector<ll> vals(a.begin() + 1, a.end()); //转移临时数组
    sort(vals.begin(), vals.end()); //排序
    vals.erase(unique(vals.begin(), vals.end()), vals.end()); //去重
    vals.insert(vals.begin(), 0); //vals[0] unused
    for (size_t i = 1; i < a.size(); i++) a[i] = lower_bound(vals.begin() + 1, vals.end(), a[i]) - vals.begin(); //离散
    return vals;
}
```

Usage:

```cpp
vector<ll> a(n + 1);         // a[1..n]
auto vals = discrete(a);
int len = vals.size() - 1;   // a[i] in 1..len now, original value = vals[a[i]]
```

### 1.3 Binary / Ternary Search on Answer

Binary search: `check` monotone, find the last `mid` with `check(mid)` true. Ternary search: unimodal $f$, drop the worse third each step.

```cpp
// check monotone: true ... true false ... false. Largest x in [l, r] with check(x), or l - 1 if none
ll last_true(ll l, ll r, function<bool(ll)> check) { //二分答案
    ll ans = l - 1;
    while (l <= r) {
        ll mid = l + (r - l) / 2;
        if (check(mid)) ans = mid, l = mid + 1;
        else r = mid - 1;
    }
    return ans;
}
// check monotone: false ... false true ... true. Smallest x in [l, r] with check(x), or r + 1 if none
ll first_true(ll l, ll r, function<bool(ll)> check) {
    ll ans = r + 1;
    while (l <= r) {
        ll mid = l + (r - l) / 2;
        if (check(mid)) ans = mid, r = mid - 1;
        else l = mid + 1;
    }
    return ans;
}
// real numbers: 100 halvings are enough for any double range
double last_true_real(double l, double r, function<bool(double)> check, int it = 100) {
    while (it--) {
        double mid = (l + r) / 2;
        if (check(mid)) l = mid; else r = mid;
    }
    return l;
}
```

Usage:

```cpp
ll x = last_true(0, (ll)1e18, [&](ll mid) { return cost(mid) <= budget; });  // 最大值最小 / 最小值最大
ll y = first_true(1, n, [&](ll mid) { return pre[mid] >= k; });
double r = last_true_real(0, 1e9, [&](double mid) { return feasible(mid); });
```

```cpp
// f unimodal on integers (strictly decreasing then strictly increasing): returns an argmin in [l, r]
ll ternary_min(ll l, ll r, function<ll(ll)> f) { //单谷函数求最小值（单峰函数传 -f）
    while (r - l > 2) { //区间太小时lmid、rmid可能与端点重合，不再缩小
        ll lmid = l + (r - l) / 3, rmid = r - (r - l) / 3;
        if (f(lmid) < f(rmid)) r = rmid;
        else l = lmid;
    }
    ll best = l;
    for (ll i = l + 1; i <= r; i++) if (f(i) < f(best)) best = i; //剩下不超过3个点直接枚举
    return best;
}
double ternary_min_real(double l, double r, function<double(double)> f, int it = 200) {
    while (it--) {
        double lmid = l + (r - l) / 3, rmid = r - (r - l) / 3;
        if (f(lmid) < f(rmid)) r = rmid;
        else l = lmid;
    }
    return (l + r) / 2;
}
```

Usage:

```cpp
ll x = ternary_min(1, n, [&](ll i) { return calc(i); });         // f(x) is the minimum
double t = ternary_min_real(0, 1e4, [&](double v) { return g(v); });
```

### 1.4 Fast Power

$a^b \bmod c$ in $O(\log b)$.

```cpp
ll binpow(ll a, ll b, ll p) { // a^b mod p, b >= 0
    ll res = 1 % p; //p = 1 时结果为 0
    a %= p; if (a < 0) a += p; //防止a过大
    for (; b; b >>= 1, a = (__int128)a * a % p) //__int128: p may exceed 2^31
        if (b & 1) res = (__int128)res * a % p; //奇数补一项
    return res;
}
```

## 2. Data Structures

### 2.1 Disjoint Set Union

Path compression + union by size: $O(\alpha(n))$ per operation.

```cpp
struct DSU {
    vector<int> pa, sz;
    DSU(int n) : pa(n + 1), sz(n + 1, 1) { for (int i = 1; i <= n; i++) pa[i] = i; }
    // path compression
    inline int find(int x) { return x == pa[x] ? x : pa[x] = find(pa[x]); }
    // union by size
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false; // already in the same set
        if (sz[x] < sz[y]) swap(x, y);
        pa[y] = x, sz[x] += sz[y];
        return true;
    }
    bool same(int x, int y) { return find(x) == find(y); }
    int size(int x) { return sz[find(x)]; }
};
```

Usage:

```cpp
DSU dsu(n);        // after n is read
dsu.unite(x, y);   // false if x and y were already together
dsu.same(x, y);    // in the same set?
dsu.size(x);       // size of the set containing x

// 种类并查集 (enemies): x and x + n are opposite sides
DSU d(2 * n);
d.unite(x, y + n), d.unite(x + n, y);   // x and y are enemies
d.same(x, y + n);                        // are x and y known enemies?
d.same(x, x + n);                        // contradiction
```

```cpp
struct WDSU {
    vector<int> pa; vector<ll> d; // d[x] = w[x] - w[pa[x]]
    WDSU(int n) : pa(n + 1), d(n + 1) { for (int i = 1; i <= n; i++) pa[i] = i; }
    int find(int x) {
        if (x == pa[x]) return x;
        int r = find(pa[x]);
        d[x] += d[pa[x]];
        return pa[x] = r;
    }
    bool unite(int x, int y, ll v) { // w[y] - w[x] = v, false on contradiction
        int rx = find(x), ry = find(y);
        if (rx == ry) return d[y] - d[x] == v;
        pa[ry] = rx, d[ry] = d[x] + v - d[y];
        return true;
    }
    bool same(int x, int y) { return find(x) == find(y); }
    ll diff(int x, int y) { find(x), find(y); return d[y] - d[x]; } // w[y] - w[x], same set only
};
```

Usage:

```cpp
WDSU w(n);
w.unite(x, y, v);  // w[y] - w[x] = v, false if it contradicts earlier facts
if (w.same(x, y)) w.diff(x, y); // w[y] - w[x]

// parity (mod 2) version: store d[x] in {0, 1} and replace + / - with ^
```

### 2.2 Binary Indexed Tree

$\operatorname{lowbit}(i) = i \,\&\, (-i)$, $c_i = \sum_{j = i - \operatorname{lowbit}(i) + 1}^{i} a_j$. Range add + range sum with difference $d$:
$$\sum_{i=1}^{x} a_i = (x+1) \sum_{j=1}^{x} d_j - \sum_{j=1}^{x} j \cdot d_j$$
2D: $\sum_{i \le x, j \le y} a_{i,j} = (x+1)(y+1)\sum d - (y+1)\sum d \, i - (x+1)\sum d \, j + \sum d \, ij$.

```cpp
struct BIT {
    int n; vector<ll> c;
    BIT(int n) : n(n), c(n + 1) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, ll v) {
        for (; x <= n; x += lowbit(x))
            c[x] += v;
    }
    ll sum(int x) {
        ll s = 0;
        for (; x; x -= lowbit(x))
            s += c[x];
        return s;
    }
    ll sum(int l, int r) { return sum(r) - sum(l - 1); }
    int kth(ll k) { // smallest x with sum(x) >= k, all values >= 0
        int x = 0;
        for (int b = __lg(n); b >= 0; b--)
            if (x + (1 << b) <= n && c[x + (1 << b)] < k)
                x += 1 << b, k -= c[x];
        return x + 1;
    }
};
```

Usage:

```cpp
BIT bit(n);
for (int i = 1; i <= n; i++) bit.add(i, a[i]);
bit.add(x, v); // a[x] += v
bit.sum(l, r); // a[l] + ... + a[r]
bit.kth(k);    // smallest x with a[1] + ... + a[x] >= k

// range add, point query: BIT on the difference d[i] = a[i] - a[i - 1]
for (int i = 1; i <= n; i++) bit.add(i, a[i] - a[i - 1]);
bit.add(l, v), bit.add(r + 1, -v); // a[l..r] += v
bit.sum(x);                        // a[x]

// inversion pairs after a[] discretized to 1..m (逆序对)
BIT bit(m); ll inv = 0;
for (int i = 1; i <= n; i++) {
    inv += i - 1 - bit.sum(a[i]);
    bit.add(a[i], 1);
}
```

```cpp
struct RangeBIT {
    int n; vector<ll> d, e; // d: difference, e: i * difference
    RangeBIT(int n) : n(n), d(n + 1), e(n + 1) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, ll v) {
        for (int i = x; i <= n; i += lowbit(i))
            d[i] += v, e[i] += v * x;
    }
    void add(int l, int r, ll v) { add(l, v), add(r + 1, -v); }
    ll sum(int x) {
        ll s = 0;
        for (int i = x; i; i -= lowbit(i))
            s += (x + 1) * d[i] - e[i];
        return s;
    }
    ll sum(int l, int r) { return sum(r) - sum(l - 1); }
};
```

Usage:

```cpp
RangeBIT bit(n);
for (int i = 1; i <= n; i++) bit.add(i, i, a[i]);
bit.add(l, r, v); // a[l..r] += v
bit.sum(l, r);    // a[l] + ... + a[r]
```

```cpp
struct BIT2D {
    int n, m; vector<vector<ll>> c;
    BIT2D(int n, int m) : n(n), m(m), c(n + 1, vector<ll>(m + 1)) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, int y, ll v) {
        for (int i = x; i <= n; i += lowbit(i))
            for (int j = y; j <= m; j += lowbit(j))
                c[i][j] += v;
    }
    ll sum(int x, int y) {
        ll s = 0;
        for (int i = x; i; i -= lowbit(i))
            for (int j = y; j; j -= lowbit(j))
                s += c[i][j];
        return s;
    }
    ll sum(int x1, int y1, int x2, int y2) {
        return sum(x2, y2) - sum(x1 - 1, y2) - sum(x2, y1 - 1) + sum(x1 - 1, y1 - 1);
    }
};
```

Usage:

```cpp
BIT2D bit(n, m);
bit.add(x, y, v);        // a[x][y] += v
bit.sum(x1, y1, x2, y2); // sum of rows x1..x2, columns y1..y2

// rectangle add, point query: BIT2D on d[i][j] = a[i][j] - a[i - 1][j] - a[i][j - 1] + a[i - 1][j - 1]
bit.add(x1, y1, v), bit.add(x1, y2 + 1, -v);         // a[x1..x2][y1..y2] += v
bit.add(x2 + 1, y1, -v), bit.add(x2 + 1, y2 + 1, v);
bit.sum(x, y);                                       // a[x][y]
```

```cpp
struct RangeBIT2D {
    int n, m; vector<vector<array<ll, 4>>> c; // d, d*i, d*j, d*i*j
    RangeBIT2D(int n, int m) : n(n), m(m), c(n + 1, vector<array<ll, 4>>(m + 1)) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, int y, ll v) {
        for (int i = x; i <= n; i += lowbit(i))
            for (int j = y; j <= m; j += lowbit(j)) {
                auto &t = c[i][j];
                t[0] += v, t[1] += v * x, t[2] += v * y, t[3] += v * x * y;
            }
    }
    void add(int x1, int y1, int x2, int y2, ll v) {
        add(x1, y1, v), add(x1, y2 + 1, -v);
        add(x2 + 1, y1, -v), add(x2 + 1, y2 + 1, v);
    }
    ll sum(int x, int y) {
        ll s = 0;
        for (int i = x; i; i -= lowbit(i))
            for (int j = y; j; j -= lowbit(j)) {
                auto &t = c[i][j];
                s += ll(x + 1) * (y + 1) * t[0] - (y + 1) * t[1] - (x + 1) * t[2] + t[3];
            }
        return s;
    }
    ll sum(int x1, int y1, int x2, int y2) {
        return sum(x2, y2) - sum(x1 - 1, y2) - sum(x2, y1 - 1) + sum(x1 - 1, y1 - 1);
    }
};
```

Usage:

```cpp
RangeBIT2D bit(n, m);
bit.add(x1, y1, x2, y2, v); // a[x1..x2][y1..y2] += v
bit.sum(x1, y1, x2, y2);    // sum of rows x1..x2, columns y1..y2
```

### 2.3 Sparse Table (RMQ)

$dp_{i,j} = \max(dp_{i,j-1}, dp_{i+2^{j-1},j-1})$; query with $t = \lfloor \log_2(r-l+1) \rfloor$. $O(1)$ query.

```cpp
struct SparseTable {
    vector<vector<ll>> f;
    static ll op(ll x, ll y) { return max(x, y); } // min / __gcd / & / | also work
    SparseTable(const vector<ll> &a) { // a[1..n], a.size() == n + 1
        int n = a.size() - 1;
        f.assign(__lg(max(n, 1)) + 1, vector<ll>(n + 1));
        for (int i = 1; i <= n; i++) f[0][i] = a[i];
        for (int j = 1; j < (int)f.size(); j++)
            for (int i = 1; i + (1 << j) - 1 <= n; i++)
                f[j][i] = op(f[j - 1][i], f[j - 1][i + (1 << (j - 1))]);
    }
    ll query(int l, int r) {
        int t = __lg(r - l + 1);
        return op(f[t][l], f[t][r - (1 << t) + 1]);
    }
};
```

Usage:

```cpp
SparseTable st(a); // vector<ll> a(n + 1), a[1..n]
st.query(l, r);    // op over a[l..r]; edit op() for min / gcd
```

### 2.4 Segment Tree (Lazy)

Node covers `[l, r]`, children `2rt`, `2rt+1`; push lazy tags down only when entering a node. $O(\log n)$ per operation.

```cpp
struct SegTree {
    struct Node {
        ll sum = 0, mx = -inf; int len = 0;
        friend Node operator+(const Node &a, const Node &b) { return {a.sum + b.sum, std::max(a.mx, b.mx), a.len + b.len}; }
    };
    int n; vector<Node> t; vector<ll> lz;
    SegTree(int n) : n(n), t(n << 2), lz(n << 2) {}
    void apply(int rt, ll v) { t[rt].sum += v * t[rt].len, t[rt].mx += v, lz[rt] += v; }
    void pushdown(int rt) {
        if (lz[rt]) apply(rt << 1, lz[rt]), apply(rt << 1 | 1, lz[rt]), lz[rt] = 0;
    }
    void build(const vector<ll> &a, int rt, int l, int r) {
        if (l == r) { t[rt] = {a[l], a[l], 1}; return; }
        int mid = (l + r) >> 1;
        build(a, rt << 1, l, mid), build(a, rt << 1 | 1, mid + 1, r);
        t[rt] = t[rt << 1] + t[rt << 1 | 1];
    }
    void update(int rt, int l, int r, int x, int y, ll v) {
        if (x <= l && r <= y) { apply(rt, v); return; }
        pushdown(rt);
        int mid = (l + r) >> 1;
        if (x <= mid) update(rt << 1, l, mid, x, y, v);
        if (y > mid) update(rt << 1 | 1, mid + 1, r, x, y, v);
        t[rt] = t[rt << 1] + t[rt << 1 | 1];
    }
    void assign(int rt, int l, int r, int p, ll v) {
        if (l == r) { t[rt] = {v, v, 1}; return; }
        pushdown(rt);
        int mid = (l + r) >> 1;
        if (p <= mid) assign(rt << 1, l, mid, p, v);
        else assign(rt << 1 | 1, mid + 1, r, p, v);
        t[rt] = t[rt << 1] + t[rt << 1 | 1];
    }
    Node query(int rt, int l, int r, int x, int y) {
        if (x <= l && r <= y) return t[rt];
        pushdown(rt);
        int mid = (l + r) >> 1;
        if (y <= mid) return query(rt << 1, l, mid, x, y);
        if (x > mid) return query(rt << 1 | 1, mid + 1, r, x, y);
        return query(rt << 1, l, mid, x, y) + query(rt << 1 | 1, mid + 1, r, x, y);
    }
    // 1-indexed interface
    void build(const vector<ll> &a) { build(a, 1, 1, n); }          // a[1..n], a.size() == n + 1
    void add(int l, int r, ll v) { update(1, 1, n, l, r, v); }       // a[l..r] += v
    void assign(int p, ll v) { assign(1, 1, n, p, v); }              // a[p] = v
    Node query(int l, int r) { return query(1, 1, n, l, r); }
    ll sum(int l, int r) { return query(l, r).sum; }
    ll max(int l, int r) { return query(l, r).mx; }
};
```

Usage:

```cpp
SegTree seg(n);
seg.build(a);      // vector<ll> a(n + 1), a[1..n]
seg.add(l, r, v);  // a[l..r] += v
seg.assign(p, v);  // a[p] = v
seg.sum(l, r);     // a[l] + ... + a[r]
seg.max(l, r);     // max of a[l..r]
seg.query(l, r);   // the whole Node of [l, r]
```

### 2.5 Dynamic Segment Tree + Merge

Many trees share one node pool and a tree is its root index (`0` = empty). Each point update creates $O(\log V)$ nodes; merging everything costs $O(\text{total nodes})$.

```cpp
struct DynSeg { // value range [L, R]; node 0 is the empty tree
    int L, R, tot = 0; vector<int> lc, rc; vector<ll> sum;
    DynSeg(int L, int R, int cap) : L(L), R(R), lc(cap + 1), rc(cap + 1), sum(cap + 1) {}
    void update(int &rt, int l, int r, int p, ll v) {
        if (!rt) rt = ++tot;
        sum[rt] += v;
        if (l == r) return;
        int mid = l + (r - l) / 2;
        if (p <= mid) update(lc[rt], l, mid, p, v);
        else update(rc[rt], mid + 1, r, p, v);
    }
    ll query(int rt, int l, int r, int x, int y) {
        if (!rt || y < l || r < x) return 0;
        if (x <= l && r <= y) return sum[rt];
        int mid = l + (r - l) / 2;
        return query(lc[rt], l, mid, x, y) + query(rc[rt], mid + 1, r, x, y);
    }
    int kth(int rt, int l, int r, ll k) {
        if (l == r) return l;
        int mid = l + (r - l) / 2;
        if (sum[lc[rt]] >= k) return kth(lc[rt], l, mid, k);
        return kth(rc[rt], mid + 1, r, k - sum[lc[rt]]);
    }
    int merge(int a, int b, int l, int r) { // b is merged into a; b must not be used afterwards
        if (!a || !b) return a + b;
        sum[a] += sum[b];
        if (l == r) return a;
        int mid = l + (r - l) / 2;
        lc[a] = merge(lc[a], lc[b], l, mid);
        rc[a] = merge(rc[a], rc[b], mid + 1, r);
        return a;
    }
    void add(int &rt, int p, ll v) { update(rt, L, R, p, v); }           // cnt[p] += v
    ll query(int rt, int l, int r) { return query(rt, L, R, l, r); }    // cnt[l] + ... + cnt[r]
    int kth(int rt, ll k) { return kth(rt, L, R, k); }                  // smallest p with cnt[L..p] >= k
    int merge(int a, int b) { return merge(a, b, L, R); }
};
```

Usage:

```cpp
DynSeg T(1, 1e9, 20 * 32 * 100000);  // value range, node capacity
vector<int> root(n + 1);              // one tree per vertex, all empty
T.add(root[u], x, 1);                 // insert value x into the tree of u
T.query(root[u], l, r);               // how many values of u lie in [l, r]
T.kth(root[u], k);                    // k-th smallest value of u
root[u] = T.merge(root[u], root[v]);  // tree DP: merge child v into u
```

### 2.6 Persistent Segment Tree

Each update copies one root-to-leaf path; version $i$ is `rt[i]`. On a value-indexed tree, `rt[r]` minus `rt[l-1]` gives counts in $a_l..a_r$ ($k$-th smallest in a range).

```cpp
struct PersistSeg { // value range [L, R]
    int L, R, tot = 0; vector<int> lc, rc, cnt;
    PersistSeg(int L, int R, int cap) : L(L), R(R), lc(cap + 1), rc(cap + 1), cnt(cap + 1) {}
    int insert(int pre, int l, int r, int p, int v) {
        int rt = ++tot;
        lc[rt] = lc[pre], rc[rt] = rc[pre], cnt[rt] = cnt[pre] + v; //继承上一个历史版本
        if (l == r) return rt;
        int mid = l + (r - l) / 2;
        if (p <= mid) lc[rt] = insert(lc[pre], l, mid, p, v);
        else rc[rt] = insert(rc[pre], mid + 1, r, p, v);
        return rt;
    }
    int kth(int u, int v, int l, int r, int k) {
        if (l == r) return l;
        int mid = l + (r - l) / 2, c = cnt[lc[v]] - cnt[lc[u]];
        if (k <= c) return kth(lc[u], lc[v], l, mid, k);
        return kth(rc[u], rc[v], mid + 1, r, k - c);
    }
    int count(int u, int v, int l, int r, int x, int y) {
        if (y < l || r < x || cnt[v] - cnt[u] == 0) return 0;
        if (x <= l && r <= y) return cnt[v] - cnt[u];
        int mid = l + (r - l) / 2;
        return count(lc[u], lc[v], l, mid, x, y) + count(rc[u], rc[v], mid + 1, r, x, y);
    }
    int insert(int pre, int p, int v = 1) { return insert(pre, L, R, p, v); } // new version: cnt[p] += v
    int kth(int u, int v, int k) { return kth(u, v, L, R, k); }               // k-th smallest in version v minus version u
    int count(int u, int v, int x, int y) { return count(u, v, L, R, x, y); }  // values in [x, y], version v minus version u
};
```

Usage:

```cpp
// k-th smallest of a[l..r] (discretize a[] to 1..m first if values are large)
PersistSeg T(1, m, n * 20);
vector<int> rt(n + 1);
for (int i = 1; i <= n; i++) rt[i] = T.insert(rt[i - 1], a[i]);
T.kth(rt[l - 1], rt[r], k);       // k-th smallest of a[l..r]
T.count(rt[l - 1], rt[r], x, y);  // how many a[l..r] lie in [x, y]
```

### 2.7 FHQ Treap

No rotations. `split(rt, v)`: keys $\le v$ / $> v$; `merge(x, y)`: larger `dat` on top. `prev`/`next` return `-inf`/`inf` if none. Expected $O(\log n)$. `FHQSeq` splits by size for sequence operations (range reverse).

```cpp
struct FHQ {
    struct Node { int ch[2], pri, siz; ll val; };
    vector<Node> t; int root = 0, tot = 0; mt19937 rng{random_device{}()};
    FHQ(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + 1; }
    void split(int x, ll v, int &a, int &b) { // a: <= v, b: > v
        if (!x) { a = b = 0; return; }
        if (t[x].val <= v) a = x, split(t[x].ch[1], v, t[x].ch[1], b);
        else b = x, split(t[x].ch[0], v, a, t[x].ch[0]);
        pushup(x);
    }
    int merge(int a, int b) {
        if (!a || !b) return a + b;
        if (t[a].pri > t[b].pri) { t[a].ch[1] = merge(t[a].ch[1], b), pushup(a); return a; }
        t[b].ch[0] = merge(a, t[b].ch[0]), pushup(b); return b;
    }
    void insert(ll v) {
        int a, b;
        t[++tot] = {{0, 0}, (int)rng(), 1, v};
        split(root, v, a, b);
        root = merge(merge(a, tot), b);
    }
    void erase(ll v) { //只删除一个
        int a, b, c;
        split(root, v, a, c), split(a, v - 1, a, b);
        if (b) b = merge(t[b].ch[0], t[b].ch[1]); //删除全部: b = 0
        root = merge(merge(a, b), c);
    }
    int rank(ll v) {
        int a, b;
        split(root, v - 1, a, b);
        int res = t[a].siz + 1;
        root = merge(a, b);
        return res;
    }
    ll kth(int k) {
        for (int x = root; ; ) {
            int l = t[x].ch[0];
            if (k <= t[l].siz) x = l;
            else if (k == t[l].siz + 1) return t[x].val;
            else k -= t[l].siz + 1, x = t[x].ch[1];
        }
    }
    ll prev(ll v) { ll res = -inf; for (int x = root; x; ) if (t[x].val < v) res = t[x].val, x = t[x].ch[1]; else x = t[x].ch[0]; return res; }
    ll next(ll v) { ll res = inf; for (int x = root; x; ) if (t[x].val > v) res = t[x].val, x = t[x].ch[0]; else x = t[x].ch[1]; return res; }
    int size() { return t[root].siz; }
};
```

Usage (the same for `AVL`, `Treap`, `Splay`):

```cpp
FHQ s(n);          // n = maximum number of insertions
s.insert(x), s.erase(x);
s.rank(x);         // number of values < x, plus 1
s.kth(k);          // k-th smallest
s.prev(x), s.next(x);
```

```cpp
struct FHQSeq {
    struct Node { int ch[2], pri, siz; bool rev; ll val; };
    vector<Node> t; int root = 0, tot = 0; mt19937 rng{random_device{}()};
    FHQSeq(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + 1; }
    void pushdown(int x) {
        if (!t[x].rev) return;
        swap(t[x].ch[0], t[x].ch[1]);
        for (int c : t[x].ch) if (c) t[c].rev ^= 1;
        t[x].rev = 0;
    }
    void split(int x, int k, int &a, int &b) { // a: first k elements
        if (!x) { a = b = 0; return; }
        pushdown(x);
        if (t[t[x].ch[0]].siz < k) a = x, split(t[x].ch[1], k - t[t[x].ch[0]].siz - 1, t[x].ch[1], b);
        else b = x, split(t[x].ch[0], k, a, t[x].ch[0]);
        pushup(x);
    }
    int merge(int a, int b) {
        if (!a || !b) return a + b;
        if (t[a].pri > t[b].pri) { pushdown(a), t[a].ch[1] = merge(t[a].ch[1], b), pushup(a); return a; }
        pushdown(b), t[b].ch[0] = merge(a, t[b].ch[0]), pushup(b); return b;
    }
    void push_back(ll v) { t[++tot] = {{0, 0}, (int)rng(), 1, 0, v}; root = merge(root, tot); }
    void reverse(int l, int r) { // 1-indexed positions
        int a, b, c;
        split(root, r, a, c), split(a, l - 1, a, b);
        if (b) t[b].rev ^= 1;
        root = merge(merge(a, b), c);
    }
    void dfs(int x, vector<ll> &out) {
        if (!x) return;
        pushdown(x), dfs(t[x].ch[0], out), out.push_back(t[x].val), dfs(t[x].ch[1], out);
    }
    vector<ll> get() { vector<ll> out; dfs(root, out); return out; }
};
```

Usage:

```cpp
FHQSeq s(n);
for (int i = 1; i <= n; i++) s.push_back(i);
s.reverse(l, r);
for (ll x : s.get()) cout << x << ' ';
```

### 2.8 Splay

Splay every accessed node to the root (amortized $O(\log n)$). `rotate` lifts a node one level; `splay(x, to)` lifts `x` until its parent is `to`.

```cpp
struct Splay {
    struct Node { int ch[2], fa, cnt, siz; ll val; };
    vector<Node> t; int root = 0, tot = 0;
    Splay(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + t[x].cnt; }
    bool get(int x) { return t[t[x].fa].ch[1] == x; } //左孩子还是右孩子
    void rotate(int x) { //上旋
        int y = t[x].fa, z = t[y].fa, k = get(x);
        if (z) t[z].ch[get(y)] = x; //儿子先取代父亲
        t[x].fa = z;
        t[y].ch[k] = t[x].ch[k ^ 1]; //把儿子的孩子给父亲
        if (t[x].ch[k ^ 1]) t[t[x].ch[k ^ 1]].fa = y;
        t[x].ch[k ^ 1] = y, t[y].fa = x; //把父亲变为x的儿子
        pushup(y), pushup(x);
    }
    void splay(int x, int goal = 0) { //将x旋转为goal的儿子
        while (t[x].fa != goal) {
            int y = t[x].fa;
            if (t[y].fa != goal) rotate(get(x) == get(y) ? y : x);
            rotate(x);
        }
        if (!goal) root = x; //更新树根
    }
    void find(ll v) { //把 v 或与 v 相邻的节点转到根
        int x = root;
        if (!x) return;
        while (t[x].val != v && t[x].ch[v > t[x].val]) x = t[x].ch[v > t[x].val];
        splay(x);
    }
    void insert(ll v) {
        int x = root, f = 0;
        while (x && t[x].val != v) f = x, x = t[x].ch[v > t[x].val];
        if (x) t[x].cnt++, pushup(x);
        else {
            x = ++tot, t[x] = {{0, 0}, f, 1, 1, v};
            if (f) t[f].ch[v > t[f].val] = x;
        }
        splay(x);
    }
    void erase(ll v) {
        find(v);
        int x = root;
        if (!x || t[x].val != v) return;
        if (t[x].cnt > 1) { t[x].cnt--, pushup(x); return; }
        int l = t[x].ch[0], r = t[x].ch[1];
        if (!l) { root = r, t[r].fa = 0; return; }
        while (t[l].ch[1]) l = t[l].ch[1];
        splay(l, x); //前驱转到根的左儿子，它没有右儿子
        t[l].ch[1] = r;
        if (r) t[r].fa = l;
        t[l].fa = 0, root = l, pushup(l);
    }
    int rank(ll v) {
        find(v);
        int x = root;
        return x ? t[t[x].ch[0]].siz + (t[x].val < v ? t[x].cnt : 0) + 1 : 1;
    }
    ll kth(int k) {
        int x = root;
        while (true) {
            int l = t[x].ch[0];
            if (k <= t[l].siz) x = l;
            else if (k <= t[l].siz + t[x].cnt) break;
            else k -= t[l].siz + t[x].cnt, x = t[x].ch[1];
        }
        splay(x);
        return t[x].val;
    }
    ll prev(ll v) {
        find(v);
        int x = root;
        if (!x) return -inf;
        if (t[x].val < v) return t[x].val;
        x = t[x].ch[0];
        if (!x) return -inf;
        while (t[x].ch[1]) x = t[x].ch[1];
        splay(x);
        return t[x].val;
    }
    ll next(ll v) {
        find(v);
        int x = root;
        if (!x) return inf;
        if (t[x].val > v) return t[x].val;
        x = t[x].ch[1];
        if (!x) return inf;
        while (t[x].ch[0]) x = t[x].ch[0];
        splay(x);
        return t[x].val;
    }
};
```

### 2.9 Mo's Algorithm

Sort queries by (block of $l$, $r$), move two pointers: $O((n + m)\sqrt n)$. With modifications: add a time pointer, block $n^{2/3}$, $O(n^{5/3})$. Rollback: only add, undo the left part with a stack.

```cpp
vector<int> a, cnt; ll cur = 0; // problem-specific: a[1..n] (discretized to 1..m), counts in the window, answer
void mo_add(int i) { cur += cnt[a[i]]++; } // example: pairs i < j in the window with a[i] == a[j]
void mo_del(int i) { cur -= --cnt[a[i]]; }
struct Mo {
    struct Q { int l, r, id; };
    vector<Q> qs;
    void add_query(int l, int r) { qs.push_back({l, r, (int)qs.size()}); }
    vector<ll> run(int n) { // answers in query order
        int B = max(1, (int)(n / sqrt(max<int>(1, qs.size()))));
        sort(qs.begin(), qs.end(), [&](const Q &a, const Q &b) { //奇偶性排序
            int x = (a.l - 1) / B, y = (b.l - 1) / B; // block of l, same formula as everywhere on this page
            if (x != y) return x < y;
            return x & 1 ? a.r > b.r : a.r < b.r;
        });
        vector<ll> res(qs.size());
        int L = 1, R = 0;
        for (auto &q : qs) {
            while (L > q.l) mo_add(--L); //区间扩大
            while (R < q.r) mo_add(++R);
            while (L < q.l) mo_del(L++); //区间缩小
            while (R > q.r) mo_del(R--);
            res[q.id] = cur;
        }
        return res;
    }
};
```

Usage:

```cpp
a.assign(n + 1, 0), cnt.assign(m + 1, 0); // read a[1..n]
Mo mo;
for (int i = 0; i < q; i++) mo.add_query(l, r);
vector<ll> res = mo.run(n);
```

```cpp
vector<int> a, cnt; ll cur = 0; // problem-specific: a[1..n] colors (discretized, update values too), counts, answer
void mo_add(int i) { if (cnt[a[i]]++ == 0) cur++; } // example: distinct colors in the window
void mo_del(int i) { if (--cnt[a[i]] == 0) cur--; }
struct MoUpd {
    struct Q { int l, r, t, id; };
    vector<Q> qs; vector<pii> us; // us: (position, new value)
    void add_query(int l, int r) { qs.push_back({l, r, (int)us.size(), (int)qs.size()}); }
    void add_update(int p, int v) { us.push_back({p, v}); }
    vector<ll> run(int n) { // answers in query order; a[] is modified while running
        int B = max(1, (int)pow(n, 2.0 / 3)); //带修莫队块长取 n^(2/3)
        sort(qs.begin(), qs.end(), [&](const Q &x, const Q &y) {
            if ((x.l - 1) / B != (y.l - 1) / B) return x.l < y.l;
            if ((x.r - 1) / B != (y.r - 1) / B) return x.r < y.r;
            return x.t < y.t; //再加一维时间戳
        });
        vector<ll> res(qs.size());
        int L = 1, R = 0, T = 0;
        auto apply = [&](int t) {
            auto &[p, v] = us[t];
            bool in = L <= p && p <= R;
            if (in) mo_del(p);
            swap(a[p], v);
            if (in) mo_add(p);
        };
        for (auto &q : qs) {
            while (T < q.t) apply(T++); //继续修改
            while (T > q.t) apply(--T); //修改回溯
            while (L > q.l) mo_add(--L);
            while (R < q.r) mo_add(++R);
            while (L < q.l) mo_del(L++);
            while (R > q.r) mo_del(R--);
            res[q.id] = cur;
        }
        return res;
    }
};
```

Usage:

```cpp
a.assign(n + 1, 0), cnt.assign(m + 1, 0); // read a[1..n]
MoUpd mo;
// 'Q l r': mo.add_query(l, r);   'R p v': mo.add_update(p, v);
vector<ll> res = mo.run(n);
```

```cpp
// problem-specific: id[1..n] = discretized a[i] in 1..m, val[x] = original value of x; example: max over x of x * (count of x)
vector<int> id, cnt, stk; vector<ll> val; ll cur = 0, saved = 0; size_t mark = 0;
void mo_add(int i) { cnt[id[i]]++, stk.push_back(id[i]), cur = max(cur, cnt[id[i]] * val[id[i]]); }
void mo_save() { mark = stk.size(), saved = cur; }
void mo_undo() { while (stk.size() > mark) cnt[stk.back()]--, stk.pop_back(); cur = saved; }
void mo_reset() { for (int x : stk) cnt[x]--; stk.clear(), cur = 0; }
struct MoRollback {
    struct Q { int l, r, id; };
    vector<Q> qs;
    void add_query(int l, int r) { qs.push_back({l, r, (int)qs.size()}); }
    vector<ll> run(int n) { // answers in query order
        int B = max(1, (int)sqrt(n));
        sort(qs.begin(), qs.end(), [&](const Q &a, const Q &b) {
            if ((a.l - 1) / B != (b.l - 1) / B) return a.l < b.l;
            return a.r < b.r; //保证同一块内右端点只扩展
        });
        vector<ll> res(qs.size());
        for (size_t i = 0, j; i < qs.size(); i = j) {
            int blk = (qs[i].l - 1) / B, end = min(n, (blk + 1) * B), R = end;
            mo_reset(); //进入下一块清空
            for (j = i; j < qs.size() && (qs[j].l - 1) / B == blk; j++) {
                auto &q = qs[j];
                if (q.r <= end) { //同一块暴力扫
                    mo_save();
                    for (int k = q.l; k <= q.r; k++) mo_add(k);
                    res[q.id] = cur, mo_undo();
                    continue;
                }
                while (R < q.r) mo_add(++R); //持续扩展
                mo_save();
                for (int k = end; k >= q.l; k--) mo_add(k); //扩展完撤销
                res[q.id] = cur, mo_undo(); //回滚撤销
            }
        }
        return res;
    }
};
```

Usage:

```cpp
id.assign(n + 1, 0), cnt.assign(m + 1, 0), val.assign(m + 1, 0); // fill id[1..n], val[1..m]
MoRollback mo;
for (int i = 0; i < q; i++) mo.add_query(l, r);
vector<ll> res = mo.run(n);
```

### 2.10 Square Root Decomposition

Blocks of size $\sqrt n$: whole blocks by tags, ends by brute force. $O(\sqrt n)$ per operation.

```cpp
struct Block { // range add, range sum, 1-indexed
    int n, B; vector<int> bel; vector<ll> a, sum, add;
    Block(int n, const vector<ll> &v) : n(n), B(max(1, (int)sqrt(n))), bel(n + 1), a(n + 1) {
        for (int i = 1; i <= n; i++) a[i] = v[i], bel[i] = (i - 1) / B;
        sum.assign(bel[n] + 1, 0), add.assign(bel[n] + 1, 0);
        for (int i = 1; i <= n; i++) sum[bel[i]] += a[i];
    }
    int L(int b) { return b * B + 1; }
    int R(int b) { return min(n, (b + 1) * B); }
    void modify(int l, int r, ll v) {
        int x = bel[l], y = bel[r];
        if (x == y) { for (int i = l; i <= r; i++) a[i] += v, sum[x] += v; return; } //l和r在同一块
        for (int i = l; i <= R(x); i++) a[i] += v, sum[x] += v; //两侧零散区间
        for (int i = L(y); i <= r; i++) a[i] += v, sum[y] += v;
        for (int b = x + 1; b < y; b++) add[b] += v; //区块标记
    }
    ll query(int l, int r) {
        int x = bel[l], y = bel[r]; ll res = 0;
        if (x == y) { for (int i = l; i <= r; i++) res += a[i] + add[x]; return res; }
        for (int i = l; i <= R(x); i++) res += a[i] + add[x];
        for (int i = L(y); i <= r; i++) res += a[i] + add[y];
        for (int b = x + 1; b < y; b++) res += sum[b] + add[b] * (R(b) - L(b) + 1); //原区块和+标记
        return res;
    }
};
```

Usage:

```cpp
Block blk(n, a);       // vector<ll> a(n + 1), a[1..n]
blk.modify(l, r, v);   // a[l..r] += v
blk.query(l, r);       // a[l] + ... + a[r]
```

### 2.11 Li Chao Tree

Each node keeps the line best at its midpoint; the loser goes to the one side where it can still win. Line $O(\log n)$, segment $O(\log^2 n)$, query $O(\log n)$.

```cpp
struct LiChao {
    struct Line { ll k, b; ll f(ll x) const { return k * x + b; } };
    int n; vector<Line> t; vector<bool> has;
    LiChao(int n) : n(n), t(n << 2), has(n << 2) {}
    void insert(int rt, int l, int r, Line u) { //更新覆盖标记
        if (!has[rt]) { t[rt] = u, has[rt] = 1; return; }
        int mid = (l + r) >> 1;
        if (u.f(mid) > t[rt].f(mid)) swap(u, t[rt]); //t[rt]为中点处更优的线段
        if (l == r) return;
        if (u.f(l) > t[rt].f(l)) insert(rt << 1, l, mid, u);
        else if (u.f(r) > t[rt].f(r)) insert(rt << 1 | 1, mid + 1, r, u);
    }
    void update(int rt, int l, int r, int x, int y, Line u) {
        if (x <= l && r <= y) { insert(rt, l, r, u); return; }
        int mid = (l + r) >> 1;
        if (x <= mid) update(rt << 1, l, mid, x, y, u);
        if (y > mid) update(rt << 1 | 1, mid + 1, r, x, y, u);
    }
    ll query(int rt, int l, int r, int x) {
        ll res = has[rt] ? t[rt].f(x) : LLONG_MIN;
        if (l == r) return res;
        int mid = (l + r) >> 1;
        return max(res, x <= mid ? query(rt << 1, l, mid, x) : query(rt << 1 | 1, mid + 1, r, x));
    }
    void add(ll k, ll b) { update(1, 1, n, 1, n, {k, b}); }               // line y = kx + b
    void add(int l, int r, ll k, ll b) { update(1, 1, n, l, r, {k, b}); } // segment on x in [l, r]
    ll query(int x) { return query(1, 1, n, x); }                          // max at x
};
```

Usage:

```cpp
LiChao lc(n);
lc.add(k, b);        // line y = kx + b on the whole [1, n]
lc.add(l, r, k, b);  // only for x in [l, r]
lc.query(x);         // max of all lines at x

// convex hull trick DP: f[i] = min_j (f[j] + b[j] * a[i]), a[i] in [1, n]
LiChao h(n);
h.add(-b[0], -f[0]);
for (int i = 1; i <= cnt; i++) f[i] = -h.query(a[i]), h.add(-b[i], -f[i]);
```

### 2.12 Segment Tree Beats

Range chmin + range add + sum/max/history max. Tags split by max / non-max elements. $O(n \log^2 n)$.

```cpp
struct Beats {
    static constexpr ll NEG = LLONG_MIN / 4;
    struct Node { ll sum, mx, se, hmx, a1, b1, a2, b2; int cnt, len; };
    int n; vector<Node> t;
    Beats(int n) : n(n), t(n << 2) {}
    void apply(int rt, ll k1, ll k2, ll k3, ll k4) { // k1/k3 for max elements, k2/k4 for the rest
        Node &x = t[rt];
        x.sum += k1 * x.cnt + k2 * (x.len - x.cnt);
        x.hmx = std::max(x.hmx, x.mx + k3), x.mx += k1;
        if (x.se != NEG) x.se += k2;
        x.a2 = std::max(x.a2, x.a1 + k3), x.a1 += k1;
        x.b2 = std::max(x.b2, x.b1 + k4), x.b1 += k2;
    }
    void pushup(int rt) {
        Node &x = t[rt], &l = t[rt << 1], &r = t[rt << 1 | 1];
        x.sum = l.sum + r.sum, x.hmx = std::max(l.hmx, r.hmx), x.mx = std::max(l.mx, r.mx);
        if (l.mx > r.mx) x.se = std::max(l.se, r.mx), x.cnt = l.cnt;
        else if (l.mx < r.mx) x.se = std::max(l.mx, r.se), x.cnt = r.cnt;
        else x.se = std::max(l.se, r.se), x.cnt = l.cnt + r.cnt;
    }
    void pushdown(int rt) {
        Node &x = t[rt];
        ll mx = std::max(t[rt << 1].mx, t[rt << 1 | 1].mx);
        for (int c : {rt << 1, rt << 1 | 1}) {
            if (t[c].mx == mx) apply(c, x.a1, x.b1, x.a2, x.b2);
            else apply(c, x.b1, x.b1, x.b2, x.b2);
        }
        x.a1 = x.b1 = x.a2 = x.b2 = 0;
    }
    void build(const vector<ll> &a, int rt, int l, int r) {
        t[rt] = {0, 0, NEG, 0, 0, 0, 0, 0, 1, r - l + 1};
        if (l == r) { t[rt].sum = t[rt].mx = t[rt].hmx = a[l]; return; }
        int mid = (l + r) >> 1;
        build(a, rt << 1, l, mid), build(a, rt << 1 | 1, mid + 1, r);
        pushup(rt);
    }
    void add(int rt, int l, int r, int x, int y, ll v) {
        if (x <= l && r <= y) { apply(rt, v, v, v, v); return; }
        pushdown(rt);
        int mid = (l + r) >> 1;
        if (x <= mid) add(rt << 1, l, mid, x, y, v);
        if (y > mid) add(rt << 1 | 1, mid + 1, r, x, y, v);
        pushup(rt);
    }
    void chmin(int rt, int l, int r, int x, int y, ll v) {
        if (v >= t[rt].mx) return;
        if (x <= l && r <= y && v > t[rt].se) { ll d = v - t[rt].mx; apply(rt, d, 0, d, 0); return; }
        pushdown(rt);
        int mid = (l + r) >> 1;
        if (x <= mid) chmin(rt << 1, l, mid, x, y, v);
        if (y > mid) chmin(rt << 1 | 1, mid + 1, r, x, y, v);
        pushup(rt);
    }
    ll query(int rt, int l, int r, int x, int y, int op) { // op 0: sum, 1: max, 2: historic max
        if (x <= l && r <= y) return op == 0 ? t[rt].sum : op == 1 ? t[rt].mx : t[rt].hmx;
        pushdown(rt);
        int mid = (l + r) >> 1;
        ll res = op == 0 ? 0 : NEG;
        for (auto [c, lo, hi] : {tuple{rt << 1, l, mid}, tuple{rt << 1 | 1, mid + 1, r}})
            if (x <= hi && lo <= y) {
                ll s = query(c, lo, hi, x, y, op);
                res = op == 0 ? res + s : std::max(res, s);
            }
        return res;
    }
    void build(const vector<ll> &a) { build(a, 1, 1, n); }          // a[1..n], a.size() == n + 1
    void add(int l, int r, ll v) { add(1, 1, n, l, r, v); }        // a[l..r] += v
    void chmin(int l, int r, ll v) { chmin(1, 1, n, l, r, v); }    // a[i] = min(a[i], v)
    ll sum(int l, int r) { return query(1, 1, n, l, r, 0); }
    ll max(int l, int r) { return query(1, 1, n, l, r, 1); }
    ll hmax(int l, int r) { return query(1, 1, n, l, r, 2); }      // max over all past values
};
```

Usage:

```cpp
Beats bt(n);
bt.build(a);         // vector<ll> a(n + 1), a[1..n]
bt.add(l, r, v);     // a[l..r] += v
bt.chmin(l, r, v);   // a[i] = min(a[i], v) on [l, r]
bt.sum(l, r), bt.max(l, r), bt.hmax(l, r);
```

### 2.13 Cartesian Tree

BST on index, min-heap on value; monotonic stack, $O(n)$. `cartesian` returns the root.

```cpp
// 笛卡尔树: min-heap on a[1..n] (a.size() == n + 1); returns the root, lc/rc = children (0 = none)
int cartesian(const vector<ll> &a, vector<int> &lc, vector<int> &rc) {
    int n = a.size() - 1;
    lc.assign(n + 1, 0), rc.assign(n + 1, 0);
    vector<int> stk; //单调栈，保存右链
    for (int i = 1; i <= n; i++) {
        int last = 0;
        while (stk.size() && a[stk.back()] > a[i]) last = stk.back(), stk.pop_back();
        lc[i] = last; //把中间比自己大的点作为左儿子
        if (stk.size()) rc[stk.back()] = i; //接到右儿子上
        stk.push_back(i);
    }
    return stk[0];
}
```

Usage:

```cpp
vector<int> lc, rc;
int root = cartesian(a, lc, rc);  // vector<ll> a(n + 1), a[1..n]; equal values: the left one is the ancestor
// max-heap: change a[stk.back()] > a[i] to a[stk.back()] < a[i]
```

### 2.14 K-D Tree

Median split, alternating dimension; rebuild a subtree when a child holds more than $\alpha$ of it. Nearest/farthest with bounding-box pruning (2D, Manhattan).

```cpp
struct KDTree {
    struct P { ll x[2]; };
    struct Node { P p; int l, r, siz, d; ll mn[2], mx[2]; }; // d: split dimension, mn/mx: bounding box
    static constexpr double alpha = 0.75;
    vector<Node> t; vector<int> rub; vector<P> buf; int root = 0, tot = 0;
    KDTree(int cap) : t(cap + 1) {}
    static ll dist(const P &a, const P &b) { return llabs(a.x[0] - b.x[0]) + llabs(a.x[1] - b.x[1]); }
    void pushup(int x) {
        for (int i = 0; i < 2; i++) {
            t[x].mn[i] = t[x].mx[i] = t[x].p.x[i]; //因为会重构所以每次都要初始化
            for (int c : {t[x].l, t[x].r}) if (c)
                t[x].mn[i] = min(t[x].mn[i], t[c].mn[i]), t[x].mx[i] = max(t[x].mx[i], t[c].mx[i]);
        }
        t[x].siz = t[t[x].l].siz + t[t[x].r].siz + 1;
    }
    int newnode(const P &p, int d) {
        int x = rub.size() ? rub.back() : ++tot;
        if (rub.size()) rub.pop_back();
        t[x].p = p, t[x].d = d, t[x].l = t[x].r = 0, pushup(x);
        return x;
    }
    int build(int l, int r, int d) { // buf[l..r]
        if (l > r) return 0;
        int mid = (l + r) / 2;
        nth_element(buf.begin() + l, buf.begin() + mid, buf.begin() + r + 1, [d](const P &a, const P &b) { return a.x[d] < b.x[d]; });
        int x = newnode(buf[mid], d);
        t[x].l = build(l, mid - 1, d ^ 1), t[x].r = build(mid + 1, r, d ^ 1);
        pushup(x);
        return x;
    }
    void flatten(int x) { //重构，把树还原为原序列
        if (!x) return;
        flatten(t[x].l), buf.push_back(t[x].p), rub.push_back(x), flatten(t[x].r);
    }
    void insert(int &x, const P &p, int d) {
        if (!x) { x = newnode(p, d); return; }
        int k = t[x].d;
        insert(p.x[k] <= t[x].p.x[k] ? t[x].l : t[x].r, p, k ^ 1);
        pushup(x);
        if (alpha * t[x].siz < max(t[t[x].l].siz, t[t[x].r].siz)) //检查树是否平衡
            buf.clear(), flatten(x), x = build(0, buf.size() - 1, k);
    }
    ll lo(int x, const P &p) { //到包围盒的最小距离（估价）
        ll s = 0;
        for (int i = 0; i < 2; i++) s += max(0LL, t[x].mn[i] - p.x[i]) + max(0LL, p.x[i] - t[x].mx[i]);
        return s;
    }
    ll hi(int x, const P &p) { //到包围盒的最大距离（估价）
        ll s = 0;
        for (int i = 0; i < 2; i++) s += max(llabs(p.x[i] - t[x].mn[i]), llabs(p.x[i] - t[x].mx[i]));
        return s;
    }
    void qmin(int x, const P &p, ll &res) { //查询最近
        res = min(res, dist(t[x].p, p));
        int a = t[x].l, b = t[x].r;
        ll da = a ? lo(a, p) : LLONG_MAX, db = b ? lo(b, p) : LLONG_MAX;
        if (da > db) swap(a, b), swap(da, db); //先跑最有可能达到最小值的
        if (da < res) qmin(a, p, res);
        if (db < res) qmin(b, p, res);
    }
    void qmax(int x, const P &p, ll &res) { //查询最远
        res = max(res, dist(t[x].p, p));
        int a = t[x].l, b = t[x].r;
        ll da = a ? hi(a, p) : -1, db = b ? hi(b, p) : -1;
        if (da < db) swap(a, b), swap(da, db);
        if (da > res) qmax(a, p, res);
        if (db > res) qmax(b, p, res);
    }
    void build(const vector<P> &pts) { buf = pts, root = build(0, (int)buf.size() - 1, 0); }
    void insert(ll x, ll y) { insert(root, P{{x, y}}, 0); }
    ll nearest(ll x, ll y) { ll res = LLONG_MAX; if (root) qmin(root, P{{x, y}}, res); return res; }
    ll farthest(ll x, ll y) { ll res = -1; if (root) qmax(root, P{{x, y}}, res); return res; }
};
```

Usage:

```cpp
KDTree kd(n + q);              // capacity = total number of points
kd.build(pts);                 // optional: vector<KDTree::P> of initial points, P{{x, y}}
kd.insert(x, y);
kd.nearest(x, y);              // min Manhattan distance to a stored point (LLONG_MAX if empty)
kd.farthest(x, y);             // max Manhattan distance (-1 if empty)
// to exclude the point itself, query before inserting it
```

## 3. Graph & Tree

### 3.1 Graph Storage

Forward star in vectors; edges start at index 2, so edges `i` and `i ^ 1` are a pair.

```cpp
struct edge { int v, w, ne; };
vector<edge> e(2); // edges start at index 2, so the reverse of edge i is i ^ 1
vector<int> head;  // head.assign(n + 1, 0); loop: for (int i = head[u]; i; i = e[i].ne)
inline void add(int x, int y, int z) {
    e.push_back({y, z, head[x]});
    head[x] = e.size() - 1;
}
```

### 3.2 Dijkstra

Non-negative weights. $O((n + m) \log m)$

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;   // LLONG_MAX = unreachable
vector<int> path;
void dijkstra(int n, int s) {
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> q;
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    dis[s] = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (d > dis[u]) continue; // outdated value
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                q.push({dis[v], v});
            }
        }
    }
}
vector<int> get_path(int t) { // from s to t
    vector<int> res;
    for (int v = t; v != 0; v = path[v])
        res.push_back(v);
    reverse(res.begin(), res.end());
    return res;
}
```

### 3.3 SPFA / Negative Cycle

A vertex enqueued $n$ times means a negative cycle. Worst case $O(nm)$.

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;   // LLONG_MAX = unreachable
vector<int> path, cnt, cycle; // cycle: a negative cycle, if found
vector<bool> vs;
void get_negative_cycle(int n, int x) {
    // retrace to find a vertex definitely inside the cycle
    for (int i = 1; i <= n; i++) x = path[x];
    cycle.clear();
    for (int v = x; ; v = path[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());
}
//判断是否存在环
bool spfa(int n, int s) { // true if a negative cycle is reachable from s
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    cnt.assign(n + 1, 0);
    vs.assign(n + 1, false);
    queue<int> q;
    dis[s] = 0; q.push(s); vs[s] = true; cnt[s] = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop(); vs[u] = false;
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                if (!vs[v]) {
                    q.push(v); vs[v] = true;
                    if ((++cnt[v]) >= n) {
                        get_negative_cycle(n, v);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
```

### 3.4 0-1 BFS

Weights 0/1: push to the front for 0, back for 1. $O(n + m)$

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1, w in {0, 1}
vector<ll> dis;
void zero_one_bfs(int n, int s) {
    dis.assign(n + 1, LLONG_MAX);
    deque<int> q;
    dis[s] = 0;
    q.push_front(s);
    while (!q.empty()) {
        int u = q.front(); q.pop_front();
        for (auto [v, w] : e[u])
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                if (w == 0) q.push_front(v);
                else q.push_back(v);
            }
    }
}
```

### 3.5 Floyd

$D_k(u, v) = \min(D_{k-1}(u, v), D_{k-1}(u, k) + D_{k-1}(k, v))$, $O(n^3)$. Minimum cycle: before relaxing with $k$, try $dis_{i,j} + w_{i,k} + w_{k,j}$ for $i, j < k$.

```cpp
bool floyd_warshall(int n, vector<vector<ll>> &dis, const vector<vector<ll>> &w) { // w: LLONG_MAX = no edge; false on a negative cycle
    dis = w;
    for (int i = 1; i <= n; i++) dis[i][i] = min(dis[i][i], 0LL);
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (dis[i][k] != LLONG_MAX && dis[k][j] != LLONG_MAX) // INF + INF overflows, INF + negative is not a path
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    for (int i = 1; i <= n; i++)
        if (dis[i][i] < 0) return false; // negative cycle exists
    return true;
}
```

```cpp
ll floyd_ring(int n, const vector<vector<ll>> &w) { //最小环 (undirected, w: LLONG_MAX = no edge), LLONG_MAX if none
    vector<vector<ll>> dis = w;
    ll ans = LLONG_MAX;
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i < k; i++)
            for (int j = i + 1; j < k; j++)
                if (dis[i][j] != LLONG_MAX && w[i][k] != LLONG_MAX && w[k][j] != LLONG_MAX) // INF * 3 overflows
                    ans = min(ans, dis[i][j] + w[i][k] + w[k][j]);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (dis[i][k] != LLONG_MAX && dis[k][j] != LLONG_MAX)
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    }
    return ans;
}
```

### 3.6 Topological Sort

Kahn: repeatedly take in-degree 0. If `order.size() < n`, there is a cycle.

```cpp
vector<vector<int>> e;
vector<int> indeg, order;
bool topo_sort_kahn(int n) { // false if the graph has a cycle
    indeg.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            indeg[v]++;

    order.clear();
    queue<int> q;
    for (int u = 1; u <= n; u++)
        if (indeg[u] == 0) q.push(u);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : e[u])
            if (--indeg[v] == 0) q.push(v);
    }
    return (int)order.size() == n; // vertices on or after a cycle never reach in-degree 0
}
```

### 3.7 Minimum Spanning Tree

Kruskal: sort edges, add if endpoints are in different sets, $O(m \log m)$. Prim (dense): $O(n^2)$.

```cpp
ll prim(int n, const vector<vector<pair<int, ll>>> &e) { // e[u]: (v, w), undirected; -1 if not connected
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> q;
    vector<bool> vs(n + 1);
    ll sum = 0; int cnt = 0;
    q.push({0, 1});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (vs[u]) continue; // outdated
        vs[u] = 1, sum += d;
        if (++cnt == n) return sum;
        for (auto [v, w] : e[u]) if (!vs[v]) q.push({w, v});
    }
    return -1; // not connected
}
```

```cpp
struct Edge { int u, v; ll w; };
ll kruskal(int n, vector<Edge> edges, vector<Edge> *mst = nullptr) { // -1 if not connected
    sort(edges.begin(), edges.end(), [](const Edge &a, const Edge &b) { return a.w < b.w; });
    DSU dsu(n);
    ll sum = 0; int cnt = 0;
    for (auto &e : edges)
        if (dsu.unite(e.u, e.v)) { // 不在同一集合中
            sum += e.w, cnt++;
            if (mst) mst->push_back(e);
        }
    return cnt == n - 1 ? sum : -1;
}
```

Usage:

```cpp
vector<Edge> edges;
edges.push_back({u, v, w});
ll cost = kruskal(n, edges);       // or kruskal(n, edges, &tree) to get the chosen edges
// maximum spanning tree: sort by a.w > b.w
```

### 3.8 LCA (Binary Lifting, Tarjan)

Binary lifting: $fa_{u,j} = fa_{fa_{u,j-1}, j-1}$; lift the deeper vertex to the same depth, then both while ancestors differ, $O(\log n)$. Tarjan (offline): after a child's subtree is done, merge it into the current vertex with DSU; for a query $(u, v)$ with $v$ finished, $\operatorname{LCA} = \operatorname{find}(v)$, $O((n + q)\,\alpha(n))$.

```cpp
struct LCA {
    int n, LOG; vector<vector<pair<int, ll>>> e;
    vector<vector<int>> fa; vector<int> dep; vector<ll> dis; // dis: weighted depth
    LCA(int n) : n(n), LOG(__lg(max(n, 1)) + 1), e(n + 1), fa(LOG, vector<int>(n + 1)), dep(n + 1), dis(n + 1) {}
    void add_edge(int u, int v, ll w = 1) { e[u].push_back({v, w}), e[v].push_back({u, w}); }
    void build(int root = 1) {
        vector<int> q = {root};
        fa[0][root] = 0, dep[root] = dis[root] = 0;
        for (size_t i = 0; i < q.size(); i++) {
            int u = q[i];
            for (auto [v, w] : e[u]) if (v != fa[0][u])
                fa[0][v] = u, dep[v] = dep[u] + 1, dis[v] = dis[u] + w, q.push_back(v);
        }
        for (int j = 1; j < LOG; j++)
            for (int u = 1; u <= n; u++) fa[j][u] = fa[j - 1][fa[j - 1][u]];
    }
    int kth(int u, int k) { // k-th ancestor of u, 0 if it does not exist
        for (int j = 0; j < LOG && u; j++) if (k >> j & 1) u = fa[j][u];
        return k >= (1 << LOG) ? 0 : u;
    }
    int lca(int u, int v) {
        if (dep[u] < dep[v]) swap(u, v);
        u = kth(u, dep[u] - dep[v]);
        if (u == v) return u;
        for (int j = LOG - 1; j >= 0; j--)
            if (fa[j][u] != fa[j][v]) u = fa[j][u], v = fa[j][v];
        return fa[0][u];
    }
    int depth_dist(int u, int v) { return dep[u] + dep[v] - 2 * dep[lca(u, v)]; } // number of edges
    ll dist(int u, int v) { return dis[u] + dis[v] - 2 * dis[lca(u, v)]; }        // sum of weights
};
```

Usage:

```cpp
LCA t(n);
t.add_edge(u, v, w);   // w defaults to 1
t.build(1);
t.lca(u, v), t.dist(u, v), t.depth_dist(u, v);
t.kth(u, k);           // k-th ancestor
```

```cpp
vector<int> tarjan_lca(int n, int root, const vector<vector<int>> &e, const vector<pii> &qs) {
    vector<vector<pii>> q(n + 1); // q[u]: (other vertex, query id)
    for (int i = 0; i < (int)qs.size(); i++) q[qs[i].first].push_back({qs[i].second, i}), q[qs[i].second].push_back({qs[i].first, i});
    vector<int> pa(n + 1), vs(n + 1), ans(qs.size());
    iota(pa.begin(), pa.end(), 0);
    function<int(int)> find = [&](int x) { return x == pa[x] ? x : pa[x] = find(pa[x]); };
    function<void(int, int)> dfs = [&](int u, int f) {
        vs[u] = 1;
        for (int v : e[u]) if (v != f) dfs(v, u), pa[v] = u; //并查集：v的集合并到u上（代表元必须是u，不能按秩合并）
        for (auto [v, id] : q[u])
            if (vs[v] == 2 || v == u) ans[id] = find(v);
        vs[u] = 2;
    };
    dfs(root, 0);
    return ans;
}
```

Usage:

```cpp
vector<pii> qs = {{u1, v1}, {u2, v2}};
auto ans = tarjan_lca(n, 1, e, qs); // ans[i] = lca of qs[i]
```

### 3.9 Heavy-Light Decomposition

Heavy child = largest subtree. A path splits into $O(\log n)$ chains, each a contiguous `dfn` range: $O(\log^2 n)$ with a segment tree. Subtree of $u$: $[dfn_u, dfn_u + siz_u - 1]$.

```cpp
struct HLD {
    int n, tim = 0; vector<vector<int>> e;
    vector<int> fa, dep, siz, son, top, dfn, rnk; // son: heavy child; rnk[dfn[u]] = u; top: head of u's heavy chain
    HLD(int n) : n(n), e(n + 1), fa(n + 1), dep(n + 1), siz(n + 1), son(n + 1), top(n + 1), dfn(n + 1), rnk(n + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v), e[v].push_back(u); }
    void dfs1(int u) { //寻找重边和重儿子
        siz[u] = 1;
        for (int v : e[u]) if (v != fa[u]) {
            fa[v] = u, dep[v] = dep[u] + 1;
            dfs1(v);
            siz[u] += siz[v];
            if (siz[v] > siz[son[u]]) son[u] = v; //更新重儿子
        }
    }
    void dfs2(int u, int t) { //连接重边构成重链
        top[u] = t, dfn[u] = ++tim, rnk[tim] = u;
        if (son[u]) dfs2(son[u], t); //优先递归重儿子
        for (int v : e[u]) if (v != fa[u] && v != son[u]) dfs2(v, v); //新建立一条重链
    }
    void build(int root = 1) { fa[root] = 0, dep[root] = 1, dfs1(root), dfs2(root, root); }
    int lca(int u, int v) {
        while (top[u] != top[v]) {
            if (dep[top[u]] < dep[top[v]]) swap(u, v);
            u = fa[top[u]];
        }
        return dep[u] < dep[v] ? u : v;
    }
    int dist(int u, int v) { return dep[u] + dep[v] - 2 * dep[lca(u, v)]; }
    void path(int u, int v, function<void(int, int)> f, bool edge = false) { // edge: values stored on the child end of each edge
        while (top[u] != top[v]) { //没在一条重链上
            if (dep[top[u]] < dep[top[v]]) swap(u, v);
            f(dfn[top[u]], dfn[u]);
            u = fa[top[u]]; //向上翻
        }
        if (dep[u] > dep[v]) swap(u, v);
        if (dfn[u] + edge <= dfn[v]) f(dfn[u] + edge, dfn[v]);
    }
    pii subtree(int u) { return {dfn[u], dfn[u] + siz[u] - 1}; }
    int jump(int u, int anc) { // child of ancestor anc on the path to u (u != anc)
        while (top[u] != top[anc]) {
            if (fa[top[u]] == anc) return top[u];
            u = fa[top[u]];
        }
        return rnk[dfn[anc] + 1];
    }
};
```

```cpp
HLD h(n);
for (int i = 1; i < n; i++) h.add_edge(u, v);
h.build(1);

vector<ll> b(n + 1);
for (int u = 1; u <= n; u++) b[h.dfn[u]] = a[u];
SegTree seg(n); seg.build(b);

h.path(u, v, [&](int l, int r) { seg.add(l, r, x); });           // vertices on path u..v += x
ll s = 0; h.path(u, v, [&](int l, int r) { s += seg.sum(l, r); }); // sum on path u..v
ll mx = LLONG_MIN; h.path(u, v, [&](int l, int r) { mx = max(mx, seg.max(l, r)); });
auto [l, r] = h.subtree(u); seg.add(l, r, x);                      // subtree of u += x
h.lca(u, v), h.dist(u, v);
// edge weights: store w(fa[v], v) at b[h.dfn[v]] and call h.path(u, v, f, true)
```

### 3.10 Tarjan: SCC, Cut Vertex, Bridge

$low_u = \min(dfn_u, low_v \text{ (tree edge)}, dfn_v \text{ (}v\text{ on stack / back edge)})$.
- SCC root: $low_u = dfn_u$.
- Cut vertex: non-root $u$ with child $v$, $low_v \ge dfn_u$; root needs $\ge 2$ children.
- Bridge: tree edge $(u, v)$ with $low_v > dfn_u$. Skip the parent edge by index (`i == (fa ^ 1)`).

```cpp
struct SCC {
    int n, tim = 0, cnt = 0; vector<vector<int>> e;
    vector<int> dfn, low, bel, stk; vector<bool> ins; //bel: 所属强连通分量
    vector<vector<int>> comps{{}};                     //该强连通分量集合, comps[1..cnt]
    SCC(int n) : n(n), e(n + 1), dfn(n + 1), low(n + 1), bel(n + 1), ins(n + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v); }
    void tarjan(int u) {
        dfn[u] = low[u] = ++tim; //初始化：dfs序和low回溯数组
        stk.push_back(u), ins[u] = 1; //标记已进栈
        for (int v : e[u]) {
            if (!dfn[v]) tarjan(v), low[u] = min(low[u], low[v]); //还没有被访问过，直接访问
            else if (ins[v]) low[u] = min(low[u], dfn[v]); //已经被访问过且还在栈里
        }
        if (dfn[u] == low[u]) { //构成了强连通分量，其之后节点不能返回到u之前
            comps.emplace_back(), cnt++;
            int x;
            do {
                x = stk.back(), stk.pop_back(), ins[x] = 0; //标记出栈
                bel[x] = cnt, comps.back().push_back(x);
            } while (x != u);
        }
    }
    void run() { for (int u = 1; u <= n; u++) if (!dfn[u]) tarjan(u); }
    vector<vector<int>> dag() { //缩点：components 1..cnt, may contain duplicate edges
        vector<vector<int>> g(cnt + 1);
        for (int u = 1; u <= n; u++)
            for (int v : e[u]) if (bel[u] != bel[v]) g[bel[u]].push_back(bel[v]);
        return g;
    }
};
```

Usage:

```cpp
SCC s(n);
s.add_edge(u, v);
s.run();
s.cnt;          // number of SCCs
s.bel[u];       // SCC of u, 1..cnt
s.comps[c];     // vertices of SCC c
auto g = s.dag();
```

```cpp
struct BCC {
    int n, m = 0, tim = 0; vector<vector<pii>> e; // e[u]: (v, edge id)
    vector<int> dfn, low, s1, s2, ebel;            // ebel[u]: E-DCC of u
    vector<bool> cut, bridge;                      // cut[u]: 割点, bridge[id]: 割边
    vector<vector<int>> vdcc{{}}, edcc{{}};        // 点双连通分量 / 边双连通分量, 1-indexed ([0] unused)
    BCC(int n) : n(n), e(n + 1), dfn(n + 1), low(n + 1), ebel(n + 1), cut(n + 1) {}
    int add_edge(int u, int v) { e[u].push_back({v, m}), e[v].push_back({u, m}); return m++; }
    void tarjan(int u, int pe) {
        dfn[u] = low[u] = ++tim;
        s1.push_back(u), s2.push_back(u);
        int kids = 0; //dfs树上的儿子数
        for (auto [v, id] : e[u]) {
            if (id == pe) continue; //同一条无向边
            if (!dfn[v]) {
                tarjan(v, id), kids++;
                low[u] = min(low[u], low[v]);
                if (low[v] >= dfn[u]) { //v不与u以上的点联通，想要从之前的点到达v，必须要经过u
                    if (pe != -1 || kids > 1) cut[u] = 1; //起点至少要有两棵子树才是割点
                    vdcc.push_back({u}); //u不能出栈，可能属于多个点双
                    int x;
                    do x = s1.back(), s1.pop_back(), vdcc.back().push_back(x); while (x != v);
                }
                if (low[v] > dfn[u]) bridge[id] = 1; //除了u——v这条边之外，没有其他边可以联通u、v
            } else low[u] = min(low[u], dfn[v]);
        }
        if (low[u] == dfn[u]) {
            edcc.emplace_back();
            int x;
            do x = s2.back(), s2.pop_back(), ebel[x] = edcc.size() - 1, edcc.back().push_back(x); while (x != u);
        }
    }
    void run() {
        bridge.assign(m, 0);
        for (int u = 1; u <= n; u++) if (!dfn[u]) {
            if (e[u].empty()) vdcc.push_back({u}); //孤立单点
            tarjan(u, -1), s1.clear();
        }
    }
};
```

Usage:

```cpp
BCC b(n);
int id = b.add_edge(u, v);   // undirected
b.run();
b.cut[u];       // u is a cut vertex
b.bridge[id];   // edge id is a bridge
b.vdcc[i], b.edcc[i]; // i-th vertex / edge biconnected component, i from 1
b.ebel[u];      // E-DCC index of u (from 1); bridges connect different E-DCCs into a tree
```

### 3.11 2-SAT

Literal "$x = v$" is node $2x + v$. Clause $(a \lor b)$: edges $\neg a \to b$, $\neg b \to a$. Unsatisfiable iff $x$ and $\neg x$ share an SCC; Tarjan numbers SCCs in reverse topological order, so $x$ takes the value whose literal has the smaller SCC id.

```cpp
struct TwoSat {
    int n, tim = 0, cnt = 0; vector<vector<int>> e;
    vector<int> dfn, low, bel, stk; vector<bool> ins, val;
    TwoSat(int n) : n(n), e(2 * n + 2), dfn(2 * n + 2), low(2 * n + 2), bel(2 * n + 2), ins(2 * n + 2), val(n + 1) {}
    void add_clause(int x, bool a, int y, bool b) { // (x == a) or (y == b)
        e[2 * x + !a].push_back(2 * y + b); // not(x == a) -> (y == b)
        e[2 * y + !b].push_back(2 * x + a); // not(y == b) -> (x == a)
    }
    void imply(int x, bool a, int y, bool b) { add_clause(x, !a, y, b); } // (x == a) -> (y == b)
    void must(int x, bool a) { add_clause(x, a, x, a); }                  // x == a
    void tarjan(int u) {
        dfn[u] = low[u] = ++tim, stk.push_back(u), ins[u] = 1;
        for (int v : e[u]) {
            if (!dfn[v]) tarjan(v), low[u] = min(low[u], low[v]);
            else if (ins[v]) low[u] = min(low[u], dfn[v]);
        }
        if (dfn[u] == low[u]) {
            cnt++;
            int x;
            do x = stk.back(), stk.pop_back(), ins[x] = 0, bel[x] = cnt; while (x != u);
        }
    }
    bool solve() { // false if unsatisfiable, otherwise val[1..n] is a solution
        for (int u = 2; u <= 2 * n + 1; u++) if (!dfn[u]) tarjan(u);
        for (int x = 1; x <= n; x++) {
            if (bel[2 * x] == bel[2 * x + 1]) return false; // x and not x in the same SCC
            val[x] = bel[2 * x + 1] < bel[2 * x];
        }
        return true;
    }
};
```

Usage:

```cpp
TwoSat ts(n);
ts.add_clause(x, 1, y, 0); // x or not y
ts.imply(x, 1, y, 1);      // x -> y
ts.must(x, 0);             // x is false
if (ts.solve()) for (int i = 1; i <= n; i++) cout << ts.val[i] << ' ';
else cout << "IMPOSSIBLE";
```

### 3.12 Max Flow (Dinic) and Min-Cost Flow

BFS level graph + DFS blocking flow with current arc. $O(V^2E)$; $O(E\sqrt V)$ on unit bipartite graphs. Max flow = min cut. Min-cost max-flow: augment along SPFA shortest paths by cost.

```cpp
struct Dinic {
    struct Edge { int v; ll cap; };
    int n; vector<Edge> e; vector<vector<int>> g; vector<int> dis, cur; //cur: 当前弧优化
    Dinic(int n) : n(n), g(n + 1), dis(n + 1), cur(n + 1) {}
    int add_edge(int u, int v, ll cap) {
        g[u].push_back(e.size()), e.push_back({v, cap});
        g[v].push_back(e.size()), e.push_back({u, 0});
        return e.size() - 2;
    }
    bool bfs(int s, int t) { //按最短路给图分层
        fill(dis.begin(), dis.end(), -1), fill(cur.begin(), cur.end(), 0);
        queue<int> q; q.push(s), dis[s] = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i : g[u]) if (e[i].cap && dis[e[i].v] < 0)
                dis[e[i].v] = dis[u] + 1, q.push(e[i].v);
        }
        return dis[t] >= 0;
    }
    ll dfs(int u, int t, ll lim) { //多路增广
        if (u == t) return lim;
        ll res = 0;
        for (int &k = cur[u]; k < (int)g[u].size(); k++) { //更新当前弧，之前的边不用再判断一次
            int i = g[u][k], v = e[i].v;
            if (!e[i].cap || dis[v] != dis[u] + 1) continue; //检查是否为分层图的结构
            ll f = dfs(v, t, min(lim - res, e[i].cap));
            e[i].cap -= f, e[i ^ 1].cap += f, res += f;
            if (res == lim) return res;
        }
        dis[u] = -1; //流不出去了，删掉这个点
        return res;
    }
    ll maxflow(int s, int t) {
        ll res = 0;
        while (bfs(s, t)) res += dfs(s, t, LLONG_MAX);
        return res;
    }
    vector<bool> mincut(int s) { //call after maxflow: true = on the s side
        vector<bool> vis(n + 1);
        queue<int> q; q.push(s), vis[s] = 1;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i : g[u]) if (e[i].cap && !vis[e[i].v]) vis[e[i].v] = 1, q.push(e[i].v);
        }
        return vis;
    }
};
```

Usage:

```cpp
Dinic d(n);
int id = d.add_edge(u, v, c);  // directed edge u -> v with capacity c
ll f = d.maxflow(s, t);
d.e[id ^ 1].cap;               // flow on that edge
auto side = d.mincut(s);       // min cut: edges from side[u] = 1 to side[v] = 0

// bipartite matching: left 1..nl, right nl+1..nl+nr, s = nl+nr+1, t = nl+nr+2
Dinic g(nl + nr + 2); int s = nl + nr + 1, t = s + 1;
for (int i = 1; i <= nl; i++) g.add_edge(s, i, 1);
for (int j = 1; j <= nr; j++) g.add_edge(nl + j, t, 1);
g.add_edge(i, nl + j, 1);      // for each allowed pair (i, j)
g.maxflow(s, t);
```

```cpp
struct MCMF {
    struct Edge { int v; ll cap, cost; };
    int n; vector<Edge> e; vector<vector<int>> g; vector<ll> dis; vector<int> pre; vector<bool> inq;
    MCMF(int n) : n(n), g(n + 1), dis(n + 1), pre(n + 1), inq(n + 1) {}
    int add_edge(int u, int v, ll cap, ll cost) {
        g[u].push_back(e.size()), e.push_back({v, cap, cost});
        g[v].push_back(e.size()), e.push_back({u, 0, -cost});
        return e.size() - 2;
    }
    bool spfa(int s, int t) {
        fill(dis.begin(), dis.end(), LLONG_MAX);
        queue<int> q; q.push(s), dis[s] = 0, inq[s] = 1;
        while (!q.empty()) {
            int u = q.front(); q.pop(), inq[u] = 0;
            for (int i : g[u]) {
                int v = e[i].v;
                if (e[i].cap && dis[u] + e[i].cost < dis[v]) {
                    dis[v] = dis[u] + e[i].cost, pre[v] = i;
                    if (!inq[v]) inq[v] = 1, q.push(v);
                }
            }
        }
        return dis[t] != LLONG_MAX;
    }
    pair<ll, ll> run(int s, int t) { // {max flow, min cost}
        ll flow = 0, cost = 0;
        while (spfa(s, t)) {
            ll f = LLONG_MAX;
            for (int v = t; v != s; v = e[pre[v] ^ 1].v) f = min(f, e[pre[v]].cap);
            for (int v = t; v != s; v = e[pre[v] ^ 1].v) e[pre[v]].cap -= f, e[pre[v] ^ 1].cap += f;
            flow += f, cost += f * dis[t];
        }
        return {flow, cost};
    }
};
```

Usage:

```cpp
MCMF mf(n);
mf.add_edge(u, v, cap, cost);
auto [flow, cost] = mf.run(s, t);
// max-cost max-flow: add every edge with -cost and negate the answer
// min cost with flow at most K: add a source s' with edge s' -> s of capacity K
```

### 3.13 Bipartite Graph

Bipartite iff no odd cycle (2-coloring). Hungarian: augment from each left vertex, $O(nm)$; Hopcroft-Karp $O(E\sqrt V)$; weighted: assignment (KM) $O(n^2 m)$. König: min vertex cover = max matching; max independent set = $n$ − max matching.

```cpp
struct Hungarian {
    int nl, nr, stamp = 0; vector<vector<int>> e; vector<int> match, vis; // match[v]: left partner of right v
    Hungarian(int nl, int nr) : nl(nl), nr(nr), e(nl + 1), match(nr + 1), vis(nr + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v); }
    bool dfs(int u) {
        for (int v : e[u]) if (vis[v] != stamp) {
            vis[v] = stamp;
            if (!match[v] || dfs(match[v])) { match[v] = u; return true; } //目标点还未匹配 或 目标点能与原匹配点脱离
        }
        return false;
    }
    int run() {
        int res = 0;
        for (int u = 1; u <= nl; u++) stamp++, res += dfs(u);
        return res;
    }
};
```

```cpp
struct HopcroftKarp {
    int nl, nr; vector<vector<int>> e; vector<int> ml, mr, dis; // ml[u]: right partner of u, mr[v]: left partner of v
    HopcroftKarp(int nl, int nr) : nl(nl), nr(nr), e(nl + 1), ml(nl + 1), mr(nr + 1), dis(nl + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v); }
    bool bfs() {
        queue<int> q; bool found = false;
        for (int u = 1; u <= nl; u++) if (!ml[u]) dis[u] = 0, q.push(u); else dis[u] = -1;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : e[u]) {
                int w = mr[v];
                if (!w) found = true;
                else if (dis[w] < 0) dis[w] = dis[u] + 1, q.push(w);
            }
        }
        return found;
    }
    bool dfs(int u) {
        for (int v : e[u]) {
            int w = mr[v];
            if (!w || (dis[w] == dis[u] + 1 && dfs(w))) { ml[u] = v, mr[v] = u; return true; }
        }
        dis[u] = -1;
        return false;
    }
    int run() {
        int res = 0;
        while (bfs())
            for (int u = 1; u <= nl; u++) if (!ml[u] && dfs(u)) res++;
        return res;
    }
};
```

Usage (both have the same interface):

```cpp
HopcroftKarp hk(nl, nr);
hk.add_edge(u, v);   // left u - right v
int size = hk.run(); // maximum matching
hk.ml[u], hk.mr[v];  // partners, 0 = unmatched (Hungarian: match[v])
```

```cpp
ll assignment(int n, int m, const vector<vector<ll>> &a, vector<int> &row) { // a[1..n][1..m], n <= m; row[i] = column of row i
    const ll INF = LLONG_MAX / 4;
    vector<ll> u(n + 1), v(m + 1), minv(m + 1);
    vector<int> p(m + 1), way(m + 1); vector<bool> used(m + 1); // p[j]: row matched to column j
    for (int i = 1; i <= n; i++) {
        p[0] = i;
        int j0 = 0;
        fill(minv.begin(), minv.end(), INF), fill(used.begin(), used.end(), false);
        do {
            used[j0] = true;
            int i0 = p[j0], j1 = 0; ll delta = INF;
            for (int j = 1; j <= m; j++) if (!used[j]) {
                ll cur = a[i0][j] - u[i0] - v[j];
                if (cur < minv[j]) minv[j] = cur, way[j] = j0;
                if (minv[j] < delta) delta = minv[j], j1 = j;
            }
            for (int j = 0; j <= m; j++)
                if (used[j]) u[p[j]] += delta, v[j] -= delta;
                else minv[j] -= delta;
            j0 = j1;
        } while (p[j0]);
        do { int j1 = way[j0]; p[j0] = p[j1], j0 = j1; } while (j0);
    }
    row.assign(n + 1, 0);
    for (int j = 1; j <= m; j++) if (p[j]) row[p[j]] = j;
    return -v[0]; // minimum total cost
}
```

Usage:

```cpp
vector<int> row;
ll cost = assignment(n, m, a, row);   // min cost
// max weight: pass -a and negate the result; missing pairs: a large cost
```

### 3.14 Centroid Decomposition

Centroid: largest remaining part $\le n/2$. Handle paths through it, delete it, recurse: depth $O(\log n)$. `run(calc)` calls `calc(c)` for every centroid.

```cpp
struct Centroid {
    int n; vector<vector<pair<int, ll>>> e; vector<int> siz; vector<bool> vis;
    Centroid(int n) : n(n), e(n + 1), siz(n + 1), vis(n + 1) {}
    void add_edge(int u, int v, ll w = 1) { e[u].push_back({v, w}), e[v].push_back({u, w}); }
    int get_siz(int u, int fa) {
        siz[u] = 1;
        for (auto [v, w] : e[u]) if (v != fa && !vis[v]) siz[u] += get_siz(v, u);
        return siz[u];
    }
    int find(int u, int fa, int tot) { //求树的重心: walk into the child holding more than half
        for (auto [v, w] : e[u]) if (v != fa && !vis[v] && siz[v] * 2 > tot) return find(v, u, tot);
        return u;
    }
    void run(const function<void(int)> &calc, int u = 1) {
        int c = find(u, 0, get_siz(u, 0));
        vis[c] = 1;
        calc(c); //统计经过重心的路径，因题而异
        for (auto [v, w] : e[c]) if (!vis[v]) run(calc, v); //递归处理子树
    }
};
```

Usage:

```cpp
// for each query k[t] (1 <= k[t] <= K): is there a path of length exactly k[t]?
Centroid cd(n);
cd.add_edge(u, v, w);
vector<char> ok(m + 1), has(K + 1); // has: 桶记录 of distances from earlier subtrees
cd.run([&](int c) {
    vector<ll> used = {0}; has[0] = 1; //c--c的dis
    for (auto [v, w] : cd.e[c]) if (!cd.vis[v]) {
        vector<ll> cur; //当前子树中的dis
        auto dfs = [&](auto &self, int u, int fa, ll d) -> void {
            cur.push_back(d);
            for (auto [x, y] : cd.e[u]) if (x != fa && !cd.vis[x]) self(self, x, u, d + y);
        };
        dfs(dfs, v, c, w);
        for (ll d : cur) for (int t = 1; t <= m; t++)
            if (k[t] >= d && has[k[t] - d]) ok[t] = 1;
        for (ll d : cur) if (d <= K && !has[d]) has[d] = 1, used.push_back(d);
    }
    for (ll d : used) has[d] = 0; //只清空用过的位置（每次清空整个桶会超时）
});
```

### 3.15 Virtual Tree

Keep only key vertices and LCAs of dfn-adjacent ones: $O(k)$ vertices per query. Sort keys by `dfn`, add LCAs of neighbors, sort again; parent = LCA with the predecessor.

```cpp
// returns the vertices of the virtual tree, root first; vt[u] gets the children of u
vector<int> build_virtual(HLD &h, vector<int> keys, vector<vector<int>> &vt) {
    auto cmp = [&](int a, int b) { return h.dfn[a] < h.dfn[b]; };
    sort(keys.begin(), keys.end(), cmp);
    vector<int> vs = keys;
    for (int i = 0; i + 1 < (int)keys.size(); i++) vs.push_back(h.lca(keys[i], keys[i + 1]));
    sort(vs.begin(), vs.end(), cmp);
    vs.erase(unique(vs.begin(), vs.end()), vs.end());
    for (int i = 1; i < (int)vs.size(); i++) vt[h.lca(vs[i - 1], vs[i])].push_back(vs[i]);
    return vs;
}
```

Usage:

```cpp
// each query: k key vertices, output the sum of distances over all pairs of keys
HLD h(n); /* add edges */ h.build(1);
vector<vector<int>> vt(n + 1); vector<int> key(n + 1); vector<ll> sz(n + 1);
while (Q--) {
    vector<int> keys(k); // read keys
    for (int x : keys) key[x] = 1;
    auto vs = build_virtual(h, keys, vt);
    ll res = 0;
    for (int i = vs.size() - 1; i >= 0; i--) { // reverse dfn order: children before parents
        int u = vs[i]; sz[u] = key[u];
        for (int v : vt[u]) {
            sz[u] += sz[v];
            res += sz[v] * (k - sz[v]) * (h.dep[v] - h.dep[u]); //经过这条边的贡献
        }
    }
    cout << res << '\n';
    for (int u : vs) vt[u].clear(), key[u] = 0; //清空
}
```

## 4. Math

### 4.1 GCD, Exgcd, Inverse

$ax + by = \gcd(a, b)$; general solution $x = x_0 \frac{c}{g} + k\frac{b}{g}$, $y = y_0 \frac{c}{g} - k \frac{a}{g}$ (solvable iff $g \mid c$). Inverse: Fermat $a^{p-2}$ ($p$ prime), exgcd ($\gcd(a, p) = 1$), or linear $inv_i = -\lfloor p/i \rfloor \cdot inv_{p \bmod i}$.

```cpp
ll gcd(ll a, ll b) { while (b) { ll r = a % b; a = b, b = r; } return a; } // or std::gcd / __gcd
ll lcm(ll a, ll b) { return a / gcd(a, b) * b; }
```

```cpp
ll exgcd(ll a, ll b, ll &x, ll &y) { // a*x + b*y = gcd(a, b)
    if (b == 0) { x = 1, y = 0; return a; }
    ll g = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}
ll inv_exgcd(ll a, ll p) { // gcd(a, p) = 1
    ll x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
```

```cpp
vector<ll> inverse_table(int n, ll p) { // inv[1..n] mod prime p, n < p
    vector<ll> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) inv[i] = (p - p / i) * inv[p % i] % p;
    return inv;
}
```

### 4.2 Primes and Sieves

Eratosthenes $O(n \log\log n)$; linear sieve removes each composite by its smallest prime, $O(n)$. For $k = i \cdot p$: if $p \nmid i$, $f(k) = f(i) f(p)$; if $p \mid i$, use the exponent of $p$.
$\varphi(n) = n \prod_{p \mid n}(1 - \frac1p)$; $\mu(n) = (-1)^k$ if square-free with $k$ primes, else $0$; $d(n) = \prod (c_i + 1)$; $\sigma(n) = \prod (1 + p_i + \cdots + p_i^{c_i})$.

```cpp
bool is_prime(ll x) { // O(sqrt x); for x up to 1e18 use miller_rabin below
    if (x < 2) return false;
    for (ll i = 2; i * i <= x; i++)
        if (x % i == 0) return false;
    return true;
}
```

```cpp
vector<pair<ll, int>> factorize(ll x) { // (prime, exponent), O(sqrt x)
    vector<pair<ll, int>> res;
    for (ll i = 2; i * i <= x; i++) {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) res.push_back({i, cnt});
    }
    if (x > 1) res.push_back({x, 1});
    return res;
}
```

```cpp
ll mulmod(ll a, ll b, ll m) { return (__int128)a * b % m; }
ll powmod(ll a, ll b, ll m) {
    ll r = 1 % m;
    for (a %= m; b; b >>= 1, a = mulmod(a, a, m)) if (b & 1) r = mulmod(r, a, m);
    return r;
}
bool miller_rabin(ll n) {
    if (n < 2) return false;
    for (ll p : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}) if (n % p == 0) return n == p;
    ll d = n - 1; int s = 0;
    while (d % 2 == 0) d /= 2, s++;
    for (ll a : {2, 325, 9375, 28178, 450775, 9780504, 1795265022}) {
        ll x = powmod(a, d, n);
        if (x == 0 || x == 1 || x == n - 1) continue;
        bool comp = true;
        for (int i = 1; i < s && comp; i++) if ((x = mulmod(x, x, n)) == n - 1) comp = false;
        if (comp) return false;
    }
    return true;
}
ll pollard_rho(ll n) { // a nontrivial factor of composite n
    static mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    if (n % 2 == 0) return 2;
    while (true) {
        ll c = rng() % (n - 1) + 1, x = rng() % n, y = x, g = 1, q = 1;
        auto f = [&](ll v) { return (mulmod(v, v, n) + c) % n; };
        for (int k = 1; g == 1; k <<= 1) { // Brent: batch 128 gcds
            x = y;
            for (int i = 0; i < k; i++) y = f(y);
            for (int i = 0; i < k && g == 1; i += 128) {
                ll ys = y;
                for (int j = 0; j < min(128, k - i); j++) y = f(y), q = mulmod(q, llabs(x - y), n);
                g = __gcd(q, n);
                if (g == n) { // overshoot: redo one step at a time
                    for (y = ys, g = 1; g == 1; ) y = f(y), g = __gcd(llabs(x - y), n);
                }
            }
        }
        if (g != n) return g;
    }
}
void factor(ll n, vector<ll> &res) { // prime factors with multiplicity (unsorted)
    if (n == 1) return;
    if (miller_rabin(n)) { res.push_back(n); return; }
    ll d = pollard_rho(n);
    factor(d, res), factor(n / d, res);
}
```

Usage:

```cpp
miller_rabin(998244353);   // true
vector<ll> fs; factor(x, fs); sort(fs.begin(), fs.end()); // 1e18 -> 2 x18, 5 x18
```

```cpp
vector<bool> npr; // is composite / not prime
vector<int> primes, low;
void Linear(int n) {
    npr.assign(n + 1, false);
    low.assign(n + 1, 0);
    primes.clear();
    npr[0] = npr[1] = true;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), low[i] = i;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            low[k] = pr;
            if (i % pr == 0) break;
        }
    }
}
```

```cpp
int phi(int n) { //根据基础定义，求单个数的欧拉函数
    int res = n, m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (n % i == 0) {
            res -= res / i;
            while (n % i == 0) n /= i;
        }
    if (n > 1) res -= res / n;
    return res;
}
```

```cpp
vector<bool> npr;
vector<int> primes, phi;
void Euler(int n) { //欧拉函数
    npr.assign(n + 1, false);
    phi.assign(n + 1, 0);
    primes.clear();
    phi[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), phi[i] = i - 1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { 
                phi[k] = phi[i] * pr;
                break;
            } else phi[k] = phi[i] * (pr - 1);
        }
    }
}
```

```cpp
vector<bool> npr;
vector<int> primes, miu;
void Mobius(int n) { //莫比乌斯函数
    npr.assign(n + 1, false);
    miu.assign(n + 1, 0);
    primes.clear();
    miu[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), miu[i] = -1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { miu[k] = 0; break; }
            else miu[k] = -miu[i];
        }
    }
}
```

```cpp
vector<bool> npr;
vector<int> primes, d;
void NumDivisors(int n) { //约数个数
    npr.assign(n + 1, false);
    d.assign(n + 1, 0);
    primes.clear();
    d[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), d[i] = 2;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { 
                d[k] = 2 * d[i] - d[i / pr];
                break; 
            } else d[k] = 2 * d[i];
        }
    }
}
```

```cpp
vector<bool> npr;
vector<int> primes, s;
void SumDivisors(int n) { //约数和
    npr.assign(n + 1, false);
    s.assign(n + 1, 0);
    primes.clear();
    s[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), s[i] = i + 1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) {
                s[k] = s[i] + (s[i] - s[i / pr]) * pr;
                break;
            } else s[k] = s[i] * (pr + 1);
        }
    }
}
```

### 4.3 Combinatorics

$\binom{n}{m} = \frac{n!}{m!(n-m)!}$, Pascal $\binom{n}{m} = \binom{n-1}{m} + \binom{n-1}{m-1}$. Lucas: $\binom{n}{m} \equiv \binom{n \bmod p}{m \bmod p}\binom{\lfloor n/p \rfloor}{\lfloor m/p \rfloor} \pmod p$.
Catalan: $Cat_n = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n-1}$, $Cat_n = \sum_{i=1}^{n} Cat_{i-1}Cat_{n-i}$ (brackets, stack orders, binary trees, triangulations).
exLucas: split $p = \prod p_i^{k_i}$, remove factors $p_i$ from factorials, merge with CRT.

```cpp
struct Comb { // factorials mod a prime p, for 0 <= n < p
    ll p; vector<ll> fac, ifac;
    Comb(int n, ll p = mod) : p(p), fac(n + 1), ifac(n + 1) {
        fac[0] = 1;
        for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i % p;
        ifac[n] = pw(fac[n], p - 2);
        for (int i = n; i > 0; i--) ifac[i - 1] = ifac[i] * i % p;
    }
    ll pw(ll a, ll b) { ll r = 1; for (a %= p; b; b >>= 1, a = a * a % p) if (b & 1) r = r * a % p; return r; }
    ll C(ll n, ll m) { return m < 0 || m > n ? 0 : fac[n] * ifac[m] % p * ifac[n - m] % p; } //组合数
    ll A(ll n, ll m) { return m < 0 || m > n ? 0 : fac[n] * ifac[n - m] % p; }              //排列数
    ll inv(ll n) { return ifac[n] * fac[n - 1] % p; }                                      // 1 / n, n >= 1
    ll lucas(ll n, ll m) { return m == 0 ? 1 : C(n % p, m % p) * lucas(n / p, m / p) % p; } // needs Comb(p - 1, p)
};
```

Usage:

```cpp
Comb cb(2e6);            // mod from the starter
cb.C(n, m), cb.A(n, m), cb.inv(n);
Comb lu(p - 1, p);       // small prime p
lu.lucas(n, m);          // C(n, m) mod p for huge n, m
```

```cpp
namespace exLucas {
    ll qpow(ll a, ll b, ll p) { ll r = 1 % p; for (a %= p; b; b >>= 1, a = a * a % p) if (b & 1) r = r * a % p; return r; }
    ll exgcd(ll a, ll b, ll &x, ll &y) {
        if (b == 0) { x = 1, y = 0; return a; }
        ll g = exgcd(b, a % b, y, x);
        y -= a / b * x;
        return g;
    }
    ll inv(ll a, ll p) { ll x, y; exgcd(a, p, x, y); return (x % p + p) % p; }
    ll fac(ll n, ll p, ll pk) { //n!/p^x mod p^k
        if (!n) return 1;
        ll ans = 1;
        for (ll i = 1; i < pk; ++i) //n/pk个循环节
            if (i % p) ans = ans * i % pk;
        ans = qpow(ans, n / pk, pk);
        for (ll i = 1; i <= n % pk; ++i) //剩余部分
            if (i % p) ans = ans * i % pk;
        return ans * fac(n / p, p, pk) % pk; //余下的递归处理
    }
    ll C(ll n, ll m, ll p, ll pk) { //C(n, m) mod p^k
        if (m > n) return 0;
        ll f1 = fac(n, p, pk), f2 = fac(m, p, pk), f3 = fac(n - m, p, pk);
        ll k = 0; //统计阶乘中p的倍数的个数
        for (ll i = n; i; i /= p) k += i / p;
        for (ll i = m; i; i /= p) k -= i / p;
        for (ll i = n - m; i; i /= p) k -= i / p;
        return f1 * inv(f2, pk) % pk * inv(f3, pk) % pk * qpow(p, k, pk) % pk;
    }
    ll exlucas(ll n, ll m, ll P) { // C(n, m) mod any P (P up to ~1e6 per prime power)
        vector<ll> a, c; //求解ans ≡ C(n, m) (mod p[i]^k[i])
        for (ll i = 2; i * i <= P; ++i) {
            ll t = 1;
            while (P % i == 0) P /= i, t *= i;
            if (t > 1) a.push_back(C(n, m, i, t)), c.push_back(t);
        }
        if (P > 1) a.push_back(C(n, m, P, P)), c.push_back(P);
        ll M = 1, ans = 0; // CRT, moduli are coprime
        for (ll x : c) M *= x;
        for (size_t i = 0; i < a.size(); i++) {
            ll w = M / c[i];
            ans = (ans + (__int128)a[i] * w % M * inv(w % c[i], c[i])) % M;
        }
        return ans;
    }
}
```

Usage:

```cpp
exLucas::exlucas(n, m, P); // C(n, m) mod P, P not necessarily prime
```

### 4.4 CRT / exCRT

Coprime moduli: $x = \sum a_i c_i t_i \bmod M$, $c_i = M / m_i$, $t_i = c_i^{-1} \bmod m_i$. General: merge two at a time, $m_1 p - m_2 q = a_2 - a_1$, new modulus $\operatorname{lcm}(m_1, m_2)$.

```cpp
ll CRT(const vector<ll> &a, const vector<ll> &m) { // x = a[i] (mod m[i]), i = 1..n (size n + 1), m pairwise coprime, product fits in ll
    int n = a.size() - 1;
    ll M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i) {
        ll c = M / m[i], t, y; //除m[i]以外所有模数的倍数
        exgcd(c, m[i], t, y); //c*t≡1(mod m[i])
        t = (t % m[i] + m[i]) % m[i];
        ans = (ans + (__int128)a[i] % M * c % M * t) % M; //∑ a[i]*c[i]*t[i]
    }
    return (ans % M + M) % M;
}
```

```cpp
pair<ll, ll> EXCRT(const vector<ll> &a, const vector<ll> &m) { // i = 1..n (size n + 1); returns {x, lcm}, or {-1, -1} if no solution; lcm must fit in ll
    int n = a.size() - 1;
    ll M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) {
        ll x, y, g = exgcd(M, m[i], x, y), c = ((a[i] - ans) % m[i] + m[i]) % m[i]; //M*x≡a[i]-ans(mod m[i])
        if (c % g) return {-1, -1}; //判断无解
        ll mg = m[i] / g;
        x = ((__int128)x * (c / g) % mg + mg) % mg; //x * c 可能超出 long long
        ll L = M / g * m[i]; //更新前i个数的lcm
        ans = ((ans + (__int128)x * M) % L + L) % L; //ans+x[i]*M
        M = L;
    }
    return {ans, M};
}
```

### 4.5 BSGS

$a^x \equiv b \pmod p$, $\gcd(a, p) = 1$. $x = it - j$, $t = \lceil \sqrt p \rceil$: store $b a^j$, then search $(a^t)^i$. $O(\sqrt p)$ expected (hash map).

```cpp
ll BSGS(ll a, ll b, ll p) { // smallest x >= 0 with a^x = b (mod p), gcd(a, p) = 1; -1 if none
    a %= p, b %= p;
    if (b == 1 % p) return 0;
    ll t = sqrtl(p) + 1;
    unordered_map<ll, ll> hash; //多次调用时注意清空
    ll cur = b;
    for (ll j = 0; j < t; j++) hash[cur] = j, cur = (__int128)cur * a % p; // b * a^j, keeps the largest j
    ll at = 1;
    for (ll j = 0; j < t; j++) at = (__int128)at * a % p; // a^t
    cur = 1;
    for (ll i = 1; i <= t; i++) {
        cur = (__int128)cur * at % p; // (a^t)^i
        auto it = hash.find(cur);
        if (it != hash.end()) return i * t - it->second;
    }
    return -1; //无解
}
```

### 4.6 Matrix Fast Power

$C_{i,j} = \sum_k A_{i,k} B_{k,j}$. Linear recurrence: $F_i = A F_{i-1} \Rightarrow F_i = A^i F_0$. $O(n^3 \log b)$

```cpp
struct Matrix { // square, 1-indexed, entries mod `mod`
    int n; vector<vector<ll>> a;
    Matrix(int n, bool id = false) : n(n), a(n + 1, vector<ll>(n + 1)) { if (id) for (int i = 1; i <= n; i++) a[i][i] = 1; }
    vector<ll> &operator[](int i) { return a[i]; }
    friend Matrix operator*(const Matrix &A, const Matrix &B) {
        Matrix C(A.n);
        for (int i = 1; i <= A.n; ++i)
            for (int k = 1; k <= A.n; ++k) if (A.a[i][k])
                for (int j = 1; j <= A.n; ++j)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
        return C;
    }
};
Matrix mpow(Matrix base, ll b) {
    Matrix res(base.n, true); // identity
    for (; b; b >>= 1, base = base * base)
        if (b & 1) res = res * base;
    return res;
}
```

Usage:

```cpp
// Fibonacci: (F[i], F[i-1]) = A * (F[i-1], F[i-2])
Matrix A(2);
A[1][1] = A[1][2] = A[2][1] = 1;
Matrix P = mpow(A, k);
ll Fk = P[2][1]; // F[k] with F[0] = 0, F[1] = 1
```

### 4.7 Gaussian Elimination

Gauss-Jordan on `a[1..n][1..n+1]`. All-zero coefficient row with nonzero RHS: no solution; otherwise a free variable: infinitely many. $O(n^3)$. Also: determinant mod $p$, XOR systems with `bitset`.

```cpp
// solves a[1..n][1..n] x = a[.][n + 1]; returns 1 unique (x filled), 0 infinitely many, -1 none
int gauss(int n, vector<vector<double>> a, vector<double> &x) {
    const double eps = 1e-9;
    int r = 1; vector<int> where(n + 1, 0); // where[col] = pivot row
    for (int c = 1; c <= n && r <= n; c++) { //枚举列
        int piv = r;
        for (int i = r + 1; i <= n; i++) if (fabs(a[i][c]) > fabs(a[piv][c])) piv = i; //绝对值最大的放上面
        if (fabs(a[piv][c]) < eps) continue; //系数为0
        swap(a[piv], a[r]);
        for (int j = n + 1; j >= c; j--) a[r][j] /= a[r][c]; //把当前x系数变为1
        for (int i = 1; i <= n; i++) if (i != r && fabs(a[i][c]) > eps) //把同一列上其他x的系数变为0
            for (int j = n + 1; j >= c; j--) a[i][j] -= a[i][c] * a[r][j];
        where[c] = r++;
    }
    for (int i = r; i <= n; i++) if (fabs(a[i][n + 1]) > eps) return -1; //0 = nonzero: 无解
    x.assign(n + 1, 0);
    for (int c = 1; c <= n; c++) if (where[c]) x[c] = a[where[c]][n + 1];
    return r <= n ? 0 : 1; //有自由元：无穷解
}
```

Usage:

```cpp
vector<vector<double>> a(n + 1, vector<double>(n + 2)); // a[i][n + 1] = right-hand side
vector<double> x;
int res = gauss(n, a, x);
if (res == 1) for (int i = 1; i <= n; i++) printf("x%d = %.2lf\n", i, x[i]);
```

```cpp
ll det_mod(int n, vector<vector<ll>> a, ll p = mod) { // determinant of a[1..n][1..n] mod prime p
    auto pw = [&](ll x, ll e) { ll r = 1; for (x %= p; e; e >>= 1, x = x * x % p) if (e & 1) r = r * x % p; return r; };
    ll det = 1;
    for (int c = 1; c <= n; c++) {
        int piv = c;
        while (piv <= n && a[piv][c] % p == 0) piv++;
        if (piv > n) return 0;
        if (piv != c) swap(a[piv], a[c]), det = (p - det) % p; //交换两行，行列式变号
        det = det * (a[c][c] % p + p) % p;
        ll iv = pw((a[c][c] % p + p) % p, p - 2);
        for (int i = c + 1; i <= n; i++) {
            ll f = (a[i][c] % p + p) % p * iv % p;
            if (f) for (int j = c; j <= n; j++) a[i][j] = ((a[i][j] - f * a[c][j]) % p + p) % p;
        }
    }
    return det;
}
```

```cpp
const int MAXV = 2005; // number of variables + 2
// m equations a[1..m] (a.size() == m + 1), variables x[1..n], a[i][n + 1] = rhs; returns rank, -1 if none
int gauss_xor(int n, int m, vector<bitset<MAXV>> a, bitset<MAXV> &x) {
    int r = 1; vector<int> where(n + 1, 0);
    for (int c = 1; c <= n && r <= m; c++) {
        int piv = r;
        while (piv <= m && !a[piv][c]) piv++;
        if (piv > m) continue;
        swap(a[piv], a[r]), where[c] = r;
        for (int i = 1; i <= m; i++) if (i != r && a[i][c]) a[i] ^= a[r];
        r++;
    }
    for (int i = r; i <= m; i++) if (a[i][n + 1]) return -1;
    x.reset();
    for (int c = 1; c <= n; c++) if (where[c]) x[c] = a[where[c]][n + 1]; // free variables = 0
    return r - 1;
}
```

### 4.8 XOR Linear Basis

`p[i]` has highest bit $i$; $cnt$ nonzero → $2^{cnt}$ distinct XOR values. Reduce to diagonal form for $k$-th smallest / rank.

```cpp
struct LinearBasis {
    static const int B = 62;
    vector<ll> p = vector<ll>(B); bool zero = false; // zero: some nonempty subset XORs to 0
    bool insert(ll x) { //插入构造线性基, false if x was already representable
        for (int i = B - 1; i >= 0; i--) if (x >> i & 1) {
            if (!p[i]) { p[i] = x; return true; }
            x ^= p[i];
        }
        zero = true; //x被消成0，说明能异或出0
        return false;
    }
    bool contains(ll x) { for (int i = B - 1; i >= 0; i--) if (x >> i & 1) x ^= p[i]; return x == 0; }
    ll max_xor(ll x = 0) { for (int i = B - 1; i >= 0; i--) x = max(x, x ^ p[i]); return x; } //最大异或和
    ll min_xor() { //最小异或和 (nonempty subset)
        if (zero) return 0;
        for (int i = 0; i < B; i++) if (p[i]) return p[i];
        return -1; // empty basis
    }
    void merge(const LinearBasis &o) { for (int i = 0; i < B; i++) if (o.p[i]) insert(o.p[i]); } //线性基合并
    vector<ll> reduced() { //将线性基转为对角矩阵, returns the basis from small to large
        vector<ll> r;
        for (int i = B - 1; i >= 0; i--) for (int j = i - 1; j >= 0; j--) if (p[i] >> j & 1) p[i] ^= p[j];
        for (int i = 0; i < B; i++) if (p[i]) r.push_back(p[i]);
        return r;
    }
    ll kth(ll k) { // k-th smallest distinct nonempty-subset XOR (k >= 1), -1 if k is too large
        auto r = reduced();
        if (zero) k--; // 0 is the smallest
        if (k == 0) return 0;
        if (k >= (1LL << r.size())) return -1;
        ll ans = 0;
        for (int i = 0; i < (int)r.size(); i++) if (k >> i & 1) ans ^= r[i];
        return ans;
    }
    ll rank(ll q) { // rank of a representable q among the 2^cnt distinct values in span (0 has rank 1)
        auto r = reduced(); ll ans = 0;
        for (int i = 0; i < (int)r.size(); i++) if (q >> __lg(r[i]) & 1) ans |= 1LL << i; //这一位为1可以参与构造q
        return ans + 1;
    }
};
```

Usage:

```cpp
LinearBasis lb;
for (int i = 1; i <= n; i++) lb.insert(a[i]);
lb.max_xor();      // max XOR of a subset
lb.min_xor();      // min XOR of a nonempty subset
lb.kth(k);         // k-th smallest
lb.contains(x);
lb.merge(other);
```

### 4.9 Möbius Inversion

$\sum_{d \mid n}\mu(d) = [n = 1]$, so $[\gcd(i, j) = 1] = \sum_{d \mid \gcd(i,j)} \mu(d)$.
$f(n) = \sum_{d \mid n} g(d) \iff g(n) = \sum_{d \mid n} \mu(d) f(n/d)$.
$\sum_{i=1}^{n}\sum_{j=1}^{m}[\gcd(i,j) = k] = \sum_{d} \mu(d) \lfloor \frac{n}{kd} \rfloor \lfloor \frac{m}{kd} \rfloor$; $\sum\sum \gcd(i,j) = \sum_t \varphi(t) \lfloor \frac nt \rfloor \lfloor \frac mt \rfloor$.
Division blocks: $\lfloor n/l \rfloor$ is constant for $l \in [l, n / \lfloor n/l \rfloor]$, $O(\sqrt n)$ blocks. Below: $\sum_{i \le n}\sum_{j \le m} d(ij) = \sum_d \mu(d) f(\lfloor n/d \rfloor) f(\lfloor m/d \rfloor)$, $f(k) = \sum_{i \le k} \lfloor k/i \rfloor$.

```cpp
struct Mobius {
    vector<int> mu, primes; vector<ll> pre; // pre[i] = mu[1] + ... + mu[i]
    Mobius(int n) : mu(n + 1), pre(n + 1) {
        vector<bool> np(n + 1);
        mu[1] = 1;
        for (int i = 2; i <= n; i++) {
            if (!np[i]) primes.push_back(i), mu[i] = -1;
            for (int p : primes) {
                if ((ll)i * p > n) break;
                np[i * p] = 1;
                if (i % p == 0) { mu[i * p] = 0; break; }
                mu[i * p] = -mu[i];
            }
        }
        for (int i = 1; i <= n; i++) pre[i] = pre[i - 1] + mu[i]; //前缀和
    }
    // sum over d <= min(n, m) of mu(d) * f(n / d, m / d), grouping equal quotients (整除分块); n, m <= size
    ll block_sum(ll n, ll m, function<ll(ll, ll)> f) {
        ll res = 0;
        for (ll l = 1, r; l <= min(n, m); l = r + 1) {
            r = min(n / (n / l), m / (m / l));
            res += (pre[r] - pre[l - 1]) * f(n / l, m / l);
        }
        return res;
    }
};
```

Usage:

```cpp
Mobius mb(5e4);
// pairs (i, j), i <= n, j <= m with gcd(i, j) = 1 (use n / k, m / k for gcd = k)
mb.block_sum(n, m, [](ll a, ll b) { return a * b; });

// this problem: sum of d(ij) = sum mu(d) f(n / d) f(m / d), f(x) = sum_{i <= x} floor(x / i)
vector<ll> f(5e4 + 1);
for (int x = 1; x <= 5e4; x++) //整除分块预处理的函数
    for (int l = 1, r; l <= x; l = r + 1) r = x / (x / l), f[x] += (ll)(x / l) * (r - l + 1);
mb.block_sum(n, m, [&](ll a, ll b) { return f[a] * f[b]; });
```

## 5. String

### 5.1 String Hash

$h(l, r) = h_r - h_{l-1} B^{r-l+1}$. Structs take a 0-indexed `string`, `get(l, r)` is 1-indexed inclusive; bases are `static`, so different objects compare directly. `ull` overflow is broken by Thue–Morse; `Hash61` (mod $2^{61}-1$) is safe. Helpers `same`/`lcp`/`cmp` take `Hash &`, change the type for other structs.

```cpp
struct Hash {
    static constexpr ull B = 131;
    int n; vector<ull> h, p;
    Hash(const string &s) : n(s.size()), h(n + 1), p(n + 1, 1) {
        for (int i = 1; i <= n; i++)
            p[i] = p[i - 1] * B, h[i] = h[i - 1] * B + s[i - 1];
    }
    ull get(int l, int r) { return h[r] - h[l - 1] * p[r - l + 1]; }
    ull get() { return h[n]; }
};

bool same(Hash &a, int l1, int r1, Hash &b, int l2, int r2) { return r1 - l1 == r2 - l2 && a.get(l1, r1) == b.get(l2, r2); }
// longest common prefix of a[l1..] and b[l2..]
int lcp(Hash &a, int l1, Hash &b, int l2) {
    int L = 0, R = min(a.n - l1 + 1, b.n - l2 + 1);
    while (L < R) {
        int M = (L + R + 1) / 2;
        if (same(a, l1, l1 + M - 1, b, l2, l2 + M - 1)) L = M;
        else R = M - 1;
    }
    return L;
}
// compare a[l1..r1] and b[l2..r2] lexicographically, return -1 for a < b, 0 for a == b, 1 for a > b
int cmp(Hash &a, int l1, int r1, Hash &b, int l2, int r2) {
    int k = lcp(a, l1, b, l2), n1 = r1 - l1 + 1, n2 = r2 - l2 + 1;
    if (k >= min(n1, n2)) return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
    return a.get(l1 + k, l1 + k) < b.get(l2 + k, l2 + k) ? -1 : 1;
}
```

Usage:

```cpp
string s = "abcabc", t = "abc";
Hash hs(s), ht(t);

hs.get(1, 3) == hs.get(4, 6);   // true:  s[1..3] == s[4..6], same string
same(hs, 4, 6, ht, 1, 3);       // true:  s[4..6] == t[1..3], two strings
same(hs, 1, hs.n, ht, 1, ht.n); // false: s != t
lcp(hs, 1, hs, 4);              // 3

// occurrences of t in s (Rabin–Karp)
int cnt = 0;
for (int i = 1; i + ht.n - 1 <= hs.n; i++) cnt += same(hs, i, i + ht.n - 1, ht, 1, ht.n); // 2

// number of distinct substrings of length len
set<ull> st;
for (int i = 1; i + len - 1 <= hs.n; i++) st.insert(hs.get(i, i + len - 1));
int distinct = st.size();
```

```cpp
struct Hash61 {
    static constexpr ull M = (1ULL << 61) - 1, B = 131;
    int n; vector<ull> h, p;
    static ull mul(ull a, ull b) { return (__int128)a * b % M; }
    Hash61(const string &s) : n(s.size()), h(n + 1), p(n + 1, 1) {
        for (int i = 1; i <= n; i++) {
            p[i] = mul(p[i - 1], B), h[i] = (mul(h[i - 1], B) + s[i - 1]) % M;
        }
    }
    ull get(int l, int r) { return (h[r] + M - mul(h[l - 1], p[r - l + 1])) % M; }
};
```

```cpp
struct DoubleHash {
    static constexpr ll M1 = 1e9 + 7, M2 = 998244353, B1 = 131, B2 = 13331;
    int n; vector<ll> h1, h2, p1, p2;
    DoubleHash(const string &s) : n(s.size()), h1(n + 1), h2(n + 1), p1(n + 1, 1), p2(n + 1, 1) {
        for (int i = 1; i <= n; i++) {
            p1[i] = p1[i - 1] * B1 % M1, h1[i] = (h1[i - 1] * B1 + s[i - 1]) % M1;
            p2[i] = p2[i - 1] * B2 % M2, h2[i] = (h2[i - 1] * B2 + s[i - 1]) % M2;
        }
    }
    ll get(int l, int r) {
        ll x = ((h1[r] - h1[l - 1] * p1[r - l + 1]) % M1 + M1) % M1;
        ll y = ((h2[r] - h2[l - 1] * p2[r - l + 1]) % M2 + M2) % M2;
        return x << 32 | y;
    }
};
```

### 5.2 KMP

$nxt_i$ = longest proper border of $s[1..i]$; on mismatch $j \leftarrow nxt_j$. $O(|s| + |t|)$

```cpp
vector<int> get_nxt(const string &s) { //前缀函数, nxt[1..n]
    int n = s.size(); vector<int> nxt(n + 1);
    for (int i = 2, j = 0; i <= n; ++i) {
        while (j && s[i - 1] != s[j]) j = nxt[j];
        if (s[i - 1] == s[j]) j++;
        nxt[i] = j;
    }
    return nxt;
}
vector<int> kmp_find(const string &t, const string &s) { // all positions (1-indexed) where s occurs in t
    auto nxt = get_nxt(s); vector<int> res;
    int n = s.size();
    for (int i = 1, j = 0; i <= (int)t.size(); ++i) {
        while (j && (j == n || t[i - 1] != s[j])) j = nxt[j];
        if (t[i - 1] == s[j]) j++;
        if (j == n) res.push_back(i - n + 1); //s在t中出现的位置
    }
    return res;
}
```

Usage:

```cpp
auto pos = kmp_find("abababa", "aba"); // {1, 3, 5}
auto nxt = get_nxt(s);
int period = n - nxt[n];               // shortest period of s; s is a power of a string iff n % period == 0
```

```cpp
vector<int> z_function(const string &s) { // z[1..n]
    int n = s.size(); vector<int> z(n + 1);
    if (!n) return z;
    z[1] = n;
    for (int i = 2, l = 1, r = 0; i <= n; i++) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l + 1]);
        while (i + z[i] <= n && s[z[i]] == s[i + z[i] - 1]) z[i]++;
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}
```

Usage:

```cpp
auto z = z_function(s + '#' + t); // matches of s in t: positions i > |s| + 1 with z[i] >= |s|
```

### 5.3 Manacher

Insert separators; reuse the mirror radius inside the rightmost palindrome, $O(n)$. Longest palindrome length $= \max d_i - 1$.

```cpp
// s = "^#t1#t2#...#tn#$", so t[j] (1-indexed) sits at s[2j]; d[i]: radius at s[i] (d[i] - 1 = length of that palindrome in t)
vector<int> manacher(const string &t) {
    string s = "^#"; //在字符中间加隔板，两端哨兵防止越界
    for (char c : t) s += c, s += '#';
    s += '$';
    int n = s.size(); vector<int> d(n);
    for (int i = 1, mid = 0, r = 0; i < n - 1; i++) {
        d[i] = i <= r ? min(d[2 * mid - i], r - i + 1) : 1; //取对称点
        while (s[i - d[i]] == s[i + d[i]]) d[i]++; //扩展半径
        if (i + d[i] - 1 > r) r = i + d[i] - 1, mid = i; //扩展最右侧右端点
    }
    return d;
}
string longest_palindrome(const string &t) {
    auto d = manacher(t);
    int i = max_element(d.begin(), d.end()) - d.begin();
    return t.substr((i - d[i]) / 2, d[i] - 1); // the palindrome starts at t[(i - d[i]) / 2 + 1] (1-indexed)
}
```

Usage:

```cpp
auto d = manacher(t);
// positions j are 1-indexed
// odd palindrome centered at t[j]: d[2 * j] - 1 = its max length
// even palindrome centered between t[j] and t[j + 1]: d[2 * j + 1] - 1
longest_palindrome("abacabad"); // "abacaba"
```

### 5.4 Trie

Path from the root spells a prefix; `end` counts words ending at a node, `pass` words through it. Root is node 0. 01-trie: max XOR.

```cpp
struct Trie {
    static const int K = 26; static const char base = 'a'; // alphabet: K letters from base (digits: 10, '0')
    struct Node { int ch[K], end, pass; }; //end: 以此结尾的串数, pass: 经过此点的串数
    vector<Node> t{Node{}};
    void insert(const string &s) { //插入一个字符串
        int u = 0;
        t[0].pass++;
        for (char c : s) {
            int i = c - base;
            if (!t[u].ch[i]) t[u].ch[i] = t.size(), t.push_back(Node{});
            u = t[u].ch[i], t[u].pass++;
        }
        t[u].end++;
    }
    int walk(const string &s) {
        int u = 0;
        for (char c : s) if (!(u = t[u].ch[c - base])) return -1;
        return u;
    }
    int count(const string &s) { int u = walk(s); return u < 0 ? 0 : t[u].end; }  //检索字符串出现次数
    int prefix(const string &s) { int u = walk(s); return u < 0 ? 0 : t[u].pass; }   // words with prefix s
};
```

Usage:

```cpp
Trie tr;             // lowercase letters; for digits set K = 10, base = '0'
tr.insert(s);
tr.count(s);         // how many times s was inserted
tr.prefix(p);        // how many inserted strings start with p
```

```cpp
struct XorTrie {
    static const int B = 30; // bits 0..B-1, values < 2^B (use 60 for ll values)
    struct Node { int ch[2], cnt; }; //cnt: 经过此点的数的个数
    vector<Node> t{Node{}};
    void insert(ll x, int v = 1) { // v = -1 removes one copy
        int u = 0;
        for (int i = B - 1; i >= 0; i--) {
            int b = x >> i & 1;
            if (!t[u].ch[b]) t[u].ch[b] = t.size(), t.push_back(Node{});
            u = t[u].ch[b], t[u].cnt += v;
        }
    }
    ll max_xor(ll x) { // max of x ^ y over stored y (the trie must be nonempty)
        int u = 0; ll res = 0;
        for (int i = B - 1; i >= 0; i--) {
            int b = x >> i & 1, o = t[u].ch[!b];
            if (o && t[o].cnt) u = o, res |= 1LL << i;
            else u = t[u].ch[b];
        }
        return res;
    }
};
```

Usage:

```cpp
XorTrie xt;
xt.insert(a[i]);
xt.max_xor(x);      // max over inserted y of x ^ y
xt.insert(a[i], -1); // erase
```

### 5.5 Aho–Corasick

Trie + fail links (longest proper suffix that is a trie node), built by BFS; missing children point to `fail`'s child. `occurrences` counts every pattern by summing along the fail tree.

```cpp
struct AC {
    struct Node { int ch[26], fail, end; }; //end: 以该节点结尾的单词数量
    vector<Node> t{Node{}}; vector<int> ord; //0号根节点; ord: BFS order
    int insert(const string &s) { // returns the node of s
        int u = 0;
        for (char c : s) {
            int i = c - 'a';
            if (!t[u].ch[i]) t[u].ch[i] = t.size(), t.push_back(Node{}); //新建一个节点
            u = t[u].ch[i]; //进入下一层
        }
        t[u].end++;
        return u;
    }
    void build() { //构造失配指针
        queue<int> q;
        for (int i = 0; i < 26; ++i) if (t[0].ch[i]) q.push(t[0].ch[i]); //第一层的fail指向根
        while (!q.empty()) {
            int u = q.front(); q.pop();
            ord.push_back(u);
            for (int i = 0; i < 26; ++i) {
                int v = t[u].ch[i];
                if (v) t[v].fail = t[t[u].fail].ch[i], q.push(v); //扩展后缀
                else t[u].ch[i] = t[t[u].fail].ch[i]; //保证字符串能沿着路径走完
            }
        }
    }
    int count_distinct(const string &s) { // number of inserted patterns (with multiplicity) occurring in s
        vector<bool> vis(t.size()); int res = 0;
        for (int u = 0, k = 0; k < (int)s.size(); ++k) {
            u = t[u].ch[s[k] - 'a']; //向下走一层
            for (int j = u; j && !vis[j]; j = t[j].fail) res += t[j].end, vis[j] = 1; //跳fail直到已访问
        }
        return res;
    }
    vector<ll> occurrences(const string &s) { // cnt[node]: occurrences in s of the string ending at node
        vector<ll> cnt(t.size());
        for (int u = 0, k = 0; k < (int)s.size(); ++k) u = t[u].ch[s[k] - 'a'], cnt[u]++;
        for (int i = ord.size() - 1; i >= 0; i--) cnt[t[ord[i]].fail] += cnt[ord[i]]; // fail tree: children before parents
        return cnt;
    }
};
```

Usage:

```cpp
AC ac;
vector<int> id(k);
for (int i = 0; i < k; i++) id[i] = ac.insert(p[i]);
ac.build();
ac.count_distinct(text);           // how many patterns occur at least once
auto cnt = ac.occurrences(text);
cnt[id[i]];                        // number of occurrences of p[i] in text
```

## 6. Dynamic Programming

### 6.1 Knapsack

0-1: $j$ from $W$ down, $f_j = \max(f_j, f_{j-w_i} + v_i)$. Complete: $j$ upward. Multiple: binary split $m_i = 1 + 2 + 4 + \cdots + r$ into 0-1 items, $O(nW \log m)$.

```cpp
// items 1..n: weight w[i], value v[i] (vectors of size n + 1)
ll Knapsack01(int n, int W, const vector<int> &w, const vector<ll> &v) {
    vector<ll> f(W + 1, 0); // "exactly full": f[0] = 0, others LLONG_MIN / 2
    for (int i = 1; i <= n; i++)
        for (int j = W; j >= w[i]; j--)
            f[j] = max(f[j], f[j - w[i]] + v[i]);
    return f[W];
}
```

```cpp
ll KnapsackComplete(int n, int W, const vector<int> &w, const vector<ll> &v) {
    vector<ll> f(W + 1, 0);
    for (int i = 1; i <= n; i++)
        for (int j = w[i]; j <= W; j++)
            f[j] = max(f[j], f[j - w[i]] + v[i]);
    return f[W];
}
```

```cpp
ll KnapsackMultipleBin(int n, int W, const vector<int> &w, const vector<ll> &v, const vector<int> &m) {
    vector<ll> f(W + 1, 0);
    auto item = [&](ll wt, ll val) { // one 0-1 item
        for (ll j = W; j >= wt; j--) f[j] = max(f[j], f[j - wt] + val);
    };
    for (int i = 1; i <= n; i++) {
        if ((ll)w[i] * m[i] >= W) { // effectively unlimited
            for (int j = w[i]; j <= W; j++) f[j] = max(f[j], f[j - w[i]] + v[i]);
            continue;
        }
        int cnt = m[i];
        for (int k = 1; k <= cnt; cnt -= k, k <<= 1) item((ll)k * w[i], k * v[i]);
        if (cnt) item((ll)cnt * w[i], cnt * v[i]);
    }
    return f[W];
}
```

```cpp
// groups[g] = list of (weight, value)
ll KnapsackGroup(int W, const vector<vector<pair<int, ll>>> &groups) {
    vector<ll> f(W + 1, 0);
    for (auto &g : groups)
        for (int j = W; j >= 0; j--)
            for (auto [wt, val] : g)
                if (j >= wt) f[j] = max(f[j], f[j - wt] + val);
    return f[W];
}
```

### 6.2 LIS / LCS

LIS: $d_l$ = smallest tail of an increasing subsequence of length $l$; binary search, $O(n \log n)$. LCS: $f_{i,j} = f_{i-1,j-1} + 1$ if $a_i = b_j$, else $\max(f_{i-1,j}, f_{i,j-1})$.

```cpp
int LIS(const vector<ll> &a, bool strict = true) { // a[1..n]; non-decreasing when strict = false
    vector<ll> d; // d[l]: smallest tail of an increasing subsequence of length l + 1
    for (size_t i = 1; i < a.size(); i++) {
        ll x = a[i];
        auto it = strict ? lower_bound(d.begin(), d.end(), x) : upper_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x;
    }
    return d.size();
}
```

```cpp
int LCS(string A, string B) {
    int n = A.size(), m = B.size();
    A = " " + A, B = " " + B;
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i] == B[j]) {
                f[i][j] = f[i - 1][j - 1] + 1;
            } else {
                f[i][j] = max(f[i - 1][j], f[i][j - 1]);
            }
        }
    }
    return f[n][m];
}
```

### 6.3 Interval DP

$f_{i,j} = \min_{i \le k < j} (f_{i,k} + f_{k+1,j} + cost(i, k, j))$, by increasing length. $O(n^3)$

```cpp
vector<ll> s; // problem-specific data used by cost (stone merging: prefix sums of the weights)
ll cost(int i, int k, int j) { return s[j] - s[i - 1]; } // merging [i, k] and [k + 1, j]; rewrite per problem
ll IntervalDP(int n) {
    vector<vector<ll>> f(n + 1, vector<ll>(n + 1, 0));
    for (int d = 2; d <= n; d++) {
        for (int i = 1; i + d - 1 <= n; i++) {
            int j = i + d - 1;
            f[i][j] = LLONG_MAX;
            for (int k = i; k < j; k++)
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + cost(i, k, j));
        }
    }
    return f[1][n];
}
```

Usage:

```cpp
// stone merging
s.assign(n + 1, 0);
for (int i = 1; i <= n; i++) s[i] = s[i - 1] + a[i];
IntervalDP(n);
// circular: duplicate the array (a[i + n] = a[i]), run on 2n, answer = min over i of f[i][i + n - 1]
```

## 7. Miscellaneous

### 7.1 Simulated Annealing

Accept a worse neighbor with probability $e^{-\Delta / T}$, $T \leftarrow 0.996\,T$. Keep the current and best points separately.

```cpp
using State = pair<double, double>; // change to the problem's state (a point here)
// minimize f over states; neighbor(s, T) returns a random state near s (step size ~ T)
State anneal(State cur, function<double(State)> f, function<State(State, double)> neighbor, double T = 3000, double down = 0.996, double eps = 1e-15) {
    static mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    uniform_real_distribution<double> U(0, 1);
    State best = cur; double fc = f(cur), fb = fc; //best: 最优解；cur: 当前解
    while (T > eps) {
        State nx = neighbor(cur, T);
        double fn = f(nx), delta = fn - fc;
        if (delta < 0 || exp(-delta / T) > U(rng)) cur = nx, fc = fn; //根据Metropolis准则保留
        if (fc < fb) best = cur, fb = fc;
        T *= down; //不断降温
    }
    return best;
}
```

Usage:

```cpp
// 吊打XXX: point minimizing sum of w[i] * dist(p, (x[i], y[i]))
mt19937 rng(114514); uniform_real_distribution<double> U(-1, 1);
auto f = [&](State p) {
    double s = 0;
    for (int i = 1; i <= n; i++) s += hypot(p.first - x[i], p.second - y[i]) * w[i];
    return s;
};
auto nb = [&](State p, double T) { return State(p.first + U(rng) * T, p.second + U(rng) * T); };
State best = {avgx, avgy};
for (int t = 0; t < 5; t++) best = anneal(best, f, nb); // restart a few times while time allows
```

### 7.2 Closest Pair of Points

Sort by $x$; recurse; check the strip $|x - x_{mid}| < d$, kept sorted by $y$ with a merge. $O(n \log n)$, squared distance exact in `ll`.

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

### 7.3 Cantor Expansion

Rank of a permutation: $1 + \sum_i A_i (n - i)!$, $A_i$ = number of later elements smaller than $a_i$ (BIT).

```cpp
ll cantor(int n, const vector<int> &a) { // a[1..n] is a permutation of 1..n; rank mod `mod`, starting from 1
    vector<ll> fac(n + 1, 1);
    for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i % mod; //预处理阶乘
    BIT bit(n);
    for (int i = 1; i <= n; i++) bit.add(i, 1); //先把所有的数插进去
    ll ans = 1; //自己也算一个
    for (int i = 1; i <= n; i++) {
        bit.add(a[i], -1); //树状数组中剩下的都是i的后缀
        ans = (ans + bit.sum(a[i] - 1) % mod * fac[n - i]) % mod;
    }
    return ans;
}
vector<int> inv_cantor(int n, ll k) { // the permutation with rank k (1-based), exact for n <= 20
    vector<ll> fac(n + 1, 1);
    for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i;
    vector<int> rest(n), a(n + 1);
    iota(rest.begin(), rest.end(), 1);
    k--;
    for (int i = 1; i <= n; i++) {
        int j = k / fac[n - i]; k %= fac[n - i];
        a[i] = rest[j], rest.erase(rest.begin() + j);
    }
    return a;
}
```

Usage:

```cpp
vector<int> a = {0, 2, 1, 3}; // 1-indexed
cantor(3, a);      // 3: 123, 132, 213
inv_cantor(3, 3);  // {0, 2, 1, 3}
```

### 7.4 Bignum (Minimal)

`vector<int>` of decimal digits, lowest first. Subtraction needs $a \ge b$ (`less_big`).

```cpp
using Big = vector<int>;
void trim(Big &a) { while (a.size() > 1 && !a.back()) a.pop_back(); }
Big to_big(const string &s) { Big a(s.rbegin(), s.rend()); for (int &x : a) x -= '0'; trim(a); return a; } //读入数据
string to_str(const Big &a) { string s; for (int i = a.size() - 1; i >= 0; i--) s += char('0' + a[i]); return s; } //输出结果
bool less_big(const Big &a, const Big &b) { //比较大小 a < b
    if (a.size() != b.size()) return a.size() < b.size();
    for (int i = a.size() - 1; i >= 0; i--) if (a[i] != b[i]) return a[i] < b[i];
    return false;
}
```

```cpp
Big add(const Big &a, const Big &b) {
    Big c(max(a.size(), b.size()) + 1, 0);
    for (size_t i = 0; i + 1 < c.size(); i++) {
        c[i] += (i < a.size() ? a[i] : 0) + (i < b.size() ? b[i] : 0);
        if (c[i] >= 10) c[i] -= 10, c[i + 1]++;
    }
    trim(c); return c;
}
```

```cpp
Big sub(Big a, const Big &b) { // a >= b
    for (size_t i = 0; i < a.size(); i++) {
        a[i] -= i < b.size() ? b[i] : 0;
        if (a[i] < 0) a[i] += 10, a[i + 1]--;
    }
    trim(a); return a;
}
```

```cpp
Big mul(const Big &a, const Big &b) {
    vector<ll> c(a.size() + b.size(), 0);
    for (size_t i = 0; i < a.size(); i++)
        for (size_t j = 0; j < b.size(); j++) c[i + j] += a[i] * b[j];
    Big res(c.size());
    ll carry = 0;
    for (size_t i = 0; i < c.size(); i++) carry += c[i], res[i] = carry % 10, carry /= 10;
    trim(res); return res;
}
```

```cpp
Big div_small(const Big &a, ll b, ll &r) { // a / b, r = a % b, 0 < b <= 1e17
    Big q(a.size()); r = 0;
    for (int i = a.size() - 1; i >= 0; i--) r = r * 10 + a[i], q[i] = r / b, r %= b;
    trim(q); return q;
}
Big div_big(const Big &a, const Big &b, Big &r) { // a / b, r = a % b, b > 0
    Big q(a.size()); r = {0};
    for (int i = a.size() - 1; i >= 0; i--) {
        r.insert(r.begin(), a[i]), trim(r); // r = r * 10 + a[i]
        while (!less_big(r, b)) r = sub(r, b), q[i]++;
    }
    trim(q); return q;
}
```

Usage:

```cpp
string s, t; cin >> s >> t;
Big a = to_big(s), b = to_big(t), r;
cout << to_str(add(a, b)) << '\n' << to_str(mul(a, b)) << '\n';
if (!less_big(a, b)) cout << to_str(sub(a, b)) << '\n';
cout << to_str(div_big(a, b, r)) << ' ' << to_str(r) << '\n';
```

## 8. Polynomial

### 8.1 FFT and NTT

$\omega_n = e^{2\pi i/n}$, $\omega_n^{k + n/2} = -\omega_n^k$, $\omega_n^{2k} = \omega_{n/2}^k$.
$A(\omega_n^k) = A_0(\omega_{n/2}^k) + \omega_n^k A_1(\omega_{n/2}^k)$, $A(\omega_n^{k+n/2}) = A_0(\omega_{n/2}^k) - \omega_n^k A_1(\omega_{n/2}^k)$.
Inverse: use $\omega_n^{-1}$ and divide by $n$. Pad to a power of 2 $\ge$ `a.size() + b.size()`. The iterative version is faster.

```cpp
using cd = complex<double>;
const double PI = acos(-1.0);
void fft(vector<cd> &a, int opt) { // opt = 1: coefficients -> values, -1: back (without dividing by n); a.size() is a power of 2
    int n = a.size(), L = __lg(n);
    if (n == 1) return;
    vector<int> rev(n);
    for (int i = 0; i < n; ++i) rev[i] = rev[i >> 1] >> 1 | (i & 1) << (L - 1);
    for (int i = 0; i < n; ++i) if (i < rev[i]) swap(a[i], a[rev[i]]);
    for (int m = 1; m < n; m <<= 1) {
        vector<cd> w(m); // roots computed directly, more precise than repeated multiplication
        for (int j = 0; j < m; ++j) w[j] = polar(1.0, opt * PI * j / m);
        for (int i = 0; i < n; i += m << 1)
            for (int j = 0; j < m; ++j) {
                cd x = a[i + j], y = w[j] * a[i + j + m];
                a[i + j] = x + y, a[i + j + m] = x - y;
            }
    }
}
```

```cpp
void ifft(vector<cd> &a) { //point-value to coefficient
    fft(a, -1);
    for (cd &x : a) x /= a.size();
}
```

```cpp
vector<ll> conv(const vector<ll> &a, const vector<ll> &b) { // exact while every |c_k| < about 1e15
    if (a.empty() || b.empty()) return {};
    int n = 1;
    while (n < (int)(a.size() + b.size() - 1)) n <<= 1; // Find the next power of 2
    vector<cd> A(a.begin(), a.end()), B(b.begin(), b.end());
    A.resize(n), B.resize(n);
    fft(A, 1), fft(B, 1); // Forward FFT
    for (int i = 0; i < n; ++i) A[i] *= B[i]; // Point-wise multiplication
    ifft(A); // Inverse FFT to get the coefficients of the product polynomial
    vector<ll> c(a.size() + b.size() - 1);
    for (size_t i = 0; i < c.size(); ++i) c[i] = llround(A[i].real());
    return c;
}
```

Usage:

```cpp
vector<ll> c = conv(a, b); // c[k] = sum a[i] * b[k - i], 0-indexed coefficients
```

```cpp
void ntt(vector<ll> &a, bool invert) { // mod = 998244353, a.size() is a power of 2
    auto pw = [](ll x, ll e) { ll r = 1; for (x %= mod; e; e >>= 1, x = x * x % mod) if (e & 1) r = r * x % mod; return r; };
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) { // bit reversal
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int m = 1; m < n; m <<= 1) {
        ll wn = pw(3, (mod - 1) / (2 * m));
        if (invert) wn = pw(wn, mod - 2);
        for (int i = 0; i < n; i += m << 1)
            for (int j = 0, w = 1; j < m; j++, w = w * wn % mod) {
                ll x = a[i + j], y = a[i + j + m] * w % mod;
                a[i + j] = x + y < mod ? x + y : x + y - mod;
                a[i + j + m] = x - y >= 0 ? x - y : x - y + mod;
            }
    }
    if (invert) {
        ll ni = pw(n, mod - 2);
        for (ll &x : a) x = x * ni % mod;
    }
}
vector<ll> conv_mod(vector<ll> a, vector<ll> b) { // coefficients in [0, mod)
    if (a.empty() || b.empty()) return {};
    int n = 1, sz = a.size() + b.size() - 1;
    while (n < sz) n <<= 1;
    a.resize(n), b.resize(n);
    ntt(a, false), ntt(b, false);
    for (int i = 0; i < n; i++) a[i] = a[i] * b[i] % mod;
    ntt(a, true);
    a.resize(sz);
    return a;
}
```

Usage:

```cpp
vector<ll> c = conv_mod(a, b); // c[k] = sum a[i] * b[k - i] mod 998244353
```

## 9. Appendix

### 9.1 STL Cheat Sheet

```cpp
// vector
vector<int> v(n, x); v.reserve(n); v.resize(n, x); v.assign(n, x); v.clear(); v.size(); v.empty();
v.push_back(x); v.emplace_back(x); v.pop_back(); v.front(); v.back();
v.insert(v.begin() + i, x); v.erase(v.begin() + i); v.erase(v.begin() + l, v.begin() + r); // erase [l, r)
sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end()); // sort + dedupe
reverse(v.begin(), v.end()); *max_element(v.begin(), v.end()); accumulate(v.begin(), v.end(), 0LL);
lower_bound(v.begin(), v.end(), x) - v.begin(); upper_bound(v.begin(), v.end(), x) - v.begin(); // first >= x, first > x
// deque
d.push_back(x); d.push_front(x); d.pop_back(); d.pop_front(); d.front(); d.back(); d[i];
// list
l.push_back(x); l.push_front(x); l.insert(it, x); /*before it*/ l.erase(it); l.remove(x); /*all x*/ l.reverse(); l.sort();
l.splice(pos, src); l.splice(pos, src, it2); l.splice(pos, src, first, last); // move from src into l, before pos
// set / multiset: sorted, O(log n)
s.insert(x); s.erase(x); /*multiset: ALL copies*/ s.erase(s.find(x)); /*one copy, x must exist*/ s.count(x); s.find(x) != s.end();
s.lower_bound(x); /*first >= x*/ s.upper_bound(x); /*first > x*/ *s.begin(); *s.rbegin(); /*min, max*/ prev(s.end()); next(s.begin());
// map / multimap
m[k] = val; /*m[k] inserts a default value if k is missing*/ m.count(k); m.find(k); m.erase(k); m.lower_bound(k); mm.equal_range(k);
for (auto &[key, value] : m) {} // in key order
// unordered_set / unordered_map: same as set / map but no order, no lower_bound; O(1) average
// stack / queue / priority_queue
st.push(x); st.pop(); st.top(); q.push(x); q.pop(); q.front(); q.back(); pq.push(x); pq.pop(); pq.top(); pq.empty();
priority_queue<int> pmax; priority_queue<int, vector<int>, greater<int>> pmin; // max-heap, min-heap
priority_queue<pii, vector<pii>, greater<pii>> ppii; // min-heap by first, then second
// bitset
bitset<N> b; b.set(); b.reset(); b.flip(); b.set(i); b.reset(i); b.flip(i); b.test(i); b.count(); b.any(); b.none(); b << k; b & c; b ^ c;
// string
str.push_back(ch); str.pop_back(); str += t; str.substr(pos0, len); str.find(t); /*string::npos if none*/ str.size(); to_string(x); stoi(t); stoll(t);
// array, iterators, builtins
array<int, N> a; a.fill(x); a.size(); advance(it, k); prev(it); next(it);
__builtin_popcount(x); __builtin_popcountll(y); __builtin_ctz(x); /*trailing zeros*/ __builtin_clz(x); __lg(x); /*floor(log2 x)*/ __gcd(x, k);
```

### 9.2 Fast I/O

`read()` loops forever past end of input; call it only as many times as there are numbers.

```cpp
namespace IO {
    const int bif = 1 << 18; char buf[bif], *p1, *p2; int wrt[20], Tp = 0;
    inline char getc() { if (p1 == p2) { p2 = (p1 = buf) + fread(buf, 1, bif, stdin); if (p1 == p2) return EOF; } return *p1++; }
    inline char gotc() { char c = getc(); while (c == ' ' || c == '\n' || c == '\r') c = getc(); return c; }
    inline ll read() { ll x = 0; bool f = 0; char c = getc(); while (!isdigit(c)) f |= c == '-', c = getc(); while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getc(); return f ? -x : x; }
    inline void write(ll x, bool f) { if (x < 0) putchar('-'), x = -x; do { wrt[++Tp] = x % 10, x /= 10; } while(x); while(Tp) putchar(wrt[Tp--] | 48); putchar(f ? '\n' : ' '); }
} using namespace IO;
```

### 9.3 Stress Test (Linux)

Generator, then the checker: compile `data.cpp`, `std.cpp`, `test.cpp`, loop until `diff` reports a difference.

```cpp
//data generator
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
ll rnd(ll l, ll r) { return uniform_int_distribution<ll>(l, r)(rng); } // uniform in [l, r]
sandom main() {
    freopen("test.in", "w", stdout);
    cout << rnd(1, MAX) << ' ' << rnd(1, MAX) << endl;
    return 0;
}
```

```cpp
for (int i = 2; i <= n; i++) { //随机生成树
    int fa = rnd(1, i - 1);
    int val = rnd(1, MAX);
    printf("%d %d %d\n", fa, i, val);
}

//随机生成无向图（n个点m条边，先存边，打乱后再输出）
map <pair<int, int>, bool> be;
struct edge { int u, v, w; }; vector<edge> e(1); // e[1..m]
//先生成一棵树，保证连通
for (int i = 2; i <= n; i++) {
    int fa = rnd(1, i - 1);
    int val = rnd(1, MAX);
    e.push_back({i, fa, val});
    be[make_pair(fa, i)] = be[make_pair(i, fa)] = 1;
}
//添加剩余边
for (int i = n; i <= m; i++) {
    int x, y;
    do {
        x = rnd(1, n), y = rnd(1, n);
    } while (x == y || be[make_pair(x, y)]);
    be[make_pair(x, y)] = be[make_pair(y, x)] = 1;
    e.push_back({x, y, (int)rnd(1, MAX)});
}
shuffle(e.begin() + 1, e.end(), rng);//随机打乱（random_shuffle 在 C++17 中已删除）
for (int i = 1; i <= m; i++) printf("%d %d %d\n", e[i].u, e[i].v, e[i].w);
```

```cpp
#define sandom signed
#include <bits/stdc++.h>
using namespace std;
using namespace chrono;

#define SCK steady_clock
#define DRD duration <double>
#define DCT duration_cast
steady_clock::time_point st, ed;
duration <double> tm1, tm2;

inline void work1() {
    while (1) {
        system("./data");
        st = SCK::now(); system("./test"); ed = SCK::now(); tm1 = DCT<DRD>(ed - st);
        st = SCK::now(); system("./std"); ed = SCK::now(); tm2 = DCT<DRD>(ed - st);
        if (system("diff test.out std.out")) { puts("WA"); break; }
        else printf("AC --- FALSE: %.0lfms &&& TRUE: %.0lfms\n", tm1.count() * 1000, tm2.count() * 1000);
    }
}
inline void work2() {
    while (1) {
        system("./data");
        st = SCK::now(); system("./test"); ed = SCK::now(); tm1 = DCT<DRD>(ed - st);
        printf("TIME: %.0lfms\n", tm1.count() * 1000);
    }
}
inline void work3() {
    if (system("diff test.out std.out")) puts("WA");
    else puts("AC");
}

sandom main() {
    system("g++ data.cpp -o data");//data generator
    system("g++ std.cpp -o std");//standard code
    system("g++ test.cpp -o test");//test code
    work1();//compare brute force and optimized code
    work2();//test optimized code's run time
    work3();//compare two files
    return 0;
}
```
