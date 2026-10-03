---
title: "Centroid Decomposition"
description: "点分治"
time: "Mon Feb 1, 2024"
---

# Centroid Decomposition

Centroid: the vertex whose largest remaining component after removal is smallest; every component then has at most $n/2$ vertices. Process all paths through the centroid, delete it, and recurse into each component: depth $O(\log n)$, total $O(n \log n)$ times the cost of `calc`. Start with `kid[root = 0] = size = n; getroot(1, 0); solve(root);`.

```cpp
int siz[Z], kid[Z], root, size;//kid[rt]：该点的最大子树的大小
bool vs[Z];
void getroot(int rt, int fa) { //求树的重心
    siz[rt] = 1, kid[rt] = 0;
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son] || son == fa) continue;
        getroot(son, rt);
        siz[rt] += siz[son];
        kid[rt] = max(kid[rt], siz[son]);
    }
    kid[rt] = max(kid[rt], size - siz[rt]);//除rt子树之外的其他剩余节点也可以转化为rt的子树
    if (kid[rt] < kid[root]) root = rt;//最大子树最小的点为树的重心
}
void solve(int rt) {
    vs[rt] = 1;
    calc(rt);
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son]) continue;
        kid[root = 0] = size = siz[son];//子树大小
        getroot(son, 0);//寻找子树的重心
        solve(root);//递归处理子树
    }
}

int dis[Z], rec[M], tmp[Z];
bool be[M];//桶记录，M大于最大询问的k
void getdis(int rt, int fa) { //点到根的距离
    rec[++rec[0]] = dis[rt];//临时记录当前子树中的dis
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son] || son == fa) continue;
        dis[son] = dis[rt] + e[i].w;
        getdis(son, rt);
    }
}
void calc(int rt) { //统计答案，因题而异
    int cnt = 0;//本次放进桶里的dis，结束时只清空这些（每次memset整个桶会超时）
    be[0] = 1;//rt--rt的dis
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (vs[son]) continue;
        dis[son] = e[i].w; rec[0] = 0;//初始化
        getdis(son, rt);
        for (int j = 1; j <= rec[0]; j++)//遍历子树dis
            for (int t = 1; t <= m; t++)
                if (k[t] >= rec[j])//该路径存在
                    ans[t] |= be[k[t] - rec[j]];
        for (int j = 1; j <= rec[0]; j++)
            if (rec[j] < M) be[rec[j]] = 1, tmp[++cnt] = rec[j];//保存已有dis（超过M的dis用不到，也会越界）
    }
    for (int j = 1; j <= cnt; j++) be[tmp[j]] = 0;
}
```
