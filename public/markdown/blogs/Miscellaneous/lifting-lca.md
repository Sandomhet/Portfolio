---
title: "Binary Lifting and Lowest Common Ancestor (LCA)"
description: "query in O(log(n))"
time: "Mon Feb 1, 2024"
---

# Binary Lifting and Lowest Common Ancestor (LCA)

建立 dfs 序

```cpp
int in[Z], out[Z], tim, path[Z];
bool vs[Z];
void dfs(int rt)
{
    if (vs[rt])    return;
    vs[rt] = 1;
    in[rt] = ++tim;
    path[tim] = a[rt];
    for (re i = head[rt]; i; i = r[i].ne)
        dfs(e[i].v);
    out[rt] = tim;//dfs序
    out[rt] = ++tim;//欧拉序
}
```

预处理 ST 表，区间 RMQ 问题：dp[i][j]：以 i 为起点，长度为 2^j 的区间

```cpp
int dp[Z][30];
void ST(int n)
{
    for (re i = 1; i <= n; i++)    dp[i][0] = dat[i];
    int t = log2(n);
    for (re j = 1; j <= t; j++)
        for (re i = 1; i + (1 << j) - 1 <= n; i++)
            dp[i][j] = max(dp[i][j - 1], dp[i + (1 << (j - 1))][j - 1]);
}
int RMQ(int l, int r)
{
    int t = log2(r - l + 1);
    return max(dp[l][t], dp[r - (1 << t) + 1][t]);
}
```

倍增解决 LCA

```cpp
void dfs_st(int rt, int dad)
{
    fa[rt][0] = dad;
    dep[rt] = dep[dad] + 1;
    int t = log2(dep[rt]);
    for (re j = 1; j <= t; j++)
        fa[rt][j] = fa[fa[rt][j - 1]][j - 1];
    for (re i = head[rt]; i; i = e[i].ne)
        if (e[i].v != dad)  dfs_st(e[i].v, rt);
}
int LCA(int a, int b)
{
    if (dep[a] < dep[b]) swap(a, b);
    for (re i = 20; i >= 0; i--)
        if (dep[fa[a][i]] >= dep[b])
            a = fa[a][i];
    if (a == b) return a;
    for (re i = 20; i >= 0; i--)
        if (fa[a][i] != fa[b][i])
        {
            a = fa[a][i];
            b = fa[b][i];
        }
    return fa[a][0];
}
```

tarjan 解决 LCA

```cpp
int dis[Z], vs[Z];
void LCA_tarjan(int rt)
{
    vs[rt] = 1;
    dad[rt] = rt;
    for (re i = head[rt]; i ; i = e[i].ne)
    {
        int j = e[i].v;
        if (vs[j]) continue;
        dis[j] = dis[rt] + e[i].w;
        LCA_tarjan(j);
        unionn(j, rt);//并查集
    }
    for (re i = 0; i < v[rt].size(); i = -~i)
    {
        int j = v[rt][i], id = vid[rt][i];
        if (vs[j] == 2)
        {
            int lca = find(j);
            ans[id] = dis[rt] + dis[j] - (dis[lca] << 1);
        }
    }
    vs[rt] = 2;
}
```

RMQ 解决 LCA

```cpp
int fir[Z], nod[Z], dep[Z], tim, dis[Z];
bool v[Z];
void dfs(int rt, int depth)
{
    //第一次dfs到的时间戳, 记录dfs序, 结点深度.
    fir[rt] = ++tim; v[rt] = 1; nod[tim] = rt; dep[tim] = depth;
    for (re i = head[rt]; i ; i = e[i].ne)
    {
        int j = e[i].v;
        if (!v[j])
        {
            dis[j] = dis[rt] + e[i].w;
            dfs(j, depth + 1);
            nod[++tim] = rt; dep[tim] = depth;
        }
    }
}
int dp[Z][30];
void ST(int n)
{
    for (re i = 1; i <= n; i++)    dp[i][0] = i;
    int t = log2(n);
    for (re j = 1; j <= t; j++)
        for (re i = 1; i + (1 << j) - 1 <= n; i++)
        {
            int a = dp[i][j - 1], b = dp[i + (1 << (j - 1))][j - 1];
            dp[i][j] = dep[a] < dep[b] ? a : b;
        }
}
int RMQ(int l, int r)
{
    int t = log2(r - l + 1);
    int a = dp[l][t], b = dp[r - (1 << t) + 1][t];
    return dep[a] < dep[b] ? a : b;
}
int LCA(int u, int v)
{
    int a = fir[u], b = fir[v];
    if (a > b) swap(a, b);
    return nod[RMQ(a, b)];
}
```
