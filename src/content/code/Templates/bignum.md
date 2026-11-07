---
title: "Arbitrary-Precision Arithmetic (Bignum)"
description: "Calculations are not limited to digits of the maximum of languages and computers"
time: "Mon Feb 1, 2024"
---

# Arbitrary-Precision Arithmetic (Bignum)

## Table of Contents

Minimal version: a number is a `vector<int>` of decimal digits, lowest digit first, with no leading zeros (zero is `{0}`). For heavy use see the `sandom_int` struct in the Encapsulation note.

## 输入输出

```cpp
using Big = vector<int>;
void trim(Big &a) { while (a.size() > 1 && !a.back()) a.pop_back(); }
Big to_big(const string &s) { Big a(s.rbegin(), s.rend()); for (int &x : a) x -= '0'; trim(a); return a; } //读入数据
string to_str(const Big &a) { string s; for (int i = a.size() - 1; i >= 0; i--) s += char('0' + a[i]); return s; } //输出结果
bool less_big(const Big &a, const Big &b) { //比较大小 a < b
    if (a.size() != b.size()) return a.size() < b.size();
    for (int i = a.size() - 1; i >= 0; i--) if (a[i] != b[i]) return a[i] < b[i];
    return false;
}
```

## 高精加

```cpp
Big add(const Big &a, const Big &b) {
    Big c(max(a.size(), b.size()) + 1, 0);
    for (size_t i = 0; i + 1 < c.size(); i++) {
        c[i] += (i < a.size() ? a[i] : 0) + (i < b.size() ? b[i] : 0);
        if (c[i] >= 10) c[i] -= 10, c[i + 1]++;
    }
    trim(c); return c;
}
```

## 高精减

```cpp
Big sub(Big a, const Big &b) { // a >= b
    for (size_t i = 0; i < a.size(); i++) {
        a[i] -= i < b.size() ? b[i] : 0;
        if (a[i] < 0) a[i] += 10, a[i + 1]--;
    }
    trim(a); return a;
}
```

## 高精乘

```cpp
Big mul(const Big &a, const Big &b) {
    vector<ll> c(a.size() + b.size(), 0);
    for (size_t i = 0; i < a.size(); i++)
        for (size_t j = 0; j < b.size(); j++) c[i + j] += a[i] * b[j];
    Big res(c.size());
    ll carry = 0;
    for (size_t i = 0; i < c.size(); i++) carry += c[i], res[i] = carry % 10, carry /= 10;
    trim(res); return res;
}
```

## 高精除

```cpp
Big div_small(const Big &a, ll b, ll &r) { // a / b, r = a % b, 0 < b <= 1e17
    Big q(a.size()); r = 0;
    for (int i = a.size() - 1; i >= 0; i--) r = r * 10 + a[i], q[i] = r / b, r %= b;
    trim(q); return q;
}
Big div_big(const Big &a, const Big &b, Big &r) { // a / b, r = a % b, b > 0
    Big q(a.size()); r = {0};
    for (int i = a.size() - 1; i >= 0; i--) {
        r.insert(r.begin(), a[i]), trim(r); // r = r * 10 + a[i]
        while (!less_big(r, b)) r = sub(r, b), q[i]++;
    }
    trim(q); return q;
}
```

Usage:

```cpp
string s, t; cin >> s >> t;
Big a = to_big(s), b = to_big(t), r;
cout << to_str(add(a, b)) << '\n' << to_str(mul(a, b)) << '\n';
if (!less_big(a, b)) cout << to_str(sub(a, b)) << '\n';
cout << to_str(div_big(a, b, r)) << ' ' << to_str(r) << '\n';
```
