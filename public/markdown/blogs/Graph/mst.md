---
title: "Minimum Spanning Tree (MST)"
description: "a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight."
time: "Sat Nov 1, 2025"
---

# Minimum Spanning Tree (MST)

## Table of Contents

## Definition

A Minimum Spanning Tree (MST) of a connected, edge-weighted undirected graph is a subset of the edges that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

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

（与 dijkstra 神似）

### Dense Graph Implementation

$O(n^2)$

```cpp
int e[Z][Z];
vector<bool> vs;
vector<int> dis;
int prim(int s) {
    vs.assign(n + 1, false);
    dis.assign(n + 1, INF);
    int sum = 0;
    dis[s] = 0;
    for (int i = 1; i <= n; i++) {
        int k = 0;
        for (int j = 1; j <= n; j++) //寻找与此点距离最小的点
            if (!vs[j] && dis[j] < dis[k])
                k = j;
        if (k == 0) return -1; // not connected
        vs[k] = 1;
        sum += dis[k];
        for (int j = 1; j <= n; j++) //更新k点到其他点的最小距离
            if (!vs[j] && e[k][j] < dis[j])
                dis[j] = e[k][j];
    }
    return sum;
}
```

### Sparse Graph Implementation

$O(m \log m)$ with priority queue

```cpp
vector<vector<pii>> e;
vector<bool> vs;
int prim(int s) {
    priority_queue<pii, vector<pii>, greater<pii>> q;
    vs.assign(n + 1, false);
    int sum = 0, cnt = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (vs[u]) continue; // outdated
        vs[u] = 1;
        sum += d;
        if ((++cnt) == n) return sum;
        for (auto [v, w] : e[u])
            if (!vs[v]) q.push({w, v});
    }
    return -1; // not connected
}
```

## Kruskal's Algorithm

Kruskal's algorithm is a greedy algorithm that builds the MST by sorting all the edges in non-decreasing order of their weights and adding them one by one to the MST, provided they do not form a cycle with the edges already included in the MST.

$O(m \log m)$ with union-find data structure.

（用到了并查集、集合思想；记得先排序）

```cpp
struct kusk {
    int u, v, w;
    friend bool operator <(const kusk& A, const kusk& B) { return A.w < B.w; }
}; vector<kusk> edges, mst;
int kruskal(int n, int m) {
    int tot = 0, sum = 0;
    sort(edges.begin(), edges.end());
    for (kusk &e : edges)
        if (find(e.u) != find(e.v)) { // 不在同一集合中
            un(e.u, e.v);
            sum += e.w;
            mst.push_back(e);
            if ((++tot) == n - 1) return sum;
        }
    return -1; // not connected
}
```

## Dynamic MST

（维护一个动态连通性的数据结构，如 Link/Cut Tree 或 Euler Tour Tree）