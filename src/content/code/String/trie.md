---
title: "Trie Tree"
description: "prefix tree used to store and retrieve strings from a dictionary or set."
time: "Mon Feb 1, 2024"
---

# Trie Tree

Each edge is a character; the path from the root spells a prefix, and `ed[rt]` marks nodes where an inserted string ends. Insert and search are $O(|s|)$; memory is (number of nodes) $\times$ (alphabet size). Below: the alphabet is a template parameter, root is node $0$.

```cpp
template<int K = 26, char base = 'a'> struct Trie { // K letters starting at base
    struct Node { int ch[K], end, pass; }; //end: 以此结尾的串数, pass: 经过此点的串数
    vector<Node> t{Node{}};
    void insert(const string &s) { //插入一个字符串
        int u = 0;
        t[0].pass++;
        for (char c : s) {
            int i = c - base;
            if (!t[u].ch[i]) t[u].ch[i] = t.size(), t.push_back(Node{});
            u = t[u].ch[i], t[u].pass++;
        }
        t[u].end++;
    }
    int walk(const string &s) {
        int u = 0;
        for (char c : s) if (!(u = t[u].ch[c - base])) return -1;
        return u;
    }
    int count(const string &s) { int u = walk(s); return u < 0 ? 0 : t[u].end; }  //检索字符串出现次数
    int prefix(const string &s) { int u = walk(s); return u < 0 ? 0 : t[u].pass; }   // words with prefix s
};
```

Usage:

```cpp
Trie<> tr;           // lowercase letters
Trie<10, '0'> dig;   // digit strings
tr.insert(s);
tr.count(s);         // how many times s was inserted
tr.prefix(p);        // how many inserted strings start with p
```

## 01-Trie

Binary trie on the bits of integers, from the highest bit. Maximum XOR with a stored value: greedily go to the child with the opposite bit. $O(\log V)$ per operation.

```cpp
struct XorTrie {
    static const int B = 30; // bits 0..B-1, values < 2^B (use 60 for ll values)
    vector<array<int, 2>> ch{{0, 0}}; vector<int> cnt{0};
    void insert(ll x, int v = 1) { // v = -1 removes one copy
        int u = 0;
        for (int i = B - 1; i >= 0; i--) {
            int b = x >> i & 1;
            if (!ch[u][b]) ch[u][b] = ch.size(), ch.push_back({0, 0}), cnt.push_back(0);
            u = ch[u][b], cnt[u] += v;
        }
    }
    ll max_xor(ll x) { // max of x ^ y over stored y (the trie must be nonempty)
        int u = 0; ll res = 0;
        for (int i = B - 1; i >= 0; i--) {
            int b = x >> i & 1;
            if (ch[u][!b] && cnt[ch[u][!b]]) u = ch[u][!b], res |= 1LL << i;
            else u = ch[u][b];
        }
        return res;
    }
};
```

Usage:

```cpp
XorTrie xt;
xt.insert(a[i]);
xt.max_xor(x);      // max over inserted y of x ^ y
xt.insert(a[i], -1); // erase
```
