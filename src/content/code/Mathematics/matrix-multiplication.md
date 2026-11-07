---
title: "Matrix Multiplication"
description: "C++ code of matrix multiplication implementation."
time: "Mon Feb 1, 2024"
---

# Matrix Multiplication

$$C_{i,j} = \sum_{k} A_{i,k} B_{k,j}$$

Fast power: $A^b$ in $O(n^3 \log b)$. A linear recurrence $f_i = \sum_{j=1}^{n} c_j f_{i-j}$ becomes $F_i = A F_{i-1}$ with an $n \times n$ transition matrix $A$, so $F_i = A^{i} F_0$.

```cpp
struct Matrix { // square, 1-indexed, entries mod `mod`
    int n; vector<vector<ll>> a;
    Matrix(int n, bool id = false) : n(n), a(n + 1, vector<ll>(n + 1)) { if (id) for (int i = 1; i <= n; i++) a[i][i] = 1; }
    vector<ll> &operator[](int i) { return a[i]; }
    friend Matrix operator*(const Matrix &A, const Matrix &B) {
        Matrix C(A.n);
        for (int i = 1; i <= A.n; ++i)
            for (int k = 1; k <= A.n; ++k) if (A.a[i][k])
                for (int j = 1; j <= A.n; ++j)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
        return C;
    }
};
Matrix mpow(Matrix base, ll b) {
    Matrix res(base.n, true); // identity
    for (; b; b >>= 1, base = base * base)
        if (b & 1) res = res * base;
    return res;
}
```

Usage:

```cpp
// Fibonacci: (F[i], F[i-1]) = A * (F[i-1], F[i-2])
Matrix A(2);
A[1][1] = A[1][2] = A[2][1] = 1;
Matrix P = mpow(A, k);
ll Fk = P[2][1]; // F[k] with F[0] = 0, F[1] = 1
```
