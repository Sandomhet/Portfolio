---
title: "Centroid Decomposition"
description: "点分治"
time: "Mon Feb 1, 2024"
---

# Centroid Decomposition

Centroid: the vertex whose largest remaining component after removal is smallest; every component then has at most $n/2$ vertices. Process all paths through the centroid, delete it, and recurse into each component: depth $O(\log n)$, total $O(n \log n)$ times the cost of `calc`. `run(calc)` finds the centroid, calls `calc(c)` to count the paths through `c` (vertices with `vis[v]` set are already removed), then recurses into each remaining component.

```cpp
struct Centroid {
    int n; vector<vector<pair<int, ll>>> e; vector<int> siz; vector<bool> vis;
    Centroid(int n) : n(n), e(n + 1), siz(n + 1), vis(n + 1) {}
    void add_edge(int u, int v, ll w = 1) { e[u].push_back({v, w}), e[v].push_back({u, w}); }
    int get_siz(int u, int fa) {
        siz[u] = 1;
        for (auto [v, w] : e[u]) if (v != fa && !vis[v]) siz[u] += get_siz(v, u);
        return siz[u];
    }
    int find(int u, int fa, int tot) { //求树的重心: walk into the child holding more than half
        for (auto [v, w] : e[u]) if (v != fa && !vis[v] && siz[v] * 2 > tot) return find(v, u, tot);
        return u;
    }
    void run(const function<void(int)> &calc, int u = 1) {
        int c = find(u, 0, get_siz(u, 0));
        vis[c] = 1;
        calc(c); //统计经过重心的路径，因题而异
        for (auto [v, w] : e[c]) if (!vis[v]) run(calc, v); //递归处理子树
    }
};
```

Usage:

```cpp
// for each query k[t] (1 <= k[t] <= K): is there a path of length exactly k[t]?
Centroid cd(n);
cd.add_edge(u, v, w);
vector<char> ok(m + 1), has(K + 1); // has: 桶记录 of distances from earlier subtrees
cd.run([&](int c) {
    vector<ll> used = {0}; has[0] = 1; //c--c的dis
    for (auto [v, w] : cd.e[c]) if (!cd.vis[v]) {
        vector<ll> cur; //当前子树中的dis
        auto dfs = [&](auto &self, int u, int fa, ll d) -> void {
            cur.push_back(d);
            for (auto [x, y] : cd.e[u]) if (x != fa && !cd.vis[x]) self(self, x, u, d + y);
        };
        dfs(dfs, v, c, w);
        for (ll d : cur) for (int t = 1; t <= m; t++)
            if (k[t] >= d && has[k[t] - d]) ok[t] = 1;
        for (ll d : cur) if (d <= K && !has[d]) has[d] = 1, used.push_back(d);
    }
    for (ll d : used) has[d] = 0; //只清空用过的位置（每次清空整个桶会超时）
});
```
