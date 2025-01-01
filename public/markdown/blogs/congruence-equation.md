# Congruence Equation

## Table of Contents

## 线性（一次）同余方程

$ax\equiv c \pmod b$ --> $ax-c=by(y\in Z)$ -> $ax-by=c$，求$x$的最小非负整数解。

### 扩展欧几里得算法

**Bezout定理**：$\forall a, b\in Z,\exists x, y\in Z$, 满足$ax+by=gcd(a,b)$

推导证明：
当$exgcd$递归到边界时，$b=0$，显然有$a*1+0*0=gcd(a,0)$->令$x=1,y=0$.
考虑递归返回过程，$gcd(a,b)=gcd(b,a\%b)$.假设存在x,y满足$bx+(a\%b)y=gcd(b,a\%b)$，因为$a\%b=a-b\lfloor a/b\rfloor$
，所以有$ay+b(x-\lfloor a/b\rfloor y = gcd(a, b))$，那么新的一组解为$X=y, Y=x-\lfloor a/b\rfloor y$

对于更一般的情况，$ax+by=c$，当且仅当$gcd(a,b)|c$，方程有整数解。这时，只需给$x,y$乘上$c/gcd$即可。
更进一步，方程的通解表示为
$$x=\frac{c}{gcd}x_0+k\frac{b}{gcd}\qquad y=\frac{c}{gcd}y_0-k\frac{a}{gcd} (k\in Z)$$

证明：
$$
\begin{aligned}
设\ x_1=\frac{c}{gcd}x_0, &\quad y_1=\frac{c}{gcd}y_0 \\
有\ ax+by&=ax_1+by_1=c， \\
a(x-x_1)&=b(y_1-y)  \\
\frac{a}{gcd}(x-x_1)&=\frac{b}{gcd}(y_1-y)  \\
\because gcd(\frac{a}{gcd}, \frac{b}{gcd})&=1 \\
\therefore x-x_1=k\frac{b}{gcd},& \quad y_1-y=k\frac{a}{gcd} \\
x=x_1+k\frac{b}{gcd},& \quad y=y_1-k\frac{a}{gcd} \\  
\end{aligned}
$$

```cpp
inline int exgcd(int a, int b, int& x, int& y)//a*x + b*y = 1;
{
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, x, y);
    int z = x;
    x = y, y = z - a / b * y;
    return gcd;
}
inline int exgcd(int a, int b, int& x, int& y)//a*x + b*y = 1;
{
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, y, x);//直接交换传参
    y -= a / b * x;
    return gcd;
}
inline int solve(int a, int b, int c)//a*x + b*y = c;
{
    int x, y, g = exgcd(a, b, x, y);
    if (c % g) return -1;//无解
    a /= g, b /= g, c /= g;
    //只要求x为最小非负整数解，而y可以为负数
    x = (x * c % b + b) % b;
    return x;
    //x和y都要求为非负整数解
    while (x > 0 || y < 0) x -= b, y += a;
    x = -x, y = y;
}
```

## 高次同余方程

$a^x\equiv b \pmod p$。$(a, p)$互质，求解$x$的最小非负整数解。

### BSGS(Baby Step, Giant Step)算法

设$x=i*t-j$，其中$t=\lceil\sqrt{p}\rceil，j\in[0,t-1]$，则方程变为$a^{i*t-j}\equiv b\pmod{p}$
，进一步有$(a^t)^i \equiv b*a^j \pmod p$。

对于所有的$j$，把$b*a^{j}\pmod p$全部插入$hash$表，枚举$i$，计算出$(a^t)^i$，在$hash$
表中查找，如果有，更新答案。最优时间复杂度为$t=\sqrt{p}$，为O($\sqrt{p}$)。

```cpp
int BSGS(int a, int b, int p)//a^x≡b (mod p)
{
    map <int, int> hash; hash.clear();//多次调用时，把map定义放在外面
    b %= p;
    int t = sqrt(p) + 1;
    for (int j = 0; j < t; ++j) hash[b * qpow(a, j, p) % p] = j;
    a = qpow(a, t, p);
    if (a == 0) return b == 0 ? 1 : -1;
    for (int i = 0; i <= t; ++i)
    {
        int val = qpow(a, i, p);
        int j = hash.find(val) == hash.end() ? -1 : hash[val];
        if (j >= 0 && i * t - j >= 0) return i * t - j;
    }
    return -1;//无解
}
```

## 一元线性同余方程组

$$
\begin{cases}
x &\equiv a_1 \pmod{m_1} \\
x &\equiv a_2 \pmod{m_2} \\
&\vdots \\
x &\equiv a_n \pmod{m_n} \\
\end{cases}
$$

### 中国剩余定理（物不知数）

当$m_1,m_2,\dots,m_n$两两互质时，设$M=\prod_{i=1}^{n}m_i,\; c_i=\frac{M}{m_i},\; t_i$
是线性同余方程$c_it_i\equiv1\pmod{m_i}$的一个解，也就是$c_i$在$\pmod{m_i}$意义下的逆元。那么$x$在模$M$
有唯一解$x=\sum\limits_{i=1}^{n}a_ic_it_i \pmod{M}$，有通解$x=kM+\sum\limits_{i=1}^{n}a_ic_it_i(k\in Z)$

#### 证明

对于所有$j\ne i$，因为$c_j=\frac{M}{m_j}$，所以因数中包含$m_i$，所以$c_j\equiv 0\pmod{m_i}$
，也即$a_jc_jt_j\equiv 0\pmod{m_i}$。因为$c_it_i\equiv1\pmod{m_i}$，所以$a_ic_it_i\equiv a_i\pmod{m_i}$
，那么$\sum\limits_{i=1}^{n}a_ic_it_i\equiv a_i\pmod{m_i}$。同理可知$x$满足所有$n$个方程，解成立。

```cpp
int CRT(int n, int a[], int m[])//中国剩余定理
{
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i)
    {
        int c = M / m[i], t, y;//除m[i]以外所有模数的倍数
        exgcd(c, m[i], t, y);//c*t≡1(mod m[i])
        ans += a[i] * c * t % M;//∑ a[i]*c[i]*t[i]
        ans = (ans % M + M) % M;
    }
    return ans;
}
```

### 扩展中国剩余定理（模数不互质）

先来考虑只有两个方程的情况。设方程分别是$x\equiv a_1\pmod{m_1}，x\equiv a_2\pmod{m_2}$
，则得到不定方程$x=m_1p+a_1=m_2q+a_2$。
移项得$m_1p-m_2q=a_2-a_1$，首先当$gcd(m_1, m_2) \nmid (a_2-a_1)$，方程无解；否则，可以得到一组可行解$p、q$
。令$a'=m_1p+a_1，M=lcm(m_1,m_2)$，合并得到同余方程$x\equiv a'\pmod{M}$，多个方程的话两两合并即可。

```cpp
int calc(int a, int b, int c)//ax+by=c
{
    int x, y, d = exgcd(a, b, x, y);
    if (c % d) return -1;
    a /= d, b /= d, c /= d;
    return (x * c % b + b) % b;
}
int EXCRT(int n, int a[], int m[])//扩展中国剩余定理
{
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i)
    {
        int x = calc(M, m[i], a[i] - ans);//M*x≡a[i]-ans(mod m[i])
        if (x == -1) return -1;//判断无解
        ans += x * M;//∑ ans+x[i]*M
        M = lcm(M, m[i]);//更新前i个数的lcm
        ans = (ans % M + M) % M;
    }
    return ans;
}
```