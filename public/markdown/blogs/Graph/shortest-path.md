---
title: "Shortest Path Problem"
description: "finding a path between two vertices in a graph such that the sum of the weights of its constituent edges is minimized."
time: "Mon Feb 1, 2024"
---

# Shortest Path Algorithms

## Single Source Shortest Path (SSSP)

### BFS For Unweighted Graphs

BFS from source. $O(V+E)$

```cpp
vector<int> adj[Z]; // adjacency list
// int dis[Z]; // distance array
vector<int> dis(Z, -1); // distance array
void bfs(int s) {
    memset(dis, -1, sizeof(dis));
    queue<int> q;
    q.push(s);
    dis[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dis[v] == -1) {
                dis[v] = dis[u] + 1;
                q.push(v);
            }
        }
    }
}
```

### DAG Shortest Path

Topological sort + relax edges. $O(V+E)$
weights can be negative but no negative cycles.

```cpp
void dag_shortest_path(int n, vector<int> adj[], vector<int>& dis) {
    vector<int> in_degree(n, 0);
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) {
            in_degree[v]++;
        }
    }
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (in_degree[i] == 0) q.push(i);
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            dis[v] = min(dis[v], dis[u] + 1); // Assuming edge weight = 1
            if (--in_degree[v] == 0) q.push(v);
        }
    }
}
```

### Dijkstra's Algorithm

Dijkstra's algorithm for weighted graphs with non-negative weights. Uses a priority queue. $O((V+E) \log V)$
```cpp
typedef pair<int, int> pii;
priority_queue<pii, vector<pii>, greater<pii>> pq;
void dijkstra(int s, vector<int> adj[], vector<int>& dis) {
    memset(dis, 63, sizeof(dis));
    dis[s] = 0;
    pq.push({0, s});
    while (!pq.empty()) {
        int u = pq.top().second; pq.pop();
        for (int v : adj[u]) {
            if (dis[v] > dis[u] + 1) { // Assuming edge weight not 1
                dis[v] = dis[u] + 1;
                pq.push({dis[v], v});
            }
        }
    }
}
```

# Shortest Path Problem

链式前向星（模拟链表）

```cpp
struct edge { int v, w, ne; } e[Z << 1];
int head[Z], cnt = 1;
inline void add(int x, int y, int z)
{
    e[++cnt] = edge{y, head[x]};
    head[x] = cnt;
}
```

$Floyed$算法--多源最短路
时间复杂度：$O（n^3）$

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

$dijkstra$算法--单源最短路
时间复杂度：优先队列优化后$O（mlogn）$

```cpp
typedef pair<int, int> paint;
priority_queue <paint, vector<paint>, greater<paint> > q;
void dijk(int st)
{
    memset(dis, 63, sizeof(dis));
    memset(vs, 0, sizeof(vs));
    dis[st] = 0;
    q.push(make_pair(dis[st], st));
    while (!q.empty())
    {
        int u = q.top().second; q.pop();
        if (vs[u]) continue; vs[u] = 1;
        for (int i = head[u]; i; i = e[i].ne)
        {
            int v = e[i].v;
            if (dis[v] > dis[u] + e[i].w)
            {
                dis[v] = dis[u] + e[i].w;
                q.push(make_pair(dis[v], v));
            }
        }
    }
}
```

$spfa$算法--单源最短路
时间复杂度：$O(玄学--极限n*m)$

```cpp
void spfa(int s)
{
    memset(dis, 63, sizeof(dis));
    memset(vs, 0, sizeof(vs));
    queue <int> q;
    q.push(s), vs[s] = 1, dis[s] = 0;
    while (!q.empty())
    {
        int u = q.front(); q.pop(), vs[u] = 0;
        for (int i = head[u]; i; i = e[i].ne)
        {
            int v = e[i].v;
            if (dis[v] > dis[u] + e[i].w)
            {
                dis[v] = dis[u] + e[i].w;
                if (!vs[v]) q.push(v), vs[v] = 1;
            }
        }
    }
}
```

```cpp
bool spfa(int s)//判断是否存在环
{
    memset(dis, 63, sizeof(dis));
    memset(vs, 0, sizeof(vs));
    memset(tim, 0, sizeof(tim));
    queue <int> q;
    q.push(s), vs[s] = 1, dis[s] = 0, tim[s] = 1;
    while (!q.empty())
    {
        int u = q.front(); q.pop(), vs[u] = 0;
        for (int i = head[u]; i; i = e[i].ne)
        {
            int v = e[i].v;
            if (dis[v] > dis[u] + e[i].w)
            {
                dis[v] = dis[u] + e[i].w;
                if (!vs[v])
                {
                    q.push(v), vs[v] = 1;
                    if ((++tim[v]) > n - 1) return true;
                }
            }
        }
    }
    return false;
}
```

$Bellman$\_$ford$算法（spfa 的非优化版本）
