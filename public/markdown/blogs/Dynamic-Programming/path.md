---
title: "Shortest Path DP"
description: ""
time: "Wed Jul 10, 2024"
---

# Shortest Path DP

## Bellman-Ford DP

Setup:
- Input: A directed graph $G = (V, E)$ with edge weights $w(u, v)$, a source node $s$, and a target node $t$.
- Output: The length of the shortest path from $s$ to $t$.

Steps:
1. Subproblem: $d_{i,v}$ be the shortest path from source node $s$ to node $v$ with at most $i$ edges.
2. Recurrence relation:
$$
d_{i,v} = \min\limits_{(u, v) \in E} \{d_{i-1,u} + w(u, v)\}
$$
3. Answer: $d_{n-1,t}$.

$O(nm)$

```cpp
int BellmanFord(int n, int m, vector<tuple<int, int, int>> edges, int s, int t) {
    vector<int> d(n, INT_MAX);
    d[s] = 0;
    for (int i = 1; i < n; i++) {
        for (auto [u, v, w] : edges) {
            if (d[u] != INT_MAX) {
                d[v] = min(d[v], d[u] + w);
            }
        }
    }
    return d[t] == INT_MAX ? -1 : d[t];
}
```

## Floyd-Warshall DP

Setup:
- Input: A directed graph $G = (V, E)$ with edge weights $w(u, v)$.
- Output: A matrix $D$ where $D(u, v)$ is the length of the shortest path from vertex $u$ to vertex $v$.

Steps:
1. Subproblem: $D_{k}(u, v)$ be the length of the shortest path from vertex $u$ to vertex $v$ using only intermediate vertices from the set $\{1, 2, \ldots, k\}$.
2. Recurrence relation:
$$
D_{k}(u, v) = \min\{D_{k-1}(u, v), D_{k-1}(u, k) + D_{k-1}(k, v)\}
$$
3. Answer: $D_{n}(u, v)$ for all pairs $(u, v)$.

$O(n^3)$

```cpp
bool floyd_warshall(vector<vector<int>>& dis, vector<vector<int>>& w) {
    int n = dis.size() - 1;
    dis.assign(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dis[i][j] = w[i][j];
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    
    for (int i = 1; i <= n; i++)
        if (dis[i][i] < 0) return false; // negative cycle exists
    return true;
}
```