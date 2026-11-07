---
title: "Minimum Spanning Tree (MST)"
description: "a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight."
time: "Sat Nov 1, 2025"
---

# Minimum Spanning Tree (MST)

## Table of Contents

## Definition

A Minimum Spanning Tree (MST) of a connected, edge-weighted undirected graph is a subset of the edges that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

Forest is a collection of trees. A tree is an acyclic connected graph.

## Properties

1. **Uniqueness**: If all edge weights are distinct, the MST is unique.
2. **Cycle Property**: For any cycle in the graph, the heaviest edge in that cycle cannot be part of the MST.
3. **Cut Property**: For any cut in the graph, the lightest edge crossing that cut must be part of the MST.
4. **Number of Edges**: An MST of a graph with $n$ vertices has exactly $n-1$ edges.
5. **Minimum Product Property**: Minimum spanning tree is also the tree with minimum product of weights of edges.
6. **Minimax Property**: The maximum edge weight in the MST is the minimum possible among all spanning trees.
7. **Maximum Spanning Tree**: The maximum spanning tree can be found by negating all edge weights and finding the MST.

### Cut Property

A cut $(S, V-S)$ of a graph is a partition of its vertices into two disjoint subsets $S$ and $V-S$.  

If $S$ is any subset of the vertices, and $(u, v)$ is the minimum-weight edge with one endpoint in $S$ and the other in $V-S$, then this edge is in the MST.  
Consider $X$ the set of edges in the MST that have both endpoints in $S$. The set $X$ must connect all the vertices in $S$ (otherwise the MST would not be connected). Adding the edge $(u, v)$ to $X$ creates a spanning tree for the vertices in $S \cup \{v\}$. Since $(u, v)$ is the minimum-weight edge crossing the cut, any other edge connecting $S$ to $V-S$ must have weight at least as large as $(u, v)$. Therefore, including $(u, v)$ in the MST does not increase its total weight, and it must be part of the MST.

## Prim's Algorithm

Prim's algorithm is a greedy algorithm that builds the MST one edge at a time, starting from an arbitrary vertex and growing the MST by adding the lightest edge that connects a vertex in the MST to a vertex outside the MST.

Start from a vertex, grow the MST by adding the minimum weight edge connecting the tree to a new vertex. $O(m \log m)$ with priority queue.

（与 dijkstra 神似）

### Dense Graph Implementation

$O(n^2)$

```cpp
ll prim_dense(int n, const vector<vector<ll>> &w) { // w[i][j]: weight, LLONG_MAX = no edge; -1 if not connected
    vector<bool> vs(n + 1);
    vector<ll> dis(n + 1, LLONG_MAX);
    ll sum = 0;
    dis[1] = 0;
    for (int i = 1; i <= n; i++) {
        int k = 0;
        for (int j = 1; j <= n; j++) //寻找与此点距离最小的点
            if (!vs[j] && (!k || dis[j] < dis[k])) k = j;
        if (dis[k] == LLONG_MAX) return -1; // not connected
        vs[k] = 1, sum += dis[k];
        for (int j = 1; j <= n; j++) //更新k点到其他点的最小距离
            if (!vs[j] && w[k][j] < dis[j]) dis[j] = w[k][j];
    }
    return sum;
}
```

### Sparse Graph Implementation

$O(m \log m)$ with priority queue

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

## Kruskal's Algorithm

Kruskal's algorithm is a greedy algorithm that builds the MST by sorting all the edges in non-decreasing order of their weights and adding them one by one to the MST, provided they do not form a cycle with the edges already included in the MST.

Sort edges by weight. Add edges in order, skipping those that form a cycle. $O(m \log m)$ with union-find data structure.

（用到了并查集、集合思想；记得先排序）

Uses the `DSU` struct from the Disjoint Set Union note.

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

### Kruskal Reconstruction Tree

Kruskal 重构树: each successful union creates a new node whose value is the edge weight and whose children are the two old roots. Leaves are $1..n$, internal nodes $n+1..2n-1$. On a path from a leaf up, values never decrease, and the minimax edge weight between $u$ and $v$ is `val[lca(u, v)]`. The vertices reachable from $u$ using edges $\le x$ form the subtree of the highest ancestor of $u$ with `val` $\le x$.

```cpp
struct KruskalTree {
    int n, tot; vector<int> pa, fa; vector<ll> val; vector<vector<int>> ch; // fa: parent in the tree, 0 for the root
    int find(int x) { return x == pa[x] ? x : pa[x] = find(pa[x]); }
    KruskalTree(int n, vector<Edge> edges) : n(n), tot(n), pa(2 * n), fa(2 * n), val(2 * n), ch(2 * n) {
        iota(pa.begin(), pa.end(), 0);
        sort(edges.begin(), edges.end(), [](const Edge &a, const Edge &b) { return a.w < b.w; });
        for (auto &e : edges) {
            int x = find(e.u), y = find(e.v);
            if (x == y) continue;
            val[++tot] = e.w;
            pa[x] = pa[y] = fa[x] = fa[y] = tot;
            ch[tot] = {x, y};
        }
    }
};
```

## Dynamic MST

（维护一个动态连通性的数据结构，如 Link/Cut Tree 或 Euler Tour Tree）