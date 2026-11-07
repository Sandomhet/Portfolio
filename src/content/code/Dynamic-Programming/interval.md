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
template<class F> ll IntervalDP(int n, F cost) { // cost(i, k, j): merging [i, k] and [k + 1, j]
    vector<vector<ll>> f(n + 1, vector<ll>(n + 1, 0));
    for (int d = 2; d <= n; d++) {
        for (int i = 1; i + d - 1 <= n; i++) {
            int j = i + d - 1;
            f[i][j] = LLONG_MAX;
            for (int k = i; k < j; k++)
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + cost(i, k, j));
        }
    }
    return f[1][n];
}
```

Usage:

```cpp
// stone merging: cost = total weight of [i, j]
vector<ll> s(n + 1); for (int i = 1; i <= n; i++) s[i] = s[i - 1] + a[i];
IntervalDP(n, [&](int i, int k, int j) { return s[j] - s[i - 1]; });
// circular: duplicate the array (a[i + n] = a[i]), run on 2n, answer = min over i of f[i][i + n - 1]
```
