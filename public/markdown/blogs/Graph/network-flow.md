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

### Edmonds-Karp 算法

```cpp
namespace EK {
    int dis[Z], pre[Z];//前驱结点
    bool bfs()//沿着最短路径寻找增广路
    {
        queue <int> q;
        rep(i, 1, n) dis[i] = 0;
        q.push(s), dis[s] = inf;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i = head[u]; i; i = e[i].ne) if (e[i].flow)
            {
                int v = e[i].v;
                if (dis[v]) continue;
                dis[v] = min(dis[u], e[i].flow);//路径上瓶颈流量
                q.push(v), pre[v] = i;
                if (v == t) return true;
            }
        }
        return false;
    }
    void update()//更新增广路上的流量
    {
        int u = t;
        while (u != s) {
            int i = pre[u];
            e[i].flow -= dis[t], e[i ^ 1].flow += dis[t];
            u = e[i ^ 1].v;
        }
        ans += dis[t];
    }
    void max_flow() {
        while (bfs()) update();
        cout << ans << endl;
    }
}
```

### Dinic 算法

```cpp
namespace Dinic
{
    int dis[Z], now[Z];//当前弧优化
    bool bfs()//按最短路给图分层
    {
        queue <int> q;
        rep(i, 1, n) now[i] = head[i], dis[i] = 0;
        q.push(s), dis[s] = 1;
        while (!q.empty())
        {
            int u = q.front(); q.pop();
            for (int i = head[u]; i; i = e[i].ne) if (e[i].flow)
            {
                int v = e[i].v;
                if (dis[v]) continue;
                q.push(v), dis[v] = dis[u] + 1;
                if (v == t) return true;
            }
        }
        return false;
    }
    int dfs(int u, int sum)//多路增广
    {
        if (u == t) return sum;//没有限制，这些流量都可以通过
        int res = 0;
        for (int i = now[u]; i && sum; now[u] = i, i = e[i].ne)//更新当前弧，之前的状态不用再判断一次
        {
            int v = e[i].v;
            if (dis[v] != dis[u] + 1) continue;//检查是否为分层图的结构
            int val = dfs(v, min(sum, e[i].flow));
            e[i].flow -= val, e[i ^ 1].flow += val;
            sum -= val, res += val;//sum为剩余流量；res为流出流量
        }
        return res;
    }
    void max_flow()
    {
        while (bfs()) ans += dfs(s, inf);
        cout << ans << endl;
    }
}
```

### Ford-Fulkerson 算法

```cpp
namespace FF
{
    bool dfs(int u)
    {
        if (u == t) return true;
        vis[u] = 1;
        for (int i = head[u]; i; i = e[i].ne) if (e[i].flow && !vis[e[i].v])
        {
            if (dfs(e[i].v))
            {
                e[i].flow -= 1, e[i ^ 1].flow += 1;
                return true;
            }
        }
        return false;
    }
    void max_flow()
    {
        while (true)
        {
            memset(vis, 0, sizeof(vis));
            if (!dfs(s)) break;
            ans++;
        }
        cout << ans << endl;
    }
}
```

### Applications

- Maximum Bipartite Matching
- Minimum Vertex Cover
- Minimum Edge Cover
- Image Segmentation
