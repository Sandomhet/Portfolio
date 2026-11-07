---
title: "Discretization"
description: "transform continuous numbers to discrete numbers"
time: "Mon Feb 1, 2024"
---

# Discretization

Replace each value by its rank among the distinct values: sort, `unique`, then `lower_bound`. Order is preserved and values become $1..len$. $O(n \log n)$

```cpp
template<class T> vector<T> discrete(int n, T *a) { // a[1..n] becomes ranks 1..len; returns the sorted distinct values
    vector<T> ls(a + 1, a + n + 1); //转移临时数组
    sort(ls.begin(), ls.end()); //排序
    ls.erase(unique(ls.begin(), ls.end()), ls.end()); //去重
    for (int i = 1; i <= n; i++) a[i] = lower_bound(ls.begin(), ls.end(), a[i]) - ls.begin() + 1; //离散
    return ls;
}
```

Usage:

```cpp
auto vals = discrete(n, a);  // a: global array a[Z] (or v.data() for a vector)
int len = vals.size();       // a[i] in 1..len now, original value = vals[a[i] - 1]
```
