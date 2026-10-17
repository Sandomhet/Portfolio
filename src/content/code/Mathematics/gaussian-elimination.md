---
title: "Gaussian Elimination"
description: ""
time: "Mon Feb 1, 2024"
---

# Gaussian Elimination

Gauss-Jordan on the augmented matrix `a[1..n][1..m]` ($m = n + 1$). For each column $k$, pick a pivot row, scale it so $a_{k,k} = 1$, then eliminate column $k$ from every other row. After that, a row of all-zero coefficients with nonzero right side means no solution; otherwise such a row means infinitely many solutions. $O(n^3)$

```cpp
bool cmp(int i, int k, int now) {
    if (fabs(fabs(a[i][k]) - fabs(a[now][k])) > eps)//不相等，将大的放上面
        return fabs(a[i][k]) > fabs(a[now][k]);
    for (int j = k + 1; j <= n; ++j)//相等后，找到第一个不等的，将小的放上面
        if (fabs(fabs(a[i][j]) - fabs(a[now][j])) > eps)
            return fabs(a[i][j]) < fabs(a[now][j]);
    return false;
}
void gauss() {
    for (int k = 1; k <= n; ++k) { //枚举对角线
        int now = k;
        for (int i = k + 1; i <= n; ++i) if (cmp(i, k, now)) now = i;
        swap(a[now], a[k]);//使得矩阵方程线性处理
        if (fabs(a[k][k]) < eps) continue;//系数为0
        for (int j = m; j >= k; --j) a[k][j] /= a[k][k];//把当前x系数变为1
        for (int i = 1; i <= n; ++i)
            if (i != k)//把同一列上其他x的系数变为0
                for (int j = m; j >= k; --j) a[i][j] -= a[i][k] * a[k][j];
    }
}
int judge() {
    int res = 1;
    for (int i = 1; i <= n; ++i) {
        int tot = 0;
        for (int j = 1; j <= n; ++j)
            if (fabs(a[i][j]) < eps) tot++;
        if (tot == n) {
            if (fabs(a[i][m]) < eps) res = 0;//无穷解（要先检查完所有行是否无解）
            else return -1;//无解
        }
    }
    if (res == 0) return 0;
    for (int i = 1; i <= n; ++i)//唯一解
        printf("x%d = %.2lf\n", i, a[i][m]);
    return 1;
}
```