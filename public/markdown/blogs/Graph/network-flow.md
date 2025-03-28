---
title: "Network Flow Problem"
description: "maximum flow problem, minimum-cost flow problem"
time: "Mon Feb 1, 2024"
---

# Network Flow Problem

## Table of Contents

## 最大流

### Edmonds-Karp 算法

```cpp
namespace EK
{
    int dis[Z], pre[Z];//前驱结点
    bool bfs()//沿着最短路径寻找增广路
    {
        queue <int> q;
        rep(i, 1, n) dis[i] = 0;
        q.push(s), dis[s] = inf;
        while (!q.empty())
        {
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
        while (u != s)
        {
            int i = pre[u];
            e[i].flow -= dis[t], e[i ^ 1].flow += dis[t];
            u = e[i ^ 1].v;
        }
        ans += dis[t];
    }
    void max_flow()
    {
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