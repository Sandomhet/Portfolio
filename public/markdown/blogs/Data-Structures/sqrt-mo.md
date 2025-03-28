---
title: "Square Root Decomposition and Mo's Algorithm"
description: "devides a sequence into sqrt(n) blocks and solve by blocks"
time: "Mon Feb 1, 2024"
---

# Square Root Decomposition and Mo's Algorithm

基础区间加法分块

```cpp
int L[Z], R[Z], bel[Z];
int a[Z], sum[Z], add[Z];
void modify(int l, int r, int val)
{
    int ll = bel[l], rr = bel[r];
    if (ll == rr)//l和r在同一块
    {
        for (re i = l; i <= r; i++) a[i] += val;
        sum[ll] += (r - l + 1) * val;
    }
    else
    {
        for (re i = ll + 1; i < rr; i++) add[i] += val;//区块标记
        for (re i = l; i <= R[ll]; i++) a[i] += val;//两侧零散区间
        sum[ll] += (R[ll] - l + 1) * val;
        for (re i = L[rr]; i <= r; i++) a[i] += val;
        sum[rr] += (r - L[rr] + 1) * val;
    }
}
int ask(int l, int r)
{
    int res = 0;
    int ll = bel[l], rr = bel[r];
    if (ll == rr)//l和r在同一块
    {
        for (re i = l; i <= r; i++) res += a[i];
        res += (r - l + 1) * add[ll];
    }
    else
    {
        for (re i = ll + 1; i < rr; i++)//原区块和+标记
            res += sum[i] + add[i] * (R[i] - L[i] + 1);
        for (re i = l; i <= R[ll]; i++) res += a[i];//两侧零散区间
        res += (R[ll] - l + 1) * add[ll];
        for (re i = L[rr]; i <= r; i++) res += a[i];
        res += (r - L[rr] + 1) * add[rr];
    }
    return res;
}
inline void init()
{
    t = sqrt(n);//划分区块
    for (re i = 1; i <= t; i++)//预处理每一块的左右端点
    {
        L[i] = R[i - 1] + 1;
        R[i] = i * (n / t);
    }
    if (R[t] < n) ++t, L[t] = R[t - 1] + 1, R[t] = n;
    for (re i = 1; i <= t; i++)
        for (re j = L[i]; j <= R[i]; j++)
        {
            bel[j] = i;//节点所属区块
            sum[i] += a[j];//区块和
        }
}
signed main()
{
    n = read(); m = read();
    for (re i = 1; i <= n; i++) a[i] = read();
    init();
    while (m--)
    {
        int op, l, r, v;
        op = read(), l = read(), r = read();
        if (op) v = read(), modify(l, r, v);
        else ans = ask(l, r);
    }
}
```

基础莫队（奇偶性排序优化）

```cpp
int block[Z], ans[Z];
int a[Z], c[Z];
struct query
{
    int l, r, id;
    friend bool operator <(const query& A, const query& B)//奇偶性排序
    {
        if (block[A.l] != block[B.l]) return A.l < B.l;//优先按左端点块
        if (block[A.l] & 1) return A.r < B.r;//奇数块升序
        return A.r > B.r;//偶数块降序
    }
}; query ser[Z];

void add(int x, LL& res)
{
    res += (2 * c[x] + 1);
    c[x]++;
}
void del(int x, LL& res)
{
    res -= (2 * c[x] - 1);
    c[x]--;
}
sandom main()
{
    n = read(); m = read(); t = sqrt(n);
    for (re i = 1; i <= n; i++)//确定每个端点所在块
        block[i] = (i - 1) / t + 1;
    for (re i = 1; i <= n; i++) a[i] = read();
    for (re i = 1; i <= m; i++)//离线查询
    {
        ser[i].l = read();
        ser[i].r = read();
        ser[i].id = i;
    }
    sort(ser + 1, ser + 1 + m);
    int nl = 1, nr = 0, res = 0;
    for (re i = 1; i <= m; i++)
    {
        query q = ser[i];
        while (q.l < nl) add(a[--nl], res);//区间扩大
        while (q.r > nr) add(a[++nr], res);//先移动，再添加
        while (q.l > nl) del(a[nl++], res);//区间缩小
        while (q.r < nr) del(a[nr--], res);//先删除，再移动
        ans[q.id] = res;
    }
    for (re i = 1; i <= m; i++) write(ans[i]);
    return 0;
}
```

带修莫队，在原基础上加了一个维度：修改时间，保证查询在修改后

```cpp
int block[Z], ans[Z];
int a[Z], c[E], pre[Z];
struct query
{
    int l, r, id, tim;
    query() {}
    query(int A, int B, int C, int D) {l = A; r = B; id = C; tim = D;}
    friend bool operator <(const query& A, const query& B)
    {
        if (block[A.l] != block[B.l]) return A.l < B.l;//优先按左端点块
        if (block[A.r] != block[B.r])
        {
            if (block[A.l] & 1) return A.r < B.r;//奇数块升序
            else return A.r > B.r;//偶数块降序
        }
        return A.tim < B.tim;//再加一维时间戳
    }
}; query ask[Z];
struct modify
{
    int pos, col, old;
    modify() {}
    modify(int A, int B, int C) {pos = A; col = B; old = C;}
}; modify cha[Z];

int nl = 1, nr = 0, nt = 0, na = 0;
inline void add(int x)
{
    if (c[x] == 0) na++;
    c[x]++;
}
inline void del(int x)
{
    c[x]--;
    if (c[x] == 0) na--;
}
inline void ward(int x, int col)
{
    if (x >= nl && x <= nr)
    {
        del(a[x]);
        add(col);
    }
    a[x] = col;
}
sandom main()
{
    n = read(); m = read(); t = sqrt(n);
    for (re i = 1; i <= n; i++)
        block[i] = (i - 1) / (n / t) + 1;
    for (re i = 1; i <= n; i++) a[i] = pre[i] = read();
    int timi = 0, tot = 0;
    for (re i = 1; i <= m; i++)
    {
        char ch = read_char();
        int x = read(), y = read();
        if (ch == 'Q') ++tot, ask[tot] = query(x, y, tot, timi);//多加一个时间维度
        if (ch == 'R') cha[++timi] = modify(x, y, pre[x]), pre[x] = y;//记录修改之前是什么颜色
    }
    sort(ask + 1, ask + 1 + tot);
    for (re i = 1; i <= tot; i++)
    {
        query q = ask[i];
        while (q.tim > nt) ++nt, ward(cha[nt].pos, cha[nt].col);//继续修改
        while (q.tim < nt) ward(cha[nt].pos, cha[nt].old), nt--;//修改回溯
        while (q.l < nl) add(a[--nl]);//区间扩大
        while (q.r > nr) add(a[++nr]);//先移动，再添加
        while (q.l > nl) del(a[nl++]);//区间缩小
        while (q.r < nr) del(a[nr--]);//先删除，再移动
        ans[q.id] = na;
    }
    for (re i = 1; i <= tot; i++) write(ans[i]);
    return 0;
}
```

回滚莫队，通过排序来避免删除。

```cpp
#define sandom signed
#define fre(x, y) freopen(#x ".in", "r", stdin), freopen(#y ".out", "w", stdout);
#include <bits/stdc++.h>
#define re register int
using namespace std; int wrt[20], TP;
const int Z = 1e5 + 10;
inline int read() { int x = 0, f = 0; char c = getchar(); while (!isdigit(c)) f |= c == '-', c = getchar(); while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getchar(); return f ? -x : x; }
inline void write(int x) { TP = 0; if (x < 0) putchar('-'), x = -x; while (x >= 10) wrt[++TP] = x % 10, x /= 10; wrt[++TP] = x; while (TP) putchar(wrt[TP--] | 48); putchar('\n'); }
inline int max(int a, int b) { return a > b ? a : b; } inline int min(int a, int b) { return a < b ? a : b; }

int n, m, k, ans[Z];
int be[Z], p[Z], d[Z];
struct ant
{
    int l, r, id;
    friend bool operator <(ant A, ant B)
    {
        if (be[A.l] == be[B.l]) return A.r < B.r;//保证同一块内右端点只扩展
        return A.l < B.l;//分块讨论
    }
}; ant que[Z];
int L[Z], R[Z];
int l, r, res, top;
struct delte { int a, b, c, d, e; }; delte stk[Z];
inline void add(int x, bool op)
{
    L[x] = R[x] = x;
    if (L[x - 1]) L[x] = L[x - 1];
    if (R[x + 1]) R[x] = R[x + 1];
    if (op) stk[++top] = delte{L[x], R[L[x]], R[x], L[R[x]], x};
    R[L[x]] = R[x], L[R[x]] = L[x];
    res = max(res, R[x] - L[x] + 1);
}
inline void del(delte x) { R[x.a] = x.b, L[x.c] = x.d, L[x.e] = R[x.e] = 0; }
inline int violent(int l, int r)//在同一块内暴力扫
{
    int ans = 1, cnt = 1;
    for (re i = l; i <= r; i++) d[i] = p[i];
    sort(d + l, d + r + 1); d[l - 1] = -1;
    for (re i = l; i <= r; i++)
    {
        if (d[i] == d[i - 1] + 1) cnt++;
        else cnt = 1;
        ans = max(ans, cnt);
    }
    return ans;
}

sandom main()
{
    n = read(), m = read(); int t = sqrt(n);
    for (re i = 1; i <= n; i++) be[i] = (i - 1) / t + 1;
    for (re i = 1; i <= n; i++) p[i] = read();
    for (re i = 1; i <= m; i++) que[i].l = read(), que[i].r = read(), que[i].id = i;
    sort(que + 1, que + 1 + m);
    for (re i = 1; i <= m; i++)
    {
        ant q = que[i];
        if (be[q.l] != be[que[i - 1].l])//进入下一块清空
        {
            for (re i = 1; i <= n; i++) L[i] = R[i] = 0;
            r = min(t * be[q.l], n), l = r + 1; res = 0;
        }
        if (be[q.l] == be[q.r]) ans[q.id] = violent(q.l, q.r);//同一块暴力扫
        else
        {
            while (r < q.r) add(p[++r], 0);//持续扩展
            int tmp = res;
            while (l > q.l) add(p[--l], 1);//扩展完撤销
            ans[q.id] = res; res = tmp;
            while (top) del(stk[top--]), l++;//回滚撤销
        }
    }
    for (re i = 1; i <= m; i++) write(ans[i]);
    return 0;
}
```
