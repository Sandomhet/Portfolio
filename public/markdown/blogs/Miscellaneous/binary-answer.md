---
title: "Binary / Ternary Search on Answer"
description: "Monotonicity Problem and Extreme Value Problem"
time: "Mon Feb 1, 2024"
---

# Binary / Ternary Search on Answer

当答案线性单调变化（也就是类一次函数），可以使用二分答案，取mid，若小于mid的满足，则大于mid的不满足或不更优，在题目中多表现为求：最大值最小，最小值最大。将求解转化为判定。

```cpp
int middle(int l, int r)//二分答案
{
int ans = 0;
while (l <= r)
{
int mid = (l + r) >> 1;
if (check(mid)) l = mid + 1, ans = mid;
else r = mid - 1;
}
return ans;
}
```

当答案为单极值函数（单峰函数或单谷函数，也就是类二次函数）。可以采用三分求函数极值。

```cpp
int two_middle(int l, int r)
{
while (l <= r)
{
int lmid = (2 * l + r) / 3, rmid = (l + 2 * r) / 3;
if (f(lmid) < f(rmid)) r = rmid;
else l = lmid;
}
return f(l);
}
```
