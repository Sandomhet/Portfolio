---
title: "Virtual/Auxiliary Trees"
description: "虚树"
time: "Mon Feb 1, 2024"
---

# Virtual/Auxiliary Trees

对一棵树多次选取某些点进行询问，我们称这些点为关键点，而其他点不影响答案，我们可以建立一棵虚树，只包含这些关键点以及连接他们的LCA。

Sort the key vertices by `dfn`; adding the LCA of every two neighbors in that order gives all the branching points. Sort again, and the parent of each vertex in the virtual tree is the LCA of it and its predecessor. $O(k \log k)$ per query plus the LCA cost. Uses the `HLD` struct (for `dfn` and `lca`).

```cpp
// returns the vertices of the virtual tree, root first; vt[u] gets the children of u
vector<int> build_virtual(HLD &h, vector<int> keys, vector<vector<int>> &vt) {
    auto cmp = [&](int a, int b) { return h.dfn[a] < h.dfn[b]; };
    sort(keys.begin(), keys.end(), cmp);
    vector<int> vs = keys;
    for (int i = 0; i + 1 < (int)keys.size(); i++) vs.push_back(h.lca(keys[i], keys[i + 1]));
    sort(vs.begin(), vs.end(), cmp);
    vs.erase(unique(vs.begin(), vs.end()), vs.end());
    for (int i = 1; i < (int)vs.size(); i++) vt[h.lca(vs[i - 1], vs[i])].push_back(vs[i]);
    return vs;
}
```

在遍历过程中，对已经操作完的点直接清空数据

Usage:

```cpp
// each query: k key vertices, output the sum of distances over all pairs of keys
HLD h(n); /* add edges */ h.build(1);
vector<vector<int>> vt(n + 1); vector<int> key(n + 1); vector<ll> sz(n + 1);
while (Q--) {
    vector<int> keys(k); // read keys
    for (int x : keys) key[x] = 1;
    auto vs = build_virtual(h, keys, vt);
    ll res = 0;
    for (int i = vs.size() - 1; i >= 0; i--) { // reverse dfn order: children before parents
        int u = vs[i]; sz[u] = key[u];
        for (int v : vt[u]) {
            sz[u] += sz[v];
            res += sz[v] * (k - sz[v]) * (h.dep[v] - h.dep[u]); //经过这条边的贡献
        }
    }
    cout << res << '\n';
    for (int u : vs) vt[u].clear(), key[u] = 0; //清空
}
```
