---
title: "Basis of a Vector Space"
description: ""
time: "Mon Feb 1, 2024"
---

# Basis of a Vector Space

```cpp
inline void insert(int x)//插入构造线性基
{
    for (int i = 61; i >= 0; i--)
        if (x >> i)
        {
            if (p[i]) x ^= p[i];
            else { p[i] = x; break; }
        }
}
inline int getmax()//最大异或和
{
    int ans = 0;
    for (int i = 61; i >= 0; i--)
        if ((ans ^ p[i]) > ans) ans ^= p[i];
    return ans;
}
inline int getmin()//最小异或和
{
    if (flag) return 0;//异或和为0
    for (int i = 0; i <= 61; ++i)
        if (a[i]) return a[i];
    return 0;
}
inline void merge(int g[])//线性基合并
{
    for (int i = 0; i <= 60; ++i)
        if (g[i]) insert(g[i]);
}
```

```cpp
inline void rebuild()//将线性基转为对角矩阵
{
    for (int i = 61; i >= 0; i--)//除最高位为1外，其他尽量通过异或变为0
        for (int j = i - 1; j >= 0; j--)
            if ((p[i] >> j) & 1) p[i] ^= p[j];
    for (int i = 61; i >= 0; i--)
        if (p[i]) r[cnt++] = p[i];//下标从零开始（记录基底）
}
inline int query(int k, int cnt)//查询第k小值
{
    int ans = 0;
    for (int i = 0; i < cnt; ++i)
        if ((k >> i) & 1) ans ^= r[i];
    return ans;
}
```

```cpp
inline void rebuild()//将线性基转为对角矩阵
{
    for (int i = 61; i >= 0; i--)//除最高位为1外，其他尽量通过异或变为0
        for (int j = i - 1; j >= 0; j--)
            if ((p[i] >> j) & 1) p[i] ^= p[j];
    for (int i = 61; i >= 0; i--)
        if (p[i]) r[cnt++] = i;//下标从零开始（记录位置）
}
inline int getrank(int q)//查询一个异或和的排名
{
    int ans = 0;
    for (int i = 0; i < cnt; ++i)//这一位为1可以参与构造q
        if ((q >> r[i]) & 1) ans = ans + (1 << i);//低位部分随便放
    return ans + 1;
}
```
