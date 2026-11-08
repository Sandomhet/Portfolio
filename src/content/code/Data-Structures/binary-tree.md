---
title: "Binary Tree"
description: "binary tree, binary search tree, and heap."
time: "Mon Feb 1, 2024"
---

# Binary Tree

## Traversal

- Preorder: root, left, right
- Inorder: left, root, right
- Postorder: left, right, root

二叉树遍历

Children are `lc[u]`, `rc[u]` (0 = none); the functions append node ids to `out`.

```cpp
void preorder(int u, const vector<int> &lc, const vector<int> &rc, vector<int> &out) { //先序遍历
    if (!u) return;
    out.push_back(u), preorder(lc[u], lc, rc, out), preorder(rc[u], lc, rc, out);
}
void inorder(int u, const vector<int> &lc, const vector<int> &rc, vector<int> &out) { //中序遍历
    if (!u) return;
    inorder(lc[u], lc, rc, out), out.push_back(u), inorder(rc[u], lc, rc, out);
}
void postorder(int u, const vector<int> &lc, const vector<int> &rc, vector<int> &out) { //后序遍历
    if (!u) return;
    postorder(lc[u], lc, rc, out), postorder(rc[u], lc, rc, out), out.push_back(u);
}
```

### Rebuild from Two Traversals

The first (preorder) or last (postorder) element is the root; its position in the inorder sequence splits the left and right subtrees.

已知两遍历求另一遍历 (labels must be distinct)

```cpp
string post_from_pre_in(const string &pre, const string &in) { //已知先序和中序求后序
    if (pre.empty()) return "";
    int k = in.find(pre[0]); //根节点的位置
    return post_from_pre_in(pre.substr(1, k), in.substr(0, k))
         + post_from_pre_in(pre.substr(k + 1), in.substr(k + 1)) + pre[0];
}
string pre_from_post_in(const string &post, const string &in) { //已知后序和中序求先序
    if (post.empty()) return "";
    char root = post.back();
    int k = in.find(root);
    return root + pre_from_post_in(post.substr(0, k), in.substr(0, k))
         + pre_from_post_in(post.substr(k, post.size() - k - 1), in.substr(k + 1));
}
```

Usage:

```cpp
post_from_pre_in("ABDEC", "DBEAC"); // "DEBCA"
pre_from_post_in("DEBCA", "DBEAC"); // "ABDEC"
```

## Binary Search Tree (BST)

The left subtree holds smaller keys and the right subtree larger ones, so the inorder traversal is sorted. See the Balanced Binary Search Tree note for the full implementations.

## Binary Heap

Array `h[1..n]`: children of $i$ are $2i$ and $2i+1$, parent is $\lfloor i/2 \rfloor$. Insert sifts up, pop moves the last element to the root and sifts down, both $O(\log n)$. In a contest just use `priority_queue`.

手打堆

```cpp
struct Heap { // max-heap; for a min-heap flip cmp to a > b
    vector<ll> h{0}; // h[0] unused
    static bool cmp(ll a, ll b) { return a < b; } // true: a must sit below b
    void push(ll x) {
        h.push_back(x);
        for (int i = h.size() - 1; i > 1 && cmp(h[i / 2], h[i]); i /= 2) swap(h[i], h[i / 2]);
    }
    void pop() {
        h[1] = h.back(), h.pop_back();
        for (int i = 1, j; (j = i * 2) < (int)h.size(); i = j) {
            if (j + 1 < (int)h.size() && cmp(h[j], h[j + 1])) j++;
            if (!cmp(h[i], h[j])) break;
            swap(h[i], h[j]);
        }
    }
    ll top() const { return h[1]; }
    int size() const { return h.size() - 1; }
    bool empty() const { return h.size() == 1; }
};
```

Usage:

```cpp
Heap hp;
hp.push(x), hp.top(), hp.pop(), hp.size();

// heap sort (ascending) with the max-heap
for (int i = 1; i <= n; i++) hp.push(a[i]);
for (int i = n; i >= 1; i--) a[i] = hp.top(), hp.pop();
```
