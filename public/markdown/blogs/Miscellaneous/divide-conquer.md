---
title: "Divide and Conquer"
description: "recursively breaks down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly."
time: "Mon Oct 20, 2025"
---

# Divide and Conquer

## Table of Contents

- [Quick Sort (快速排序)](#quick-sort-快速排序)
- [Merge Sort (归并排序)](#merge-sort-归并排序)
- [Binary Exponentiation (快速幂)](#binary-exponentiation-快速幂)
- [Binary Search (二分查找)](#binary-search-二分查找)

## Quick Sort (快速排序)

```cpp
int a[Z];
void quick_sort(int l, int r) {
    int i = l, j = r, mid = (l + r) >> 1;
    while (i <= j) { //等号不能少
        while (a[i] <= a[mid]) i++; //左半寻找比mid大的
        while (a[j] >= a[mid]) j--; //右半寻找比mid小的
        if (i <= j) swap(a[i++], a[j--]); //交换大小，使得mid左边都小于mid，右边都大于mid
    }
    if (i < r) quick_sort(i, r); //区间边界
    if (j > l) quick_sort(l, j);
}
```

## Merge Sort (归并排序)

```cpp
int a[Z], b[Z];
void merge_sort(int l, int r) {
    if (l >= r) return; //base case
    int mid = (l + r) >> 1;
    merge_sort(l, mid), merge_sort(mid + 1, r);
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) { //排序
        if (a[i] <= a[j]) b[k++] = a[i++];
        else b[k++] = a[j++];
    }
    while (i <= mid) b[k++] = a[i++]; //左剩余
    while (j <= r) b[k++] = a[j++]; //右剩余
    for (int u = l; u <= r; u++)  a[u] = b[u]; //剩余转移
}
```

## Binary Exponentiation (快速幂)

```cpp
//a底数，b指数，c取模数
int binpow(int a, int b, int c) {
    int res = 1;
    a = a % c; //防止a过大
    while (b) {
        if (b & 1) res = res * a % c; //奇数补一项
        a = a * a % c;
        b >>= 1;
    }
    return res;
}
```

## Binary Search (二分查找)

数组有序

```cpp
int binary_search(int l, int r, int aim) {
    int ans = -1;
    while (l <= r) {
        int mid = (l + r) >> 1;
        if (a[mid] > aim) r = mid - 1;
        else if (a[mid] < aim) l = mid + 1;
        else ans = mid;
    }
    return ans;
}
```
