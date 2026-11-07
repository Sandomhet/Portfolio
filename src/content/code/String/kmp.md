---
title: "Knuth–Morris–Pratt (KMP) Algorithm"
description: "string-searching algorithm that searches for occurrences of a 'word' within a main 'text string'"
time: "Mon Feb 1, 2024"
---

# Knuth-Morris-Pratt (KMP) Algorithm

$nxt_i$: length of the longest proper prefix of $s[1..i]$ that is also a suffix of it (positions are 1-indexed like the Hash note; the `string` itself is the usual 0-indexed one). On a mismatch, jump $j \leftarrow nxt_j$ instead of restarting. Building `nxt` and matching are both linear: $O(|s| + |t|)$.

一对相等的真前缀与真后缀的个数（$nxt$数组）

```cpp
vector<int> get_nxt(const string &s) { //前缀函数, nxt[1..n]
    int n = s.size(); vector<int> nxt(n + 1);
    for (int i = 2, j = 0; i <= n; ++i) {
        while (j && s[i - 1] != s[j]) j = nxt[j];
        if (s[i - 1] == s[j]) j++;
        nxt[i] = j;
    }
    return nxt;
}
vector<int> kmp_find(const string &t, const string &s) { // all positions (1-indexed) where s occurs in t
    auto nxt = get_nxt(s); vector<int> res;
    int n = s.size();
    for (int i = 1, j = 0; i <= (int)t.size(); ++i) {
        while (j && (j == n || t[i - 1] != s[j])) j = nxt[j];
        if (t[i - 1] == s[j]) j++;
        if (j == n) res.push_back(i - n + 1); //s在t中出现的位置
    }
    return res;
}
```

Usage:

```cpp
auto pos = kmp_find("abababa", "aba"); // {1, 3, 5}
auto nxt = get_nxt(s);
int period = n - nxt[n];               // shortest period of s; s is a power of a string iff n % period == 0
```

## Z-Function

$z_i$: length of the longest common prefix of $s$ and $s[i..n]$ ($z_1 = n$). Keep the rightmost match $[l, r]$; inside it $z_i$ starts from $z_{i-l+1}$. $O(n)$.

```cpp
vector<int> z_function(const string &s) { // z[1..n]
    int n = s.size(); vector<int> z(n + 1);
    if (!n) return z;
    z[1] = n;
    for (int i = 2, l = 1, r = 0; i <= n; i++) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l + 1]);
        while (i + z[i] <= n && s[z[i]] == s[i + z[i] - 1]) z[i]++;
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}
```

Usage:

```cpp
auto z = z_function(s + '#' + t); // matches of s in t: positions i > |s| + 1 with z[i] >= |s|
```
