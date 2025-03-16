---
category: "blogs"
name: "number-theory"
title: "Number Theory"
time: "Mon Dec 30, 2024"
description: "Basic algorithms associated with number theory problems"
---

# Number Theory Algorithms

## 辗转相除法求最大公约数

```cpp {2, 4} showLineNumbers
inline int gcd(int a, int b)
{
    int r = a % b;
    while (r) a = b, b = r, r = a % b;
    return b;
}
inline int gcd(int a, int b) { return b ? gcd(b, a % b) : a; }
```

## 线性筛筛素数

```cpp
int ip[Z], tot;
bool prime[Z];
void PRIME(int n)
{
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i])  ip[++tot] = i;
        for (int j = 1; j <= tot; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = true;
            if (i % ip[j] == 0) break;
        }
    }
}
```

## 质因数分解（试除法）

```cpp
void divide(int x)
{
    int m = 0, n = sqrt(x);
    for (int i = 2; i <= n && x > 1; ++i)
    {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) p[++m] = i, c[m] = cnt;
    }
    if (x > 1) p[++m] = x, c[m] = 1;
    for (int i = 1; i <= m; ++i)
        cout << p[i] ^ c[i] <<endl;
}
```

## 乘法逆元

若 a\*x ≡ 1 (mod b) ,则 x 为 a 在 mod b 意义下的乘法逆元，记为 a^(-1)。注意：并非所有的情况下都存在乘法逆元，但是当
gcd(a,b)=1，即 a,b 互质时，一定存在乘法逆元。

1. 费马小定理求逆元（p 为素数）

```cpp
inline int qpow(int a, int b, int p)
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
inline int inv(int a, int p) { return qpow(a, p - 2, p); }
```

2. 扩展欧几里得求逆元（a 与 p 互质）
   a*x≡1(mod p) --> a*x-p\*y=1

```cpp
inline int exgcd(int a, int b, int& x, int& y)
{
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
inline int inv(int a, int p)
{
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
```

3. 线性求逆元（p 为素数）

```cpp
void inverse(int p)
{
    ny[1] = 1;
    for (int i = 2; i < p; ++i)
        ny[i] = (p - p / i) * ny[p % i] % p;
}
```

## 欧拉函数：

定义：小于等于 $n$ 的数中与 $n$ 互质的数的个数，用字母 $\varphi$ 表示。

通项公式：

$$ \varphi(n) = n \* \prod\_{p_i | n \ and \ p_i \in prime}\frac{p_i - 1}{p_i} $$

```cpp
int euler(int n)//根据基础定义，求单个数的欧拉函数
{
    int ans = n, m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (n % i == 0)
        {
            ans = ans / i * (i - 1);
            while (n % i == 0) n /= i;
        }
    if (n > 1) ans = ans / n * (n - 1);
    return ans;
}
```

```cpp
int ip[Z], phi[Z];
bool prime[Z];
void euler_prime(int n)//线性求欧拉函数
{
    phi[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, phi[i] = i - 1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;//p为素数
            if (i % ip[j] == 0)
            {
                phi[k] = ip[j] * phi[i];
                break;
            }
            else phi[k] = (ip[j] - 1) * phi[i];
        }
    }
}
```

## 同余知识：

剩余系：对于某一个特定的正整数 m，一个整数集中的数模 m 所得的余数域（单个集合称为同余类）。例如：余数为 a
的集合可以表示为{a+km}，简记为$\overline a$

完全剩余系：模 m 的同余类有 m 个，{0,1,……,m-1}，它们构成了 m 的完全剩余系。

简化剩余系：1~m 中与 m 互质的个数有$\phi(m)$个，它们构成 m 的简化剩余系。简化剩余系关于模 m 乘法封闭，其中任意数相乘也与 m
互质。

费马小定理：若 p 是质数，gcd(a, p) = 1，有 $a^{p-1} \equiv 1 \pmod p$。还有另一种形式：对于 ∀a∈Z， $a^p \equiv a \pmod p$

欧拉定理：若 gcd(a, p) = 1，则$a^{\phi(p)}\equiv 1 \pmod p$，$\phi(p)$为欧拉函数

因为二者可以相互转化，所以一起证明：

构造一个序列 A={1,2,3……,p-1}（即为 p 的简化剩余系），再取一个不是 p 的倍数的数 a。

$\because gcd(A_i, p) = 1, gcd(a, p) = 1, 且A_i与a同属于简化剩余系$

$\therefore gcd(A_i * a, p) = 1$

$\therefore$ p 的简化剩余系可以记为{$\overline a_1,\overline a_2……\overline a_{\phi(p)}$
}或{$\overline {aa_1},\overline {aa_2}……\overline {aa_{\phi(p)}}$}

为什么：假设对于不同的剩余系$a_i,a_j;aa_i,aa_j$代表相同的剩余系，也就是$aa_i\equiv aa_j \pmod p$，则$a(a_i-a_j) \equiv 0$
，因为 gcd(a, p)互质，所以$a_i-a_j\equiv 0$， 即$a_i\equiv a_j$，假设矛盾，所以可以代表不同的剩余系。

而简化剩余系之间一一对应，那么$a_1a_2…a_{\phi(p)}\equiv aa_1aa_2…aa_{\phi(p)}$，化简即得$a^{\phi(p)}\equiv 1 \pmod p$。

当 p 是质数时$\phi(p)=p-1$，此时$a^{p-1} \equiv 1 \pmod p$

扩展欧拉定理：

$$ a^b \equiv \begin{cases} a^{b \; mod \;\phi(p)},&gcd(a,p)=1,\\ a^{b},&gcd(a, p)\neq1 且 b<\phi(p), &\pmod p\\ a^{b \; mod\;\phi(p)+\phi(p)},&gcd(a, p)\neq1 且 b\geq\phi(p),\\ \end{cases} $$
