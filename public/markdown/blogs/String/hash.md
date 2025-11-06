---
title: "Hashing"
description: "Hash string into numbers for quick query."
time: "Mon Feb 1, 2024"
---

# Hashing

## Table of Contents

将$k$进制数转化为$B$进制数。

```cpp
typedef unsigned long long ull;
const ull B = 131, Mod = 1e9 + 7;
ull ba[Z], ha[Z];
void init(int n)
{
    ba[0] = 1;
    for (int i = 1; i <= n; i++)
        ba[i] = ba[i - 1] * B % Mod;
}
ull hash_get(char s[], int n)
{
    ull res = 0;
    for (int i = 1; i <= n; i++)
        res = (res * B + s[i]) % Mod;
    return res;
}
void hash_got(char s[], int n)
{
    for (int i = 1; i <= n; i++)
        ha[i] = (ha[i - 1] * B + s[i]) % Mod;
}
inline ull calc(int l, int r)
{
    return (ha[r] - ha[l - 1] * ba[r - l + 1] % Mod + Mod) % Mod;
}
```
