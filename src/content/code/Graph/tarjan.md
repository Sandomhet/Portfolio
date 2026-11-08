---
title: "Tarjan's Algorithm"
description: "strongly connected components"
time: "Mon Feb 1, 2024"
---

# Tarjan's Algorithm

## Strongly Connected Components (Directed)

$dfn[rt]$：节点 $rt$ 的时间戳；$low[rt]$：$rt$ 及其子树中能回溯到的最早节点。

有向图中，

强连通分量：在此连通子图中，各点之间都能相互到达，任意两点之间都有边直接或间接相连。

意味着该集合可以缩小为一个点，不会影响全局，减小复杂度。

$low_u = \min(dfn_u,\ low_v \text{ for tree edges } (u, v),\ dfn_v \text{ for } v \text{ still on the stack})$. $u$ is the root of an SCC iff $low_u = dfn_u$; pop the stack down to $u$. $O(n + m)$

```cpp
struct SCC {
    int n, tim = 0, cnt = 0; vector<vector<int>> e;
    vector<int> dfn, low, bel, stk; vector<bool> ins; //bel: 所属强连通分量
    vector<vector<int>> comps{{}};                     //该强连通分量集合, comps[1..cnt]
    SCC(int n) : n(n), e(n + 1), dfn(n + 1), low(n + 1), bel(n + 1), ins(n + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v); }
    void tarjan(int u) {
        dfn[u] = low[u] = ++tim; //初始化：dfs序和low回溯数组
        stk.push_back(u), ins[u] = 1; //标记已进栈
        for (int v : e[u]) {
            if (!dfn[v]) tarjan(v), low[u] = min(low[u], low[v]); //还没有被访问过，直接访问
            else if (ins[v]) low[u] = min(low[u], dfn[v]); //已经被访问过且还在栈里
        }
        if (dfn[u] == low[u]) { //构成了强连通分量，其之后节点不能返回到u之前
            comps.emplace_back(), cnt++;
            int x;
            do {
                x = stk.back(), stk.pop_back(), ins[x] = 0; //标记出栈
                bel[x] = cnt, comps.back().push_back(x);
            } while (x != u);
        }
    }
    void run() { for (int u = 1; u <= n; u++) if (!dfn[u]) tarjan(u); }
    vector<vector<int>> dag() { //缩点：components 1..cnt, may contain duplicate edges
        vector<vector<int>> g(cnt + 1);
        for (int u = 1; u <= n; u++)
            for (int v : e[u]) if (bel[u] != bel[v]) g[bel[u]].push_back(bel[v]);
        return g;
    }
};
```

Component ids come out in **reverse topological order**: if there is an edge from component $a$ to component $b \ne a$, then $a > b$. So `for (int c = cnt; c >= 1; c--)` walks the condensation DAG in topological order.

Usage:

```cpp
SCC s(n);
s.add_edge(u, v);
s.run();
s.cnt;          // number of SCCs
s.bel[u];       // SCC of u, 1..cnt
s.comps[c];     // vertices of SCC c
auto g = s.dag();
```

## Cut Vertices and Bridges (Undirected)

- Cut vertex: non-root $u$ with a DFS child $v$ such that $low_v \ge dfn_u$; the root needs at least $2$ DFS children.
- Bridge: tree edge $(u, v)$ with $low_v > dfn_u$.
- Skip the edge back to the parent by its index (`i == (fa ^ 1)`), so parallel edges are handled.

无向图中，

1.割点：若删掉某点后，原连通图分裂为多个子图，则称该点为割点。

2.割边(桥)：删掉它之后，图必然会分裂为两个或两个以上的子图。

3.双连通分量：任意两点之间能通过两条及以上没有任何重复边的路到达。

One DFS finds everything. Edges carry an id, so parallel edges and self-loops are handled.

```cpp
struct BCC {
    int n, m = 0, tim = 0; vector<vector<pii>> e; // e[u]: (v, edge id)
    vector<int> dfn, low, s1, s2, ebel;            // ebel[u]: E-DCC of u
    vector<bool> cut, bridge;                      // cut[u]: 割点, bridge[id]: 割边
    vector<vector<int>> vdcc{{}}, edcc{{}};        // 点双连通分量 / 边双连通分量, 1-indexed ([0] unused)
    BCC(int n) : n(n), e(n + 1), dfn(n + 1), low(n + 1), ebel(n + 1), cut(n + 1) {}
    int add_edge(int u, int v) { e[u].push_back({v, m}), e[v].push_back({u, m}); return m++; }
    void tarjan(int u, int pe) {
        dfn[u] = low[u] = ++tim;
        s1.push_back(u), s2.push_back(u);
        int kids = 0; //dfs树上的儿子数
        for (auto [v, id] : e[u]) {
            if (id == pe) continue; //同一条无向边
            if (!dfn[v]) {
                tarjan(v, id), kids++;
                low[u] = min(low[u], low[v]);
                if (low[v] >= dfn[u]) { //v不与u以上的点联通，想要从之前的点到达v，必须要经过u
                    if (pe != -1 || kids > 1) cut[u] = 1; //起点至少要有两棵子树才是割点
                    vdcc.push_back({u}); //u不能出栈，可能属于多个点双
                    int x;
                    do x = s1.back(), s1.pop_back(), vdcc.back().push_back(x); while (x != v);
                }
                if (low[v] > dfn[u]) bridge[id] = 1; //除了u——v这条边之外，没有其他边可以联通u、v
            } else low[u] = min(low[u], dfn[v]);
        }
        if (low[u] == dfn[u]) {
            edcc.emplace_back();
            int x;
            do x = s2.back(), s2.pop_back(), ebel[x] = edcc.size() - 1, edcc.back().push_back(x); while (x != u);
        }
    }
    void run() {
        bridge.assign(m, 0);
        for (int u = 1; u <= n; u++) if (!dfn[u]) {
            if (e[u].empty()) vdcc.push_back({u}); //孤立单点
            tarjan(u, -1), s1.clear();
        }
    }
};
```

Usage:

```cpp
BCC b(n);
int id = b.add_edge(u, v);   // undirected
b.run();
b.cut[u];       // u is a cut vertex
b.bridge[id];   // edge id is a bridge
b.vdcc[i], b.edcc[i]; // i-th vertex / edge biconnected component, i from 1
b.ebel[u];      // E-DCC index of u (from 1); bridges connect different E-DCCs into a tree
```
