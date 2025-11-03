---
title: "Topological Sorting"
description: "DAG and Topological Order"
time: "Wed Jun 5, 2025"
---

# Topological Sorting

## DAG

A **Directed Acyclic Graph (DAG)** is a directed graph that has no cycles.

A graph is a DAG iff it has a topological ordering.

### Sources and Sinks

In a DAG, a **source** is a vertex with no incoming edges (in-degree 0), and a **sink** is a vertex with no outgoing edges (out-degree 0). Every DAG has at least one source and one sink.

```cpp
vector<int> indeg, outdeg;
vector<int> sources, sinks;
void find_sources_and_sinks(int n) {
    indeg.assign(n + 1, 0);
    outdeg.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            outdeg[u]++, indeg[v]++;

    sources.clear();
    sinks.clear();
    for (int u = 1; u <= n; u++) {
        if (indeg[u] == 0) sources.push_back(u);
        if (outdeg[u] == 0) sinks.push_back(u);
    }
}
```

The minimum number of edges needed to make a DAG strongly connected is $\max(\text{number of sources}, \text{number of sinks})$.

## Definition

Topological sorting is a linear ordering of vertices in a DAG such that for every directed edge $(u, v)$, vertex $u$ comes before vertex $v$ in the ordering.

### DFS-based Algorithm

The exit time of any vertex is always greater than the exit time of any vertex reachable from it since they were visited either before this DFS call or during it. Thus, the desired topological ordering are the vertices in descending order of their exit times.

```cpp
vector<vector<int>> e;
vector<bool> vs;
vector<int> order;
void dfs(int u) {
    vs[u] = true;
    for (int v : e[u])
        if (!vs[v]) dfs(v);
    order.push_back(u); // exit time
}
void topo_sort(int n) {
    vs.assign(n + 1, false);
    order.clear();
    for (int u = 1; u <= n; u++)
        if (!vs[u]) dfs(u);
    reverse(order.begin(), order.end()); // descending order of exit time
}
```

### Kahn's Algorithm

Kahn's algorithm uses in-degrees to find a topological ordering. It repeatedly removes nodes with in-degree 0 and updates the in-degrees of their neighbors.

```cpp
vector<vector<int>> e;
vector<int> indeg, order;
void topo_sort_kahn(int n) {
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
}
```
