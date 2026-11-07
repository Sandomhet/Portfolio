---
title: "Number Theory"
description: "Basic algorithms associated with number theory problems"
time: "Mon Dec 30, 2024"
---

# Number Theory Algorithms

## Euclidean Algorithm

辗转相除法求最大公约数

Time Complexity: $O(\log \min(a,b))$

```cpp
ll gcd(ll a, ll b) { while (b) { ll r = a % b; a = b, b = r; } return a; } // or std::gcd / __gcd
ll lcm(ll a, ll b) { return a / gcd(a, b) * b; }
```

## Prime Number

### 判断素数

```cpp
bool is_prime(ll x) { // O(sqrt x); for x up to 1e18 use miller_rabin below
    if (x < 2) return false;
    for (ll i = 2; i * i <= x; i++)
        if (x % i == 0) return false;
    return true;
}
```

### 质因数分解（试除法）

```cpp
vector<pair<ll, int>> factorize(ll x) { // (prime, exponent), O(sqrt x)
    vector<pair<ll, int>> res;
    for (ll i = 2; i * i <= x; i++) {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) res.push_back({i, cnt});
    }
    if (x > 1) res.push_back({x, 1});
    return res;
}
```

### Miller–Rabin and Pollard Rho

For $x \le 10^{18}$. Miller–Rabin with these 7 bases is deterministic for every 64-bit $x$. Pollard Rho finds a factor in about $O(x^{1/4})$, so `factor` splits a number up to $10^{18}$ quickly.

```cpp
ll mulmod(ll a, ll b, ll m) { return (__int128)a * b % m; }
ll powmod(ll a, ll b, ll m) {
    ll r = 1 % m;
    for (a %= m; b; b >>= 1, a = mulmod(a, a, m)) if (b & 1) r = mulmod(r, a, m);
    return r;
}
bool miller_rabin(ll n) {
    if (n < 2) return false;
    for (ll p : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}) if (n % p == 0) return n == p;
    ll d = n - 1; int s = 0;
    while (d % 2 == 0) d /= 2, s++;
    for (ll a : {2, 325, 9375, 28178, 450775, 9780504, 1795265022}) {
        ll x = powmod(a, d, n);
        if (x == 0 || x == 1 || x == n - 1) continue;
        bool comp = true;
        for (int i = 1; i < s && comp; i++) if ((x = mulmod(x, x, n)) == n - 1) comp = false;
        if (comp) return false;
    }
    return true;
}
ll pollard_rho(ll n) { // a nontrivial factor of composite n
    static mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    if (n % 2 == 0) return 2;
    while (true) {
        ll c = rng() % (n - 1) + 1, x = rng() % n, y = x, g = 1, q = 1;
        auto f = [&](ll v) { return (mulmod(v, v, n) + c) % n; };
        for (int k = 1; g == 1; k <<= 1) { // Brent: batch 128 gcds
            x = y;
            for (int i = 0; i < k; i++) y = f(y);
            for (int i = 0; i < k && g == 1; i += 128) {
                ll ys = y;
                for (int j = 0; j < min(128, k - i); j++) y = f(y), q = mulmod(q, llabs(x - y), n);
                g = __gcd(q, n);
                if (g == n) { // overshoot: redo one step at a time
                    for (y = ys, g = 1; g == 1; ) y = f(y), g = __gcd(llabs(x - y), n);
                }
            }
        }
        if (g != n) return g;
    }
}
void factor(ll n, vector<ll> &res) { // prime factors with multiplicity (unsorted)
    if (n == 1) return;
    if (miller_rabin(n)) { res.push_back(n); return; }
    ll d = pollard_rho(n);
    factor(d, res), factor(n / d, res);
}
```

Usage:

```cpp
miller_rabin(998244353);   // true
vector<ll> fs; factor(x, fs); sort(fs.begin(), fs.end()); // 1e18 -> 2 x18, 5 x18
```

## 乘法逆元

若 $a\cdot x \equiv 1 \pmod{b}$ ,则 $x$ 为 $a$ 在 $\bmod b$ 意义下的乘法逆元，记为 $a^{-1}$。注意：并非所有的情况下都存在乘法逆元，但是当 $\gcd(a, b)=1$，即 $a, b$ 互质时，一定存在乘法逆元。

1. 费马小定理求逆元（p 为素数）

```cpp
ll binpow(ll a, ll b, ll p) { // a^b mod p, p < 2^31 (use powmod above for larger p)
    ll res = 1 % p;
    for (a %= p; b; b >>= 1, a = a * a % p)
        if (b & 1) res = res * a % p;
    return res;
}
ll inv_fermat(ll a, ll p) { return binpow(a, p - 2, p); } // p prime, a % p != 0
```

2. 扩展欧几里得求逆元（a 与 p 互质）
   a*x≡1(mod p) --> a*x-p\*y=1

```cpp
ll exgcd(ll a, ll b, ll &x, ll &y) { // a*x + b*y = gcd(a, b)
    if (b == 0) { x = 1, y = 0; return a; }
    ll g = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}
ll inv_exgcd(ll a, ll p) { // gcd(a, p) = 1
    ll x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
```

3. 线性求逆元（p 为素数）

```cpp
vector<ll> inverse_table(int n, ll p) { // inv[1..n] mod prime p, n < p
    vector<ll> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) inv[i] = (p - p / i) * inv[p % i] % p;
    return inv;
}
```
