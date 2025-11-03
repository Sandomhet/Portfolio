---
title: "Disjoint Set Union / Union-Find"
description: "stores a partition of a set into disjoint subsets."
time: "Sun Nov 2, 2025"
---

# Disjoint Set Union / Union-Find 

Disjoint Set Union (DSU), also known as Union-Find, is a data structure that keeps track of a partition of a set into disjoint subsets.

## Optimizations

1. **Path Compression**: This optimization flattens the structure of the tree whenever `find` is called, making future queries faster.
2. **Union by Size/Rank**: This optimization ensures that the smaller tree is always added under the root of the larger tree during union operations, keeping the overall tree flat.

The time complexity with both optimizations is nearly constant, specifically $O(\alpha(n))$, where $\alpha$ is the inverse Ackermann function. It's $O(\log n)$ with only one optimization.

## Implementation

```cpp
struct DSU {
    vector<int> pa, sz;
    DSU(int n) : pa(n + 1), sz(n + 1, 1) { for (int i = 1; i <= n; i++) pa[i] = i; }
    // path compression
    inline int find(int x) { return x == pa[x] ? x : pa[x] = find(pa[x]); }
    // union by size
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false; // already in the same set
        if (sz[x] < sz[y]) swap(x, y);
        pa[y] = x, sz[x] += sz[y];
        return true;
    }
}; DSU dsu(n);
```

同时还要注意种类并查集和带权并查集
种类并查集要运用反集，相反的集合可以由 $i$ 与 $n+i$ 建立联系。
带权并查集需要在基础上多维护一些数据。
