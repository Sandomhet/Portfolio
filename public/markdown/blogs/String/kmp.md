---
title: "Knuth–Morris–Pratt (KMP) Algorithm"
description: "string-searching algorithm that searches for occurrences of a 'word' within a main 'text string'"
time: "Mon Feb 1, 2024"
---

# Knuth–Morris–Pratt (KMP) Algorithm

一对相等的真前缀与真后缀的个数（$nxt$数组）

```cpp
void get_nxt(char s[], int len)//前缀函数
{
    nxt[1] = 0;
    for (int i = 2, j = 0; i <= len; ++i)
    {
        while (j && s[i] != s[j + 1]) j = nxt[j];
        if (s[i] == s[j + 1]) j++;
        nxt[i] = j;
    }
}
void match(char s[], int lens, char t[], int lent)//s在t中出现的次数
{
    for (int i = 1; j = 0; i <= lent; ++i)
    {
        while (j && (j == lens || t[i] != s[j + 1])) j = nxt[j];
        if (t[i] == s[j + 1]) j++;
        if (j == lens)
        {
            ++ans;
            j = nxt[j];
            //return i - j + 1;//s在t中出现的第一个位置
        }
    }
}
```
