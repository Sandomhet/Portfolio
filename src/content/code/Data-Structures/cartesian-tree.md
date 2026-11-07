---
title: "Cartesian Tree"
description: "It is uniquely defined as a min-heap whose symmetric (in-order) traversal returns the original sequence."
time: "Mon Feb 1, 2024"
---

# Cartesian Tree

A BST on the index and a (min-)heap on the value $p_i$. Built in $O(n)$ with a monotonic stack holding the right chain: pop every node larger than $p_i$; the last popped node becomes the left child of $i$, and $i$ becomes the right child of the new stack top. `cartesian` returns the root.

## Build

构建

```cpp
// 笛卡尔树: min-heap on a[1..n] (a.size() == n + 1); returns the root, lc/rc = children (0 = none)
template<class T> int cartesian(const vector<T> &a, vector<int> &lc, vector<int> &rc) {
    int n = a.size() - 1;
    lc.assign(n + 1, 0), rc.assign(n + 1, 0);
    vector<int> stk; //单调栈，保存右链
    for (int i = 1; i <= n; i++) {
        int last = 0;
        while (stk.size() && a[stk.back()] > a[i]) last = stk.back(), stk.pop_back();
        lc[i] = last; //把中间比自己大的点作为左儿子
        if (stk.size()) rc[stk.back()] = i; //接到右儿子上
        stk.push_back(i);
    }
    return stk[0];
}
```

Usage:

```cpp
vector<int> lc, rc;
int root = cartesian(a, lc, rc);  // vector a(n + 1), a[1..n]; equal values: the left one is the ancestor
// max-heap: change a[stk.back()] > a[i] to a[stk.back()] < a[i]
```
