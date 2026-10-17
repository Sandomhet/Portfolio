---
title: "Trie Tree"
description: "prefix tree used to store and retrieve strings from a dictionary or set."
time: "Mon Feb 1, 2024"
---

# Trie Tree

Each edge is a character; the path from the root spells a prefix, and `ed[rt]` marks nodes where an inserted string ends. Insert and search are $O(|s|)$; memory is (number of nodes) $\times$ (alphabet size). Below: digit strings, root is node $1$.

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
