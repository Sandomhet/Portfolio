---
title: "Arbitrary-Precision Arithmetic (Bignum)"
description: "Calculations are not limited to digits of the maximum of languages and computers"
time: "Mon Feb 1, 2024"
---

# Arbitrary-Precision Arithmetic (Bignum)

## Table of Contents

## 高精加

```cpp
void jia(int a[], int b[], int c[])//高精加
{
    c[0] = max(a[0], b[0]) + 1;
    for (re i = 1; i &lt;= c[0]; i++)
    {
        c[i] += a[i] + b[i];
        if (c[i] &gt;= 10)
        {
            c[i] -= 10;
            c[i + 1]++;
        }
    }
    while (c[c[0]] == 0 &amp;&amp; c[0] &gt; 1)    c[0]--;
}
```

## 高精乘

```cpp
void cheng(int a[], int b[], int c[])//高精乘
{
    c[0] = a[0] + b[0];
    for (re i = 1; i &lt;= a[0]; i++)
    {
        for (re j = 1; j &lt;= b[0]; j++)
        {
            int t = i + j - 1;
            c[t] += a[i] * b[j];
            if (c[t] &gt;= 10)
            {
                c[t + 1] += c[t] / 10;
                c[t] %= 10;
            }
        }
    }
    while (c[c[0]] == 0 &amp;&amp; c[0] &gt; 1)    c[0]--;
}
```

## 高精减

```cpp
bool check(int a[], int b[])//比较大小（true：A大，false：B大）
{
    if (a[0] &gt; b[0])    return true;
    if (a[0] &lt; b[0])    return false;
    for (int i = a[0]; i &gt; 0; i--)
    {
        if (a[i] &gt; b[i])    return true;
        if (a[i] &lt; b[i])    return false;
    }
    return true;
}
void jian(int a[], int b[], int c[])//高精减
{
    c[0] = a[0];
    for (re i = 1; i &lt;= c[0]; i++)
    {
        if (a[i] &lt; b[i])
        {
            a[i + 1]--;
            a[i] += 10;
        }
        c[i] += a[i] - b[i];
    }
    while (c[c[0]] == 0 &amp;&amp; c[0] &gt; 1)    c[0]--;
}
```

## 高精除

```cpp
void zuhe(int b[], int t[], int n)//高精除高位对齐
{
    for (re i = 1; i &lt;= b[0]; i++)        t[i + n - 1] = b[i];
    t[0] = b[0] + n - 1;
}
void chu(int a[], int b[], int c[])//高精除
{
    int d[Z] = {};
    c[0] = a[0] - b[0] + 1;
    for (re i = c[0]; i &gt; 0; i--)
    {
        int t[Z] = {};
        zuhe(b, t, i);
        while (check(a, t))
        {
            c[i]++;
            jian(a, t, d);
            memset(a, 0, sizeof(a));
            memcpy(a, d, sizeof(d));
            memset(d, 0, sizeof(d));
        }
    }
    while (c[c[0]] == 0 &amp;&amp; c[0] &gt; 1)    c[0]--;
}
```

```cpp
void in(int a[])//读入数据
{
    string s;
    cin &gt;&gt; s;
    a[0] = s.length();
    for (re i = 0; i &lt; a[0]; i++)    a[a[0] - i] = s[i] - '0';
}
void out(int c[])//输出结果
{
    for (re i = c[0]; i &gt; 0; i--)   write(c[i]);
}
```
