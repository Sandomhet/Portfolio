---
title: "Binary Lifting and Lowest Common Ancestor (LCA)"
description: "query in O(log(n))"
time: "Mon Feb 1, 2024"
---

# Binary Lifting and Lowest Common Ancestor (LCA)

## DFS Order

建立 dfs 序: the subtree of $u$ is the contiguous range $[tin_u, tout_u]$ of the DFS order, so subtree queries become range queries.

```cpp
vector<int> tin, tout, ord; // ord[tin[u]] = u
void dfs_order(int u, int fa, const vector<vector<int>> &e) { // call with tin.assign(n + 1, 0), ord = {0} first
    tin[u] = ord.size(), ord.push_back(u);
    for (int v : e[u]) if (v != fa) dfs_order(v, u, e);
    tout[u] = ord.size() - 1;
}
```

Usage:

```cpp
tin.assign(n + 1, 0), tout.assign(n + 1, 0), ord = {0};
dfs_order(1, 0, e);
// u is an ancestor of v  <=>  tin[u] <= tin[v] && tout[v] <= tout[u]
// subtree of u = positions tin[u]..tout[u]
```

## Sparse Table (RMQ)

$dp_{j,i} = op(dp_{j-1,i}, dp_{j-1,i+2^{j-1}})$; query $[l, r]$ with $t = \lfloor \log_2(r-l+1) \rfloor$: $op(dp_{t,l}, dp_{t,r-2^t+1})$. $O(n \log n)$ build, $O(1)$ query. Works for any idempotent $op$ (edit the one-line `op`) ($\max$, $\min$, $\gcd$, AND, OR).

预处理 ST 表，区间 RMQ 问题：f[j][i]：以 i 为起点，长度为 2^j 的区间

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

## Binary Lifting

$fa_{j,u} = fa_{j-1, fa_{j-1,u}}$ is the $2^j$-th ancestor. Lift the deeper vertex to the same depth, then lift both while their ancestors differ. $O(n \log n)$ build, $O(\log n)$ query. `build` uses BFS, so deep trees do not overflow the stack.

倍增解决 LCA

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

## Tarjan (Offline)

DFS; after a child's subtree is finished, merge it into the current vertex with DSU. For a query $(u, v)$ where $v$ is already finished, $\operatorname{LCA} = \operatorname{find}(v)$. $O((n + q)\,\alpha(n))$

tarjan 解决 LCA

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

## Euler Tour + RMQ

The LCA of $u, v$ is the shallowest vertex between their first occurrences in the Euler tour (length $2n - 1$). $O(n \log n)$ build, $O(1)$ query.

RMQ 解决 LCA

```cpp
struct EulerLCA {
    vector<int> fir, dep; vector<vector<pii>> f; vector<pii> tour; // tour: (depth, vertex)
    void dfs(int u, int fa, const vector<vector<int>> &e) {
        fir[u] = tour.size(), tour.push_back({dep[u], u});
        for (int v : e[u]) if (v != fa) {
            dep[v] = dep[u] + 1, dfs(v, u, e);
            tour.push_back({dep[u], u});
        }
    }
    EulerLCA(int n, int root, const vector<vector<int>> &e) : fir(n + 1), dep(n + 1) {
        dfs(root, 0, e);
        int m = tour.size();
        f.assign(__lg(m) + 1, vector<pii>(m));
        f[0] = tour;
        for (int j = 1; j < (int)f.size(); j++)
            for (int i = 0; i + (1 << j) <= m; i++) f[j][i] = min(f[j - 1][i], f[j - 1][i + (1 << (j - 1))]);
    }
    int lca(int u, int v) {
        int l = fir[u], r = fir[v];
        if (l > r) swap(l, r);
        int t = __lg(r - l + 1);
        return min(f[t][l], f[t][r - (1 << t) + 1]).second;
    }
};
```

Usage:

```cpp
EulerLCA t(n, 1, e); // e: vector<vector<int>> adjacency
t.lca(u, v);
```
