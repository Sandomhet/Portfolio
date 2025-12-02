---
title: "Binary Tree"
description: "binary tree, binary search tree, and heap."
time: "Mon Feb 1, 2024"
---

# Binary Tree

二叉树遍历

```cpp
void front(int rt)//先序遍历
{
    if (rt)
    {
        tree g = e[rt];
        write(g.data);
        front(g.lk);
        front(g.rk);
    }
}
void middle(int rt)//中序遍历
{
    if (rt)
    {
        tree g = e[rt];
        middle(g.lk);
        write(g.data);
        middle(g.rk);
    }
}
void back(int rt)//后序遍历
{
    if (rt)
    {
        tree g = e[rt];
        back(g.lk);
        back(g.rk);
        write(g.data);
    }
}
```

已知两遍历求另一遍历

```cpp
void back_ans(string s1, string s2)//已知先序和中序求后序
{
    int len = s1.length();//长度
    char k = s1[0];//根节点
    if (len == 1) { write(k); return; }//结束

    int zb = s2.find(k, 0);//根节点的位置
    string s3, s4;
    if (zb > 0)//左子树遍历
    {
        s3 = s1.substr(1, zb);
        s4 = s2.substr(0, zb);
        back_ans(s3, s4);
    }
    if (zb < len - 1)//右子树遍历
    {
        s3 = s1.substr(zb + 1);
        s4 = s2.substr(zb + 1);
        back_ans(s3, s4);
    }
    write(k);//输出后序
}
void front_ans(string s1, string s2)//已知后序和中序求前序
{
    int len = s1.length();//长度
    char k = s1[len - 1];//根节点
    if (len == 1) { write(k); return; }//结束
    write(k);//输出先序

    int zb = s2.find(k, 0);//根节点的位置
    string s3, s4;
    if (zb > 0)//左子树遍历
    {
        s3 = s1.substr(0, zb);
        s4 = s2.substr(0, zb);
        front_ans(s3, s4);
    }
    if (zb < len - 1)//右子树遍历
    {
        s3 = s1.substr(zb, len - zb - 1);
        s4 = s2.substr(zb + 1);
        front_ans(s3, s4);
    }
}
```

## Binary Search Tree (BST)

```cpp
void set_tree(int a, tree& g)//建立二叉排序树
{
    //要先初始化根节点：e[1].data=a;
    if (a < g.data)//左子树
    {
        if (g.lk == 0) { g.lk = ++tot; e[tot].data = a; }
        else set_tree(a, e[g.lk]);
    }
    else//右子树
    {
        if (g.rk == 0) { g.rk = ++tot; e[tot].data = a; }
        else set_tree(a, e[g.rk]);
    }
}//中序遍历为有序数列
```

手打堆（下辈子再写第二次吧）

```cpp
int b[W], s[W];//b大根堆,s小根堆,手打优先队列
int tb = 0, ts = 0;//记录指针
void bput(int a)
{
    int kid, dad;
    kid = ++tb;   b[kid] = a;
    while (kid > 1)
    {
        dad = kid >> 1;
        if (b[kid] > b[dad])
        {
            swap(b[kid], b[dad]);
            kid = dad;
        }
        else break;
    }
}
void sput(int a)
{
    int kid, dad;
    kid = ++ts;   s[kid] = a;
    while (kid > 1)
    {
        dad = kid >> 1;
        if (s[kid] < s[dad])
        {
            swap(s[kid], s[dad]);
            kid = dad;
        }
        else break;
    }
}
int bget()
{
    int kid, dad;
    int x = b[1];
    b[1] = b[tb--];
    dad = 1;  kid = dad << 1;
    while (kid <= tb)
    {
        if (kid < tb && b[kid] < b[kid+1]) kid++;
        if (b[kid] > b[dad])
        {
            swap(b[kid], b[dad]);
            dad = kid;
            kid = dad << 1;
        }
        else break;
    }
    return x;
}
int sget()
{
    int kid, dad;
    int x = s[1];
    s[1] = s[ts--];
    dad = 1;  kid = dad << 1;
    while (kid <= ts)
    {
        if (kid < ts && s[kid] > s[kid+1])  kid++;
        if (s[kid] < s[dad])
        {
            swap(s[kid], s[dad]);
            dad = kid;
            kid = dad << 1;
        }
        else break;
    }
    return x;
}
```