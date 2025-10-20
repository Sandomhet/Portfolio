---
title: "Fast Input and Output (Fast I/O)"
description: "use string buffer read to accelerate read and write"
time: "Mon Feb 1, 2024"
---

# Fast Input and Output (Fast I/O)

```cpp
namespace IO {
    const int bif = 1 << 18; char buf[bif], *p1, *p2; int wrt[20], Tp = 0;
    inline char getc() {
        if (p1 == p2) {
            p2 = (p1 = buf) + fread(buf, 1, bif, stdin);
            if (p1 == p2) return EOF;
        }
        return *p1++;
    }
    inline char gotc() {
        char c = getc();
        while (c == ' ' || c == '\n' || c == '\r') c = getc();
        return c;
    }
    inline int read() {
        int x = 0; bool f = 0; char c = getc();
        while (!isdigit(c)) f |= c == '-', c = getc();
        while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getc();
        return f ? -x : x;
    }
    inline void write(int x, bool f) {
        if (x < 0) putchar('-'), x = -x;
        do { wrt[++Tp] = x % 10, x /= 10; } while(x);
        while (Tp) putchar(wrt[Tp--] | 48);
        putchar(f ? '\n' : ' ');
    }
} using namespace IO;
```

压缩版

```cpp
namespace IO
{
    const int bif = 1 << 18; char buf[bif], *p1, *p2; int wrt[20], Tp = 0;
    inline char getc() { if (p1 == p2) { p2 = (p1 = buf) + fread(buf, 1, bif, stdin); if (p1 == p2) return EOF; } return *p1++; }
    inline char gotc() { char c = getc(); while (c == ' ' || c == '\n' || c == '\r') c = getc(); return c; }
    inline int read() { int x = 0; bool f = 0; char c = getc(); while (!isdigit(c)) f |= c == '-', c = getc(); while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getc(); return f ? -x : x; }
    inline void write(int x, bool f) { if (x < 0) putchar('-'), x = -x; do { wrt[++Tp] = x % 10, x /= 10; } while(x); while(Tp) putchar(wrt[Tp--] | 48); putchar(f ? '\n' : ' '); }
} using namespace IO;
```
