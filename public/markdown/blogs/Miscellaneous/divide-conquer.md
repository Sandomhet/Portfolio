---
title: "Divide-and-Conquer"
description: "recursively breaks down a problem into two or more sub-problems of the same or related type"
time: "Mon Feb 1, 2024"
---

# Divide-and-Conquer

## Table of Contents

## 快速排序

```cpp
void quick_sort(int s, int t)//快速排序
{
    int i, j, mid;
    i = s;  j = t;  mid = (s + t) >> 1;//中间值二分
    while (i <= j)//等号不能少
    {
        while (r[i] <= r[mid]) i++;//左半寻找比m大的
        while (r[j] >= r[mid]) j--;//右半寻找比m小的
        if (i <= j)//交换大小，使得m左边都小于m，右边都大于m
        {
            swap(r[i], r[j]);
            i++;    j--;
        }
    }
    if (i < t) quick_sort(i, t);//区间边界
    if (j > s) quick_sort(s, j);
}
```

## 归并排序

```cpp
void middle_sort(int s, int t)//归并排序
{
    int i, j, k, m;
    if (s == t)   return;//只有一个数字，不用排
    m = (s + t) >> 1;//中间值二分
    middle_sort(s, m);//左区间
    middle_sort(m + 1, t);//右区间
    i = k = s;  j = m + 1;
    while (i <= m && j <= t)//排序
    {
        if (a[i] <= a[j]) b[k++] = a[i++];
        else b[k++] = a[j++];
    }
    while (i <= m)    b[k++] = a[i++];//左剩余
    while (j <= t)    b[k++] = a[j++];//右剩余
    for (re u = s; u <= t; u++)  a[u] = b[u];//剩余转移
}
```

## 快速幂+取余运算

```cpp
int quick_pow(int a, int b, int c)//快速幂+取余运算
{
    //a底数，b指数，c取模数
    int ans = 1;
    a = a % c;//防止a过大
    while (b)//二分未到终止
    {
        if (b & 1)    ans = ans * a % c;//奇数补一项，"b&1"=="b%2";
        b >>= 1;//等价于b/=2;
        a = a * a % c;
    }
    return ans;
}
```

## 二分查找 (数组有序)

```cpp
void middle_search(int l, int r, int aim)//二分查找（数组有序）
{
    int ans = -1;
    while (l <= r)
    {
        int mid = (l + r) >> 1;
        if (dat[mid] > aim) r = mid - 1;
        else if (dat[mid] < aim)    l = mid + 1;
        else ans = mid;
    }
    return ans;
}
```
