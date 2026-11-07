---
title: "K-D Tree (k-dimensional tree)"
description: "a space-partitioning data structure for organizing points in a k-dimensional space."
time: "Mon Feb 1, 2024"
---

# K-D Tree (k-dimensional tree)

Split by the median (`nth_element`), alternating the dimension at each level. Each node stores the bounding box of its subtree. Insertion rebuilds a subtree when one child holds more than $\alpha$ of it (scapegoat style). Nearest/farthest queries visit the child whose bounding-box estimate is more promising first, and prune children that cannot beat the current answer.

Below: 2D points, Manhattan distance, with insertion. For Euclidean distance change `dist`, `lo` and `hi` (squared distances).

```cpp
struct KDTree {
    struct P { ll x[2]; };
    struct Node { P p; int l, r, siz, d; ll mn[2], mx[2]; }; // d: split dimension, mn/mx: bounding box
    static constexpr double alpha = 0.75;
    vector<Node> t; vector<int> rub; vector<P> buf; int root = 0, tot = 0;
    KDTree(int cap) : t(cap + 1) {}
    static ll dist(const P &a, const P &b) { return llabs(a.x[0] - b.x[0]) + llabs(a.x[1] - b.x[1]); }
    void pushup(int x) {
        for (int i = 0; i < 2; i++) {
            t[x].mn[i] = t[x].mx[i] = t[x].p.x[i]; //因为会重构所以每次都要初始化
            for (int c : {t[x].l, t[x].r}) if (c)
                t[x].mn[i] = min(t[x].mn[i], t[c].mn[i]), t[x].mx[i] = max(t[x].mx[i], t[c].mx[i]);
        }
        t[x].siz = t[t[x].l].siz + t[t[x].r].siz + 1;
    }
    int newnode(const P &p, int d) {
        int x = rub.size() ? rub.back() : ++tot;
        if (rub.size()) rub.pop_back();
        t[x].p = p, t[x].d = d, t[x].l = t[x].r = 0, pushup(x);
        return x;
    }
    int build(int l, int r, int d) { // buf[l..r]
        if (l > r) return 0;
        int mid = (l + r) / 2;
        nth_element(buf.begin() + l, buf.begin() + mid, buf.begin() + r + 1, [d](const P &a, const P &b) { return a.x[d] < b.x[d]; });
        int x = newnode(buf[mid], d);
        t[x].l = build(l, mid - 1, d ^ 1), t[x].r = build(mid + 1, r, d ^ 1);
        pushup(x);
        return x;
    }
    void flatten(int x) { //重构，把树还原为原序列
        if (!x) return;
        flatten(t[x].l), buf.push_back(t[x].p), rub.push_back(x), flatten(t[x].r);
    }
    void insert(int &x, const P &p, int d) {
        if (!x) { x = newnode(p, d); return; }
        int k = t[x].d;
        insert(p.x[k] <= t[x].p.x[k] ? t[x].l : t[x].r, p, k ^ 1);
        pushup(x);
        if (alpha * t[x].siz < max(t[t[x].l].siz, t[t[x].r].siz)) //检查树是否平衡
            buf.clear(), flatten(x), x = build(0, buf.size() - 1, k);
    }
    ll lo(int x, const P &p) { //到包围盒的最小距离（估价）
        ll s = 0;
        for (int i = 0; i < 2; i++) s += max(0LL, t[x].mn[i] - p.x[i]) + max(0LL, p.x[i] - t[x].mx[i]);
        return s;
    }
    ll hi(int x, const P &p) { //到包围盒的最大距离（估价）
        ll s = 0;
        for (int i = 0; i < 2; i++) s += max(llabs(p.x[i] - t[x].mn[i]), llabs(p.x[i] - t[x].mx[i]));
        return s;
    }
    void qmin(int x, const P &p, ll &res) { //查询最近
        res = min(res, dist(t[x].p, p));
        int a = t[x].l, b = t[x].r;
        ll da = a ? lo(a, p) : LLONG_MAX, db = b ? lo(b, p) : LLONG_MAX;
        if (da > db) swap(a, b), swap(da, db); //先跑最有可能达到最小值的
        if (da < res) qmin(a, p, res);
        if (db < res) qmin(b, p, res);
    }
    void qmax(int x, const P &p, ll &res) { //查询最远
        res = max(res, dist(t[x].p, p));
        int a = t[x].l, b = t[x].r;
        ll da = a ? hi(a, p) : -1, db = b ? hi(b, p) : -1;
        if (da < db) swap(a, b), swap(da, db);
        if (da > res) qmax(a, p, res);
        if (db > res) qmax(b, p, res);
    }
    void build(const vector<P> &pts) { buf = pts, root = build(0, (int)buf.size() - 1, 0); }
    void insert(ll x, ll y) { insert(root, P{{x, y}}, 0); }
    ll nearest(ll x, ll y) { ll res = LLONG_MAX; if (root) qmin(root, P{{x, y}}, res); return res; }
    ll farthest(ll x, ll y) { ll res = -1; if (root) qmax(root, P{{x, y}}, res); return res; }
};
```

Usage:

```cpp
KDTree kd(n + q);              // capacity = total number of points
kd.build(pts);                 // optional: vector<KDTree::P> of initial points, P{{x, y}}
kd.insert(x, y);
kd.nearest(x, y);              // min Manhattan distance to a stored point (LLONG_MAX if empty)
kd.farthest(x, y);             // max Manhattan distance (-1 if empty)
// to exclude the point itself, query before inserting it
```
