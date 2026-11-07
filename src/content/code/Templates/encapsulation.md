---
title: "Encapsulation"
description: "Several encapsulation struct methods implemented"
time: "Mon Feb 1, 2024"
---

# Encapsulation

## Table of Contents

## 高精度

Non-negative big integers, base $10^9$ limbs stored little-endian in a `vector<ll>`. `+`, `-` (requires $a \ge b$), `*` are schoolbook; `/` and `%` by a big number use binary search per limb; by a small number ($\le 10^9$) they are linear.

```cpp
struct sandom_int {
    static const ll BASE = 1e9; static const int W = 9;
    vector<ll> d; // d[0] is the lowest limb, zero = {0}
    sandom_int(ll x = 0) { do d.push_back(x % BASE), x /= BASE; while (x); }
    sandom_int(const string &s) { //读入
        for (int i = s.size(); i > 0; i -= W) d.push_back(stoll(s.substr(max(0, i - W), i - max(0, i - W))));
        trim();
    }
    void trim() { while (d.size() > 1 && !d.back()) d.pop_back(); }
    string str() const { //输出
        string s = to_string(d.back());
        char buf[16];
        for (int i = (int)d.size() - 2; i >= 0; i--) snprintf(buf, sizeof buf, "%09lld", d[i]), s += buf;
        return s;
    }
    //比较大小
    friend bool operator<(const sandom_int &a, const sandom_int &b) {
        if (a.d.size() != b.d.size()) return a.d.size() < b.d.size();
        for (int i = (int)a.d.size() - 1; i >= 0; i--) if (a.d[i] != b.d[i]) return a.d[i] < b.d[i];
        return false;
    }
    friend bool operator>(const sandom_int &a, const sandom_int &b) { return b < a; }
    friend bool operator<=(const sandom_int &a, const sandom_int &b) { return !(b < a); }
    friend bool operator>=(const sandom_int &a, const sandom_int &b) { return !(a < b); }
    friend bool operator==(const sandom_int &a, const sandom_int &b) { return a.d == b.d; }
    friend bool operator!=(const sandom_int &a, const sandom_int &b) { return a.d != b.d; }
    //五则运算
    friend sandom_int operator+(const sandom_int &a, const sandom_int &b) {
        sandom_int c; c.d.assign(max(a.d.size(), b.d.size()) + 1, 0);
        for (size_t i = 0; i + 1 < c.d.size(); i++) {
            c.d[i] += (i < a.d.size() ? a.d[i] : 0) + (i < b.d.size() ? b.d[i] : 0);
            if (c.d[i] >= BASE) c.d[i] -= BASE, c.d[i + 1]++;
        }
        c.trim(); return c;
    }
    friend sandom_int operator-(const sandom_int &a, const sandom_int &b) { // a >= b
        sandom_int c = a;
        for (size_t i = 0; i < c.d.size(); i++) {
            c.d[i] -= i < b.d.size() ? b.d[i] : 0;
            if (c.d[i] < 0) c.d[i] += BASE, c.d[i + 1]--;
        }
        c.trim(); return c;
    }
    friend sandom_int operator*(const sandom_int &a, const sandom_int &b) {
        sandom_int c; c.d.assign(a.d.size() + b.d.size(), 0);
        for (size_t i = 0; i < a.d.size(); i++) {
            ll carry = 0;
            for (size_t j = 0; j < b.d.size() || carry; j++) {
                ll cur = c.d[i + j] + carry + (j < b.d.size() ? a.d[i] * b.d[j] : 0);
                c.d[i + j] = cur % BASE, carry = cur / BASE;
            }
        }
        c.trim(); return c;
    }
    friend sandom_int operator/(const sandom_int &a, ll b) { // 0 < b <= 1e9
        sandom_int c = a; ll r = 0;
        for (int i = (int)c.d.size() - 1; i >= 0; i--) {
            ll cur = c.d[i] + r * BASE;
            c.d[i] = cur / b, r = cur % b;
        }
        c.trim(); return c;
    }
    friend ll operator%(const sandom_int &a, ll b) { // 0 < b <= 1e9
        ll r = 0;
        for (int i = (int)a.d.size() - 1; i >= 0; i--) r = (a.d[i] + r * BASE) % b;
        return r;
    }
    friend sandom_int operator/(const sandom_int &a, const sandom_int &b) { // b > 0
        sandom_int q, r; q.d.assign(a.d.size(), 0);
        for (int i = (int)a.d.size() - 1; i >= 0; i--) {
            r.d.insert(r.d.begin(), a.d[i]), r.trim(); // r = r * BASE + a.d[i]
            ll lo = 0, hi = BASE - 1; // largest x with b * x <= r
            while (lo < hi) {
                ll mid = (lo + hi + 1) / 2;
                if (b * sandom_int(mid) <= r) lo = mid; else hi = mid - 1;
            }
            q.d[i] = lo, r = r - b * sandom_int(lo);
        }
        q.trim(); return q;
    }
    friend sandom_int operator%(const sandom_int &a, const sandom_int &b) { return a - a / b * b; }
    sandom_int &operator+=(const sandom_int &b) { return *this = *this + b; }
    sandom_int &operator-=(const sandom_int &b) { return *this = *this - b; }
    sandom_int &operator*=(const sandom_int &b) { return *this = *this * b; }
    sandom_int &operator/=(const sandom_int &b) { return *this = *this / b; }
    sandom_int &operator%=(const sandom_int &b) { return *this = *this % b; }
};
```

Usage:

```cpp
string s, t; cin >> s >> t;
sandom_int a(s), b(t), c = 12345;
cout << (a + b).str() << '\n' << (a * b).str() << '\n';
if (a >= b) cout << (a - b).str() << '\n';
cout << (a / b).str() << ' ' << (a % b).str() << '\n';
cout << (a / 7).str() << ' ' << a % 7 << '\n';
```

## 分数

```cpp
struct frac { // a / b with b > 0 and gcd(|a|, b) = 1; products must fit in ll
    ll a, b;
    frac(ll x = 0, ll y = 1) : a(x), b(y) { //约分，并保证分母为正（比较时要用）
        ll g = __gcd(llabs(a), llabs(b));
        if (b < 0) g = -g;
        if (g) a /= g, b /= g;
    }
    //比较
    friend bool operator<(const frac &x, const frac &y) { return (__int128)x.a * y.b < (__int128)y.a * x.b; }
    friend bool operator>(const frac &x, const frac &y) { return y < x; }
    friend bool operator<=(const frac &x, const frac &y) { return !(y < x); }
    friend bool operator>=(const frac &x, const frac &y) { return !(x < y); }
    friend bool operator==(const frac &x, const frac &y) { return x.a == y.a && x.b == y.b; }
    friend bool operator!=(const frac &x, const frac &y) { return !(x == y); }
    //四则运算
    friend frac operator+(const frac &x, const frac &y) { return frac(x.a * y.b + x.b * y.a, x.b * y.b); }
    friend frac operator-(const frac &x, const frac &y) { return frac(x.a * y.b - x.b * y.a, x.b * y.b); }
    friend frac operator*(const frac &x, const frac &y) { return frac(x.a * y.a, x.b * y.b); }
    friend frac operator/(const frac &x, const frac &y) { return frac(x.a * y.b, x.b * y.a); }
    //缩略号
    frac &operator+=(const frac &x) { return *this = *this + x; }
    frac &operator-=(const frac &x) { return *this = *this - x; }
    frac &operator*=(const frac &x) { return *this = *this * x; }
    frac &operator/=(const frac &x) { return *this = *this / x; }
};
```

Usage:

```cpp
frac x(1, 3), y(1, 6);
frac z = x + y;            // 1/2
cout << z.a << '/' << z.b;
```

## 模数非质数的拆分

Modulus $P$ not prime: a number is stored as $a \cdot \prod p_i^{e_i}$ where $p_i$ are the prime factors of $P$ and $\gcd(a, P) = 1$, so division only ever inverts $a$ (by Euler's theorem, $a^{-1} = a^{\varphi(P) - 1}$). Call `DivNum::init(P)` first.

```cpp
struct DivNum {
    static inline ll P, phi; static inline vector<ll> pc; // modulus, phi(P), prime factors of P
    static void init(ll p) {
        P = phi = p, pc.clear();
        for (ll i = 2; i * i <= p; i++) if (p % i == 0) { pc.push_back(i), phi = phi / i * (i - 1); while (p % i == 0) p /= i; }
        if (p > 1) pc.push_back(p), phi = phi / p * (p - 1);
    }
    static ll qpow(ll a, ll b) { ll r = 1 % P; for (a %= P; b; b >>= 1, a = (__int128)a * a % P) if (b & 1) r = (__int128)r * a % P; return r; }
    ll a = 1; vector<ll> e = vector<ll>(pc.size()); // e[i]: exponent of pc[i]
    DivNum(ll x = 1) {
        for (size_t i = 0; i < pc.size(); i++) while (x % pc[i] == 0) e[i]++, x /= pc[i];
        a = x % P;
    }
    friend DivNum operator*(DivNum x, const DivNum &y) {
        x.a = (__int128)x.a * y.a % P;
        for (size_t i = 0; i < pc.size(); i++) x.e[i] += y.e[i];
        return x;
    }
    friend DivNum operator/(DivNum x, const DivNum &y) { // y must divide x in the integers
        x.a = (__int128)x.a * qpow(y.a, phi - 1) % P;
        for (size_t i = 0; i < pc.size(); i++) x.e[i] -= y.e[i];
        return x;
    }
    ll val() const { ll r = a; for (size_t i = 0; i < pc.size(); i++) r = (__int128)r * qpow(pc[i], e[i]) % P; return r; }
};
```

Usage:

```cpp
DivNum::init(P);
DivNum c = 1;                                   // C(n, k) mod P with P not prime
for (int i = 1; i <= k; i++) c = c * DivNum(n - i + 1) / DivNum(i);
c.val();
```

## FFT 优化高精乘

Multiply two huge decimal strings with the `conv` from the FFT note. Groups of 4 digits keep every convolution term below $10^8 \cdot \text{length}$, safely exact for up to about $10^6$ digits.

```cpp
string fft_mul(const string &s, const string &t) { // non-negative decimal strings
    const int W = 4, B = 10000;
    auto split = [&](const string &x) {
        vector<ll> v;
        for (int i = x.size(); i > 0; i -= W) v.push_back(stoll(x.substr(max(0, i - W), i - max(0, i - W))));
        return v;
    };
    vector<ll> c = conv(split(s), split(t));
    ll carry = 0;
    for (ll &x : c) x += carry, carry = x / B, x %= B;
    while (carry) c.push_back(carry % B), carry /= B;
    while (c.size() > 1 && !c.back()) c.pop_back();
    string res = to_string(c.back());
    char buf[8];
    for (int i = (int)c.size() - 2; i >= 0; i--) snprintf(buf, sizeof buf, "%04lld", c[i]), res += buf;
    return res;
}
```

Usage:

```cpp
cout << fft_mul(a, b); // a, b: strings of digits
```
