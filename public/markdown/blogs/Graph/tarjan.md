---
title: "Tarjan's Algorithm"
description: "strongly connected components"
time: "Mon Feb 1, 2024"
---

# Tarjan's Algorithm

$dfn[rt]$：节点 $rt$ 的时间戳；$low[rt]$：$rt$ 及其子树中能回溯到的最早节点。

有向图中，

强连通分量：在此连通子图中，各点之间都能相互到达，任意两点之间都有边直接或间接相连。

意味着该集合可以缩小为一个点，不会影响全局，减小复杂度。

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top;
int be[Z], num;
vector <int> scc[Z];
bool vs[Z];
void tarjan(int rt)
{
    dfn[rt] = low[rt] = ++tim;//初始化：dfs序和low回溯数组
    dfs[++top] = rt; vs[rt] = 1;//标记已进栈
    for (int i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        if (!dfn[son])//还没有被访问过，直接访问
        {
            tarjan(son);
            low[rt] = min(low[rt], low[son]);
        }
        else if (vs[son]) low[rt] = min(low[rt], dfn[son]);//已经被访问过且还在栈里
    }
    if (dfn[rt] == low[rt])//构成了强连通分量，其之后节点不能返回到rt之前
    {
        int j; num++;
        do
        {
            j = dfs[top--]; vs[j] = 0;//标记出栈
            be[j] = num;//所属强连通分量
            scc[num].push_back(j);//该强连通分量集合
        } while (j != rt);
    }
}
void shrink()//缩点
{
    for (int i = 1; i <= cnt; i++)//枚举原有边，把各强连通分量建立联系
    {
        int u = be[e[i].u], v = be[e[i].v];
        if (u != v) ADD(u, v);
    }
}
```

无向图中，

1.割点：若删掉某点后，原连通图分裂为多个子图，则称该点为割点。

2.割边(桥)：删掉它之后，图必然会分裂为两个或两个以上的子图。

3.双连通分量：任意两点之间能通过两条及以上没有任何重复边的路到达。

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top, num;
vector <int> vdcc[Z];
bool cut[Z];
void tarjan(int rt, int fa)//割点
{
    dfn[rt] = low[rt] = ++tim;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] >= dfn[rt]) cut[rt] = 1;//son不与rt以上的点联通，则想要从之前的点到达son，必须要经过rt
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (!fa && !e[head[rt]].ne) cut[rt] = 0;//如果是起点，则至少要有两棵子树才是割点
}
void tarjan(int rt, int fa)//点双连通分量
{
    dfn[rt] = low[rt] = ++tim;
    dfs[++top] = rt;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] >= dfn[rt])
            {
                int j; cut[rt] = 1;//rt是割点
                vdcc[++num].push_back(rt);//rt不能直接出栈，可能属于多个点双
                do
                {
                    j = dfs[top--];
                    vdcc[num].push_back(j);
                } while (j != son);
            }
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (!fa && !e[head[rt]].ne) cut[rt] = 0;
    if (!fa && !head[rt]) vdcc[++num].push_back(rt);//孤立单点
}
```

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top, num;
vector <int> edcc[Z];
bool cut[Z];
void tarjan(int rt, int fa)//割边
{
    dfn[rt] = low[rt] = ++tim;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] > dfn[rt]) cut[i] = cut[i ^ 1] = 1;//son不与rt及以上的点联通，则除了rt——son这条边之外，没有其他边可以联通rt、son
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
}
void tarjan(int rt, int fa)//边双连通分量
{
    dfn[rt] = low[rt] = ++tim;
    dfs[++top] = rt;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] > dfn[rt]) cut[i] = cut[i ^ 1] = 1;//割边
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (low[rt] == dfn[rt])
    {
        int j; num++;
        do
        {
            j = dfs[top--];
            edcc[num].push_back(j);
        } while (j != rt);
    }
}
```
