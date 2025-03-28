---
title: "Encapsulation"
description: "Several encapsulation struct methods implemented"
time: "Mon Feb 1, 2024"
---

# Encapsulation

## Table of Contents

## 高精度

```cpp
struct sandom_int
{
    static const int w = 9, W = pow(10, w);
    int a[10000];
    sandom_int() { memset(a, 0, sizeof(a)); }
    sandom_int(int x) { *this = x; }
    inline void in()//读入
    {
        string s; cin >> s; int len = s.length();
        for (re i = len - 1; i >= 0; i -= w)
        {
            ++a[0];
            for (re j = max(i - w + 1, 0); j <= i; j++)
                a[a[0]] = a[a[0]] * 10 + s[j] - '0';
        }
    }
    inline void out()//输出
    {
        char s[10]; sprintf(s, "%%0%lldlld", w);
        printf("%lld", a[a[0]]);
        for (re i = a[0] - 1; i >= 1; i--) printf(s, a[i]); putchar('\n');
    }
    //比较大小
    friend bool operator <(sandom_int x, sandom_int y)
    {
        if (x.a[0] != y.a[0]) return x.a[0] < y.a[0];
        for (re i = x.a[0]; i >= 1; i--)
            if (x.a[i] != y.a[i]) return x.a[i] < y.a[i];
        return false;
    }
    friend bool operator >(sandom_int x, sandom_int y) { return y < x; }
    friend bool operator <=(sandom_int x, sandom_int y) { return !(y < x); }
    friend bool operator >=(sandom_int x, sandom_int y) { return !(x < y); }
    friend bool operator ==(sandom_int x, sandom_int y) { return !(x < y || y < x); }
    friend bool operator !=(sandom_int x, sandom_int y) { return x < y || y < x; }
    //五则运算
    friend sandom_int operator +(sandom_int x, sandom_int y)//高精+高精
    {
        sandom_int z; z.a[0] = max(x.a[0], y.a[0]) + 1;
        for (re i = 1; i <= z.a[0]; i++)
        {
            z.a[i] += x.a[i] + y.a[i];
            if (z.a[i] >= W) z.a[i + 1]++, z.a[i] -= W;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator +(sandom_int x, int y) { return x + sandom_int(y); }//高精+低精
    friend sandom_int operator -(sandom_int x, sandom_int y)//高精-高精
    {
        sandom_int z; z.a[0] = x.a[0];
        for (re i = 1; i <= z.a[0]; i++)
        {
            z.a[i] += x.a[i] - y.a[i];
            if (z.a[i] < 0) z.a[i + 1]--, z.a[i] += W;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator -(sandom_int x, int y) { return x - sandom_int(y); }//高精-低精
    friend sandom_int operator *(sandom_int x, sandom_int y)//高精*高精
    {
        sandom_int z; z.a[0] = x.a[0] + y.a[0] + 1;
        for (re i = 1; i <= x.a[0]; i++)
            for (re j = 1; j <= y.a[0]; j++)
            {
                int k = i + j - 1;
                z.a[k] += x.a[i] * y.a[j];
                if (z.a[k] >= W)
                {
                    z.a[k + 1] += z.a[k] / W;
                    z.a[k] %= W;
                }
            }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator *(sandom_int x, int y) { return x * sandom_int(y); }//高精*低精
    friend sandom_int operator /(sandom_int x, sandom_int y)//高精/高精
    {
        sandom_int z; z.a[0] = x.a[0] - y.a[0] + 1;
        for (re i = z.a[0]; i >= 1; i--)
        {
            sandom_int t; t.a[0] = y.a[0] + i - 1;
            for (re j = 1; j <= y.a[0]; j++) t.a[j + i - 1] = y.a[j];
            int l = 0, r = W, mid;
            while (l <= r)
            {
                mid = l + r >> 1;
                if (t * mid <= x) l = mid + 1;
                else r = mid - 1;
            }
            z.a[i] += l - 1, x -= t * (l - 1);
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator /(sandom_int x, int y)//高精/低精
    {
        sandom_int z; z.a[0] = x.a[0];
        for (re i = z.a[0]; i >= 1; i--)
        {
            x.a[i - 1] += (x.a[i] % y) * W;
            z.a[i] = x.a[i] / y;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator %(sandom_int x, sandom_int y) { return x - x / y * y; }//高精%高精
    friend sandom_int operator %(sandom_int x, int y) { return x - x / y * y; }//高精%低精
    //缩略号
    sandom_int operator =(int x)//赋值
    {
        a[0] = 0;
        do { a[++a[0]] = x % W, x /= W; } while(x);
        return *this;
    }
    sandom_int& operator +=(sandom_int x) { return *this = *this + x; }
    sandom_int& operator -=(sandom_int x) { return *this = *this - x; }
    sandom_int& operator *=(sandom_int x) { return *this = *this * x; }
    sandom_int& operator /=(sandom_int x) { return *this = *this / x; }
    sandom_int& operator %=(sandom_int x) { return *this = *this % x; }
    sandom_int& operator +=(int x) { return *this = *this + sandom_int(x); }
    sandom_int& operator -=(int x) { return *this = *this - sandom_int(x); }
    sandom_int& operator *=(int x) { return *this = *this * sandom_int(x); }
    sandom_int& operator /=(int x) { return *this = *this / x; }
    sandom_int& operator %=(int x) { return *this = *this % x; }
};
```

## 分数

```cpp
int n, m, ans;
struct frac
{
    int a, b;
    frac () { a = 0, b = 1; }
    frac (int x, int y) { a = x, b = y; }
    frac deal() { return frac(a / gcd(a, b), b / gcd(a, b)); }
    //比较
    friend bool operator <(frac x, frac y) { return x.a * y.b < y.a * x.b; }
    friend bool operator >(frac x, frac y) { return y < x; }
    friend bool operator <=(frac x, frac y) { return !(y < x); }
    friend bool operator >=(frac x, frac y) { return !(x < y); }
    friend bool operator ==(frac x, frac y) { return !(x < y || y < x); }
    friend bool operator !=(frac x, frac y) { return x < y || y < x; }
    //四则运算
    friend frac operator +(frac x, frac y) { return frac((x.a * y.b + x.b * y.a), x.b * y.b).deal(); }
    friend frac operator -(frac x, frac y) { return frac((x.a * y.b - x.b * y.a), x.b * y.b).deal(); }
    friend frac operator *(frac x, frac y) { return frac(x.a * y.a, x.b * y.b).deal(); }
    friend frac operator /(frac x, frac y) { return (x * frac(y.b, y.a)).deal(); }
    //缩略号
    frac& operator +=(frac x) { return *this = *this + x; }
    frac& operator -=(frac x) { return *this = *this - x; }
    frac& operator *=(frac x) { return *this = *this * x; }
    frac& operator /=(frac x) { return *this = *this / x; }
};
```

## 模数非质数的拆分

```cpp
int pc[10], phi;
struct divnum
{
    int a, pr[10];
    divnum() { memset(pr, 0, sizeof(pr)); a = 1; }
    divnum(int x) { *this = x; }
    friend divnum operator *(divnum x, divnum y)
    {
        divnum z; z.a = x.a * y.a % p;
        rep(i, 1, pc[0]) z.pr[i] = x.pr[i] + y.pr[i];
        return z;
    }
    friend divnum operator /(divnum x, divnum y)
    {
        divnum z; z.a = x.a * qpow(y.a, phi - 1, p) % p;
        rep(i, 1, pc[0]) z.pr[i] = x.pr[i] - y.pr[i];
        return z;
    }
    divnum operator =(int x)
    {
        rep(i, 1, pc[0])
        {
            pr[i] = 0;
            while (x % pc[i] == 0) pr[i]++, x /= pc[i];
        }
        a = x; return *this;
    }
    friend divnum operator *(divnum x, int y) { return x * divnum(y); }
    friend divnum operator /(divnum x, int y) { return x / divnum(y); }
};
```

## FFT 优化高精乘

```cpp
struct poly
{
    static const int L = 1e4;
    const double PI = acos(-1.0);
    int rev[L], bit;
    // complex <double> f[Z], g[Z], h[Z];
    void get_rader(int &k)
    {
        int bit = log2(k) + 1; k = 1 << bit;
        for (re i = 0; i < k; ++i) rev[i] = rev[i >> 1] >> 1 | (i & 1) << bit - 1;
    }
    void FFT(complex <double> a[], int n, int opt)
    {
        for (re i = 1; i < n; ++i) if (rev[i] > i) swap(a[i], a[rev[i]]);
        for (re m = 1; m < n; m <<= 1)
        {
            complex <double> W(cos(PI / m), opt * sin(PI / m));
            for (re i = 0; i < n; i += m << 1)
            {
                complex <double> w(1.0, 0.0);
                for (re j = 0; j < m; ++j, w *= W)
                {
                    complex <double> x = a[i + j], y = w * a[i + j + m];
                    a[i + j] = x + y, a[i + j + m] = x - y;
                }
            }
        }
    }
    void IFFT(complex <double> a[], int n)
    {
        FFT(a, n, -1);
        for (re i = 0; i < n; ++i) a[i] = a[i].real() / n + 0.5;
    }
}; poly T;

struct sandom_int
{
    static const int w = 5, W = pow(10, w), L = 1e4;
    int a[L];
    sandom_int() { memset(a, 0, sizeof(a)); }
    sandom_int(int x) { *this = x; }
    inline void in()//读入
    {
        string s; cin >> s; int len = s.length();
        for (re i = len - 1; i >= 0; i -= w)
        {
            ++a[0];
            for (re j = max(i - w + 1, 0); j <= i; j++)
                a[a[0]] = a[a[0]] * 10 + s[j] - '0';
        }
    }
    inline void out()//输出
    {
        char s[10]; sprintf(s, "%%0%lldlld", w);
        printf("%lld", a[a[0]]);
        for (re i = a[0] - 1; i >= 1; i--) printf(s, a[i]); putchar('\n');
    }
    //比较大小
    friend bool operator <(sandom_int x, sandom_int y)
    {
        if (x.a[0] != y.a[0]) return x.a[0] < y.a[0];
        for (re i = x.a[0]; i >= 1; i--)
            if (x.a[i] != y.a[i]) return x.a[i] < y.a[i];
        return false;
    }
    friend bool operator >(sandom_int x, sandom_int y) { return y < x; }
    friend bool operator <=(sandom_int x, sandom_int y) { return !(y < x); }
    friend bool operator >=(sandom_int x, sandom_int y) { return !(x < y); }
    friend bool operator ==(sandom_int x, sandom_int y) { return !(x < y || y < x); }
    friend bool operator !=(sandom_int x, sandom_int y) { return x < y || y < x; }
    //五则运算
    friend sandom_int operator +(sandom_int x, sandom_int y)//高精+高精
    {
        sandom_int z; z.a[0] = max(x.a[0], y.a[0]) + 1;
        for (re i = 1; i <= z.a[0]; i++)
        {
            z.a[i] += x.a[i] + y.a[i];
            if (z.a[i] >= W) z.a[i + 1]++, z.a[i] -= W;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator +(sandom_int x, int y) { return x + sandom_int(y); }//高精+低精
    friend sandom_int operator -(sandom_int x, sandom_int y)//高精-高精
    {
        sandom_int z; z.a[0] = x.a[0];
        for (re i = 1; i <= z.a[0]; i++)
        {
            z.a[i] += x.a[i] - y.a[i];
            if (z.a[i] < 0) z.a[i + 1]--, z.a[i] += W;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator -(sandom_int x, int y) { return x - sandom_int(y); }//高精-低精
    friend sandom_int operator *(sandom_int x, sandom_int y)//高精*高精
    {
        complex <double> F[L], G[L];
        sandom_int z; z.a[0] = x.a[0] + y.a[0] + 1;
        T.get_rader(z.a[0]);
        for (re i = 1; i <= z.a[0]; ++i) F[i - 1] = x.a[i], G[i - 1] = y.a[i];
        T.FFT(F, z.a[0], 1), T.FFT(G, z.a[0], 1);
        for (re i = 0; i <= z.a[0]; ++i) F[i] *= G[i];
        T.IFFT(F, z.a[0]);
        for (re i = 1; i <= z.a[0]; ++i)
        {
            z.a[i] += F[i - 1].real();
            z.a[i + 1] += z.a[i] / W;
            z.a[i] = z.a[i] % W;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator *(sandom_int x, int y) { return x * sandom_int(y); }//高精*低精
    friend sandom_int operator /(sandom_int x, sandom_int y)//高精/高精
    {
        sandom_int z; if (x < y) return z;  z.a[0] = x.a[0] - y.a[0] + 1;
        for (re i = z.a[0]; i >= 1; i--)
        {
            sandom_int t; t.a[0] = y.a[0] + i - 1;
            for (re j = 1; j <= y.a[0]; j++) t.a[j + i - 1] = y.a[j];
            int l = 0, r = W, mid;
            while (l <= r)
            {
                mid = l + r >> 1;
                if (t * mid <= x) l = mid + 1;
                else r = mid - 1;
            }
            z.a[i] += l - 1, x -= t * (l - 1);
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator /(sandom_int x, int y)//高精/低精
    {
        sandom_int z; z.a[0] = x.a[0];
        for (re i = z.a[0]; i >= 1; i--)
        {
            x.a[i - 1] += (x.a[i] % y) * W;
            z.a[i] = x.a[i] / y;
        }
        while (z.a[0] && !z.a[z.a[0]]) z.a[0]--;
        return z;
    }
    friend sandom_int operator %(sandom_int x, sandom_int y) { return x - x / y * y; }//高精%高精
    friend sandom_int operator %(sandom_int x, int y) { return x - x / y * y; }//高精%低精
    //缩略号
    sandom_int operator =(int x)//赋值
    {
        a[0] = 0;
        do { a[++a[0]] = x % W, x /= W; } while(x);
        return *this;
    }
    sandom_int& operator +=(sandom_int x) { return *this = *this + x; }
    sandom_int& operator -=(sandom_int x) { return *this = *this - x; }
    sandom_int& operator *=(sandom_int x) { return *this = *this * x; }
    sandom_int& operator /=(sandom_int x) { return *this = *this / x; }
    sandom_int& operator %=(sandom_int x) { return *this = *this % x; }
    sandom_int& operator +=(int x) { return *this = *this + sandom_int(x); }
    sandom_int& operator -=(int x) { return *this = *this - sandom_int(x); }
    sandom_int& operator *=(int x) { return *this = *this * sandom_int(x); }
    sandom_int& operator /=(int x) { return *this = *this / x; }
    sandom_int& operator %=(int x) { return *this = *this % x; }
};
```
