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

Uses the `BIT` struct from the Binary Indexed Tree note.

```cpp
ll cantor(int n, const vector<int> &a) { // a[1..n] is a permutation of 1..n; rank mod `mod`, starting from 1
    vector<ll> fac(n + 1, 1);
    for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i % mod; //预处理阶乘
    BIT bit(n);
    for (int i = 1; i <= n; i++) bit.add(i, 1); //先把所有的数插进去
    ll ans = 1; //自己也算一个
    for (int i = 1; i <= n; i++) {
        bit.add(a[i], -1); //树状数组中剩下的都是i的后缀
        ans = (ans + bit.sum(a[i] - 1) % mod * fac[n - i]) % mod;
    }
    return ans;
}
vector<int> inv_cantor(int n, ll k) { // the permutation with rank k (1-based), exact for n <= 20
    vector<ll> fac(n + 1, 1);
    for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i;
    vector<int> rest(n), a(n + 1);
    iota(rest.begin(), rest.end(), 1);
    k--;
    for (int i = 1; i <= n; i++) {
        int j = k / fac[n - i]; k %= fac[n - i];
        a[i] = rest[j], rest.erase(rest.begin() + j);
    }
    return a;
}
```

Usage:

```cpp
vector<int> a = {0, 2, 1, 3}; // 1-indexed
cantor(3, a);      // 3: 123, 132, 213
inv_cantor(3, 3);  // {0, 2, 1, 3}
```