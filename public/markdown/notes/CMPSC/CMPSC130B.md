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
- Divide and Conquer
    - [Divide and Conquer](https://www.sandomhet.com/blogs/divide-conquer)
- Fast Fourier Transform (FFT)
    - [Complex Numbers](https://www.sandomhet.com/blogs/complex)
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

<details>
<summary>Click here to see</summary>

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

</details>

## Master Theorem

For $T(n) = a T(\frac{n}{b}) + f(n)$ where $a \geq 1, b > 1$:
- If $f(n) = O(n^{\log_b a - \epsilon})$ for some $\epsilon > 0$, then $T(n) = \Theta(n^{\log_b a})$.
- If $f(n) = \Theta(n^{\log_b a} \log^k n)$ for some $k \geq 0$, then $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$.
- If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for some $\epsilon > 0$ and $a f(\frac{n}{b}) \leq c f(n)$ for some $c < 1$ and sufficiently large $n$, then $T(n) = \Theta(f(n))$.

### Recurrence Relations

$T(n) = aT(\frac{n}{b}) + O(n)$:
$$
T(n) = \begin{cases}
O(n) & \text{if } a < b \\
O(n \log n) & \text{if } a = b \\
O(n^{\log_b a}) & \text{if } a > b
\end{cases}
$$

## NP-Completeness

$poly(n) = O(n^c)$ for some constant $c$.

- **NP**: Class of decision (search) problems for which a given solution can be **verified** in polynomial time.
- **P**: Class of decision problems that can be **solved** in polynomial time. $P \subseteq NP$.
- **NP-Complete**: it is in NP and every problem in NP can be reduced to it in polynomial time. (e.g., Traveling Salesman, Knapsack, and SAT)
- **NP-Hard**: every problem in NP can be reduced to it in polynomial time, but it is not necessarily in NP itself. (e.g., Halting Problem and the Post Correspondence Problem)
- **P vs NP**: The question of whether every problem for which a solution can be verified in polynomial time can also be solved in polynomial time. It is widely believed that P ≠ NP, but this has not been proven.

Every planer graph can be colored with at most 4 colors (Four Color Theorem). However, determining if a general graph can be colored with 3 colors is NP-complete.

To prove a problem $A$ is NP-complete needs:
1. $A \in NP$.
2. $\forall B \in NP, B \to A$. (every problem in NP can be reduced to $A$ in polynomial time)
3. Alternatively, $C \to A$ for some known NP-complete problem $C$.

### k-SAT to 3-SAT Reduction

Generally, for a clause with $k$ literals $C = (x_1 \lor x_2 \lor \ldots \lor x_k)$, we can introduce $k-3$ new variables $y_1, y_2, \ldots, y_{k-3}$ and create the following $k-2$ clauses:
$$
C' = (x_1 \lor x_2 \lor y_1) \land (\bar y_1 \lor x_3 \lor y_2) \land (\bar y_2 \lor x_4 \lor y_3) \land \ldots \land (\bar y_{k-4} \lor x_{k-2} \lor y_{k-3}) \land (\bar y_{k-3} \lor x_{k-1} \lor x_k)
$$
$$
C \Leftrightarrow C'
$$
This construction ensures that the original clause is satisfied if and only if at least one of the new clauses is satisfied, thus preserving the satisfiability of the original formula while reducing it to 3-SAT.

### Independent Set, Clique, and Vertex Cover

$G = (V, E)$
- $S \subseteq V$ is an **independent set** if $\forall u, v \in S, (u, v) \notin E$. No edges between vertices in $S$.
- $S \subseteq V$ is a **clique** if $\forall u, v \in S, (u, v) \in E$. Every pair of vertices in $S$ is connected.
- $S \subseteq V$ is a **vertex cover** if $\forall (u, v) \in E, u \in S \lor v \in S$. Every edge in $E$ has at least one endpoint in $S$.

They are all NP-complete. Given a graph $G$ and an integer $k$:
- Independent Set problem: determine if there exists an independent set of size at least $k$ in $G$.
- Clique problem: determine if there exists a clique of size at least $k$ in $G$.
- Vertex Cover problem: determine if there exists a vertex cover of size at most $k$ in $G$.

#### 3SAT to Independent Set Reduction

Given a 3SAT formula $f$ with clauses $C_1, C_2, \ldots, C_m$ and variables $x_1, x_2, \ldots, x_n$, we can construct a graph $G$ as follows with $k = m$:
1. For each clause $C_i = (x_1 \lor x_2 \lor x_3)$, create vertices $v_{i1}, v_{i2}, v_{i3}$ for the literals $x_1, x_2, x_3$.
2. Connect vertices corresponding to literals in the same clause with edges. For example, connect $v_{i1}$, $v_{i2}$, and $v_{i3}$ with edges.
3. Connect vertices corresponding to complementary literals across different clauses. For example, if $v_{i1}$ corresponds to $x_1$ and $v_{j2}$ corresponds to $\bar{x}_1$, connect $v_{i1}$ and $v_{j2}$ with an edge.

#### Independent Set to Clique Reduction

Given a graph $G = (V, E)$, we can construct its complement graph $\bar{G} = (V, \bar{E})$ where $\bar{E} = \{(u, v) | (u, v) \notin E\}$. An independent set of size $k$ in $G$ corresponds to a clique of size $k$ in $\bar{G}$ because the vertices in the independent set are not connected by edges in $G$, which means they are fully connected by edges in $\bar{G}$, forming a clique.

#### Independent Set to Vertex Cover Reduction

Given $(G, k)$, construct the input $(G, n - k)$.  
$S \subseteq V$ is an independent set of size $\geq k$ in $G$ if and only if $V \setminus S$ is a vertex cover of size $\leq n - k$.

- **Forward:** If $S$ is an independent set, then no edge has both endpoints in $S$, so every edge $(u, v) \in E$ has at least one endpoint in $V \setminus S$. Thus $V \setminus S$ is a vertex cover.
- **Backward:** If $C = V \setminus S$ is a vertex cover, then every edge has an endpoint in $C$, so no edge has both endpoints in $S = V \setminus C$. Thus $S$ is an independent set.

### Knapsack (search version)

Given $N$ items with weights $w_i$ and values $v_i$, and maximum weight $W$, determine if there exists a subset of items such that the total weight is at most $W$ and the total value is at least $V$.

Subset-Sum Problem: Given integers $A = \{a_1, a_2, \ldots, a_n\}$ and a target integer $T$, determine if there exists a subset $S$ such that $\sum\limits_{a_i \in S} a_i = T$.

#### 3SAT to Subset-Sum Reduction

Overview: $2n+2m$ numbers with $n+m$ digits in base 10, where the first $n$ digits correspond to variables and the next $m$ digits correspond to clauses.
1. For each variable $x_i$, create two numbers $v_i$ and $v_i'$:
   - Both have a $1$ in variable digit $i$.
   - $v_i$ has a $1$ in clause digit $n+j$ for each clause $C_j$ where $x_i$ appears.
   - $v_i'$ has a $1$ in clause digit $n+j$ for each clause $C_j$ where $\bar x_i$ appears.
   - $v_i$ represents $x_i = \text{true}$; $v_i'$ represents $x_i = \text{false}$.
2. For each clause $C_j$, create two buffer numbers $s_j$ and $s_j'$, each with a $1$ only in clause digit $n+j$ and $0$ elsewhere.
3. Set the target $T$ to have a $1$ in each variable digit $1, \ldots, n$ and a $3$ in each clause digit $n+1, \ldots, n+m$.
4. The Subset-Sum problem is to find a subset of $\{v_i, v_i'\} \cup \{s_j, s_j'\}$ that sums to $T$.
   - **Correctness (forward):** A satisfying assignment picks exactly one of $v_i$ or $v_i'$ per variable, hitting 1 in every variable digit. Each satisfied clause contributes at least 1 to its clause digit; buffer numbers bring it up to exactly 3.
   - **Correctness (backward):** Any subset summing to $T$ must pick exactly one of $\{v_i, v_i'\}$ per variable (to hit 1 in digit $i$), defining a truth assignment. Each clause digit must reach 3 with at most 2 from buffer, so at least one chosen literal satisfies every clause.
   - Base 10 is used and no digit exceeds 5, so there is no carrying between digits.

Example:
$f = (x_1 \lor x_2 \lor \bar{x_3}) \land (\bar{x_1} \lor x_2 \lor x_3) \land (x_1 \lor \bar{x_2} \lor x_3)$

| Number \ Digit | 1 | 2 | 3 | 4 | 5 | 6 |
|--------|---|---|---|---|---|---|
| $v_1$  | 1 | 0 | 0 | 1 | 0 | 1 |
| $v_1'$ | 1 | 0 | 0 | 0 | 1 | 0 |
| $v_2$  | 0 | 1 | 0 | 1 | 1 | 0 |
| $v_2'$ | 0 | 1 | 0 | 0 | 0 | 1 |
| $v_3$  | 0 | 0 | 1 | 0 | 1 | 1 |
| $v_3'$ | 0 | 0 | 1 | 1 | 0 | 0 |
| $s_1$  | 0 | 0 | 0 | 1 | 0 | 0 |
| $s_1'$ | 0 | 0 | 0 | 1 | 0 | 0 |
| $s_2$  | 0 | 0 | 0 | 0 | 1 | 0 |
| $s_2'$ | 0 | 0 | 0 | 0 | 1 | 0 |
| $s_3$  | 0 | 0 | 0 | 0 | 0 | 1 |
| $s_3'$ | 0 | 0 | 0 | 0 | 0 | 1 |
| $T$    | 1 | 1 | 1 | 3 | 3 | 3 |

#### Subset-Sum to Knapsack Reduction

- For each integer $a_i$, create an item with weight $w_i = a_i$ and value $v_i = a_i$.
- Set the maximum weight $W = T$ and the target value $V = T$.

For a subset $S$ of items,
- $\sum\limits_{i \in S} w_i = \sum\limits_{i \in S} a_i \leq W = T$
- $\sum\limits_{i \in S} v_i = \sum\limits_{i \in S} a_i \geq V = T$.

Weight is at most $T$ and value is at least $T$ if and only if the sum of the selected integers is exactly $T$.

## Linear Programming

ILP (Integer Linear Programming) is NP-complete, while LP (Linear Programming) can be solved in polynomial time.

### Standard Form

Given:
- Variables: $x \in \mathbb{R}^n = (x_1, x_2, \ldots, x_n)$
- Coefficients (Objective Function): $c \in \mathbb{R}^n = (c_1, c_2, \ldots, c_n)$
- Constraints: $A \in \mathbb{R}^{m \times n} = (a_{ij})$, $b \in \mathbb{R}^m = (b_1, b_2, \ldots, b_m)$

Maximize:
$$
c_1 x_1 + c_2 x_2 + \ldots + c_n x_n
$$
Subject to:
$$
\begin{cases}
a_{11} x_1 + a_{12} x_2 + \ldots + a_{1n} x_n \leq b_1 \\
a_{21} x_1 + a_{22} x_2 + \ldots + a_{2n} x_n \leq b_2 \\
\vdots \\
a_{m1} x_1 + a_{m2} x_2 + \ldots + a_{mn} x_n \leq b_m \\
x_1 \geq 0, x_2 \geq 0, \ldots, x_n \geq 0
\end{cases}
$$

Generic form:

$$\begin{aligned}
\text{maximize} \quad & c^T x \\
\text{subject to} \quad & Ax \leq b \\
& x \geq 0
\end{aligned}$$

### Algorithms

- Simplex Algorithm: A popular method for solving linear programming problems. It is efficient in practice, but has exponential worst-case time complexity.
- Interior Point Methods: These algorithms approach the optimal solution from the interior of the feasible region and have polynomial time complexity in the worst case.
- Ellipsoid Algorithm: A theoretical algorithm that can solve linear programming problems in polynomial time, but is not efficient in practice.

#### Simplex Algorithm

**Feasible region**: The set of all points that satisfy all constraints. It's the intersection of half-spaces. It is a **convex polyhedron** in $n$-dimensional space.  
**Vertices (or extreme points)**: The corners of the feasible region. The optimal solution, if it exists, will occur at one of these vertices. The number of vertices is at most $\binom{n+m}{n}$, approximately $O((n+m)^n)$.

It operates on the vertices of the feasible region defined by the constraints. The algorithm proceeds as follows:
1. **Initialization**: Start at a vertex of the feasible region, which can be found using methods like the Big M method or the Two-Phase method.
2. **Iterative Improvement**: At each iteration, the algorithm checks the adjacent vertices of the current vertex to find one that improves the objective function. If such a vertex is found, the algorithm moves to that vertex and repeats the process.
3. **Termination**: The algorithm terminates when no adjacent vertex can improve the objective function, indicating that the optimal solution has been reached.
---

1. Renormalize so that $\bar{x} = \vec{0}$ is feasible.
2. If exists better neighbor, move to it and repeat until no better neighbor exists.

### LP Duality

The upper bound optimal value of the **primal** problem is $c^T x \leq V$. To find the tightest upper bound, we should minimize the $V \leq b^T y$.

Minimize the upper bound optimal value of the primal:
$$
b_1 y_1 + b_2 y_2 + \ldots + b_m y_m
$$
Subject to:
$$
\begin{cases}
a_{11} y_1 + a_{21} y_2 + \ldots + a_{m1} y_m \geq c_1 \\
a_{12} y_1 + a_{22} y_2 + \ldots + a_{m2} y_m \geq c_2 \\
\vdots \\
a_{1n} y_1 + a_{2n} y_2 + \ldots + a_{mn} y_m \geq c_n \\
y_1 \geq 0, y_2 \geq 0, \ldots, y_m \geq 0
\end{cases}
$$
Reasoning: For any feasible solution $x$ to the primal and any feasible solution $y$ to the dual, we have:
$$c^T x \leq y^T A x \leq y^T b$$

The dual problem to solve $y$ is:
$$
\begin{aligned}
\text{minimize} \quad & b^T y \\
\text{subject to} \quad & A^T y \geq c \\
& y \geq 0
\end{aligned}
$$

- **Weak Duality**: For any feasible solution $x$ to the primal and any feasible solution $y$ to the dual, $c^T x \leq b^T y$.
- **Strong Duality**: If the primal has an optimal solution, and the dual  also has an optimal solution, then $c^T x^* = b^T y^*$.

## RSA Cryptosystem

1. Choose two distinct large prime numbers $p$ and $q$.
2. Compute $N = p \cdot q$ and $\phi(N) = (p-1)(q-1)$.
3. Choose an integer $e$ such that $1 < e < \phi(N)$ and $\gcd(e, \phi(N)) = 1$.
4. Compute $d$ such that $d \equiv e^{-1} \mod \phi(N)$.
5. The public key is $(N, e)$ and the private key is $(N, d)$.

- To encrypt a message $m$ (where $0 \leq m < N$), compute the ciphertext $c = m^e \mod N$.
- To decrypt a ciphertext $c$, compute the original message $m = c^d \mod N$.