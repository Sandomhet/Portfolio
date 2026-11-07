---
title: "2-SAT"
description: "Satisfiability of boolean formulas with 2 literals per clause"
time: "Fri Oct 19, 2025"
---

# 2-SAT Algorithm

## Definition

$ f = (c_{11} \lor c_{12}) \land (c_{21} \lor c_{22}) \land ... \land (c_{m1} \lor c_{m2}) $ is a 2-CNF formula with $m$ clauses and $n$ variables, where each clause has exactly 2 literals.

A literal is either a variable $x_i$ or its negation $\neg x_i$.

## 2-SAT Algorithm

(Satisfiability of boolean formulas with 2 literals per clause)

CNF is AND of ORs.

Given a 2-CNF formula, construct an implication graph.  
Each variable $x_i$ has two nodes: $x_i$ and $\neg x_i$.  
For each clause $(a \lor b)$, add edges $\neg a \to b$ and $\neg b \to a$.  
The formula is satisfiable if and only if $\forall x, x$ and $\neg x$ are in different SCCs.  
Use Kosaraju's or Tarjan's algorithm to find SCCs. $O(V+E)$

k-SAT is NP-complete for $k \geq 3$, where input is in CNF with $k$ literals per clause.

### Construction

Variables are $1..n$ and a literal is "$x = v$" with $v \in \{0, 1\}$. Node `2x + v` is that literal and `2x + !v` its negation. Tarjan numbers SCCs in reverse topological order, so $x$ takes the value whose literal has the smaller SCC id (the one later in topological order).

```cpp
struct TwoSat {
    int n, tim = 0, cnt = 0; vector<vector<int>> e;
    vector<int> dfn, low, bel, stk; vector<bool> ins, val;
    TwoSat(int n) : n(n), e(2 * n + 2), dfn(2 * n + 2), low(2 * n + 2), bel(2 * n + 2), ins(2 * n + 2), val(n + 1) {}
    void add_clause(int x, bool a, int y, bool b) { // (x == a) or (y == b)
        e[2 * x + !a].push_back(2 * y + b); // not(x == a) -> (y == b)
        e[2 * y + !b].push_back(2 * x + a); // not(y == b) -> (x == a)
    }
    void imply(int x, bool a, int y, bool b) { add_clause(x, !a, y, b); } // (x == a) -> (y == b)
    void must(int x, bool a) { add_clause(x, a, x, a); }                  // x == a
    void tarjan(int u) {
        dfn[u] = low[u] = ++tim, stk.push_back(u), ins[u] = 1;
        for (int v : e[u]) {
            if (!dfn[v]) tarjan(v), low[u] = min(low[u], low[v]);
            else if (ins[v]) low[u] = min(low[u], dfn[v]);
        }
        if (dfn[u] == low[u]) {
            cnt++;
            int x;
            do x = stk.back(), stk.pop_back(), ins[x] = 0, bel[x] = cnt; while (x != u);
        }
    }
    bool solve() { // false if unsatisfiable, otherwise val[1..n] is a solution
        for (int u = 2; u <= 2 * n + 1; u++) if (!dfn[u]) tarjan(u);
        for (int x = 1; x <= n; x++) {
            if (bel[2 * x] == bel[2 * x + 1]) return false; // x and not x in the same SCC
            val[x] = bel[2 * x + 1] < bel[2 * x];
        }
        return true;
    }
};
```

Usage:

```cpp
TwoSat ts(n);
ts.add_clause(x, 1, y, 0); // x or not y
ts.imply(x, 1, y, 1);      // x -> y
ts.must(x, 0);             // x is false
if (ts.solve()) for (int i = 1; i <= n; i++) cout << ts.val[i] << ' ';
else cout << "IMPOSSIBLE";
```
