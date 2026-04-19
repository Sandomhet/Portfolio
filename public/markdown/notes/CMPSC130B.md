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
