---
title: "C++ Code Start Template"
description: ""
time: "Mon Feb 1, 2024"
---

# C++ Code Starter Template

```cpp
#define sandom signed
#define fre(x, y) freopen(#x ".in", "r", stdin), freopen(#y ".out", "w", stdout);
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cmath>
#include <cstring>
#include <string>
#include <vector>
#include <queue>
#include <deque>
#include <set>
#include <bitset>
#include <random>
#define rep(i, a, b) for (int i = (a); i <= (b); ++i)
#define dwn(i, a, b) for (int i = (a); i >= (b); --i)
// #define int long long
using namespace std; typedef long long ll; typedef unsigned long long ull; typedef pair<int, int> paint;
namespace IO
{
    const int bif = 1 << 18; char buf[bif], *p1, *p2; int wrt[20], Tp = 0;
    inline char getc() { if (p1 == p2) { p2 = (p1 = buf) + fread(buf, 1, bif, stdin); if (p1 == p2) return EOF; } return *p1++; }
    inline char gotc() { char c = getc(); while (c == ' ' || c == '\n' || c == '\r') c = getc(); return c; }
    inline int read() { int x = 0; bool f = 0; char c = getc(); while (!isdigit(c)) f |= c == '-', c = getc(); while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getc(); return f ? -x : x; }
    inline void write(int x, bool f) { if (x < 0) putchar('-'), x = -x; do { wrt[++Tp] = x % 10, x /= 10; } while(x); while(Tp) putchar(wrt[Tp--] | 48); putchar(f ? '\n' : ' '); }
} using namespace IO;
const int Z = 1e5 + 10, inf = 2e9, mod = 998244353;
inline int max(int a, int b) { return a > b ? a : b; } inline int min(int a, int b) { return a < b ? a : b; } inline int abs(int x) { return x < 0 ? -x : x; }

int n, m, k, ans;

sandom main()
{
    fre(test, test);
    // ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    return 0;
}
/*
IN
OUT
*/
```
