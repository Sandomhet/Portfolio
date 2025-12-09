---
title: "Connected Components and Strongly Connected Components"
description: "Finding connected components and strongly connected components in graphs."
time: "Fri Oct 24, 2025"
---

# Connected Components and Strongly Connected Components

## Table of Contents

1. [Connected Components (CC)](#connected-components-cc)
2. [Strongly Connected Components (SCC)](#strongly-connected-components-scc)

## Connected Components (CC)

$G = (V, E)$ is an undirected graph.

### Definition

A connected component (CC) is a **maximal** subgraph in which every pair of vertices is connected.

$\operatorname{CC}(G)$ denotes the set of CCs of $G$. It's a partition of $V$.

### Connectivity

```cpp
vector<vector<int>> e;
vector<vector<int>> ccs;
vector<int> ccid;
void dfs(int u, int cid) {
    ccid[u] = cid;
    ccs[cid].push_back(u); // current CC
    for (int v : e[u])
        if (!ccid[v]) dfs(v, cid);
}
void findCC(int n) {
    ccs.clear();
    ccid.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        if (!ccid[u]) {
            ccs.emplace_back();
            dfs(u, ccs.size() - 1);
        }
}
```

### Bridge

### Articulation Point

## Strongly Connected Components (SCC)

$G = (V, E)$ is a directed graph.

### Definition

A strongly connected component (SCC) is a **maximal** subgraph in which every pair of vertices is connected by a path in **both directions**.  
This means that the entire component can be treated as a single vertex without affecting the overall structure of the graph, thereby reducing complexity.

$\operatorname{SCC}(G)$ denotes the set of SCCs of $G$. It's a partition of $V$.

### Condensation Graph (Shrink)

$G^{\operatorname{SCC}} = (V^{\operatorname{SCC}}, E^{\operatorname{SCC}})$ is a DAG formed by contracting each SCC into a single vertex, where $V^{\operatorname{SCC}} = \operatorname{SCC}(G)$ and $E^{\operatorname{SCC}} = \{(C_i, C_j) | \exists u \in C_i, v \in C_j, (u, v) \in E\}$.

### Kosaraju's Algorithm

$O(n + m)$.  

Theorem: In a DFS of $G$, if there is an edge from SCC $C_i$ to SCC $C_j$, then the exit time $t_{out}(C_i)$ is greater than that of $C_j$.  
Theorem: The transpose graph $G^T$, $SCC(G) = SCC(G^T)$.

```cpp
vector<vector<int>> e, re, se;
vector<int> order, sccid;
vector<vector<int>> sccs;
void dfs1(int u) {
    sccid[u] = -1; // mark visited
    for (int v : e[u])
        if (!sccid[v]) dfs1(v);
    order.push_back(u); // exit time
}
void dfs2(int u, int cid) {
    sccid[u] = cid;
    sccs[cid].push_back(u); // current SCC
    for (int v : re[u])
        if (sccid[v] == -1) dfs2(v, cid);
}
void kosaraju() {
    // construct the transpose graph re
    re.assign(n + 1, {});
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            re[v].push_back(u);

    sccid.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        if (!sccid[u]) dfs1(u);
    reverse(order.begin(), order.end()); // decreasing order

    for (int u : order)
        if (sccid[u] == -1) {
            sccs.emplace_back();
            dfs2(u, sccs.size() - 1);
        }
}
void shrink() {
    se.assign(sccs.size(), {});
    for (int u = 1; u <= n; u++)
        for (int v : e[u]) {
            int cu = sccid[u], cv = sccid[v];
            if (cu != cv) se[cu].push_back(cv); // duplicate edges allowed
        }
}
```