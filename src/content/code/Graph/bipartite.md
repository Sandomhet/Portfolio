---
title: "Bipartite Graph"
description: "a graph whose vertices can be divided into two disjoint and independent sets"
time: "Mon Feb 1, 2024"
---

# Bipartite Graph

## Bipartite Check

A graph is bipartite iff it has no odd cycle. Color with DFS using 2 colors; an edge between two vertices of the same color means it is not bipartite. $O(n + m)$

二分图的判定（染色法）

```cpp
bool bipartite(int n, const vector<vector<int>> &e, vector<int> &col) { // col[u] in {1, 2}
    col.assign(n + 1, 0);
    for (int s = 1; s <= n; s++) if (!col[s]) {
        queue<int> q; q.push(s), col[s] = 1;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : e[u]) {
                if (!col[v]) col[v] = 3 - col[u], q.push(v);
                else if (col[v] == col[u]) return false; //一条边相连的两个节点属于同一个二分集合
            }
        }
    }
    return true;
}
```

## Matching, Cover, Independent Set

匹配：任意两条边都没有公共顶点。

点覆盖：图中任意一条边都有至少一个端点属于该集合。

独立集：任意两点之间都没有边相连。

团：任意两点之间都有一条边相连。

由某些定理得：二分图的最小点覆盖的点数 = 最大匹配的边数；

二分图的最大独立集的大小 = $n$ - 最小点覆盖数（最大匹配数）。

## Maximum Matching (Hungarian Algorithm)

An augmenting path alternates unmatched and matched edges and starts and ends at unmatched vertices; flipping it adds one matching edge. A matching is maximum iff no augmenting path exists. Try to augment from each left vertex: $O(nm)$.

匈牙利算法（增广路）：求二分图的最大匹配，当且仅当图中不存在增广路。

Left vertices $1..n_l$, right vertices $1..n_r$ (numbered separately). `vis` uses a timestamp so it is not cleared for every left vertex.

```cpp
struct Hungarian {
    int nl, nr, stamp = 0; vector<vector<int>> e; vector<int> match, vis; // match[v]: left partner of right v
    Hungarian(int nl, int nr) : nl(nl), nr(nr), e(nl + 1), match(nr + 1), vis(nr + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v); }
    bool dfs(int u) {
        for (int v : e[u]) if (vis[v] != stamp) {
            vis[v] = stamp;
            if (!match[v] || dfs(match[v])) { match[v] = u; return true; } //目标点还未匹配 或 目标点能与原匹配点脱离
        }
        return false;
    }
    int run() {
        int res = 0;
        for (int u = 1; u <= nl; u++) stamp++, res += dfs(u);
        return res;
    }
};
```

### Hopcroft-Karp

BFS layers from all free left vertices, then DFS finds a maximal set of shortest augmenting paths. $O(E\sqrt V)$, use it when $n, m \approx 10^5$.

```cpp
struct HopcroftKarp {
    int nl, nr; vector<vector<int>> e; vector<int> ml, mr, dis; // ml[u]: right partner of u, mr[v]: left partner of v
    HopcroftKarp(int nl, int nr) : nl(nl), nr(nr), e(nl + 1), ml(nl + 1), mr(nr + 1), dis(nl + 1) {}
    void add_edge(int u, int v) { e[u].push_back(v); }
    bool bfs() {
        queue<int> q; bool found = false;
        for (int u = 1; u <= nl; u++) if (!ml[u]) dis[u] = 0, q.push(u); else dis[u] = -1;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : e[u]) {
                int w = mr[v];
                if (!w) found = true;
                else if (dis[w] < 0) dis[w] = dis[u] + 1, q.push(w);
            }
        }
        return found;
    }
    bool dfs(int u) {
        for (int v : e[u]) {
            int w = mr[v];
            if (!w || (dis[w] == dis[u] + 1 && dfs(w))) { ml[u] = v, mr[v] = u; return true; }
        }
        dis[u] = -1;
        return false;
    }
    int run() {
        int res = 0;
        while (bfs())
            for (int u = 1; u <= nl; u++) if (!ml[u] && dfs(u)) res++;
        return res;
    }
};
```

Usage (both have the same interface):

```cpp
HopcroftKarp hk(nl, nr);
hk.add_edge(u, v);   // left u - right v
int size = hk.run(); // maximum matching
hk.ml[u], hk.mr[v];  // partners, 0 = unmatched (Hungarian: match[v])
```

### Weighted Matching (Assignment Problem)

带权匹配 ($KM$): an $n \times m$ cost matrix with $n \le m$, assign each row a distinct column with minimum total cost. Potentials $u, v$ keep $a_{ij} - u_i - v_j \ge 0$; each row is added by a Dijkstra-like search over columns. $O(n^2 m)$.

```cpp
ll assignment(int n, int m, const vector<vector<ll>> &a, vector<int> &row) { // a[1..n][1..m], n <= m; row[i] = column of row i
    const ll INF = LLONG_MAX / 4;
    vector<ll> u(n + 1), v(m + 1), minv(m + 1);
    vector<int> p(m + 1), way(m + 1); vector<bool> used(m + 1); // p[j]: row matched to column j
    for (int i = 1; i <= n; i++) {
        p[0] = i;
        int j0 = 0;
        fill(minv.begin(), minv.end(), INF), fill(used.begin(), used.end(), false);
        do {
            used[j0] = true;
            int i0 = p[j0], j1 = 0; ll delta = INF;
            for (int j = 1; j <= m; j++) if (!used[j]) {
                ll cur = a[i0][j] - u[i0] - v[j];
                if (cur < minv[j]) minv[j] = cur, way[j] = j0;
                if (minv[j] < delta) delta = minv[j], j1 = j;
            }
            for (int j = 0; j <= m; j++)
                if (used[j]) u[p[j]] += delta, v[j] -= delta;
                else minv[j] -= delta;
            j0 = j1;
        } while (p[j0]);
        do { int j1 = way[j0]; p[j0] = p[j1], j0 = j1; } while (j0);
    }
    row.assign(n + 1, 0);
    for (int j = 1; j <= m; j++) if (p[j]) row[p[j]] = j;
    return -v[0]; // minimum total cost
}
```

Usage:

```cpp
vector<int> row;
ll cost = assignment(n, m, a, row);   // min cost
// max weight: pass -a and negate the result; missing pairs: a large cost
```


多重匹配：拆点，类似于背包问题。
