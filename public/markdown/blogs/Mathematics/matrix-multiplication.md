---
title: "Matrix Multiplication"
description: "C++ code of matrix multiplication implementation."
time: "Mon Feb 1, 2024"
---

# Matrix Multiplication

$$C_{i,j} = \sum_{k} A_{i,k} B_{k,j}$$

Fast power: $A^b$ in $O(n^3 \log b)$. A linear recurrence $f_i = \sum_{j=1}^{n} c_j f_{i-j}$ becomes $F_i = A F_{i-1}$ with an $n \times n$ transition matrix $A$, so $F_i = A^{i} F_0$.

```cpp
struct matrix {
    int a[10][10];
    matrix () { memset(a, 0, sizeof(a)); }
    inline friend matrix operator *(const matrix& A, const matrix& B) {
        matrix C;
        for (int i = 1; i <= n; ++i)
            for (int k = 1; k <= n; ++k)
                for (int j = 1; j <= n; ++j)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
        return C;
    }
}; 
matrix binpow(matrix base, int b) {
    matrix res;
    for (int i = 1; i <= n; ++i) res.a[i][i] = 1; // identity
    while (b) {
        if (b & 1) res = res * base;
        base = base * base;
        b >>= 1;
    }
    return res;
}
```
