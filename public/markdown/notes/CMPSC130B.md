---
title: "CMPSC 130B Algorithms and Data Structures"
description: "Algorithm analysis and graph algorithms including maximum flow, linear programming, and NP-completeness."
time: "Mon Apr 1, 2026"
---

# CMPSC 130B

## Table of Contents

- Dynamic Programming
    - [Knapsack DP](https://www.sandomhet.com/blogs/knapsack)
    - [Longest Common Subsequence/Substring (LCS)](https://www.sandomhet.com/blogs/lcs)
    - [Longest Increasing Subsequence (LIS)](https://www.sandomhet.com/blogs/lis)
    - [Interval DP](https://www.sandomhet.com/blogs/interval)
    - [Shortest Path DP](https://www.sandomhet.com/blogs/path)
- Fast Fourier Transform (FFT)
    - [FFT](https://www.sandomhet.com/blogs/fft)
- NP-Completeness

## Fibonacci Numbers

$$
F(n) = \begin{cases}
0 & \text{if } n = 0 \\
1 & \text{if } n = 1 \\
F(n-1) + F(n-2) & \text{if } n > 1
\end{cases}
$$

Matrix form, which can be computed in logarithmic time using fast exponentiation:
$$
\begin{pmatrix}F_{n} \\ F_{n-1}
\end{pmatrix} =
\begin{pmatrix}1 & 1 \\ 1 & 0
\end{pmatrix}
\begin{pmatrix}F_{n-1} \\ F_{n-2}
\end{pmatrix} =
\begin{pmatrix}1 & 1 \\ 1 & 0
\end{pmatrix}^{n-1}
\begin{pmatrix}F_{1} \\ F_{0}
\end{pmatrix}
$$

$\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618$ is the golden ratio. $F_n$ can also be computed using Binet's formula:
$$
F(n) = \frac{\phi^n - (1 - \phi)^n}{\sqrt{5}}
$$

## Dynamic Programming

Classic DP problems include:
- **Longest Increasing Subsequence (LIS)**: Given an array of integers, find the length of the longest subsequence that is strictly increasing.
- **Knapsack Problem**: Given a set of items with weights and values, determine the maximum value that can be obtained with a given weight capacity.
- **Edit Distance**: Given two strings, find the minimum number of operations required to convert one string into the other, where allowed operations are insertion, deletion, or substitution of a single character.
- **Matrix Chain Multiplication**: Given a sequence of matrices, find the most efficient way to multiply them together.
- **0-1 Knapsack**: Given $N$ items with weights $w_i$ and values $v_i$, and maximum weight $W$, what is the maximum $\sum_{i=1}^{k} v_i$ for each subset of items of size $k$ while ensuring $\sum_{i=1}^{k} w_i \leq W$?
- **Subset Sum**: Given $N$ integers and $T$, determine whether there exists a subset of the given set whose elements sum up to $T$.
- **Counting Paths in a 2D Array**: Given $N$ and $M$, count all possible distinct paths from $(1, 1)$ to $(N, M)$, where each step is either from $(i, j)$ to $(i+1, j)$ or $(i, j+1)$.
- **Longest Common Subsequence**: Given strings $s$ and $t$, find the length of the longest string that is a subsequence of both $s$ and $t$.
- **Longest Path in a Directed Acyclic Graph (DAG)**: Finding the longest path in Directed Acyclic Graph (DAG).
- **Longest Palindromic Subsequence**: Finding the Longest Palindromic Subsequence (LPS) of a given string.
- **Rod Cutting**: Given a rod of length $n$ units, given an integer array cuts where cuts$[i]$ denotes a position you should perform a cut at. The cost of one cut is the length of the rod to be cut. What is the minimum total cost of the cuts?

## NP-Completeness

$poly(n) = O(n^c)$ for some constant $c$.

- **NP**: Class of decision (search) problems for which a given solution can be **verified** in polynomial time.
- **P**: Class of decision problems that can be **solved** in polynomial time. $P \subseteq NP$.
- **NP-Complete**: it is in NP and every problem in NP can be reduced to it in polynomial time. (e.g., Traveling Salesman Problem, Knapsack Problem, and Boolean Satisfiability Problem (SAT))
- **NP-Hard**: every problem in NP can be reduced to it in polynomial time, but it is not necessarily in NP itself. (e.g., Halting Problem and the Post Correspondence Problem)
- **P vs NP**: The question of whether every problem for which a solution can be verified in polynomial time can also be solved in polynomial time. It is widely believed that P ≠ NP, but this has not been proven.

Every planer graph can be colored with at most 4 colors (Four Color Theorem). However, determining if a general graph can be colored with 3 colors is NP-complete.

Classic problems:
- **3-SAT**: Given a Boolean formula in conjunctive normal form where each clause has exactly three literals, determine if there is an assignment of truth values to the variables that makes the formula true.
- **Subset Sum**: Given a set of integers and a target integer, determine if there exists a subset of the integers that sums to the target.
- **Traveling Salesman Problem (TSP)**: Given a list of cities and the distances between each pair of cities, find the shortest possible route that visits each city exactly once and returns to the origin city.
- **Knapsack Problem**: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.
- **Graph Coloring**: Given a graph and a number of colors, determine if the graph can be colored with the given number of colors such that no two adjacent vertices share the same color.
- **Hamiltonian Cycle**: Given a graph, determine if there exists a cycle that visits each vertex exactly once and returns to the starting vertex.
- **Clique Problem**: Given a graph and a number k, determine if there is a clique of size k in the graph.
