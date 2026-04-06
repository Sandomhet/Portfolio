---
title: "Knapsack DP"
description: ""
time: "Wed Apr 1, 2026"
---

# Knapsack DP

Setup:
- Input: $n$ items, each with weight $w_i$ and value $v_i$, and a knapsack with capacity $W$, $\sum v_i = V$.
- Output: The maximum total value of items that can be put in the knapsack without exceeding the capacity.

## 0-1 Knapsack (only one)

Steps:
1. Subproblem: $f_{i,j}$ be the maximum total value of items that can be put in a knapsack with capacity $j$ using the first $i$ items.
2. Recurrence relation:
$$
f_{i,j} = \begin{cases}
f_{i-1,j} & \text{if } j < w_i \\
\max\{f_{i-1,j}, f_{i-1,j-w_i} + v_i\} & \text{if } j \geq w_i
\end{cases}
$$
3. Answer: $f_{n,W}$.

Optimized recurrence relation:
$$f_j = \max\limits_{1 \leq i \leq n, j \geq w_i} \{f_{j - w_i} + v_i\}$$

$O(nW)$

```cpp
int Knapsack01(int n, int W, vector<int> w, vector<int> v) {
  vector<int> f(W + 1, 0);
  for (int i = 1; i <= n; i++)
      for (int j = W; j >= w[i]; j--)
        f[j] = max(f[j], f[j - w[i]] + v[i]);
    return f[W];
}
```

```cpp
int Knapsack01(int n, int W, vector<int> w, vector<int> v) {
    vector<vector<int>> f(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            if (j < w[i]) {
                f[i][j] = f[i - 1][j];
            } else {
                f[i][j] = max(f[i - 1][j], f[i - 1][j - w[i]] + v[i]);
            }
        }
    }
    return f[n][W];
}
```


## Complete Knapsack (infinite)

Steps:
1. Subproblem: $f_j$ be the maximum total value of items that can be put in a knapsack with capacity $j$.
2. Recurrence relation:
$$
\text{naive: } f_{i, j} = \max\limits_{k = 0}^{\infty} \{f_{i-1, j-k w_i} + k v_i\} \\
\text{flat: } f_{i, j} = \max\limits_{j \geq w_i} \{f_{i-1, j}, f_{i, j-w_i} + v_i\} \\
\text{optimized: } f_j = \max\limits_{1 \leq i \leq n, j \geq w_i} \{f_{j - w_i} + v_i\}
$$
3. Answer: $f_W$.

$O(nW)$

```cpp
int KnapsackComplete(int n, int W, vector<int> w, vector<int> v) {
    vector<int> f(W + 1, 0);
    for (int i = 1; i <= n; i++)
        for (int j = w[i]; j <= W; j++)
            f[j] = max(f[j], f[j - w[i]] + v[i]);
    return f[W];
}
```

## Multiple Knapsack

$O(nWm)$

```cpp
int KnapsackMultiple(int n, int W, vector<int> w, vector<int> v, vector<int> m) {
    vector<int> f(W + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {
            for (int k = 1; k <= m[i] && k * w[i] <= j; k++) {
                f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
            }
        }
    }
    return f[W];
}
```

$O(nW \log m)$

```cpp
int KnapsackMultiple(int n, int W, vector<int> w, vector<int> v, vector<int> m) {
    vector<int> f(W + 1, 0);
    for (int i = 1; i <= n; i++) {
        if (w[i] * m[i] >= W) {
            for (int j = w[i]; j <= W; j++)
                f[j] = max(f[j], f[j - w[i]] + v[i]);
        } else {
    int k = 1, cnt = m[i];
    while (k < cnt) {
      for (int j = W; j >= k * w[i]; j--)
        f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
      cnt -= k;
      k <<= 1;
    }
    for (int j = W; j >= cnt * w[i]; j--)
      f[j] = max(f[j], f[j - cnt * w[i]] + cnt * v[i]);
  }
}
```

## Variations

### Knapsack by value

Steps:
1. Subproblem: $f_{i,j}$ be the minimum total weight of items that can achieve total value $j$ using the first $i$ items.
2. Recurrence relation:
$$
f_{i,j} = \begin{cases}
0 & \text{if } j = 0 \\
\infty & \text{if } i = 0 \text{ and } j > 0 \\
f_{i-1,j} & \text{if } j < v_i \\
\min\{f_{i-1,j}, f_{i-1 ,j-v_i} + w_i\} & \text{if } j \geq v_i
\end{cases}
$$
3. Answer: $\max\{j \mid f_{n,j} \leq W\}$.

Optimized recurrence relation:
$$
f_j = \min\limits_{1 \leq i \leq n, j \geq v_i} \{f_{j - v_i} + w_i\}
$$

$O(nV)$

```cpp
int KnapsackByValue(int n, int W, vector<int> w, vector<int> v) {
    int V = accumulate(v.begin(), v.end(), 0);
    vector<int> f(V + 1, INT_MAX);
    f[0] = 0;
    for (int i = 1; i <= n; i++)
        for (int j = V; j >= v[i]; j--)
            f[j] = min(f[j], f[j - v[i]] + w[i]);

    for (int j = V; j >= 0; j--)
        if (f[j] <= W)
            return j;
    return 0;
}
```
