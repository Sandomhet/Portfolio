---
title: "Binary / Ternary Search on Answer"
description: "Monotonicity Problem and Extreme Value Problem"
time: "Mon Feb 1, 2024"
---

# Binary / Ternary Search on Answer

当答案线性单调变化（也就是类一次函数），可以使用二分答案，取mid，若小于mid的满足，则大于mid的不满足或不更优，在题目中多表现为求：最大值最小，最小值最大。将求解转化为判定。

```cpp
// check monotone: true ... true false ... false. Largest x in [l, r] with check(x), or l - 1 if none
template<class F> ll last_true(ll l, ll r, F check) { //二分答案
    ll ans = l - 1;
    while (l <= r) {
        ll mid = l + (r - l) / 2;
        if (check(mid)) ans = mid, l = mid + 1;
        else r = mid - 1;
    }
    return ans;
}
// check monotone: false ... false true ... true. Smallest x in [l, r] with check(x), or r + 1 if none
template<class F> ll first_true(ll l, ll r, F check) {
    ll ans = r + 1;
    while (l <= r) {
        ll mid = l + (r - l) / 2;
        if (check(mid)) ans = mid, r = mid - 1;
        else l = mid + 1;
    }
    return ans;
}
// real numbers: 100 halvings are enough for any double range
template<class F> double last_true_real(double l, double r, F check, int it = 100) {
    while (it--) {
        double mid = (l + r) / 2;
        if (check(mid)) l = mid; else r = mid;
    }
    return l;
}
```

Usage:

```cpp
ll x = last_true(0, (ll)1e18, [&](ll mid) { return cost(mid) <= budget; });  // 最大值最小 / 最小值最大
ll y = first_true(1, n, [&](ll mid) { return pre[mid] >= k; });
double r = last_true_real(0, 1e9, [&](double mid) { return feasible(mid); });
```

当答案为单极值函数（单峰函数或单谷函数，也就是类二次函数）。可以采用三分求函数极值。

```cpp
// f unimodal on integers (strictly decreasing then strictly increasing): returns an argmin in [l, r]
template<class F> ll ternary_min(ll l, ll r, F f) { //单谷函数求最小值（单峰函数传 -f）
    while (r - l > 2) { //区间太小时lmid、rmid可能与端点重合，不再缩小
        ll lmid = l + (r - l) / 3, rmid = r - (r - l) / 3;
        if (f(lmid) < f(rmid)) r = rmid;
        else l = lmid;
    }
    ll best = l;
    for (ll i = l + 1; i <= r; i++) if (f(i) < f(best)) best = i; //剩下不超过3个点直接枚举
    return best;
}
template<class F> double ternary_min_real(double l, double r, F f, int it = 200) {
    while (it--) {
        double lmid = l + (r - l) / 3, rmid = r - (r - l) / 3;
        if (f(lmid) < f(rmid)) r = rmid;
        else l = lmid;
    }
    return (l + r) / 2;
}
```

Usage:

```cpp
ll x = ternary_min(1, n, [&](ll i) { return calc(i); });         // f(x) is the minimum
double t = ternary_min_real(0, 1e4, [&](double v) { return g(v); });
```
