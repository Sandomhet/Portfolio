---
title: "Möbius"
description: "Introduces Mobius function and mobius inversion formula"
time: "Mon Feb 1, 2024"
---

# Möbius

## Table of Contents

## 莫比乌斯函数

### 定义

$$
\mu(n)=
\begin{cases}
1 &n=1 \\
0 &n含有平方因子 \\
(-1)^k &k为本质不同的质因子个数
\end{cases}
$$

### 性质

莫比乌斯函数是积性函数，且有
$$
\sum\limits_{d|n}\mu(d)=
\begin{cases}
1 &n=1\\
0 &n\neq 1\\
\end{cases}
$$
即$\sum\limits_{d|n}\mu(d)=\varepsilon(n)$，卷积形式为$\mu*1=\varepsilon$

#### 证明

设$n=\prod\limits_{i=1}^{k}p_i^{c_i}，n'=\prod\limits_{i=1}^{k}p_i$
，有莫比乌斯函数的定义可知$\sum\limits_{d|n}\mu(d)=\sum\limits_{d|n'}\mu(d)=\sum\limits_{i=0}^{k}C_k^i(-1)^i$
，（把枚举因数换了一种形式），根据二项式定理，$\sum\limits_{i=0}^{k}C_k^i(-1)^i1^{k-i}=(1-1)^k$，所以当$k=0(n=1)$时为1，其余为0。得证。

## 莫比乌斯变换

### 公式

1.若$f(n)=\sum\limits_{d|n}g(d)$，则$g(n)=\sum\limits_{d|n}\mu(d)f(\frac{n}{d})$

2.若$f(n)=\sum\limits_{n|d}g(d)$，则$g(n)=\sum\limits_{n|d}\mu(d)f(\frac{d}{n})$

#### 证明

1.$\sum\limits_{d|n}\mu(d)f(\frac{n}{d})=\sum\limits_{d|n}\mu(d)\sum\limits_{k|\frac{n}{d}}g(k)=\sum\limits_{k|n}g(k)\sum\limits_{d|\frac{n}{k}}\mu(d)=\sum\limits_{k|n}g(k)\varepsilon(\frac{n}{k})=g(n)$

2.$\sum\limits_{n|d}\mu(d)f(\frac{d}{n})=\sum\limits_{k=1}^{+\infty}\mu(kn)f(k)=\sum\limits_{k=1}^{+\infty}\mu(kn)\sum\limits_{k|d}g(d)=\sum\limits_{n|d}g(d)\sum\limits_{kn|d}\mu(kn)=\sum\limits_{n|d}g(d)\sum\limits_{k|\frac{d}{n}}\mu(k)=\sum\limits_{n|d}g(d)\varepsilon(\frac{d}{n})=g(n)$

## 常用套路（例题+解释）

0. $[\gcd(i, j) == 1]=\varepsilon(\gcd(i,j))=\sum\limits_{d|\gcd(i, j)}\mu(d)$

1. $ \sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}[\gcd(i,j)==k]$

题目链接：[YY的GCD](https://www.luogu.com.cn/problem/P2257)、[[HAOI2011]Problem b](https://www.luogu.com.cn/problem/P2522)、[[POI2007]ZAP-Queries](https://www.luogu.com.cn/problem/P3455)

$$
\begin{aligned}
\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}[\gcd(i,j)==k]
&= \sum\limits_{i=1}^{\lfloor\frac{n}{k}\rfloor}\sum\limits_{j=1}^{\lfloor\frac{m}{k}\rfloor}[\gcd(i,j)==1] \\
&=\sum\limits_{i=1}^{\lfloor\frac{n}{k}\rfloor}\sum\limits_{j=1}^{\lfloor\frac{m}{k}\rfloor}\sum\limits_{d|\gcd(i, j)}\mu(d) \\
&=\sum\limits_{d=1}^{n}\mu(d)\sum\limits_{i=1}^{\lfloor\frac{n}{kd}\rfloor}\sum\limits_{j=1}^{\lfloor\frac{m}{kd}\rfloor} \\
&=\sum\limits_{d=1}^{n}\mu(d)\lfloor\frac{n}{kd}\rfloor\lfloor\frac{m}{kd}\rfloor \\
\end{aligned}
$$

2. $ \sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\gcd(i,j)$

$$
\begin{aligned}
\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\gcd(i,j)
&=\sum\limits_{k=1}^{n}k\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}[\gcd(i, j)==k] \\
&=\sum\limits_{k=1}^{n}k\sum\limits_{i=1}^{\lfloor \frac{n}{k} \rfloor}\sum\limits_{j=1}^{\lfloor \frac{m}{k} \rfloor}[\gcd(i, j)==1] \\
&=\sum\limits_{k=1}^{n}k\sum\limits_{i=1}^{\lfloor \frac{n}{k} \rfloor}\sum\limits_{j=1}^{\lfloor \frac{m}{k} \rfloor}\sum\limits_{d|\gcd(i, j)}\mu(d) \\
&=\sum\limits_{k=1}^{n}k\sum\limits_{d=1}^{n}\mu(d)\sum\limits_{i=1, d|i}^{\lfloor \frac{n}{k} \rfloor}\sum\limits_{j=1, d|j}^{\lfloor \frac{m}{k} \rfloor} \\
&=\sum\limits_{k=1}^{n}k\sum\limits_{d=1}^{n}\mu(d)\sum\limits_{i=1}^{\lfloor \frac{n}{kd} \rfloor}\sum\limits_{j=1}^{\lfloor \frac{m}{kd} \rfloor} \\
&=\sum\limits_{k=1}^{n}\sum\limits_{d=1}^{n}k\mu(d)\lfloor \frac{n}{kd} \rfloor\lfloor \frac{m}{kd} \rfloor \\
令t=kd，原式&=\sum\limits_{t=1}^{n}\sum\limits_{d|t}\mu(d)(\frac{t}{d})\lfloor \frac{n}{t} \rfloor\lfloor \frac{m}{t} \rfloor \\
\end{aligned}
$$

定义$f(t)=\sum\limits_{d|t}\mu(d)(\frac{t}{d})$
$$
原式=\sum\limits_{t=1}^{n}f(t)\lfloor \frac{n}{t} \rfloor\lfloor \frac{m}{t} \rfloor
$$

3. $ \sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}lcm(i,j)$

题目链接：[[国家集训队]Crash的数字表格/JZPTAB](https://www.luogu.com.cn/problem/P1829)

$$
\begin{aligned}
\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}lcm(i,j)
&=\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\frac{ij}{\gcd(i,j)} \\
&=\sum\limits_{k=1}^{n}\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\frac{ij}{k}[\gcd(i,j)==k] \\
&=\sum\limits_{k=1}^{n}\sum\limits_{i=1}^{\lfloor \frac{n}{k} \rfloor}\sum\limits_{j=1}^{\lfloor \frac{m}{k} \rfloor}\frac{ijk^2}{k}[\gcd(i,j)==1] \\
&=\sum\limits_{k=1}^{n}k\sum\limits_{i=1}^{\lfloor \frac{n}{k} \rfloor}\sum\limits_{j=1}^{\lfloor \frac{m}{k} \rfloor}ij\sum\limits_{d|\gcd(i, j)}\mu(d) \\
&=\sum\limits_{k=1}^{n}\sum\limits_{d=1}^{n}k\mu(d)d^2\sum\limits_{i=1}^{\lfloor \frac{n}{kd} \rfloor}\sum\limits_{j=1}^{\lfloor \frac{m}{kd} \rfloor}ij \\
令t=kd，原式&=\sum\limits_{t=1}^{n}t\sum\limits_{d|t}d\mu(d)\sum\limits_{i=1}^{\lfloor \frac{n}{t} \rfloor}i\sum\limits_{j=1}^{\lfloor \frac{m}{t} \rfloor}j \\
\end{aligned}
$$

定义$f(t)=\sum\limits_{d|t}d\mu(d)，g(n)=\sum\limits_{i=1}^{n}i$，$f$显然可以筛出来，$g$显然是等差数列通项公式。

$$
原式=\sum\limits_{t=1}^{n}tf(t)g(\lfloor \frac{n}{t} \rfloor)g(\lfloor \frac{m}{t} \rfloor)
$$

4. $ \sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}d(ij)$ ($d$为约数个数和)

题目链接：[[SDOI2015]约数个数和](https://www.luogu.com.cn/problem/P3327)

**非常重要的性质：$d(ij)=\sum\limits_{x|i}\sum\limits_{y|j}[\gcd(x,y)==1]$**

**证明：考虑$d$函数的定义——约数个数和，$d(n)=\prod\limits_{p=1}^{k}(c_p+1)=\sum\limits_{p|n}\quad$
因为每个质数相互独立，所以先只考虑质因子$p$，假设$i$的因子中有$a$个$p$，$j$中有$b$个$p$，那么$p$的贡献就是$(a+b+1)$。$x、y$
互质即是要求$p$最多只能出现在一方。从组合角度来理解：1.$i$中选$p$，$j$不选$p$，$a$种方案；2.$j$中选$p$，$i$不选$p$，$b$
种方案；3.$i、j$都不选$p$，$1$种方案。根据乘法原理与乘法结合律，$p$的贡献为$(a+b+1)$
。同样的，也可以利用映射关系：1.对于次数小于等于$a$的$p$因子，强制让它从$i$中选择；2.当大于时，让不够的那部分从$j$
中选择。由于两者是一一映射，所以正确性可以保证。** （目前貌似无法用严格的数学公式推导，所以只能通过逻辑感性理解了。）

有了性质，我们就可以大力推式子了！！

$$
\begin{aligned}
\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}d(ij)
&=\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\sum\limits_{x|i}\sum\limits_{y|j}[\gcd(x,y)==1] \\
&=\sum\limits_{x=1}^{n}\sum\limits_{y=1}^{m}[\gcd(x,y)==1]\sum\limits_{i=1}^{\lfloor\frac{n}{x}\rfloor}\sum\limits_{j=1}^{{\lfloor\frac{m}{y}\rfloor}} \\
&=\sum\limits_{d=1}^{n}\mu(d)\sum\limits_{x=1}^{\lfloor \frac{n}{d} \rfloor}\sum\limits_{y=1}^{\lfloor \frac{m}{d} \rfloor}\lfloor\frac{n}{xd}\rfloor \lfloor\frac{m}{yd}\rfloor \\
&=\sum\limits_{d=1}^{n}\mu(d)\sum\limits_{x=1}^{\lfloor \frac{n}{d} \rfloor}\lfloor\frac{n}{xd}\rfloor\sum\limits_{y=1}^{\lfloor \frac{m}{d} \rfloor} \lfloor\frac{m}{yd}\rfloor \\
\end{aligned}
$$

定义$f(n)=\sum\limits_{i=1}^{n}\lfloor\frac{n}{i}\rfloor$，可以通过整除分块预处理出来$O(1)$查询。

$$
原式=\sum\limits_{d=1}^{n}\mu(d)f(\lfloor \frac{n}{d} \rfloor) f(\lfloor \frac{m}{d} \rfloor)
$$

<details>
<summary> 代码实现 </summary>

```cpp
struct Mobius {
    vector<int> mu, primes; vector<ll> pre; // pre[i] = mu[1] + ... + mu[i]
    Mobius(int n) : mu(n + 1), pre(n + 1) {
        vector<bool> np(n + 1);
        mu[1] = 1;
        for (int i = 2; i <= n; i++) {
            if (!np[i]) primes.push_back(i), mu[i] = -1;
            for (int p : primes) {
                if ((ll)i * p > n) break;
                np[i * p] = 1;
                if (i % p == 0) { mu[i * p] = 0; break; }
                mu[i * p] = -mu[i];
            }
        }
        for (int i = 1; i <= n; i++) pre[i] = pre[i - 1] + mu[i]; //前缀和
    }
    // sum over d <= min(n, m) of mu(d) * f(n / d, m / d), grouping equal quotients (整除分块); n, m <= size
    template<class F> ll block_sum(ll n, ll m, F f) {
        ll res = 0;
        for (ll l = 1, r; l <= min(n, m); l = r + 1) {
            r = min(n / (n / l), m / (m / l));
            res += (pre[r] - pre[l - 1]) * f(n / l, m / l);
        }
        return res;
    }
};
```

Usage:

```cpp
Mobius mb(5e4);
// pairs (i, j), i <= n, j <= m with gcd(i, j) = 1 (use n / k, m / k for gcd = k)
mb.block_sum(n, m, [](ll a, ll b) { return a * b; });

// this problem: sum of d(ij) = sum mu(d) f(n / d) f(m / d), f(x) = sum_{i <= x} floor(x / i)
vector<ll> f(5e4 + 1);
for (int x = 1; x <= 5e4; x++) //整除分块预处理的函数
    for (int l = 1, r; l <= x; l = r + 1) r = x / (x / l), f[x] += (ll)(x / l) * (r - l + 1);
mb.block_sum(n, m, [&](ll a, ll b) { return f[a] * f[b]; });
```

</details>

5. $ \sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\varphi(ij)$

题目链接：[毒瘤之神的考验](https://www.luogu.com.cn/problem/P4240)

**重要的性质：$\varphi(ij)=\frac{\varphi(i)\varphi(j)\gcd(i,j)}{\varphi(\gcd(i,j))}$**

**证明：从$\varphi$
的定义式入手，易得$\varphi(ij)=ij\prod\limits_{p|i\ or\ p|j}(1-\frac{1}{p})， \varphi(\gcd(i, j))=gcd(i,j)\prod\limits_{p|i\ and\ p|j}(1-\frac{1}{p})，\varphi(i)\varphi(j)=ij\prod\limits_{p|i}(1-\frac{1}{p})\prod\limits_{p|j}(1-\frac{1}{p})$
，根据容斥原理得证。**

$$
\begin{aligned}
\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\varphi(ij)
&=\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}\frac{\varphi(i)\varphi(j)\gcd(i,j)}{\varphi(\gcd(i,j))} \\
&=\sum\limits_{k=1}^{n}\frac{k}{\varphi(k)}\sum\limits_{i=1}^{n}\varphi(i)\sum\limits_{j=1}^{m}\varphi(j)[\gcd(i,j)==k] \\
&=\sum\limits_{k=1}^{n}\frac{k}{\varphi(k)}\sum\limits_{i=1}^{\lfloor \frac{n}{k} \rfloor}\varphi(ik)\sum\limits_{j=1}^{\lfloor \frac{m}{k} \rfloor}\varphi(jk)\sum\limits_{d|\gcd(i,j)}\mu(d) \\
&=\sum\limits_{k=1}^{n}\frac{k}{\varphi(k)}\sum\limits_{d=1}^{n}\mu(d)\sum\limits_{i=1}^{\lfloor \frac{n}{kd} \rfloor}\varphi(ikd)\sum\limits_{j=1}^{\lfloor \frac{m}{kd} \rfloor}\varphi(jkd) \\
令t=kd，原式&=\sum\limits_{t=1}^{n}\sum\limits_{k|t}\frac{k\mu(\frac{t}{k})}{\varphi(k)}\sum\limits_{i=1}^{\lfloor \frac{n}{t} \rfloor}\varphi(it)\sum\limits_{j=1}^{\lfloor \frac{m}{t} \rfloor}\varphi(jt) \\
\end{aligned}
$$

定义$f(t)=\sum\limits_{k|t}\frac{k\mu(\frac{t}{k})}{\varphi(k)}，g(t, n)=\sum\limits_{i=1}^{n}\varphi(it)$，

$$
原式=\sum\limits_{t=1}^{n}f(t)g(t, \lfloor \frac{n}{t} \rfloor)g(t, \lfloor \frac{m}{t} \rfloor)
$$

但是发现还是不能在$O(\sqrt{n})$时间内得出答案，继续定义$h(a, b, n)=\sum\limits_{t=1}^{n}f(t)g(t,a)g(t,b)$
，可以通过这个函数进行类似于根号分治的做法来平衡复杂度。

首先$f$函数使用埃氏筛即可，$g、h$显然有递推式$g(t,n)=g(t,n-1)+\varphi(nt)，h(a,b,n)=h(a,b,n-1)+f(n)g(n,a)g(n,b)$。

$h$因为内存问题，显然不能全部预处理出来。而根据整除函数的性质，当$t$比较小时，$\lfloor \frac{n}{t} \rfloor$
较大，且连续段很短，根本没有必要整除分块，直接暴算即可。对于后面的$t$，$\lfloor \frac{n}{t} \rfloor$
较小，因为内存开的下，所以可以选择预处理。记块长为$B$，取$[35, 50]$都行，来作为$h$前两维所管辖的范围。

当然需要用到一些卡常技巧：`g`、`h` 只开到各自需要的长度。

<details>

<summary> 代码实现 </summary>

```cpp
namespace PhiSum { // sum_{i<=n} sum_{j<=m} phi(i*j) mod 998244353, many queries, n, m <= 1e5
const int N = 1e5 + 2, M = 50;
ll qpow(ll a, ll b, ll c) { ll r = 1; for (a %= c; b; b >>= 1, a = a * a % c) if (b & 1) r = r * a % c; return r; }

int ans;
vector<bool> prime(N);
vector<int> ip(N), miu(N), phi(N), inv(N), f(N); // ip[0]: number of primes, ip[1..]: primes
vector<vector<int>> g(N);                        // g[j][i] = sum_{t <= i} phi(t * j)
vector<vector<vector<int>>> h(M + 2, vector<vector<int>>(M + 2));
void Linear(int n) { //线性筛莫比乌斯函数和欧拉函数
    miu[1] = phi[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!prime[i]) {
            ip[++ip[0]] = i;
            miu[i] = -1; phi[i] = i - 1;
        }
        for (int j = 1; j <= ip[0]; ++j) {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { miu[k] = 0, phi[k] = phi[i] * ip[j]; break; }
            else miu[k] = -miu[i], phi[k] = phi[i] * (ip[j] - 1);
        }
    } 
    for (int i = 1; i <= n; ++i) inv[i] = qpow(phi[i], mod - 2, mod);//计算欧拉函数的逆元
}
void init(int n, int m) { //递推预处理相关函数
    for (int j = 1; j <= n; ++j) for (int i = j; i <= n; i += j) (f[i] += 1ll * j * miu[i / j] * inv[j] % mod) %= mod;
    for (int j = 1; j <= n; ++j) {
        int tmp = n / j;
        g[j].assign(tmp + 2, 0); //g[j][0] = 0
        for (int i = 1; i <= tmp; ++i) g[j][i] = (g[j][i - 1] + phi[i * j]) % mod;
    }
    for (int a = 1; a <= m; ++a) for (int b = 1; b <= m; ++b) {
        int tmp = n / max(a, b);
        h[a][b].assign(tmp + 2, 0);
        for (int i = 1; i <= tmp; ++i) h[a][b][i] = (h[a][b][i - 1] + 1ll * f[i] * g[i][a] % mod * g[i][b] % mod) % mod;
    }
}
int calc(int a, int b, int l, int r) { //小块暴力
    int res = 0;
    for (int i = l; i <= r; ++i) (res += 1ll * f[i] * g[i][a] % mod * g[i][b] % mod) %= mod;
    return res;
}
int solve(int n, int m) { //整除分块
    ans = 0;
    for (int l = 1, r; l <= n; l = r + 1) {
        int tmp1 = n / l, tmp2 = m / l;
        r = min(n / tmp1, m / tmp2);
        if (max(tmp1, tmp2) > M) (ans += calc(tmp1, tmp2, l, r)) %= mod;//直接暴力计算
        else (ans += (h[tmp1][tmp2][r] - h[tmp1][tmp2][l - 1]) % mod) %= mod;//预处理出来了
    }
    return ans;
}

} // namespace PhiSum
```

Usage:

```cpp
PhiSum::Linear(1e5), PhiSum::init(1e5, PhiSum::M);
// each query:
if (n > m) swap(n, m);
cout << (PhiSum::solve(n, m) + mod) % mod << '\n';
```

</details>