---
title: "Discretization"
description: "transform continuous numbers to discrete numbers"
time: "Mon Feb 1, 2024"
---

# Discretization

```cpp
int ls[Z], len;
void discrete(int num[], int nm) {
    for (int i = 1; i <= nm; i++)    ls[i] = num[i];//转移临时数组
    sort(ls + 1, ls + 1 + nm);//排序
    len = unique(ls + 1, ls + 1 + nm) - ls - 1;//去重
    for (int i = 1; i <= nm; i++)//离散
        num[i] = lower_bound(ls + 1, ls + 1 + len, num[i]) - ls;
}
```
