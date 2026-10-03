---
title: "Cartesian Tree"
description: "It is uniquely defined as a min-heap whose symmetric (in-order) traversal returns the original sequence."
time: "Mon Feb 1, 2024"
---

# Cartesian Tree

A BST on the index and a (min-)heap on the value $p_i$. Built in $O(n)$ with a monotonic stack holding the right chain: pop every node larger than $p_i$; the last popped node becomes the left child of $i$, and $i$ becomes the right child of the new stack top. The root is `s[1]`.

## Build

构建

```cpp
//笛卡尔树
void build() {
    for (int i = 1, top = 0, pos = 0; i <= n; ++i) {
        top = pos;//pos为当前栈顶，top为操作前栈顶
        while (pos && p[s[pos]] > p[i]) pos--;//单调栈
        if (pos) r[s[pos]] = i;//找到一个比自己小的点，接到右儿子上
        if (pos < top) l[i] = s[pos + 1];//把中间比自己大的点作为左儿子
        s[++pos] = i;
    }
}
```
