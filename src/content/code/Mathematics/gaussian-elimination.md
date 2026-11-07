---
title: "Gaussian Elimination"
description: ""
time: "Mon Feb 1, 2024"
---

# Gaussian Elimination

Gauss-Jordan on the augmented matrix `a[1..n][1..n+1]`. For each column $k$, pick a pivot row, scale it so $a_{k,k} = 1$, then eliminate column $k$ from every other row. After that, a row of all-zero coefficients with a nonzero right side means no solution; otherwise a column without a pivot (a free variable) means infinitely many solutions. $O(n^3)$

```cpp
// solves a[1..n][1..n] x = a[.][n + 1]; returns 1 unique (x filled), 0 infinitely many, -1 none
int gauss(int n, vector<vector<double>> a, vector<double> &x) {
    const double eps = 1e-9;
    int r = 1; vector<int> where(n + 1, 0); // where[col] = pivot row
    for (int c = 1; c <= n && r <= n; c++) { //枚举列
        int piv = r;
        for (int i = r + 1; i <= n; i++) if (fabs(a[i][c]) > fabs(a[piv][c])) piv = i; //绝对值最大的放上面
        if (fabs(a[piv][c]) < eps) continue; //系数为0
        swap(a[piv], a[r]);
        for (int j = n + 1; j >= c; j--) a[r][j] /= a[r][c]; //把当前x系数变为1
        for (int i = 1; i <= n; i++) if (i != r && fabs(a[i][c]) > eps) //把同一列上其他x的系数变为0
            for (int j = n + 1; j >= c; j--) a[i][j] -= a[i][c] * a[r][j];
        where[c] = r++;
    }
    for (int i = r; i <= n; i++) if (fabs(a[i][n + 1]) > eps) return -1; //0 = nonzero: 无解
    x.assign(n + 1, 0);
    for (int c = 1; c <= n; c++) if (where[c]) x[c] = a[where[c]][n + 1];
    return r <= n ? 0 : 1; //有自由元：无穷解
}
```

Usage:

```cpp
vector<vector<double>> a(n + 1, vector<double>(n + 2)); // a[i][n + 1] = right-hand side
vector<double> x;
int res = gauss(n, a, x);
if (res == 1) for (int i = 1; i <= n; i++) printf("x%d = %.2lf\n", i, x[i]);
```

### Modulo a Prime

The same elimination with modular inverses. Also gives the rank and the determinant.

```cpp
ll det_mod(int n, vector<vector<ll>> a, ll p = mod) { // determinant of a[1..n][1..n] mod prime p
    auto pw = [&](ll x, ll e) { ll r = 1; for (x %= p; e; e >>= 1, x = x * x % p) if (e & 1) r = r * x % p; return r; };
    ll det = 1;
    for (int c = 1; c <= n; c++) {
        int piv = c;
        while (piv <= n && a[piv][c] % p == 0) piv++;
        if (piv > n) return 0;
        if (piv != c) swap(a[piv], a[c]), det = (p - det) % p; //交换两行，行列式变号
        det = det * (a[c][c] % p + p) % p;
        ll iv = pw((a[c][c] % p + p) % p, p - 2);
        for (int i = c + 1; i <= n; i++) {
            ll f = (a[i][c] % p + p) % p * iv % p;
            if (f) for (int j = c; j <= n; j++) a[i][j] = ((a[i][j] - f * a[c][j]) % p + p) % p;
        }
    }
    return det;
}
```

### XOR Equations

Over GF(2) each row is a `bitset`, and elimination is `xor`. $O(n^3 / 64)$.

```cpp
const int MAXV = 2005; // number of variables + 2
// m equations a[1..m] (a.size() == m + 1), variables x[1..n], a[i][n + 1] = rhs; returns rank, -1 if none
int gauss_xor(int n, int m, vector<bitset<MAXV>> a, bitset<MAXV> &x) {
    int r = 1; vector<int> where(n + 1, 0);
    for (int c = 1; c <= n && r <= m; c++) {
        int piv = r;
        while (piv <= m && !a[piv][c]) piv++;
        if (piv > m) continue;
        swap(a[piv], a[r]), where[c] = r;
        for (int i = 1; i <= m; i++) if (i != r && a[i][c]) a[i] ^= a[r];
        r++;
    }
    for (int i = r; i <= m; i++) if (a[i][n + 1]) return -1;
    x.reset();
    for (int c = 1; c <= n; c++) if (where[c]) x[c] = a[where[c]][n + 1]; // free variables = 0
    return r - 1;
}
```