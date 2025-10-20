### Simple Version

```cpp
#define sandom signed
#define fre(x, y) freopen(#x ".in", "r", stdin), freopen(#y ".out", "w", stdout);
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std; typedef long long ll; typedef unsigned long long ull; typedef pair<int, int> paint;
const int Z = 1e5 + 10, inf = 2e9, mod = 998244353;

int n, m, k, ans;

sandom main() {
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    return 0;
}
/**/
```

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

### Discretization

```cpp
int ls[Z], len;
void discrete(int num[], int nm) {
    for (int i = 1; i <= nm; i++)    ls[i] = num[i];//转移临时数组
    sort(ls + 1, ls + 1 + nm);//排序
    len = unique(ls + 1, ls + 1 + nm) - ls - 1;//去重
    for (int i = 1; i <= nm; i++)//离散
        num[i] = lower_bound(ls + 1, ls + 1 + len, num[i]) - ls;
}
```

### Bipartite Graph

二分图的判定（染色法）

```cpp
int col[Z];
bool dfs(int rt, int color) {
    col[rt] = color;
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!col[son] && !dfs(son, 3 - color)) return false;//子节点集合中有冲突
        if (col[son] == color) return false;//一条边相连的两个节点属于同一个二分集合
    }
    return true;
}
inline bool judge() {
    for (int i = 1; i <= n; ++i)
        if (!col[i] && !dfs(i, 1)) return false;
    return true;
}
```

匈牙利算法（增广路）：求二分图的最大匹配，当且仅当图中不存在增广路。

```cpp
bool vs[Z];
int match[Z];
bool dfs(int rt) {
    for (int i = head[rt]; i; i = e[i].ne) {
        int son = e[i].v;
        if (!vs[son]) {
            vs[son] = 1;
            if (!match[son] || dfs(match[son])) {
                match[son] = rt;//目标点还未匹配 或 目标点能与原匹配点脱离
                return true;
            }
        }
    }
    return false;
}
sandom main() {
    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        memset(vs, 0, sizeof(vs));
        if (dfs(i)) ++ans;
    }
    return 0;
}
```

### Minimum Spanning Tree (MST)

$Prim$算法（与 dijkstra 神似）

```cpp
int prim(int s)
{
    int sum = 0;
    memset(minn, 63, sizeof(minn));
    memset(vs, 0, sizeof(vs));
    minn[s] = 0;
    for (int i = 1; i <= n; ++i)
    {
        int k = 0;
        for (int j = 1; j <= n; ++j)//寻找与此点距离最小的点
            if (!vs[j] && minn[k] > minn[j])
                k = j;
        sum += minn[k];
        vs[k] = 1;
        for (int j = 1; j <= n; ++j)//更新k点到其他点的最小距离
            if (!vs[j] && minn[j] > dis[k][j])
                minn[j] = dis[k][j];
    }
    return sum;
}
```

$Kruskal$算法（用到了并查集、集合思想；记得先排序）

```cpp
struct kusk
{
    int u, v, w;
    friend bool operator <(kusk A, kusk B) { return A.w < B.w; }
}; kusk r[Z];
int kruskal(int n, int m)//节点数+边数
{
    int tot = 0, sum = 0;
    sort(r + 1, r + 1 + m);
    for (int i = 1; i <= m; ++i)//枚举边
    {
        int u = r[i].u, v = r[i].v;
        if (find(u) != find(v))
        {
            un(u, v);
            sum += r[i].w;
            if ((++tot) == n - 1) return sum;
        }
    }
    return 0;
}
```

### Tarjan's Algorithm. 
$dfn[rt]$：节点 $rt$ 的时间戳；$low[rt]$：$rt$ 及其子树中能回溯到的最早节点。  
有向图中，
强连通分量：在此连通子图中，各点之间都能相互到达，任意两点之间都有边直接或间接相连。
意味着该集合可以缩小为一个点，不会影响全局，减小复杂度。

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top;
int be[Z], num;
vector <int> scc[Z];
bool vs[Z];
void tarjan(int rt)
{
    dfn[rt] = low[rt] = ++tim;//初始化：dfs序和low回溯数组
    dfs[++top] = rt; vs[rt] = 1;//标记已进栈
    for (int i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        if (!dfn[son])//还没有被访问过，直接访问
        {
            tarjan(son);
            low[rt] = min(low[rt], low[son]);
        }
        else if (vs[son]) low[rt] = min(low[rt], dfn[son]);//已经被访问过且还在栈里
    }
    if (dfn[rt] == low[rt])//构成了强连通分量，其之后节点不能返回到rt之前
    {
        int j; num++;
        do
        {
            j = dfs[top--]; vs[j] = 0;//标记出栈
            be[j] = num;//所属强连通分量
            scc[num].push_back(j);//该强连通分量集合
        } while (j != rt);
    }
}
void shrink()//缩点
{
    for (int i = 1; i <= cnt; i++)//枚举原有边，把各强连通分量建立联系
    {
        int u = be[e[i].u], v = be[e[i].v];
        if (u != v) ADD(u, v);
    }
}
```

无向图中，  
1.割点：若删掉某点后，原连通图分裂为多个子图，则称该点为割点。  
2.割边(桥)：删掉它之后，图必然会分裂为两个或两个以上的子图。  
3.双连通分量：任意两点之间能通过两条及以上没有任何重复边的路到达。  

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top, num;
vector <int> vdcc[Z];
bool cut[Z];
void tarjan(int rt, int fa)//割点
{
    dfn[rt] = low[rt] = ++tim;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] >= dfn[rt]) cut[rt] = 1;//son不与rt以上的点联通，则想要从之前的点到达son，必须要经过rt
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (!fa && !e[head[rt]].ne) cut[rt] = 0;//如果是起点，则至少要有两棵子树才是割点
}
void tarjan(int rt, int fa)//点双连通分量
{
    dfn[rt] = low[rt] = ++tim;
    dfs[++top] = rt;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] >= dfn[rt])
            {
                int j; cut[rt] = 1;//rt是割点
                vdcc[++num].push_back(rt);//rt不能直接出栈，可能属于多个点双
                do
                {
                    j = dfs[top--];
                    vdcc[num].push_back(j);
                } while (j != son);
            }
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (!fa && !e[head[rt]].ne) cut[rt] = 0;
    if (!fa && !head[rt]) vdcc[++num].push_back(rt);//孤立单点
}
```

```cpp
int dfn[Z], low[Z], tim;
int dfs[Z], top, num;
vector <int> edcc[Z];
bool cut[Z];
void tarjan(int rt, int fa)//割边
{
    dfn[rt] = low[rt] = ++tim;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;//同一条无向边
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] > dfn[rt]) cut[i] = cut[i ^ 1] = 1;//son不与rt及以上的点联通，则除了rt——son这条边之外，没有其他边可以联通rt、son
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
}
void tarjan(int rt, int fa)//边双连通分量
{
    dfn[rt] = low[rt] = ++tim;
    dfs[++top] = rt;
    for (int i = head[rt]; i; i = e[i].ne)
    {
        if (i == (fa ^ 1)) continue;
        int son = e[i].v;
        if (!dfn[son])
        {
            tarjan(son, i);
            low[rt] = min(low[rt], low[son]);
            if (low[son] > dfn[rt]) cut[i] = cut[i ^ 1] = 1;//割边
        }
        else low[rt] = min(low[rt], dfn[son]);
    }
    if (low[rt] == dfn[rt])
    {
        int j; num++;
        do
        {
            j = dfs[top--];
            edcc[num].push_back(j);
        } while (j != rt);
    }
}
```

### Union-find

```cpp
//初始化
inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i; }
//寻找父亲节点+路径压缩
inline int find(int x) { return x == fa[x] ? x : fa[x] = find(fa[x]); }
//合并集合
inline void un(int x, int y) {
    x = find(x), y = find(y);
    if (x == y) return;
    fa[y] = x, sz[x] += sz[y];
}
```

### Shortest Path Problem

链式前向星（模拟链表）

```cpp
struct edge { int v, w, ne; } e[Z << 1];
int head[Z], cnt = 1;
inline void add(int x, int y, int z)
{
    e[++cnt] = edge{y, head[x]};
    head[x] = cnt;
}
```

$Floyed$算法--多源最短路
时间复杂度：$O(n^3)$

```cpp
void floyed_base()
{
    memset(dis, 63, sizeof(dis));
    //最短路
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    //连通性
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] |= (dis[i][k] & dis[k][j]);
}
```

```cpp
void floyed_ring()//最小环
{
    memset(dis, 63, sizeof(dis));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            g[i][j] = dis[i][j];//保存原数据
    for (int k = 1; k <= n; k++)
    {
        for (int i = 1; i < k; i++)
            for (int j = i + 1; j < k; j++)
                ans = min(ans, dis[i][j] + g[i][k] + g[k][j]);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    }
}
```

$dijkstra$算法--单源最短路
时间复杂度：优先队列优化后$O(mlogn)$

```cpp
typedef pair<int, int> paint;
priority_queue <paint, vector<paint>, greater<paint> > q;
void dijk(int st)
{
    memset(dis, 63, sizeof(dis));
    memset(vs, 0, sizeof(vs));
    dis[st] = 0;
    q.push(make_pair(dis[st], st));
    while (!q.empty())
    {
        int u = q.top().second; q.pop();
        if (vs[u]) continue; vs[u] = 1;
        for (int i = head[u]; i; i = e[i].ne)
        {
            int v = e[i].v;
            if (dis[v] > dis[u] + e[i].w)
            {
                dis[v] = dis[u] + e[i].w;
                q.push(make_pair(dis[v], v));
            }
        }
    }
}
```

$spfa$算法--单源最短路
时间复杂度：$O(玄学--极限n*m)$

```cpp
void spfa(int s)
{
    memset(dis, 63, sizeof(dis));
    memset(vs, 0, sizeof(vs));
    queue <int> q;
    q.push(s), vs[s] = 1, dis[s] = 0;
    while (!q.empty())
    {
        int u = q.front(); q.pop(), vs[u] = 0;
        for (int i = head[u]; i; i = e[i].ne)
        {
            int v = e[i].v;
            if (dis[v] > dis[u] + e[i].w)
            {
                dis[v] = dis[u] + e[i].w;
                if (!vs[v]) q.push(v), vs[v] = 1;
            }
        }
    }
}
```

```cpp
bool spfa(int s)//判断是否存在环
{
    memset(dis, 63, sizeof(dis));
    memset(vs, 0, sizeof(vs));
    memset(tim, 0, sizeof(tim));
    queue <int> q;
    q.push(s), vs[s] = 1, dis[s] = 0, tim[s] = 1;
    while (!q.empty())
    {
        int u = q.front(); q.pop(), vs[u] = 0;
        for (int i = head[u]; i; i = e[i].ne)
        {
            int v = e[i].v;
            if (dis[v] > dis[u] + e[i].w)
            {
                dis[v] = dis[u] + e[i].w;
                if (!vs[v])
                {
                    q.push(v), vs[v] = 1;
                    if ((++tim[v]) > n - 1) return true;
                }
            }
        }
    }
    return false;
}
```

### Binary Indexed Tree (BIT)

树状数组（基础操作）

```cpp
class BIT {
public:
    vector<int> c;
    inline int lowbit(int x) { return x & -x; } //基本二分
    inline void update(int x, int y) //修改原数组下标为x的数据
    {
        int sub = x;
        for (int i = x; i <= n; i += lowbit(i))
        {
            c[i] += y;
        }
    }
    inline int getsum(int x) //在原数组下标为x之前的所有数据的和
    {
        int res = 0, sub = x;
        for (int i = x; i; i -= lowbit(i))
        {
            res += c[i];
        }
        return res;
    }
};
```

求逆序对

```cpp
//求逆序对（a离散化后为b）
inline void update(int x, int y)//修改原数组下标为x的数据
{
    for (int i = x; i <= n; i += lowbit(i)) c[i]++;
}
inline int getsum(int x)//在原数组下标为x之前的所有数据的和
{
    int res = 0;
    for (int i = x; i; i -= lowbit(i)) res += c[i];
    return res;
}
signed main()
{
    for (int i = 1; i <= n; ++i)
    {
        update(b[i] + 1);
        res += i - getsum(b[i] + 1);
    }
    return 0;
}
```

二维树状数组（进阶）

```cpp
inline int lowbit(int x) { return x & -x; }
inline void update(int x, int y, int z)//修改原数组下标为[x][y]的数据
{
    for (int i = x; i <= n; i += lowbit(i))
        for (int j = y; j <= n; j += lowbit(j))
        {
            c[i][j] += z;
            /*sum1[i][j] += z;
            sum2[i][j] += z * x;
            sum3[i][j] += z * y;
            sum4[i][j] += z * x * y;*/
        }
}
inline int getsum(int x, int y)//在原数组下标为[x][y]之前的所有数据的和
{
    int res = 0;
    for (int i = x; i > 0; i -= lowbit(i))
        for (int j = y; j > 0; j -= lowbit(j))
        {
            res += c[i][j];
            //res += sum1[i][j] * (x + 1) * (y + 1) + sum4[i][j] - sum2[i][j] * (y + 1) - sum3[i][j] * (x + 1);
        }
    return res;
}
```

### Segment Tree

基础一维**线段树**，维护区间信息~~（模板：山海经）~~

```cpp
class SegmentTree {
public:
    struct TreeNode {
        int l, r;
        int sum, max;
        int lz;
        TreeNode () { sum = 0, max = -1e9; }
        #define lk (rt << 1)
        #define rk (rt << 1 | 1)
        #define mid (tr[rt].l + tr[rt].r >> 1)
    }; 
    TreeNode tr[Z << 2];
    // default root is index 1
    void change(int rt, int val) //修改线段树
    {
        tr[rt].lz += val;
        tr[rt].sum += (tr[rt].r - tr[rt].l + 1) * val;
        tr[rt].max += val;
    }
    void pushup(TreeNode &rt, TreeNode lc, TreeNode rc) //向上更新信息
    {
        rt.sum = lc.sum + rc.sum;
        rt.max = max(lc.max, rc.max);
    }
    void pushdown(int rt) //向下更新延迟,下放标记
    {
        if (tr[rt].lz) {
            change(lk, tr[rt].lz);
            change(rk, tr[rt].lz);
            tr[rt].lz = 0;
        }
    }
    void build(int rt, int l, int r) //建立线段树
    {
        tr[rt].l = l, tr[rt].r = r;
        if (l == r) {
            tr[rt].sum = tr[rt].max = w[l];
            return;
        }
        build(lk, l, mid);
        build(rk, mid + 1, r);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    void update(int rt, int l, int r, int val) //区间更新
    {
        if (l <= tr[rt].l && tr[rt].r <= r) { change(rt, val); return; }//真子集
        pushdown(rt);
        if (l <= mid) update(lk, l, r, val);
        if (r > mid)  update(rk, l, r, val);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    TreeNode query(int rt, int l, int r) //区间查询
    {
        if (l <= tr[rt].l && tr[rt].r <= r) return tr[rt];
        pushdown(rt);
        if (r <= mid) return query(lk, l, r);
        if (l > mid) return query(rk, l, r);
        // ST res;
        return pushup(query(lk, l, r), query(rk, l, r));
        // return res;
        // if (l <= mid) pushup(res, res, query(lk, l, r));
        // if (r > mid) pushup(res, res, query(rk, l, r));
    }

    void update(int rt, int pos, int val)//单点更新
    {
        if (tr[rt].l == tr[rt].r) { change(rt, val); return; }
        if (pos <= mid) update(lk, pos, val);
        else update(rk, pos, val);
        pushup(tr[rt], tr[lk], tr[rk]);
    }
    TreeNode query(int rt, int pos) //单点查询
    {
        if (tr[rt].l == tr[rt].r) return tr[rt];
        pushdown(rt);
        if (pos <= mid) return query(lk, pos);
        else return query(rk, pos);
    }
}
```

### Heavy-light Decomposition

重链剖分

```cpp
int dep[Z], siz[Z], dad[Z], kid[Z];//kid[rt]：rt的重儿子编号
int tim, dfn[Z], rnk[Z], top[Z];//rnk[rt]：dfs序为rt的节点编号; top[rt]：rt所在重链的顶部节点
void search(int rt, int fa)//寻找重边和重儿子
{
    dad[rt] = fa;
    dep[rt] = dep[fa] + 1, siz[rt] = 1;
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].to;
        if (son == fa) continue;
        search(son, rt);
        siz[rt] += siz[son];
        if (siz[son] > siz[kid[rt]]) kid[rt] = son;//更新重儿子
    }
}
void connect(int rt, int pa)//连接重边构成重链
{
    dfn[rt] = ++tim, rnk[tim] = rt;
    top[rt] = pa;
    if (kid[rt]) connect(kid[rt], pa);//优先递归重儿子
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].to;
        if (son == kid[rt] || son == dad[rt]) continue;
        connect(son, son);//新建立一条重链
    }
}
```

```cpp
void modify(int x, int y, int val)//对从x到y的简单路径上的点权值加val
{
    while (top[x] != top[y])//没在一条重链上
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        update(1, dfn[top[x]], dfn[x], val);
        x = dad[top[x]];//向上翻
    }
    if (dep[x] > dep[y]) swap(x, y);
    update(1, dfn[x], dfn[y], val);
}
int ask_sum(int x, int y)//查询从x到y的简单路径上的点权值之和
{
    int ans = 0;
    while (top[x] != top[y])//没在一条重链上
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        ans += query_sum(1, dfn[top[x]], dfn[x]);
        x = dad[top[x]];//向上翻
    }
    if (dep[x] > dep[y]) swap(x, y);
    ans += query_sum(1, dfn[x], dfn[y]);
    return ans;
}
int ask_max(int x, int y)
{
    int ans = -1e8;
    while (top[x] != top[y])
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        ans = max(ans, query_max(1, dfn[top[x]], dfn[x]));
        x = dad[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    ans = max(ans, query_max(1, dfn[x], dfn[y]));
    return ans;
}
int LCA(int x, int y)
{
    while (top[x] != top[y])
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        x = dad[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    return x;
}
int nxt_son(int x, int y)//求x -> y路径上x的第一个儿子
{
    if (dep[x] > dep[y]) swap(x, y);
    while (top[x] != top[y])
    {
        if (dad[top[x]] == y) return top[x];//不在一条重链上
        x = dad[top[x]];
    }
    return kid[y];//跳到了同一条重链上
}
sandom main()
{
    search(1, 0);
    connect(1, 1);
    build(1, 1, n);
    work();
    return 0;
}
```

### Square Root Decomposition and Mo's Algorithm

基础区间加法分块

```cpp
int L[Z], R[Z], bel[Z];
int a[Z], sum[Z], add[Z];
void modify(int l, int r, int val)
{
    int ll = bel[l], rr = bel[r];
    if (ll == rr)//l和r在同一块
    {
        for (re i = l; i <= r; i++) a[i] += val;
        sum[ll] += (r - l + 1) * val;
    }
    else
    {
        for (re i = ll + 1; i < rr; i++) add[i] += val;//区块标记
        for (re i = l; i <= R[ll]; i++) a[i] += val;//两侧零散区间
        sum[ll] += (R[ll] - l + 1) * val;
        for (re i = L[rr]; i <= r; i++) a[i] += val;
        sum[rr] += (r - L[rr] + 1) * val;
    }
}
int ask(int l, int r)
{
    int res = 0;
    int ll = bel[l], rr = bel[r];
    if (ll == rr)//l和r在同一块
    {
        for (re i = l; i <= r; i++) res += a[i];
        res += (r - l + 1) * add[ll];
    }
    else
    {
        for (re i = ll + 1; i < rr; i++)//原区块和+标记
            res += sum[i] + add[i] * (R[i] - L[i] + 1);
        for (re i = l; i <= R[ll]; i++) res += a[i];//两侧零散区间
        res += (R[ll] - l + 1) * add[ll];
        for (re i = L[rr]; i <= r; i++) res += a[i];
        res += (r - L[rr] + 1) * add[rr];
    }
    return res;
}
inline void init()
{
    t = sqrt(n);//划分区块
    for (re i = 1; i <= t; i++)//预处理每一块的左右端点
    {
        L[i] = R[i - 1] + 1;
        R[i] = i * (n / t);
    }
    if (R[t] < n) ++t, L[t] = R[t - 1] + 1, R[t] = n;
    for (re i = 1; i <= t; i++)
        for (re j = L[i]; j <= R[i]; j++)
        {
            bel[j] = i;//节点所属区块
            sum[i] += a[j];//区块和
        }
}
signed main()
{
    n = read(); m = read();
    for (re i = 1; i <= n; i++) a[i] = read();
    init();
    while (m--)
    {
        int op, l, r, v;
        op = read(), l = read(), r = read();
        if (op) v = read(), modify(l, r, v);
        else ans = ask(l, r);
    }
}
```

基础莫队（奇偶性排序优化）

```cpp
int block[Z], ans[Z];
int a[Z], c[Z];
struct query
{
    int l, r, id;
    friend bool operator <(const query& A, const query& B)//奇偶性排序
    {
        if (block[A.l] != block[B.l]) return A.l < B.l;//优先按左端点块
        if (block[A.l] & 1) return A.r < B.r;//奇数块升序
        return A.r > B.r;//偶数块降序
    }
}; query ser[Z];

void add(int x, LL& res)
{
    res += (2 * c[x] + 1);
    c[x]++;
}
void del(int x, LL& res)
{
    res -= (2 * c[x] - 1);
    c[x]--;
}
sandom main()
{
    n = read(); m = read(); t = sqrt(n);
    for (re i = 1; i <= n; i++)//确定每个端点所在块
        block[i] = (i - 1) / t + 1;
    for (re i = 1; i <= n; i++) a[i] = read();
    for (re i = 1; i <= m; i++)//离线查询
    {
        ser[i].l = read();
        ser[i].r = read();
        ser[i].id = i;
    }
    sort(ser + 1, ser + 1 + m);
    int nl = 1, nr = 0, res = 0;
    for (re i = 1; i <= m; i++)
    {
        query q = ser[i];
        while (q.l < nl) add(a[--nl], res);//区间扩大
        while (q.r > nr) add(a[++nr], res);//先移动，再添加
        while (q.l > nl) del(a[nl++], res);//区间缩小
        while (q.r < nr) del(a[nr--], res);//先删除，再移动
        ans[q.id] = res;
    }
    for (re i = 1; i <= m; i++) write(ans[i]);
    return 0;
}
```

### Linear Sieve Algorithms

线性筛

```cpp
bool prime[Z];
int ip[Z], low[Z];
void Linear(int n)
{
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, low[i] = i;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1, low[k] = ip[j];
            if (i % ip[j] == 0) break;
        }
    }
}
```


1. 欧拉函数

```cpp
int phi[Z];
void Euler(int n)//欧拉函数
{
    phi[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, phi[i] = i - 1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { phi[k] = phi[i] * ip[j]; break; }
            else phi[k] = phi[i] * (ip[j] - 1);
        }
    }
}
```

2. 莫比乌斯函数

```cpp
int miu[Z];
void Mobius(int n)//莫比乌斯函数
{
    miu[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, miu[i] = -1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { miu[k] = 0; break; }
            else miu[k] = -miu[i];
        }
    }
}
```

3. 约数个数

```cpp
int d[Z];
void Linear(int n)//约数个数
{
    d[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, d[i] = 2;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { d[k] = 2 * d[i] - d[i / ip[j]]; break; }
            else d[k] = 2 * d[i];
        }
    }
}
```

4. 正约数的和

```cpp
int s[Z];
void Linear(int n)//约数和
{
    s[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!prime[i]) ip[++ip[0]] = i, s[i] = i + 1;
        for (int j = 1; j <= ip[0]; ++j)
        {
            int k = i * ip[j];
            if (k > n) break;
            prime[k] = 1;
            if (i % ip[j] == 0) { s[k] = s[i] + (s[i] - s[i / ip[j]]) * ip[j]; break; }
            else s[k] = s[i] * (ip[j] + 1);
        }
    }
}
```

### Number Theory

```cpp
inline int gcd(int a, int b)
{
    int r = a % b;
    while (r) a = b, b = r, r = a % b;
    return b;
}
inline int gcd(int a, int b) { return b ? gcd(b, a % b) : a; }
```

质因数分解（试除法）

```cpp
void divide(int x)
{
    int m = 0, n = sqrt(x);
    for (int i = 2; i <= n && x > 1; ++i)
    {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) p[++m] = i, c[m] = cnt;
    }
    if (x > 1) p[++m] = x, c[m] = 1;
    for (int i = 1; i <= m; ++i)
        cout << p[i] ^ c[i] <<endl;
}
```


1. 费马小定理求逆元（p 为素数）

```cpp
inline int qpow(int a, int b, int p)
{
    int res = 1;
    while (b)
    {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
inline int inv(int a, int p) { return qpow(a, p - 2, p); }
```

2. 扩展欧几里得求逆元（a 与 p 互质）
   a*x≡1(mod p) --> a*x-p\*y=1

```cpp
inline int exgcd(int a, int b, int& x, int& y)
{
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
inline int inv(int a, int p)
{
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
```

3. 线性求逆元（p 为素数）

```cpp
void inverse(int p)
{
    ny[1] = 1;
    for (int i = 2; i < p; ++i)
        ny[i] = (p - p / i) * ny[p % i] % p;
}
```

### Congruence Equation

线性（一次）同余方程

```cpp
inline int exgcd(int a, int b, int& x, int& y)//a*x + b*y = 1;
{
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, x, y);
    int z = x;
    x = y, y = z - a / b * y;
    return gcd;
}
inline int exgcd(int a, int b, int& x, int& y)//a*x + b*y = 1;
{
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, y, x);//直接交换传参
    y -= a / b * x;
    return gcd;
}
inline int solve(int a, int b, int c)//a*x + b*y = c;
{
    int x, y, g = exgcd(a, b, x, y);
    if (c % g) return -1;//无解
    a /= g, b /= g, c /= g;
    //只要求x为最小非负整数解，而y可以为负数
    x = (x * c % b + b) % b;
    return x;
    //x和y都要求为非负整数解
    while (x > 0 || y < 0) x -= b, y += a;
    x = -x, y = y;
}
```

一元线性同余方程组

```cpp
int CRT(int n, int a[], int m[])//中国剩余定理
{
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i)
    {
        int c = M / m[i], t, y;//除m[i]以外所有模数的倍数
        exgcd(c, m[i], t, y);//c*t≡1(mod m[i])
        ans += a[i] * c * t % M;//∑ a[i]*c[i]*t[i]
        ans = (ans % M + M) % M;
    }
    return ans;
}
```

```cpp
int calc(int a, int b, int c)//ax+by=c
{
    int x, y, d = exgcd(a, b, x, y);
    if (c % d) return -1;
    a /= d, b /= d, c /= d;
    return (x * c % b + b) % b;
}
int EXCRT(int n, int a[], int m[])//扩展中国剩余定理
{
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i)
    {
        int x = calc(M, m[i], a[i] - ans);//M*x≡a[i]-ans(mod m[i])
        if (x == -1) return -1;//判断无解
        ans += x * M;//∑ ans+x[i]*M
        M = lcm(M, m[i]);//更新前i个数的lcm
        ans = (ans % M + M) % M;
    }
    return ans;
}
```

### Gaussian Elimination

```cpp
bool cmp(int i, int k, int now)
{
    if (fabs(fabs(a[i][k]) - fabs(a[now][k])) > eps)//不相等，将大的放上面
        return fabs(a[i][k]) > fabs(a[now][k]);
    for (int j = k + 1; j <= n; ++j)//相等后，找到第一个不等的，将小的放上面
        if (fabs(fabs(a[i][j]) - fabs(a[now][j])) > eps)
            return fabs(a[i][j]) < fabs(a[now][j]);
    return false;
}
void gauss()
{
    for (int k = 1; k <= n; ++k)//枚举对角线
    {
        int now = k;
        for (int i = k + 1; i <= n; ++i) if (cmp(i, k, now)) now = i;
        swap(a[now], a[k]);//使得矩阵方程线性处理
        if (fabs(a[k][k]) < eps) continue;//系数为0
        for (int j = m; j >= k; --j) a[k][j] /= a[k][k];//把当前x系数变为1
        for (int i = 1; i <= n; ++i)
            if (i != k)//把同一列上其他x的系数变为0
                for (int j = m; j >= k; --j) a[i][j] -= a[i][k] * a[k][j];
    }
}
int judge()
{
    for (int i = 1; i <= n; ++i)
    {
        int tot = 0;
        for (int j = 1; j <= n; ++j)
            if (fabs(a[i][j]) < eps) tot++;
        if (tot == n)
        {
            if (fabs(a[i][m]) < eps) return 0;//无穷解
            else return -1;//无解
        }
    }
    for (int i = 1; i <= n; ++i)//唯一解
        printf("x%d = %.2lf\n", i, a[i][m]);
    return 1;
}
```

### Matrix Multiplication

```cpp
struct matrix
{
    int a[10][10];
    matrix () { memset(a, 0, sizeof(a)); }
    inline friend matrix operator *(matrix A, matrix B)
    {
        matrix C;
        for (int i = 1; i <= n; ++i)
            for (int k = 1; k <= n; ++k)
                for (int j = 1; j <= n; ++j)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
        return C;
    }
}; matrix ans, base;
void qbow(int b)
{
    while (b)
    {
        if (b & 1) ans = ans * base;
        base = base * base;
        b >>= 1;
    }
}
```

### Combinatorics

根据定义，阶乘直接求得

```cpp
int fac[Z], ny[Z];
void init(int n, int p)
{
    fac[0] = 1;
    for (int i = 1; i <= n; ++i)
        fac[i] = fac[i - 1] * i % p;
    ny[n] = qpow(fac[n], p - 2, p);
    for (int i = n - 1; i >= 1; --i)
        ny[i] = ny[i + 1] * (i + 1) % p;
}
inline int C(int n, int m, int p)//组合数
{
    return m > n ? 0 : fac[n] * ny[m] % p * ny[n - m] % p;
}
inline int A(int n, int m, int p)//排列数
{
    return m > n ? 0 : fac[n] * ny[n - m] % p;
}
```

卢卡斯定理

$$ C_n^m = C_{n \mod p}^{m \mod p} * C_{\lfloor n/p \rfloor}^{\lfloor m/p \rfloor} \pmod p $$

```cpp
int lucas(int n, int m, int p)
{
    if (m == 0) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

### Hash

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

### Knuth-Morris-Pratt (KMP) Algorithm

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

### Trie Tree

```cpp
struct tree
{
    int kid[10];
}; tree tr[Z];
int tot;
bool end[Z];
void insert(char s[], int len)//插入一个字符串
{
    int rt = 1;
    for (re i = 1; i <= len; i++)
    {
        int ch = s[i] - '0';
        if (!tr[rt].kid[ch]) tr[rt].kid[ch] = ++tot;
        rt = tr[rt].kid[ch];
    }
    end[rt] = 1;
}
bool search(char s[], int len)//检索字符串是否存在
{
    int rt = 1;
    for (re i = 1; i <= len; i++)
    {
        int ch = s[i] - '0';
        rt = tr[rt].kid[ch];
        if (!rt) return false;
    }
    return end[rt];
}
```

### Binary Lifting and Lowest Common Ancestor (LCA)

建立 dfs 序

```cpp
int in[Z], out[Z], tim, path[Z];
bool vs[Z];
void dfs(int rt)
{
    if (vs[rt])    return;
    vs[rt] = 1;
    in[rt] = ++tim;
    path[tim] = a[rt];
    for (re i = head[rt]; i; i = r[i].ne)
        dfs(e[i].v);
    out[rt] = tim;//dfs序
    out[rt] = ++tim;//欧拉序
}
```

预处理 ST 表，区间 RMQ 问题：dp[i][j]：以 i 为起点，长度为 2^j 的区间

```cpp
int dp[Z][30];
void ST(int n)
{
    for (re i = 1; i <= n; i++)    dp[i][0] = dat[i];
    int t = log2(n);
    for (re j = 1; j <= t; j++)
        for (re i = 1; i + (1 << j) - 1 <= n; i++)
            dp[i][j] = max(dp[i][j - 1], dp[i + (1 << (j - 1))][j - 1]);
}
int RMQ(int l, int r)
{
    int t = log2(r - l + 1);
    return max(dp[l][t], dp[r - (1 << t) + 1][t]);
}
```

倍增解决 LCA

```cpp
void dfs_st(int rt, int dad)
{
    fa[rt][0] = dad;
    dep[rt] = dep[dad] + 1;
    int t = log2(dep[rt]);
    for (re j = 1; j <= t; j++)
        fa[rt][j] = fa[fa[rt][j - 1]][j - 1];
    for (re i = head[rt]; i; i = e[i].ne)
        if (e[i].v != dad)  dfs_st(e[i].v, rt);
}
int LCA(int a, int b)
{
    if (dep[a] < dep[b]) swap(a, b);
    for (re i = 20; i >= 0; i--)
        if (dep[fa[a][i]] >= dep[b])
            a = fa[a][i];
    if (a == b) return a;
    for (re i = 20; i >= 0; i--)
        if (fa[a][i] != fa[b][i])
        {
            a = fa[a][i];
            b = fa[b][i];
        }
    return fa[a][0];
}
```

tarjan 解决 LCA

```cpp
int dis[Z], vs[Z];
void LCA_tarjan(int rt)
{
    vs[rt] = 1;
    dad[rt] = rt;
    for (re i = head[rt]; i ; i = e[i].ne)
    {
        int j = e[i].v;
        if (vs[j]) continue;
        dis[j] = dis[rt] + e[i].w;
        LCA_tarjan(j);
        unionn(j, rt);//并查集
    }
    for (re i = 0; i < v[rt].size(); i = -~i)
    {
        int j = v[rt][i], id = vid[rt][i];
        if (vs[j] == 2)
        {
            int lca = find(j);
            ans[id] = dis[rt] + dis[j] - (dis[lca] << 1);
        }
    }
    vs[rt] = 2;
}
```

RMQ 解决 LCA

```cpp
int fir[Z], nod[Z], dep[Z], tim, dis[Z];
bool v[Z];
void dfs(int rt, int depth)
{
    //第一次dfs到的时间戳, 记录dfs序, 结点深度.
    fir[rt] = ++tim; v[rt] = 1; nod[tim] = rt; dep[tim] = depth;
    for (re i = head[rt]; i ; i = e[i].ne)
    {
        int j = e[i].v;
        if (!v[j])
        {
            dis[j] = dis[rt] + e[i].w;
            dfs(j, depth + 1);
            nod[++tim] = rt; dep[tim] = depth;
        }
    }
}
int dp[Z][30];
void ST(int n)
{
    for (re i = 1; i <= n; i++)    dp[i][0] = i;
    int t = log2(n);
    for (re j = 1; j <= t; j++)
        for (re i = 1; i + (1 << j) - 1 <= n; i++)
        {
            int a = dp[i][j - 1], b = dp[i + (1 << (j - 1))][j - 1];
            dp[i][j] = dep[a] < dep[b] ? a : b;
        }
}
int RMQ(int l, int r)
{
    int t = log2(r - l + 1);
    int a = dp[l][t], b = dp[r - (1 << t) + 1][t];
    return dep[a] < dep[b] ? a : b;
}
int LCA(int u, int v)
{
    int a = fir[u], b = fir[v];
    if (a > b) swap(a, b);
    return nod[RMQ(a, b)];
}
```

### Miscellaneous

```cpp
int middle(int l, int r)//二分答案
{
    int ans = 0;
    while (l <= r)
    {
        int mid = (l + r) >> 1;
        if (check(mid)) l = mid + 1, ans = mid;
        else r = mid - 1;
    }
    return ans;
}
```

康托展开可以用来求一个1~n的任意排列的排名（按照字典序）。
$rnk=1+\sum\limits_{i=1}^{n}A[i]*(n-i)!$---A[i]表示$\sum\limits_{j=i}^{n}[a[j] < a[i]]$

```cpp
int cantor(int a[], int n)
{
    fac[0] = 1;
    for (re i = 1; i <= n; i++)
    {
        fac[i] = fac[i - 1] * i % mod;//预处理阶乘
        update(a[i], 1);//先把所有的数插进去
    }
    int ans = 1;//自己也算一个
    for (re i = 1; i <= n; i++)
    {
        update(a[i], -1);//树状数组中剩下的都是i的后缀
        ans = (ans + ask(a[i] - 1) * fac[n - i] % mod) % mod;
    }
    return ans;
}
```

快速幂+取余运算

```cpp
int quick_pow(int a, int b, int c)//快速幂+取余运算
{
    //a底数，b指数，c取模数
    int ans = 1;
    a = a % c;//防止a过大
    while (b)//二分未到终止
    {
        if (b & 1)    ans = ans * a % c;//奇数补一项，"b&1"=="b%2";
        b >>= 1;//等价于b/=2;
        a = a * a % c;
    }
    return ans;
}
```

```cpp
int d[Z];//d[i]：以i为对称中心的最大回文串的半径为d[i]
void manacher(char t[], int len)
{
    n = len * 2 + 1;//新串
    s[0] = '{', s[n + 1] = '}';//防止字符串之间冲突
    for (re i = 1; i <= n; i++)
        s[i << 1] = t[i], s[(i << 1) - 1] = '|';//在字符中间加隔板
    s[n] = '|';
    int mid = 0, r = 0;
    for (re i = 1; i <= n; i++)
    {
        if (i <= r) d[i] = min(d[mid * 2 - i], r - i + 1);//取对称点
        else d[i] = 1;
        while (s[i - d[i]] == s[i + d[i]]) d[i]++;//扩展半径
        if (i + d[i] > r) r = i + d[i] - 1, mid = i;//扩展最右侧右端点
    }
}
```




## Stress Testing Harness

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