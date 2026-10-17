---
title: "Basis of a Vector Space"
description: ""
time: "Mon Feb 1, 2024"
---

# Basis of a Vector Space

XOR linear basis: `p[i]` is $0$ or a number whose highest bit is $i$. Every XOR of a subset of the inserted numbers equals the XOR of a subset of the nonzero `p[i]`, and with $cnt$ nonzero `p[i]` there are exactly $2^{cnt}$ distinct values. Insert in $O(\log V)$. Values need 62 bits, so `int` is `long long` here.

```cpp
inline void insert(int x) { //插入构造线性基
    for (int i = 61; i >= 0; i--)
        if (x >> i) {
            if (p[i]) x ^= p[i];
            else { p[i] = x; return; }
        }
    flag = 1;//x被消成0，说明能异或出0
}
inline int getmax() { //最大异或和
    int ans = 0;
    for (int i = 61; i >= 0; i--)
        if ((ans ^ p[i]) > ans) ans ^= p[i];
    return ans;
}
inline int getmin() { //最小异或和
    if (flag) return 0;//异或和为0
    for (int i = 0; i <= 61; ++i)
        if (p[i]) return p[i];
    return 0;
}
inline void merge(int g[]) { //线性基合并
    for (int i = 0; i <= 61; ++i)
        if (g[i]) insert(g[i]);
}
```

```cpp
inline void rebuild() { //将线性基转为对角矩阵
    for (int i = 61; i >= 0; i--)//除最高位为1外，其他尽量通过异或变为0
        for (int j = i - 1; j >= 0; j--)
            if ((p[i] >> j) & 1) p[i] ^= p[j];
    for (int i = 0; i <= 61; i++)
        if (p[i]) r[cnt++] = p[i];//下标从零开始，从小到大（记录基底）
}
inline int query(int k, int cnt) { //查询第k小的非零异或和（若flag，即能异或出0，则第k小为query(k - 1)）
    int ans = 0;
    for (int i = 0; i < cnt; ++i)
        if ((k >> i) & 1) ans ^= r[i];
    return ans;
}
```

```cpp
inline void rebuild() { //将线性基转为对角矩阵
    for (int i = 61; i >= 0; i--)//除最高位为1外，其他尽量通过异或变为0
        for (int j = i - 1; j >= 0; j--)
            if ((p[i] >> j) & 1) p[i] ^= p[j];
    for (int i = 0; i <= 61; i++)
        if (p[i]) r[cnt++] = i;//下标从零开始，从小到大（记录位置）
}
inline int getrank(int q) { //查询一个异或和的排名
    int ans = 0;
    for (int i = 0; i < cnt; ++i)//这一位为1可以参与构造q
        if ((q >> r[i]) & 1) ans = ans + (1ll << i);//低位部分随便放
    return ans + 1;
}
```
