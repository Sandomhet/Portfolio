---
title: "CMPSC 111 - Numerical Linear Algebra"
description: "Solving systems of linear equations using LU decomposition and iterative methods like Jacobi and Gauss-Seidel."
time: "Fri Jun 6, 2025"
lang: "en"
---

# CMPSC 111 - Numerical Linear Algebra

## Table of Contents

- $Row(A)$: 
- $Col(A)$: linearly independent columns; non-zero pivots.
- $N(A)$: all the free variables. $\{x: Ax=0\}$
- $N(A^T)$: 

dim row(A) + dim N(A) = # columns  
dim Col(A) + dim N(A^T) = # rows  
dim Row(A) = dim Col(A)  

## Solving Systems of Linear Equations

$Ax = b$

### Dense Matrix using LU Decomposition

The LU algorithm decomposes A into a product of a lower triangular matrix L and an upper triangular matrix U, $A = LU$.  

$Ax = b$ can be solved by first solving $Ly = b$ for $y$ using forward substitution, and then solving $Ux = y$ for $x$ using backward substitution.

$$
\begin{aligned}
LUx &= b \\
Ly &= b \\
Ux &= y
\end{aligned}
$$

$L=\begin{bmatrix}
1 & 0 & 0 \\
l_{21} & 1 & 0 \\
l_{31} & l_{32} & 1
\end{bmatrix}$

$U=\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33}
\end{bmatrix}$

likely Gaussian elimination is used to perform the decomposition.  
If a pivot is zero, swap with the row with maximum absolute value below in that column.  
The case that matrix $b$ doesn't need to be swapped is when solving for permutations of $b$.

#### Permutation Matrix

A permutation matrix $P$ is obtained by permuting the rows of an identity matrix.

For permutations, $P^{-1} = P^T$.

$PA$ swaps the rows of $A$ according to $P$.  
$AP$ swaps the columns of $A$ according to $P$.  

$PA = LU$.  
$PAx = Pb$

## Sparse Matrix using Iterative Method 

### Jacobi Method

$x$ is initialized to an arbitrary vector, often the zero vector.

Repeat until convergence:  
For each $i$ from 1 to n:
<!-- $x_i^{new} = \frac{b_i - \sum_{j \neq i} a_{ij} x_j^{old}}{a_{ii}}$   -->
$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left(b_i - \sum\limits_{j \neq i} a_{ij} x_j^{(k)}\right)$$

$x^{(k+1)} = D^{-1}(b - Cx^{(k)})$  

```py
x = (b - C @ x) / d
```

### Gauss-Seidel Method

$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left(b_i - \sum\limits_{j=1}^{i-1} a_{ij} x_j^{(k+1)} - \sum\limits_{j=i+1}^{n} a_{ij} x_j^{(k)}\right)$$

### Conjugate Gradient Method

x is initialized to an arbitrary vector, often the zero vector.
$x_i = x_{i-1} + \alpha p_{i-1}$, where $\alpha$ is a step size and $p$ is the search direction.

### Error, Residual, and Condition Number

The norm of a vector $x$ is magnitude, defined as:
$$\|x\|_2 = \sqrt{x_1^2 + x_2^2 + ... + x_n^2}$$

The error is the difference between the true solution $x$ and the computed solution $\hat{x}$: $e = |x - \hat{x}|$.  
The relative error is $\frac{|x - \hat{x}|}{|x|}$.  

The residual is $r = |b - A\hat{x}|$.  
The relative residual is $\frac{|b - A\hat{x}|}{|b|}$.  

The condition number of a matrix $A$ is defined as $\kappa(A) = \|A\| \|A^{-1}\|$.  
If $\kappa(A) = 1$, then $A$ is perfectly conditioned.  
A low condition number indicates that the matrix is well-conditioned.  
A high condition number indicates that the matrix is ill-conditioned, meaning that small changes in the input can lead to large changes in the output.  


## Gradient Descent


Solving $Ax = b$ is equivalent to minimizing the quadratic function $f(x) = \frac{1}{2} x^T A x - b^T x$.  
The gradient of $f(x)$ is $\nabla f(x) = Ax - b$.  
The update rule is $x^{(k+1)} = x^{(k)} - \alpha \nabla f(x^{(k)})$, where $\alpha$ is the step size. $\alpha$ can be chosen using line search or fixed.

$A$ is:
    1. symmetric: $A = A^T$
    2. positive definite: $x^T A x > 0$ for all non-zero vectors $x$. $f$ is strictly convex, has a unique minimum.

$$
\begin{aligned}
f'(x) &= \lim\limits_{h \to 0} \frac{f(x+h) - f(x)}{h} \\
&= \lim\limits_{h \to 0} \frac{\frac{1}{2}(x+h)^T A (x+h) - b^T (x+h) - \left(\frac{1}{2} x^T A x - b^T x\right)}{h} \\
&= \lim\limits_{h \to 0} \frac{\frac{1}{2}(x^T A h + h^T A x + h^T A h) - b^T h}{h} \\
&= \lim\limits_{h \to 0} \frac{\frac{1}{2}(2 x^T A h + h^T A h) - b^T h}{h} \\
&= \lim\limits_{h \to 0} \left(x^T A - b^T + \frac{1}{2} h^T A\right) \\
&= x^T A - b^T \\
&= (Ax - b)^T
\end{aligned}
$$

$\nabla f(x) = (f'(x))^T = Ax - b$

how to choose $\alpha$?

$R^{[k]} = b - A x^{(k)} = -\nabla f(x^{(k)})$ is the residual at iteration $k$.  

$$\alpha = \frac{R^{[k]T} R^{[k]}}{R^{[k]T} A R^{[k]}}$$

$-\nabla f(x^{(k)})$ is orthogonal to $-\nabla f(x^{(k+1)})$.

$f(x + v) = f(x) + v^T\nabla f(x) + \frac{1}{2} v^T A v$

## QR Decomposition & Least Squares

works for any matrix, not just square matrices.

Given an overdetermined system $Ax = b$ (more equations than unknowns), we seek to minimize the residual $r = b - Ax$. 

For system that does not have an exact solution, we can find the best approximate solution using least squares (least squares solution).

The least squares solution minimizes the 2-norm of the residual:

$$\min_x \|r\|_2^2 = \min_x \|b - Ax\|_2^2$$

The normal equations are derived by setting the gradient of the objective function to zero:

$$A^T A x = A^T b$$

QR decomposition provides an alternative approach. We can decompose $A$ into an orthogonal matrix $Q$ and an upper triangular matrix $R$:

$$A = QR$$

### Orthogonal Matrix Properties

1. $Q$ is an orthogonal matrix: $Q^T Q = I = Q Q^T$
2. $|Qv| = |v|$ for any vector $v$ (rotation).
3. $k(Q) = 1$ (well-conditioned).
4. $|Q| = 1$ (determinant).
5. The columns are orthonormal vectors. (perpendicular and unit length)

### Solving Least Squares using QR Decomposition

Solve $Ax \approx b$ is equivalent to solving $|Ax - b| \approx 0$, which is equivalent to minimizing the residual $r = b - Ax$.

Substituting this into the normal equations gives:

$$Q^T Q R x = Q^T b$$

Since orthogonal matrices satisfy $Q^T Q = I = Q Q^T$, we have:

$$R x = Q^T b$$

Since $R$ is upper triangular, we can solve for $x$ using back substitution. (economy size U-solve)

### Algorithms for QR Decomposition

1. Find $Q$ and $R$
2. Compute $Q^T b$
3. Solve $Rx = Q^T b$ using back substitution

---

1. Gram-Schmidt Process
2. Householder Reflections
3. Givens Rotations

### Applications

1. Data Fitting

$y = kx + b$ (linear regression).  
Given data points $(x_i, y_i)$, we can set up the system $Ax = b$ where:
$$
A = \begin{bmatrix}
1 & x_1 \\
1 & x_2 \\
\vdots & \vdots \\
1 & x_n
\end{bmatrix}, \quad
x = \begin{bmatrix}
b \\
k
\end{bmatrix}, \quad
b = \begin{bmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{bmatrix}
$$
We can then use QR decomposition to find the least squares solution for $x$.
