---
title: "Fast Fourier Transform (FFT)"
description: "FFT is an efficient algorithm for computing the Discrete Fourier Transform (DFT) and its inverse, which has applications in polynomial multiplication, signal processing, and more."
time: "Mon May 4, 2026"
---

# Fast Fourier Transform (FFT)

## Polynomial Representation

1. **Coefficient Representation**: A polynomial $P(x)$ of degree $n-1$ can be represented by its coefficients as $P(x) = a_0 + a_1 x + \ldots + a_{n-1} x^{n-1}$, where $a_i$ is the coefficient of $x^i$.
2. **Point-Value Representation**: represented by its values at specific points, a set of pairs $(x_i, P(x_i))$.

## FFT by Divide and Conquer

- Input: A polynomial $A(x)$ of degree $n-1$ with $n$ coefficients, where $n$ is a power of 2.
- Output: values at the $n$-th roots of unity. $A(\omega_n^k)$ for $k = 0, 1, \ldots, n-1$.

Discrete Fourier Transform (DFT): $\text{DFT}(a_0, a_1, \ldots, a_{n-1}) = [A(\omega_n^0), A(\omega_n^1), \ldots, A(\omega_n^{n-1})]$.  
Inverse DFT: $\text{IDFT}(A_0, A_1, \ldots, A_{n-1}) = [a_0, a_1, \ldots, a_{n-1}]$.

$$
\begin{aligned}
A(x) &= a_0 + a_1 x + \ldots + a_{n-1} x^{n-1} \\
&= (a_0 + a_2 x^2 + \ldots + a_{n-2} x^{n-2}) + (a_1x + a_3 x^3 + \ldots + a_{n-1} x^{n-1}) \\
&= (a_0 + a_2 x^2 + \ldots + a_{n-2} x^{n-2}) + x (a_1 + a_3 x^2 + \ldots + a_{n-1} x^{n-2}) \\
&= A_{\text{even}}(x^2) + x A_{\text{odd}}(x^2)
\end{aligned}
$$
where with the terms $[0, y, y^2, \ldots, y^{\frac{n}{2}-1}]$. 
$$
A_{\text{even}}(y) = [a_0, a_2, \ldots, a_{n-2}] \cdot [0, y, y^2, \ldots, y^{\frac{n}{2}-1}] \\
A_{\text{odd}}(y) = [a_1, a_3, \ldots, a_{n-1}] \cdot [0, y, y^2, \ldots, y^{\frac{n}{2}-1}]
$$

Replace $x$ with $\omega_n^k$ and use the property $\omega_n^{2k} = \omega_{n/2}^k$ to get:
$$
A(\omega_n^k) = A_{\text{even}}(\omega_n^{2k}) + \omega_n^k A_{\text{odd}}(\omega_n^{2k}) = A_{\text{even}}(\omega_{n/2}^k) + \omega_n^k A_{\text{odd}}(\omega_{n/2}^k) \\
A(\omega_n^{k+n/2}) = A_{\text{even}}(\omega_n^{2k}) + \omega_n^{k+n/2} A_{\text{odd}}(\omega_n^{2k}) = A_{\text{even}}(\omega_{n/2}^k) - \omega_n^k A_{\text{odd}}(\omega_{n/2}^k)
$$

## Inverse FFT

To compute the inverse FFT, we can use the same algorithm with a slight modification. Instead of using $\omega_n^k$, we use $\omega_n^{-k}$, and after computing the FFT, we divide each result by $n$ to get the original coefficients.

$$
A(\omega_n^{-k}) = A_{\text{even}}(\omega_{n/2}^{-k}) + \omega_n^{-k} A_{\text{odd}}(\omega_{n/2}^{-k}) \\
A(\omega_n^{-k+n/2}) = A_{\text{even}}(\omega_{n/2}^{-k}) - \omega_n^{-k} A_{\text{odd}}(\omega_{n/2}^{-k})
$$

### Proof

Let matrix $M$ be the DFT matrix
$$
M(\omega_n^1) = \begin{bmatrix}
\omega_n^0 & \omega_n^0 & \omega_n^0 & \ldots & \omega_n^0 \\
\omega_n^0 & \omega_n^1 & \omega_n^2 & \ldots & \omega_n^{n-1} \\
\omega_n^0 & \omega_n^2 & \omega_n^4 & \ldots & \omega_n^{2(n-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
\omega_n^0 & \omega_n^{n-1} & \omega_n^{2(n-1)} & \ldots & \omega_n^{(n-1)(n-1)}
\end{bmatrix}, 
M(\omega_n^{-1}) = \begin{bmatrix}
\omega_n^0 & \omega_n^0 & \omega_n^0 & \ldots & \omega_n^0 \\
\omega_n^0 & \omega_n^{-1} & \omega_n^{-2} & \ldots & \omega_n^{-(n-1)} \\
\omega_n^0 & \omega_n^{-2} & \omega_n^{-4} & \ldots & \omega_n^{-2(n-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
\omega_n^0 & \omega_n^{-(n-1)} & \omega_n^{-2(n-1)} & \ldots & \omega_n^{-(n-1)(n-1)}
\end{bmatrix}
$$

Since $M(\omega_n^1) M(\omega_n^{-1}) = nI$, so $M(\omega_n^1)^{-1} = \frac{1}{n} M(\omega_n^{-1})$,

## Code

$O(n \log n)$

递归版本

```cpp
using cd = complex<double>;
const double PI = acos(-1.0);
void FFT(vector<cd> &a, int invert) //系数表达转点值表达
{
    int n = a.size(), m = n >> 1;
    if (n == 1) return; //递归边界
    vector<cd> a0(m), a1(m);
    for (int i = 0; i < m; ++i) //奇数与偶数分开
        a0[i] = a[i << 1], a1[i] = a[i << 1 | 1];
    FFT(a0, invert), FFT(a1, invert); //分治处理
    cd w(1.0, 0.0), wn = (cos(PI / m), invert * sin(PI / m));
    for (int i = 0; i < m; ++i, w *= wn) //权值汇总
    {
        a[i] = a0[i] + w * a1[i]; //左半部分
        a[i + m] = a0[i] - w * a1[i]; //右半部分
        // if (invert) a[i] /= 2, a[i + m] /= 2; //逆变换时除以n
    }
}
```

迭代版本

```cpp
int rev[Z];
void get_rader()
{
    bit = log2(n + m) + 1; k = 1 << bit;//强制达到2的幂级
    for (int i = 0; i < k; ++i) rev[i] = rev[i >> 1] >> 1 | (i & 1) << bit - 1;
}
void FFT(complex <double> a[], int n, int opt)//系数表达转点值表达
{
    for (int i = 1; i < n; ++i) if (rev[i] > i) swap(a[i], a[rev[i]]);
    for (int m = 1; m < n; m <<= 1)
    {
        complex <double> W(cos(PI / m), opt * sin(PI / m));
        for (int i = 0; i < n; i += m << 1)
        {
            complex <double> w(1.0, 0.0);
            for (int j = 0; j < m; ++j, w *= W)
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
void IFFT(vector<cd> &a) //point-value to coefficient
{
    int n = a.size();
    FFT(a, -1);
    for (int i = 0; i < n; ++i) a[i] = a[i].real() / n;
}
```

## Polynomial Multiplication

Input: Two polynomials $A(x)$ and $B(x)$ represented by their coefficients.  
Output: The coefficients of the product polynomial $C(x) = A(x) \cdot B(x)$. (Convolution of coefficients)  
- $A(x) = a_0 + a_1 x + \ldots + a_{n-1} x^{n-1}$, where $a_i$ is the coefficient of $x^i$.
- $B(x) = b_0 + b_1 x + \ldots + b_{n-1} x^{n-1}$, where $b_j$ is the coefficient of $x^j$.
- $C(x) = c_0 + c_1 x + \ldots + c_{2n-2} x^{2n-2}$, where $c_k = \sum\limits_{i=0}^{k} a_i b_{k-i}$.

Naive approach: $O(n^2)$ time by directly computing each coefficient of $C$

We need to extend the coefficients of $A$ and $B$ to length that is at least $2n-1$ and is a power of 2.

FFT Algorithm workflow:
1. Compute the FFT of both polynomials to get their point-value representations.
2. Perform point-wise multiplication of the two FFT results.
3. Compute the inverse FFT of the product to get the coefficients of the resulting polynomial.

```cpp
void multiply(vector<int> &a, vector<int> &b, vector<int> &c)
{
    int n = 1;
    while (n < a.size() + b.size()) n <<= 1; // Find the next power of 2
    vector<cd> A(a.begin(), a.end()), B(b.begin(), b.end()), C(n);
    A.resize(n), B.resize(n);
    FFT(A, 1); // Forward FFT on A
    FFT(B, 1); // Forward FFT on B
    for (int i = 0; i < n; ++i) C[i] = A[i] * B[i]; // Point-wise multiplication
    IFFT(C); // Inverse FFT to get the coefficients of the product polynomial
    c.resize(a.size() + b.size() - 1);
    for (int i = 0; i < c.size(); ++i) c[i] = round(C[i].real());
}
```

## Applications of FFT

- **Polynomial Multiplication**: As described above, FFT can be used to multiply two polynomials efficiently.
- **Signal Processing**: FFT is widely used in signal processing for analyzing the frequency components of signals.
- **Image Processing**: FFT can be used for image filtering and compression.
- **Convolution**: FFT can be used to compute the convolution of two sequences efficiently, which is useful in various applications such as digital signal processing and machine learning.
- **Fast Multiplication of Large Integers**: By representing large integers as polynomials, FFT can be used to multiply them efficiently.

Linear Filter: $y[n] = \sum\limits_{k=0}^{M-1} h[k] x[n-k]$

### Mean Filter

Replace $y_i$ with the average of its neighbors:
$$ \hat{y_i} = \frac{1}{2m+1} \sum\limits_{j=-m}^{m} y_{i+j} $$

Let $h = \frac{1}{2m+1} [1, 1, \ldots, 1]$ (a filter of length $2m+1$), then the mean filter can be expressed as a convolution:
$$ \hat{y} = h * y $$

### Gaussian Filter

Replace $y_i$ with a weighted average of its neighbors, wheint the weights are determined by a Gaussian function:
$$ \hat{y_i} = \frac{1}{\sqrt{2\pi}\sigma} \sum\limits_{j=-m}^{m} e^{-\frac{j^2}{2\sigma^2}} y_{i+j} $$

Let $h_j = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{j^2}{2\sigma^2}}$ for $j = -m, \ldots, m$, then the Gaussian filter can also be expressed as a convolution:
$$ \hat{y} = h * y $$