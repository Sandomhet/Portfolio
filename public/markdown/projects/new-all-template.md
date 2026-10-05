---
title: "ICPC Templates"
description: "Printable ICPC C++ templates ordered by priority, with the minimum notes needed to recall each one."
time: "Sat Oct 3, 2026"
---

# ICPC Templates

**1. Starter & Essentials**: Starter, Discretization, Binary / Ternary Search on Answer, Fast Power  
**2. Data Structures**: Disjoint Set Union, Binary Indexed Tree, Sparse Table (RMQ), Segment Tree (Lazy), Dynamic Segment Tree + Merge, Persistent Segment Tree, FHQ Treap, Splay, Mo's Algorithm, Square Root Decomposition, Li Chao Tree, Segment Tree Beats, Cartesian Tree, K-D Tree  
**3. Graph & Tree**: Graph Storage, Dijkstra, SPFA / Negative Cycle, 0-1 BFS, Floyd, Topological Sort, Minimum Spanning Tree, LCA (Binary Lifting, Tarjan), Heavy-Light Decomposition, Tarjan: SCC, Cut Vertex, Bridge, 2-SAT (with Kosaraju), Max Flow (Dinic), Bipartite Graph, Centroid Decomposition, Virtual Tree  
**4. Math**: GCD, Exgcd, Inverse, Primes and Sieves, Combinatorics, CRT / exCRT, BSGS, Matrix Fast Power, Gaussian Elimination, XOR Linear Basis, Möbius Inversion  
**5. String**: String Hash, KMP, Manacher, Trie, Aho–Corasick  
**6. Dynamic Programming**: Knapsack, LIS / LCS, Interval DP  
**7. Miscellaneous**: Simulated Annealing, Closest Pair of Points, Cantor Expansion, Bignum (Minimal)  
**8. Polynomial**: FFT  
**9. Appendix**: STL Cheat Sheet, Fast I/O, Stress Test (Linux)  

## 1. Starter & Essentials

### 1.1 Starter

```cpp
// g++ -std=c++17 -O2 test.cpp -o p && ./p < test.in > test.out
#define sandom signed
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std; using ll = long long; using ull = unsigned long long; using pii = pair<int, int>;
const int Z = 1e5 + 10, inf = 2e9, mod = 998244353;

int n, m, k, ans;
sandom main() {
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    return 0;
}
/**/
```

### 1.2 Discretization

Value $\to$ rank among distinct values, order preserved. $O(n \log n)$

```cpp
int ls[Z], len;
void discrete(int num[], int nm) {
    for (int i = 1; i <= nm; i++)    ls[i] = num[i];//转移临时数组
    sort(ls + 1, ls + 1 + nm);//排序
    len = unique(ls + 1, ls + 1 + nm) - ls - 1;//去重
    for (int i = 1; i <= nm; i++)//离散
        num[i] = lower_bound(ls + 1, ls + 1 + len, num[i]) - ls;
}
```

### 1.3 Binary / Ternary Search on Answer

Binary search: `check` monotone, find the last `mid` with `check(mid)` true. Ternary search: unimodal $f$, drop the worse third each step.

```cpp
int middle(int l, int r) { //二分答案
    int ans = 0;
    while (l <= r) {
        int mid = (l + r) >> 1;
        if (check(mid)) l = mid + 1, ans = mid;
        else r = mid - 1;
    }
    return ans;
}
```

```cpp
int two_middle(int l, int r) { //单谷函数求最小值（单峰函数把 < 改为 >）
    while (r - l > 2) { //区间太小时lmid、rmid可能与端点重合，不再缩小
        int lmid = l + (r - l) / 3, rmid = r - (r - l) / 3;
        if (f(lmid) < f(rmid)) r = rmid;
        else l = lmid;
    }
    int res = f(l);
    for (int i = l + 1; i <= r; ++i) res = min(res, f(i));//剩下不超过3个点直接枚举
    return res;
}
```

### 1.4 Fast Power

$a^b \bmod c$ in $O(\log b)$.

```cpp
//a底数，b指数，c取模数
int binpow(int a, int b, int c) {
    int res = 1 % c; //c = 1 时结果为 0
    a = a % c; //防止a过大
    while (b) {
        if (b & 1) res = res * a % c; //奇数补一项
        a = a * a % c;
        b >>= 1;
    }
    return res;
}
```

## 2. Data Structures

### 2.1 Disjoint Set Union

Path compression + union by size: $O(\alpha(n))$ per operation.

```cpp
struct DSU {
    vector<int> pa, sz;
    DSU(int n) : pa(n + 1), sz(n + 1, 1) { for (int i = 1; i <= n; i++) pa[i] = i; }
    // path compression
    inline int find(int x) { return x == pa[x] ? x : pa[x] = find(pa[x]); }
    // union by size
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false; // already in the same set
        if (sz[x] < sz[y]) swap(x, y);
        pa[y] = x, sz[x] += sz[y];
        return true;
    }
}; DSU dsu(n);
```

### 2.2 Binary Indexed Tree

$\operatorname{lowbit}(i) = i \,\&\, (-i)$, $c_i = \sum_{j = i - \operatorname{lowbit}(i) + 1}^{i} a_j$. Range add + range sum with difference $d$:
$$\sum_{i=1}^{x} a_i = (x+1) \sum_{j=1}^{x} d_j - \sum_{j=1}^{x} j \cdot d_j$$
2D: $\sum_{i \le x, j \le y} a_{i,j} = (x+1)(y+1)\sum d - (y+1)\sum d \, i - (x+1)\sum d \, j + \sum d \, ij$.

```cpp
using ll = long long;
struct BIT {
    int n; vector<ll> c;
    BIT(int n) : n(n), c(n + 1) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, ll v) {
        for (; x <= n; x += lowbit(x))
            c[x] += v;
    }
    ll sum(int x) {
        ll s = 0;
        for (; x; x -= lowbit(x))
            s += c[x];
        return s;
    }
    ll sum(int l, int r) { return sum(r) - sum(l - 1); }
    int kth(ll k) { // smallest x with sum(x) >= k, all values >= 0
        int x = 0;
        for (int b = __lg(n); b >= 0; b--)
            if (x + (1 << b) <= n && c[x + (1 << b)] < k)
                x += 1 << b, k -= c[x];
        return x + 1;
    }
};
```

```cpp
BIT bit(n);
for (int i = 1; i <= n; i++) bit.add(i, a[i]);
bit.add(x, v); // a[x] += v
bit.sum(l, r); // a[l] + ... + a[r]
bit.kth(k);    // smallest x with a[1] + ... + a[x] >= k

// range add, point query: BIT on the difference d[i] = a[i] - a[i - 1]
for (int i = 1; i <= n; i++) bit.add(i, a[i] - a[i - 1]);
bit.add(l, v), bit.add(r + 1, -v); // a[l..r] += v
bit.sum(x);                        // a[x]

// inversion pairs after a[] discretized to 1..m (逆序对)
BIT bit(m); ll inv = 0;
for (int i = 1; i <= n; i++) {
    inv += i - 1 - bit.sum(a[i]);
    bit.add(a[i], 1);
}
```

```cpp
using ll = long long;
struct RangeBIT {
    int n; vector<ll> d, e; // d: difference, e: i * difference
    RangeBIT(int n) : n(n), d(n + 1), e(n + 1) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, ll v) {
        for (int i = x; i <= n; i += lowbit(i))
            d[i] += v, e[i] += v * x;
    }
    void add(int l, int r, ll v) { add(l, v), add(r + 1, -v); }
    ll sum(int x) {
        ll s = 0;
        for (int i = x; i; i -= lowbit(i))
            s += (x + 1) * d[i] - e[i];
        return s;
    }
    ll sum(int l, int r) { return sum(r) - sum(l - 1); }
};
```

```cpp
using ll = long long;
struct BIT2D {
    int n, m; vector<vector<ll>> c;
    BIT2D(int n, int m) : n(n), m(m), c(n + 1, vector<ll>(m + 1)) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, int y, ll v) {
        for (int i = x; i <= n; i += lowbit(i))
            for (int j = y; j <= m; j += lowbit(j))
                c[i][j] += v;
    }
    ll sum(int x, int y) {
        ll s = 0;
        for (int i = x; i; i -= lowbit(i))
            for (int j = y; j; j -= lowbit(j))
                s += c[i][j];
        return s;
    }
    ll sum(int x1, int y1, int x2, int y2) {
        return sum(x2, y2) - sum(x1 - 1, y2) - sum(x2, y1 - 1) + sum(x1 - 1, y1 - 1);
    }
};
```

```cpp
using ll = long long;
struct RangeBIT2D {
    int n, m; vector<vector<array<ll, 4>>> c; // d, d*i, d*j, d*i*j
    RangeBIT2D(int n, int m) : n(n), m(m), c(n + 1, vector<array<ll, 4>>(m + 1)) {}
    static inline int lowbit(int x) { return x & -x; }
    void add(int x, int y, ll v) {
        for (int i = x; i <= n; i += lowbit(i))
            for (int j = y; j <= m; j += lowbit(j)) {
                auto &t = c[i][j];
                t[0] += v, t[1] += v * x, t[2] += v * y, t[3] += v * x * y;
            }
    }
    void add(int x1, int y1, int x2, int y2, ll v) {
        add(x1, y1, v), add(x1, y2 + 1, -v);
        add(x2 + 1, y1, -v), add(x2 + 1, y2 + 1, v);
    }
    ll sum(int x, int y) {
        ll s = 0;
        for (int i = x; i; i -= lowbit(i))
            for (int j = y; j; j -= lowbit(j)) {
                auto &t = c[i][j];
                s += ll(x + 1) * (y + 1) * t[0] - (y + 1) * t[1] - (x + 1) * t[2] + t[3];
            }
        return s;
    }
    ll sum(int x1, int y1, int x2, int y2) {
        return sum(x2, y2) - sum(x1 - 1, y2) - sum(x2, y1 - 1) + sum(x1 - 1, y1 - 1);
    }
};
```

### 2.3 Sparse Table (RMQ)

$dp_{i,j} = \max(dp_{i,j-1}, dp_{i+2^{j-1},j-1})$; query with $t = \lfloor \log_2(r-l+1) \rfloor$. $O(1)$ query.

```cpp
int dp[Z][30];
void ST(int n) {
    for (int i = 1; i <= n; i++)    dp[i][0] = dat[i];
    int t = log2(n);
    for (int j = 1; j <= t; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            dp[i][j] = max(dp[i][j - 1], dp[i + (1 << (j - 1))][j - 1]);
}
int RMQ(int l, int r) {
    int t = log2(r - l + 1);
    return max(dp[l][t], dp[r - (1 << t) + 1][t]);
}
```

### 2.4 Segment Tree (Lazy)

Node covers `[l, r]`, children `2rt`, `2rt+1`; push lazy tags down only when entering a node. $O(\log n)$ per operation.

```cpp
class SegmentTree {
public:
    struct TreeNode {
        int l, r;
        int sum, max;
        int lz;
        TreeNode () { sum = 0, max = -1e9, lz = 0; }
        #define lk (rt << 1)
        #define rk (rt << 1 | 1)
        #define mid (tr[rt].l + tr[rt].r >> 1)
    }; 
    TreeNode tr[Z << 2];
    // default root is index 1
    void change(int rt, int val) { //修改线段树
        tr[rt].lz += val;
        tr[rt].sum += (tr[rt].r - tr[rt].l + 1) * val;
        tr[rt].max += val;
    }
    void pushup(TreeNode &rt, TreeNode lc, TreeNode rc) { //向上更新信息
        rt.sum = lc.sum + rc.sum;
        rt.max = max(lc.max, rc.max);
    }
    void pushdown(int rt) { //向下更新延迟,下放标记
        if (tr[rt].lz) {
            change(lk, tr[rt].lz);
            change(rk, tr[rt].lz);
            tr[rt].lz = 0;
        }
    }
    void build(int rt, int l, int r) { //建立线段树
        tr[rt].l = l, tr[rt].r = r;
        if (l == r) {
            tr[rt].sum = tr[rt].max = w[l];
            return;
        }
        build(lk, l, mid);
        build(rk, mid + 1, r);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    void update(int rt, int l, int r, int val) { //区间更新
        if (l <= tr[rt].l && tr[rt].r <= r) { change(rt, val); return; }//真子集
        pushdown(rt);
        if (l <= mid) update(lk, l, r, val);
        if (r > mid)  update(rk, l, r, val);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    TreeNode query(int rt, int l, int r) { //区间查询
        if (l <= tr[rt].l && tr[rt].r <= r) return tr[rt];
        pushdown(rt);
        if (r <= mid) return query(lk, l, r);
        if (l > mid) return query(rk, l, r);
        TreeNode res;
        pushup(res, query(lk, l, r), query(rk, l, r));
        return res;
    }

    void update(int rt, int pos, int val) { //单点更新
        if (tr[rt].l == tr[rt].r) { change(rt, val); return; }
        pushdown(rt);
        if (pos <= mid) update(lk, pos, val);
        else update(rk, pos, val);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    TreeNode query(int rt, int pos) { //单点查询
        if (tr[rt].l == tr[rt].r) return tr[rt];
        pushdown(rt);
        if (pos <= mid) return query(lk, pos);
        else return query(rk, pos);
    }
};
```

### 2.5 Dynamic Segment Tree + Merge

Create nodes on demand (`tot`); merge two trees in total $O(n \log n)$. Node 0's `sum/max/min` are the identities.

```cpp
#define ST Segment_Tree
struct Segment_Tree {
    int l, r;
    int sum, max, min;
    Segment_Tree () { sum = 0, max = -1e9, min = 1e9; }
    #define lk tr[rt].l
    #define rk tr[rt].r
    #define mid ((L + R) >> 1)
}; Segment_Tree tr[Z];
int tot;
inline void change(int rt, int val) { tr[rt].sum += val, tr[rt].max = tr[rt].min = tr[rt].sum; }//叶子单点加
inline void pushup(int rt) { //空节点0的sum/max/min恰好是单位元
    tr[rt].sum = tr[lk].sum + tr[rk].sum;
    tr[rt].max = max(tr[lk].max, tr[rk].max);
    tr[rt].min = min(tr[lk].min, tr[rk].min);
}
//L-R：当前节点所代表的区间。l-r：查询与修改的区间
void update(int& rt, int L, int R, int pos, int val) {
    if (!rt) rt = ++tot;
    if (L == R) { change(rt, val); return; }
    pos <= mid ? update(lk, L, mid, pos, val) : update(rk, mid + 1, R, pos, val);
    pushup(rt);
}
int query(int rt, int L, int R, int l, int r) {
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum;
    if (r <= mid) return query(lk, L, mid, l, r);
    if (l > mid) return query(rk, mid + 1, R, l, r);
    return query(lk, L, mid, l, r) + query(rk, mid + 1, R, l, r);
}
int merge(int rt, int ut, int L, int R) { //线段树合并
    if (!rt || !ut) return rt + ut;
    if (L == R) { change(rt, tr[ut].sum); return rt; }
    lk = merge(lk, tr[ut].l, L, mid);
    rk = merge(rk, tr[ut].r, mid + 1, R);
    pushup(rt); return rt;
}
```

### 2.6 Persistent Segment Tree

Each update copies one root-to-leaf path; version $i$ is `rt[i]`. On a value-indexed tree, `rt[r]` minus `rt[l-1]` gives counts in $a_l..a_r$ ($k$-th smallest in a range).

```cpp
#define PT President_Tree
struct President_Tree {
    int lc, rc;
    int sum;
    #define lk tr[rt].lc
    #define rk tr[rt].rc
    #define mid ((L + R) >> 1)
}; President_Tree tr[Z];
int tot;
void build(int& rt, int L, int R) {
    rt = ++tot;//动态开点
    tr[rt].sum = 0;
    if (L == R) return;
    build(lk, L, mid);
    build(rk, mid + 1, R);
}
int update(int pre, int L, int R, int pos, int val) {
    int rt = ++tot;
    tr[rt] = tr[pre];//继承上一个历史版本
    tr[rt].sum += val;
    if (L == R) return rt;
    if (pos <= mid) lk = update(lk, L, mid, pos, val);
    else rk = update(rk, mid + 1, R, pos, val);
    return rt;
}
int query(int rt, int L, int R, int l, int r) { //正常的询问
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum;
    int res = 0;
    if (l <= mid) res += query(lk, L, mid, l, r);
    if (r > mid) res += query(rk, mid + 1, R, l, r);
    return res;
}
```

### 2.7 FHQ Treap

No rotations. `split(rt, v)`: keys $\le v$ / $> v$; `merge(x, y)`: larger `dat` on top. Sentinels $\pm$`inf` from `build()`; `pre`/`nxt` return $\mp$`inf` if none. Expected $O(\log n)$.

```cpp
#define BST FHQ_Treap
struct BST {
    int son[2];//左右子节点
    int val, dat;//节点权值、大根堆判断标准
    int siz;//节点个数、子树大小
    #define lk bt[rt].son[0]
    #define rk bt[rt].son[1]
}; BST bt[Z];
int root, tot;
inline int est(int val) {
    bt[++tot].val = val;
    bt[tot].dat = rand();
    bt[tot].siz = 1;
    return tot;
}
inline void pushup(int rt) {
    bt[rt].siz = bt[lk].siz + bt[rk].siz + 1;
}
inline void build() {
    root = est(-inf);
    bt[root].son[1] = est(inf);
    pushup(root);
}
void split(int rt, int val, int &x, int &y) {
    if (!rt) { x = y = 0; return; }
    if (bt[rt].val <= val) x = rt, split(rk, val, rk, y);
    else y = rt, split(lk, val, x, lk);
    pushup(rt);
}
int merge(int x, int y) {
    int rt = x + y;
    if (!x || !y) return rt;
    if (bt[x].dat > bt[y].dat) rt = x, rk = merge(rk, y);
    else rt = y, lk = merge(x, lk);
    pushup(rt); return rt;
}
inline void insert(int val) {
    int x, y;
    split(root, val - 1, x, y);
    root = merge(merge(x, est(val)), y);
}
inline void remove(int val) {
    int x, y, z;
    split(root, val, x, z);
    split(x, val - 1, x, y);
    //只删除一个
    if (y) y = merge(bt[y].son[0], bt[y].son[1]);
    root = merge(merge(x, y), z);
    //删除全部
    // root = merge(x, z);
}
int kth(int rt, int k) { //子树rt中第k小的权值
    while (true) {
        if (k <= bt[lk].siz) rt = lk;
        else if (k == bt[lk].siz + 1) return bt[rt].val;
        else k -= bt[lk].siz + 1, rt = rk;
    }
}
inline int getrank(int val) { //比val小的个数+1（哨兵-inf正好补上+1）
    int x, y;
    split(root, val - 1, x, y);
    int res = bt[x].siz;
    root = merge(x, y);
    return res;
}
inline int getkth(int k) { return kth(root, k + 1); } //第k小（跳过哨兵-inf）
inline int pre(int val) { //前驱：小于val的最大值
    int x, y;
    split(root, val - 1, x, y);
    int res = kth(x, bt[x].siz);
    root = merge(x, y);
    return res;
}
inline int nxt(int val) { //后继：大于val的最小值
    int x, y;
    split(root, val, x, y);
    int res = kth(y, 1);
    root = merge(x, y);
    return res;
}
```

### 2.8 Splay

Splay every accessed node to the root (amortized $O(\log n)$). `rotate` lifts a node one level; `splay(x, to)` lifts `x` until its parent is `to`.

```cpp
#define BST Splay
struct BST {
    int son[2], dad;//子节点、父节点
    int val;//节点权值
    int cnt, siz;//节点个数、子树大小
    #define lk bt[rt].son[0]
    #define rk bt[rt].son[1]
    #define fa bt[rt].dad
    #define pa bt[bt[rt].dad].dad
}; BST bt[Z];
int root, tot;
inline void pushup(int rt) { //更新信息
    bt[rt].siz = bt[lk].siz + bt[rk].siz + bt[rt].cnt;
}
inline int est(int val, int dad) { //建立新节点
    bt[++tot].val = val;
    bt[tot].dad = dad;
    bt[tot].cnt = bt[tot].siz = 1;
    return tot;
}
inline void build() { //初始化
    root = est(-inf, 0);
    bt[root].son[1] = est(inf, root);
    pushup(root);
}
void build(int &rt, int dad, int l, int r) { //递归建树
    if (l > r) return;
    int mid = l + r >> 1; rt = est(a[mid], dad);
    build(lk, rt, l, mid - 1), build(rk, rt, mid + 1, r);
    pushup(rt);
}
inline bool get(int rt) { //左孩子还是右孩子
    return bt[fa].son[1] == rt;
}
inline void un(int rt, int dad, int kid) { //把rt接在dad的kid儿子上
    bt[dad].son[kid] = rt, fa = dad;
}
inline void rotate(int rt) { //上旋
    int dad = fa, kid = get(rt);
    un(rt, pa, get(fa));//儿子先取代父亲
    un(bt[rt].son[kid ^ 1], dad, kid);//把儿子的孩子给父亲
    un(dad, rt, kid ^ 1);//把父亲变为rt的儿子
    pushup(dad), pushup(rt);
}
inline void splay(int rt, int to) { //将rt旋转为to的儿子
    while (fa != to) {
        if (pa != to) rotate(get(rt) == get(fa) ? fa : rt);
        rotate(rt);
    }
    if (!to) root = rt;//更新树根
}
void insert(int &rt, int val, int dad) { //插入节点
    if (!rt) { rt = est(val, dad), splay(rt, 0); return; }
    if (val == bt[rt].val) bt[rt].cnt++, bt[rt].siz++, splay(rt, 0);
    else val < bt[rt].val ? insert(lk, val, rt) : insert(rk, val, rt);
}
void remove(int rt, int val) { //删除节点
    if (!rt) return;
    if (val == bt[rt].val) {
        if (bt[rt].cnt > 1) bt[rt].cnt--, bt[rt].siz--, splay(rt, 0);
        else if (lk) rotate(lk), remove(rt, val);
        else if (rk) rotate(rk), remove(rt, val);
        else bt[fa].son[get(rt)] = 0, pushup(fa), splay(fa, 0);//成为了叶子节点
    }
    else val < bt[rt].val ? remove(lk, val) : remove(rk, val);
}
```

### 2.9 Mo's Algorithm

Sort queries by (block of $l$, $r$), move two pointers: $O((n + m)\sqrt n)$. With modifications: add a time pointer, block $n^{2/3}$, $O(n^{5/3})$. Rollback: only add, undo the left part with a stack.

```cpp
int block[Z];
int a[Z], c[Z]; ll ans[Z];
struct query {
    int l, r, id;
    friend bool operator <(const query& A, const query& B) { //奇偶性排序
        if (block[A.l] != block[B.l]) return A.l < B.l;//优先按左端点块
        if (block[A.l] & 1) return A.r < B.r;//奇数块升序
        return A.r > B.r;//偶数块降序
    }
}; query ser[Z];

void add(int x, ll& res) {
    res += (2 * c[x] + 1);
    c[x]++;
}
void del(int x, ll& res) {
    res -= (2 * c[x] - 1);
    c[x]--;
}
sandom main() {
    n = read(); m = read(); t = sqrt(n);
    for (int i = 1; i <= n; i++)//确定每个端点所在块
        block[i] = (i - 1) / t + 1;
    for (int i = 1; i <= n; i++) a[i] = read();
    for (int i = 1; i <= m; i++) { //离线查询
        ser[i].l = read();
        ser[i].r = read();
        ser[i].id = i;
    }
    sort(ser + 1, ser + 1 + m);
    int nl = 1, nr = 0; ll res = 0;
    for (int i = 1; i <= m; i++) {
        query q = ser[i];
        while (q.l < nl) add(a[--nl], res);//区间扩大
        while (q.r > nr) add(a[++nr], res);//先移动，再添加
        while (q.l > nl) del(a[nl++], res);//区间缩小
        while (q.r < nr) del(a[nr--], res);//先删除，再移动
        ans[q.id] = res;
    }
    for (int i = 1; i <= m; i++) write(ans[i]);
    return 0;
}
```

```cpp
int block[Z], ans[Z];
int a[Z], c[E], pre[Z];
struct query {
    int l, r, id, tim;
    query() {}
    query(int A, int B, int C, int D) {l = A; r = B; id = C; tim = D;}
    friend bool operator <(const query& A, const query& B) {
        if (block[A.l] != block[B.l]) return A.l < B.l;//优先按左端点块
        if (block[A.r] != block[B.r]) {
            if (block[A.l] & 1) return A.r < B.r;//奇数块升序
            else return A.r > B.r;//偶数块降序
        }
        return A.tim < B.tim;//再加一维时间戳
    }
}; query ask[Z];
struct modify {
    int pos, col, old;
    modify() {}
    modify(int A, int B, int C) {pos = A; col = B; old = C;}
}; modify cha[Z];

int nl = 1, nr = 0, nt = 0, na = 0;
inline void add(int x) {
    if (c[x] == 0) na++;
    c[x]++;
}
inline void del(int x) {
    c[x]--;
    if (c[x] == 0) na--;
}
inline void ward(int x, int col) {
    if (x >= nl && x <= nr) {
        del(a[x]);
        add(col);
    }
    a[x] = col;
}
sandom main() {
    n = read(); m = read(); t = pow(n, 2.0 / 3);//带修莫队块长取 n^(2/3)
    for (int i = 1; i <= n; i++)
        block[i] = (i - 1) / t + 1;
    for (int i = 1; i <= n; i++) a[i] = pre[i] = read();
    int timi = 0, tot = 0;
    for (int i = 1; i <= m; i++) {
        char ch = read_char();
        int x = read(), y = read();
        if (ch == 'Q') ++tot, ask[tot] = query(x, y, tot, timi);//多加一个时间维度
        if (ch == 'R') cha[++timi] = modify(x, y, pre[x]), pre[x] = y;//记录修改之前是什么颜色
    }
    sort(ask + 1, ask + 1 + tot);
    for (int i = 1; i <= tot; i++) {
        query q = ask[i];
        while (q.tim > nt) ++nt, ward(cha[nt].pos, cha[nt].col);//继续修改
        while (q.tim < nt) ward(cha[nt].pos, cha[nt].old), nt--;//修改回溯
        while (q.l < nl) add(a[--nl]);//区间扩大
        while (q.r > nr) add(a[++nr]);//先移动，再添加
        while (q.l > nl) del(a[nl++]);//区间缩小
        while (q.r < nr) del(a[nr--]);//先删除，再移动
        ans[q.id] = na;
    }
    for (int i = 1; i <= tot; i++) write(ans[i]);
    return 0;
}
```

```cpp
int n, m, k, ans[Z];
int be[Z], p[Z], d[Z];
struct ant {
    int l, r, id;
    friend bool operator <(ant A, ant B) {
        if (be[A.l] == be[B.l]) return A.r < B.r;//保证同一块内右端点只扩展
        return A.l < B.l;//分块讨论
    }
}; ant que[Z];
int L[Z], R[Z];
int l, r, res, top;
struct delte { int a, b, c, d, e; }; delte stk[Z];
inline void add(int x, bool op) {
    L[x] = R[x] = x;
    if (L[x - 1]) L[x] = L[x - 1];
    if (R[x + 1]) R[x] = R[x + 1];
    if (op) stk[++top] = delte{L[x], R[L[x]], R[x], L[R[x]], x};
    R[L[x]] = R[x], L[R[x]] = L[x];
    res = max(res, R[x] - L[x] + 1);
}
inline void del(delte x) { R[x.a] = x.b, L[x.c] = x.d, L[x.e] = R[x.e] = 0; }
inline int violent(int l, int r) { //在同一块内暴力扫
    int ans = 1, cnt = 1;
    for (int i = l; i <= r; i++) d[i] = p[i];
    sort(d + l, d + r + 1); d[l - 1] = -1;
    for (int i = l; i <= r; i++) {
        if (d[i] == d[i - 1] + 1) cnt++;
        else cnt = 1;
        ans = max(ans, cnt);
    }
    return ans;
}

sandom main() {
    n = read(), m = read(); int t = sqrt(n);
    for (int i = 1; i <= n; i++) be[i] = (i - 1) / t + 1;
    for (int i = 1; i <= n; i++) p[i] = read();
    for (int i = 1; i <= m; i++) que[i].l = read(), que[i].r = read(), que[i].id = i;
    sort(que + 1, que + 1 + m);
    for (int i = 1; i <= m; i++) {
        ant q = que[i];
        if (be[q.l] != be[que[i - 1].l]) { //进入下一块清空
            for (int i = 1; i <= n; i++) L[i] = R[i] = 0;
            r = min(t * be[q.l], n), l = r + 1; res = 0;
        }
        if (be[q.l] == be[q.r]) ans[q.id] = violent(q.l, q.r);//同一块暴力扫
        else {
            while (r < q.r) add(p[++r], 0);//持续扩展
            int tmp = res;
            while (l > q.l) add(p[--l], 1);//扩展完撤销
            ans[q.id] = res; res = tmp;
            while (top) del(stk[top--]), l++;//回滚撤销
        }
    }
    for (int i = 1; i <= m; i++) write(ans[i]);
    return 0;
}
```

### 2.10 Square Root Decomposition

Blocks of size $\sqrt n$: whole blocks by tags, ends by brute force. $O(\sqrt n)$ per operation.

```cpp
int L[Z], R[Z], bel[Z];
int a[Z], sum[Z], add[Z];
void modify(int l, int r, int val) {
    int ll = bel[l], rr = bel[r];
    if (ll == rr) { //l和r在同一块
        for (int i = l; i <= r; i++) a[i] += val;
        sum[ll] += (r - l + 1) * val;
    }
    else {
        for (int i = ll + 1; i < rr; i++) add[i] += val;//区块标记
        for (int i = l; i <= R[ll]; i++) a[i] += val;//两侧零散区间
        sum[ll] += (R[ll] - l + 1) * val;
        for (int i = L[rr]; i <= r; i++) a[i] += val;
        sum[rr] += (r - L[rr] + 1) * val;
    }
}
int ask(int l, int r) {
    int res = 0;
    int ll = bel[l], rr = bel[r];
    if (ll == rr) { //l和r在同一块
        for (int i = l; i <= r; i++) res += a[i];
        res += (r - l + 1) * add[ll];
    }
    else {
        for (int i = ll + 1; i < rr; i++)//原区块和+标记
            res += sum[i] + add[i] * (R[i] - L[i] + 1);
        for (int i = l; i <= R[ll]; i++) res += a[i];//两侧零散区间
        res += (R[ll] - l + 1) * add[ll];
        for (int i = L[rr]; i <= r; i++) res += a[i];
        res += (r - L[rr] + 1) * add[rr];
    }
    return res;
}
inline void init() {
    t = sqrt(n);//划分区块
    for (int i = 1; i <= t; i++) { //预处理每一块的左右端点
        L[i] = R[i - 1] + 1;
        R[i] = i * (n / t);
    }
    if (R[t] < n) ++t, L[t] = R[t - 1] + 1, R[t] = n;
    for (int i = 1; i <= t; i++)
        for (int j = L[i]; j <= R[i]; j++) {
            bel[j] = i;//节点所属区块
            sum[i] += a[j];//区块和
        }
}
signed main() {
    n = read(); m = read();
    for (int i = 1; i <= n; i++) a[i] = read();
    init();
    while (m--) {
        int op, l, r, v;
        op = read(), l = read(), r = read();
        if (op) v = read(), modify(l, r, v);
        else ans = ask(l, r);
    }
}
```

### 2.11 Li Chao Tree

Each node keeps the line best at its midpoint; the loser goes to the one side where it can still win. Line $O(\log n)$, segment $O(\log^2 n)$, query $O(\log n)$.

```cpp
struct line { double k, b; } p[Z << 2];
double calc(int id, int x) { return p[id].k * x + p[id].b; }
int cmp(double x, double y) {
    if (x - y > eps) return 1;
    if (y - x > eps) return -1;
    return 0;
}
void add(int x0, int y0, int x1, int y1) {
    ++tot;
    if (x0 == x1) p[tot].k = 0, p[tot].b = max(y0, y1);
    else p[tot].k = 1.0 * (y1 - y0) / (x1 - x0), p[tot].b = y0 - p[tot].k * x0;
}
pair<int, double> Max(pair<int, double> x, pair<int, double> y) {
    int z = cmp(x.second, y.second);
    if (z == 1 || (!z && x.first < y.first)) return x;
    else return y;
}
struct tree {
    int l, r, s;
    #define lk (rt << 1)
    #define rk (rt << 1 | 1)
    #define mid (tr[rt].l + tr[rt].r >> 1)
}; tree tr[Z << 2];
void build(int rt, int l, int r) {
    tr[rt].l = l, tr[rt].r = r;
    if (l == r) return;
    build(lk, l, mid), build(rk, mid + 1, r);
}
void change(int rt, int u) { //更新覆盖标记
    int &v = tr[rt].s;
    int dm = cmp(calc(u, mid), calc(v, mid));
    if (dm == 1 || (!dm && u < v)) swap(u, v);//v为中点处更优的线段
    int dl = cmp(calc(u, tr[rt].l), calc(v, tr[rt].l)), dr = cmp(calc(u, tr[rt].r), calc(v, tr[rt].r));
    if (dl == 1 || (!dl && u < v)) change(lk, u);
    if (dr == 1 || (!dr && u < v)) change(rk, u);
}
void update(int rt, int l, int r, int id) {
    if (l <= tr[rt].l && r >= tr[rt].r) { change(rt, id); return; }
    if (l <= mid) update(lk, l, r, id);
    if (r > mid) update(rk, l, r, id);
}
pair<int, double> query(int rt, int k) {
    pair<int, double> res = make_pair(tr[rt].s, calc(tr[rt].s, k));
    if (tr[rt].l == tr[rt].r) return res;
    if (k <= mid) res = Max(res, query(lk, k));
    else res = Max(res, query(rk, k));
    return res;
}
```

### 2.12 Segment Tree Beats

Range chmin + range add + sum/max/history max. Tags split by max / non-max elements. $O(n \log^2 n)$.

```cpp
struct tree {
    int l, r, sum;
    int maxa, maxb, maxc, cnt;//当前最大值、历史最大值、当前次大值、最大值个数
    int lz1, lz2, lz3, lz4;//最大值的标记、非最大值的标记、历史最大值标记的最大值、历史非最大值标记的最大值
    #define lk (rt << 1)
    #define rk (rt << 1 | 1)
    #define mid (tr[rt].l + tr[rt].r >> 1)
}; tree tr[Z << 2];
inline void add(int rt, int k1, int k2, int k3, int k4) {
    tr[rt].sum += k1 * tr[rt].cnt + k2 * (tr[rt].r - tr[rt].l + 1 - tr[rt].cnt);
    tr[rt].maxb = max(tr[rt].maxb, tr[rt].maxa + k3); tr[rt].maxa += k1;
    if (tr[rt].maxc != -inf) tr[rt].maxc += k2;
    tr[rt].lz3 = max(tr[rt].lz3, tr[rt].lz1 + k3); tr[rt].lz1 += k1;
    tr[rt].lz4 = max(tr[rt].lz4, tr[rt].lz2 + k4); tr[rt].lz2 += k2;
}
inline void pushup(int rt) {
    tr[rt].sum = tr[lk].sum + tr[rk].sum;
    tr[rt].maxa = max(tr[lk].maxa, tr[rk].maxa);
    tr[rt].maxb = max(tr[lk].maxb, tr[rk].maxb);
    if (tr[lk].maxa > tr[rk].maxa) {
        tr[rt].maxc = max(tr[lk].maxc, tr[rk].maxa);
        tr[rt].cnt = tr[lk].cnt;
    }
    else if (tr[lk].maxa < tr[rk].maxa) {
        tr[rt].maxc = max(tr[rk].maxc, tr[lk].maxa);
        tr[rt].cnt = tr[rk].cnt;
    }
    else {
        tr[rt].maxc = max(tr[lk].maxc, tr[rk].maxc);
        tr[rt].cnt = tr[lk].cnt + tr[rk].cnt;
    }
}
inline void pushdown(int rt) {
    int mx = max(tr[lk].maxa, tr[rk].maxa);
    if (tr[lk].maxa == mx) add(lk, tr[rt].lz1, tr[rt].lz2, tr[rt].lz3, tr[rt].lz4);
    else add(lk, tr[rt].lz2, tr[rt].lz2, tr[rt].lz4, tr[rt].lz4);
    if (tr[rk].maxa == mx) add(rk, tr[rt].lz1, tr[rt].lz2, tr[rt].lz3, tr[rt].lz4);
    else add(rk, tr[rt].lz2, tr[rt].lz2, tr[rt].lz4, tr[rt].lz4);
    tr[rt].lz1 = tr[rt].lz2 = tr[rt].lz3 = tr[rt].lz4 = 0;
}
void build(int rt, int l, int r) {
    tr[rt].l = l, tr[rt].r = r;
    if (l == r) {
        tr[rt].sum = tr[rt].maxa = tr[rt].maxb = a[l];
        tr[rt].maxc = -inf; tr[rt].cnt = 1;
        return;
    }
    build(lk, l, mid), build(rk, mid + 1, r);
    pushup(rt);
}
void update_sum(int rt, int l, int r, int k) {
    if (l <= tr[rt].l && r >= tr[rt].r) { add(rt, k, k, k, k); return; }
    pushdown(rt);
    if (l <= mid) update_sum(lk, l, r, k);
    if (r > mid) update_sum(rk, l, r, k);
    pushup(rt);
}
void update_min(int rt, int l, int r, int k) {
    if (k >= tr[rt].maxa) return;
    if (l <= tr[rt].l && r >= tr[rt].r && k >= tr[rt].maxc) { add(rt, k - tr[rt].maxa, 0, k - tr[rt].maxa, 0); return; }
    pushdown(rt);
    if (l <= mid) update_min(lk, l, r, k);
    if (r > mid) update_min(rk, l, r, k);
    pushup(rt);
}
int query_sum(int rt, int l, int r) {
    if (l <= tr[rt].l && r >= tr[rt].r) return tr[rt].sum;
    pushdown(rt); int res = 0;
    if (l <= mid) res += query_sum(lk, l, r);
    if (r > mid) res += query_sum(rk, l, r);
    return res;
}
int query_max(int rt, int l, int r, bool op) {
    if (l <= tr[rt].l && r >= tr[rt].r) return op ? tr[rt].maxa : tr[rt].maxb;
    pushdown(rt); int res = -1e9;
    if (l <= mid) res = max(res, query_max(lk, l, r, op));
    if (r > mid) res = max(res, query_max(rk, l, r, op));
    return res;
}
```

### 2.13 Cartesian Tree

BST on index, min-heap on value; monotonic stack, $O(n)$. Root is `s[1]`.

```cpp
//笛卡尔树
void build() {
    for (int i = 1, top = 0, pos = 0; i <= n; ++i) {
        top = pos;//pos为当前栈顶，top为操作前栈顶
        while (pos && p[s[pos]] > p[i]) pos--;//单调栈
        if (pos) r[s[pos]] = i;//找到一个比自己小的点，接到右儿子上
        if (pos < top) l[i] = s[pos + 1];//把中间比自己大的点作为左儿子
        s[++pos] = i;
    }
}
```

### 2.14 K-D Tree

Median split, alternating dimension; rebuild a subtree when a child holds more than $\alpha$ of it. Nearest/farthest with bounding-box pruning (2D, Manhattan).

```cpp
const int inf = 2e9;
const double alpha = 0.75;
bool o;//当前维度
struct point {
    int p[3];
    friend bool operator <(point A, point B) { return A.p[o] < B.p[o]; }
    friend bool operator ==(point A, point B) { return A.p[2] == B.p[2]; }
    friend bool operator !=(point A, point B) { return A.p[2] != B.p[2]; }
}; point a[Z];
inline int calc(point x, point y) { return abs(x.p[0] - y.p[0]) + abs(x.p[1] - y.p[1]); }
struct KDtree {
    point pt;//当前节点所代表的点
    int l, r, siz;//左右孩子及子树大小
    int max[2], min[2];//最大与最小的横纵坐标
    #define lk kd[rt].l
    #define rk kd[rt].r
    #define mid (l + r >> 1)
}; KDtree kd[Z << 1];
int root, tot, Max, Min;
int rub[Z], cnt;//重构时回收的节点
inline void pushup(int rt) {
    for (int i = 0; i <= 1; ++i) {
        kd[rt].max[i] = kd[rt].min[i] = kd[rt].pt.p[i];//因为会重构所以每次都要初始化
        if (lk) kd[rt].max[i] = max(kd[rt].max[i], kd[lk].max[i]), kd[rt].min[i] = min(kd[rt].min[i], kd[lk].min[i]);
        if (rk) kd[rt].max[i] = max(kd[rt].max[i], kd[rk].max[i]), kd[rt].min[i] = min(kd[rt].min[i], kd[rk].min[i]);
    }
    kd[rt].siz = kd[lk].siz + kd[rk].siz + 1;
}
inline int est(point x) { //动态开点
    int rt = cnt ? rub[cnt--] : ++tot;
    kd[rt].pt = x, lk = rk = 0;
    pushup(rt); return rt;
}
int build(int l, int r, bool op) { //初始建树
    o = op;//自定义排序方式（表示维度）
    nth_element(a + l, a + mid, a + r + 1);
    int rt = est(a[mid]);//定位中位数
    if (l < mid) lk = build(l, mid - 1, !op);
    if (r > mid) rk = build(mid + 1, r, !op);
    pushup(rt); return rt;
}
void rebuild(int rt, int num) { //重构，把树还原为原序列
    if (lk) rebuild(lk, num);
    a[num + kd[lk].siz + 1] = kd[rt].pt, rub[++cnt] = rt;
    if (rk) rebuild(rk, num + kd[lk].siz + 1);
}
inline void check(int &rt, int op) { //检查树是否平衡
    if (alpha * kd[rt].siz < max(kd[lk].siz, kd[rk].siz)) {
        rebuild(rt, 0);
        rt = build(1, kd[rt].siz, op);
    }
}
void insert(int &rt, point x, int op) { //插入
    if (!rt) { rt = est(x); return; }
    if (x.p[op] <= kd[rt].pt.p[op]) insert(lk, x, !op);
    else insert(rk, x, !op);
    pushup(rt); check(rt, op);
}
inline int estimate_max(int rt, point x) { //最大值估价函数
    int sum = 0;
    for (int i = 0; i <= 1; ++i)//找到理论极限距离最大的点对（已扩展的最大平面的顶点）
        sum += max(abs(x.p[i] - kd[rt].max[i]), abs(kd[rt].min[i] - x.p[i]));
    return sum;
}
inline int estimate_min(int rt, point x) { //最小值估价函数
    int sum = 0;
    for (int i = 0; i <= 1; ++i)//如果处于max和min的两侧，直接取最近；如果处于中间，则不知道还有没有其他的点，无法预估
        sum += max(x.p[i] - kd[rt].max[i], 0) + max(kd[rt].min[i] - x.p[i], 0);
    return sum;
}
void query_max(int rt, point x) { //查询最远
    Max = max(Max, calc(kd[rt].pt, x));
    int dl = 0, dr = 0;
    if (lk) dl = estimate_max(lk, x);
    if (rk) dr = estimate_max(rk, x);
    if (dl > dr) { //先跑最有可能达到最大值的
        if (dl > Max) query_max(lk, x);
        if (dr > Max) query_max(rk, x);
    }
    else {
        if (dr > Max) query_max(rk, x);
        if (dl > Max) query_max(lk, x);
    }
}
void query_min(int rt, point x) { //查询最近
    if (kd[rt].pt != x) Min = min(Min, calc(kd[rt].pt, x));
    int dl = inf, dr = inf;
    if (lk) dl = estimate_min(lk, x);
    if (rk) dr = estimate_min(rk, x);
    if (dl < dr) { //先跑最有可能达到最小值的
        if (dl < Min) query_min(lk, x);
        if (dr < Min) query_min(rk, x);
    }
    else {
        if (dr < Min) query_min(rk, x);
        if (dl < Min) query_min(lk, x);
    }
}
inline int ask(point x) {
    Max = 0, Min = inf;
    query_max(root, x), query_min(root, x);
    return Max - Min;
}
```

## 3. Graph & Tree

### 3.1 Graph Storage

Forward star; `cnt = 1` so edges `i` and `i ^ 1` are a pair.

```cpp
struct edge { int v, w, ne; } e[Z << 1];
int head[Z], cnt = 1;
inline void add(int x, int y, int z) {
    e[++cnt] = edge{y, z, head[x]};
    head[x] = cnt;
}
```

### 3.2 Dijkstra

Non-negative weights. $O((n + m) \log m)$

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path;
void dijkstra(int s) {
    priority_queue<pii, vector<pii>, greater<pii>> q;
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    dis[s] = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (d > dis[u]) continue; // outdated value
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                q.push({dis[v], v});
            }
        }
    }
}
vector<int> get_path(int t) { // from s to t
    vector<int> res;
    for (int v = t; v != 0; v = path[v])
        res.push_back(v);
    reverse(res.begin(), res.end());
    return res;
}
```

### 3.3 SPFA / Negative Cycle

A vertex enqueued $n$ times means a negative cycle. Worst case $O(nm)$.

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path, cnt, cycle;
vector<bool> vs;
void get_negative_cycle(int x); // defined below
//判断是否存在环
bool spfa(int s) {
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    cnt.assign(n + 1, 0);
    vs.assign(n + 1, false);
    queue<int> q;
    dis[s] = 0; q.push(s); vs[s] = true; cnt[s] = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop(); vs[u] = false;
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                if (!vs[v]) {
                    q.push(v); vs[v] = true;
                    if ((++cnt[v]) >= n) {
                        get_negative_cycle(v);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
void get_negative_cycle(int x) {
    // retrace to find a vertex definitely inside the cycle
    for (int i = 1; i <= n; i++) x = path[x];
    for (int v = x; ; v = path[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());
}
```

### 3.4 0-1 BFS

Weights 0/1: push to the front for 0, back for 1. $O(n + m)$

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis;
void zero_one_bfs(int s) {
    dis.assign(n + 1, INF);
    deque<int> q;
    dis[s] = 0;
    q.push_front(s);
    while (!q.empty()) {
        int u = q.front(); q.pop_front();
        for (auto [v, w] : e[u])
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                if (w == 0) q.push_front(v);
                else q.push_back(v);
            }
    }
}
```

### 3.5 Floyd

$D_k(u, v) = \min(D_{k-1}(u, v), D_{k-1}(u, k) + D_{k-1}(k, v))$, $O(n^3)$. Minimum cycle: before relaxing with $k$, try $dis_{i,j} + w_{i,k} + w_{k,j}$ for $i, j < k$.

```cpp
bool floyd_warshall(vector<vector<int>>& dis, vector<vector<int>>& w) {
    int n = dis.size() - 1;
    dis.assign(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++)
            dis[i][j] = w[i][j];
        dis[i][i] = min(dis[i][i], 0);
    }
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (dis[i][k] < INF && dis[k][j] < INF) // INF + INF overflows, INF + negative is not a path
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    
    for (int i = 1; i <= n; i++)
        if (dis[i][i] < 0) return false; // negative cycle exists
    return true;
}
```

```cpp
int floyd_ring(vector<vector<int>>& dis, vector<vector<int>>& w) { //最小环
    int n = dis.size() - 1, ans = INF;
    dis.assign(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dis[i][j] = w[i][j];
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i < k; i++)
            for (int j = i + 1; j < k; j++)
                if (dis[i][j] < INF && w[i][k] < INF && w[k][j] < INF) // INF * 3 overflows
                    ans = min(ans, dis[i][j] + w[i][k] + w[k][j]);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    }
    return ans;
}
```

### 3.6 Topological Sort

Kahn: repeatedly take in-degree 0. If `order.size() < n`, there is a cycle.

```cpp
vector<vector<int>> e;
vector<int> indeg, order;
void topo_sort_kahn(int n) {
    indeg.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            indeg[v]++;

    order.clear();
    queue<int> q;
    for (int u = 1; u <= n; u++)
        if (indeg[u] == 0) q.push(u);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : e[u])
            if (--indeg[v] == 0) q.push(v);
    }
}
```

### 3.7 Minimum Spanning Tree

Kruskal: sort edges, add if endpoints are in different sets, $O(m \log m)$. Prim (dense): $O(n^2)$.

```cpp
struct kusk {
    int u, v, w;
    friend bool operator <(const kusk& A, const kusk& B) { return A.w < B.w; }
}; vector<kusk> edges, mst;
int kruskal(int n, int m) { //需要上面的 DSU
    int tot = 0, sum = 0;
    DSU dsu(n);
    sort(edges.begin(), edges.end());
    for (kusk &e : edges)
        if (dsu.unite(e.u, e.v)) { // 不在同一集合中
            sum += e.w;
            mst.push_back(e);
            if ((++tot) == n - 1) return sum;
        }
    return tot == n - 1 ? sum : -1; // -1: not connected
}
```

```cpp
int e[Z][Z];
vector<bool> vs;
vector<int> dis;
int prim(int s) {
    vs.assign(n + 1, false);
    dis.assign(n + 1, INF);
    int sum = 0;
    dis[s] = 0;
    for (int i = 1; i <= n; i++) {
        int k = 0;
        for (int j = 1; j <= n; j++) //寻找与此点距离最小的点
            if (!vs[j] && dis[j] < dis[k])
                k = j;
        if (k == 0) return -1; // not connected
        vs[k] = 1;
        sum += dis[k];
        for (int j = 1; j <= n; j++) //更新k点到其他点的最小距离
            if (!vs[j] && e[k][j] < dis[j])
                dis[j] = e[k][j];
    }
    return sum;
}
```

### 3.8 LCA (Binary Lifting, Tarjan)

Binary lifting: $fa_{u,j} = fa_{fa_{u,j-1}, j-1}$; lift the deeper vertex to the same depth, then both while ancestors differ, $O(\log n)$. Tarjan (offline): after a child's subtree is done, merge it into the current vertex with DSU; for a query $(u, v)$ with $v$ finished, $\operatorname{LCA} = \operatorname{find}(v)$, $O((n + q)\,\alpha(n))$.

```cpp
void dfs_st(int rt, int dad) {
    fa[rt][0] = dad;
    dep[rt] = dep[dad] + 1;
    int t = log2(dep[rt]);
    for (int j = 1; j <= t; j++)
        fa[rt][j] = fa[fa[rt][j - 1]][j - 1];
    for (int i = head[rt]; i; i = e[i].ne)
        if (e[i].v != dad)  dfs_st(e[i].v, rt);
}
int LCA(int a, int b) {
    if (dep[a] < dep[b]) swap(a, b);
    for (int i = 20; i >= 0; i--)
        if (dep[fa[a][i]] >= dep[b])
            a = fa[a][i];
    if (a == b) return a;
    for (int i = 20; i >= 0; i--)
        if (fa[a][i] != fa[b][i]) {
            a = fa[a][i];
            b = fa[b][i];
        }
    return fa[a][0];
}
```

```cpp
int dis[Z], vs[Z];
void LCA_tarjan(int rt) {
    vs[rt] = 1;
    dad[rt] = rt;
    for (int i = head[rt]; i ; i = e[i].ne) {
        int j = e[i].v;
        if (vs[j]) continue;
        dis[j] = dis[rt] + e[i].w;
        LCA_tarjan(j);
        dad[j] = rt;//并查集：j的集合并到rt上（代表元必须是rt，不能按秩合并）
    }
    for (int i = 0; i < v[rt].size(); i = -~i) {
        int j = v[rt][i], id = vid[rt][i];
        if (vs[j] == 2 || j == rt) {
            int lca = find(j);
            ans[id] = dis[rt] + dis[j] - (dis[lca] << 1);
        }
    }
    vs[rt] = 2;
}
```

### 3.9 Heavy-Light Decomposition

Heavy child = largest subtree. A path splits into $O(\log n)$ chains, each a contiguous `dfn` range: $O(\log^2 n)$ with a segment tree. Subtree of $u$: $[dfn_u, dfn_u + siz_u - 1]$.

```cpp
int dep[Z], siz[Z], dad[Z], kid[Z];//kid[rt]：rt的重儿子编号
int tim, dfn[Z], rnk[Z], top[Z];//rnk[rt]：dfs序为rt的节点编号; top[rt]：rt所在重链的顶部节点
void search(int rt, int fa) { //寻找重边和重儿子
    dad[rt] = fa;
    dep[rt] = dep[fa] + 1, siz[rt] = 1;
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].to;
        if (son == fa) continue;
        search(son, rt);
        siz[rt] += siz[son];
        if (siz[son] > siz[kid[rt]]) kid[rt] = son;//更新重儿子
    }
}
void connect(int rt, int pa) { //连接重边构成重链
    dfn[rt] = ++tim, rnk[tim] = rt;
    top[rt] = pa;
    if (kid[rt]) connect(kid[rt], pa);//优先递归重儿子
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].to;
        if (son == kid[rt] || son == dad[rt]) continue;
        connect(son, son);//新建立一条重链
    }
}
```

```cpp
void modify(int x, int y, int val) { //对从x到y的简单路径上的点权值加val
    while (top[x] != top[y]) { //没在一条重链上
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        update(1, dfn[top[x]], dfn[x], val);
        x = dad[top[x]];//向上翻
    }
    if (dep[x] > dep[y]) swap(x, y);
    update(1, dfn[x], dfn[y], val);
}
int ask_sum(int x, int y) { //查询从x到y的简单路径上的点权值之和
    int ans = 0;
    while (top[x] != top[y]) { //没在一条重链上
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        ans += query_sum(1, dfn[top[x]], dfn[x]);
        x = dad[top[x]];//向上翻
    }
    if (dep[x] > dep[y]) swap(x, y);
    ans += query_sum(1, dfn[x], dfn[y]);
    return ans;
}
int ask_max(int x, int y) {
    int ans = -1e8;
    while (top[x] != top[y]) {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        ans = max(ans, query_max(1, dfn[top[x]], dfn[x]));
        x = dad[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    ans = max(ans, query_max(1, dfn[x], dfn[y]));
    return ans;
}
int LCA(int x, int y) {
    while (top[x] != top[y]) {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        x = dad[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    return x;
}
int nxt_son(int x, int y) { //x, y中一个是另一个的祖先，求祖先在通往另一点的路径上的儿子
    if (dep[x] < dep[y]) swap(x, y);//x为深的点，y为祖先
    while (top[x] != top[y]) {
        if (dad[top[x]] == y) return top[x];//不在一条重链上
        x = dad[top[x]];
    }
    return kid[y];//跳到了同一条重链上
}
sandom main() {
    search(1, 0);
    connect(1, 1);
    build(1, 1, n);
    work();
    return 0;
}
```

### 3.10 Tarjan: SCC, Cut Vertex, Bridge

$low_u = \min(dfn_u, low_v \text{ (tree edge)}, dfn_v \text{ (}v\text{ on stack / back edge)})$.
- SCC root: $low_u = dfn_u$.
- Cut vertex: non-root $u$ with child $v$, $low_v \ge dfn_u$; root needs $\ge 2$ children.
- Bridge: tree edge $(u, v)$ with $low_v > dfn_u$. Skip the parent edge by index (`i == (fa ^ 1)`).

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top;
int be[Z], num;
vector <int> scc[Z];
bool vs[Z];
void tarjan(int rt) {
    dfn[rt] = low[rt] = ++tim;//初始化：dfs序和low回溯数组
    dfs[++top] = rt; vs[rt] = 1;//标记已进栈
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!dfn[son]) { //还没有被访问过，直接访问
            tarjan(son);
            low[rt] = min(low[rt], low[son]);
        }
        else if (vs[son]) low[rt] = min(low[rt], dfn[son]);//已经被访问过且还在栈里
    }
    if (dfn[rt] == low[rt]) { //构成了强连通分量，其之后节点不能返回到rt之前
        int j; num++;
        do {
            j = dfs[top--]; vs[j] = 0;//标记出栈
            be[j] = num;//所属强连通分量
            scc[num].push_back(j);//该强连通分量集合
        } while (j != rt);
    }
}
void shrink() { //缩点
    for (int i = 1; i <= cnt; i++) { //枚举原有边，把各强连通分量建立联系
        int u = be[e[i].u], v = be[e[i].v];
        if (u != v) ADD(u, v);
    }
}
```

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top, num;
vector <int> vdcc[Z];
bool cut[Z];
void tarjan(int rt, int fa) { //割点
    dfn[rt] = low[rt] = ++tim;
    int kids = 0;//dfs树上的儿子数
    for (int i = head[rt]; i; i = e[i].ne) {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son]) {
            tarjan(son, i); kids++;
            low[rt] = min(low[rt], low[son]);
            if (low[son] >= dfn[rt]) cut[rt] = 1;//son不与rt以上的点联通，则想要从之前的点到达son，必须要经过rt
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (!fa && kids < 2) cut[rt] = 0;//如果是起点，则至少要有两棵子树才是割点
}
void tarjan(int rt, int fa) { //点双连通分量
    dfn[rt] = low[rt] = ++tim;
    dfs[++top] = rt;
    int kids = 0;
    for (int i = head[rt]; i; i = e[i].ne) {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son]) {
            tarjan(son, i); kids++;
            low[rt] = min(low[rt], low[son]);
            if (low[son] >= dfn[rt]) {
                int j; cut[rt] = 1;//rt是割点
                vdcc[++num].push_back(rt);//rt不能直接出栈，可能属于多个点双
                do {
                    j = dfs[top--];
                    vdcc[num].push_back(j);
                } while (j != son);
            }
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (!fa && kids < 2) cut[rt] = 0;
    if (!fa && !head[rt]) vdcc[++num].push_back(rt);//孤立单点
}
```

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top, num;
vector <int> edcc[Z];
bool cut[Z];
void tarjan(int rt, int fa) { //割边
    dfn[rt] = low[rt] = ++tim;
    for (int i = head[rt]; i; i = e[i].ne) {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son]) {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] > dfn[rt]) cut[i] = cut[i ^ 1] = 1;//son不与rt及以上的点联通，则除了rt——son这条边之外，没有其他边可以联通rt、son
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
}
void tarjan(int rt, int fa) { //边双连通分量
    dfn[rt] = low[rt] = ++tim;
    dfs[++top] = rt;
    for (int i = head[rt]; i; i = e[i].ne) {
        if (i == (fa ^ 1)) continue;
        int son = e[i].v;
        if (!dfn[son]) {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] > dfn[rt]) cut[i] = cut[i ^ 1] = 1;//割边
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (low[rt] == dfn[rt]) {
        int j; num++;
        do {
            j = dfs[top--];
            edcc[num].push_back(j);
        } while (j != rt);
    }
}
```

### 3.11 2-SAT (with Kosaraju)

Node $x$ / $\neg x = x + n$. Clause $(a \lor b)$: edges $\neg a \to b$, $\neg b \to a$. Unsatisfiable iff $x$ and $\neg x$ share an SCC; Kosaraju numbers SCCs in topological order, $x$ is true iff $scc_x > scc_{\neg x}$.

```cpp
vector<vector<int>> e, re, se;
vector<int> order, sccid;
vector<vector<int>> sccs;
void dfs1(int u) {
    sccid[u] = -1; // mark visited
    for (int v : e[u])
        if (!sccid[v]) dfs1(v);
    order.push_back(u); // exit time
}
void dfs2(int u, int cid) {
    sccid[u] = cid;
    sccs[cid].push_back(u); // current SCC
    for (int v : re[u])
        if (sccid[v] == -1) dfs2(v, cid);
}
void kosaraju(int n) {
    order.clear(), sccs.clear();
    // construct the transpose graph re
    re.assign(n + 1, {});
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            re[v].push_back(u);

    sccid.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        if (!sccid[u]) dfs1(u);
    reverse(order.begin(), order.end()); // decreasing order

    for (int u : order)
        if (sccid[u] == -1) {
            sccs.emplace_back();
            dfs2(u, sccs.size() - 1);
        }
}
void shrink(int n) {
    se.assign(sccs.size(), {});
    for (int u = 1; u <= n; u++)
        for (int v : e[u]) {
            int cu = sccid[u], cv = sccid[v];
            if (cu != cv) se[cu].push_back(cv); // duplicate edges allowed
        }
}
```

```cpp
vector<bool> ans;
void build_implication_graph(int n, int m) {
    e.assign(2 * n + 1, {});
    for (int i = 1; i <= m; i++) {
        int a, b; // literals in clause (a or b), read from input
        bool is_neg_a, is_neg_b; // read from input

        int ya = is_neg_a ? a + n : a; // node for a
        int yb = is_neg_b ? b + n : b; // node for b
        int na = is_neg_a ? a : a + n; // node for ¬a
        int nb = is_neg_b ? b : b + n; // node for ¬b
        e[na].push_back(yb); // ¬a -> b
        e[nb].push_back(ya); // ¬b -> a
    }
}
bool find_answer(int n) {
    kosaraju(2 * n); // find SCCs on all 2n nodes; sccid follows the topological order
    for (int i = 1; i <= n; i++) {
        if (sccid[i] == sccid[i + n]) // x and ¬x in same SCC
            return false; // unsatisfiable
    }
    ans.assign(n + 1, false);
    for (int i = 1; i <= n; i++)
        ans[i] = sccid[i] > sccid[i + n]; // x is true iff x comes after ¬x in topological order
    return true; // satisfiable
}
```

### 3.12 Max Flow (Dinic)

BFS level graph + DFS blocking flow with current arc. $O(V^2E)$; $O(E\sqrt V)$ on unit bipartite graphs. Max flow = min cut.

```cpp
namespace Dinic {
    int dis[Z], now[Z];//当前弧优化
    bool bfs() { //按最短路给图分层
        queue <int> q;
        for (int i = 1; i <= n; ++i) now[i] = head[i], dis[i] = 0;
        q.push(s), dis[s] = 1;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i = head[u]; i; i = e[i].ne) if (e[i].flow) {
                int v = e[i].v;
                if (dis[v]) continue;
                q.push(v), dis[v] = dis[u] + 1;
                if (v == t) return true;
            }
        }
        return false;
    }
    int dfs(int u, int sum) { //多路增广
        if (u == t) return sum;//没有限制，这些流量都可以通过
        int res = 0;
        for (int i = now[u]; i && sum; now[u] = i, i = e[i].ne) { //更新当前弧，之前的状态不用再判断一次
            int v = e[i].v;
            if (dis[v] != dis[u] + 1) continue;//检查是否为分层图的结构
            int val = dfs(v, min(sum, e[i].flow));
            e[i].flow -= val, e[i ^ 1].flow += val;
            sum -= val, res += val;//sum为剩余流量；res为流出流量
        }
        return res;
    }
    void max_flow() {
        while (bfs()) ans += dfs(s, inf);
        cout << ans << endl;
    }
}
```

### 3.13 Bipartite Graph

Bipartite iff no odd cycle (2-coloring). Hungarian: augment from each left vertex, $O(nm)$. König: min vertex cover = max matching; max independent set = $n$ − max matching.

```cpp
int col[Z];
bool dfs(int rt, int color) {
    col[rt] = color;
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!col[son] && !dfs(son, 3 - color)) return false;//子节点集合中有冲突
        if (col[son] == color) return false;//一条边相连的两个节点属于同一个二分集合
    }
    return true;
}
inline bool judge() {
    for (int i = 1; i <= n; ++i)
        if (!col[i] && !dfs(i, 1)) return false;
    return true;
}
```

```cpp
bool vs[Z];
int match[Z];
bool dfs(int rt) {
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!vs[son]) {
            vs[son] = 1;
            if (!match[son] || dfs(match[son])) {
                match[son] = rt;//目标点还未匹配 或 目标点能与原匹配点脱离
                return true;
            }
        }
    }
    return false;
}
sandom main() {
    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        memset(vs, 0, sizeof(vs));
        if (dfs(i)) ++ans;
    }
    return 0;
}
```

### 3.14 Centroid Decomposition

Centroid: largest remaining part $\le n/2$. Handle paths through it, delete it, recurse: depth $O(\log n)$. Start: `kid[root = 0] = tot = n; getroot(1, 0); solve(root);`

```cpp
int siz[Z], kid[Z], root, tot;//kid[rt]：该点的最大子树的大小；tot：当前连通块大小（不能叫size：与std::size冲突）
bool vs[Z];
void calc(int rt); // defined below, problem-specific
void getroot(int rt, int fa) { //求树的重心
    siz[rt] = 1, kid[rt] = 0;
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son] || son == fa) continue;
        getroot(son, rt);
        siz[rt] += siz[son];
        kid[rt] = max(kid[rt], siz[son]);
    }
    kid[rt] = max(kid[rt], tot - siz[rt]);//除rt子树之外的其他剩余节点也可以转化为rt的子树
    if (kid[rt] < kid[root]) root = rt;//最大子树最小的点为树的重心
}
void solve(int rt) {
    vs[rt] = 1;
    calc(rt);
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son]) continue;
        kid[root = 0] = tot = siz[son];//子树大小
        getroot(son, 0);//寻找子树的重心
        solve(root);//递归处理子树
    }
}

int dis[Z], rec[M], tmp[Z];
bool be[M];//桶记录，M大于最大询问的k
void getdis(int rt, int fa) { //点到根的距离
    rec[++rec[0]] = dis[rt];//临时记录当前子树中的dis
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son] || son == fa) continue;
        dis[son] = dis[rt] + e[i].w;
        getdis(son, rt);
    }
}
void calc(int rt) { //统计答案，因题而异
    int cnt = 0;//本次放进桶里的dis，结束时只清空这些（每次memset整个桶会超时）
    be[0] = 1;//rt--rt的dis
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son]) continue;
        dis[son] = e[i].w; rec[0] = 0;//初始化
        getdis(son, rt);
        for (int j = 1; j <= rec[0]; j++)//遍历子树dis
            for (int t = 1; t <= m; t++)
                if (k[t] >= rec[j])//该路径存在
                    ans[t] |= be[k[t] - rec[j]];
        for (int j = 1; j <= rec[0]; j++)
            if (rec[j] < M) be[rec[j]] = 1, tmp[++cnt] = rec[j];//保存已有dis（超过M的dis用不到，也会越界）
    }
    for (int j = 1; j <= cnt; j++) be[tmp[j]] = 0;
}
```

### 3.15 Virtual Tree

Keep only key vertices and LCAs of dfn-adjacent ones: $O(k \log k)$ vertices per query. Build with a stack in `dfn` order.

```cpp
inline bool cmp(int A, int B) { return dfn[A] < dfn[B]; }
int stk[Z], tp;
inline void un(int x, int y) { add(y, x, dep[x] - dep[y]); tp--; }
inline void insert(int x) {
    if (!tp) { stk[++tp] = x; return; }
    int lca = LCA(stk[tp], x);
    while (tp >= 2 && dfn[stk[tp - 1]] >= dfn[lca]) un(stk[tp], stk[tp - 1]);
    if (lca != stk[tp]) un(stk[tp], lca), stk[++tp] = lca;
    stk[++tp] = x;
}
```

```cpp
void dfs(int rt) {
    sz[rt] = key[rt];
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        dfs(son);
        ans1 += sz[son] * (k - sz[son]) * e[i].w;//经过这条边的贡献
        sz[rt] += sz[son];//关键点个数
    }
    head[rt] = key[rt] = 0;//清空
}
sandom main() {
    n = read();
    for (int i = 1; i < n; i++) {
        int u = read(), v = read();
        add(u, v, 1), add(v, u, 1);
    }
    search(1, 0);
    connect(1, 1);
    for (int i = 1; i <= n; i++) head[i] = 0;
    int Q = read();
    while (Q--) {
        cnt = tp = 0;
        k = read();
        for (int i = 1; i <= k; i++) a[i] = read(), key[a[i]] = 1;
        sort(a + 1, a + 1 + k, cmp);
        for (int i = 1; i <= k; i++) insert(a[i]);
        while (tp > 1) un(stk[tp], stk[tp - 1]);
        ans1 = 0;
        dfs(stk[tp]);
        write(ans1);
    }
    return 0;
}
```

## 4. Math

### 4.1 GCD, Exgcd, Inverse

$ax + by = \gcd(a, b)$; general solution $x = x_0 \frac{c}{g} + k\frac{b}{g}$, $y = y_0 \frac{c}{g} - k \frac{a}{g}$ (solvable iff $g \mid c$). Inverse: Fermat $a^{p-2}$ ($p$ prime), exgcd ($\gcd(a, p) = 1$), or linear $inv_i = -\lfloor p/i \rfloor \cdot inv_{p \bmod i}$.

```cpp
inline int gcd(int a, int b) {
    while (b) { int r = a % b; a = b, b = r; }
    return a;
}
inline int gcd(int a, int b) { return b ? gcd(b, a % b) : a; }
inline int lcm(int a, int b) { return a / gcd(a, b) * b; }
```

```cpp
inline int exgcd(int a, int b, int& x, int& y) { //a*x + b*y = 1;
    if (b == 0) { x = 1, y = 0; return a; }
    int x1, y1;
    int d = exgcd(b, a % b, x1, y1);
    x = y1, y = x1 - a / b * y1;
    return d;
}
inline int exgcd(int a, int b, int& x, int& y) { //a*x + b*y = 1;
    if (b == 0) { x = 1, y = 0; return a; }
    int d = exgcd(b, a % b, y, x); //直接交换传参
    y -= a / b * x;
    return d;
}
inline bool solve_any(int a, int b, int c, int& x, int& y) { //a*x + b*y = c
    int g = exgcd(abs(a), abs(b), x, y);
    if (c % g) return false; //无解
    c /= g;
    x *= c, y *= c;
    if (a < 0) x = -x;
    if (b < 0) y = -y;
    return true;
}
inline int solve_min(int a, int b, int c) { //a*x + b*y = c;
    int x, y, g;
    g = exgcd(a, b, x, y);
    if (c % g) return -1; //无解
    a /= g, b /= g, c /= g;
    //只要求x为最小非负整数解，而y可以为负数
    x = (x * c % b + b) % b;
    return x;
    //x和y都要求为非负整数解：取上面最小非负的x（此时y最大），y = (c - a * x) / b，若y < 0则无非负整数解
}
```

```cpp
inline int inv(int a, int p) { return binpow(a, p - 2, p); }
```

```cpp
void inverse(int p) {
    inv[1] = 1;
    for (int i = 2; i < p; ++i)
        inv[i] = (p - p / i) * inv[p % i] % p;
}
```

### 4.2 Primes and Sieves

Eratosthenes $O(n \log\log n)$; linear sieve removes each composite by its smallest prime, $O(n)$. For $k = i \cdot p$: if $p \nmid i$, $f(k) = f(i) f(p)$; if $p \mid i$, use the exponent of $p$.
$\varphi(n) = n \prod_{p \mid n}(1 - \frac1p)$; $\mu(n) = (-1)^k$ if square-free with $k$ primes, else $0$; $d(n) = \prod (c_i + 1)$; $\sigma(n) = \prod (1 + p_i + \cdots + p_i^{c_i})$.

```cpp
bool isPrime(int x) {
    if (x < 2) return false;
    int m = sqrt(x);
    for (int i = 2; i <= m; ++i)
        if (x % i == 0) return false;
    return true;
}
```

```cpp
vector<pii> pr; // pair<prime, count>
void primeFactorization(int x) {
    int m = sqrt(x);
    for (int i = 2; i <= m && x > 1; ++i) {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) pr.push_back({i, cnt});
    }
    if (x > 1) pr.push_back({x, 1});
    for (auto p : pr)
        cout << p.first << "^" << p.second << endl;
}
```

```cpp
vector<bool> npr; // is composite / not prime
void Esth(int n) {
    npr.assign(n + 1, false);
    npr[0] = npr[1] = true;
    int m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (!npr[i])
            for (int j = i * i; j <= n; j += i) 
                npr[j] = true;
}
```

```cpp
vector<bool> npr; // is composite / not prime
vector<int> primes, low;
void Linear(int n) {
    npr.assign(n + 1, false);
    low.assign(n + 1, 0);
    primes.clear();
    npr[0] = npr[1] = true;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), low[i] = i;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            low[k] = pr;
            if (i % pr == 0) break;
        }
    }
}
```

```cpp
int phi(int n) { //根据基础定义，求单个数的欧拉函数
    int res = n, m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (n % i == 0) {
            res -= res / i;
            while (n % i == 0) n /= i;
        }
    if (n > 1) res -= res / n;
    return res;
}
```

```cpp
vector<bool> npr;
vector<int> primes, phi;
void Euler(int n) { //欧拉函数
    npr.assign(n + 1, false);
    phi.assign(n + 1, 0);
    primes.clear();
    phi[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), phi[i] = i - 1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { 
                phi[k] = phi[i] * pr;
                break;
            } else phi[k] = phi[i] * (pr - 1);
        }
    }
}
```

```cpp
vector<bool> npr;
vector<int> primes, miu;
void Mobius(int n) { //莫比乌斯函数
    npr.assign(n + 1, false);
    miu.assign(n + 1, 0);
    primes.clear();
    miu[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), miu[i] = -1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { miu[k] = 0; break; }
            else miu[k] = -miu[i];
        }
    }
}
```

```cpp
vector<bool> npr;
vector<int> primes, d;
void NumDivisors(int n) { //约数个数
    npr.assign(n + 1, false);
    d.assign(n + 1, 0);
    primes.clear();
    d[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), d[i] = 2;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { 
                d[k] = 2 * d[i] - d[i / pr];
                break; 
            } else d[k] = 2 * d[i];
        }
    }
}
```

```cpp
vector<bool> npr;
vector<int> primes, s;
void SumDivisors(int n) { //约数和
    npr.assign(n + 1, false);
    s.assign(n + 1, 0);
    primes.clear();
    s[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), s[i] = i + 1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) {
                s[k] = s[i] + (s[i] - s[i / pr]) * pr;
                break;
            } else s[k] = s[i] * (pr + 1);
        }
    }
}
```

### 4.3 Combinatorics

$\binom{n}{m} = \frac{n!}{m!(n-m)!}$, Pascal $\binom{n}{m} = \binom{n-1}{m} + \binom{n-1}{m-1}$. Lucas: $\binom{n}{m} \equiv \binom{n \bmod p}{m \bmod p}\binom{\lfloor n/p \rfloor}{\lfloor m/p \rfloor} \pmod p$.
Catalan: $Cat_n = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n-1}$, $Cat_n = \sum_{i=1}^{n} Cat_{i-1}Cat_{n-i}$ (brackets, stack orders, binary trees, triangulations).
exLucas: split $p = \prod p_i^{k_i}$, remove factors $p_i$ from factorials, merge with CRT.

```cpp
int fac[Z], inv[Z];
void init(int n, int p) {
    fac[0] = 1;
    for (int i = 1; i <= n; ++i)
        fac[i] = fac[i - 1] * i % p;
    inv[n] = binpow(fac[n], p - 2, p);
    for (int i = n - 1; i >= 0; --i)
        inv[i] = inv[i + 1] * (i + 1) % p;
}
inline int C(int n, int m, int p) { //组合数
    return m > n ? 0 : fac[n] * inv[m] % p * inv[n - m] % p;
}
inline int A(int n, int m, int p) { //排列数
    return m > n ? 0 : fac[n] * inv[n - m] % p;
}
```

```cpp
int lucas(int n, int m, int p) {
    if (m == 0) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

```cpp
int a[Z], c[Z];
int qpow(int a, int b, int p) {
    int res = 1 % p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
int exgcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
int inv(int a, int p) {
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
int fac(int n, int p, int pk) { //n!/p^x mod p^k
    if (!n) return 1;
    int ans = 1;
    for (int i = 1; i < pk; ++i)//n/pk个循环节
        if (i % p) ans = ans * i % pk;
    ans = qpow(ans, n / pk, pk);
    for (int i = 1; i <= n % pk; ++i)//剩余部分
        if (i % p) ans = ans * i % pk;
    return ans * fac(n / p, p, pk) % pk;//余下的递归处理
}
int C(int n, int m, int p, int pk) { //C(n, m) mod p^k
    if (m > n) return 0;
    int f1 = fac(n, p, pk), f2 = fac(m, p, pk), f3 = fac(n - m, p, pk);
    int k1 = 0, k2 = 0, k3 = 0;//统计阶乘中p的倍数的个数
    for (int i = n; i; i /= p) k1 += i / p;
    for (int i = m; i; i /= p) k2 += i / p;
    for (int i = n - m; i; i /= p) k3 += i / p;
    return f1 * inv(f2, pk) * inv(f3, pk) % pk * qpow(p, k1 - k2 - k3, pk) % pk;
}
int CRT(int n, int a[], int m[]) {
    int b, c, x, y;
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i) {
        b = m[i]; c = M / b;
        exgcd(c, b, x, y);
        ans = (ans + a[i] * c * x % M);
    }
    return (ans % M + M) % M;
}
int exlucas(int n, int m, int p) {
    int tmp = sqrt(p), cnt = 0;
    for (int i = 2; p > 1 && i <= tmp; ++i) {
        int t = 1;
        while (p % i == 0) p /= i, t *= i;//t = i^tot
        if (t > 1) a[++cnt] = C(n, m, i, t), c[cnt] = t;
    }
    if (p > 1) a[++cnt] = C(n, m, p, p), c[cnt] = p;
    return CRT(cnt, a, c);//求解ans ≡ C(n, m) (mod p[i]^k[i])
}
```

### 4.4 CRT / exCRT

Coprime moduli: $x = \sum a_i c_i t_i \bmod M$, $c_i = M / m_i$, $t_i = c_i^{-1} \bmod m_i$. General: merge two at a time, $m_1 p - m_2 q = a_2 - a_1$, new modulus $\operatorname{lcm}(m_1, m_2)$.

```cpp
int CRT(int n, int a[], int m[]) { //中国剩余定理
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i) {
        int c = M / m[i], t, y; //除m[i]以外所有模数的倍数
        exgcd(c, m[i], t, y); //c*t≡1(mod m[i])
        (ans += a[i] * c * t % M) %= M; //∑ a[i]*c[i]*t[i]
    }
    return (ans % M + M) % M;
}
```

```cpp
int calc(int a, int b, int c) { //ax+by=c
    int x, y, d = exgcd(a, b, x, y);
    if (c % d) return -1;
    a /= d, b /= d, c /= d;
    return ((__int128)x * c % b + b) % b;//x * c 可能超出 long long
}
int EXCRT(int n, int a[], int m[]) { //扩展中国剩余定理
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) {
        int x = calc(M, m[i], a[i] - ans);//M*x≡a[i]-ans(mod m[i])
        if (x == -1) return -1;//判断无解
        ans += x * M;//∑ ans+x[i]*M
        M = lcm(M, m[i]);//更新前i个数的lcm
        ans = (ans % M + M) % M;
    }
    return ans;
}
```

### 4.5 BSGS

$a^x \equiv b \pmod p$, $\gcd(a, p) = 1$. $x = it - j$, $t = \lceil \sqrt p \rceil$: store $b a^j$, then search $(a^t)^i$. $O(\sqrt p \log p)$

```cpp
int BSGS(int a, int b, int p) { //a^x≡b (mod p)
    map <int, int> hash; hash.clear();//多次调用时，把map定义放在外面
    b %= p;
    if (b == 1 % p) return 0;//x = 0；表中同值保留最大的j，会漏掉 i = 0, j = 0
    int t = sqrt(p) + 1;
    for (int j = 0; j < t; ++j) hash[b * binpow(a, j, p) % p] = j;
    a = binpow(a, t, p);
    if (a == 0) return b == 0 ? 1 : -1;
    for (int i = 0; i <= t; ++i) {
        int val = binpow(a, i, p);
        int j = hash.find(val) == hash.end() ? -1 : hash[val];
        if (j >= 0 && i * t - j >= 0) return i * t - j;
    }
    return -1;//无解
}
```

### 4.6 Matrix Fast Power

$C_{i,j} = \sum_k A_{i,k} B_{k,j}$. Linear recurrence: $F_i = A F_{i-1} \Rightarrow F_i = A^i F_0$. $O(n^3 \log b)$

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

### 4.7 Gaussian Elimination

Gauss-Jordan on `a[1..n][1..n+1]`. All-zero coefficient row with nonzero RHS: no solution; otherwise such a row: infinitely many. $O(n^3)$

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

### 4.8 XOR Linear Basis

`p[i]` has highest bit $i$; $cnt$ nonzero → $2^{cnt}$ distinct XOR values. Reduce to diagonal form for $k$-th smallest / rank.

```cpp
inline void insert(int x) { //插入构造线性基
    for (int i = 61; i >= 0; i--)
        if (x >> i) {
            if (p[i]) x ^= p[i];
            else { p[i] = x; return; }
        }
    flag = 1;//x被消成0，说明能异或出0
}
inline int getmax() { //最大异或和
    int ans = 0;
    for (int i = 61; i >= 0; i--)
        if ((ans ^ p[i]) > ans) ans ^= p[i];
    return ans;
}
inline int getmin() { //最小异或和
    if (flag) return 0;//异或和为0
    for (int i = 0; i <= 61; ++i)
        if (p[i]) return p[i];
    return 0;
}
inline void merge(int g[]) { //线性基合并
    for (int i = 0; i <= 61; ++i)
        if (g[i]) insert(g[i]);
}
```

```cpp
inline void rebuild() { //将线性基转为对角矩阵
    for (int i = 61; i >= 0; i--)//除最高位为1外，其他尽量通过异或变为0
        for (int j = i - 1; j >= 0; j--)
            if ((p[i] >> j) & 1) p[i] ^= p[j];
    for (int i = 0; i <= 61; i++)
        if (p[i]) r[cnt++] = p[i];//下标从零开始，从小到大（记录基底）
}
inline int query(int k, int cnt) { //查询第k小的非零异或和（若flag，即能异或出0，则第k小为query(k - 1)）
    int ans = 0;
    for (int i = 0; i < cnt; ++i)
        if ((k >> i) & 1) ans ^= r[i];
    return ans;
}
```

```cpp
inline void rebuild() { //将线性基转为对角矩阵
    for (int i = 61; i >= 0; i--)//除最高位为1外，其他尽量通过异或变为0
        for (int j = i - 1; j >= 0; j--)
            if ((p[i] >> j) & 1) p[i] ^= p[j];
    for (int i = 0; i <= 61; i++)
        if (p[i]) r[cnt++] = i;//下标从零开始，从小到大（记录位置）
}
inline int getrank(int q) { //查询一个异或和的排名
    int ans = 0;
    for (int i = 0; i < cnt; ++i)//这一位为1可以参与构造q
        if ((q >> r[i]) & 1) ans = ans + (1ll << i);//低位部分随便放
    return ans + 1;
}
```

### 4.9 Möbius Inversion

$\sum_{d \mid n}\mu(d) = [n = 1]$, so $[\gcd(i, j) = 1] = \sum_{d \mid \gcd(i,j)} \mu(d)$.
$f(n) = \sum_{d \mid n} g(d) \iff g(n) = \sum_{d \mid n} \mu(d) f(n/d)$.
$\sum_{i=1}^{n}\sum_{j=1}^{m}[\gcd(i,j) = k] = \sum_{d} \mu(d) \lfloor \frac{n}{kd} \rfloor \lfloor \frac{m}{kd} \rfloor$; $\sum\sum \gcd(i,j) = \sum_t \varphi(t) \lfloor \frac nt \rfloor \lfloor \frac mt \rfloor$.
Division blocks: $\lfloor n/l \rfloor$ is constant for $l \in [l, n / \lfloor n/l \rfloor]$, $O(\sqrt n)$ blocks. Below: $\sum_{i \le n}\sum_{j \le m} d(ij) = \sum_d \mu(d) f(\lfloor n/d \rfloor) f(\lfloor m/d \rfloor)$, $f(k) = \sum_{i \le k} \lfloor k/i \rfloor$.

```cpp
bool prime[Z];
int ip[Z];
int miu[Z], f[Z];
void Mobius(int n) {
miu[1] = 1;
for (int i = 2; i <= n; i++) {
if (!prime[i]) ip[++ip[0]] = i, miu[i] = -1;
for (int j = 1; j <= ip[0]; j++) {
int k = i * ip[j];
if (k > n) break;
prime[k] = 1;
if (i % ip[j] == 0) { miu[k] = 0; break; }
else miu[k] = -miu[i];
}
}
for (int i = 1; i <= n; i++) miu[i] += miu[i - 1];//前缀和
}
void init(int n) { //整除分块预处理的函数
for (int k = 1; k <= n; k++)
for (int l = 1, r; l <= k; l = r + 1) {
r = k / (k / l);
f[k] += (k / l) * (r - l + 1);
}
}
inline int NTB(int n, int m) {
int k = min(n, m);
int ans = 0;
for (int l = 1, r; l <= k; l = r + 1) {
r = min(n / (n / l), m / (m / l));
ans += f[n / l] * f[m / l] * (miu[r] - miu[l - 1]);
}
return ans;
}
```

## 5. String

### 5.1 String Hash

$h(l, r) = h_r - h_{l-1} B^{r-l+1}$. Structs take a 0-indexed `string`, `get(l, r)` is 1-indexed inclusive; bases are `static`, so different objects compare directly. `ull` overflow is broken by Thue–Morse; `Hash61` (mod $2^{61}-1$) is safe. Helpers `same`/`lcp`/`cmp` take `Hash &`, change the type for other structs.

```cpp
using ull = unsigned long long;
struct Hash {
    static constexpr ull B = 131;
    int n; vector<ull> h, p;
    Hash(const string &s) : n(s.size()), h(n + 1), p(n + 1, 1) {
        for (int i = 1; i <= n; i++)
            p[i] = p[i - 1] * B, h[i] = h[i - 1] * B + s[i - 1];
    }
    ull get(int l, int r) { return h[r] - h[l - 1] * p[r - l + 1]; }
    ull get() { return h[n]; }
};

bool same(Hash &a, int l1, int r1, Hash &b, int l2, int r2) { return r1 - l1 == r2 - l2 && a.get(l1, r1) == b.get(l2, r2); }
// longest common prefix of a[l1..] and b[l2..]
int lcp(Hash &a, int l1, Hash &b, int l2) {
    int L = 0, R = min(a.n - l1 + 1, b.n - l2 + 1);
    while (L < R) {
        int M = (L + R + 1) / 2;
        if (same(a, l1, l1 + M - 1, b, l2, l2 + M - 1)) L = M;
        else R = M - 1;
    }
    return L;
}
// compare a[l1..r1] and b[l2..r2] lexicographically, return -1 for a < b, 0 for a == b, 1 for a > b
int cmp(Hash &a, int l1, int r1, Hash &b, int l2, int r2) {
    int k = lcp(a, l1, b, l2), n1 = r1 - l1 + 1, n2 = r2 - l2 + 1;
    if (k >= min(n1, n2)) return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
    return a.get(l1 + k, l1 + k) < b.get(l2 + k, l2 + k) ? -1 : 1;
}
```

```cpp
struct Hash61 {
    using ull = unsigned long long;
    static constexpr ull M = (1ULL << 61) - 1, B = 131;
    int n; vector<ull> h, p;
    static ull mul(ull a, ull b) { return (__int128)a * b % M; }
    Hash61(const string &s) : n(s.size()), h(n + 1), p(n + 1, 1) {
        for (int i = 1; i <= n; i++) {
            p[i] = mul(p[i - 1], B), h[i] = (mul(h[i - 1], B) + s[i - 1]) % M;
        }
    }
    ull get(int l, int r) { return (h[r] + M - mul(h[l - 1], p[r - l + 1])) % M; }
};
```

```cpp
struct Hash2D {
    using ull = unsigned long long;
    static constexpr ull Bx = 131, By = 13331; // Bx: between rows, By: between columns
    int n, m;
    vector<vector<ull>> h; vector<ull> px, py;
    Hash2D(const vector<string> &s) : n(s.size()), m(s[0].size()), h(n + 1, vector<ull>(m + 1)), px(n + 1, 1), py(m + 1, 1) {
        for (int i = 1; i <= n; i++) px[i] = px[i - 1] * Bx;
        for (int j = 1; j <= m; j++) py[j] = py[j - 1] * By;
        for (int i = 1; i <= n; i++) {
            ull row = 0;
            for (int j = 1; j <= m; j++) {
                row = row * By + s[i - 1][j - 1];
                h[i][j] = h[i - 1][j] * Bx + row;
            }
        }
    }
    ull get(int x1, int y1, int x2, int y2) {
        int r = x2 - x1 + 1, c = y2 - y1 + 1;
        return h[x2][y2] - h[x1 - 1][y2] * px[r] - h[x2][y1 - 1] * py[c] + h[x1 - 1][y1 - 1] * px[r] * py[c];
    }
    ull get() { return h[n][m]; }
};
```

### 5.2 KMP

$nxt_i$ = longest proper border of $s[1..i]$; on mismatch $j \leftarrow nxt_j$. $O(|s| + |t|)$

```cpp
void get_nxt(char s[], int len) { //前缀函数
    nxt[1] = 0;
    for (int i = 2, j = 0; i <= len; ++i) {
        while (j && s[i] != s[j + 1]) j = nxt[j];
        if (s[i] == s[j + 1]) j++;
        nxt[i] = j;
    }
}
void match(char s[], int lens, char t[], int lent) { //s在t中出现的次数
    for (int i = 1, j = 0; i <= lent; ++i) {
        while (j && (j == lens || t[i] != s[j + 1])) j = nxt[j];
        if (t[i] == s[j + 1]) j++;
        if (j == lens) {
            ++ans;
            j = nxt[j];
            //return i - j + 1;//s在t中出现的第一个位置
        }
    }
}
```

### 5.3 Manacher

Insert separators; reuse the mirror radius inside the rightmost palindrome, $O(n)$. Longest palindrome length $= \max d_i - 1$.

```cpp
int d[Z];//d[i]：以i为对称中心的最大回文串的半径为d[i]，原串最长回文长度为max(d[i]) - 1
void manacher(char t[], int len) {
    n = len * 2 + 1;//新串
    s[0] = '{', s[n + 1] = '}';//防止字符串之间冲突
    for (int i = 1; i <= len; i++)
        s[i << 1] = t[i], s[(i << 1) - 1] = '|';//在字符中间加隔板
    s[n] = '|';
    int mid = 0, r = 0;
    for (int i = 1; i <= n; i++) {
        if (i <= r) d[i] = min(d[mid * 2 - i], r - i + 1);//取对称点
        else d[i] = 1;
        while (s[i - d[i]] == s[i + d[i]]) d[i]++;//扩展半径
        if (i + d[i] > r) r = i + d[i] - 1, mid = i;//扩展最右侧右端点
    }
}
```

### 5.4 Trie

Path from the root spells a prefix; `ed` marks ends. Root is node 1.

```cpp
struct tree {
    int kid[10];
}; tree tr[Z];
int tot = 1;//根节点为1，新节点从2开始
bool ed[Z];//不能叫end：与std::end冲突
void insert(char s[], int len) { //插入一个字符串
    int rt = 1;
    for (int i = 1; i <= len; i++) {
        int ch = s[i] - '0';
        if (!tr[rt].kid[ch]) tr[rt].kid[ch] = ++tot;
        rt = tr[rt].kid[ch];
    }
    ed[rt] = 1;
}
bool search(char s[], int len) { //检索字符串是否存在
    int rt = 1;
    for (int i = 1; i <= len; i++) {
        int ch = s[i] - '0';
        rt = tr[rt].kid[ch];
        if (!rt) return false;
    }
    return ed[rt];
}
```

### 5.5 Aho–Corasick

Trie + fail links (longest proper suffix that is a trie node), built by BFS; missing children point to `fail`'s child. `match` counts patterns occurring in the text.

```cpp
struct Trie {
    int kid[26];//26个字母
    int fail;//失配指针
    int end;//以该节点结尾的单词数量
    #define son ac[rt].kid[i]
}; Trie ac[Z << 2];
int tot = 0;
inline void insert(char s[], int len) {
    int rt = 0;
    for (int t = 1; t <= len; ++t) {
        int i = s[t] - 'a';
        if (!son) son = ++tot;//新建一个节点
        rt = son;//进入下一层
    }
    ++ac[rt].end;
}
void getfail() {
    queue <int> q;
    int rt = 0;
    for (int i = 0; i < 26; ++i)//初始化失配指针
        if (son) {
            ac[son].fail = 0;
            q.push(son);
        }
    while (!q.empty()) {
        rt = q.front(); q.pop();
        for (int i = 0; i < 26; ++i) {
            if (son) {
                ac[son].fail = ac[ac[rt].fail].kid[i];//扩展后缀
                q.push(son);
            }
            else son = ac[ac[rt].fail].kid[i];//保证字符串能沿着路径走完
        }
    }
}
inline int match(char s[], int len) {
    int rt = 0, ans = 0;
    for (int t = 1; t <= len; ++t) {
        rt = ac[rt].kid[s[t] - 'a'];//向下走一层
        for (int j = rt; j && ac[j].end != -1; j = ac[j].fail)
            ans += ac[j].end, ac[j].end = -1;//j不断跳fail直到完全失配
    }
    return ans;
}
```

## 6. Dynamic Programming

### 6.1 Knapsack

0-1: $j$ from $W$ down, $f_j = \max(f_j, f_{j-w_i} + v_i)$. Complete: $j$ upward. Multiple: binary split $m_i = 1 + 2 + 4 + \cdots + r$ into 0-1 items, $O(nW \log m)$.

```cpp
int Knapsack01(int n, int W, vector<int> w, vector<int> v) {
  vector<int> f(W + 1, 0);
  for (int i = 1; i <= n; i++)
      for (int j = W; j >= w[i]; j--)
        f[j] = max(f[j], f[j - w[i]] + v[i]);
    return f[W];
}
```

```cpp
int KnapsackComplete(int n, int W, vector<int> w, vector<int> v) {
    vector<int> f(W + 1, 0);
    for (int i = 1; i <= n; i++)
        for (int j = w[i]; j <= W; j++)
            f[j] = max(f[j], f[j - w[i]] + v[i]);
    return f[W];
}
```

```cpp
int KnapsackMultiple(int n, int W, vector<int> w, vector<int> v, vector<int> m) {
    vector<int> f(W + 1, 0);
    for (int i = 1; i <= n; i++) {
        if (w[i] * m[i] >= W) {
            for (int j = w[i]; j <= W; j++)
                f[j] = max(f[j], f[j - w[i]] + v[i]);
        } else {
    int k = 1, cnt = m[i];
    while (k < cnt) {
      for (int j = W; j >= k * w[i]; j--)
        f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
      cnt -= k;
      k <<= 1;
    }
    for (int j = W; j >= cnt * w[i]; j--)
      f[j] = max(f[j], f[j - cnt * w[i]] + cnt * v[i]);
  }
}
    return f[W];
}
```

### 6.2 LIS / LCS

LIS: $d_l$ = smallest tail of an increasing subsequence of length $l$; binary search, $O(n \log n)$. LCS: $f_{i,j} = f_{i-1,j-1} + 1$ if $a_i = b_j$, else $\max(f_{i-1,j}, f_{i,j-1})$.

```cpp
int LIS(vector<int> a) {
    int n = a.size();
    a.insert(a.begin(), 0);
    vector<int> d(n + 1, INF); // d[l]: smallest tail of an increasing subsequence of length l
    d[0] = -INF;
    for (int i = 1; i <= n; i++) {
        int j = upper_bound(d.begin(), d.end(), a[i]) - d.begin();
        if (d[j - 1] < a[i] && a[i] < d[j]) {
            d[j] = a[i];
        }
    }
    int ans = 0;
    for (int l = 0; l <= n; l++) {
        if (d[l] < INF)
            ans = l;
    }
    return ans;
}
```

```cpp
int LCS(string A, string B) {
    int n = A.size(), m = B.size();
    A = " " + A, B = " " + B;
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i] == B[j]) {
                f[i][j] = f[i - 1][j - 1] + 1;
            } else {
                f[i][j] = max(f[i - 1][j], f[i][j - 1]);
            }
        }
    }
    return f[n][m];
}
```

### 6.3 Interval DP

$f_{i,j} = \min_{i \le k < j} (f_{i,k} + f_{k+1,j} + cost(i, k, j))$, by increasing length. $O(n^3)$

```cpp
int cost(int i, int k, int j) { return ...; }
int IntervalDP(int n) {
    vector<vector<int>> f(n + 1, vector<int>(n + 1, 0));
    for (int d = 2; d <= n; d++) {
        for (int i = 1; i <= n - d + 1; i++) {
            int j = i + d - 1;
            f[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + cost(i, k, j));
            }
        }
    }
    return f[1][n];
}
```

## 7. Miscellaneous

### 7.1 Simulated Annealing

Accept a worse neighbor with probability $e^{-\Delta / T}$, $T \leftarrow 0.996\,T$. Keep the current and best points separately.

```cpp
const double down = 0.996;//降温系数
const double eps = 1e-15;//终止温度
double ansx, ansy, answ, nowx, nowy, T;//ans：最优解；now：当前解
struct point { int x, y, w; } a[Z];
inline double dis(double x1, double x2, double y1, double y2) { return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); }
inline double calc(double x, double y) { //计算答案值
    double res = 0;
    for (int i = 1; i <= n; i++) res += dis(x, a[i].x, y, a[i].y) * a[i].w;
    if (res < answ) ansx = x, ansy = y, answ = res;
    return res;
}
inline double get(double x) { return x + (rand() * 2.0 - RAND_MAX) * T; }//随机获得新解（2.0：rand() * 2 会溢出int）
void SA() {
    T = 3000;//初始温度
    nowx = ansx, nowy = ansy;
    while (T > eps) {
        double ex = get(nowx), ey = get(nowy);
        double delta = calc(ex, ey) - calc(nowx, nowy);
        if (exp(-delta / T) * RAND_MAX > rand()) nowx = ex, nowy = ey;//根据Metropolis准则保留
        T *= down;//不断降温
    }
    for (int i = 1; i <= 1000; i++) calc(get(ansx), get(ansy));//最后在接近的范围里跳
}
```

### 7.2 Closest Pair of Points

Sort by $x$; recurse; check the strip $|x - x_{mid}| < d$ sorted by $y$. $O(n \log^2 n)$

```cpp
struct Point {
    int x, y;
};
Point points[Z];
double closest_pair(int l, int r) {
    if (r - l <= 3) { // base case
        double min_dist = DBL_MAX;
        for (int i = l; i < r; i++) {
            for (int j = i + 1; j <= r; j++) {
                double dist = sqrt(pow(points[i].x - points[j].x, 2) + pow(points[i].y - points[j].y, 2));
                min_dist = min(min_dist, dist);
            }
        }
        return min_dist;
    }
    int mid = (l + r) / 2;
    double d1 = closest_pair(l, mid);
    double d2 = closest_pair(mid + 1, r);
    double d = min(d1, d2);

    vector<Point> strip;
    for (int i = l; i <= r; i++) {
        if (abs(points[i].x - points[mid].x) < d) {
            strip.push_back(points[i]);
        }
    }
    sort(strip.begin(), strip.end(), [](const Point &a, const Point &b) { return a.y < b.y; });

    for (size_t i = 0; i < strip.size(); i++) {
        for (size_t j = i + 1; j < strip.size() && (strip[j].y - strip[i].y) < d; j++) {
            double dist = sqrt(pow(strip[i].x - strip[j].x, 2) + pow(strip[i].y - strip[j].y, 2));
            d = min(d, dist);
        }
    }
    return d;
}
```

### 7.3 Cantor Expansion

Rank of a permutation: $1 + \sum_i A_i (n - i)!$, $A_i$ = number of later elements smaller than $a_i$ (BIT).

```cpp
int cantor(int a[], int n) {
    fac[0] = 1;
    for (int i = 1; i <= n; i++) {
        fac[i] = fac[i - 1] * i % mod;//预处理阶乘
        update(a[i], 1);//先把所有的数插进去
    }
    int ans = 1;//自己也算一个
    for (int i = 1; i <= n; i++) {
        update(a[i], -1);//树状数组中剩下的都是i的后缀
        ans = (ans + ask(a[i] - 1) * fac[n - i] % mod) % mod;
    }
    return ans;
}
```

### 7.4 Bignum (Minimal)

Little-endian digits, `a[0]` = length; arrays must start zeroed. Subtraction needs $a \ge b$ (`check`).

```cpp
void jia(int a[], int b[], int c[]) { //高精加
    c[0] = max(a[0], b[0]) + 1;
    for (int i = 1; i <= c[0]; i++) {
        c[i] += a[i] + b[i];
        if (c[i] >= 10) {
            c[i] -= 10;
            c[i + 1]++;
        }
    }
    while (c[c[0]] == 0 && c[0] > 1)    c[0]--;
}
```

```cpp
void cheng(int a[], int b[], int c[]) { //高精乘
    c[0] = a[0] + b[0];
    for (int i = 1; i <= a[0]; i++) {
        for (int j = 1; j <= b[0]; j++) {
            int t = i + j - 1;
            c[t] += a[i] * b[j];
            if (c[t] >= 10) {
                c[t + 1] += c[t] / 10;
                c[t] %= 10;
            }
        }
    }
    while (c[c[0]] == 0 && c[0] > 1)    c[0]--;
}
```

```cpp
bool check(int a[], int b[]) { //比较大小（true：A大，false：B大）
    if (a[0] > b[0])    return true;
    if (a[0] < b[0])    return false;
    for (int i = a[0]; i > 0; i--) {
        if (a[i] > b[i])    return true;
        if (a[i] < b[i])    return false;
    }
    return true;
}
void jian(int a[], int b[], int c[]) { //高精减
    c[0] = a[0];
    for (int i = 1; i <= c[0]; i++) {
        if (a[i] < b[i]) {
            a[i + 1]--;
            a[i] += 10;
        }
        c[i] += a[i] - b[i];
    }
    while (c[c[0]] == 0 && c[0] > 1)    c[0]--;
}
```

```cpp
void in(int a[]) { //读入数据
    string s;
    cin >> s;
    a[0] = s.length();
    for (int i = 0; i < a[0]; i++)    a[a[0] - i] = s[i] - '0';
}
void out(int c[]) { //输出结果
    for (int i = c[0]; i > 0; i--)   write(c[i]);
}
```

## 8. Polynomial

### 8.1 FFT

$\omega_n = e^{2\pi i/n}$, $\omega_n^{k + n/2} = -\omega_n^k$, $\omega_n^{2k} = \omega_{n/2}^k$.
$A(\omega_n^k) = A_0(\omega_{n/2}^k) + \omega_n^k A_1(\omega_{n/2}^k)$, $A(\omega_n^{k+n/2}) = A_0(\omega_{n/2}^k) - \omega_n^k A_1(\omega_{n/2}^k)$.
Inverse: use $\omega_n^{-1}$ and divide by $n$. Pad to a power of 2 $\ge$ `a.size() + b.size()`. The iterative version is faster.

```cpp
using cd = complex<double>;
const double PI = acos(-1.0);
void FFT(vector<cd> &a, int invert) { //系数表达转点值表达
    int n = a.size(), m = n >> 1;
    if (n == 1) return; //递归边界
    vector<cd> a0(m), a1(m);
    for (int i = 0; i < m; ++i) //奇数与偶数分开
        a0[i] = a[i << 1], a1[i] = a[i << 1 | 1];
    FFT(a0, invert), FFT(a1, invert); //分治处理
    cd w(1.0, 0.0), wn(cos(PI / m), invert * sin(PI / m)); //不能写成 wn = (a, b)，那是逗号表达式
    for (int i = 0; i < m; ++i, w *= wn) { //权值汇总
        a[i] = a0[i] + w * a1[i]; //左半部分
        a[i + m] = a0[i] - w * a1[i]; //右半部分
        // if (invert) a[i] /= 2, a[i + m] /= 2; //逆变换时除以n
    }
}
```

```cpp
void IFFT(vector<cd> &a) { //point-value to coefficient
    int n = a.size();
    FFT(a, -1);
    for (int i = 0; i < n; ++i) a[i] = a[i].real() / n;
}
```

```cpp
void multiply(vector<int> &a, vector<int> &b, vector<int> &c) {
    int n = 1;
    while (n < a.size() + b.size()) n <<= 1; // Find the next power of 2
    vector<cd> A(a.begin(), a.end()), B(b.begin(), b.end()), C(n);
    A.resize(n), B.resize(n);
    FFT(A, 1); // Forward FFT on A
    FFT(B, 1); // Forward FFT on B
    for (int i = 0; i < n; ++i) C[i] = A[i] * B[i]; // Point-wise multiplication
    IFFT(C); // Inverse FFT to get the coefficients of the product polynomial
    c.resize(a.size() + b.size() - 1);
    for (int i = 0; i < c.size(); ++i) c[i] = round(C[i].real());
}
```

```cpp
int rev[Z];
void get_rader() {
    bit = log2(n + m) + 1; k = 1 << bit;//强制达到2的幂级
    for (int i = 0; i < k; ++i) rev[i] = rev[i >> 1] >> 1 | (i & 1) << bit - 1;
}
void FFT(complex <double> a[], int n, int opt) { //系数表达转点值表达
    for (int i = 1; i < n; ++i) if (rev[i] > i) swap(a[i], a[rev[i]]);
    for (int m = 1; m < n; m <<= 1) {
        complex <double> W(cos(PI / m), opt * sin(PI / m));
        for (int i = 0; i < n; i += m << 1) {
            complex <double> w(1.0, 0.0);
            for (int j = 0; j < m; ++j, w *= W) {
                complex <double> x = a[i + j], y = w * a[i + j + m];
                a[i + j] = x + y, a[i + j + m] = x - y;
            }
        }
    }
}
```

## 9. Appendix

### 9.1 STL Cheat Sheet

```cpp
// vector
vector<int> v(n, x); v.reserve(n); v.resize(n, x); v.assign(n, x); v.clear(); v.size(); v.empty();
v.push_back(x); v.emplace_back(x); v.pop_back(); v.front(); v.back();
v.insert(v.begin() + i, x); v.erase(v.begin() + i); v.erase(v.begin() + l, v.begin() + r); // erase [l, r)
sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end()); // sort + dedupe
reverse(v.begin(), v.end()); *max_element(v.begin(), v.end()); accumulate(v.begin(), v.end(), 0LL);
lower_bound(v.begin(), v.end(), x) - v.begin(); upper_bound(v.begin(), v.end(), x) - v.begin(); // first >= x, first > x
// deque
d.push_back(x); d.push_front(x); d.pop_back(); d.pop_front(); d.front(); d.back(); d[i];
// list
l.push_back(x); l.push_front(x); l.insert(it, x); /*before it*/ l.erase(it); l.remove(x); /*all x*/ l.reverse(); l.sort();
l.splice(pos, src); l.splice(pos, src, it2); l.splice(pos, src, first, last); // move from src into l, before pos
// set / multiset: sorted, O(log n)
s.insert(x); s.erase(x); /*multiset: ALL copies*/ s.erase(s.find(x)); /*one copy, x must exist*/ s.count(x); s.find(x) != s.end();
s.lower_bound(x); /*first >= x*/ s.upper_bound(x); /*first > x*/ *s.begin(); *s.rbegin(); /*min, max*/ prev(s.end()); next(s.begin());
// map / multimap
m[k] = val; /*m[k] inserts a default value if k is missing*/ m.count(k); m.find(k); m.erase(k); m.lower_bound(k); mm.equal_range(k);
for (auto &[key, value] : m) {} // in key order
// unordered_set / unordered_map: same as set / map but no order, no lower_bound; O(1) average
// stack / queue / priority_queue
st.push(x); st.pop(); st.top(); q.push(x); q.pop(); q.front(); q.back(); pq.push(x); pq.pop(); pq.top(); pq.empty();
priority_queue<int> pmax; priority_queue<int, vector<int>, greater<int>> pmin; // max-heap, min-heap
priority_queue<pii, vector<pii>, greater<pii>> ppii; // min-heap by first, then second
// bitset
bitset<N> b; b.set(); b.reset(); b.flip(); b.set(i); b.reset(i); b.flip(i); b.test(i); b.count(); b.any(); b.none(); b << k; b & c; b ^ c;
// string
str.push_back(ch); str.pop_back(); str += t; str.substr(pos0, len); str.find(t); /*string::npos if none*/ str.size(); to_string(x); stoi(t); stoll(t);
// array, iterators, builtins
array<int, N> a; a.fill(x); a.size(); advance(it, k); prev(it); next(it);
__builtin_popcount(x); __builtin_popcountll(y); __builtin_ctz(x); /*trailing zeros*/ __builtin_clz(x); __lg(x); /*floor(log2 x)*/ __gcd(x, k);
```

### 9.2 Fast I/O

`read()` loops forever past end of input; call it only as many times as there are numbers.

```cpp
namespace IO {
    const int bif = 1 << 18; char buf[bif], *p1, *p2; int wrt[20], Tp = 0;
    inline char getc() { if (p1 == p2) { p2 = (p1 = buf) + fread(buf, 1, bif, stdin); if (p1 == p2) return EOF; } return *p1++; }
    inline char gotc() { char c = getc(); while (c == ' ' || c == '\n' || c == '\r') c = getc(); return c; }
    inline int read() { int x = 0; bool f = 0; char c = getc(); while (!isdigit(c)) f |= c == '-', c = getc(); while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getc(); return f ? -x : x; }
    inline void write(int x, bool f) { if (x < 0) putchar('-'), x = -x; do { wrt[++Tp] = x % 10, x /= 10; } while(x); while(Tp) putchar(wrt[Tp--] | 48); putchar(f ? '\n' : ' '); }
} using namespace IO;
```

### 9.3 Stress Test (Linux)

Generator, then the checker: compile `data.cpp`, `std.cpp`, `test.cpp`, loop until `diff` reports a difference.

```cpp
//data generator
inline int random(int n) { return 1ll * rand() * rand() % n + 1; }
inline int get(int l, int r) { return 1ll * rand() * rand() % (r - l + 1) + l; }
sandom main() {
    freopen("test.in", "w", stdout);
    srand((unsigned)time(0));
    cout << random(MAX) << ' ' << random(MAX) << endl;
    return 0;
}
```

```cpp
for (int i = 2; i <= n; i++) { //随机生成树
    int fa = random(i - 1);
    int val = random(MAX);
    printf("%d %d %d\n", fa, i, val);
}

//随机生成无向图（n个点m条边，先存边，打乱后再输出）
map <pair<int, int>, bool> be;
struct edge { int u, v, w; } e[Z]; int tot = 0;
//先生成一棵树，保证连通
for (int i = 2; i <= n; i++) {
    int fa = random(i - 1);
    int val = random(MAX);
    e[++tot] = {i, fa, val};
    be[make_pair(fa, i)] = be[make_pair(i, fa)] = 1;
}
//添加剩余边
for (int i = n; i <= m; i++) {
    int x, y;
    do {
        x = random(n), y = random(n);
    } while (x == y || be[make_pair(x, y)]);
    be[make_pair(x, y)] = be[make_pair(y, x)] = 1;
    e[++tot] = {x, y, random(MAX)};
}
shuffle(e + 1, e + 1 + m, mt19937(time(0)));//随机打乱（random_shuffle 在 C++17 中已删除）
for (int i = 1; i <= m; i++) printf("%d %d %d\n", e[i].u, e[i].v, e[i].w);
```

```cpp
#define sandom signed
#include <bits/stdc++.h>
using namespace std;
using namespace chrono;

#define SCK steady_clock
#define DRD duration <double>
#define DCT duration_cast
steady_clock::time_point st, ed;
duration <double> tm1, tm2;

inline void work1() {
    while (1) {
        system("./data");
        st = SCK::now(); system("./test"); ed = SCK::now(); tm1 = DCT<DRD>(ed - st);
        st = SCK::now(); system("./std"); ed = SCK::now(); tm2 = DCT<DRD>(ed - st);
        if (system("diff test.out std.out")) { puts("WA"); break; }
        else printf("AC --- FALSE: %.0lfms &&& TRUE: %.0lfms\n", tm1.count() * 1000, tm2.count() * 1000);
    }
}
inline void work2() {
    while (1) {
        system("./data");
        st = SCK::now(); system("./test"); ed = SCK::now(); tm1 = DCT<DRD>(ed - st);
        printf("TIME: %.0lfms\n", tm1.count() * 1000);
    }
}
inline void work3() {
    if (system("diff test.out std.out")) puts("WA");
    else puts("AC");
}

sandom main() {
    system("g++ data.cpp -o data");//data generator
    system("g++ std.cpp -o std");//standard code
    system("g++ test.cpp -o test");//test code
    work1();//compare brute force and optimized code
    work2();//test optimized code's run time
    work3();//compare two files
    return 0;
}
```
