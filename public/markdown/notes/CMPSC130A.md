---
title: "CMPSC 130A"
description: "Algorithm analysis and graph algorithms including shortest path, 2-SAT, and minimum spanning tree."
time: "Fri Oct 19, 2025"
lang: "en"
---

# CMPSC 130A

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
