---
title: "Fast Fourier Transform (FFT)"
description: ""
time: "Mon Feb 1, 2024"
---

# Fast Fourier Transform (FFT)

递归版本

```cpp
void FFT(complex <double> a[], int n, int opt)//系数表达转点值表达
{
    if (n == 1) return;//递归边界
    int m = n >> 1;
    complex <double> x[m], y[m];
    for (re i = 0; i < m; ++i)//奇数与偶数分开
        x[i] = a[i << 1], y[i] = a[i << 1 | 1];
    FFT(x, m, opt), FFT(y, m, opt);//分治处理
    complex <double> W = (cos(PI / m), opt * sin(PI / m)), w = (1.0, 0.0);
    for (re i = 0; i < m; ++i, w *= W)//权值汇总
    {
        a[i] = x[i] + w * y[i];//左半部分
        a[i + m] = x[i] - w * y[i];//右半部分
    }
}
```

迭代版本

```cpp
int rev[Z];
void get_rader()
{
    bit = log2(n + m) + 1; k = 1 << bit;//强制达到2的幂级
    for (re i = 0; i < k; ++i) rev[i] = rev[i >> 1] >> 1 | (i & 1) << bit - 1;
}
void FFT(complex <double> a[], int n, int opt)//系数表达转点值表达
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
```

逆变换

```cpp
void IFFT(complex <double> a[], int n)//点值表达转系数表达
{
    FFT(a, n, -1);
    rep(i, 0, n) a[i] = a[i].real() / n;
}
```