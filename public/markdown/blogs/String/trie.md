---
title: "Trie Tree"
description: "prefix tree used to store and retrieve strings from a dictionary or set."
time: "Mon Feb 1, 2024"
---

# Trie Tree

```cpp
struct tree
{
    int kid[10];
}; tree tr[Z];
int tot;
bool end[Z];
void insert(char s[], int len)//插入一个字符串
{
    int rt = 1;
    for (re i = 1; i <= len; i++)
    {
        int ch = s[i] - '0';
        if (!tr[rt].kid[ch]) tr[rt].kid[ch] = ++tot;
        rt = tr[rt].kid[ch];
    }
    end[rt] = 1;
}
bool search(char s[], int len)//检索字符串是否存在
{
    int rt = 1;
    for (re i = 1; i <= len; i++)
    {
        int ch = s[i] - '0';
        rt = tr[rt].kid[ch];
        if (!rt) return false;
    }
    return end[rt];
}
```
