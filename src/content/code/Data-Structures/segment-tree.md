---
title: "Segment Tree"
description: "storing information about intervals or segments."
time: "Mon Feb 1, 2024"
---

# Segment Tree

## Basic Segment Tree

Node `rt` covers `[l, r]`, children `2rt` and `2rt+1`. A range operation splits into $O(\log n)$ nodes; lazy tags (`lz`) are pushed down only when a node is entered.

基础一维**线段树**，维护区间信息~~（模板：山海经）~~

`Node` holds the interval information and `operator+` merges two adjacent intervals, so `query` returns a whole `Node` (sum, max, ...) at once. To maintain something else, change `Node`, `operator+` and `apply`.

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
    template<class T> void build(const T &a, int rt, int l, int r) {
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
    template<class T> void build(const T &a) { build(a, 1, 1, n); } // a[1..n]
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
seg.build(a);      // a[1..n], any array or vector
seg.add(l, r, v);  // a[l..r] += v
seg.assign(p, v);  // a[p] = v
seg.sum(l, r);     // a[l] + ... + a[r]
seg.max(l, r);     // max of a[l..r]
seg.query(l, r);   // the whole Node of [l, r]
```

## Dynamic Nodes and Merging

众所周知，线段树的空间复杂度是比较差的，但是实际上不一定线段树中的每个点都会被用到，这样会浪费空间，所以我们采用**动态开点**。
这一点也能方便我们使用**线段树合并**，也就是把两段原本不相关的信息连接在一起。在树形DP和权值线段树中应用广泛。

Many trees share one node pool; a tree is just its root index (`0` is the empty tree). Each point update creates at most $\log V$ nodes, so `cap` $\approx$ (number of updates) $\times (\log_2 V + 2)$. Merging all trees costs $O(\text{total nodes})$ overall.

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

## Permanent Tags

动态开点有一个弊端，就是不能下放lz标记，因为那样需要建立新点，不是MLE就是TLE，这就导致我们没办法区间修改。但是，如果我们不下传lz呢，这就用到了
**永久化标记**。不需要下传lz，但是可以共享。钦定左右区间分别为max(l, L)和min(r, R)
：在修改时，只对这一部分的sum加上val，显然是正确的，但是不加给lz，只有当它是一整个完整区间被覆盖，才会加lz；查询时，不断向下递归的过程中，都会将这一段的所有rt的lz累加起来，相当于把两端区间取交集，这样不会多也不会少，因此也是正确的。

Range add, range sum, no `pushdown`, so nodes are only created on the update paths.

```cpp
struct TagSeg { // range [L, R], node 0 is the empty tree
    int L, R, tot = 0; vector<int> lc, rc; vector<ll> sum, lz;
    TagSeg(int L, int R, int cap) : L(L), R(R), lc(cap + 1), rc(cap + 1), sum(cap + 1), lz(cap + 1) {}
    void update(int &rt, int l, int r, int x, int y, ll v) {
        if (!rt) rt = ++tot;
        if (x <= l && r <= y) { lz[rt] += v; return; }
        sum[rt] += (min(r, y) - max(l, x) + 1) * v;
        int mid = l + (r - l) / 2;
        if (x <= mid) update(lc[rt], l, mid, x, y, v);
        if (y > mid) update(rc[rt], mid + 1, r, x, y, v);
    }
    ll query(int rt, int l, int r, int x, int y) {
        if (!rt) return 0;
        if (x <= l && r <= y) return sum[rt] + (r - l + 1) * lz[rt];
        ll res = (min(r, y) - max(l, x) + 1) * lz[rt];
        int mid = l + (r - l) / 2;
        if (x <= mid) res += query(lc[rt], l, mid, x, y);
        if (y > mid) res += query(rc[rt], mid + 1, r, x, y);
        return res;
    }
    int merge(int a, int b, int l, int r) { //线段树合并
        if (!a || !b) return a + b;
        sum[a] += sum[b], lz[a] += lz[b];
        if (l == r) return a;
        int mid = l + (r - l) / 2;
        lc[a] = merge(lc[a], lc[b], l, mid);
        rc[a] = merge(rc[a], rc[b], mid + 1, r);
        return a;
    }
    void add(int &rt, int l, int r, ll v) { update(rt, L, R, l, r, v); } // a[l..r] += v
    ll query(int rt, int l, int r) { return query(rt, L, R, l, r); }    // a[l] + ... + a[r]
    int merge(int a, int b) { return merge(a, b, L, R); }
};
```

Usage:

```cpp
TagSeg T(1, n, 4 * 30 * q); int root = 0;
T.add(root, l, r, v); // a[l..r] += v
T.query(root, l, r);  // a[l] + ... + a[r]
```

## Persistent Segment Tree

**主席树**

Each update copies the $O(\log n)$ nodes on its root-to-leaf path and shares everything else, so version $i$ is the tree rooted at `rt[i]`. With a value-indexed tree built over the prefixes $a_1..a_i$, the counts in range $[l, r]$ are `rt[r]` minus `rt[l-1]`, which answers the $k$-th smallest in a range. Node `0` is the empty tree (all counts $0$), so no initial `build` is needed. `cap` $\approx n (\log_2 V + 2)$.

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

## Segment Tree Beats

**吉司机线段树**：

可以对区间取min后区间求和，还可以记录历史最值。时间复杂度约为$O(nlogn)$，如果有区间加操作，可能退化为$O(nlog^2n)$
，证明可以参考势能函数的变化。

Each node keeps the max `mx`, its count `cnt`, the strict second max `se`, and the historic max `hmx`. Tags: `a1`/`b1` added to max / non-max elements, `a2`/`b2` the largest prefix sums of those tags (for the historic max). A chmin with `se < v < mx` only lowers the maxima, so it becomes a tag on the max elements.

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
    template<class T> void build(const T &a, int rt, int l, int r) {
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
    template<class T> void build(const T &a) { build(a, 1, 1, n); } // a[1..n]
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
bt.build(a);         // a[1..n]
bt.add(l, r, v);     // a[l..r] += v
bt.chmin(l, r, v);   // a[i] = min(a[i], v) on [l, r]
bt.sum(l, r), bt.max(l, r), bt.hmax(l, r);
```

## Li Chao Tree

**李超线段树**

Each node keeps the line that is best at its midpoint. When a new line comes in, the loser at the midpoint can still win on at most one side, so it is pushed into that child only. Query: take the best of all lines on the root-to-leaf path. Insert a full line in $O(\log n)$, a segment in $O(\log^2 n)$, query in $O(\log n)$.

Integer $x \in [1, n]$, maximum of $kx + b$. For the minimum, insert $(-k, -b)$ and negate the answer. Returns `LLONG_MIN` if no line covers $x$.

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
