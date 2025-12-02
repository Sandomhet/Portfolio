---
title: "CMPSC 130A"
description: "Algorithm analysis and graph algorithms including shortest path, 2-SAT, and minimum spanning tree."
time: "Fri Oct 19, 2025"
lang: "en"
---

# CMPSC 130A

[Graph Traversal](https://www.sandomhet.com/blogs/traversal).  
[Topological Sort](https://www.sandomhet.com/blogs/topo-sort).  
[Connected Components](https://www.sandomhet.com/blogs/cc-scc).  
[2-SAT](https://www.sandomhet.com/blogs/2-sat).  
[Shortest Path](https://www.sandomhet.com/blogs/shortest-path).  
[Minimum Spanning Tree](https://www.sandomhet.com/blogs/mst).  
[Union-Find](https://www.sandomhet.com/blogs/union).  
[Hash Tables](https://www.sandomhet.com/blogs/hash-table).
[Balanced Binary Search Trees](https://www.sandomhet.com/blogs/bbst).

## Table of Contents

## Algorithm Analysis

Topologial sort of DAG (directed acyclic graph)
source: no incoming edges
sink: no outgoing edges

Connected components in undirected graph.  
SCCs in directed graph.  

## Shortest Path Algorithms

### Unweighted Graphs

BFS from source. $O(V+E)$

### Dijkstra's Algorithm

Dijkstra's algorithm for weighted graphs with non-negative weights. Uses a priority queue. $O((V+E) \log V)$

(priority queue implemented with a binary heap)

### Bellman-Ford Algorithm

Handles graphs with negative weights. Detects negative weight cycles. $O(VE)$

## 2-SAT Algorithm

(Satisfiability of boolean formulas with 2 literals per clause)

CNF is AND of ORs.

Given a 2-CNF formula, construct an implication graph.  
Each variable $x_i$ has two nodes: $x_i$ and $\neg x_i$.  
For each clause $(a \lor b)$, add edges $\neg a \to b$ and $\neg b \to a$.  
The formula is satisfiable if and only if no variable and its negation are in the same SCC.  
Use Kosaraju's or Tarjan's algorithm to find SCCs. $O(V+E)$

k-SAT is NP-complete for $k \geq 3$, where input is in CNF with $k$ literals per clause.

## Minimum Spanning Tree (MST)

A minimum spanning tree of a weighted, connected, undirected graph is a subset of edges that connects all vertices with the minimum possible total edge weight.

Forest is a collection of trees. A tree is an acyclic connected graph.

### Kruskal's Algorithm

Sort edges by weight. Add edges in order, skipping those that form a cycle. Use a union-find data structure. $O(E \log E)$

### Prim's Algorithm

Start from a vertex, grow the MST by adding the minimum weight edge connecting the tree to a new vertex. Use a priority queue. $O((V+E) \log V)$

## Union-Find Data Structure

Union-Find (Disjoint Set Union) is a data structure that keeps track of a partition of a set into disjoint subsets. It supports two main operations:

Union by rank and path compression are common optimizations.

1. **Find**: Determine which subset a particular element is in.
2. **Union**: Join two subsets into a single subset.

Applications:
- Detecting cycles in graphs.
- Kruskal's MST algorithm.
- Dynamic connectivity problems.

Time complexity: $O(\alpha(n))$ per operation, where $\alpha(n)$ is the inverse Ackermann function, which grows very slowly and is effectively constant for practical purposes.

## Hash Tables

Double hashing, chain hashing.

## BBST (Balanced Binary Search Trees)

AVL trees, Red-Black trees.

## Markov Chains

$N$ states, transition stochastic matrix $P$ where $P_{ij}$ is the probability of transitioning from state $i$ to state $j$.  
The sum of each row in $P$ is 1.  

$Pr(X_{t+1} = j | X_t = i) = P_{ij}$

Let $\mu_t$ (vector) be the state distribution at time $t$. Then $\mu_{t} = \mu_{t-1} P = \mu_0 P^{t}$.  

As $t \to \infty$, $P^{t}$ approaches a matrix with identical rows, and $\mu_t$ converges to a stationary (limiting) distribution $\pi$ such that $\pi = \pi P$. $P^t = \begin{bmatrix}\pi \\ \pi \\ \vdots \\ \pi\end{bmatrix}$.  
$\pi = \pi P$ means $\pi$ is a left eigenvector of $P$ with eigenvalue 1. Since $P$ is stochastic, 1 is the largest eigenvalue.

### Ergodic Markov Chains

If $\exists t$ such that all entries of $P^{t}$ are positive, then the Markov chain is ergodic. In the graph, for every pair of states $i, j$, there is a path from $i$ to $j$ of length $t$.

Theorem: For a finite ergodic Markov chain, there exists a unique stationary distribution $\pi$ with all positive entries.

A graph is ergodic iff it is irreducible and aperiodic.

1. **Irreducible** (strongly connected): for every pair of states $i, j$, there is a path from $i$ to $j$.
2. **Aperiodic** (non-bipartite): the gcd of the lengths of all cycles in the graph is 1.

If $P$ is symmetric ($P_{ij} = P_{ji}$), then the stationary distribution is uniform: $\pi_i = \frac{1}{N}$ for all $i$. If $\forall i, j: \pi_i P_{ij} = \pi_j P_{ji}$, then $\pi$ is the stationary distribution (detailed balance condition). $P$ is reversible with respect to $\pi$.

### PageRank (Google's Algorithm)

Method to measure the importance of web pages using a Markov chain model of web surfing.

$G = (V, E)$ is a directed graph where vertices are web pages and edges are hyperlinks.

Ideas:
1. number of citations -- in-degree. $\pi(y) = \text{in-degree}(y)$
2. every page $x$ has 1 citation to give, then each $y$ linked from $x$ gets $\frac{1}{\text{out-degree}(x)}$ citation from $x$. $\pi(y) = \sum\limits_{x \to y} \frac{1}{\text{out-degree}(x)}$
3. recursive definition: important pages are linked by other important pages. $\pi(y) = \sum\limits_{x \to y} \frac{\pi(x)}{\text{out-degree}(x)}$

$P(x, y) = \begin{cases} \frac{1}{\text{out-degree}(x)} & \text{if } x \to y \\ 0 & \text{otherwise} \end{cases}$

Lazy random surfer model: with probability $d (0.85)$ follow a link, with probability $1-d$ jump to a random page. This is ergodic because $\forall i, j: P_{ij} \geq \frac{1-d}{N} > 0$.  

$P = d \hat{P} + \frac{1-d}{N} J$ where $J$ is the all-ones matrix and $\hat{P}$ is the sparse matrix defined above.

## Perfect Hashing

Birthday paradox:  
Define $P(k)$ as the probability that $k$ people have distinct birthdays. Let $\alpha = \frac{1}{365}$. $P(k) = \frac{365}{365} \cdot \frac{364}{365} \cdots \frac{365-k+1}{365} = \prod\limits_{i=0}^{k-1} (1 - i \alpha)$.  
Since $e^{-x} = 1 - x + \frac{x^2}{2!} - \cdots \geq 1 - x$ for all $x$, $P(k) \leq \prod\limits_{i=0}^{k-1} e^{-i \alpha} = e^{-\alpha \sum\limits_{i=0}^{k-1} i} = e^{-\frac{k(k-1)}{2 \cdot 365}}$.  
For $k = 23$, $1 - P(23) \geq 0.5$; $1 - P(50) \geq 0.99$. For at least 23 people, the probability that at least two share a birthday is at least 50%.

In general, for $m$ possible values and $k$ items, if $k \geq \sqrt{2m\ln 2} \approx 1.177 \sqrt{m}$, then the probability of a collision is at least 0.5.

**Static** set $S$ of $n$ keys from a large universe $U$. Want $O(1)$ worst-case lookup time with $O(n)$ space.

Universal hash function $h(x) = ((ax + b) \mod p) \mod m$ where $p$ is a prime larger than $|U|$, $a \in \{1, \ldots, p-1\}$, $b \in \{0, \ldots, p-1\}$ chosen uniformly at random. For any two distinct keys $x \neq y$, $Pr(h(x) = h(y)) \leq \frac{1}{m}$.



1. Choose $m = n$. Use a universal hash function $h$ to map keys to $m$ slots. Expected number of collisions is $\leq \frac{n(n-1)}{2m} < \frac{n}{2}$. If there are collisions, rehash with a new $h$ until no collisions. Expected number of trials is 2. Total space is $O(n)$.

### Two-Level Scheme

- First level: choose a universal hash function $h$. Let $n_i$ be the number of keys hashed to slot $i$.
    - check if $\sum\limits_{i} n_i^2 \leq 4n$. If not, rehash with a new $h$ until it holds. Expected number of trials is 2.
- Second level: for each slot $i$ with $n_i$ keys, create a secondary hash table of size $m_i = n_i^2$ using a new universal hash function $h_i$. The expected number of collisions in this secondary table is $\leq \frac{n_i(n_i - 1)}{2 m_i} < \frac{1}{2}$. Rehash until no collisions. Expected number of trials is 2.
- Total space: $\sum\limits_{i} m_i = \sum\limits_{i} n_i^2$. We have $\sum\limits_{i} n_i^2 \leq 4n$. Thus total space is $O(n)$.
- Lookup: compute first-level hash to find slot $i$, then compute second-level hash to find the key in $O(1)$ time.

Proof that $\sum\limits_{i} n_i^2 \leq 4n$ with probability at least 0.5:
Expected value of $\sum\limits_{i} n_i^2 = \sum\limits_{i} E[n_i^2]$.  
$E[n_i^2] = Var(n_i) + (E[n_i])^2$.  
$E[n_i] = \frac{n}{m} = 1$.  
$Var(n_i) = n \cdot \frac{1}{m} \cdot (1 - \frac{1}{m}) = 1 - \frac{1}{m} < 1$.  
Thus $E[n_i^2] < 2$.  
So $E[\sum\limits_{i} n_i^2] < 2m = 2n$.  
By Markov's inequality, $Pr(\sum\limits_{i} n_i^2 \geq 4n) \leq \frac{E[\sum\limits_{i} n_i^2]}{4n} < \frac{2n}{4n} = \frac{1}{2}$.  
Therefore, $Pr(\sum\limits_{i} n_i^2 \leq 4n) \geq \frac{1}{2}$.
