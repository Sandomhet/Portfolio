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
ll bellman_ford_dp(int n, const vector<tuple<int, int, ll>> &edges, int s, int t) { // LLONG_MAX if unreachable
    vector<ll> d(n + 1, LLONG_MAX); // d[v] after round i: shortest path with at most i edges
    d[s] = 0;
    for (int i = 1; i < n; i++)
        for (auto [u, v, w] : edges)
            if (d[u] != LLONG_MAX) d[v] = min(d[v], d[u] + w);
    return d[t];
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
bool floyd_warshall(int n, vector<vector<ll>> &dis, const vector<vector<ll>> &w) { // w: LLONG_MAX = no edge; false on a negative cycle
    dis = w;
    for (int i = 1; i <= n; i++) dis[i][i] = min(dis[i][i], 0LL);
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (dis[i][k] != LLONG_MAX && dis[k][j] != LLONG_MAX)
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    for (int i = 1; i <= n; i++)
        if (dis[i][i] < 0) return false; // negative cycle exists
    return true;
}
```