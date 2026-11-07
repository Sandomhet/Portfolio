---
title: "Longest Increasing Subsequence (LIS)"
description: ""
time: "Mon Mar 30, 2026"
---

# Longest Increasing Subsequence (LIS)

Given an array of integers, find the length of the longest subsequence that is strictly increasing.

Definition:  
$f_i$ is the length of the longest increasing subsequence that ends with $a_i$.

$$
f_i = \max\limits_{1 \leq j < i,\ a_j < a_i} (f_j + 1)
$$
$$ 
ans = \max\limits_{1 \leq i \leq n} f_i 
$$

## Naive Approach

$O(n^2)$

```cpp
int LIS_n2(const vector<ll> &a) { // a[0..n-1]
    int n = a.size(), ans = 0;
    vector<int> f(n, 1);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) f[i] = max(f[i], f[j] + 1);
        ans = max(ans, f[i]);
    }
    return ans;
}
```

Get the actual longest increasing subsequence:
```cpp
vector<ll> getLIS(const vector<ll> &a) { // one longest strictly increasing subsequence, O(n log n)
    int n = a.size();
    vector<ll> d; vector<int> id, pre(n, -1); // d[l]: smallest tail of length l + 1, id[l]: its index
    for (int i = 0; i < n; i++) {
        int l = lower_bound(d.begin(), d.end(), a[i]) - d.begin();
        if (l == (int)d.size()) d.push_back(a[i]), id.push_back(i);
        else d[l] = a[i], id[l] = i;
        pre[i] = l ? id[l - 1] : -1;
    }
    vector<ll> res;
    for (int i = id.empty() ? -1 : id.back(); i != -1; i = pre[i]) res.push_back(a[i]);
    reverse(res.begin(), res.end());
    return res;
}
```

## Optimized Approach

$O(n \log n)$

```cpp
int LIS(const vector<ll> &a, bool strict = true) { // non-decreasing when strict = false
    vector<ll> d; // d[l]: smallest tail of an increasing subsequence of length l + 1
    for (ll x : a) {
        auto it = strict ? lower_bound(d.begin(), d.end(), x) : upper_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x;
    }
    return d.size();
}
```
