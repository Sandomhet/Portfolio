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
void init(int n)
{
    C[0][0] = 1;
    for (int i = 1; i <= n; ++i)
    {
        C[i][0] = 1;
        for (int j = 1; j <= i; ++j)
            C[i][j] = C[i - 1][j] + C[i - 1][j - 1];
    }
}
```

2. 乘法递推

```cpp
void init(int n)
{
    C[0] = 1;
    for (int i = 1; i * 2 <= n; ++i)
        C[i] = C[n - i] = C[i - 1] * (n - i + 1) / i;
}
```

3. 根据定义，阶乘直接求得

```cpp
int fac[Z], ny[Z];
void init(int n, int p)
{
    fac[0] = 1;
    for (int i = 1; i <= n; ++i)
        fac[i] = fac[i - 1] * i % p;
    ny[n] = qpow(fac[n], p - 2, p);
    for (int i = n - 1; i >= 1; --i)
        ny[i] = ny[i + 1] * (i + 1) % p;
}
inline int C(int n, int m, int p)//组合数
{
    return m > n ? 0 : fac[n] * ny[m] % p * ny[n - m] % p;
}
inline int A(int n, int m, int p)//排列数
{
    return m > n ? 0 : fac[n] * ny[n - m] % p;
}
```

### 卢卡斯定理

$$ C*n^m = C*{n \mod p}^{m \mod p}\*C\_{\lfloor n/p \rfloor}^{\lfloor m/p \rfloor} \pmod p $$

```cpp
int lucas(int n, int m, int p)
{
    if (m == 0) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

扩展卢卡斯定理，针对模数不为素数的大组合数求解

```cpp
int a[Z], c[Z];
int qpow(int a, int b, int p)
{
    int res = 1;
    while (b)
    {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
int exgcd(int a, int b, int& x, int& y)
{
    if (b == 0)
    {
        x = 1; y = 0;
        return a;
    }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
int inv(int a, int p)
{
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
int fac(int n, int p, int pk)//n!/p^x mod p^k
{
    if (!n) return 1;
    int ans = 1;
    for (int i = 1; i < pk; ++i)//n/pk个循环节
        if (i % p) ans = ans * i % pk;
    ans = qpow(ans, n / pk, pk);
    for (int i = 1; i <= n % pk; ++i)//剩余部分
        if (i % p) ans = ans * i % pk;
    return ans * fac(n / p, p, pk) % pk;//余下的递归处理
}
int C(int n, int m, int p, int pk)//C(n, m) mod p^k
{
    if (m > n) return 0;
    int f1 = fac(n, p, pk), f2 = fac(m, p, pk), f3 = fac(n - m, p, pk);
    int k1 = 0, k2 = 0, k3 = 0;//统计阶乘中p的倍数的个数
    for (int i = n; i; i /= p) k1 += i / p;
    for (int i = m; i; i /= p) k2 += i / p;
    for (int i = n - m; i; i /= p) k3 += i / p;
    return f1 * inv(f2, pk) * inv(f3, pk) % pk * qpow(p, k1 - k2 - k3, pk) % pk;
}
int CRT(int n, int a[], int m[])
{
    int b, c, x, y;
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i)
    {
        b = m[i]; c = M / b;
        exgcd(c, b, x, y);
        ans = (ans + a[i] * c * x % M);
    }
    return (ans % M + M) % M;
}
int exlucas(int n, int m, int p)
{
    int tmp = sqrt(p), cnt = 0;
    for (int i = 2; p > 1 && i <= tmp; ++i)
    {
        int t = 1;
        while (p % i == 0) p /= i, t *= i;//t = i^tot
        if (t > 1) a[++cnt] = C(n, m, i, t), c[cnt] = t;
    }
    if (p > 1) a[++cnt] = C(n, m, p, p), c[cnt] = p;
    return CRT(cnt, a, c);//求解ans ≡ C(n, m) (mod p[i]^k[i])
}
```
