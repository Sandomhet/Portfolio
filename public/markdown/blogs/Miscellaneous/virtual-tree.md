---
title: "Virtual/Auxiliary Trees"
description: "虚树"
time: "Mon Feb 1, 2024"
---

# Virtual/Auxiliary Trees

对一棵树多次选取某些点进行询问，我们称这些点为关键点，而其他点不影响答案，我们可以建立一棵虚树，只包含这些关键点以及连接他们的LCA。

```cpp
inline bool cmp(int A, int B) { return dfn[A] < dfn[B]; }
int stk[Z], tp;
inline void un(int x, int y) { add(y, x, dep[x] - dep[y]); tp--; }
inline void insert(int x)
{
    if (!tp) { stk[++tp] = x; return; }
    int lca = LCA(stk[tp], x);
    while (tp >= 2 && dfn[stk[tp - 1]] >= dfn[lca]) un(stk[tp], stk[tp - 1]);
    if (lca != stk[tp]) un(stk[tp], lca), stk[++tp] = lca;
    stk[++tp] = x;
}
```

在遍历过程中，对已经操作完的点直接清空数据

```cpp
void dfs(int rt)
{
    sz[rt] = key[rt];
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        dfs(son);
        ans1 += sz[son] * (k - sz[son]) * e[i].w;//经过这条边的贡献
        sz[rt] += sz[son];//关键点个数
    }
    head[rt] = key[rt] = 0;//清空
}
sandom main()
{
    n = read();
    for (re i = 1; i < n; i++)
    {
        int u = read(), v = read();
        add(u, v, 1), add(v, u, 1);
    }
    search(1, 0);
    connect(1, 1);
    for (re i = 1; i <= n; i++) head[i] = 0;
    int Q = read();
    while (Q--)
    {
        cnt = tp = 0;
        k = read();
        for (re i = 1; i <= k; i++) a[i] = read(), key[a[i]] = 1;
        sort(a + 1, a + 1 + k, cmp);
        for (re i = 1; i <= k; i++) insert(a[i]);
        while (tp > 1) un(stk[tp], stk[tp - 1]);
        ans1 = 0;
        dfs(stk[tp]);
        write(ans1);
    }
    return 0;
}
```