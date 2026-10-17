---
title: "Graph Traversal"
description: "Depth First Search (DFS) and Breadth First Search (BFS) algorithms for graph traversal, including their applications and edge classifications."
time: "Thu Oct 16, 2025"
---

# Graph Traversal

## Table of Contents

- [Graph Representation](#graph-representation)
- [Depth First Search (DFS)](#depth-first-search-dfs)
  - [Classification of Edges](#classification-of-edges)
  - [Applications](#applications)
- [Breadth First Search (BFS)](#breadth-first-search-bfs)
  - [Applications](#applications-1)

## Graph Representation

$G = (V, E)$ where $V$ is the set of vertices and $E$ is the set of edges.  

链式前向星（模拟链表）
```cpp
struct edge { int v, w, ne; } e[Z << 1];
int head[Z], cnt = 1;
inline void add(int x, int y, int z) {
    e[++cnt] = edge{y, z, head[x]};
    head[x] = cnt;
}
```

Adjacency Matrix
```cpp
int e[Z][Z];
inline void add(int x, int y, int z) {
    e[x][y] = z;
}
```

Adjacency List
```cpp
vector<pii> e[Z];
inline void add(int x, int y, int z) {
    e[x].push_back({y, z});
}
```

Edge List
```cpp
struct edge { int u, v, w; };
vector<edge> e;
inline void add(int x, int y, int z) {
    e.push_back(edge{x, y, z});
}
``` 

## Depth First Search (DFS)

$O(n + m)$

```cpp
vector<int> e[Z];
vector<bool> vs;
void dfs(int u) {
    vs[u] = true;
    for (int v : e[u]) {
        if (!vs[v])
            dfs(v);
    }
}
void example_dfs(int n) {
    vs.assign(n + 1, false);
    for (int i = 1; i <= n; i++)
        if (!vs[i])
            dfs(i);
}
```

### Classification of Edges

- Tree Edge: An edge which is part of the DFS tree.
- Back Edge: An edge that points from a vertex to one of its ancestors in the DFS tree.
- Forward Edge: An edge that points from a vertex to one of its descendants in the DFS tree.
- Cross Edge: An edge that connects two vertices, but neither is an ancestor of the other.

### Applications

- Find lexicographical first path in the graph from source $u$ to all vertices.
- Check if a vertex in a tree is an ancestor of some other vertex:  
    At the beginning and end of each search call we remember the entry and exit "time" of each vertex. Now you can find the answer for any pair of vertices $(i, j)$ in $O(1)$: vertex  $i$ is an ancestor of vertex  $j$  if and only if  $\text{entry}[i] < \text{entry}[j]$  and  $\text{exit}[i] > \text{exit}[j]$.
- Check whether a given graph is acyclic and find cycles in a graph. (As mentioned below by counting back edges in every connected components).

## Breadth First Search (BFS)

$O(n + m)$

```cpp
vector<int> e[Z];
vector<bool> vs;
vector<int> dis, path;
void bfs(int st) {
    queue<int> q;
    q.push(st);
    vs[st] = true;
    dis[st] = 0;
    path[st] = -1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : e[u]) {
            if (!vs[v]) {
                q.push(v);
                vs[v] = true;
                dis[v] = dis[u] + 1;
                path[v] = u;
            }
        }
    }
}
void example_bfs(int n) {
    vs.assign(n + 1, false);
    dis.assign(n + 1, -1);
    path.assign(n + 1, -1);
    for (int i = 1; i <= n; i++)
        if (!vs[i])
            bfs(i);
}
```

### Applications

- Find the shortest path from a source to other vertices in an unweighted graph.
- Finding a solution to a problem or a game with the least number of moves, if each state of the game can be represented by a vertex of the graph, and the transitions from one state to the other are the edges of the graph.
- Finding the shortest cycle in a directed unweighted graph: Start a breadth-first search from each vertex.
- Find all the edges and vertices that lie on any shortest path between a given pair of vertices $(a, b)$ with two BFS.