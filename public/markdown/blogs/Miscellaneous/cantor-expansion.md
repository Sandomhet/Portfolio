---
title: "Cantor Expansion"
description: ""
time: "Mon Feb 1, 2024"
---

# Cantor Expansion

康托展开可以用来求一个1~n的任意排列的排名（按照字典序）。
$rnk=1+\sum\limits_{i=1}^{n}A[i]*(n-i)!$---A[i]表示$\sum\limits_{j=i}^{n}[a[j] < a[i]]$

尝试构造出字典序比当前排列小的有几个排列，枚举i表示，[1, i-1]的排列一样，i的排列不一样，[i+1，n]
的随意排。所以重点只在于找到i位置上比a[i]小的数的个数。
也就是说我们需要用到i之后的小于i的数，树状数组就可以解决这个问题。

```cpp
int cantor(int a[], int n)
{
    fac[0] = 1;
    for (re i = 1; i <= n; i++)
    {
        fac[i] = fac[i - 1] * i % mod;//预处理阶乘
        update(a[i], 1);//先把所有的数插进去
    }
    int ans = 1;//自己也算一个
    for (re i = 1; i <= n; i++)
    {
        update(a[i], -1);//树状数组中剩下的都是i的后缀
        ans = (ans + ask(a[i] - 1) * fac[n - i] % mod) % mod;
    }
    return ans;
}
```