---
title: "Heavy-light Decomposition"
description: "effectively solve many problems that come down to queries on a tree"
time: "Mon Feb 1, 2024"
---

# Heavy-light Decomposition

重链剖分

```cpp
int dep[Z], siz[Z], dad[Z], kid[Z];//kid[rt]：rt的重儿子编号
int tim, dfn[Z], rnk[Z], top[Z];//rnk[rt]：dfs序为rt的节点编号; top[rt]：rt所在重链的顶部节点
void search(int rt, int fa)//寻找重边和重儿子
{
    dad[rt] = fa;
    dep[rt] = dep[fa] + 1, siz[rt] = 1;
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].to;
        if (son == fa) continue;
        search(son, rt);
        siz[rt] += siz[son];
        if (siz[son] > siz[kid[rt]]) kid[rt] = son;//更新重儿子
    }
}
void connect(int rt, int pa)//连接重边构成重链
{
    dfn[rt] = ++tim, rnk[tim] = rt;
    top[rt] = pa;
    if (kid[rt]) connect(kid[rt], pa);//优先递归重儿子
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].to;
        if (son == kid[rt] || son == dad[rt]) continue;
        connect(son, son);//新建立一条重链
    }
}
```

```cpp
void modify(int x, int y, int val)//对从x到y的简单路径上的点权值加val
{
    while (top[x] != top[y])//没在一条重链上
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        update(1, dfn[top[x]], dfn[x], val);
        x = dad[top[x]];//向上翻
    }
    if (dep[x] > dep[y]) swap(x, y);
    update(1, dfn[x], dfn[y], val);
}
int ask_sum(int x, int y)//查询从x到y的简单路径上的点权值之和
{
    int ans = 0;
    while (top[x] != top[y])//没在一条重链上
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        ans += query_sum(1, dfn[top[x]], dfn[x]);
        x = dad[top[x]];//向上翻
    }
    if (dep[x] > dep[y]) swap(x, y);
    ans += query_sum(1, dfn[x], dfn[y]);
    return ans;
}
int ask_max(int x, int y)
{
    int ans = -1e8;
    while (top[x] != top[y])
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        ans = max(ans, query_max(1, dfn[top[x]], dfn[x]));
        x = dad[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    ans = max(ans, query_max(1, dfn[x], dfn[y]));
    return ans;
}
int LCA(int x, int y)
{
    while (top[x] != top[y])
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        x = dad[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    return x;
}
int nxt_son(int x, int y)//求x -> y路径上x的第一个儿子
{
    if (dep[x] > dep[y]) swap(x, y);
    while (top[x] != top[y])
    {
        if (dad[top[x]] == y) return top[x];//不在一条重链上
        x = dad[top[x]];
    }
    return kid[y];//跳到了同一条重链上
}
sandom main()
{
    search(1, 0);
    connect(1, 1);
    build(1, 1, n);
    work();
    return 0;
}
```
