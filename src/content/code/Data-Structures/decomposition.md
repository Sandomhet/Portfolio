---
title: "Heavy-light Decomposition"
description: "effectively solve many problems that come down to queries on a tree"
time: "Mon Feb 1, 2024"
---

# Heavy-light Decomposition

Heavy child: the child with the largest subtree. Any path to the root crosses $O(\log n)$ light edges, so it splits into $O(\log n)$ heavy chains. Visiting the heavy child first makes each chain a contiguous range of `dfn`, so a path query becomes $O(\log n)$ range queries, $O(\log^2 n)$ with a segment tree. The subtree of $u$ is the range $[dfn_u, dfn_u + siz_u - 1]$.

## Decomposition

重链剖分

The struct owns the tree. `dfn[u]` is the position of $u$ in the heavy-first DFS order, so build a segment tree over `b[dfn[u]] = a[u]`. `path(u, v, f)` calls `f(l, r)` on the $O(\log n)$ `dfn` ranges that make up the path.

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

## Path Operations

Pair it with any range structure, for example the `SegTree` from the segment tree note.

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
