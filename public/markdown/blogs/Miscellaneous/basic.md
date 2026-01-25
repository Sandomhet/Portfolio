---
title: "Basic C++ Syntax"
description: "An overview of basic syntax in C++ programming"
time: "Mon Feb 1, 2024"
---

# Basic C++ Syntax

## Table of Contents

优先队列

## Priority Queue

```cpp
#include <queue>
using namespace std;
priority_queue<int> q; // 默认大顶堆
priority_queue<int, vector<int>, less<int>> q_max; // 大顶堆
priority_queue<int, vector<int>, greater<int>> q_min; // 小顶堆

using pii = pair<int, int>;
priority_queue<pii, vector<pii>, greater<pii>> q_pii; // 小顶堆，按pair的第一个元素排序
priority_queue<pii, vector<pii>, less<pii>> q_pii_max; // 大顶堆，按pair的第一个元素排序
```

## Sort

```cpp
#include <algorithm>
using namespace std;
int a[] = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
vector<int> b(10, 1);
sort(a, a + 11); // 升序排序
sort(b.begin(), b.end()); // 升序排序
sort(a, a + 11, greater<int>()); // 降序排序
sort(b.begin(), b.end(), greater<int>()); // 降序排序
sort(a, a + 11, [](int x, int y) { return x > y; }); // 自定义排序
sort(b.begin(), b.end(), [](int x, int y) { return x > y; }); // 自定义排序
``` 

重载运算符

```cpp
struct Point {
    int x, y;
    bool operator<(const Point& p) const {
        if (x == p.x) return y < p.y;
        return x < p.x;
    }
    /// alternative way
    friend bool operator<(const Point& a, const Point& b) {
        if (a.x == b.x) return a.y < b.y;
        return a.x < b.x;
    }
};
vector<Point> points;
sort(points.begin(), points.end()); // 使用重载的 < 运算符进行排序
```


