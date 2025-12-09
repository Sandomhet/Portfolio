---
title: "2-SAT"
description: "Satisfiability of boolean formulas with 2 literals per clause"
time: "Fri Oct 19, 2025"
---

# 2-SAT Algorithm

## Definition

$f = (c_{11} \lor c_{12}) \land (c_{21} \lor c_{22}) \land ... \land (c_{m1} \lor c_{m2})$ is a 2-CNF formula with $m$ clauses and $n$ variables, where each clause has exactly 2 literals.

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

Implementation of the algorithm:
```cpp
vector<vector<int>> e;
vector<bool> ans;
void build_implication_graph(int n, int m) {
    e.assign(2 * n + 1, {});
    for (int i = 1; i <= m; i++) {
        int a, b; // literals in clause (a or b)
        bool is_neg_a, is_neg_b;

        int ya = is_neg_a ? a + n : a; // node for a
        int yb = is_neg_b ? b + n : b; // node for b
        int na = is_neg_a ? a : a + n; // node for ¬a
        int nb = is_neg_b ? b : b + n; // node for ¬b
        e[na].push_back(yb); // ¬a -> b
        e[nb].push_back(ya); // ¬b -> a
    }
}
bool find_answer(int n) {
    kosaraju(); // find SCCs
    for (int i = 1; i <= n; i++) {
        if (sccid[i] == sccid[i + n]) // x and ¬x in same SCC
            return false; // unsatisfiable
    }
    ans.assign(n + 1, false);
    vector<int> comp_id(sccs.size());
    for (int i = 0; i < sccs.size(); i++)
        comp_id[i] = i;
    sort(comp_id.begin(), comp_id.end(), [](int a, int b) {
        return sccs[a][0] > sccs[b][0]; // decreasing order of first node
    });
    vector<bool> assigned(sccs.size(), false);
    for (int cid : comp_id) {
        for (int u : sccs[cid]) {
            int var = u <= n ? u : u - n;
            if (!assigned[sccid[u]]) {
                ans[var] = (u <= n); // assign true if u is x, false if u is ¬x
                assigned[sccid[u]] = true;
                assigned[sccid[u <= n ? u + n : u - n]] = true;
            }
        }
    }
    return true; // satisfiable
}
```