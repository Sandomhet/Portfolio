# Longest Increasing Subsequence (LIS)

## Naive Approach

$O(n^2)$

```cpp
for (int i = 1; i <= n; i++) {
    f[i] = 1;
    for (int j = 1; j < i; j++) {
        if (a[j] < a[i]) {
            f[i] = max(f[i], f[j] + 1);
        }
    }
}
```

## Optimized Approach

$O(n \log n)$

```cpp
vector<int> d(n + 1, INF);
for (int i = 1; i <= n; i++) {
    int j = upper_bound(d.begin(), d.end(), a[i]) - d.begin();
    if (d[j - 1] < a[i] && a[i] < d[j]) {
        d[j] = a[i];
    }
}
int ans = 0;
for (int l = 0; l <= n; l++) {
    if (d[l] < INF)
        ans = l;
}
```
