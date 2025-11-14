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
inline int gcd(int a, int b)
{
    int r = a % b;
    while (r) a = b, b = r, r = a % b;
    return b;
}
inline int gcd(int a, int b) { return b ? gcd(b, a % b) : a; }
inline int lcm(int a, int b) { return a / gcd(a, b) * b; }
```

## Prime Number

### 判断素数

```cpp
bool isPrime(int x)
{
    if (x < 2) return false;
    int m = sqrt(x);
    for (int i = 2; i <= m; ++i)
        if (x % i == 0) return false;
    return true;
}
```

### 质因数分解（试除法）

```cpp
vector<pii> pr; // pair<prime, count>
void primeFactorization(int x) {
    int m = sqrt(x);
    for (int i = 2; i <= m && x > 1; ++i) {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) pr.push_back({i, cnt});
    }
    if (x > 1) pr.push_back({x, 1});
    for (auto p : pr)
        cout << p.first << "^" << p.second << endl;
}
```

## 乘法逆元

若 $a\cdot x \equiv 1 \pmod{b}$ ,则 $x$ 为 $a$ 在 $\bmod b$ 意义下的乘法逆元，记为 $a^{-1}$。注意：并非所有的情况下都存在乘法逆元，但是当 $\gcd(a, b)=1$，即 $a, b$ 互质时，一定存在乘法逆元。

1. 费马小定理求逆元（p 为素数）

```cpp
int binpow(int a, int b, int p) {
    int res = 1;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
inline int inv(int a, int p) { return binpow(a, p - 2, p); }
```

2. 扩展欧几里得求逆元（a 与 p 互质）
   a*x≡1(mod p) --> a*x-p\*y=1

```cpp
inline int exgcd(int a, int b, int& x, int& y) {
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
inline int inv(int a, int p) {
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
```

3. 线性求逆元（p 为素数）

```cpp
void inverse(int p) {
    inv[1] = 1;
    for (int i = 2; i < p; ++i)
        inv[i] = (p - p / i) * inv[p % i] % p;
}
```
