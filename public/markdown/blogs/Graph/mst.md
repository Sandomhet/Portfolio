---
title: "Minimum Spanning Tree (MST)"
description: "a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight."
time: "Mon Feb 1, 2024"
---

# Minimum Spanning Tree (MST)

## Table of Contents

## Prim's Algorithm

（与 dijkstra 神似）

```cpp
bool vs[Z];
int minn[Z];
int prim(int s) {
    int sum = 0;
    memset(minn, 63, sizeof(minn));
    memset(vs, 0, sizeof(vs));
    minn[s] = 0;
    for (int i = 1; i <= n; ++i) {
        int k = 0;
        for (int j = 1; j <= n; ++j) //寻找与此点距离最小的点
            if (!vs[j] && minn[k] > minn[j])
                k = j;
        sum += minn[k];
        vs[k] = 1;
        for (int j = 1; j <= n; ++j) //更新k点到其他点的最小距离
            if (!vs[j] && minn[j] > dis[k][j])
                minn[j] = dis[k][j];
    }
    return sum;
}
```

## Kruskal's Algorithm

（用到了并查集、集合思想；记得先排序）

```cpp
struct kusk {
    int u, v, w;
    friend bool operator <(kusk A, kusk B) { return A.w < B.w; }
}; kusk e[Z];
int kruskal(int n, int m) {
    int tot = 0, sum = 0;
    sort(e + 1, e + 1 + m);
    for (int i = 1; i <= m; ++i) { //枚举边
        int u = e[i].u, v = e[i].v;
        if (find(u) != find(v)) {
            un(u, v);
            sum += e[i].w;
            if ((++tot) == n - 1) return sum;
        }
    }
    return 0;
}
```

## Cut Property

A cut $(S, V-S)$ of a graph is a partition of its vertices into two disjoint subsets $S$ and $V-S$.  

If $S$ is any subset of the vertices, and $(u, v)$ is the minimum-weight edge with one endpoint in $S$ and the other in $V-S$, then this edge is in the MST.  
Consider $X$ the set of edges in the MST that have both endpoints in $S$. The set $X$ must connect all the vertices in $S$ (otherwise the MST would not be connected). Adding the edge $(u, v)$ to $X$ creates a spanning tree for the vertices in $S \cup \{v\}$. Since $(u, v)$ is the minimum-weight edge crossing the cut, any other edge connecting $S$ to $V-S$ must have weight at least as large as $(u, v)$. Therefore, including $(u, v)$ in the MST does not increase its total weight, and it must be part of the MST.

## Dynamic MST

（维护一个动态连通性的数据结构，如 Link/Cut Tree 或 Euler Tour Tree）