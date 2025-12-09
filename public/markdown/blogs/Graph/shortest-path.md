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

### BFS For Unweighted Graphs

BFS from source. $O(V+E)$

```cpp
vector<int> e[Z];
vector<int> dis;
void bfs(int s) {
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
vector<int> e[Z];
vector<int> dis;
void dag_shortest_path(int n) {
    dis.assign(n + 1, INF);
    vector<int> in_degree(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (int v : e[u]) {
            in_degree[v]++;
        }
    queue<int> q;
    for (int u = 1; u <= n; u++) {
        if (in_degree[u] == 0) {
            q.push(u);
            dis[u] = 0;
        }
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : e[u]) {
            dis[v] = min(dis[v], dis[u] + 1); // Assuming edge weight = 1
            if (--in_degree[v] == 0) q.push(v);
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
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path;
void dijkstra(int s) {
    priority_queue<pii, vector<pii>, greater<pii>> q;
    dis.assign(n + 1, INF);
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
int e[Z][Z];
vector<int> dis, path;
bool vs[Z];
void dijkstra_dense(int s) {
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    dis[s] = 0;
    for (int i = 1; i <= n; i++) {
        int k = 0;
        for (int j = 1; j <= n; j++) //寻找与此点距离最小的点
            if (!vs[j] && dis[j] < dis[k])
                k = j;
        if (k == 0) break;
        vs[k] = 1;
        for (int j = 1; j <= n; j++) //更新经过k点到其他点的最小距离
            if (!vs[j] && dis[j] > dis[k] + e[k][j]) {
                dis[j] = dis[k] + e[k][j];
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
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path, cycle;
bool bellman_ford(int s) {
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    dis[s] = 0;
    int x = -1; // last updated vertex
    for (int i = 1; i <= n; i++) {
        x = -1;
        for (int u = 1; u <= n; u++) {
            if (dis[u] == INF) continue;
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

    get_negative_cycle(x);
    return true;
}
```

### Shortest Path Faster Algorithm (SPFA)

Faster version of Bellman-Ford using a queue to process vertices.  
It is $O(nm)$ in the worst case but can perform in $O(m)$ on average for many graphs.

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path, cnt, cycle;
vector<bool> vs;
//判断是否存在环
bool spfa(int s) {
    dis.assign(n + 1, INF);
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
                        get_negative_cycle(v);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
void get_negative_cycle(int x) {
    // retrace to find a vertex definitely inside the cycle
    for (int i = 1; i <= n; i++) x = path[x];
    for (int v = x; ; v = path[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());
}
```

### 0-1 BFS

For graphs with edge weights of $0$ or $1$. $O(V+E)$

Same idea as Dijkstra, but the queue would only look like this: $Q = [d_u, \cdots, d_u, d_u + 1, \cdots, d_u + 1]$.

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis;
void zero_one_bfs(int s) {
    dis.assign(n + 1, INF);
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
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis;
void dial(int s) {
    dis.assign(n + 1, INF);
    dis[s] = 0;
    vector<vector<int>> buckets(k + 1);
    buckets[0].push_back(s);
    for (int d = 0; d < k; d++) {
        while (!buckets[d].empty()) {
            int u = buckets[d].back(); buckets[d].pop_back();
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

```cpp

<details>
<summary>Show Code</summary>

```cpp
struct Edge {
    int to, w;
};

int n;
vector<vector<Edge>> adj;

const int INF = 1e9;

void shortest_paths(int v0, vector<int>& d, vector<int>& p) {
    d.assign(n, INF);
    d[v0] = 0;
    vector<int> m(n, 2);
    deque<int> q;
    q.push_back(v0);
    p.assign(n, -1);

    while (!q.empty()) {
        int u = q.front();
        q.pop_front();
        m[u] = 0;
        for (Edge e : adj[u]) {
            if (d[e.to] > d[u] + e.w) {
                d[e.to] = d[u] + e.w;
                p[e.to] = u;
                if (m[e.to] == 2) {
                    m[e.to] = 1;
                    q.push_back(e.to);
                } else if (m[e.to] == 0) {
                    m[e.to] = 1;
                    q.push_front(e.to);
                }
            }
        }
    }
}
```

</details>

## All Pairs Shortest Path (APSP)

Floyed算法--多源最短路
时间复杂度：$O(n^3)$

```cpp
void floyed_base()
{
    memset(dis, 63, sizeof(dis));
    //最短路
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    //连通性
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] |= (dis[i][k] & dis[k][j]);
}
```

```cpp
void floyed_ring()//最小环
{
    memset(dis, 63, sizeof(dis));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            g[i][j] = dis[i][j];//保存原数据
    for (int k = 1; k <= n; k++)
    {
        for (int i = 1; i < k; i++)
            for (int j = i + 1; j < k; j++)
                ans = min(ans, dis[i][j] + g[i][k] + g[k][j]);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    }
}
```
