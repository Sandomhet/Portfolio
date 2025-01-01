# Linear Sieve Algorithms

对于一个函数 $f(x)$，求解它有若干种方法：

1. 对于单个 $x$ 的求值，一般通过定义式直接构造。

2. 对于一段区间的求值 $[l, r]$，考虑利用函数的性质进行快速筛选。

## Table of Contents

## 质数筛法

1. $Eratosthenes$--埃氏筛

对于每一个质数，把它的倍数标记为合数

```cpp
void Esth(int n)
{
    int m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (!prime[i])
            for (int j = i * i; j <= n; j += i) prime[j] = 1;
}
```

2. 线性筛（欧拉筛）
   可以在 $O(n)$ 的时间复杂度里，筛出 $1$~$n$ 的所有函数值，因为每个数的函数值只会被计算一次，而且是 $O(1)$ 转移。

关于正确性：首先与埃氏筛一样，对于每一个质数，都把它的倍数筛为了合数。

时间上的优秀：注意到 $break$ 操作，因为我们是从小到大枚举质数，所以一个数只会被它的最小质因子筛去，当 $i$ 已经被 $ip[j]$
筛过了，$i*$ 其他任意一个质数还是 $ip[j]$ 的倍数，肯定已经被 $ip[j]$ 筛过了。

筛质数的同时，也可以筛出最小质因子

```cpp
bool prime[Z];
int ip[Z], low[Z];
void Linear(int n)
{
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, low[i] = i;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1, low[k] = ip[j];
            if (i % ip[j] == 0) break;
        }
    }
}
```

## 积性函数

定义 $f(x)$ 为数论函数。
积性函数：对于任意互质的 $a, b$，有 $f(ab)=f(a)f(b)$。
完全积性函数：对于任意的 $a, b$，有 $f(ab)=f(a)f(b)$。

根据第一条定义：把 $x$ 按照算数基本定理拆分， $x=\prod_{i=1}^{k}p_i^{c_i}$
，有 $f(x)=f(\prod_{i=1}^{k}p_i^{c_i})=\prod_{i=1}^{k}f(p_i^{c_i})$，同时对于单个质数 $f(p_i^{c_i})$，一般可以在 $O(1)$
或 $O(logn)$ 的时间内求出。

考虑如何通过线性筛筛出，显然要能运用算数基本定理，我们需要质数，所以只需在筛质数的基础上稍作修改。对于 $k$
是质数的情况，一般函数值比较显然。设 $k=i*ip[j]$，根据线性筛的原理，$ip[j]$ 是 $k$ 的的最小质因子。当 $ip[j]$ 是 $i$
的质因子时（即 $i \% ip[j] = 0$ ），假设 $i$ 中 $ip[j]$ 的个数为 $c$，那么令 $x=i/(ip[j]^c), y=ip[j]^{c+1}$，那么 $x$ 与 $y$
互质，则 $f[k]=f[x] * f[y] $ ；如果 $ip[j]$ 不是 $i$ 的质因子，那么 $ip[j]$ 与 $i$ 互质，则 $f[k]=f[i] * f[ip[j]] $，对于 $x$
最小质因子的指数 $mi[x]$，可以一边筛质数一边筛出来。

1. 欧拉函数

```cpp
int phi[Z];
void Euler(int n)//欧拉函数
{
    phi[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, phi[i] = i - 1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { phi[k] = phi[i] * ip[j]; break; }
            else phi[k] = phi[i] * (ip[j] - 1);
        }
    }
}
```

2. 莫比乌斯函数

```cpp
int miu[Z];
void Mobius(int n)//莫比乌斯函数
{
    miu[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, miu[i] = -1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { miu[k] = 0; break; }
            else miu[k] = -miu[i];
        }
    }
}
```

3. 约数个数

```cpp
int d[Z];
void Linear(int n)//约数个数
{
    d[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, d[i] = 2;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { d[k] = 2 * d[i] - d[i / ip[j]]; break; }
            else d[k] = 2 * d[i];
        }
    }
}
```

4. 正约数的和

```cpp
int s[Z];
void Linear(int n)//约数和
{
    s[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, s[i] = i + 1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { s[k] = s[i] + (s[i] - s[i / ip[j]]) * ip[j]; break; }
            else s[k] = s[i] * (ip[j] + 1);
        }
    }
}
```
