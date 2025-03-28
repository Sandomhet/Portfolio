---
title: "Hill Climbing and Simulated Annealing Algorithms"
description: "爬山算法和模拟退火"
time: "Mon Feb 1, 2024"
---

# Hill Climbing and Simulated Annealing Algorithms

```cpp
const double down = 0.996;//降温系数
const double eps = 1e-15;//终止温度
double ansx, ansy, answ, T;
struct point { int x, y, w; } a[Z];
inline double dis(double x1, double x2, double y1, double y2) { return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); }
inline double calc(double x, double y)//计算答案值
{
    double res = 0;
    for (re i = 1; i <= n; i++) res += dis(x, a[i].x, y, a[i].y) * a[i].w;
    if (res < answ) ansx = x, ansy = y, answ = res;
    return res;
}
inline double get(double x) { return x + (rand() * 2 - RAND_MAX) * T; }//随机获得新解
void SA()
{
    T = 3000;//初始温度
    while (T > eps)
    {
        double ex = get(ansx), ey = get(ansy);
        double delta = calc(ex, ey) - calc(ansx, ansy);
        if (exp(-delta / T) * RAND_MAX > rand()) ansx = ex, ansy = ey;//根据Metropolis准则保留
        T *= down;//不断降温
    }
    for (re i = 1; i <= 1000; i++) calc(get(ansx), get(ansy));//最后在接近的范围里跳
}

```