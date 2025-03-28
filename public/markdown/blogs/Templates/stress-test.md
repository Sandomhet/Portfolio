---
title: "Stress Testing Harness"
description: "automates the execution of tests, confirm if the results are correct, test extreme data limits"
time: "Mon Feb 1, 2024"
---

# Stress Testing Harness

生成数据 (data)

```cpp
//data generator
inline int random(int n) { return 1ll * rand() * rand() % n + 1; }
inline int get(int l, int r) { return 1ll * rand() * rand() % (r - l + 1) + l; }
sandom main()
{
    freopen("test.in", "w", stdout);
    srand((unsigned)time(0));
    cout << random(MAX) << random(MAX) << endl;
    return 0;
}
```

```cpp
for (re i = 2; i <= n; i++)//随机生成树
{
    int fa = random(i - 1);
    int val = random(MAX);
    printf("%d %d %d\n", fa, i, val);
}

//随机生成无向图
map <pair<int, int>, bool> be;
//先生成一棵树，保证连通
for (re i = 2; i <= n; i++)
{
    int fa = random(i - 1);
    int val = random(MAX);
    printf("%d %d %d\n", i, fa, val);
    be[make_pair(fa, i)] = be[make_pair(i, fa)] = 1;
}
//添加剩余边
for (re i = n; i <= m; i++)
{
    int x, y;
    do
    {
        x = random(n), y = random(n);
    } while (x == y || be[make_pair(x, y)]);
    be[make_pair(x, y)] = be[make_pair(y, x)] = 1;
}
random_shuffle(e + 1, e + 1 + m);//随机打乱
```

标准代码(std)

```cpp
sandom main()
{
    freopen("test.in", "r", stdin), freopen("std.out", "w", stdout);
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
```

测试代码(test)

```cpp
sandom main()
{
    freopen("test.in", "r", stdin), freopen("test.out", "w", stdout);
    int a, b;
    cin >> a >> b;
    if (a % 5 == 0) a++;
    cout << a + b << endl;
    return 0;
}
```

Linux下对拍主程序（check）

```cpp
#define sandom signed
#include <bits/stdc++.h>
using namespace std;
using namespace chrono;

#define SCK steady_clock
#define DRD duration <double>
#define DCT duration_cast
steady_clock::time_point st, ed;
duration <double> tm1, tm2;

inline void work1()
{
    while (1)
    {
        system("./data");
        st = SCK::now(); system("./test"); ed = SCK::now(); tm1 = DCT<DRD>(ed - st);
        st = SCK::now(); system("./std"); ed = SCK::now(); tm2 = DCT<DRD>(ed - st);
        if (system("diff test.out std.out")) { puts("WA"); break; }
        else printf("AC --- FALSE: %.0lfms &&& TRUE: %.0lfms\n", tm1.count() _ 1000, tm2.count() _ 1000);
    }
}
inline void work2()
{
    while (1)
    {
        system("./data");
        st = SCK::now(); system("./test"); ed = SCK::now(); tm1 = DCT<DRD>(ed - st);
        printf("TIME: %.0lfms\n", tm1.count() \* 1000);
    }
}
inline void work3()
{
    if (system("diff test.out std.out")) puts("WA");
    else puts("AC");
}

sandom main()
{
    system("g++ data.cpp -o data");//data generator
    system("g++ std.cpp -o std");//standard code
    system("g++ test.cpp -o test");//test code
    work1();//compare brute force and optimized code
    work2();//test optimized code's run time
    work3();//compare two files
    return 0;
}
````

Windows 下对拍主程序（check）

```cpp
#define sandom signed
#include <bits/stdc++.h>
using namespace std;
double st1, ed1, st2, ed2;

inline void work1()
{
    while (1)
    {
        system("data.exe");
        st1 = clock(); system("test.exe"); ed1 = clock();
        st2 = clock(); system("std.exe"); ed2 = clock();
        if (system("fc test.out std.out")) { puts("WA"); break; }
        else printf("AC --- FALSE: %.0lfms &&& TRUE: %.0lfms\n", ed1 - st1, ed2 - st2);
    }
}
inline void work2()
{
    while (1)
    {
        system("data.exe");
        st1 = clock(); system("test.exe"); ed1 = clock();
        printf("TIME: %.0lfms\n", ed1 - st1);
    }
}
inline void work3()
{
    if (system("fc test.out std.out")) puts("WA");
    else puts("AC");
}

sandom main()
{
    system("g++ data.cpp -o data");//生成数据
    system("g++ std.cpp -o std");//标准代码
    system("g++ test.cpp -o test");//测试代码
    work1();//暴力与正解对拍
    work2();//测试正解时间
    work3();//比对两个文件
    return 0;
}
```
