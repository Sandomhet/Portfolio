---
title: "Square Root Decomposition and Mo's Algorithm"
description: "devides a sequence into sqrt(n) blocks and solve by blocks"
time: "Mon Feb 1, 2024"
---

# Square Root Decomposition and Mo's Algorithm

## Square Root Decomposition

Split the array into blocks of size $\sqrt n$. A range operation touches $O(\sqrt n)$ whole blocks (handled by block tags) and $O(\sqrt n)$ loose elements at both ends: $O(\sqrt n)$ per operation.

基础区间加法分块

```cpp
struct Block { // range add, range sum, 1-indexed
    int n, B; vector<int> bel; vector<ll> a, sum, add;
    template<class T> Block(int n, const T &v) : n(n), B(max(1, (int)sqrt(n))), bel(n + 1), a(n + 1) {
        for (int i = 1; i <= n; i++) a[i] = v[i], bel[i] = (i - 1) / B;
        sum.assign(bel[n] + 1, 0), add.assign(bel[n] + 1, 0);
        for (int i = 1; i <= n; i++) sum[bel[i]] += a[i];
    }
    int L(int b) { return b * B + 1; }
    int R(int b) { return min(n, (b + 1) * B); }
    void modify(int l, int r, ll v) {
        int x = bel[l], y = bel[r];
        if (x == y) { for (int i = l; i <= r; i++) a[i] += v, sum[x] += v; return; } //l和r在同一块
        for (int i = l; i <= R(x); i++) a[i] += v, sum[x] += v; //两侧零散区间
        for (int i = L(y); i <= r; i++) a[i] += v, sum[y] += v;
        for (int b = x + 1; b < y; b++) add[b] += v; //区块标记
    }
    ll query(int l, int r) {
        int x = bel[l], y = bel[r]; ll res = 0;
        if (x == y) { for (int i = l; i <= r; i++) res += a[i] + add[x]; return res; }
        for (int i = l; i <= R(x); i++) res += a[i] + add[x];
        for (int i = L(y); i <= r; i++) res += a[i] + add[y];
        for (int b = x + 1; b < y; b++) res += sum[b] + add[b] * (R(b) - L(b) + 1); //原区块和+标记
        return res;
    }
};
```

Usage:

```cpp
Block blk(n, a);       // a[1..n]
blk.modify(l, r, v);   // a[l..r] += v
blk.query(l, r);       // a[l] + ... + a[r]
```

## Mo's Algorithm

Offline. Sort queries by (block of $l$, $r$) and move the two pointers between consecutive queries. With block size $n / \sqrt q$: $O(n\sqrt q)$ pointer moves.

基础莫队（奇偶性排序优化）. `add(i)` / `del(i)` receive a **position** $i$ entering or leaving the window $[L, R]$; `get(id)` is called when the window equals query `id`.

```cpp
struct Mo {
    struct Q { int l, r, id; };
    vector<Q> qs;
    void add_query(int l, int r) { qs.push_back({l, r, (int)qs.size()}); }
    template<class Add, class Del, class Get> void run(int n, Add add, Del del, Get get) {
        int B = max(1, (int)(n / sqrt(max<int>(1, qs.size()))));
        sort(qs.begin(), qs.end(), [&](const Q &a, const Q &b) { //奇偶性排序
            if (a.l / B != b.l / B) return a.l < b.l;
            return (a.l / B) & 1 ? a.r > b.r : a.r < b.r;
        });
        int L = 1, R = 0;
        for (auto &q : qs) {
            while (L > q.l) add(--L); //区间扩大
            while (R < q.r) add(++R);
            while (L < q.l) del(L++); //区间缩小
            while (R > q.r) del(R--);
            get(q.id);
        }
    }
};
```

Usage:

```cpp
// number of pairs i < j in [l, r] with a[i] == a[j], a[] discretized to 1..m
Mo mo;
for (int i = 0; i < q; i++) mo.add_query(l, r);
vector<int> cnt(m + 1); vector<ll> res(q); ll cur = 0;
mo.run(n,
    [&](int i) { cur += cnt[a[i]]++; },
    [&](int i) { cur -= --cnt[a[i]]; },
    [&](int id) { res[id] = cur; });
```

### Mo's Algorithm with Modifications

Add a time pointer. Sort by (block of $l$, block of $r$, time) with block size $n^{2/3}$: $O(n^{5/3})$.

带修莫队，在原基础上加了一个维度：修改时间，保证查询在修改后. An update is applied by swapping its value with `a[p]`, so applying it twice undoes it.

```cpp
struct MoUpd {
    struct Q { int l, r, t, id; };
    vector<Q> qs; vector<pair<int, ll>> us; // us: (position, new value)
    void add_query(int l, int r) { qs.push_back({l, r, (int)us.size(), (int)qs.size()}); }
    void add_update(int p, ll v) { us.push_back({p, v}); }
    template<class A, class Add, class Del, class Get> void run(int n, A &a, Add add, Del del, Get get) {
        int B = max(1, (int)pow(n, 2.0 / 3)); //带修莫队块长取 n^(2/3)
        sort(qs.begin(), qs.end(), [&](const Q &x, const Q &y) {
            if (x.l / B != y.l / B) return x.l < y.l;
            if (x.r / B != y.r / B) return x.r < y.r;
            return x.t < y.t; //再加一维时间戳
        });
        int L = 1, R = 0, T = 0;
        auto apply = [&](int t) {
            auto &[p, v] = us[t];
            bool in = L <= p && p <= R;
            if (in) del(p);
            swap(a[p], v);
            if (in) add(p);
        };
        for (auto &q : qs) {
            while (T < q.t) apply(T++); //继续修改
            while (T > q.t) apply(--T); //修改回溯
            while (L > q.l) add(--L);
            while (R < q.r) add(++R);
            while (L < q.l) del(L++);
            while (R > q.r) del(R--);
            get(q.id);
        }
    }
};
```

Usage:

```cpp
// distinct colors in [l, r] with point recoloring (colors discretized to 1..m, including update values)
MoUpd mo; int qc = 0;
// 'Q l r': mo.add_query(l, r), qc++;   'R p v': mo.add_update(p, v);
vector<int> cnt(m + 1), res(qc); int cur = 0;
mo.run(n, a,
    [&](int i) { if (cnt[a[i]]++ == 0) cur++; },
    [&](int i) { if (--cnt[a[i]] == 0) cur--; },
    [&](int id) { res[id] = cur; });
```

### Rollback Mo's Algorithm

For operations that are easy to add but hard to delete. For queries whose $l$ is in the same block: $r$ only moves right; $l$ restarts from the block's right end for each query, and its changes are undone with a stack. Queries inside one block are brute-forced. $O(n\sqrt n)$.

回滚莫队，通过排序来避免删除. You provide `add(i)`, `save()` (remember the current state), `undo()` (go back to the last `save`), `reset()` (empty window) and `get(id)`.

```cpp
struct MoRollback {
    struct Q { int l, r, id; };
    vector<Q> qs;
    void add_query(int l, int r) { qs.push_back({l, r, (int)qs.size()}); }
    template<class Add, class Save, class Undo, class Reset, class Get>
    void run(int n, Add add, Save save, Undo undo, Reset reset, Get get) {
        int B = max(1, (int)sqrt(n));
        sort(qs.begin(), qs.end(), [&](const Q &a, const Q &b) {
            if ((a.l - 1) / B != (b.l - 1) / B) return a.l < b.l;
            return a.r < b.r; //保证同一块内右端点只扩展
        });
        for (size_t i = 0, j; i < qs.size(); i = j) {
            int blk = (qs[i].l - 1) / B, end = min(n, (blk + 1) * B), R = end;
            reset(); //进入下一块清空
            for (j = i; j < qs.size() && (qs[j].l - 1) / B == blk; j++) {
                auto &q = qs[j];
                if (q.r <= end) { //同一块暴力扫
                    save();
                    for (int k = q.l; k <= q.r; k++) add(k);
                    get(q.id), undo();
                    continue;
                }
                while (R < q.r) add(++R); //持续扩展
                save();
                for (int k = end; k >= q.l; k--) add(k); //扩展完撤销
                get(q.id), undo(); //回滚撤销
            }
        }
    }
};
```

Usage:

```cpp
// max over x of x * (occurrences of x in a[l..r]); id[i] = discretized a[i] in 1..m, val[id] = original value
MoRollback mo;
for (int i = 0; i < q; i++) mo.add_query(l, r);
vector<int> cnt(m + 1), stk; vector<ll> res(q); ll cur = 0, saved = 0; size_t mark = 0;
mo.run(n,
    [&](int i) { cnt[id[i]]++, stk.push_back(id[i]), cur = max(cur, cnt[id[i]] * val[id[i]]); },
    [&] { mark = stk.size(), saved = cur; },
    [&] { while (stk.size() > mark) cnt[stk.back()]--, stk.pop_back(); cur = saved; },
    [&] { for (int x : stk) cnt[x]--; stk.clear(), cur = 0; },
    [&](int qid) { res[qid] = cur; });
```
