---
title: "Bipartite Graph"
description: "a graph whose vertices can be divided into two disjoint and independent sets"
time: "Mon Feb 1, 2024"
---

# Bipartite Graph

二分图的判定（染色法）

```cpp
int col[Z];
bool dfs(int rt, int color) {
    col[rt] = color;
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!col[son] && !dfs(son, 3 - color)) return false;//子节点集合中有冲突
        if (col[son] == color) return false;//一条边相连的两个节点属于同一个二分集合
    }
    return true;
}
inline bool judge() {
    for (int i = 1; i <= n; ++i)
        if (!col[i] && !dfs(i, 1)) return false;
    return true;
}
```

匹配：任意两条边都没有公共顶点。

点覆盖：图中任意一条边都有至少一个端点属于该集合。

独立集：任意两点之间都没有边相连。

团：任意两点之间都有一条边相连。

由某些定理得：二分图的最小点覆盖的点数 = 最大匹配的边数；

二分图的最大独立集的大小 = $n$ - 最小点覆盖数（最大匹配数）。

匈牙利算法（增广路）：求二分图的最大匹配，当且仅当图中不存在增广路。

```cpp
bool vs[Z];
int match[Z];
bool dfs(int rt) {
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!vs[son]) {
            vs[son] = 1;
            if (!match[son] || dfs(match[son])) {
                match[son] = rt;//目标点还未匹配 或 目标点能与原匹配点脱离
                return true;
            }
        }
    }
    return false;
}
sandom main() {
    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        memset(vs, 0, sizeof(vs));
        if (dfs(i)) ++ans;
    }
    return 0;
}
```

多重匹配：拆点，类似于背包问题。

带权匹配：$KM$算法
