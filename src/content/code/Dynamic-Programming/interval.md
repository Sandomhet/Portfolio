---
title: "Interval DP"
description: "DP for merging intervals with a cost function."
time: "Wed Jul 17, 2024"
---

# Interval DP

Setup:
- Input: $n$ items. Merging subintervals $[i, k]$ and $[k+1, j]$ incurs a cost of $cost(i, k, j)$.
- Output: The minimum total cost to merge all items into one item.

Steps:
1. Subproblem: $f_{i, j}$ be the minimum cost to merge items from $i$ to $j$.
2. Recurrence relation:
$$
f_{i, j} = \begin{cases}
0 & \text{if } i = j \\
\min\limits_{i \leq k < j} \{f_{i, k} + f_{k + 1, j} + cost(i, k, j)\} & \text{if } i < j
\end{cases}
$$
3. Answer: $f_{1, n}$.

$O(n^3)$

```cpp
int cost(int i, int k, int j) { return ...; }
int IntervalDP(int n) {
    vector<vector<int>> f(n + 1, vector<int>(n + 1, 0));
    for (int d = 2; d <= n; d++) {
        for (int i = 1; i <= n - d + 1; i++) {
            int j = i + d - 1;
            f[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + cost(i, k, j));
            }
        }
    }
    return f[1][n];
}
```
