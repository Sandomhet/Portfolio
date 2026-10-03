---
title: "Hashing"
description: "Hash string into numbers for quick query."
time: "Mon Feb 1, 2024"
---

# Hashing

## Basic Hash

Treat the string as a base-$B$ number: 
$$
h_n = \sum\limits_{i=1}^{n} s_i B^{n-i} \\
h(l, r) = \sum\limits_{i=l}^{r} s_i B^{r-i} = h_r - h_{l-1} B^{r-l+1} \\
$$

`ull` natural overflow (mod $2^{64}$). Shortest and fastest, but the Thue–Morse string breaks it for **every** base.

```cpp
using ull = unsigned long long;
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

Mod $10^9+7$. With $10^5$ or more substrings compared at once, collisions become likely (birthday paradox).

```cpp
using ll = long long;
struct HashM {
    static constexpr ll M = 1e9 + 7, B = 131;
    int n; vector<ll> h, p;
    HashM(const string &s) : n(s.size()), h(n + 1), p(n + 1, 1) {
        for (int i = 1; i <= n; i++)
            p[i] = p[i - 1] * B % M, h[i] = (h[i - 1] * B + s[i - 1]) % M;
    }
    ll get(int l, int r) { return ((h[r] - h[l - 1] * p[r - l + 1]) % M + M) % M; }
    ll get() { return h[n]; }
};

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

## Tricky Hash

### Mod $2^{61}-1$ Hash

A single large prime modulus: collision probability per comparison is about $n / 2^{61}$, and it survives Thue–Morse.

```cpp
struct Hash61 {
    using ull = unsigned long long;
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

### Double Hash

Two independent hashes (different bases and different mods). Two substrings are considered equal only if both hashes agree. `get` packs both into one 64-bit key so it can go straight into `set` / `map` / `sort`.

```cpp
struct DoubleHash {
    using ll = long long;
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

## 2D Hash

Hash each row with base $B_y$, then hash the column of row hashes with base $B_x$. A submatrix comes out of 2D inclusion–exclusion, like 2D prefix sums.
$$H_{x, y} = \sum\limits_{i=1}^{x} \sum\limits_{j=1}^{y} s_{i, j} B_x^{x-i} B_y^{y-j}$$
$$h(x_1, y_1, x_2, y_2) = H_{x_2, y_2} - H_{x_1-1, y_2} B_x^{r} - H_{x_2, y_1-1} B_y^{c} + H_{x_1-1, y_1-1} B_x^{r} B_y^{c}$$

where $r = x_2 - x_1 + 1$, $c = y_2 - y_1 + 1$.

```cpp
struct Hash2D {
    using ull = unsigned long long;
    static constexpr ull Bx = 131, By = 13331; // Bx: between rows, By: between columns
    int n, m;
    vector<vector<ull>> h; vector<ull> px, py;
    Hash2D(const vector<string> &s) : n(s.size()), m(s[0].size()), h(n + 1, vector<ull>(m + 1)), px(n + 1, 1), py(m + 1, 1) {
        for (int i = 1; i <= n; i++) px[i] = px[i - 1] * Bx;
        for (int j = 1; j <= m; j++) py[j] = py[j - 1] * By;
        for (int i = 1; i <= n; i++) {
            ull row = 0;
            for (int j = 1; j <= m; j++) {
                row = row * By + s[i - 1][j - 1];
                h[i][j] = h[i - 1][j] * Bx + row;
            }
        }
    }
    ull get(int x1, int y1, int x2, int y2) {
        int r = x2 - x1 + 1, c = y2 - y1 + 1;
        return h[x2][y2] - h[x1 - 1][y2] * px[r] - h[x2][y1 - 1] * py[c] + h[x1 - 1][y1 - 1] * px[r] * py[c];
    }
    ull get() { return h[n][m]; }
};
```

Usage:

```cpp
vector<string> g = {"abab", "baba", "abab"}, pat = {"ab", "ba"};
Hash2D G(g), P(pat);

G.get(1, 1, 2, 2) == G.get(2, 2, 3, 3); // true: two equal 2x2 blocks of g

// occurrences of pat in g
int r = P.n, c = P.m, cnt = 0;
for (int i = 1; i + r - 1 <= G.n; i++)
    for (int j = 1; j + c - 1 <= G.m; j++)
        cnt += G.get(i, j, i + r - 1, j + c - 1) == P.get(1, 1, r, c); // 3
```

## n-D Hash

Same idea in $k$ dimensions, one base per dimension. The array is stored flat (row-major, each dimension sized $d_j + 1$ so index $0$ is the empty prefix). `build` takes a prefix hash along each dimension in turn; `get` does inclusion–exclusion over the $2^k$ corners of the box, so a query is $O(2^k \cdot k)$.

```cpp
struct HashND {
    using ull = unsigned long long;
    static constexpr ull B[] = {131, 13331, 100003, 1000003, 10000019}; // one base per dimension, k <= 5
    int k; vector<int> d, st; vector<ull> h; vector<vector<ull>> pw;
    HashND(const vector<int> &dims) : k(dims.size()), d(dims), st(k), pw(k) { // sizes d[0..k-1]
        int tot = 1;
        for (int j = k - 1; j >= 0; j--) st[j] = tot, tot *= d[j] + 1;
        h.assign(tot, 0);
        for (int j = 0; j < k; j++) {
            pw[j].assign(d[j] + 1, 1);
            for (int i = 1; i <= d[j]; i++) pw[j][i] = pw[j][i - 1] * B[j];
        }
    }
    int id(const vector<int> &x) { int r = 0; for (int j = 0; j < k; j++) r += x[j] * st[j]; return r; }
    void build() { // call after filling h[id(x)] = a[x] for 1 <= x[j] <= d[j]
        for (int j = 0; j < k; j++)
            for (int i = 0; i < (int)h.size(); i++)
                if (i / st[j] % (d[j] + 1)) h[i] += h[i - st[j]] * B[j];
    }
    ull get(const vector<int> &l, const vector<int> &r) { // box l[j] <= x[j] <= r[j], 1-indexed
        ull res = 0; vector<int> x(k);
        for (int S = 0; S < 1 << k; S++) { // bit j of S set: dimension j takes the corner l[j] - 1
            ull t = 1; bool neg = 0;
            for (int j = 0; j < k; j++)
                if (S >> j & 1) x[j] = l[j] - 1, t *= pw[j][r[j] - l[j] + 1], neg ^= 1;
                else x[j] = r[j];
            t *= h[id(x)];
            res += neg ? -t : t;
        }
        return res;
    }
};
```

Usage:

```cpp
// 3D grid a[1..n][1..m][1..q]
HashND H({n, m, q});
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        for (int t = 1; t <= q; t++) H.h[H.id({i, j, t})] = a[i][j][t];
H.build();

// compare two 2x2x2 boxes of the same grid
H.get({1, 1, 1}, {2, 2, 2}) == H.get({2, 2, 1}, {3, 3, 2});

// compare with a box of another grid (sizes may differ, bases are shared)
HashND C({2, 2, 2}); /* fill C.h, then */ C.build();
C.get({1, 1, 1}, {2, 2, 2}) == H.get({1, 1, 1}, {2, 2, 2});
```
