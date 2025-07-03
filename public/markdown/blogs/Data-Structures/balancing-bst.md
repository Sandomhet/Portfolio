---
title: "Self-balancing Binary Search Tree"
description: "AVL trees and red–black trees; Splay trees and treaps"
time: "Mon Feb 1, 2024"
---

# Self-balancing Binary Search Tree

一颗二叉搜索树应该做到的事情

```cpp
int get_pre(int rt, int val)//前驱节点
{
    int ans;
    while (rt)//不断向右逼近
    {
        if (bt[rt].val < val) ans = rt, rt = rk;
        else rt = lk;
    }
    return bt[ans].val;
}
int get_nxt(int rt, int val)//后驱节点
{
    int ans;
    while (rt)//不断向左逼近
    {
        if (bt[rt].val > val) ans = rt, rt = lk;
        else rt = rk;
    }
    return bt[ans].val;
}
int get_rnk(int rt, int val)//权值为val的排名
{
    if (!rt) return 0;
    if (val == bt[rt].val) return bt[lk].siz + 1;
    if (val < bt[rt].val) return get_rnk(lk, val);
    return bt[lk].siz + bt[rt].cnt + get_rnk(rk, val);
}
int get_val(int rt, int rnk)//排名为rnk的权值
{
    if (!rt) return inf;
    if (bt[lk].siz >= rnk) return get_val(lk, rnk);
    if (bt[lk].siz + bt[rt].cnt >= rnk) return bt[rt].val;
    return get_val(rk, rnk - bt[lk].siz - bt[rt].cnt);
}
```

## Treap

根据随机数据的平衡性，利用某一个评判标准（这里为大根堆），使二叉查找树有序化，使得其深度保持在$logn$。

```cpp
#define BST Treap
struct BST
{
    int son[2];//左右子节点
    int val, dat;//节点权值、大根堆判断标准
    int cnt, siz;//节点个数、子树大小
    #define lk bt[rt].son[0]
    #define rk bt[rt].son[1]
}; BST bt[Z];
int root, tot;
inline void pushup(int rt)//更新信息
{
    bt[rt].siz = bt[lk].siz + bt[rk].siz + bt[rt].cnt;
}
inline int est(int val)//建立新节点
{
    bt[++tot].val = val;
    bt[tot].dat = rand();
    bt[tot].cnt = bt[tot].siz = 1;
    return tot;
}
inline void build()//初始化
{
    root = est(-inf);
    bt[root].son[1] = est(inf);
    pushup(root);
}
inline void rotate(int &rt, int op)//旋转维护大根堆
{
    int to = bt[rt].son[op ^ 1];
    bt[rt].son[op ^ 1] = bt[to].son[op], bt[to].son[op] = rt, rt = to;
    pushup(lk), pushup(rk), pushup(rt);
}
void insert(int &rt, int val)//插入新节点
{
    if (!rt) { rt = est(val); return; }
    if (val == bt[rt].val) bt[rt].cnt++;
    else val < bt[rt].val ? insert(lk, val) : insert(rk, val);
    if (bt[rt].dat < bt[lk].dat) rotate(rt, 1);
    if (bt[rt].dat < bt[rk].dat) rotate(rt, 0);
    pushup(rt);
}
void remove(int &rt, int val)//删除节点
{
    if (!rt) return;
    if (val == bt[rt].val)
    {
        if (bt[rt].cnt > 1) bt[rt].cnt--;
        else if (lk || rk)//不是叶子节点，向下旋转使之成为叶子
        {
            if (!lk || bt[lk].dat < bt[rk].dat) rotate(rt, 0), remove(lk, val);
            else rotate(rt, 1), remove(rk, val);
        }
        else rt = 0;
    }
    else val < bt[rt].val ? remove(lk, val) : remove(rk, val);
    pushup(rt);
}
```

## Splay

每次对一个节点操作，都把它旋转到根，据说是有什么数据趋势平衡（玄学），精髓便在于$splay$函数。

```cpp
#define BST Splay
struct BST
{
    int son[2], dad;//子节点、父节点
    int val;//节点权值
    int cnt, siz;//节点个数、子树大小
    #define lk bt[rt].son[0]
    #define rk bt[rt].son[1]
    #define fa bt[rt].dad
    #define pa bt[bt[rt].dad].dad
}; BST bt[Z];
int root, tot;
inline void pushup(int rt)//更新信息
{
    bt[rt].siz = bt[lk].siz + bt[rk].siz + bt[rt].cnt;
}
inline int est(int val, int dad)//建立新节点
{
    bt[++tot].val = val;
    bt[tot].dad = dad;
    bt[tot].cnt = bt[tot].siz = 1;
    return tot;
}
inline void build()//初始化
{
    root = est(-inf, 0);
    bt[root].son[1] = est(inf, root);
    pushup(root);
}
void build(int &rt, int dad, int l, int r)//递归建树
{
    if (l > r) return 0;
    int mid = l + r >> 1; rt = est(a[mid], dad);
    build(lk, rt, l, mid - 1), build(rk, rt, mid + 1, r);
    pushup(rt);
}
inline bool get(int rt)//左孩子还是右孩子
{
    return bt[fa].son[1] == rt;
}
inline void un(int rt, int dad, int kid)//把rt接在dad的kid儿子上
{
    bt[dad].son[kid] = rt, fa = dad;
}
inline void rotate(int rt)//上旋
{
    int dad = fa, kid = get(rt);
    un(rt, pa, get(fa));//儿子先取代父亲
    un(bt[rt].son[kid ^ 1], dad, kid);//把儿子的孩子给父亲
    un(dad, rt, kid ^ 1);//把父亲变为rt的儿子
    pushup(dad), pushup(rt);
}
inline void splay(int rt, int to)//将rt旋转为to的儿子
{
    while (fa != to)
    {
        if (pa != to) rotate(get(rt) == get(fa) ? fa : rt);
        rotate(rt);
    }
    if (!to) root = rt;//更新树根
}
void insert(int &rt, int val, int dad)//插入节点
{
    if (!rt) { rt = est(val, dad), splay(rt, 0); return; }
    if (val == bt[rt].val) bt[rt].cnt++, bt[rt].siz++, splay(rt, 0);
    else val < bt[rt].val ? insert(lk, val, rt) : insert(rk, val, rt);
}
void remove(int rt, int val)//删除节点
{
    if (!rt) return;
    if (val == bt[rt].val)
    {
        if (bt[rt].cnt > 1) bt[rt].cnt--, bt[rt].siz--, splay(rt, 0);
        else if (lk) rotate(lk), remove(rt, val);
        else if (rk) rotate(rk), remove(rt, val);
        else bt[fa].son[get(rt)] = 0, splay(fa, 0);//成为了叶子节点
    }
    else val < bt[rt].val ? remove(lk, val) : remove(rk, val);
}
```

## FHQ-Treap

```cpp
#define BST FHQ-Treap
struct BST
{
    int son[2];//左右子节点
    int val, dat;//节点权值、大根堆判断标准
    int siz;//节点个数、子树大小
    #define lk bt[rt].son[0]
    #define rk bt[rt].son[1]
}; BST bt[Z];
int root, tot;
inline int est(int val)
{
    bt[++tot].val = val;
    bt[tot].dat = rand();
    bt[tot].siz = 1;
    return tot;
}
inline void pushup(int rt)
{
    bt[rt].siz = bt[lk].siz + bt[rk].siz + 1;
}
inline void build()
{
    root = est(-inf);
    bt[root].son[1] = est(inf);
    pushup(root);
}
void split(int rt, int val, int &x, int &y)
{
    if (!rt) { x = y = 0; return; }
    if (bt[rt].val <= val) x = rt, split(rk, val, rk, y);
    else y = rt, split(lk, val, x, lk);
    pushup(rt);
}
int merge(int x, int y)
{
    int rt = x + y;
    if (!x || !y) return rt;
    if (bt[x].dat > bt[y].dat) rt = x, rk = merge(rk, y);
    else rt = y, lk = merge(x, lk);
    pushup(rt); return rt;
}
inline void insert(int val)
{
    int x, y;
    split(root, val - 1, x, y);
    root = merge(merge(x, est(val)), y);
}
inline void remove(int val)
{
    int x, y, z;
    split(root, val, x, z);
    split(x, val - 1, x, y);
    //只删除一个
    if (y) y = merge(bt[y].son[0], bt[y].son[1]);
    root = merge(merge(x, y), z);
    //删除全部
    // root = merge(x, z);
}
```
