---
title: "Disjoint-set/Union-find Forest"
description: "stores a partition of a set into disjoint subsets."
time: "Mon Feb 1, 2024"
---

# Disjoint-set/Union-find Forest

这里是最基础的并查集操作

```cpp
inline void init(int n)//初始化
{
    for (int i = 1; i <= n; ++i) fa[i] = i;
}
inline int find(int x)//寻找父亲节点+路径压缩
{
    return x == fa[x] ? x : fa[x] = find(fa[x]);
}
inline void un(int x, int y)//合并集合
{
    x = find(x), y = find(y);
    if (x == y) return;
    fa[y] = x, sz[x] += sz[y];
}
```

同时还要注意种类并查集和带权并查集
种类并查集要运用反集，相反的集合可以由 $i$ 与 $n+i$ 建立联系。
带权并查集需要在基础上多维护一些数据。
