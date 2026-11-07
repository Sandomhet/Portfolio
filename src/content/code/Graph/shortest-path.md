---
title: "Shortest Path Problem"
description: "finding a path between two vertices in a graph such that the sum of the weights of its constituent edges is minimized."
time: "Mon Oct 27, 2025"
---

# Shortest Path Algorithms

## Table of Contents

- [Single Source Shortest Path (SSSP)](#single-source-shortest-path-sssp)
- [All Pairs Shortest Path (APSP)](#all-pairs-shortest-path-apsp)

## Single Source Shortest Path (SSSP)

单源最短路

The graph is the global adjacency list `vector<vector<pii>> e` of size $n + 1$ (`e.assign(n + 1, {})`, then `e[u].push_back({v, w})`); distances are `ll` and `LLONG_MAX` means unreachable. Call each function with the number of vertices `n` and the source `s`.

### BFS For Unweighted Graphs

BFS from source. $O(V+E)$

```cpp
vector<vector<int>> e; // e.assign(n + 1, {})
vector<int> dis; // -1 = unreachable
void bfs(int n, int s) {
    dis.assign(n + 1, -1);
    queue<int> q;
    q.push(s);
    dis[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : e[u])
            if (dis[v] == -1) {
                dis[v] = dis[u] + 1;
                q.push(v);
            }
    }
}
```

### DAG Shortest Path

Topological sort + relax edges. $O(V+E)$
weights can be negative but no negative cycles.

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;   // LLONG_MAX = unreachable
void dag_shortest_path(int n, int s) {
    dis.assign(n + 1, LLONG_MAX);
    vector<int> indeg(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (auto [v, w] : e[u]) indeg[v]++;
    queue<int> q;
    for (int u = 1; u <= n; u++)
        if (indeg[u] == 0) q.push(u);
    dis[s] = 0;
    while (!q.empty()) { // vertices come out in topological order
        int u = q.front(); q.pop();
        for (auto [v, w] : e[u]) {
            if (dis[u] != LLONG_MAX) dis[v] = min(dis[v], dis[u] + w);
            if (--indeg[v] == 0) q.push(v);
        }
    }
}
```

### Dijkstra's Algorithm

Proof: After any vertex $v$ becomes marked, the current distance to it $d[v]$ is the shortest, and will no longer change. Try to produce relaxation.

Prerequisites: edge weights are non-negative $w(e) \geq 0$.

1. **Fibonacci heap:** $O(\log n)$ for extract-min and $O(1)$ for decrease-key → overall $O(n \log n + m)$. (the most efficient, but complex to implement)
2. **Binary heap (set):** both operations $O(\log n)$ → overall $O((n + m) \log n)$, but has higher constant factors.
3. **Priority_queue:** no decrease-key → overall $O((n + m) \log m)$ worst case, but usually faster in practice.

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;   // LLONG_MAX = unreachable
vector<int> path;
void dijkstra(int n, int s) {
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> q;
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    dis[s] = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (d > dis[u]) continue; // outdated value
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                q.push({dis[v], v});
            }
        }
    }
}
vector<int> get_path(int t) { // from s to t
    vector<int> res;
    for (int v = t; v != 0; v = path[v])
        res.push_back(v);
    reverse(res.begin(), res.end());
    return res;
}
```

For dense graph: $O(n^2)$

<details>
<summary>Show Code</summary>

```cpp
vector<ll> dis;
vector<int> path;
void dijkstra_dense(int n, int s, const vector<vector<ll>> &w) { // w[i][j]: weight, LLONG_MAX = no edge
    vector<bool> vs(n + 1, false);
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    dis[s] = 0;
    for (int i = 1; i <= n; i++) {
        int k = 0;
        for (int j = 1; j <= n; j++) //寻找与此点距离最小的点
            if (!vs[j] && dis[j] != LLONG_MAX && (!k || dis[j] < dis[k]))
                k = j;
        if (k == 0) break;
        vs[k] = 1;
        for (int j = 1; j <= n; j++) //更新经过k点到其他点的最小距离
            if (!vs[j] && w[k][j] != LLONG_MAX && dis[j] > dis[k] + w[k][j]) {
                dis[j] = dis[k] + w[k][j];
                path[j] = k;
            }
    }
}
```

</details>

### Bellman-Ford Algorithm

Can handle negative weights and detect negative cycles. $O(nm)$.  

Proof: After $i_{th}$ iteration, all shortest paths with at most $i$ edges are found. A negative cycle exists if we can still relax an edge in the $n_{th}$ iteration.

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;   // LLONG_MAX = unreachable
vector<int> path, cycle; // cycle: a negative cycle, if found
void get_negative_cycle(int n, int x) {
    // retrace to find a vertex definitely inside the cycle
    for (int i = 1; i <= n; i++) x = path[x];
    cycle.clear();
    for (int v = x; ; v = path[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());
}
bool bellman_ford(int n, int s) { // true if a negative cycle is reachable from s
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    dis[s] = 0;
    int x = -1; // last updated vertex
    for (int i = 1; i <= n; i++) {
        x = -1;
        for (int u = 1; u <= n; u++) {
            if (dis[u] == LLONG_MAX) continue;
            for (auto [v, w] : e[u]) {
                if (dis[v] > dis[u] + w) {
                    dis[v] = dis[u] + w;
                    path[v] = u;
                    x = v; // record last relaxed vertex
                }
            }
        }
        if (x == -1) return false; // no negative cycle
    }
    get_negative_cycle(n, x);
    return true;
}
```

### Shortest Path Faster Algorithm (SPFA)

Faster version of Bellman-Ford using a queue to process vertices.  
It is $O(nm)$ in the worst case but can perform in $O(m)$ on average for many graphs.

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;   // LLONG_MAX = unreachable
vector<int> path, cnt, cycle; // cycle: a negative cycle, if found
vector<bool> vs;
void get_negative_cycle(int n, int x) {
    // retrace to find a vertex definitely inside the cycle
    for (int i = 1; i <= n; i++) x = path[x];
    cycle.clear();
    for (int v = x; ; v = path[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());
}
//判断是否存在环
bool spfa(int n, int s) { // true if a negative cycle is reachable from s
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    cnt.assign(n + 1, 0);
    vs.assign(n + 1, false);
    queue<int> q;
    dis[s] = 0; q.push(s); vs[s] = true; cnt[s] = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop(); vs[u] = false;
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                if (!vs[v]) {
                    q.push(v); vs[v] = true;
                    if ((++cnt[v]) >= n) {
                        get_negative_cycle(n, v);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
```

### 0-1 BFS

For graphs with edge weights of $0$ or $1$. $O(V+E)$

Same idea as Dijkstra, but the queue would only look like this: $Q = [d_u, \cdots, d_u, d_u + 1, \cdots, d_u + 1]$.

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1, w in {0, 1}
vector<ll> dis;
void zero_one_bfs(int n, int s) {
    dis.assign(n + 1, LLONG_MAX);
    deque<int> q;
    dis[s] = 0;
    q.push_front(s);
    while (!q.empty()) {
        int u = q.front(); q.pop_front();
        for (auto [v, w] : e[u])
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                if (w == 0) q.push_front(v);
                else q.push_back(v);
            }
    }
}
```

#### Dial's Algorithm

For graphs with small integer weights. $O(kV + E)$ where $k$ is the maximum edge weight.

<details>
<summary>Show Code</summary>

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1, 0 <= w <= maxw
vector<ll> dis;
void dial(int n, int s, int maxw) {
    dis.assign(n + 1, LLONG_MAX);
    dis[s] = 0;
    vector<vector<int>> buckets((ll)maxw * n + 1); // distances are at most maxw * (n - 1)
    buckets[0].push_back(s);
    for (int d = 0; d < (int)buckets.size(); d++) {
        while (!buckets[d].empty()) {
            int u = buckets[d].back(); buckets[d].pop_back();
            if (dis[u] != d) continue; // outdated
            for (auto [v, w] : e[u]) {
                if (dis[v] > dis[u] + w) {
                    dis[v] = dis[u] + w;
                    buckets[dis[v]].push_back(v);
                }
            }
        }
    }
}
```

</details>

### D´Esopo-Pape Algorithm

Usually faster than Dijkstra and SPFA in practice. Exponential worst-case time complexity.

<details>
<summary>Show Code</summary>

```cpp
vector<vector<pii>> e; // e[u]: (v, w), size n + 1
vector<ll> dis;
vector<int> path;
void desopo_pape(int n, int s) {
    dis.assign(n + 1, LLONG_MAX);
    path.assign(n + 1, 0);
    vector<int> st(n + 1, 2); // 2: never queued, 1: in the queue, 0: was queued before
    deque<int> q;
    dis[s] = 0, q.push_back(s);
    while (!q.empty()) {
        int u = q.front(); q.pop_front();
        st[u] = 0;
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                if (st[v] == 2) st[v] = 1, q.push_back(v);
                else if (st[v] == 0) st[v] = 1, q.push_front(v);
            }
        }
    }
}
```

</details>

## All Pairs Shortest Path (APSP)

多源最短路 - Floyd算法

### Floyd-Warshall Algorithm (DP)

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
                if (dis[i][k] != LLONG_MAX && dis[k][j] != LLONG_MAX) // INF + INF overflows, INF + negative is not a path
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    for (int i = 1; i <= n; i++)
        if (dis[i][i] < 0) return false; // negative cycle exists
    return true;
}
```

Get Connectivity:

```cpp
void floyd_warshall_connectivity(int n, vector<vector<bool>> &dis) { // dis[i][j]: edge i -> j, becomes reachability
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            if (dis[i][k])
                for (int j = 1; j <= n; j++)
                    if (dis[k][j]) dis[i][j] = true;
}
```

```cpp
ll floyd_ring(int n, const vector<vector<ll>> &w) { //最小环 (undirected, w: LLONG_MAX = no edge), LLONG_MAX if none
    vector<vector<ll>> dis = w;
    ll ans = LLONG_MAX;
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i < k; i++)
            for (int j = i + 1; j < k; j++)
                if (dis[i][j] != LLONG_MAX && w[i][k] != LLONG_MAX && w[k][j] != LLONG_MAX) // INF * 3 overflows
                    ans = min(ans, dis[i][j] + w[i][k] + w[k][j]);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (dis[i][k] != LLONG_MAX && dis[k][j] != LLONG_MAX)
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    }
    return ans;
}
```
