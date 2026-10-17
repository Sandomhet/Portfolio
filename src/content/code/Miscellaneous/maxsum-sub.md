---
title: "Maximum Sum Subarray"
description: "a contiguous subarray with the largest sum"
time: "Mon Feb 1, 2024"
---

# Maximum Sum Subarray

a[]为全体实数集

1.O(n^2)枚举

2.利用单调性和贪心O(n)

首先我们累加a[i]，直到sum出现了负数，这时候不管后面的数如何，舍弃前面这一段一定比保留更优，因为舍弃后sum=0。

```cpp
int max_sum() {
    int ans = a[1], tmp = 0;//子段非空，全为负数时答案为最大的数
    // int ans = 0, tmp = 0;//原版：允许空子段，答案至少为0
    for (int i = 1; i <= n; i++) {
        if (tmp > 0) tmp += a[i];//可以累加
        else tmp = a[i];//舍弃前一段和为负数的部分
        if (tmp > ans) ans = tmp;//更新答案
    }
    return ans;
}
```

3.利用前缀和拆分子段O(n)

对于每一个子段和∑[aj,ai]可以用前缀和表示为s[i]-s[j-1]，要使结果更大，则为s[i]-min{s[j]}，j∈[0，i)。枚举i即可。

```cpp
int max_sum() {
    int ans = a[1];//子段非空；s[0] = mn[0] = 0
    // int ans = 0;//原版：允许空子段，答案至少为0
    for (int i = 1; i <= n; i++) {
        s[i] = s[i - 1] + a[i];//前缀和
        mn[i] = min(mn[i - 1], s[i]);//最小前缀
        ans = max(ans, s[i] - mn[i - 1]);//更新答案
    }
    return ans;
}
```
