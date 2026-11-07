---
title: "Longest Palindromic Substring"
description: "finding a maximum-length contiguous substring of a given string that is a palindrome"
time: "Mon Feb 1, 2024"
---

# Longest Palindromic Substring

求解最大回文字符子串。

首先会想到一个算法，枚举每个字符作为中心点（奇数）或中心点左一个（偶数），分别向两侧扩展到最大长度。时间复杂度O([n，n^2])
，随机数据接近O(n)。显然是不稳定的。

考虑回文字符串内部的性质：关于回文串中心点对称的两个字符串，一定对称且全等。

设回文串中心点为mid，右端点为r，则在[mid，r]中的i，一定有一个点j在mid左侧与它对称，因为两者全等，所以d[i]=d[j]
，我们根据这个已有的半径，再向两侧扩展。扩展完后，如果以i为中心点的回文字符串的右端点大于r，则要更新r和mid，因为左侧已经处理完，不需要处理边界，而右侧要保证每一个都扫到。（注意：半径范围可能超出r，但这不是我们想要的，这样会导致一部分字符没有进入判断。所以取一个min）。

算法正确性：当我们取到d[i]=d[j]时，在r范围内不进行扩展，因为如果i能够扩展，那么j也会扩展。所以d[i]
只会在r右侧一点点扩展，r是单调指针，只一次次向右移动，直到n，因此时间复杂度为O(n)。

```cpp
// s = "^#t1#t2#...#tn#$", so t[j] (1-indexed) sits at s[2j]; d[i]: radius at s[i] (d[i] - 1 = length of that palindrome in t)
vector<int> manacher(const string &t) {
    string s = "^#"; //在字符中间加隔板，两端哨兵防止越界
    for (char c : t) s += c, s += '#';
    s += '$';
    int n = s.size(); vector<int> d(n);
    for (int i = 1, mid = 0, r = 0; i < n - 1; i++) {
        d[i] = i <= r ? min(d[2 * mid - i], r - i + 1) : 1; //取对称点
        while (s[i - d[i]] == s[i + d[i]]) d[i]++; //扩展半径
        if (i + d[i] - 1 > r) r = i + d[i] - 1, mid = i; //扩展最右侧右端点
    }
    return d;
}
string longest_palindrome(const string &t) {
    auto d = manacher(t);
    int i = max_element(d.begin(), d.end()) - d.begin();
    return t.substr((i - d[i]) / 2, d[i] - 1); // the palindrome starts at t[(i - d[i]) / 2 + 1] (1-indexed)
}
```

Usage:

```cpp
auto d = manacher(t);
// positions j are 1-indexed
// odd palindrome centered at t[j]: d[2 * j] - 1 = its max length
// even palindrome centered between t[j] and t[j + 1]: d[2 * j + 1] - 1
longest_palindrome("abacabad"); // "abacaba"
```