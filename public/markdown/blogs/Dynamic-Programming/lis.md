---
title: "Longest Increasing Subsequence (LIS)"
description: ""
time: "Mon Mar 30, 2026"
---

# Longest Increasing Subsequence (LIS)

Given an array of integers, find the length of the longest subsequence that is strictly increasing.

Definition:  
$f_i$ is the length of the longest increasing subsequence that ends with $a_i$.
$$f_i = \max_{1 \leq j < i,\ a_j < a_i} (f_j + 1)$$
$$ans = \max_{1 \leq i \leq n} f_i$$

## Naive Approach

$O(n^2)$

```cpp
int LIS(vector<int> a) {
    int n = a.size();
    a.insert(a.begin(), 0);
    vector<int> f(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        f[i] = 1;
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i]) {
                f[i] = max(f[i], f[j] + 1);
            }
        }
    }
    return *max_element(f.begin(), f.end());
}
```

Get the actual longest increasing subsequence:
```cpp
vector<int> getLIS(vector<int> a) {
    int n = a.size();
    a.insert(a.begin(), 0);
    vector<int> f(n + 1, 0), pre(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        f[i] = 1;
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i] && f[j] + 1 > f[i]) {
                f[i] = f[j] + 1;
                pre[i] = j;
            }
        }
    }
    int ans = 0, idx = 0;
    for (int i = 1; i <= n; i++) {
        if (f[i] > ans) {
            ans = f[i];
            idx = i;
        }
    }
    vector<int> res;
    while (idx > 0) {
        res.push_back(a[idx]);
        idx = pre[idx];
    }
    reverse(res.begin(), res.end());
    return res;
}
```

## Optimized Approach

$O(n \log n)$

```cpp
int LIS(vector<int> a) {
    int n = a.size();
    a.insert(a.begin(), 0);
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
    return ans;
}
```
