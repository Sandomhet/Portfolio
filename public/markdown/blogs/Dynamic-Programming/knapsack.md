
# Knapsack DP

## 0-1 Knapsack

$O(nW)$

```cpp
for (int i = 1; i <= n; i++)
  for (int j = W; j >= w[i]; j--)
    f[j] = max(f[j], f[j - w[i]] + v[i]);
```

## Complete Knapsack

$O(nW)$

```cpp
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= W; j++)
        f[j] = max(f[j], f[j - w[i]] + v[i]);
```

## Multiple Knapsack

$O(nWm)$

```cpp
for (int i = 1; i <= n; i++)
    for (int j = W; j >= w[i]; j--)
        for (int k = 1; k * w[i] <= j && k <= cnt[i]; k++)
            f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
```

$O(nW \log m)$

```cpp
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