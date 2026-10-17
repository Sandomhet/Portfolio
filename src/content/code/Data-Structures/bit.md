---
title: "Binary Indexed Tree (BIT)"
description: "efficiently compute prefix sums of the values and update the values."
time: "Mon Feb 1, 2024"
---

# Binary Indexed Tree (BIT)

$$
\operatorname{lowbit}(i) = i \,\&\, (-i), \qquad c_i = \sum_{j = i - \operatorname{lowbit}(i) + 1}^{i} a_j
$$

## 1D-BIT

### Point Add, Range Sum

```cpp
using ll = long long;
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

### Range Add, Range Sum

$$
\sum_{i=1}^{x} a_i = \sum_{i=1}^{x} \sum_{j=1}^{i} d_j = (x+1) \sum_{j=1}^{x} d_j - \sum_{j=1}^{x} j \cdot d_j
$$

```cpp
using ll = long long;
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

## 2D-BIT

### Point Add, Rectangle Sum

```cpp
using ll = long long;
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

### Rectangle Add, Rectangle Sum

$$
\begin{aligned}
\sum_{i=1}^{x} \sum_{j=1}^{y} a_{i,j} &= \sum_{i=1}^{x} \sum_{j=1}^{y} d_{i,j} (x+1-i)(y+1-j) \\
&= (x+1)(y+1) \sum d_{i,j} - (y+1) \sum d_{i,j} \, i - (x+1) \sum d_{i,j} \, j + \sum d_{i,j} \, ij
\end{aligned}
$$

```cpp
using ll = long long;
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
