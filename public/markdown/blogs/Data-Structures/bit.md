---
title: "Binary Indexed Tree (BIT)"
description: "efficiently compute prefix sums of the values and update the values."
time: "Mon Feb 1, 2024"
---

# Binary Indexed Tree (BIT)

树状数组（基础操作）

```cpp
class BIT {
public:
    vector<int> c;
    inline int lowbit(int x) { return x & -x; } //基本二分
    inline void update(int x, int y) //修改原数组下标为x的数据
    {
        int sub = x;
        for (int i = x; i <= n; i += lowbit(i))
        {
            c[i] += y;
            //sum1[i] += y;
            //sum2[i] += y * (sub - 1);
        }
    }
    inline int getsum(int x) //在原数组下标为x之前的所有数据的和
    {
        int res = 0, sub = x;
        for (int i = x; i; i -= lowbit(i))
        {
            res += c[i];
            //res += sub * sum1[i] - sum2[i];
        }
        return res;
    }
}
signed main()
{
    //单点更新+区间查询
    for (int i = 1; i <= n; ++i)  a[i] = read(), update(i, a[i]);
    update(point, value);
    int sum = getsum(right_) - getsum(left_ - 1);
    //区间更新+单点查询（差分）
    for (int i = 1; i <= n; ++i)  a[i] = read(), update(i, a[i] - a[i - 1]);
    update(left_point, value);  update(right_point + 1, -value);
    int sum = getsum(point);
    //区间更新+区间查询（不同处在函数内部注释部分）
    for (int i = 1; i <= n; ++i)  a[i] = read(), update(i, a[i] - a[i - 1]);
    update(left_point, value);  update(right_point + 1, -value);
    int sum= getsum(right_) - getsum(left_ - 1);
}
```

求逆序对

```cpp
//求逆序对（a离散化后为b）
inline void update(int x, int y)//修改原数组下标为x的数据
{
    for (int i = x; i <= n; i += lowbit(i)) c[i]++;
}
inline int getsum(int x)//在原数组下标为x之前的所有数据的和
{
    int res = 0;
    for (int i = x; i; i -= lowbit(i)) res += c[i];
    return res;
}
signed main()
{
    for (int i = 1; i <= n; ++i)
    {
        update(b[i] + 1);
        res += i - getsum(b[i] + 1);
    }
    return 0;
}
```

二维树状数组（进阶）

```cpp
inline int lowbit(int x) { return x & -x; }
inline void update(int x, int y, int z)//修改原数组下标为[x][y]的数据
{
    for (int i = x; i <= n; i += lowbit(i))
        for (int j = y; j <= n; j += lowbit(j))
        {
            c[i][j] += z;
            /*sum1[i][j] += z;
            sum2[i][j] += z * x;
            sum3[i][j] += z * y;
            sum4[i][j] += z * x * y;*/
        }
}
inline int getsum(int x, int y)//在原数组下标为[x][y]之前的所有数据的和
{
    int res = 0;
    for (int i = x; i > 0; i -= lowbit(i))
        for (int j = y; j > 0; j -= lowbit(j))
        {
            res += c[i][j];
            //res += sum1[i][j] * (x + 1) * (y + 1) + sum4[i][j] - sum2[i][j] * (y + 1) - sum3[i][j] * (x + 1);
        }
    return res;
}
```

```cpp
signed main()
{
    //区间为矩形：矩形的左下角为(x1, y1); 右上角为(x2, y2);
    //单点为(XX,YY);

    //单点更新+区间查询
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; j++)
            a[i][j] = read(), update(i, j, a[i][j]);
    update(XX, YY, value);
    int sum = getsum(x2, y2) + getsum(x1 - 1, y1 - 1) - getsum(x1 - 1, y2) - getsum(x2, y1 - 1);
    //区间更新+单点查询（差分）
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; j++)
            a[i][j] = read(), update(i, j, a[i][j] + a[i - 1][j - 1] + a[i][j - 1] + a[i - 1][j]);
    update(x1 + 1, y2 + 1, value); update(x2, y1, value); update(x1 + 1, y1, -value); update(x2, y2 + 1, -value);
    int sum = getsum(XX, YY);
    //区间更新+区间查询（不同处在函数内部注释部分）
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; j++)
            a[i][j] = read(), update(i, j, a[i][j] + a[i - 1][j - 1] + a[i][j - 1] + a[i - 1][j]);
    update(x1 + 1, y2 + 1, value); update(x2, y1, value); update(x1 + 1, y1, -value); update(x2, y2 + 1, -value);
    int sum = getsum(x2, y2) + getsum(x1 - 1, y1 - 1) - getsum(x1 - 1, y2) - getsum(x2, y1 - 1);
}
```