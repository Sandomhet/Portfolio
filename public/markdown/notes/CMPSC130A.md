---
title: "CMPSC 130A Algorithms and Data Structures"
description: "Algorithm analysis and graph algorithms including shortest path, 2-SAT, and minimum spanning tree."
time: "Mon Dec 8, 2025"
---

# CMPSC 130A

- [Graph Traversal](https://www.sandomhet.com/blogs/traversal).  
    - Depth-First Search (DFS)
    - Breadth-First Search (BFS)
- [Topological Sort](https://www.sandomhet.com/blogs/topo-sort).  
- [Connected Components](https://www.sandomhet.com/blogs/cc-scc).  
    - Connected Components (CCs)
    - Strongly Connected Components (SCCs)
- [2-SAT](https://www.sandomhet.com/blogs/2-sat).  
- [Shortest Path](https://www.sandomhet.com/blogs/shortest-path).  
    - Unweighted Graphs: BFS
    - Dijkstra's Algorithm
    - Bellman-Ford Algorithm
- [Minimum Spanning Tree](https://www.sandomhet.com/blogs/mst).  
    - Prim's Algorithm (like Dijkstra's)
    - Kruskal's Algorithm (uses Union-Find)
    - Cut Property (statement and proof)
- [Union-Find](https://www.sandomhet.com/blogs/union).  
- [Hash Tables](https://www.sandomhet.com/blogs/hash-table).  
    - Chain Hashing (best of 2)
    - Bloom Filter
    - Cuckoo Hashing
    - Perfect Hashing
- [Balanced Binary Search Trees](https://www.sandomhet.com/blogs/bbst).  
    - Binary Search Tree (BST)
    - AVL Tree

## Table of Contents

## Algorithm Analysis with Big-O

Common complexities: $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, $O(2^n)$, $O(n!)$.

- Big-O: $f(n) = O(g(n))$ if $\exists c > 0, n_0$ such that $\forall n \geq n_0: f(n) \leq c g(n)$. ($f(n) < g(n)$ upper bound)
- Big-Omega: $f(n) = \Omega(g(n))$ if $\exists c > 0, n_0$ such that $\forall n \geq n_0: f(n) \geq c g(n)$. ($f(n) > g(n)$ lower bound)
- Big-Theta: $f(n) = \Theta(g(n))$ if $\exists c_1, c_2 > 0, n_0$ such that $\forall n \geq n_0: c_1 g(n) \leq f(n) \leq c_2 g(n)$. ($f(n) = g(n)$ tight bound)

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
