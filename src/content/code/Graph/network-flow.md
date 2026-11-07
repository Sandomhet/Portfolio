---
title: "Network Flow Problem"
description: "maximum flow problem, minimum-cost flow problem"
time: "Wed Jun 3, 2026"
---

# Network Flow Problem

Network flow is a kind of linear programming problem.

## Flow Network

Given a directed graph $\vec{G}=(V,\vec{E})$, where each edge $e = (u,v)$ has a capacity $c(u,v) \geq 0$. A source vertex $s$ and a sink vertex $t$.  
A flow is a function $f: V \times V \to \mathbb{R}$ that satisfies the following conditions: 
1. **Capacity constraint**: $\forall e \in \vec{E}$, the flow must satisfy $0 \leq f(u,v) \leq c(u,v)$.
2. **Flow conservation**: $\forall v \in V \setminus \{s,t\}$, $f^{\text{in}}(v) = f^{\text{out}}(v)$, which is $\sum\limits_{(u, v) \in \vec{E}} f(u,v) = \sum\limits_{(v, w) \in \vec{E}} f(v,w)$. This means the total flow into $v$ must equal the total flow out of $v$.

## Max-Flow

Maximize the total flow $|f| = f^{\text{out}}(s) = f^{\text{in}}(t)$.

A cut is a partition of $V$ into two disjoint subsets $S$ and $T$ such that $s \in S$ and $t \in T$. The capacity of the cut $(S,T)$ is defined as $c(S,T) = \sum\limits_{u \in S, v \in T \\ (u,v) \in \vec{E}} c(u,v)$.  

**The Max-Flow Min-Cut Theorem**: 
- Weak duality: $|f| \leq c(S,T)$ for any cut $(S,T)$
- Strong duality: $\max\limits_{f} |f| = \min\limits_{(S,T)} c(S,T)$.

Residual graph: an edge $(u, v)$ with remaining capacity $c - f$ plus a reverse edge with capacity $f$. Edges are stored in pairs `i` and `i ^ 1` in one array, so the reverse of edge `i` is `i ^ 1`. Augment along $s \to t$ paths in the residual graph until none is left.

All structs below own their graph: `add_edge(u, v, cap)` adds a directed edge and returns its index (its flow afterwards is `e[id ^ 1].cap`). Vertices are $1..n$, capacities and flows are `ll`.

### Edmonds-Karp 算法

Augment along a shortest (BFS) path each time. $O(VE^2)$

```cpp
struct EK {
    struct Edge { int v; ll cap; };
    int n; vector<Edge> e; vector<vector<int>> g; vector<int> pre; //pre: 前驱边
    EK(int n) : n(n), g(n + 1), pre(n + 1) {}
    int add_edge(int u, int v, ll cap) {
        g[u].push_back(e.size()), e.push_back({v, cap});
        g[v].push_back(e.size()), e.push_back({u, 0});
        return e.size() - 2;
    }
    ll bfs(int s, int t) { //沿着最短路径寻找增广路，返回瓶颈流量
        vector<ll> flow(n + 1, 0);
        queue<int> q; q.push(s), flow[s] = LLONG_MAX;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i : g[u]) if (e[i].cap && !flow[e[i].v] && e[i].v != s) {
                int v = e[i].v;
                flow[v] = min(flow[u], e[i].cap), pre[v] = i, q.push(v);
                if (v == t) return flow[t];
            }
        }
        return 0;
    }
    ll maxflow(int s, int t) {
        ll res = 0, f;
        while ((f = bfs(s, t))) { //更新增广路上的流量
            for (int v = t; v != s; v = e[pre[v] ^ 1].v)
                e[pre[v]].cap -= f, e[pre[v] ^ 1].cap += f;
            res += f;
        }
        return res;
    }
};
```

### Dinic 算法

BFS builds a level graph, then DFS sends a blocking flow along edges with $dis_v = dis_u + 1$; `cur` (current arc) skips edges already used up. $O(V^2E)$, $O(E\sqrt V)$ on unit-capacity bipartite graphs.

```cpp
struct Dinic {
    struct Edge { int v; ll cap; };
    int n; vector<Edge> e; vector<vector<int>> g; vector<int> dis, cur; //cur: 当前弧优化
    Dinic(int n) : n(n), g(n + 1), dis(n + 1), cur(n + 1) {}
    int add_edge(int u, int v, ll cap) {
        g[u].push_back(e.size()), e.push_back({v, cap});
        g[v].push_back(e.size()), e.push_back({u, 0});
        return e.size() - 2;
    }
    bool bfs(int s, int t) { //按最短路给图分层
        fill(dis.begin(), dis.end(), -1), fill(cur.begin(), cur.end(), 0);
        queue<int> q; q.push(s), dis[s] = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i : g[u]) if (e[i].cap && dis[e[i].v] < 0)
                dis[e[i].v] = dis[u] + 1, q.push(e[i].v);
        }
        return dis[t] >= 0;
    }
    ll dfs(int u, int t, ll lim) { //多路增广
        if (u == t) return lim;
        ll res = 0;
        for (int &k = cur[u]; k < (int)g[u].size(); k++) { //更新当前弧，之前的边不用再判断一次
            int i = g[u][k], v = e[i].v;
            if (!e[i].cap || dis[v] != dis[u] + 1) continue; //检查是否为分层图的结构
            ll f = dfs(v, t, min(lim - res, e[i].cap));
            e[i].cap -= f, e[i ^ 1].cap += f, res += f;
            if (res == lim) return res;
        }
        dis[u] = -1; //流不出去了，删掉这个点
        return res;
    }
    ll maxflow(int s, int t) {
        ll res = 0;
        while (bfs(s, t)) res += dfs(s, t, LLONG_MAX);
        return res;
    }
    vector<bool> mincut(int s) { //call after maxflow: true = on the s side
        vector<bool> vis(n + 1);
        queue<int> q; q.push(s), vis[s] = 1;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i : g[u]) if (e[i].cap && !vis[e[i].v]) vis[e[i].v] = 1, q.push(e[i].v);
        }
        return vis;
    }
};
```

Usage:

```cpp
Dinic d(n);
int id = d.add_edge(u, v, c);  // directed edge u -> v with capacity c
ll f = d.maxflow(s, t);
d.e[id ^ 1].cap;               // flow on that edge
auto side = d.mincut(s);       // min cut: edges from side[u] = 1 to side[v] = 0

// bipartite matching: left 1..nl, right nl+1..nl+nr, s = nl+nr+1, t = nl+nr+2
Dinic g(nl + nr + 2); int s = nl + nr + 1, t = s + 1;
for (int i = 1; i <= nl; i++) g.add_edge(s, i, 1);
for (int j = 1; j <= nr; j++) g.add_edge(nl + j, t, 1);
g.add_edge(i, nl + j, 1);      // for each allowed pair (i, j)
g.maxflow(s, t);
```

### Ford-Fulkerson 算法

Augment along any DFS path. $O(E \cdot |f|)$, only for small flows.

```cpp
struct FF {
    struct Edge { int v; ll cap; };
    int n; vector<Edge> e; vector<vector<int>> g; vector<int> vis; int stamp = 0;
    FF(int n) : n(n), g(n + 1), vis(n + 1) {}
    int add_edge(int u, int v, ll cap) {
        g[u].push_back(e.size()), e.push_back({v, cap});
        g[v].push_back(e.size()), e.push_back({u, 0});
        return e.size() - 2;
    }
    ll dfs(int u, int t, ll lim) {
        if (u == t) return lim;
        vis[u] = stamp;
        for (int i : g[u]) if (e[i].cap && vis[e[i].v] != stamp)
            if (ll f = dfs(e[i].v, t, min(lim, e[i].cap))) { e[i].cap -= f, e[i ^ 1].cap += f; return f; }
        return 0;
    }
    ll maxflow(int s, int t) {
        ll res = 0, f;
        while (++stamp, (f = dfs(s, t, LLONG_MAX))) res += f;
        return res;
    }
};
```

## Min-Cost Max-Flow

Among all maximum flows, find one with the minimum total cost $\sum f(u,v)\,w(u,v)$. Repeatedly augment along the cheapest $s \to t$ path in the residual graph (the reverse edge has cost $-w$), found by SPFA since costs can be negative. $O(VE \cdot |f|)$ in theory, fast in practice. No negative cycles allowed in the initial graph.

费用流 (SSP + SPFA)

```cpp
struct MCMF {
    struct Edge { int v; ll cap, cost; };
    int n; vector<Edge> e; vector<vector<int>> g; vector<ll> dis; vector<int> pre; vector<bool> inq;
    MCMF(int n) : n(n), g(n + 1), dis(n + 1), pre(n + 1), inq(n + 1) {}
    int add_edge(int u, int v, ll cap, ll cost) {
        g[u].push_back(e.size()), e.push_back({v, cap, cost});
        g[v].push_back(e.size()), e.push_back({u, 0, -cost});
        return e.size() - 2;
    }
    bool spfa(int s, int t) {
        fill(dis.begin(), dis.end(), LLONG_MAX);
        queue<int> q; q.push(s), dis[s] = 0, inq[s] = 1;
        while (!q.empty()) {
            int u = q.front(); q.pop(), inq[u] = 0;
            for (int i : g[u]) {
                int v = e[i].v;
                if (e[i].cap && dis[u] + e[i].cost < dis[v]) {
                    dis[v] = dis[u] + e[i].cost, pre[v] = i;
                    if (!inq[v]) inq[v] = 1, q.push(v);
                }
            }
        }
        return dis[t] != LLONG_MAX;
    }
    pair<ll, ll> run(int s, int t) { // {max flow, min cost}
        ll flow = 0, cost = 0;
        while (spfa(s, t)) {
            ll f = LLONG_MAX;
            for (int v = t; v != s; v = e[pre[v] ^ 1].v) f = min(f, e[pre[v]].cap);
            for (int v = t; v != s; v = e[pre[v] ^ 1].v) e[pre[v]].cap -= f, e[pre[v] ^ 1].cap += f;
            flow += f, cost += f * dis[t];
        }
        return {flow, cost};
    }
};
```

Usage:

```cpp
MCMF mf(n);
mf.add_edge(u, v, cap, cost);
auto [flow, cost] = mf.run(s, t);
// max-cost max-flow: add every edge with -cost and negate the answer
// min cost with flow at most K: add a source s' with edge s' -> s of capacity K
```

### Applications

- Maximum Bipartite Matching
- Minimum Vertex Cover
- Minimum Edge Cover
- Image Segmentation
- Assignment problems (min-cost flow)
