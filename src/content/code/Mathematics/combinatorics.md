---
title: "Combinatorics"
description: ""
time: "Mon Feb 1, 2024"
---

# Combinatorics

### 求组合数

1. 加法递推（杨辉三角）
   $$ C_n^m = C_{n - 1}^m + C_{n - 1}^{m - 1} $$

```cpp
vector<vector<ll>> pascal(int n, ll p) { // C[i][j] mod p for 0 <= j <= i <= n, any p
    vector<vector<ll>> C(n + 1, vector<ll>(n + 1));
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1 % p;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i - 1][j] + C[i - 1][j - 1]) % p;
    }
    return C;
}
```

2. 乘法递推

```cpp
vector<ll> binom_row(int n) { // C(n, 0..n) exactly, n <= 66 (fits in ll)
    vector<ll> C(n + 1);
    C[0] = C[n] = 1;
    for (int i = 1; i * 2 <= n; i++) C[i] = C[n - i] = C[i - 1] * (n - i + 1) / i;
    return C;
}
```

3. 根据定义，阶乘直接求得

```cpp
struct Comb { // factorials mod a prime p, for 0 <= n < p
    ll p; vector<ll> fac, ifac;
    Comb(int n, ll p = mod) : p(p), fac(n + 1), ifac(n + 1) {
        fac[0] = 1;
        for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i % p;
        ifac[n] = pw(fac[n], p - 2);
        for (int i = n; i > 0; i--) ifac[i - 1] = ifac[i] * i % p;
    }
    ll pw(ll a, ll b) { ll r = 1; for (a %= p; b; b >>= 1, a = a * a % p) if (b & 1) r = r * a % p; return r; }
    ll C(ll n, ll m) { return m < 0 || m > n ? 0 : fac[n] * ifac[m] % p * ifac[n - m] % p; } //组合数
    ll A(ll n, ll m) { return m < 0 || m > n ? 0 : fac[n] * ifac[n - m] % p; }              //排列数
    ll inv(ll n) { return ifac[n] * fac[n - 1] % p; }                                      // 1 / n, n >= 1
    ll lucas(ll n, ll m) { return m == 0 ? 1 : C(n % p, m % p) * lucas(n / p, m / p) % p; } // needs Comb(p - 1, p)
};
```

Usage:

```cpp
Comb cb(2e6);            // mod from the starter
cb.C(n, m), cb.A(n, m), cb.inv(n);
Comb lu(p - 1, p);       // small prime p
lu.lucas(n, m);          // C(n, m) mod p for huge n, m
```

### 卢卡斯定理

$$ C_n^m = C_{n \mod p}^{m \mod p} * C_{\lfloor n/p \rfloor}^{\lfloor m/p \rfloor} \pmod p $$

The `lucas` member of `Comb` above implements it (build `Comb(p - 1, p)` for the small prime $p$).

扩展卢卡斯定理，针对模数不为素数的大组合数求解

Factor $p = \prod p_i^{k_i}$. For each $p_i^{k_i}$: write $n! = p_i^{x} \cdot r$ with $p_i \nmid r$, compute $r \bmod p_i^{k_i}$ recursively (`fac`), then
$$\binom{n}{m} \equiv \frac{r_n}{r_m r_{n-m}} \, p_i^{x_n - x_m - x_{n-m}} \pmod{p_i^{k_i}}$$
and merge all residues with CRT.

```cpp
namespace exLucas {
    ll qpow(ll a, ll b, ll p) { ll r = 1 % p; for (a %= p; b; b >>= 1, a = a * a % p) if (b & 1) r = r * a % p; return r; }
    ll exgcd(ll a, ll b, ll &x, ll &y) {
        if (b == 0) { x = 1, y = 0; return a; }
        ll g = exgcd(b, a % b, y, x);
        y -= a / b * x;
        return g;
    }
    ll inv(ll a, ll p) { ll x, y; exgcd(a, p, x, y); return (x % p + p) % p; }
    ll fac(ll n, ll p, ll pk) { //n!/p^x mod p^k
        if (!n) return 1;
        ll ans = 1;
        for (ll i = 1; i < pk; ++i) //n/pk个循环节
            if (i % p) ans = ans * i % pk;
        ans = qpow(ans, n / pk, pk);
        for (ll i = 1; i <= n % pk; ++i) //剩余部分
            if (i % p) ans = ans * i % pk;
        return ans * fac(n / p, p, pk) % pk; //余下的递归处理
    }
    ll C(ll n, ll m, ll p, ll pk) { //C(n, m) mod p^k
        if (m > n) return 0;
        ll f1 = fac(n, p, pk), f2 = fac(m, p, pk), f3 = fac(n - m, p, pk);
        ll k = 0; //统计阶乘中p的倍数的个数
        for (ll i = n; i; i /= p) k += i / p;
        for (ll i = m; i; i /= p) k -= i / p;
        for (ll i = n - m; i; i /= p) k -= i / p;
        return f1 * inv(f2, pk) % pk * inv(f3, pk) % pk * qpow(p, k, pk) % pk;
    }
    ll exlucas(ll n, ll m, ll P) { // C(n, m) mod any P (P up to ~1e6 per prime power)
        vector<ll> a, c; //求解ans ≡ C(n, m) (mod p[i]^k[i])
        for (ll i = 2; i * i <= P; ++i) {
            ll t = 1;
            while (P % i == 0) P /= i, t *= i;
            if (t > 1) a.push_back(C(n, m, i, t)), c.push_back(t);
        }
        if (P > 1) a.push_back(C(n, m, P, P)), c.push_back(P);
        ll M = 1, ans = 0; // CRT, moduli are coprime
        for (ll x : c) M *= x;
        for (size_t i = 0; i < a.size(); i++) {
            ll w = M / c[i];
            ans = (ans + (__int128)a[i] * w % M * inv(w % c[i], c[i])) % M;
        }
        return ans;
    }
}
```

Usage:

```cpp
exLucas::exlucas(n, m, P); // C(n, m) mod P, P not necessarily prime
```
