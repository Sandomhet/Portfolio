---
title: "Segment Tree"
description: "storing information about intervals or segments."
time: "Mon Feb 1, 2024"
---

# Segment Tree

基础一维**线段树**，维护区间信息~~（模板：山海经）~~

```cpp
class SegmentTree {
public:
    struct TreeNode {
        int l, r;
        int sum, max;
        int lz;
        TreeNode () { sum = 0, max = -1e9; }
        #define lk (rt << 1)
        #define rk (rt << 1 | 1)
        #define mid (tr[rt].l + tr[rt].r >> 1)
    }; 
    TreeNode tr[Z << 2];
    // default root is index 1
    void change(int rt, int val) //修改线段树
    {
        tr[rt].lz += val;
        tr[rt].sum += (tr[rt].r - tr[rt].l + 1) * val;
        tr[rt].max += val;
    }
    void pushup(TreeNode &rt, TreeNode lc, TreeNode rc) //向上更新信息
    {
        rt.sum = lc.sum + rc.sum;
        rt.max = max(lc.max, rc.max);
    }
    void pushdown(int rt) //向下更新延迟,下放标记
    {
        if (tr[rt].lz) {
            change(lk, tr[rt].lz);
            change(rk, tr[rt].lz);
            tr[rt].lz = 0;
        }
    }
    void build(int rt, int l, int r) //建立线段树
    {
        tr[rt].l = l, tr[rt].r = r;
        if (l == r) {
            tr[rt].sum = tr[rt].max = w[l];
            return;
        }
        build(lk, l, mid);
        build(rk, mid + 1, r);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    void update(int rt, int l, int r, int val) //区间更新
    {
        if (l <= tr[rt].l && tr[rt].r <= r) { change(rt, val); return; }//真子集
        pushdown(rt);
        if (l <= mid) update(lk, l, r, val);
        if (r > mid)  update(rk, l, r, val);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    TreeNode query(int rt, int l, int r) //区间查询
    {
        if (l <= tr[rt].l && tr[rt].r <= r) return tr[rt];
        pushdown(rt);
        if (r <= mid) return query(lk, l, r);
        if (l > mid) return query(rk, l, r);
        // ST res;
        return pushup(query(lk, l, r), query(rk, l, r));
        // return res;
        // if (l <= mid) pushup(res, res, query(lk, l, r));
        // if (r > mid) pushup(res, res, query(rk, l, r));
    }

    void update(int rt, int pos, int val)//单点更新
    {
        if (tr[rt].l == tr[rt].r) { change(rt, val); return; }
        if (pos <= mid) update(lk, pos, val);
        else update(rk, pos, val);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    TreeNode query(int rt, int pos) //单点查询
    {
        if (tr[rt].l == tr[rt].r) return tr[rt];
        pushdown(rt);
        if (pos <= mid) return query(lk, pos);
        else return query(rk, pos);
    }
}
```

众所周知，线段树的空间复杂度是比较差的，但是实际上不一定线段树中的每个点都会被用到，这样会浪费空间，所以我们采用**动态开点
**。
这一点也能方便我们使用**线段树合并**，也就是把两段原本不相关的信息连接在一起。在树形DP和权值线段树中应用广泛。

```cpp
#define ST Segment_Tree
struct Segment_Tree
{
    int l, r;
    int sum, max, min;
    Segment_Tree () { sum = 0, max = -1e9, min = 1e9; }
    #define lk tr[rt].l
    #define rk tr[rt].r
    #define mid ((L + R) >> 1)
}; Segment_Tree tr[Z];
int tot;
//L-R：当前节点所代表的区间。l-r：查询与修改的区间
void update(int& rt, int L, int R, int pos, int val)
{
    if (!rt) rt = ++tot;
    if (l <= L && r >= R) { change(rt, val); return; }
    pos <= mid ? update(lk, L, mid, pos, val) : update(rk, mid + 1, R, pos, val);
    pushup(rt);
}
int query(int rt, int L, int R, int l, int r)
{
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum;
    if (r <= mid) return query(lk, L, mid, l, r);
    if (l > mid) return query(rk, mid + 1, R, l, r);
    return query(lk, L, mid, l, r) + query(rk, mid + 1, R, l, r);
}
int merge(int rt, int ut, int L, int R)//线段树合并
{
    if (!rt || !ut) return rt + ut;
    if (L == R) { change(rt, tr[ut].sum); return rt; }
    lk = merge(lk, tr[ut].l, L, mid);
    rk = merge(rk, tr[ut].r, mid + 1, R);
    pushup(rt); return rt;
}
```

动态开点有一个弊端，就是不能下放lz标记，因为那样需要建立新点，不是MLE就是TLE，这就导致我们没办法区间修改。但是，如果我们不下传lz呢，这就用到了
**永久化标记**。不需要下传lz，但是可以共享。钦定左右区间分别为max(l, L)和min(r, R)
：在修改时，只对这一部分的sum加上val，显然是正确的，但是不加给lz，只有当它是一整个完整区间被覆盖，才会加lz；查询时，不断向下递归的过程中，都会将这一段的所有rt的lz累加起来，相当于把两端区间取交集，这样不会多也不会少，因此也是正确的。

```cpp
void update(int& rt, int L, int R, int l, int r, int val)
{
    if (!rt) rt = ++tot;
    if (l <= L && r >= R) { tr[rt].lz += val; return; }
    tr[rt].sum += (min(r, R) - max(l, L) + 1) * val;
    if (l <= mid) update(lk, L, mid, l, r, val);
    if (r > mid) update(rk, mid + 1, R, l, r, val);
}
int query(int rt, int L, int R, int l, int r)
{
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum + (R - L + 1) * tr[rt].lz;
    int res = (min(r, R) - max(l, L) + 1) * tr[rt].lz;
    if (l <= mid) res += query(lk, L, mid, l, r);
    if (r > mid) res += query(rk, mid + 1, R, l, r);
    return res;
}
int merge(int rt, int ut, int L, int R)//线段树合并
{
    if (!rt || !ut) return rt + ut;
    tr[rt].sum += tr[ut].sum;
    tr[rt].lz += tr[ut].lz;
    if (L == R) return rt;
    lk = merge(tr[rt].lc, tr[ut].lc, L, mid);
    rk = merge(tr[rt].rc, tr[ut].rc, mid + 1, R);
    pushup(rt);
    return rt;
}
```

NEXT:**主席树**

```cpp
#define PT President_Tree
struct President_Tree
{
    int lc, rc;
    int sum;
    #define lk tr[rt].lc
    #define rk tr[rt].rc
    #define mid ((L + R) >> 1)
}; President_Tree tr[Z];
int tot;
void build(int& rt, int L, int R)
{
    rt = ++tot;//动态开点
    tr[rt].sum = 0;
    if (L == R) return;
    build(lk, L, mid);
    build(rk, mid + 1, R);
}
int update(int pre, int L, int R, int pos, int val)
{
    int rt = ++tot;
    tr[rt] = tr[pre];//继承上一个历史版本
    tr[rt].sum += val;
    if (L == R) return rt;
    if (pos <= mid) lk = update(lk, L, mid, pos, val);
    else rk = update(rk, mid + 1, R, pos, val);
    pushup(rt);
    return rt;
}
int query(int rt, int L, int R, int l, int r)//正常的询问
{
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum;
    int res = 0;
    if (l <= mid) res += query(lk, L, mid, l, r);
    if (r > mid) res += query(rk, mid + 1, R, l, r);
    return res;
}
```

**吉司机线段树**：

可以对区间取min后区间求和，还可以记录历史最值。时间复杂度约为$O(nlogn)$，如果有区间加操作，可能退化为$O(nlog^2n)$
，证明可以参考势能函数的变化。

```cpp
struct tree
{
    int l, r, sum;
    int maxa, maxb, maxc, cnt;//当前最大值、历史最大值、当前次大值、最大值个数
    int lz1, lz2, lz3, lz4;//最大值的标记、非最大值的标记、历史最大值标记的最大值、历史非最大值标记的最大值
    #define lk (rt << 1)
    #define rk (rt << 1 | 1)
    #define mid (tr[rt].l + tr[rt].r >> 1)
}; tree tr[Z << 2];
inline void add(int rt, int k1, int k2, int k3, int k4)
{
    tr[rt].sum += k1 * tr[rt].cnt + k2 * (tr[rt].r - tr[rt].l + 1 - tr[rt].cnt);
    tr[rt].maxb = max(tr[rt].maxb, tr[rt].maxa + k3); tr[rt].maxa += k1;
    if (tr[rt].maxc != -inf) tr[rt].maxc += k2;
    tr[rt].lz3 = max(tr[rt].lz3, tr[rt].lz1 + k3); tr[rt].lz1 += k1;
    tr[rt].lz4 = max(tr[rt].lz4, tr[rt].lz2 + k4); tr[rt].lz2 += k2;
}
inline void pushup(int rt)
{
    tr[rt].sum = tr[lk].sum + tr[rk].sum;
    tr[rt].maxa = max(tr[lk].maxa, tr[rk].maxa);
    tr[rt].maxb = max(tr[lk].maxb, tr[rk].maxb);
    if (tr[lk].maxa > tr[rk].maxa)
    {
        tr[rt].maxc = max(tr[lk].maxc, tr[rk].maxa);
        tr[rt].cnt = tr[lk].cnt;
    }
    else if (tr[lk].maxa < tr[rk].maxa)
    {
        tr[rt].maxc = max(tr[rk].maxc, tr[lk].maxa);
        tr[rt].cnt = tr[rk].cnt;
    }
    else
    {
        tr[rt].maxc = max(tr[lk].maxc, tr[rk].maxc);
        tr[rt].cnt = tr[lk].cnt + tr[rk].cnt;
    }
}
inline void pushdown(int rt)
{
    int mx = max(tr[lk].maxa, tr[rk].maxa);
    if (tr[lk].maxa == mx) add(lk, tr[rt].lz1, tr[rt].lz2, tr[rt].lz3, tr[rt].lz4);
    else add(lk, tr[rt].lz2, tr[rt].lz2, tr[rt].lz4, tr[rt].lz4);
    if (tr[rk].maxa == mx) add(rk, tr[rt].lz1, tr[rt].lz2, tr[rt].lz3, tr[rt].lz4);
    else add(rk, tr[rt].lz2, tr[rt].lz2, tr[rt].lz4, tr[rt].lz4);
    tr[rt].lz1 = tr[rt].lz2 = tr[rt].lz3 = tr[rt].lz4 = 0;
}
void build(int rt, int l, int r)
{
    tr[rt].l = l, tr[rt].r = r;
    if (l == r)
    {
        tr[rt].sum = tr[rt].maxa = tr[rt].maxb = a[l];
        tr[rt].maxc = -inf; tr[rt].cnt = 1;
        return;
    }
    build(lk, l, mid), build(rk, mid + 1, r);
    pushup(rt);
}
void update_sum(int rt, int l, int r, int k)
{
    if (l <= tr[rt].l && r >= tr[rt].r) { add(rt, k, k, k, k); return; }
    pushdown(rt);
    if (l <= mid) update_sum(lk, l, r, k);
    if (r > mid) update_sum(rk, l, r, k);
    pushup(rt);
}
void update_min(int rt, int l, int r, int k)
{
    if (k >= tr[rt].maxa) return;
    if (l <= tr[rt].l && r >= tr[rt].r && k >= tr[rt].maxc) { add(rt, k - tr[rt].maxa, 0, k - tr[rt].maxa, 0); return; }
    pushdown(rt);
    if (l <= mid) update_min(lk, l, r, k);
    if (r > mid) update_min(rk, l, r, k);
    pushup(rt);
}
int query_sum(int rt, int l, int r)
{
    if (l <= tr[rt].l && r >= tr[rt].r) return tr[rt].sum;
    pushdown(rt); int res = 0;
    if (l <= mid) res += query_sum(lk, l, r);
    if (r > mid) res += query_sum(rk, l, r);
    return res;
}
int query_max(int rt, int l, int r, bool op)
{
    if (l <= tr[rt].l && r >= tr[rt].r) return op ? tr[rt].maxa : tr[rt].maxb;
    pushdown(rt); int res = -1e9;
    if (l <= mid) res = max(res, query_max(lk, l, r, op));
    if (r > mid) res = max(res, query_max(rk, l, r, op));
    return res;
}
```

**李超线段树**

```cpp
struct line { double k, b; } p[Z << 2];
double calc(int id, int x) { return p[id].k * x + p[id].b; }
int cmp(double x, double y)
{
    if (x - y > eps) return 1;
    if (y - x > eps) return -1;
    return 0;
}
void add(int x0, int y0, int x1, int y1)
{
    ++tot;
    if (x0 == x1) p[tot].k = 0, p[tot].b = max(y0, y1);
    else p[tot].k = 1.0 * (y1 - y0) / (x1 - x0), p[tot].b = y0 - p[tot].k * x0;
}
paint Max(paint x, paint y)
{
    int z = cmp(x.second, y.second);
    if (z == 1 || (!z && x.first < y.first)) return x;
    else return y;
}
struct tree
{
    int l, r, s;
    #define lk (rt << 1)
    #define rk (rt << 1 | 1)
    #define mid (tr[rt].l + tr[rt].r >> 1)
}; tree tr[Z << 2];
void build(int rt, int l, int r)
{
    tr[rt].l = l, tr[rt].r = r;
    if (l == r) return;
    build(lk, l, mid), build(rk, mid + 1, r);
}
void change(int rt, int u)//更新覆盖标记
{
    int &v = tr[rt].s;
    if (cmp(calc(u, mid), calc(v, mid)) == 1) swap(u, v);
    int dl = cmp(calc(u, tr[rt].l), calc(v, tr[rt].l)), dr = cmp(calc(u, tr[rt].r), calc(v, tr[rt].r));
    if (dl == 1 || (!dl && u < v)) change(lk, u);
    if (dr == 1 || (!dr && u < v)) change(rk, u);
}
void update(int rt, int l, int r, int id)
{
    if (l <= tr[rt].l && r >= tr[rt].r) { change(rt, id); return; }
    if (l <= mid) update(lk, l, r, id);
    if (r > mid) update(rk, l, r, id);
}
paint query(int rt, int k)
{
    paint res = make_pair(tr[rt].s, calc(tr[rt].s, k));
    if (tr[rt].l == tr[rt].r) return res;
    if (k <= mid) res = Max(res, query(lk, k));
    else res = Max(res, query(rk, k));
    return res;
}
```