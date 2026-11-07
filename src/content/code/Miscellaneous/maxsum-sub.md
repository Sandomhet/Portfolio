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
template<class T> ll max_sum(int n, const T &a) { // a[1..n], non-empty subarray
    ll ans = a[1], cur = 0;
    // ll ans = 0; //允许空子段，答案至少为0
    for (int i = 1; i <= n; i++) {
        cur = cur > 0 ? cur + a[i] : a[i]; //可以累加 / 舍弃前一段和为负数的部分
        ans = max(ans, cur); //更新答案
    }
    return ans;
}
```

3.利用前缀和拆分子段O(n)

对于每一个子段和∑[aj,ai]可以用前缀和表示为s[i]-s[j-1]，要使结果更大，则为s[i]-min{s[j]}，j∈[0，i)。枚举i即可。

```cpp
template<class T> ll max_sum_prefix(int n, const T &a) { // a[1..n], non-empty subarray
    ll s = 0, mn = 0, ans = LLONG_MIN; // s: 前缀和, mn: 最小前缀 (s[0] = 0)
    for (int i = 1; i <= n; i++) {
        s += a[i];
        ans = max(ans, s - mn); //更新答案
        mn = min(mn, s);
    }
    return ans;
}
```
