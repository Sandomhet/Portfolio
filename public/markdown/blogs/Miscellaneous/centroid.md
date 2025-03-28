---
title: "Centroid Decomposition"
description: "点分治"
time: "Mon Feb 1, 2024"
---

# Centroid Decomposition

```cpp
int siz[Z], kid[Z], root, size;//kid[rt]：该点的最大子树的大小
bool vs[Z];
void getroot(int rt, int fa)//求树的重心
{
    siz[rt] = 1, kid[rt] = 0;
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        if (vs[son] || son == fa) continue;
        getroot(son, rt);
        siz[rt] += siz[son];
        kid[rt] = max(kid[rt], siz[son]);
    }
    kid[rt] = max(kid[rt], size - siz[rt]);//除rt子树之外的其他剩余节点也可以转化为rt的子树
    if (kid[rt] < kid[root]) root = rt;//最大子树最小的点为树的重心
}
void solve(int rt)
{
    vs[rt] = 1;
    calc(rt);
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        if (vs[son]) continue;
        kid[root = 0] = size = siz[son];//子树大小
        getroot(son, 0);//寻找子树的重心
        solve(root);//递归处理子树
    }
}

int dis[Z], rec[M];
bool be[M];//桶记录
void getdis(int rt, int fa)//点到根的距离
{
    rec[++rec[0]] = dis[rt];//临时记录当前子树中的dis
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        if (vs[son] || son == fa) continue;
        dis[son] = dis[rt] + e[i].w;
        getdis(son, rt);
    }
}
void calc(int rt)//统计答案，因题而异
{
    memset(be, 0, sizeof(be));
    be[0] = 1;//rt--rt的dis
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        if (vs[son]) continue;
        dis[son] = e[i].w; rec[0] = 0;//初始化
        getdis(son, rt);
        for (re j = 1; j <= rec[0]; j++)//遍历子树dis
            for (re t = 1; t <= m; t++)
                if (k[t] >= rec[j])//该路径存在
                    ans[t] |= be[k[t] - rec[j]];
        for (re j = 1; j <= rec[0]; j++) be[rec[j]] = 1;//保存已有dis
    }
}
```
