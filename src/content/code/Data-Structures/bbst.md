---
title: "Balanced Binary Search Tree"
description: "AVL trees and red-black trees; Splay trees and treaps"
time: "Mon Feb 1, 2024"
---

# Balanced Binary Search Tree

## Properties of BST

A binary search tree (BST) is a binary tree in which each node has a comparable key (and associated value) and satisfies the following properties:
1. The left subtree of a node contains only nodes with keys less than the node's key.
2. The right subtree of a node contains only nodes with keys greater than the node's key.
3. Both the left and right subtrees must also be BSTs.

一颗二叉搜索树应该做到的事情

```cpp
class BST { // values are ll
private:
    struct Node;
    using ptr = unique_ptr<Node>;
    struct Node {
        ll val;
        int cnt, siz, het; // count of duplicates, size of subtree, height
        ptr ch[2]; // children
        Node(const ll& v) : val(v), cnt(1), siz(1), het(1) {}
    };
    ptr root;
    int cnt(const ptr& rt) const { return rt ? rt->cnt : 0; }
    int siz(const ptr& rt) const { return rt ? rt->siz : 0; }
    int het(const ptr& rt) const { return rt ? rt->het : 0; }
    void pushup(ptr& rt) { if (rt) rt->siz = siz(rt->ch[0]) + siz(rt->ch[1]) + rt->cnt, rt->het = max(het(rt->ch[0]), het(rt->ch[1])) + 1; }

    bool contains(const ptr& rt, const ll& v) const {
        if (!rt) return false;
        if (v == rt->val) return true;
        return contains(v < rt->val ? rt->ch[0] : rt->ch[1], v);
    }
    void insert(ptr& rt, const ll& v) {
        if (!rt) { rt = make_unique<Node>(v); return; }
        if (v == rt->val) rt->cnt++;
        else insert(v < rt->val ? rt->ch[0] : rt->ch[1], v);
        pushup(rt);
    }
    void remove(ptr& rt, const ll& v) {
        if (!rt) return;
        if (v == rt->val) {
            if (rt->cnt > 1) { rt->cnt--; pushup(rt); return; }
            if (!rt->ch[0]) { rt = move(rt->ch[1]); return; }
            if (!rt->ch[1]) { rt = move(rt->ch[0]); return; }
            Node* succ = getSuccessor(rt.get());
            rt->val = succ->val;
            rt->cnt = succ->cnt;
            succ->cnt = 1; // reset count before removal
            remove(rt->ch[1], succ->val);
        } else remove(v < rt->val ? rt->ch[0] : rt->ch[1], v);
        pushup(rt);
    }
    Node* findMin(Node* rt) const {
        if (!rt) return nullptr;
        while (rt->ch[0]) rt = rt->ch[0].get();
        return rt;
    }
    Node* findMax(Node* rt) const {
        if (!rt) return nullptr;
        while (rt->ch[1]) rt = rt->ch[1].get();
        return rt;
    }
    Node* getPredecessor(Node* rt) const {
        if (!rt) return nullptr;
        return findMax(rt->ch[0].get());
    }
    Node* getSuccessor(Node* rt) const {
        if (!rt) return nullptr;
        return findMin(rt->ch[1].get());
    }
    Node* getPredecessor(Node* rt, const ll& v) const {
        Node* cur = nullptr;
        while (rt) { //不断向右逼近
            if (rt->val < v) cur = rt, rt = rt->ch[1].get();
            else rt = rt->ch[0].get();
        }
        return cur;
    }
    Node* getSuccessor(Node* rt, const ll& v) const {
        Node* cur = nullptr;
        while (rt) { //不断向左逼近
            if (rt->val > v) cur = rt, rt = rt->ch[0].get();
            else rt = rt->ch[1].get();
        }
        return cur;
    }
    int getRank(const ptr& rt, const ll& v) const { //权值为v的排名（比v小的个数+1）
        if (!rt) return 1;
        if (v == rt->val) return siz(rt->ch[0]) + 1;
        if (v < rt->val) return getRank(rt->ch[0], v);
        return siz(rt->ch[0]) + rt->cnt + getRank(rt->ch[1], v);
    }
    Node* getByRank(const ptr& rt, int rnk) const { //排名为rnk的节点
        if (!rt) return nullptr;
        if (siz(rt->ch[0]) >= rnk) return getByRank(rt->ch[0], rnk);
        if (siz(rt->ch[0]) + rt->cnt >= rnk) return rt.get();
        return getByRank(rt->ch[1], rnk - siz(rt->ch[0]) - rt->cnt);
    }
    void inorder(const ptr& rt, vector<ll>& res) const {
        if (!rt) return;
        inorder(rt->ch[0], res);
        res.push_back(rt->val);
        inorder(rt->ch[1], res);
    }

public:
    bool contains(const ll& v) const { return contains(root, v); }
    void insert(const ll& v) { insert(root, v); }
    void remove(const ll& v) { remove(root, v); }
    ll getMin() const { Node* res = findMin(root.get()); if (!res) throw runtime_error("Tree is empty"); return res->val; }
    ll getMax() const { Node* res = findMax(root.get()); if (!res) throw runtime_error("Tree is empty"); return res->val; }
    ll getPredecessor(const ll& v) const { Node* res = getPredecessor(root.get(), v); if (!res) throw runtime_error("No predecessor"); return res->val; }
    ll getSuccessor(const ll& v) const { Node* res = getSuccessor(root.get(), v); if (!res) throw runtime_error("No successor"); return res->val; }
    int getRank(const ll& v) const { return getRank(root, v); }
    ll getByRank(int rnk) const { Node* res = getByRank(root, rnk); if (!res) throw runtime_error("Rank out of bounds"); return res->val; }

    vector<ll> inorder() const { vector<ll> v; inorder(root, v); return v; }
};
```

## Properties of Balanced BST

A balanced binary search tree is a binary search tree that maintains its height to be logarithmic in the number of nodes, ensuring efficient operations. Common types of balanced BSTs include AVL trees, red-black trees, splay trees, and treaps.

Worst-case $O(\log n)$ height, ensuring $O(\log n)$ for search, insertion, and deletion operations.

Denotaion:
- $h(rt)$: height of the subtree rooted at node `rt`.
- $lk$, $rk$: left and right kids of node `rt`.
- $\alpha$: the closest node whose subtree is unbalanced.

## AVL Tree (Adelson-Velsky and Landis Tree)

AVL树是一种严格平衡的二叉搜索树，任何节点的两个子树的高度最大差别为1。

Properties:
1. For every node $rt$, $|h(lk) - h(rk)| \leq 1$.

Algorithms:
1. Insert the new node as in a regular BST.
2. Backtrack to the root, updating heights and checking balance factors.
3. Perform appropriate rotations to restore balance. Do 1 or 2 rotations as needed.

Rotations: When insertion, left, left -> right rotation; right, right -> left rotation; left, right -> left-right rotation; right, left -> right-left rotation. On the lowest unbalanced node.

Four cases of rotations:
- Left-Left Case: $x$ inserted into left subtree of left child of $\alpha$.
- Right-Right Case: $x$ inserted into right subtree of right child of $\alpha$.
- Left-Right Case: $x$ inserted into right subtree of left child of $\alpha$.
- Right-Left Case: $x$ inserted into left subtree of right child of $\alpha$.

<!-- ![alt text](/images/image.png) -->
![alt text](/images/image-1.png)


Every tree below has the same interface; values are `ll`, duplicates are allowed, and `cap` is the maximum number of nodes (insertions).

| call | meaning |
|---|---|
| `insert(v)` / `erase(v)` | add / remove one copy of `v` |
| `rank(v)` | number of values $< v$, plus $1$ |
| `kth(k)` | $k$-th smallest value ($1 \le k \le$ size) |
| `prev(v)` / `next(v)` | largest value $< v$ / smallest value $> v$ (`-inf` / `inf` if none) |

```cpp
struct AVL {
    struct Node { int ch[2], siz, het; ll val; };
    vector<Node> t; int root = 0, tot = 0;
    AVL(int cap) : t(cap + 1) {}
    void pushup(int x) { //更新信息
        t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + 1;
        t[x].het = max(t[t[x].ch[0]].het, t[t[x].ch[1]].het) + 1;
    }
    void rotate(int &x, int d) { //d = 1: 右旋 (left child goes up), d = 0: 左旋
        int y = t[x].ch[d ^ 1];
        t[x].ch[d ^ 1] = t[y].ch[d], t[y].ch[d] = x;
        pushup(x), pushup(y), x = y;
    }
    void balance(int &x) {
        int &l = t[x].ch[0], &r = t[x].ch[1];
        if (t[l].het - t[r].het == 2) {
            if (t[t[l].ch[0]].het < t[t[l].ch[1]].het) rotate(l, 0); //左右
            rotate(x, 1); //左左
        } else if (t[r].het - t[l].het == 2) {
            if (t[t[r].ch[1]].het < t[t[r].ch[0]].het) rotate(r, 1); //右左
            rotate(x, 0); //右右
        }
    }
    void insert(int &x, ll v) {
        if (!x) { x = ++tot, t[x] = {{0, 0}, 1, 1, v}; return; }
        insert(t[x].ch[v >= t[x].val], v); //相等的值插在右子树
        pushup(x), balance(x);
    }
    void erase(int &x, ll v) {
        if (!x) return;
        if (v == t[x].val) {
            int l = t[x].ch[0], r = t[x].ch[1];
            if (!l || !r) { x = l + r; return; }
            while (t[l].ch[1]) l = t[l].ch[1]; //用前驱替换
            t[x].val = t[l].val;
            erase(t[x].ch[0], t[l].val);
        } else erase(t[x].ch[v > t[x].val], v);
        pushup(x), balance(x);
    }
    void insert(ll v) { insert(root, v); }
    void erase(ll v) { erase(root, v); }
    int rank(ll v) {
        int res = 1;
        for (int x = root; x; )
            if (t[x].val < v) res += t[t[x].ch[0]].siz + 1, x = t[x].ch[1];
            else x = t[x].ch[0];
        return res;
    }
    ll kth(int k) {
        for (int x = root; ; ) {
            int l = t[x].ch[0];
            if (k <= t[l].siz) x = l;
            else if (k == t[l].siz + 1) return t[x].val;
            else k -= t[l].siz + 1, x = t[x].ch[1];
        }
    }
    ll prev(ll v) { ll res = -inf; for (int x = root; x; ) if (t[x].val < v) res = t[x].val, x = t[x].ch[1]; else x = t[x].ch[0]; return res; }
    ll next(ll v) { ll res = inf; for (int x = root; x; ) if (t[x].val > v) res = t[x].val, x = t[x].ch[0]; else x = t[x].ch[1]; return res; }
};
```

## Treap

根据随机数据的平衡性，利用某一个评判标准（这里为大根堆），使二叉查找树有序化，使得其深度保持在$logn$。

```cpp
struct Treap {
    struct Node { int ch[2], pri, cnt, siz; ll val; }; //pri: 大根堆判断标准, cnt: 相同值的个数
    vector<Node> t; int root = 0, tot = 0; mt19937 rng{random_device{}()};
    Treap(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + t[x].cnt; }
    void rotate(int &x, int d) { //把 ch[d ^ 1] 转上来
        int y = t[x].ch[d ^ 1];
        t[x].ch[d ^ 1] = t[y].ch[d], t[y].ch[d] = x;
        pushup(x), pushup(y), x = y;
    }
    void insert(int &x, ll v) {
        if (!x) { x = ++tot, t[x] = {{0, 0}, (int)rng(), 1, 1, v}; return; }
        if (v == t[x].val) t[x].cnt++;
        else {
            int d = v > t[x].val;
            insert(t[x].ch[d], v);
            if (t[t[x].ch[d]].pri > t[x].pri) rotate(x, d ^ 1); //维护大根堆
        }
        pushup(x);
    }
    void erase(int &x, ll v) {
        if (!x) return;
        if (v == t[x].val) {
            if (t[x].cnt > 1) { t[x].cnt--, pushup(x); return; }
            int l = t[x].ch[0], r = t[x].ch[1];
            if (!l || !r) { x = l + r; return; }
            int d = t[l].pri > t[r].pri ? 0 : 1; //向下旋转使之成为叶子
            rotate(x, d ^ 1);
            erase(t[x].ch[d ^ 1], v);
        } else erase(t[x].ch[v > t[x].val], v);
        pushup(x);
    }
    void insert(ll v) { insert(root, v); }
    void erase(ll v) { erase(root, v); }
    int rank(ll v) {
        int res = 1;
        for (int x = root; x; )
            if (t[x].val < v) res += t[t[x].ch[0]].siz + t[x].cnt, x = t[x].ch[1];
            else x = t[x].ch[0];
        return res;
    }
    ll kth(int k) {
        for (int x = root; ; ) {
            int l = t[x].ch[0];
            if (k <= t[l].siz) x = l;
            else if (k <= t[l].siz + t[x].cnt) return t[x].val;
            else k -= t[l].siz + t[x].cnt, x = t[x].ch[1];
        }
    }
    ll prev(ll v) { ll res = -inf; for (int x = root; x; ) if (t[x].val < v) res = t[x].val, x = t[x].ch[1]; else x = t[x].ch[0]; return res; }
    ll next(ll v) { ll res = inf; for (int x = root; x; ) if (t[x].val > v) res = t[x].val, x = t[x].ch[0]; else x = t[x].ch[1]; return res; }
};
```

## Splay

每次对一个节点操作，都把它旋转到根，据说是有什么数据趋势平衡（玄学），精髓便在于$splay$函数。

Every operation splays the last node it touches to the root, which gives amortized $O(\log n)$.

```cpp
struct Splay {
    struct Node { int ch[2], fa, cnt, siz; ll val; };
    vector<Node> t; int root = 0, tot = 0;
    Splay(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + t[x].cnt; }
    bool get(int x) { return t[t[x].fa].ch[1] == x; } //左孩子还是右孩子
    void rotate(int x) { //上旋
        int y = t[x].fa, z = t[y].fa, k = get(x);
        if (z) t[z].ch[get(y)] = x; //儿子先取代父亲
        t[x].fa = z;
        t[y].ch[k] = t[x].ch[k ^ 1]; //把儿子的孩子给父亲
        if (t[x].ch[k ^ 1]) t[t[x].ch[k ^ 1]].fa = y;
        t[x].ch[k ^ 1] = y, t[y].fa = x; //把父亲变为x的儿子
        pushup(y), pushup(x);
    }
    void splay(int x, int goal = 0) { //将x旋转为goal的儿子
        while (t[x].fa != goal) {
            int y = t[x].fa;
            if (t[y].fa != goal) rotate(get(x) == get(y) ? y : x);
            rotate(x);
        }
        if (!goal) root = x; //更新树根
    }
    void find(ll v) { //把 v 或与 v 相邻的节点转到根
        int x = root;
        if (!x) return;
        while (t[x].val != v && t[x].ch[v > t[x].val]) x = t[x].ch[v > t[x].val];
        splay(x);
    }
    void insert(ll v) {
        int x = root, f = 0;
        while (x && t[x].val != v) f = x, x = t[x].ch[v > t[x].val];
        if (x) t[x].cnt++, pushup(x);
        else {
            x = ++tot, t[x] = {{0, 0}, f, 1, 1, v};
            if (f) t[f].ch[v > t[f].val] = x;
        }
        splay(x);
    }
    void erase(ll v) {
        find(v);
        int x = root;
        if (!x || t[x].val != v) return;
        if (t[x].cnt > 1) { t[x].cnt--, pushup(x); return; }
        int l = t[x].ch[0], r = t[x].ch[1];
        if (!l) { root = r, t[r].fa = 0; return; }
        while (t[l].ch[1]) l = t[l].ch[1];
        splay(l, x); //前驱转到根的左儿子，它没有右儿子
        t[l].ch[1] = r;
        if (r) t[r].fa = l;
        t[l].fa = 0, root = l, pushup(l);
    }
    int rank(ll v) {
        find(v);
        int x = root;
        return x ? t[t[x].ch[0]].siz + (t[x].val < v ? t[x].cnt : 0) + 1 : 1;
    }
    ll kth(int k) {
        int x = root;
        while (true) {
            int l = t[x].ch[0];
            if (k <= t[l].siz) x = l;
            else if (k <= t[l].siz + t[x].cnt) break;
            else k -= t[l].siz + t[x].cnt, x = t[x].ch[1];
        }
        splay(x);
        return t[x].val;
    }
    ll prev(ll v) {
        find(v);
        int x = root;
        if (!x) return -inf;
        if (t[x].val < v) return t[x].val;
        x = t[x].ch[0];
        if (!x) return -inf;
        while (t[x].ch[1]) x = t[x].ch[1];
        splay(x);
        return t[x].val;
    }
    ll next(ll v) {
        find(v);
        int x = root;
        if (!x) return inf;
        if (t[x].val > v) return t[x].val;
        x = t[x].ch[1];
        if (!x) return inf;
        while (t[x].ch[0]) x = t[x].ch[0];
        splay(x);
        return t[x].val;
    }
};
```

## FHQ-Treap

Treap without rotations. `split(x, v, a, b)`: $a$ gets keys $\le v$, $b$ gets keys $> v$. `merge(a, b)` (all keys of $a$ $\le$ all keys of $b$): the root with the larger `pri` stays on top. Every operation is a combination of split and merge, expected $O(\log n)$. This is the one to use in a contest.

```cpp
struct FHQ {
    struct Node { int ch[2], pri, siz; ll val; };
    vector<Node> t; int root = 0, tot = 0; mt19937 rng{random_device{}()};
    FHQ(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + 1; }
    void split(int x, ll v, int &a, int &b) { // a: <= v, b: > v
        if (!x) { a = b = 0; return; }
        if (t[x].val <= v) a = x, split(t[x].ch[1], v, t[x].ch[1], b);
        else b = x, split(t[x].ch[0], v, a, t[x].ch[0]);
        pushup(x);
    }
    int merge(int a, int b) {
        if (!a || !b) return a + b;
        if (t[a].pri > t[b].pri) { t[a].ch[1] = merge(t[a].ch[1], b), pushup(a); return a; }
        t[b].ch[0] = merge(a, t[b].ch[0]), pushup(b); return b;
    }
    void insert(ll v) {
        int a, b;
        t[++tot] = {{0, 0}, (int)rng(), 1, v};
        split(root, v, a, b);
        root = merge(merge(a, tot), b);
    }
    void erase(ll v) { //只删除一个
        int a, b, c;
        split(root, v, a, c), split(a, v - 1, a, b);
        if (b) b = merge(t[b].ch[0], t[b].ch[1]); //删除全部: b = 0
        root = merge(merge(a, b), c);
    }
    int rank(ll v) {
        int a, b;
        split(root, v - 1, a, b);
        int res = t[a].siz + 1;
        root = merge(a, b);
        return res;
    }
    ll kth(int k) {
        for (int x = root; ; ) {
            int l = t[x].ch[0];
            if (k <= t[l].siz) x = l;
            else if (k == t[l].siz + 1) return t[x].val;
            else k -= t[l].siz + 1, x = t[x].ch[1];
        }
    }
    ll prev(ll v) { ll res = -inf; for (int x = root; x; ) if (t[x].val < v) res = t[x].val, x = t[x].ch[1]; else x = t[x].ch[0]; return res; }
    ll next(ll v) { ll res = inf; for (int x = root; x; ) if (t[x].val > v) res = t[x].val, x = t[x].ch[0]; else x = t[x].ch[1]; return res; }
    int size() { return t[root].siz; }
};
```

Usage (the same for `AVL`, `Treap`, `Splay`):

```cpp
FHQ s(n);          // n = maximum number of insertions
s.insert(x), s.erase(x);
s.rank(x);         // number of values < x, plus 1
s.kth(k);          // k-th smallest
s.prev(x), s.next(x);
```

### Sequence (Implicit Key)

文艺平衡树: split by size instead of value, so the tree stores a sequence. A lazy `rev` tag reverses a range in $O(\log n)$.

```cpp
struct FHQSeq {
    struct Node { int ch[2], pri, siz; bool rev; ll val; };
    vector<Node> t; int root = 0, tot = 0; mt19937 rng{random_device{}()};
    FHQSeq(int cap) : t(cap + 1) {}
    void pushup(int x) { t[x].siz = t[t[x].ch[0]].siz + t[t[x].ch[1]].siz + 1; }
    void pushdown(int x) {
        if (!t[x].rev) return;
        swap(t[x].ch[0], t[x].ch[1]);
        for (int c : t[x].ch) if (c) t[c].rev ^= 1;
        t[x].rev = 0;
    }
    void split(int x, int k, int &a, int &b) { // a: first k elements
        if (!x) { a = b = 0; return; }
        pushdown(x);
        if (t[t[x].ch[0]].siz < k) a = x, split(t[x].ch[1], k - t[t[x].ch[0]].siz - 1, t[x].ch[1], b);
        else b = x, split(t[x].ch[0], k, a, t[x].ch[0]);
        pushup(x);
    }
    int merge(int a, int b) {
        if (!a || !b) return a + b;
        if (t[a].pri > t[b].pri) { pushdown(a), t[a].ch[1] = merge(t[a].ch[1], b), pushup(a); return a; }
        pushdown(b), t[b].ch[0] = merge(a, t[b].ch[0]), pushup(b); return b;
    }
    void push_back(ll v) { t[++tot] = {{0, 0}, (int)rng(), 1, 0, v}; root = merge(root, tot); }
    void reverse(int l, int r) { // 1-indexed positions
        int a, b, c;
        split(root, r, a, c), split(a, l - 1, a, b);
        if (b) t[b].rev ^= 1;
        root = merge(merge(a, b), c);
    }
    void dfs(int x, vector<ll> &out) {
        if (!x) return;
        pushdown(x), dfs(t[x].ch[0], out), out.push_back(t[x].val), dfs(t[x].ch[1], out);
    }
    vector<ll> get() { vector<ll> out; dfs(root, out); return out; }
};
```

Usage:

```cpp
FHQSeq s(n);
for (int i = 1; i <= n; i++) s.push_back(i);
s.reverse(l, r);
for (ll x : s.get()) cout << x << ' ';
```
