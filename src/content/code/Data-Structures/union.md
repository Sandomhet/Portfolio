---
title: "Disjoint Set Union / Union-Find"
description: "stores a partition of a set into disjoint subsets."
time: "Sun Nov 2, 2025"
---

# Disjoint Set Union / Union-Find 

Disjoint Set Union (DSU), also known as Union-Find, is a data structure that keeps track of a partition of a set into disjoint subsets.

## Definition

- $\pi(x)$: the representative of the set containing $x$.
- $rank(x)$: the maximum depth of the tree rooted at $x$. Starts at $0$ for single-node trees.

A node $x$ with $rank(x) = k$ has at least $2^k$ nodes in its subtree.

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
    bool same(int x, int y) { return find(x) == find(y); }
    int size(int x) { return sz[find(x)]; }
};
```

Usage:

```cpp
DSU dsu(n);        // after n is read
dsu.unite(x, y);   // false if x and y were already together
dsu.same(x, y);    // in the same set?
dsu.size(x);       // size of the set containing x

// 种类并查集 (enemies): x and x + n are opposite sides
DSU d(2 * n);
d.unite(x, y + n), d.unite(x + n, y);   // x and y are enemies
d.same(x, y + n);                        // are x and y known enemies?
d.same(x, x + n);                        // contradiction
```

## Weighted DSU

带权并查集: `d[x]` is $w_x - w_{pa_x}$, and after `find(x)` it becomes $w_x - w_{root}$. It stores differences between elements, such as "$w_y - w_x = v$", and detects contradictions.

```cpp
struct WDSU {
    vector<int> pa; vector<ll> d; // d[x] = w[x] - w[pa[x]]
    WDSU(int n) : pa(n + 1), d(n + 1) { for (int i = 1; i <= n; i++) pa[i] = i; }
    int find(int x) {
        if (x == pa[x]) return x;
        int r = find(pa[x]);
        d[x] += d[pa[x]];
        return pa[x] = r;
    }
    bool unite(int x, int y, ll v) { // w[y] - w[x] = v, false on contradiction
        int rx = find(x), ry = find(y);
        if (rx == ry) return d[y] - d[x] == v;
        pa[ry] = rx, d[ry] = d[x] + v - d[y];
        return true;
    }
    bool same(int x, int y) { return find(x) == find(y); }
    ll diff(int x, int y) { find(x), find(y); return d[y] - d[x]; } // w[y] - w[x], same set only
};
```

Usage:

```cpp
WDSU w(n);
w.unite(x, y, v);  // w[y] - w[x] = v, false if it contradicts earlier facts
if (w.same(x, y)) w.diff(x, y); // w[y] - w[x]

// parity (mod 2) version: store d[x] in {0, 1} and replace + / - with ^
```
