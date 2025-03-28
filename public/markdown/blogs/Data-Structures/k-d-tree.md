---
title: "K-D Tree (k-dimensional tree)"
description: "a space-partitioning data structure for organizing points in a k-dimensional space."
time: "Mon Feb 1, 2024"
---

# K-D Tree (k-dimensional tree)

```cpp
const int inf = 2e9;
const double alpha = 0.75;
bool o;//当前维度
struct point
{
    int p[3];
    friend bool operator <(point A, point B) { return A.p[o] < B.p[o]; }
    friend bool operator ==(point A, point B) { return A.p[2] == B.p[2]; }
    friend bool operator !=(point A, point B) { return A.p[2] != B.p[2]; }
}; point a[Z];
inline int calc(point x, point y) { return abs(x.p[0] - y.p[0]) + abs(x.p[1] - y.p[1]); }
struct KDtree
{
    point pt;//当前节点所代表的点
    int l, r, siz;//左右孩子及子树大小
    int max[2], min[2];//最大与最小的横纵坐标
    #define lk kd[rt].l
    #define rk kd[rt].r
    #define mid (l + r >> 1)
}; KDtree kd[Z << 1];
int root, tot, Max, Min;
inline void pushup(int rt)
{
    for (int i = 0; i <= 1; ++i)
    {
        kd[rt].max[i] = kd[rt].min[i] = kd[rt].pt.p[i];//因为会重构所以每次都要初始化
        if (lk) kd[rt].max[i] = max(kd[rt].max[i], kd[lk].max[i]), kd[rt].min[i] = min(kd[rt].min[i], kd[lk].min[i]);
        if (rk) kd[rt].max[i] = max(kd[rt].max[i], kd[rk].max[i]), kd[rt].min[i] = min(kd[rt].min[i], kd[rk].min[i]);
    }
    kd[rt].siz = kd[lk].siz + kd[rk].siz + 1;
}
inline int est(point x)//动态开点
{
    kd[++tot].pt = x;
    pushup(tot); return tot;
}
int build(int l, int r, bool op)//初始建树
{
    o = op;//自定义排序方式（表示维度）
    nth_element(a + l, a + mid, a + r + 1);
    int rt = est(a[mid]);//定位中位数
    if (l < mid) lk = build(l, mid - 1, !op);
    if (r > mid) rk = build(mid + 1, r, !op);
    pushup(rt); return rt;
}
void rebuild(int rt, int num)//重构，把树还原为原序列
{
    if (lk) rebuild(lk, num);
    a[num + kd[lk].siz + 1] = kd[rt].pt;
    if (rk) rebuild(rk, num + kd[lk].siz + 1);
}
inline void check(int &rt, int op)//检查树是否平衡
{
    if (alpha * kd[rt].siz < min(kd[lk].siz, kd[rk].siz))
    {
        rebuild(rt, 0);
        rt = build(1, kd[rt].siz, op);
    }
}
void insert(int &rt, point x, int op)//插入
{
    if (!rt) { rt = est(x); return; }
    if (x.p[op] <= kd[rt].pt.p[op]) insert(lk, x, !op);
    else insert(rk, x, !op);
    pushup(rt); check(rt, op);
}
inline int estimate_max(int rt, point x)//最大值估价函数
{
    int sum = 0;
    for (int i = 0; i <= 1; ++i)//找到理论极限距离最大的点对（已扩展的最大平面的顶点）
        sum += max(abs(x.p[i] - kd[rt].max[i]), abs(kd[rt].min[i] - x.p[i]));
    return sum;
}
inline int estimate_min(int rt, point x)//最小值估价函数
{
    int sum = 0;
    for (int i = 0; i <= 1; ++i)//如果处于max和min的两侧，直接取最近；如果处于中间，则不知道还有没有其他的点，无法预估
        sum += max(x.p[i] - kd[rt].max[i], 0) + max(kd[rt].min[i] - x.p[i], 0);
    return sum;
}
void query_max(int rt, point x)//查询最远
{
    Max = max(Max, calc(kd[rt].pt, x));
    int dl = 0, dr = 0;
    if (lk) dl = estimate_max(lk, x);
    if (rk) dr = estimate_max(rk, x);
    if (dl > dr)//先跑最有可能达到最大值的
    {
        if (dl > Max) query_max(lk, x);
        if (dr > Max) query_max(rk, x);
    }
    else
    {
        if (dr > Max) query_max(rk, x);
        if (dl > Max) query_max(lk, x);
    }
}
void query_min(int rt, point x)//查询最近
{
    if (kd[rt].pt != x) Min = min(Min, calc(kd[rt].pt, x));
    int dl = inf, dr = inf;
    if (lk) dl = estimate_min(lk, x);
    if (rk) dr = estimate_min(rk, x);
    if (dl < dr)//先跑最有可能达到最小值的
    {
        if (dl < Min) query_min(lk, x);
        if (dr < Min) query_min(rk, x);
    }
    else
    {
        if (dr < Min) query_min(rk, x);
        if (dl < Min) query_min(lk, x);
    }
}
inline int ask(point x)
{
    Max = 0, Min = inf;
    query_max(root, x), query_min(root, x);
    return Max - Min;
}
```
