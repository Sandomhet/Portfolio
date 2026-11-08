---
title: "Discretization"
description: "transform continuous numbers to discrete numbers"
time: "Mon Feb 1, 2024"
---

# Discretization

Replace each value by its rank among the distinct values: sort, `unique`, then `lower_bound`. Order is preserved and values become $1..len$. $O(n \log n)$

```cpp
// a[1..n] (a.size() == n + 1) becomes ranks 1..len; returns vals[1..len], vals[r] = the original value of rank r
vector<ll> discrete(vector<ll> &a) {
    vector<ll> vals(a.begin() + 1, a.end()); //转移临时数组
    sort(vals.begin(), vals.end()); //排序
    vals.erase(unique(vals.begin(), vals.end()), vals.end()); //去重
    vals.insert(vals.begin(), 0); //vals[0] unused
    for (size_t i = 1; i < a.size(); i++) a[i] = lower_bound(vals.begin() + 1, vals.end(), a[i]) - vals.begin(); //离散
    return vals;
}
```

Usage:

```cpp
vector<ll> a(n + 1);         // a[1..n]
auto vals = discrete(a);
int len = vals.size() - 1;   // a[i] in 1..len now, original value = vals[a[i]]
```
