### Simple Version

```cpp
#define sandom signed
#define fre(x, y) freopen(#x ".in", "r", stdin), freopen(#y ".out", "w", stdout);
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std; typedef long long ll; typedef unsigned long long ull; typedef pair<int, int> pii;
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

### CC and SCC

Connectivity

```cpp
vector<vector<int>> e;
vector<vector<int>> ccs;
vector<int> ccid;
void dfs(int u, int cid) {
    ccid[u] = cid;
    ccs[cid].push_back(u); // current CC
    for (int v : e[u])
        if (!ccid[v]) dfs(v, cid);
}
void findCC(int n) {
    ccs.clear();
    ccid.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        if (!ccid[u]) {
            ccs.emplace_back();
            dfs(u, ccs.size() - 1);
        }
}
```

Kosaraju's Algorithm

```cpp
vector<vector<int>> e, re, se;
vector<int> order, sccid;
vector<vector<int>> sccs;
void dfs1(int u) {
    sccid[u] = -1; // mark visited
    for (int v : e[u])
        if (!sccid[v]) dfs1(v);
    order.push_back(u); // exit time
}
void dfs2(int u, int cid) {
    sccid[u] = cid;
    sccs[cid].push_back(u); // current SCC
    for (int v : re[u])
        if (sccid[v] == -1) dfs2(v, cid);
}
void kosaraju() {
    // construct the transpose graph re
    re.assign(n + 1, {});
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            re[v].push_back(u);

    sccid.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        if (!sccid[u]) dfs1(u);
    reverse(order.begin(), order.end()); // decreasing order

    for (int u : order)
        if (sccid[u] == -1) {
            sccs.emplace_back();
            dfs2(u, sccs.size() - 1);
        }
}
void shrink() {
    se.assign(sccs.size(), {});
    for (int u = 1; u <= n; u++)
        for (int v : e[u]) {
            int cu = sccid[u], cv = sccid[v];
            if (cu != cv) se[cu].push_back(cv);
        }
}
```

### Minimum Spanning Tree (MST)

$Prim$算法（与 dijkstra 神似）

```cpp
int e[Z][Z];
vector<bool> vs;
vector<int> dis;
int prim(int s) {
    vs.assign(n + 1, false);
    dis.assign(n + 1, INF);
    int sum = 0;
    dis[s] = 0;
    for (int i = 1; i <= n; i++) {
        int k = 0;
        for (int j = 1; j <= n; j++) //寻找与此点距离最小的点
            if (!vs[j] && dis[j] < dis[k])
                k = j;
        if (k == 0) return -1; // not connected
        vs[k] = 1;
        sum += dis[k];
        for (int j = 1; j <= n; j++) //更新k点到其他点的最小距离
            if (!vs[j] && e[k][j] < dis[j])
                dis[j] = e[k][j];
    }
    return sum;
}
```

```cpp
vector<vector<pii>> e;
vector<bool> vs;
int prim(int s) {
    priority_queue<pii, vector<pii>, greater<pii>> q;
    vs.assign(n + 1, false);
    int sum = 0, cnt = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (vs[u]) continue; // outdated
        vs[u] = 1;
        sum += d;
        if ((++cnt) == n) return sum;
        for (auto [v, w] : e[u])
            if (!vs[v]) q.push({w, v});
    }
    return -1; // not connected
}
```

$Kruskal$算法（用到了并查集、集合思想；记得先排序）

```cpp
struct kusk {
    int u, v, w;
    friend bool operator <(const kusk& A, const kusk& B) { return A.w < B.w; }
}; vector<kusk> edges, mst;
int kruskal(int n, int m) {
    int tot = 0, sum = 0;
    sort(edges.begin(), edges.end());
    for (kusk &e : edges)
        if (find(e.u) != find(e.v)) { // 不在同一集合中
            un(e.u, e.v);
            sum += e.w;
            mst.push_back(e);
            if ((++tot) == n - 1) return sum;
        }
    return -1; // not connected
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

### Shortest Path Problem

链式前向星（模拟链表）

```cpp
struct edge { int v, w, ne; } e[Z << 1];
int head[Z], cnt = 1;
inline void add(int x, int y, int z) {
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
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path;
void dijkstra(int s) {
    priority_queue<pii, vector<pii>, greater<pii>> q;
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    dis[s] = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [d, u] = q.top(); q.pop();
        if (d > dis[u]) continue; // outdated value
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                q.push({dis[v], v});
            }
        }
    }
}
vector<int> get_path(int t) { // from s to t
    vector<int> res;
    for (int v = t; v != 0; v = path[v])
        res.push_back(v);
    reverse(res.begin(), res.end());
    return res;
}
```

Bellman-Ford

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path, cycle;
bool bellman_ford(int s) {
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    dis[s] = 0;
    int x = -1; // last updated vertex
    for (int i = 1; i <= n; i++) {
        x = -1;
        for (int u = 1; u <= n; u++) {
            if (dis[u] == INF) continue;
            for (auto [v, w] : e[u]) {
                if (dis[v] > dis[u] + w) {
                    dis[v] = dis[u] + w;
                    path[v] = u;
                    x = v; // record last relaxed vertex
                }
            }
        }
        if (x == -1) return false; // no negative cycle
    }

    get_negative_cycle(x);
    return true;
}
```

$spfa$算法--单源最短路
时间复杂度：$O(玄学--极限n*m)$

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis, path, cnt, cycle;
vector<bool> vs;
//判断是否存在环
bool spfa(int s) {
    dis.assign(n + 1, INF);
    path.assign(n + 1, 0);
    cnt.assign(n + 1, 0);
    vs.assign(n + 1, false);
    queue<int> q;
    dis[s] = 0; q.push(s); vs[s] = true; cnt[s] = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop(); vs[u] = false;
        for (auto [v, w] : e[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                path[v] = u;
                if (!vs[v]) {
                    q.push(v); vs[v] = true;
                    if ((++cnt[v]) >= n) {
                        get_negative_cycle(v);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
void get_negative_cycle(int x) {
    // retrace to find a vertex definitely inside the cycle
    for (int i = 1; i <= n; i++) x = path[x];
    for (int v = x; ; v = path[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());
}
```

0-1 BFS

```cpp
using pii = pair<int, int>;
vector<pii> e[Z];
vector<int> dis;
void zero_one_bfs(int s) {
    dis.assign(n + 1, INF);
    deque<int> q;
    dis[s] = 0;
    q.push_front(s);
    while (!q.empty()) {
        int u = q.front(); q.pop_front();
        for (auto [v, w] : e[u])
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                if (w == 0) q.push_front(v);
                else q.push_back(v);
            }
    }
}
```

### Topo-sort

```cpp
vector<int> indeg, outdeg;
vector<int> sources, sinks;
void find_sources_and_sinks(int n) {
    indeg.assign(n + 1, 0);
    outdeg.assign(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (int v : e[u])
            outdeg[u]++, indeg[v]++;

    sources.clear();
    sinks.clear();
    for (int u = 1; u <= n; u++) {
        if (indeg[u] == 0) sources.push_back(u);
        if (outdeg[u] == 0) sinks.push_back(u);
    }
}
```

```cpp
vector<vector<int>> e;
vector<bool> vs;
vector<int> order;
void dfs(int u) {
    vs[u] = true;
    for (int v : e[u])
        if (!vs[v]) dfs(v);
    order.push_back(u); // exit time
}
void topo_sort(int n) {
    vs.assign(n + 1, false);
    order.clear();
    for (int u = 1; u <= n; u++)
        if (!vs[u]) dfs(u);
    reverse(order.begin(), order.end()); // descending order of exit time
}
```

### Network Flow

Edmonds-Karp 算法

```cpp
namespace EK
{
    int dis[Z], pre[Z];//前驱结点
    bool bfs()//沿着最短路径寻找增广路
    {
        queue <int> q;
        rep(i, 1, n) dis[i] = 0;
        q.push(s), dis[s] = inf;
        while (!q.empty())
        {
            int u = q.front(); q.pop();
            for (int i = head[u]; i; i = e[i].ne) if (e[i].flow)
            {
                int v = e[i].v;
                if (dis[v]) continue;
                dis[v] = min(dis[u], e[i].flow);//路径上瓶颈流量
                q.push(v), pre[v] = i;
                if (v == t) return true;
            }
        }
        return false;
    }
    void update()//更新增广路上的流量
    {
        int u = t;
        while (u != s)
        {
            int i = pre[u];
            e[i].flow -= dis[t], e[i ^ 1].flow += dis[t];
            u = e[i ^ 1].v;
        }
        ans += dis[t];
    }
    void max_flow()
    {
        while (bfs()) update();
        cout << ans << endl;
    }
}
```

Dinic 算法

```cpp
namespace Dinic
{
    int dis[Z], now[Z];//当前弧优化
    bool bfs()//按最短路给图分层
    {
        queue <int> q;
        rep(i, 1, n) now[i] = head[i], dis[i] = 0;
        q.push(s), dis[s] = 1;
        while (!q.empty())
        {
            int u = q.front(); q.pop();
            for (int i = head[u]; i; i = e[i].ne) if (e[i].flow)
            {
                int v = e[i].v;
                if (dis[v]) continue;
                q.push(v), dis[v] = dis[u] + 1;
                if (v == t) return true;
            }
        }
        return false;
    }
    int dfs(int u, int sum)//多路增广
    {
        if (u == t) return sum;//没有限制，这些流量都可以通过
        int res = 0;
        for (int i = now[u]; i && sum; now[u] = i, i = e[i].ne)//更新当前弧，之前的状态不用再判断一次
        {
            int v = e[i].v;
            if (dis[v] != dis[u] + 1) continue;//检查是否为分层图的结构
            int val = dfs(v, min(sum, e[i].flow));
            e[i].flow -= val, e[i ^ 1].flow += val;
            sum -= val, res += val;//sum为剩余流量；res为流出流量
        }
        return res;
    }
    void max_flow()
    {
        while (bfs()) ans += dfs(s, inf);
        cout << ans << endl;
    }
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

动态开点

```cpp
#define ST Segment_Tree
struct Segment_Tree
{
    int l, r;
    int sum, max, min;
    Segment_Tree () { sum = 0, max = -1e9, min = 1e9; }
    #define lk tr[rt].l
    #define rk tr[rt].r
    #define mid ((L + R) >> 1)
}; Segment_Tree tr[Z];
int tot;
//L-R：当前节点所代表的区间。l-r：查询与修改的区间
void update(int& rt, int L, int R, int pos, int val)
{
    if (!rt) rt = ++tot;
    if (l <= L && r >= R) { change(rt, val); return; }
    pos <= mid ? update(lk, L, mid, pos, val) : update(rk, mid + 1, R, pos, val);
    pushup(rt);
}
int query(int rt, int L, int R, int l, int r)
{
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum;
    if (r <= mid) return query(lk, L, mid, l, r);
    if (l > mid) return query(rk, mid + 1, R, l, r);
    return query(lk, L, mid, l, r) + query(rk, mid + 1, R, l, r);
}
int merge(int rt, int ut, int L, int R)//线段树合并
{
    if (!rt || !ut) return rt + ut;
    if (L == R) { change(rt, tr[ut].sum); return rt; }
    lk = merge(lk, tr[ut].l, L, mid);
    rk = merge(rk, tr[ut].r, mid + 1, R);
    pushup(rt); return rt;
}
```

**主席树**

```cpp
#define PT President_Tree
struct President_Tree
{
    int lc, rc;
    int sum;
    #define lk tr[rt].lc
    #define rk tr[rt].rc
    #define mid ((L + R) >> 1)
}; President_Tree tr[Z];
int tot;
void build(int& rt, int L, int R)
{
    rt = ++tot;//动态开点
    tr[rt].sum = 0;
    if (L == R) return;
    build(lk, L, mid);
    build(rk, mid + 1, R);
}
int update(int pre, int L, int R, int pos, int val)
{
    int rt = ++tot;
    tr[rt] = tr[pre];//继承上一个历史版本
    tr[rt].sum += val;
    if (L == R) return rt;
    if (pos <= mid) lk = update(lk, L, mid, pos, val);
    else rk = update(rk, mid + 1, R, pos, val);
    pushup(rt);
    return rt;
}
int query(int rt, int L, int R, int l, int r)//正常的询问
{
    if (!rt) return 0;
    if (l <= L && r >= R) return tr[rt].sum;
    int res = 0;
    if (l <= mid) res += query(lk, L, mid, l, r);
    if (r > mid) res += query(rk, mid + 1, R, l, r);
    return res;
}
```

```cpp
//笛卡尔树
void build()
{
    for (int i = 1, top = 0, pos = 0; i <= n; ++i)
    {
        top = pos;//pos为当前栈顶，top为操作前栈顶
        while (pos && p[s[pos]] > p[i]) pos--;//单调栈
        if (pos) r[s[pos]] = i;//找到一个比自己小的点，接到右儿子上
        if (pos < top) l[i] = s[pos + 1];//把中间比自己大的点作为左儿子
        s[++pos] = i;
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

K-D Tree (k-dimensional tree)

```cpp
const int inf = 2e9;
const double alpha = 0.75;
bool o;//当前维度
struct point
{
    int p[3];
    friend bool operator <(point A, point B) { return A.p[o] < B.p[o]; }
    friend bool operator ==(point A, point B) { return A.p[2] == B.p[2]; }
    friend bool operator !=(point A, point B) { return A.p[2] != B.p[2]; }
}; point a[Z];
inline int calc(point x, point y) { return abs(x.p[0] - y.p[0]) + abs(x.p[1] - y.p[1]); }
struct KDtree
{
    point pt;//当前节点所代表的点
    int l, r, siz;//左右孩子及子树大小
    int max[2], min[2];//最大与最小的横纵坐标
    #define lk kd[rt].l
    #define rk kd[rt].r
    #define mid (l + r >> 1)
}; KDtree kd[Z << 1];
int root, tot, Max, Min;
inline void pushup(int rt)
{
    for (int i = 0; i <= 1; ++i)
    {
        kd[rt].max[i] = kd[rt].min[i] = kd[rt].pt.p[i];//因为会重构所以每次都要初始化
        if (lk) kd[rt].max[i] = max(kd[rt].max[i], kd[lk].max[i]), kd[rt].min[i] = min(kd[rt].min[i], kd[lk].min[i]);
        if (rk) kd[rt].max[i] = max(kd[rt].max[i], kd[rk].max[i]), kd[rt].min[i] = min(kd[rt].min[i], kd[rk].min[i]);
    }
    kd[rt].siz = kd[lk].siz + kd[rk].siz + 1;
}
inline int est(point x)//动态开点
{
    kd[++tot].pt = x;
    pushup(tot); return tot;
}
int build(int l, int r, bool op)//初始建树
{
    o = op;//自定义排序方式（表示维度）
    nth_element(a + l, a + mid, a + r + 1);
    int rt = est(a[mid]);//定位中位数
    if (l < mid) lk = build(l, mid - 1, !op);
    if (r > mid) rk = build(mid + 1, r, !op);
    pushup(rt); return rt;
}
void rebuild(int rt, int num)//重构，把树还原为原序列
{
    if (lk) rebuild(lk, num);
    a[num + kd[lk].siz + 1] = kd[rt].pt;
    if (rk) rebuild(rk, num + kd[lk].siz + 1);
}
inline void check(int &rt, int op)//检查树是否平衡
{
    if (alpha * kd[rt].siz < min(kd[lk].siz, kd[rk].siz))
    {
        rebuild(rt, 0);
        rt = build(1, kd[rt].siz, op);
    }
}
void insert(int &rt, point x, int op)//插入
{
    if (!rt) { rt = est(x); return; }
    if (x.p[op] <= kd[rt].pt.p[op]) insert(lk, x, !op);
    else insert(rk, x, !op);
    pushup(rt); check(rt, op);
}
inline int estimate_max(int rt, point x)//最大值估价函数
{
    int sum = 0;
    for (int i = 0; i <= 1; ++i)//找到理论极限距离最大的点对（已扩展的最大平面的顶点）
        sum += max(abs(x.p[i] - kd[rt].max[i]), abs(kd[rt].min[i] - x.p[i]));
    return sum;
}
inline int estimate_min(int rt, point x)//最小值估价函数
{
    int sum = 0;
    for (int i = 0; i <= 1; ++i)//如果处于max和min的两侧，直接取最近；如果处于中间，则不知道还有没有其他的点，无法预估
        sum += max(x.p[i] - kd[rt].max[i], 0) + max(kd[rt].min[i] - x.p[i], 0);
    return sum;
}
void query_max(int rt, point x)//查询最远
{
    Max = max(Max, calc(kd[rt].pt, x));
    int dl = 0, dr = 0;
    if (lk) dl = estimate_max(lk, x);
    if (rk) dr = estimate_max(rk, x);
    if (dl > dr)//先跑最有可能达到最大值的
    {
        if (dl > Max) query_max(lk, x);
        if (dr > Max) query_max(rk, x);
    }
    else
    {
        if (dr > Max) query_max(rk, x);
        if (dl > Max) query_max(lk, x);
    }
}
void query_min(int rt, point x)//查询最近
{
    if (kd[rt].pt != x) Min = min(Min, calc(kd[rt].pt, x));
    int dl = inf, dr = inf;
    if (lk) dl = estimate_min(lk, x);
    if (rk) dr = estimate_min(rk, x);
    if (dl < dr)//先跑最有可能达到最小值的
    {
        if (dl < Min) query_min(lk, x);
        if (dr < Min) query_min(rk, x);
    }
    else
    {
        if (dr < Min) query_min(rk, x);
        if (dl < Min) query_min(lk, x);
    }
}
inline int ask(point x)
{
    Max = 0, Min = inf;
    query_max(root, x), query_min(root, x);
    return Max - Min;
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

带修莫队，在原基础上加了一个维度：修改时间，保证查询在修改后

```cpp
int block[Z], ans[Z];
int a[Z], c[E], pre[Z];
struct query
{
    int l, r, id, tim;
    query() {}
    query(int A, int B, int C, int D) {l = A; r = B; id = C; tim = D;}
    friend bool operator <(const query& A, const query& B)
    {
        if (block[A.l] != block[B.l]) return A.l < B.l;//优先按左端点块
        if (block[A.r] != block[B.r])
        {
            if (block[A.l] & 1) return A.r < B.r;//奇数块升序
            else return A.r > B.r;//偶数块降序
        }
        return A.tim < B.tim;//再加一维时间戳
    }
}; query ask[Z];
struct modify
{
    int pos, col, old;
    modify() {}
    modify(int A, int B, int C) {pos = A; col = B; old = C;}
}; modify cha[Z];

int nl = 1, nr = 0, nt = 0, na = 0;
inline void add(int x)
{
    if (c[x] == 0) na++;
    c[x]++;
}
inline void del(int x)
{
    c[x]--;
    if (c[x] == 0) na--;
}
inline void ward(int x, int col)
{
    if (x >= nl && x <= nr)
    {
        del(a[x]);
        add(col);
    }
    a[x] = col;
}
sandom main()
{
    n = read(); m = read(); t = sqrt(n);
    for (re i = 1; i <= n; i++)
        block[i] = (i - 1) / (n / t) + 1;
    for (re i = 1; i <= n; i++) a[i] = pre[i] = read();
    int timi = 0, tot = 0;
    for (re i = 1; i <= m; i++)
    {
        char ch = read_char();
        int x = read(), y = read();
        if (ch == 'Q') ++tot, ask[tot] = query(x, y, tot, timi);//多加一个时间维度
        if (ch == 'R') cha[++timi] = modify(x, y, pre[x]), pre[x] = y;//记录修改之前是什么颜色
    }
    sort(ask + 1, ask + 1 + tot);
    for (re i = 1; i <= tot; i++)
    {
        query q = ask[i];
        while (q.tim > nt) ++nt, ward(cha[nt].pos, cha[nt].col);//继续修改
        while (q.tim < nt) ward(cha[nt].pos, cha[nt].old), nt--;//修改回溯
        while (q.l < nl) add(a[--nl]);//区间扩大
        while (q.r > nr) add(a[++nr]);//先移动，再添加
        while (q.l > nl) del(a[nl++]);//区间缩小
        while (q.r < nr) del(a[nr--]);//先删除，再移动
        ans[q.id] = na;
    }
    for (re i = 1; i <= tot; i++) write(ans[i]);
    return 0;
}
```

回滚莫队，通过排序来避免删除。

```cpp
#define sandom signed
#define fre(x, y) freopen(#x ".in", "r", stdin), freopen(#y ".out", "w", stdout);
#include <bits/stdc++.h>
#define re register int
using namespace std; int wrt[20], TP;
const int Z = 1e5 + 10;
inline int read() { int x = 0, f = 0; char c = getchar(); while (!isdigit(c)) f |= c == '-', c = getchar(); while (isdigit(c)) x = (x << 1) + (x << 3) + (c ^ 48), c = getchar(); return f ? -x : x; }
inline void write(int x) { TP = 0; if (x < 0) putchar('-'), x = -x; while (x >= 10) wrt[++TP] = x % 10, x /= 10; wrt[++TP] = x; while (TP) putchar(wrt[TP--] | 48); putchar('\n'); }
inline int max(int a, int b) { return a > b ? a : b; } inline int min(int a, int b) { return a < b ? a : b; }

int n, m, k, ans[Z];
int be[Z], p[Z], d[Z];
struct ant
{
    int l, r, id;
    friend bool operator <(ant A, ant B)
    {
        if (be[A.l] == be[B.l]) return A.r < B.r;//保证同一块内右端点只扩展
        return A.l < B.l;//分块讨论
    }
}; ant que[Z];
int L[Z], R[Z];
int l, r, res, top;
struct delte { int a, b, c, d, e; }; delte stk[Z];
inline void add(int x, bool op)
{
    L[x] = R[x] = x;
    if (L[x - 1]) L[x] = L[x - 1];
    if (R[x + 1]) R[x] = R[x + 1];
    if (op) stk[++top] = delte{L[x], R[L[x]], R[x], L[R[x]], x};
    R[L[x]] = R[x], L[R[x]] = L[x];
    res = max(res, R[x] - L[x] + 1);
}
inline void del(delte x) { R[x.a] = x.b, L[x.c] = x.d, L[x.e] = R[x.e] = 0; }
inline int violent(int l, int r)//在同一块内暴力扫
{
    int ans = 1, cnt = 1;
    for (re i = l; i <= r; i++) d[i] = p[i];
    sort(d + l, d + r + 1); d[l - 1] = -1;
    for (re i = l; i <= r; i++)
    {
        if (d[i] == d[i - 1] + 1) cnt++;
        else cnt = 1;
        ans = max(ans, cnt);
    }
    return ans;
}

sandom main()
{
    n = read(), m = read(); int t = sqrt(n);
    for (re i = 1; i <= n; i++) be[i] = (i - 1) / t + 1;
    for (re i = 1; i <= n; i++) p[i] = read();
    for (re i = 1; i <= m; i++) que[i].l = read(), que[i].r = read(), que[i].id = i;
    sort(que + 1, que + 1 + m);
    for (re i = 1; i <= m; i++)
    {
        ant q = que[i];
        if (be[q.l] != be[que[i - 1].l])//进入下一块清空
        {
            for (re i = 1; i <= n; i++) L[i] = R[i] = 0;
            r = min(t * be[q.l], n), l = r + 1; res = 0;
        }
        if (be[q.l] == be[q.r]) ans[q.id] = violent(q.l, q.r);//同一块暴力扫
        else
        {
            while (r < q.r) add(p[++r], 0);//持续扩展
            int tmp = res;
            while (l > q.l) add(p[--l], 1);//扩展完撤销
            ans[q.id] = res; res = tmp;
            while (top) del(stk[top--]), l++;//回滚撤销
        }
    }
    for (re i = 1; i <= m; i++) write(ans[i]);
    return 0;
}
```

```cpp
struct DSU {
    vector<int> pa, sz;
    DSU(int n) : pa(n + 1), sz(n + 1, 1) { for (int i = 1; i <= n; i++) pa[i] = i; }
    // path compression
    inline int find(int x) { return x == pa[x] ? x : pa[x] = find(pa[x]); }
    // union by size
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false; // already in the same set
        if (sz[x] < sz[y]) swap(x, y);
        pa[y] = x, sz[x] += sz[y];
        return true;
    }
}; DSU dsu(n);
```

### DP

0-1 Knapsack
$O(nW)$

```cpp
for (int i = 1; i <= n; i++)
  for (int j = W; j >= w[i]; j--)
    f[j] = max(f[j], f[j - w[i]] + v[i]);
```

Complete Knapsack
$O(nW)$

```cpp
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= W; j++)
        f[j] = max(f[j], f[j - w[i]] + v[i]);
```

Multiple Knapsack
$O(nWm)$

```cpp
for (int i = 1; i <= n; i++)
    for (int j = W; j >= w[i]; j--)
        for (int k = 1; k * w[i] <= j && k <= cnt[i]; k++)
            f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
```

$O(nW \log m)$

```cpp
for (int i = 1; i <= n; i++) {
  if (w[i] * m[i] >= W) {
    for (int j = w[i]; j <= W; j++)
      f[j] = max(f[j], f[j - w[i]] + v[i]);
  } else {
    int k = 1, cnt = m[i];
    while (k < cnt) {
      for (int j = W; j >= k * w[i]; j--)
        f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
      cnt -= k;
      k <<= 1;
    }
    for (int j = W; j >= cnt * w[i]; j--)
      f[j] = max(f[j], f[j - cnt * w[i]] + cnt * v[i]);
  }
}
```

LIS

$O(n \log n)$

```cpp
vector<int> d(n + 1, INF);
for (int i = 1; i <= n; i++) {
    int j = upper_bound(d.begin(), d.end(), a[i]) - d.begin();
    if (d[j - 1] < a[i] && a[i] < d[j]) {
        d[j] = a[i];
    }
}
int ans = 0;
for (int l = 0; l <= n; l++) {
    if (d[l] < INF)
        ans = l;
}
```

### Catlan Number

$$
Cat_n=\sum\limits_{i=1}^{n}Cat_{i-1}Cat_{n-i} \\
Cat_n=\frac{4n-2}{n+1}Cat_{n-1} \\
Cat_n=C_{2n}^{n}-C_{2n}^{n-1}=\frac{C_{2n}^{n}}{n+1} \\
$$
$1、1、2、5、14、42、132……$

```cpp
int catalan(int n)
{
    int res = 1;
    for (int i = 0; i < n; i++)
        res = res * (2 * (2 * i + 1)) / (i + 2);
    return res;
}
```

### Linear Sieve Algorithms

线性筛

```cpp
vector<bool> npr; // is composite / not prime
void Esth(int n) {
    npr.assign(n + 1, false);
    npr[0] = npr[1] = true;
    int m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (!npr[i])
            for (int j = i * i; j <= n; j += i) 
                npr[j] = true;
}
```

```cpp
vector<bool> npr; // is composite / not prime
vector<int> primes, low;
void Linear(int n) {
    npr.assign(n + 1, false);
    low.assign(n + 1, 0);
    primes.clear();
    npr[0] = npr[1] = true;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), low[i] = i;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            low[k] = pr;
            if (i % pr == 0) break;
        }
    }
}
```


1. 欧拉函数

$\phi(n) = n \prod_{p_i|n}(1 - \frac{1}{p_i})$

```cpp
int phi(int n) { //根据基础定义，求单个数的欧拉函数
    int res = n, m = sqrt(n);
    for (int i = 2; i <= m; ++i)
        if (n % i == 0) {
            res -= res / i;
            while (n % i == 0) n /= i;
        }
    if (n > 1) res -= res / n;
    return res;
}
```

```cpp
vector<bool> npr;
vector<int> primes, phi;
void Euler(int n) { //欧拉函数
    npr.assign(n + 1, false);
    phi.assign(n + 1, 0);
    primes.clear();
    phi[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), phi[i] = i - 1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { 
                phi[k] = phi[i] * pr;
                break;
            } else phi[k] = phi[i] * (pr - 1);
        }
    }
}
```

2. 莫比乌斯函数

```cpp
vector<bool> npr;
vector<int> primes, miu;
void Mobius(int n) { //莫比乌斯函数
    npr.assign(n + 1, false);
    miu.assign(n + 1, 0);
    primes.clear();
    miu[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), miu[i] = -1;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { miu[k] = 0; break; }
            else miu[k] = -miu[i];
        }
    }
}
```

3. 约数个数

```cpp
vector<bool> npr;
vector<int> primes, d;
void NumDivisors(int n) { //约数个数
    npr.assign(n + 1, false);
    d.assign(n + 1, 0);
    primes.clear();
    d[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!npr[i]) primes.push_back(i), d[i] = 2;
        for (int pr : primes) {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) { 
                d[k] = 2 * d[i] - d[i / pr];
                break; 
            } else d[k] = 2 * d[i];
        }
    }
}
```

4. 正约数的和

```cpp
vector<bool> npr;
vector<int> primes, s;
void SumDivisors(int n) { //约数和
    npr.assign(n + 1, false);
    s.assign(n + 1, 0);
    primes.clear();
    s[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!npr[i]) primes.push_back(i), s[i] = i + 1;
        for (int pr : primes)
        {
            int k = i * pr;
            if (k > n) break;
            npr[k] = true;
            if (i % pr == 0) {
                s[k] = s[i] + (s[i] - s[i / pr]) * pr;
                break;
            } else s[k] = s[i] * (pr + 1);
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
inline int lcm(int a, int b) { return a / gcd(a, b) * b; }
```

```cpp
bool isPrime(int x)
{
    if (x < 2) return false;
    int m = sqrt(x);
    for (int i = 2; i <= m; ++i)
        if (x % i == 0) return false;
    return true;
}
```

```cpp
vector<pii> pr; // pair<prime, count>
void primeFactorization(int x) {
    int m = sqrt(x);
    for (int i = 2; i <= m && x > 1; ++i) {
        int cnt = 0;
        while (x % i == 0) x /= i, cnt++;
        if (cnt) pr.push_back({i, cnt});
    }
    if (x > 1) pr.push_back({x, 1});
    for (auto p : pr)
        cout << p.first << "^" << p.second << endl;
}
```

若 $a\cdot x \equiv 1 \pmod{b}$ ,则 $x$ 为 $a$ 在 $\bmod b$ 意义下的乘法逆元，记为 $a^{-1}$。注意：并非所有的情况下都存在乘法逆元，但是当 $\gcd(a, b)=1$，即 $a, b$ 互质时，一定存在乘法逆元。

1. 费马小定理求逆元（p 为素数）

```cpp
int binpow(int a, int b, int p) {
    int res = 1;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
inline int inv(int a, int p) { return binpow(a, p - 2, p); }
```

2. 扩展欧几里得求逆元（a 与 p 互质）
   a*x≡1(mod p) --> a*x-p\*y=1

```cpp
inline int exgcd(int a, int b, int& x, int& y) {
    if (b == 0) { x = 1, y = 0; return a; }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
inline int inv(int a, int p) {
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
```

3. 线性求逆元（p 为素数）

```cpp
void inverse(int p) {
    inv[1] = 1;
    for (int i = 2; i < p; ++i)
        inv[i] = (p - p / i) * inv[p % i] % p;
}
```

### Congruence Equation

费马小定理：若 p 是质数，$\gcd(a, p) = 1$，有 $a^{p-1} \equiv 1 \pmod p$。还有另一种形式：对于 $\forall a \in \mathbb{Z}, a^p \equiv a \pmod p$

欧拉定理：若 $\gcd(a, p) = 1$，则 $a^{\phi(p)}\equiv 1 \pmod p$，$\phi(p)$ 为欧拉函数

扩展欧拉定理：

$$ a^b \equiv \begin{cases} a^{b \; mod \;\phi(p)},&gcd(a,p)=1,\\ a^{b},&gcd(a, p)\neq1 且 b<\phi(p), &\pmod p\\ a^{b \; mod\;\phi(p)+\phi(p)},&gcd(a, p)\neq1 且 b\geq\phi(p),\\ \end{cases} $$

**Bezout定理**：$\forall a, b\in Z,\exists x, y\in Z$, 满足$ax+by=gcd(a,b)$
$x=x_1+k\frac{b}{gcd}, \quad y=y_1-k\frac{a}{gcd}$

线性（一次）同余方程

```cpp
inline int exgcd(int a, int b, int& x, int& y) //a*x + b*y = 1;
{
    if (b == 0) { x = 1, y = 0; return a; }
    int x1, y1;
    int d = exgcd(b, a % b, x1, y1);
    x = y1, y = x1 - a / b * y1;
    return d;
}
inline int exgcd(int a, int b, int& x, int& y) //a*x + b*y = 1;
{
    if (b == 0) { x = 1, y = 0; return a; }
    int d = exgcd(b, a % b, y, x); //直接交换传参
    y -= a / b * x;
    return d;
}
inline bool solve_any(int a, int b, int c, int& x, int& y) //a*x + b*y = c
{
    int g = exgcd(abs(a), abs(b), x, y);
    if (c % g) return false; //无解
    c /= g;
    x *= c, y *= c;
    if (a < 0) x = -x;
    if (b < 0) y = -y;
    return true;
}
inline int solve_min(int a, int b, int c) //a*x + b*y = c;
{
    int x, y, g;
    g = exgcd(a, b, x, y);
    if (c % g) return -1; //无解
    a /= g, b /= g, c /= g;
    //只要求x为最小非负整数解，而y可以为负数
    x = (x * c % b + b) % b;
    return x;
    //x和y都要求为非负整数解
    while (x > 0 || y < 0) x -= b, y += a;
    x = -x, y = y;
}
```
高次同余方程

$a^x\equiv b \pmod p$。$(a, p)$互质，求解$x$的最小非负整数解。

```cpp
int BSGS(int a, int b, int p)//a^x≡b (mod p)
{
    map <int, int> hash; hash.clear();//多次调用时，把map定义放在外面
    b %= p;
    int t = sqrt(p) + 1;
    for (int j = 0; j < t; ++j) hash[b * binpow(a, j, p) % p] = j;
    a = binpow(a, t, p);
    if (a == 0) return b == 0 ? 1 : -1;
    for (int i = 0; i <= t; ++i)
    {
        int val = binpow(a, i, p);
        int j = hash.find(val) == hash.end() ? -1 : hash[val];
        if (j >= 0 && i * t - j >= 0) return i * t - j;
    }
    return -1;//无解
}
```

一元线性同余方程组

当 $m_1,m_2,\dots,m_n$ 两两互质时，设 $M=\prod_{i=1}^{n}m_i,\; c_i=\frac{M}{m_i},\; t_i$ 是线性同余方程 $c_it_i\equiv1\pmod{m_i}$ 的一个解，也就是 $c_i$ 在 $\pmod{m_i}$ 意义下的逆元。那么 $x$ 在模 $M$ 有唯一解 $x=\sum\limits_{i=1}^{n}a_ic_it_i \pmod{M}$，有通解 $x=kM+\sum\limits_{i=1}^{n}a_ic_it_i(k\in Z)$.

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

先来考虑只有两个方程的情况。设方程分别是 $x\equiv a_1\pmod{m_1}，x\equiv a_2\pmod{m_2}$，则得到不定方程 $x=m_1p+a_1=m_2q+a_2$。移项得 $m_1p-m_2q=a_2-a_1$，首先当 $gcd(m_1, m_2) \nmid (a_2-a_1)$，方程无解；否则，可以得到一组可行解$p、q$。令 $a'=m_1p+a_1，M=lcm(m_1,m_2)$，合并得到同余方程 $x\equiv a'\pmod{M}$，多个方程的话两两合并即可。

```cpp
int calc(int a, int b, int c) //ax+by=c
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
struct matrix {
    int a[10][10];
    matrix () { memset(a, 0, sizeof(a)); }
    inline friend matrix operator *(const matrix& A, const matrix& B) {
        matrix C;
        for (int i = 1; i <= n; ++i)
            for (int k = 1; k <= n; ++k)
                for (int j = 1; j <= n; ++j)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % mod;
        return C;
    }
}; 
matrix binpow(matrix base, int b) {
    matrix res;
    while (b) {
        if (b & 1) res = res * base;
        base = base * base;
        b >>= 1;
    }
    return res;
}
```

### Combinatorics

加法递推（杨辉三角）
$$ C_n^m = C_{n - 1}^m + C_{n - 1}^{m - 1} $$

```cpp
void init(int n)
{
    C[0][0] = 1;
    for (int i = 1; i <= n; ++i)
    {
        C[i][0] = 1;
        for (int j = 1; j <= i; ++j)
            C[i][j] = C[i - 1][j] + C[i - 1][j - 1];
    }
}
```

乘法递推

```cpp
void init(int n)
{
    C[0] = 1;
    for (int i = 1; i * 2 <= n; ++i)
        C[i] = C[n - i] = C[i - 1] * (n - i + 1) / i;
}
```

根据定义，阶乘直接求得

```cpp
int fac[Z], inv[Z];
void init(int n, int p) {
    fac[0] = 1;
    for (int i = 1; i <= n; ++i)
        fac[i] = fac[i - 1] * i % p;
    inv[n] = binpow(fac[n], p - 2, p);
    for (int i = n - 1; i >= 1; --i)
        inv[i] = inv[i + 1] * (i + 1) % p;
}
inline int C(int n, int m, int p) { //组合数
    return m > n ? 0 : fac[n] * inv[m] % p * inv[n - m] % p;
}
inline int A(int n, int m, int p) { //排列数
    return m > n ? 0 : fac[n] * inv[n - m] % p;
}
```

卢卡斯定理

$$ C_n^m = C_{n \mod p}^{m \mod p} * C_{\lfloor n/p \rfloor}^{\lfloor m/p \rfloor} \pmod p $$

```cpp
int lucas(int n, int m, int p) {
    if (m == 0) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

扩展卢卡斯定理，针对模数不为素数的大组合数求解

```cpp
int a[Z], c[Z];
int qpow(int a, int b, int p) {
    int res = 1;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
int exgcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    int gcd = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return gcd;
}
int inv(int a, int p) {
    int x, y;
    exgcd(a, p, x, y);
    return (x % p + p) % p;
}
int fac(int n, int p, int pk)//n!/p^x mod p^k
{
    if (!n) return 1;
    int ans = 1;
    for (int i = 1; i < pk; ++i)//n/pk个循环节
        if (i % p) ans = ans * i % pk;
    ans = qpow(ans, n / pk, pk);
    for (int i = 1; i <= n % pk; ++i)//剩余部分
        if (i % p) ans = ans * i % pk;
    return ans * fac(n / p, p, pk) % pk;//余下的递归处理
}
int C(int n, int m, int p, int pk)//C(n, m) mod p^k
{
    if (m > n) return 0;
    int f1 = fac(n, p, pk), f2 = fac(m, p, pk), f3 = fac(n - m, p, pk);
    int k1 = 0, k2 = 0, k3 = 0;//统计阶乘中p的倍数的个数
    for (int i = n; i; i /= p) k1 += i / p;
    for (int i = m; i; i /= p) k2 += i / p;
    for (int i = n - m; i; i /= p) k3 += i / p;
    return f1 * inv(f2, pk) * inv(f3, pk) % pk * qpow(p, k1 - k2 - k3, pk) % pk;
}
int CRT(int n, int a[], int m[]) {
    int b, c, x, y;
    int M = 1, ans = 0;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i)
    {
        b = m[i]; c = M / b;
        exgcd(c, b, x, y);
        ans = (ans + a[i] * c * x % M);
    }
    return (ans % M + M) % M;
}
int exlucas(int n, int m, int p) {
    int tmp = sqrt(p), cnt = 0;
    for (int i = 2; p > 1 && i <= tmp; ++i)
    {
        int t = 1;
        while (p % i == 0) p /= i, t *= i;//t = i^tot
        if (t > 1) a[++cnt] = C(n, m, i, t), c[cnt] = t;
    }
    if (p > 1) a[++cnt] = C(n, m, p, p), c[cnt] = p;
    return CRT(cnt, a, c);//求解ans ≡ C(n, m) (mod p[i]^k[i])
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

### Aho–Corasick Algorithm

```cpp
struct Trie
{
    int kid[26];//26个字母
    int fail;//失配指针
    int end;//以该节点结尾的单词数量
    #define son ac[rt].kid[i]
}; Trie ac[Z << 2];
int tot = 0;
inline void insert(char s[], int len)
{
    int rt = 0;
    for (int t = 1; t <= len; ++t)
    {
        int i = s[t] - 'a';
        if (!son) son = ++tot;//新建一个节点
        rt = son;//进入下一层
    }
    ++ac[rt].end;
}
void getfail()
{
    queue <int> q;
    int rt = 0;
    for (int i = 0; i < 26; ++i)//初始化失配指针
        if (son)
        {
            ac[son].fail = 0;
            q.push(son);
        }
    while (!q.empty())
    {
        rt = q.front(); q.pop();
        for (int i = 0; i < 26; ++i)
        {
            if (son)
            {
                ac[son].fail = ac[ac[rt].fail].kid[i];//扩展后缀
                q.push(son);
            }
            else son = ac[ac[rt].fail].kid[i];//保证字符串能沿着路径走完
        }
    }
}
inline int match(char s[], int len)
{
    int rt = 0, ans = 0;
    for (int t = 1; t <= len; ++t)
    {
        rt = ac[rt].kid[s[t] - 'a'];//向下走一层
        for (int j = rt; j && ac[j].end != -1; j = ac[j].fail)
            ans += ac[j].end, ac[j].end = -1;//j不断跳fail直到完全失配
    }
    return ans;
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
//a底数，b指数，c取模数
int binpow(int a, int b, int c) {
    int res = 1;
    a = a % c; //防止a过大
    while (b) {
        if (b & 1) res = res * a % c; //奇数补一项
        a = a * a % c;
        b >>= 1;
    }
    return res;
}
```

```cpp
int a[Z];
void quick_sort(int l, int r) {
    int i = l, j = r, mid = (l + r) >> 1;
    while (i <= j) { //等号不能少
        while (a[i] <= a[mid]) i++; //左半寻找比mid大的
        while (a[j] >= a[mid]) j--; //右半寻找比mid小的
        if (i <= j) swap(a[i++], a[j--]); //交换大小，使得mid左边都小于mid，右边都大于mid
    }
    if (i < r) quick_sort(i, r); //区间边界
    if (j > l) quick_sort(l, j);
}
```
```cpp
int a[Z], b[Z];
void merge_sort(int l, int r) {
    if (l >= r) return; //base case
    int mid = (l + r) >> 1;
    merge_sort(l, mid), merge_sort(mid + 1, r);
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) { //排序
        if (a[i] <= a[j]) b[k++] = a[i++];
        else b[k++] = a[j++];
    }
    while (i <= mid) b[k++] = a[i++]; //左剩余
    while (j <= r) b[k++] = a[j++]; //右剩余
    for (int u = l; u <= r; u++)  a[u] = b[u]; //剩余转移
}
```

```cpp
int max_sum_subarray()
{
    int ans = 0;
    for (re i = 1; i <= n; i++)
    {
        s[i] = s[i - 1] + a[i];//前缀和
        mn[i] = min(mn[i - 1], s[i]);//最小前缀
        ans = max(ans, s[i] - mn[i - 1]);//更新答案
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

Centroid Decomposition

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

Virtual/Auxiliary Trees

对一棵树多次选取某些点进行询问，我们称这些点为关键点，而其他点不影响答案，我们可以建立一棵虚树，只包含这些关键点以及连接他们的LCA。在遍历过程中，对已经操作完的点直接清空数据

```cpp
inline bool cmp(int A, int B) { return dfn[A] < dfn[B]; }
int stk[Z], tp;
inline void un(int x, int y) { add(y, x, dep[x] - dep[y]); tp--; }
inline void insert(int x)
{
    if (!tp) { stk[++tp] = x; return; }
    int lca = LCA(stk[tp], x);
    while (tp >= 2 && dfn[stk[tp - 1]] >= dfn[lca]) un(stk[tp], stk[tp - 1]);
    if (lca != stk[tp]) un(stk[tp], lca), stk[++tp] = lca;
    stk[++tp] = x;
}
```


```cpp
void dfs(int rt)
{
    sz[rt] = key[rt];
    for (re i = head[rt]; i; i = e[i].ne)
    {
        int son = e[i].v;
        dfs(son);
        ans1 += sz[son] * (k - sz[son]) * e[i].w;//经过这条边的贡献
        sz[rt] += sz[son];//关键点个数
    }
    head[rt] = key[rt] = 0;//清空
}
sandom main()
{
    n = read();
    for (re i = 1; i < n; i++)
    {
        int u = read(), v = read();
        add(u, v, 1), add(v, u, 1);
    }
    search(1, 0);
    connect(1, 1);
    for (re i = 1; i <= n; i++) head[i] = 0;
    int Q = read();
    while (Q--)
    {
        cnt = tp = 0;
        k = read();
        for (re i = 1; i <= k; i++) a[i] = read(), key[a[i]] = 1;
        sort(a + 1, a + 1 + k, cmp);
        for (re i = 1; i <= k; i++) insert(a[i]);
        while (tp > 1) un(stk[tp], stk[tp - 1]);
        ans1 = 0;
        dfs(stk[tp]);
        write(ans1);
    }
    return 0;
}
```

Hill Climbing and Simulated Annealing Algorithms

```cpp
const double down = 0.996;//降温系数
const double eps = 1e-15;//终止温度
double ansx, ansy, answ, T;
struct point { int x, y, w; } a[Z];
inline double dis(double x1, double x2, double y1, double y2) { return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); }
inline double calc(double x, double y)//计算答案值
{
    double res = 0;
    for (re i = 1; i <= n; i++) res += dis(x, a[i].x, y, a[i].y) * a[i].w;
    if (res < answ) ansx = x, ansy = y, answ = res;
    return res;
}
inline double get(double x) { return x + (rand() * 2 - RAND_MAX) * T; }//随机获得新解
void SA()
{
    T = 3000;//初始温度
    while (T > eps)
    {
        double ex = get(ansx), ey = get(ansy);
        double delta = calc(ex, ey) - calc(ansx, ansy);
        if (exp(-delta / T) * RAND_MAX > rand()) ansx = ex, ansy = ey;//根据Metropolis准则保留
        T *= down;//不断降温
    }
    for (re i = 1; i <= 1000; i++) calc(get(ansx), get(ansy));//最后在接近的范围里跳
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
