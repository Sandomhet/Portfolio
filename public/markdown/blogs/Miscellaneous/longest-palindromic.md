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
int d[Z];//d[i]：以i为对称中心的最大回文串的半径为d[i]
void manacher(char t[], int len)
{
    n = len * 2 + 1;//新串
    s[0] = '{', s[n + 1] = '}';//防止字符串之间冲突
    for (re i = 1; i <= n; i++)
        s[i << 1] = t[i], s[(i << 1) - 1] = '|';//在字符中间加隔板
    s[n] = '|';
    int mid = 0, r = 0;
    for (re i = 1; i <= n; i++)
    {
        if (i <= r) d[i] = min(d[mid * 2 - i], r - i + 1);//取对称点
        else d[i] = 1;
        while (s[i - d[i]] == s[i + d[i]]) d[i]++;//扩展半径
        if (i + d[i] > r) r = i + d[i] - 1, mid = i;//扩展最右侧右端点
    }
}
```