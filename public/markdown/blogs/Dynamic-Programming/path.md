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

