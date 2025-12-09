---
title: "CMPSC 111 - Numerical Linear Algebra"
description: "Solving systems of linear equations using LU decomposition and iterative methods like Jacobi and Gauss-Seidel."
time: "Tue Dec 9, 2025"
---

# CMPSC 111 - Numerical Linear Algebra

## Table of Contents

- [Fundamental Subspaces of a Matrix](#fundamental-subspaces-of-a-matrix)
- [Direct Methods for Solving Systems of Linear Equations](#direct-methods-for-solving-systems-of-linear-equations)
  - [LU (Lower-Upper) Decomposition for Dense Matrix](#lu-lower-upper-decomposition-for-dense-matrix)
  - [QR Decomposition & Least Squares](#qr-decomposition--least-squares)
- [Iterative Methods for Sparse Matrix](#iterative-methods-for-sparse-matrix)
  - [Jacobi Method](#jacobi-method)
  - [Gauss-Seidel Method](#gauss-seidel-method)
  - [Conjugate Gradient Method](#conjugate-gradient-method)
- [Gradient Descent](#gradient-descent)

## Fundamental Subspaces of a Matrix

For a matrix $A \in \mathbb{R}^{m \times n}$:

| Subspace | Definition                                  | Dimension            |
| -------- | ------------------------------------------- | -------------------- |
| $\text{Row}(A)$   | Span of rows of $A$                         | $\text{rank}(A)$              |
| $\text{Col}(A)$   | Span of columns of $A$ with pivot positions | $\text{rank}(A)$              |
| $N(A)$   | Null space: ${x : Ax = 0}$, free variables  | $n - \text{rank}(A)$ |
| $N(A^T)$ | Left null space                             | $m - \text{rank}(A)$ |

$$
\begin{aligned}
\dim(\text{Row}(A)) = \dim(\text{Col}(A)) = \text{rank}(A) \\
\dim(\text{Row}(A)) + \dim(N(A)) = n \\
\dim(\text{Col}(A)) + \dim(N(A^T)) = m \\
\end{aligned}
$$

- $Row(A)$: linearly independent rows.
- $Col(A)$: linearly independent columns; non-zero pivots.
- $N(A)$: all the free variables. $\{x: Ax=0\}$
- $N(A^T)$: left null space, $\{y: A^Ty=0\}$

Find these subspaces for an example:
$A = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}$, $rref(A) = \begin{bmatrix}
1 & 0 & -1 \\
0 & 1 & 2 \\
0 & 0 & 0
\end{bmatrix}$
- $\text{Row}(A) = \text{span}\{[1, 0, -1], [0, 1, 2]\}$
- $\text{Col}(A) = \text{span}\{\begin{bmatrix}1 \\ 4 \\ 7\end{bmatrix}, \begin{bmatrix}2 \\ 5 \\ 8\end{bmatrix}\}$
- $N(A) = \text{span}\{\begin{bmatrix}1 \\ -2 \\ 1\end{bmatrix}\}$
- $N(A^T) = \text{span}\{[1, -2, 1]\}$

```py
A = sp.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
rref_A, pivots = A.rref()
row_space = rref_A.rowspace()
col_space = A.columnspace()
null_space = A.nullspace()
left_null_space = A.T.nullspace()
```

## Direct Methods for Solving Systems of Linear Equations 

### LU (Lower-Upper) Decomposition for Dense Matrix

Precondition: $A$ is a **square** matrix and **non-singular** (invertible).

$A = LU$ where $L$ is lower triangular and $U$ is upper triangular.

$L=\begin{bmatrix}
1 & 0 & 0 \\
l_{21} & 1 & 0 \\
l_{31} & l_{32} & 1
\end{bmatrix}$, 
$U=\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33}
\end{bmatrix}$

$Ax = b$ can be solved by first solving $Ly = b$ for $y$ using forward substitution, and then solving $Ux = y$ for $x$ using backward substitution.
$$
\begin{aligned}
Ax &= b \\
LUx &= b \\
Ly &= b \text{ (forward substitution) } \\
Ux &= y \text{ (backward substitution) } \\
\end{aligned}
$$

Computational Complexity: $O(n^3)$ for LU decomposition, $O(n^2)$ for forward and backward substitution.

### LU Decomposition with Partial Pivoting

Pivoting (row swapping) ensures numerical stability when a pivot element is zero or very small.  
Permutation matrix $P$ such that $PA = LU$.

#### Permutation Matrix

A permutation matrix $P$ is a square binary matrix that has exactly one entry of 1 in each row and each column and 0s elsewhere. It represents a reordering of the standard basis vectors.

**Properties of Permutation Matrix:**
1. $P$ is obtained by permuting the rows of an identity matrix.
2. Orthogonal: $P^{-1} = P^T$
3. $PA$ permutes the rows of $A$.
4. $AP$ permutes the columns of $A$.

```py
p = np.array([2, 0, 1])  # permutation vector
P = np.eye(3)[p]         # permutation matrix
b = np.random.rand(3)
A = np.random.rand(3,3)
# permuted b
b[p]
P @ b
# permuted A rows
A[p, :]
P @ A
# permuted A columns
A[:, p]
A @ P
```

#### Algorithm

$$
\begin{aligned}
Ax &= b \\
PAx &= Pb \\
LUx &= Pb \\
Ly &= Pb \text{ (forward substitution) } \\
Ux &= y \text{ (backward substitution) } \\
\end{aligned}
$$

```py
def LUsolve(A, b):
    L, U, p = cs111.LUfactor(A) # PA = LU
    y = cs111.Lsolve(L, b[p]) # Ly = Pb
    x = cs111.Usolve(U, y) # Ux = y
    return x
```

### QR Decomposition & Least Squares

Precondition: $A \in \mathbb{R}^{m \times n}$ with full column rank ($\text{rank}(A) = n$) and $m \geq n$. It's an **overdetermined** system (more equations than unknowns).

$A = QR$ where $Q$ is an **orthogonal** matrix and $R$ is an **upper triangular** matrix.

$Q=\begin{bmatrix}
q_{11} & q_{12} & q_{13} \\
q_{21} & q_{22} & q_{23} \\
\vdots & \vdots & \vdots \\
q_{m1} & q_{m2} & q_{m3}
\end{bmatrix}$,
$R=\begin{bmatrix}
r_{11} & r_{12} & r_{13} \\
0 & r_{22} & r_{23} \\
0 & 0 & r_{33} \\
\vdots & \vdots & \vdots \\
0 & 0 & 0
\end{bmatrix}$

Since an overdetermined system may not have an exact solution, we can find the best approximate solution using least squares (least squares solution).

Solve $Ax \approx b$ is equivalent to solving $|Ax - b| \approx 0$, which is equivalent to minimizing the residual $r = b - Ax$. The least squares solution minimizes the 2-norm of the residual:
$$\min_x \|r\|_2 = \min_x \|b - Ax\|_2$$

#### Orthogonal Matrix Properties

1. $Q^T Q = I = Q Q^T$
2. $|Qv| = |v|$ for any vector $v$ (rotation, norm preservation).
3. $k(Q) = 1$ (well-conditioned).
4. $|Q| = 1$ (determinant).
5. The columns are orthonormal vectors. (perpendicular and unit length)

#### Algorithm

$$
\begin{aligned}
Ax &= b \\
QR x &= b \\
Q^T Q R x &= Q^T b \\
R x &= Q^T b \\
\end{aligned}
$$

1. Find $Q, R$ such that $A = QR$.
2. Compute $Q^T b$.
3. Solve the upper triangular system $R x = Q^T b$ using back substitution. (U-solve, economy size)

Computational Complexity: $O(mn^2)$ for QR decomposition, $O(mn)$ for computing $Q^T b$, and $O(n^2)$ for back substitution.

Two versions of QR factorization:
- Full-size QR factorization: $Q$ is square (and big), $R$ is the same shape as $A$.
- Economic QR factorization: $Q$ is the same shape as $A$, $R$ is square (and small).

```py
def QRsolve(A, b):
    Q, R = scipy.linalg.qr(A, mode='economic') # A = QR
    b_hat = Q.T @ b # Q^T b
    x = cs111.Usolve(R, b_hat) # Rx = Q^T b
    return x
```

#### Methods to Compute QR Decomposition

1. Gram-Schmidt Process
2. Householder Reflections
3. Givens Rotations

#### Applications

**Data Fitting**

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

## Iterative Methods for Sparse Matrix

When $A$ is **large** and **sparse**, use iterative methods to save memory and computational resources.

### Error, Residual, and Condition Number

- **Vector 2-Norm** (Euclidean): $\|x\|_2 = \sqrt{\sum\limits_{i=1}^{n} x_i^2}$
- **Matrix 2-Norm** (Spectral): $\|A\|_2 = \max\limits_{x \neq 0} \frac{|Ax|}{|x|} = \max\limits_{\|x\|=1} \|Ax\|$ (How much $A$ stretches a vector)
- **Frobenius Norm**: $\|A\|_F = \sqrt{\sum\limits_{i=1}^{m} \sum\limits_{j=1}^{n} a_{ij}^2}$
- **Error**: $e = |x - \hat{x}|$ ($x$ is true solution, $\hat{x}$ is computed solution)
- **Relative Error**: $\frac{|x - \hat{x}|}{|x|}$
- **Residual**: $r = b - A\hat{x}$
- **Relative Residual**: $\frac{|b - A\hat{x}|}{|b|}$
- **Condition Number**: $\kappa(A) = \|A\| \|A^{-1}\|$. Explain why it matters.
    - If $\kappa(A)$ is large, the matrix is ill-conditioned, meaning small changes in $b$ can lead to large changes in the solution $x$.
    - If $\kappa(A)$ is small, the matrix is well-conditioned, and the solution $x$ is more stable with respect to changes in $b$.
    - If $\kappa(A)$ = 1, then $A$ is perfectly conditioned.
    - For $Ax = b$, $\hat{x} = x + e$ where $Ae = r$. Thus, $\frac{\|e\|}{\|x\|} \leq \kappa(A) \frac{\|r\|}{\|b\|}$.

```py
norm = npla.norm(x)
residual = npla.norm(b - A @ x)
relative_residual = npla.norm(b - A @ x) / npla.norm(b)
cond_number = npla.cond(A)
```

### Jacobi Method

Precondition: $A$ is **strictly diagonally dominant or symmetric positive definite**.

**Strictly diagonally dominant**: $|a_{ii}| > \sum\limits_{j \neq i} |a_{ij}|$ for all $i$.

Decompose $A = D + C$, where $D$ is the **diagonal** part and $C$ is the remainder.

$D = \begin{bmatrix}
a_{11} & 0 & \cdots & 0 \\
0 & a_{22} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & a_{nn}
\end{bmatrix}$,
$C = \begin{bmatrix}
0 & a_{12} & \cdots & a_{1n} \\
a_{21} & 0 & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & 0
\end{bmatrix}$

**Element-based formula**:
$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left(b_i - \sum\limits_{j \neq i} a_{ij} x_j^{(k)}\right)$$

**Matrix-based formula**:
$$x^{(k+1)} = D^{-1}(b - Cx^{(k)})$$

#### Algorithm

1. Initialize $x^{(0)}$ to an arbitrary vector, often the zero vector.
2. For $k = 0, 1, 2, ...$ until convergence:
   - Update each component of $x$ using the element-based formula.

```python
def jacobi(A, b, x0, tol=1e-10, max_iterations=1000):
    n = len(b)
    x = x0.copy()
    for k in range(max_iterations):
        x_new = x.copy()
        for i in range(n):
            sum_ax = sum(A[i][j] * x[j] for j in range(n) if j != i)
            x_new[i] = (b[i] - sum_ax) / A[i][i]
        if np.linalg.norm(x_new - x, ord=np.inf) < tol:
            return x_new
        x = x_new
    return x
```

### Gauss-Seidel Method

Precondition: $A$ is **strictly diagonally dominant or symmetric positive definite**.

Decompose $A = L + U$, where $L$ is the **lower triangular** part (including diagonal) and $U$ is the **upper triangular** part.

$L = \begin{bmatrix}
a_{11} & 0 & \cdots & 0 \\
a_{21} & a_{22} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}$,
$U = \begin{bmatrix}
0 & a_{12} & \cdots & a_{1n} \\
0 & 0 & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 0
\end{bmatrix}$

**Element-based formula**:
$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left(b_i - \sum\limits_{j < i} a_{ij} x_j^{(k+1)} - \sum\limits_{j > i} a_{ij} x_j^{(k)}\right)$$

**Matrix-based formula**:
$$x^{(k+1)} = L^{-1}(b - U x^{(k)})$$

#### Algorithm

1. Initialize $x^{(0)}$ to an arbitrary vector, often the zero vector.
2. For $k = 0, 1, 2, ...$ until convergence:
   - Update each component of $x$ using the element-based formula.

```python
def gauss_seidel(A, b, x0, tol=1e-10, max_iterations=1000):
    n = len(b)
    x = x0.copy()
    for k in range(max_iterations):
        x_new = x.copy()
        for i in range(n):
            sum1 = sum(A[i][j] * x_new[j] for j in range(i))
            sum2 = sum(A[i][j] * x[j] for j in range(i + 1, n))
            x_new[i] = (b[i] - sum1 - sum2) / A[i][i]
        if np.linalg.norm(x_new - x, ord=np.inf) < tol:
            return x_new
        x = x_new
    return x
```

### Conjugate Gradient Method

Precondition: $A$ is **symmetric positive definite**.

The iterative formula:
$$
x^{(k+1)} = x^{(k)} + \alpha_k p_k \\
\text{where} \\
\alpha_k = \frac{r_k^T r_k}{p_k^T A p_k} \\
r_{k+1} = r_k - \alpha_k A p_k \\
\beta_k = \frac{r_{k+1}^T r_{k+1}}{r_k^T r_k} \\
p_{k+1} = r_{k+1} + \beta_k p_k \\
$$
where $\alpha$ is a step size and $p$ is the search direction.

#### Algorithm

1. Initialize $x_0$ to an arbitrary vector, often the zero vector.
2. Compute initial residual: $r_0 = b - A x_0$
3. Set initial search direction: $p_0 = r_0$
4. For $k = 0, 1, 2, ...$ until convergence

```python
def conjugate_gradient(A, b, x0, tol=1e-10, max_iterations=1000):
    x = x0.copy()
    r = b - A @ x
    p = r.copy()
    for k in range(max_iterations):
        r_dot_r = r.T @ r
        Ap = A @ p
        alpha = r_dot_r / (p.T @ Ap)
        x_new = x + alpha * p
        r_new = r - alpha * Ap
        if np.linalg.norm(r_new) < tol:
            return x_new
        beta = (r_new.T @ r_new) / r_dot_r
        p = r_new + beta * p
        x = x_new
        r = r_new
    return x
```

### Comparison of Iterative Methods

| Method            | Precondition                        | Convergence Rate          | Memory Usage        |
|-------------------|------------------------------------|---------------------------|---------------------|
| Jacobi            | Strictly diagonally dominant or SPD | Slow                      | Low                 |
| Gauss-Seidel      | Strictly diagonally dominant or SPD | Faster than Jacobi         | Low                 |
| Conjugate Gradient| Symmetric positive definite         | Fast (depends on condition number) | Moderate (stores vectors) |

## Gradient Descent

Precondition: $A$ is **symmetric positive definite**.
1. symmetric: $A = A^T$
2. positive definite: $x^T A x > 0$ for all non-zero vectors $x$.

Solving $Ax = b$ is equivalent to minimizing the quadratic function $$f(x) = \frac{1}{2} x^T A x - b^T x$$  
$f$ is strictly convex, has a unique minimum.

The iterative formula:
$$
x^{(k+1)} = x^{(k)} - \alpha_k \nabla f(x^{(k)}) \\
\text{where} \\
\nabla f(x^{(k)}) = A x^{(k)} - b = -r_k \\
\alpha_k = \frac{r_k^T r_k}{r_k^T A r_k} \\
$$

Essentials: A transpose of a scalar is itself: $c^T = c$ for $c \in \mathbb{R}$.  

To derive the gradient $\nabla f(x)$:
$$
\begin{aligned}
f(x + v) &= \frac{1}{2} (x + v)^T A (x + v) - b^T (x + v) \\
&= \frac{1}{2} (x^T A x + x^T A v + v^T A x + v^T A v) - b^T x - b^T v \\
&\text{ Since } (x^T A v = (x^T A v)^T = v^T A^T x = v^T A x, b^T v = v^T b) \\
&= \frac{1}{2} (x^T A x + 2 v^T A x + v^T A v) - b^T x - v^T b \\
&= f(x) + v^T (A x - b) + \frac{1}{2} v^T A v \\
&= f(x) + v^T \nabla f(x) + \frac{1}{2} v^T A v \\
\end{aligned}
$$
$$
\begin{aligned}
f'(x) &= \lim\limits_{v \to 0} \frac{f(x + v) - f(x)}{v} \\
&= \lim\limits_{v \to 0} \frac{v^T (A x - b) + \frac{1}{2} v^T A v}{v} \\
&= \lim\limits_{v \to 0} \frac{(A x - b)^T v}{v} + \lim\limits_{v \to 0} \frac{\frac{1}{2}{v^T A v}}{v} \\
&= (A x - b)^T \\
\end{aligned}
$$
Thus, $\nabla f(x) = (f'(x))^T = Ax - b$.  
$-\nabla f(x^{(k)})$ is orthogonal to $-\nabla f(x^{(k+1)})$.  

The step size $\alpha_k$ is chosen to minimize $f(x^{(k+1)})$, which means $\frac{d}{d\alpha_k} f(x^{(k+1)}) = 0$:
$$
\begin{aligned}
\frac{d}{d\alpha_k} f(x^{(k+1)}) &= \frac{d}{d\alpha_k} f(x^{(k)} - \alpha_k \nabla f(x^{(k)})) \\
&= \frac{d}{d\alpha_k} f(x^{(k)} + \alpha_k r_k) \\
&= \frac{d}{d\alpha_k} \left( f(x^{(k)}) + \alpha_k r_k^T \nabla f(x^{(k)}) + \frac{1}{2} \alpha_k^2 r_k^T A r_k \right) \\
&= r_k^T \nabla f(x^{(k)}) + \alpha_k r_k^T A r_k \\
&= -r_k^T r_k + \alpha_k r_k^T A r_k \\
&= 0 \\
\end{aligned}
$$
Thus, $\alpha_k = \frac{r_k^T r_k}{r_k^T A r_k}$.

## SVD (Singular Value Decomposition)

Precondition: $A \in \mathbb{R}^{m \times n}$ (no restrictions).

$A = U \Sigma V^T$ where $U \in \mathbb{R}^{m \times m}$ and $V \in \mathbb{R}^{n \times n}$ are orthogonal matrices, and $\Sigma \in \mathbb{R}^{m \times n}$ is a diagonal matrix with non-negative real numbers on the diagonal (singular values).

$U=\begin{bmatrix}
\vdots & \vdots & \vdots & \vdots \\
u_1 & u_2 & \vdots & u_m \\
\vdots & \vdots & \vdots & \vdots
\end{bmatrix}$,
$V=\begin{bmatrix}
\cdots & v_1^T & \cdots \\
\cdots & v_2^T & \cdots \\
\cdots & \cdots & \cdots \\
\cdots & v_n^T & \cdots
\end{bmatrix}$,
$\Sigma=\begin{bmatrix}
\sigma_1 & 0 & \cdots & 0 & 0 \\
0 & \sigma_2 & \cdots & 0 & \vdots \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
0 & 0 & \cdots & \sigma_r & \vdots \\
0 & 0 & \cdots & 0 & 0 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
0 & 0 & \cdots & 0 & 0
\end{bmatrix}$
where $\sigma_1 \geq \sigma_2 \geq ... \geq \sigma_r > 0$ are the singular values of $A$, and $r = \text{rank}(A)$, the number of non-zero singular values.

$A = \sum\limits_{i=1}^r \sigma_i u_i v_i^T$ (outer product expansion).

1. If we keep all singular values, we get the exact reconstruction of $A$.
2. If we keep only the top $k (k < r)$ singular values, we get a rank-$k$ approximation of $A$, denoted as $A_k = \sum\limits_{i=1}^k \sigma_i u_i v_i^T$.
3. The rank-$k$ approximation $A_k$ minimizes the Frobenius norm of the error: $\|A - A_k\|_F$.

### Theorems

$AV = U \Sigma$.

$V$ responds a basis with $n$ columns. $AV$ takes the orthonormal basis vectors $v_i$ from the row space of $A$ and maps them to the orthonormal basis vectors $u_i$ from the column space of $A$, scaled by the singular values $\sigma_i$.
$A v_i = \sigma_i u_i$

Theorem:  
$\|A - A_k\|_2 = \sigma_{k+1} $

$\|A\|_F = \sqrt{\sum\limits_{i=1}^r \sigma_i^2}$.  
$\|A - A_k\|_F = \sqrt{\sum\limits_{i=k+1}^r \sigma_i^2}$.  

$$
\begin{aligned}
\|A\|_2 &= \max\limits_{x \neq 0} \frac{|Ax|}{|x|} \\
&= \max\limits_{|x|=1} |Ax| \\
&= \max\limits_{|x|=1} |U \Sigma V^T x| \\
&= \max |U \Sigma V^T| \\
% &= \max\limits_{|y|=1} | \Sigma y| \quad \text{(let } y = V^T x \text{)} \\
% &= \max\limits_{|y|=1} \sqrt{\sum\limits_{i=1}^r \sigma_i^2 y_i^2} \\
&= \sigma_1 \\
\end{aligned}
$$

$$
\|A\| = \|U \Sigma V^T\| = \|\Sigma\| = \sigma_1 \\
\|A^{-1}\| = \|V \Sigma^{-1} U^T\| = \|\Sigma^{-1}\| = \frac{1}{\sigma_r} \\
\kappa(A) = \|A\| \|A^{-1}\| = \frac{\sigma_1}{\sigma_r} \\
$$

The determinant of $A$ is the product of its singular values:
$$
|A| = \prod\limits_{i=1}^r \sigma_i
$$

### Math Proof

For two vectors $u \in \mathbb{R}^m$ and $v \in \mathbb{R}^n$,  
**Inner product**: $u^T v = \sum\limits_{i=1}^{n} u_i v_i = u \cdot v$ (scalar).  
**Outer product**: $uv^T = \begin{bmatrix}
u_1 v_1 & u_1 v_2 & \cdots & u_1 v_n \\
u_2 v_1 & u_2 v_2 & \cdots & u_2 v_n \\
\vdots & \vdots & \ddots & \vdots \\
u_m v_1 & u_m v_2 & \cdots & u_m v_n
\end{bmatrix}$ (rank-1 matrix). Thus, $(uv^T)_{ij} = u_i v_j$

$$
\begin{aligned}
(AB^T)_{ij} &= \sum\limits_{k=1}^{n} A_{ik} B^T_{kj} \\
&= \sum\limits_{k=1}^{n} A_{ik} B_{jk} \\
&= \sum\limits_{k=1}^{n} (a_k)_i (b_k)_j \\
\end{aligned}
$$
By definition of outer product, we have:
$$
\begin{aligned}
\left(\sum\limits_{k=1}^{n} a_k b_k^T\right)_{ij} &= \sum\limits_{k=1}^{n} (a_k b_k^T)_{ij} \\
&= \sum\limits_{k=1}^{n} (a_k)_i (b_k)_j \\
\end{aligned}
$$
Therefore, $AB^T = \sum\limits_{i=1}^{n} a_i b_i^T$ where $a_i$ and $b_i$ are the $i$-th columns of $A$ and $B$ respectively.

```py
np.dot(U[:, k], Vt[k, :])
np.outer(U[:, k], Vt[k, :])
```

### Image Compression

Suppose an image is $m \times n$ pixels, the storage is $m \times n$.  
With first $k$ terms in SVD, storage is $mk + nk + k = k(m + n + 1)$.  
Compression ratio: $\dfrac{mn}{k(m + n + 1)}$.

### Principal Component Analysis (PCA)

PCA is a dimensionality reduction technique that transforms data into a new coordinate system that helps us to reduce the number of features in a dataset while keeping the most important information.

For vectors $x, y \in \mathbb{R}^n$, the **Mean** $\mu = \frac{1}{n} \sum\limits_{i=1}^{n} x_i$. Define $r_x = \begin{bmatrix} \cdots \\ x_i - \mu \\ \cdots \end{bmatrix}$ as the deviation from the mean. Then there is the **Variance** $\sigma^2 = \frac{1}{n-1} \sum\limits_{i=1}^{n} (x_i - \mu)^2 = r_x^T r_x$, and the **Covariance** $\sigma = \frac{1}{n-1} \sum\limits_{i=1}^{n} (x_i - \mu_x)(y_i - \mu_y) = r_x^T r_y$.  

- $\sigma_{xy} > 0$: $x$ and $y$ are positively correlated, covary.
- $\sigma_{xy} < 0$: $x$ and $y$ are negatively correlated, anticovary.
- $\sigma_{xy} = 0$: $x$ and $y$ are uncorrelated.

The **Data matrix** $D \in \mathbb{R}^{m \times n}$, where $m$ is the number of **samples** and $n$ is the number of **features**.

The **Mean matrix** $M \in \mathbb{R}^{m \times n}$ with $\mu_j = \frac{1}{m} \sum\limits_{i=1}^{m} D_{ij}$ is the mean of feature $j$:
$M = \begin{bmatrix}
\mu_1 & \mu_2 & \cdots & \mu_n \\
\mu_1 & \mu_2 & \cdots & \mu_n \\
\vdots & \vdots & \ddots & \vdots \\
\mu_1 & \mu_2 & \cdots & \mu_n \\
\end{bmatrix}$

The **Centered data matrix** is $R = D - M$:
$R = \begin{bmatrix}
D_{11} - \mu_1 & D_{12} - \mu_2 & \cdots & D_{1n} - \mu_n \\
D_{21} - \mu_1 & D_{22} - \mu_2 & \cdots & D_{2n} - \mu_n \\
\vdots & \vdots & \ddots & \vdots \\
D_{m1} - \mu_1 & D_{m2} - \mu_2 & \cdots & D_{mn} - \mu_n \\
\end{bmatrix}$

The **Covariance matrix** $C \in \mathbb{R}^{n \times n}$ with $\sigma_{ij} = \text{Cov}(i, j) = \frac{1}{m-1} \sum\limits_{k=1}^{m} (D_{ki} - \mu_i)(D_{kj} - \mu_j)$ is the covariance between features $i$ and $j$, $C = \frac{1}{m-1} R^T R$ is symmetric:
$C = \begin{bmatrix}
\sigma_{11} & \sigma_{12} & \cdots & \sigma_{1n} \\
\sigma_{12} & \sigma_{22} & \cdots & \sigma_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
\sigma_{1n} & \sigma_{2n} & \cdots & \sigma_{nn} \\
\end{bmatrix}$

SVD: $C = U \Sigma U^T$ where $U$ contains the eigenvectors (principal components) and $\Sigma$ contains the eigenvalues (each singular value). $U = V$ since $C$ is symmetric. Each column vector $u_i$ represents a axis of the data.


**Formula**: $D = M + [R U]U^T$.  
**Approximation**: $D \approx M + [R U_k]U_k^T$ where $U_k$ contains the first $k$ columns of $U$. (dimension reduction)

Proof of the formula:
$$
\begin{aligned}
D - M &= R \\
&= R I \\
&= R (U U^T) \\
&= (R U) U^T \\
\end{aligned}
$$
Or by element-wise:  
Theorem: $v = (v \cdot i) i + (v \cdot j) j + (v \cdot k) k$ where $\{i, j, k\}$ form an orthonormal basis of $\mathbb{R}^3$.  

Let $r_{ij} = D_{ij} - \mu_j$. Since $\{u_j\}$ of $U$ form an orthonormal basis, $r_i = \sum\limits_{j=1}^{n} (r_i \cdot u_j^T) u_j^T = \sum\limits_{j=1}^{n} (r_i u_j) u_j^T$. [$(r_i u_j)$ is the scalar coefficient].  
Therefore, $R = (R U) U^T$.

#### Matrices and Tensors

A matrix is a 2-dimensional array of numbers, while a tensor is a multi-dimensional array of numbers. Tensors generalize matrices to higher dimensions.

### Application of SVD Eigenfaces

Eigenfaces are a set of eigenvectors used in the computer vision problem of human face recognition. They are derived from the covariance matrix of a set of facial images using Singular Value Decomposition (SVD).

Data matrix $D \in \mathbb{R}^{m \times n}$, where $m$ is the number of images and $n$ is the number of pixels in each image (flattened). For example, there are 400 images of size 64x64 pixels, then $m = 400$ and $n = 4096$.

For each pixel, we have the mean $\mu_j = \frac{1}{m} \sum\limits_{i=1}^{m} D_{ij}$ and variance $\sigma_j^2 = \frac{1}{m-1} \sum\limits_{i=1}^{m} (D_{ij} - \mu_j)^2$. Then we have the normal distribution of pixel values across all images: $N(\mu_j, \sigma_j^2)$. We can sample randomly from this distribution to create new pixel values for new face images.

what is eigenfaces?
1. Compute the mean face: $\mu = \frac{1}{m} \sum\limits_{i=1}^{m} D_i$ where $D_i$ is the $i$-th image vector.
2. Center the data: $X = D - \mu$.
3. Compute the covariance matrix: $C = \frac{1}{m-1} X^T X$.
4. Perform SVD on the covariance matrix: $C = U \Sigma U^T$.
5. The columns of $U$ are the eigenfaces.   

```py
def compute_eigenfaces(D, k):
    # D: data matrix of shape (m, n)
    # k: number of principal components to keep
    m, n = D.shape
    mu = np.mean(D, axis=0)  # mean face
    X = D - mu  # center the data
    C = np.cov(X, rowvar=False)  # covariance matrix
    U, S, Vt = np.linalg.svd(C)  # SVD
    eigenfaces = U[:, :k]  # top k eigenfaces
    return eigenfaces, mu
```
```py
def generate_new_face(eigenfaces, mu):
    k = eigenfaces.shape[1]
    coefficients = np.random.randn(k)  # random coefficients
    new_face = mu + eigenfaces @ coefficients  # generate new face
    return new_face
```

## Billiard Ball Simulation with Collision Detection

Conditions:
1. Undisturbed motion between collisions (constant velocity).
2. Perfectly elastic collisions (no energy loss).
3. No external forces (e.g., friction, gravity).
4. detect collisions between balls and walls, and between balls themselves.

Representation:
- position vector $\mathbf{p} = [x, y]$, velocity vector $\mathbf{v} = [v_x, v_y] = [\frac{dx}{dt}, \frac{dy}{dt}]$, radius $r$, and mass $m$.
- the distance between two balls is given by $d = |\mathbf{p_1} - \mathbf{p_2}| = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$.
- The walls of the billiard table are represented as lines with defined boundaries.

### Undisturbed Motion:  

- $x' = x + v_x dt$
- $y' = y + v_y dt$

### Collision with Walls:

1. Detect collision with walls:
    - Left Wall: $x' < x_{min} + r$
    - Right Wall: $x' > x_{max} - r$
    - Bottom Wall: $y' < y_{min} + r$
    - Top Wall: $y' > y_{max} - r$

2. Find the time of collision:
    - Left Wall: $dt_{l} = \frac{(x_{min} + r) - x}{v_x}$ if $v_x < 0$  
    - Right Wall: $dt_{r} = \frac{(x_{max} - r) - x}{v_x}$ if $v_x > 0$  
    - Bottom Wall: $dt_{b} = \frac{(y_{min} + r) - y}{v_y}$ if $v_y < 0$  
    - Top Wall: $dt_{t} = \frac{(y_{max} - r) - y}{v_y}$ if $v_y > 0$  
    - Choose the smallest positive $dt$ among these to determine the next collision time.

3. Adjust motion velocity:
    - Left or Right Wall: $v' = [-v_x, v_y]$
    - Bottom or Top Wall: $v' = [v_x, -v_y]$

### Collision between Balls:

1. Detect collision between balls:
    - For two balls with positions $\mathbf{p_1}$ and $\mathbf{p_2}$, and radii $r_1$ and $r_2$, a collision occurs if:
    $$|\mathbf{p_1} - \mathbf{p_2}| = \sqrt{(x_1' - x_2')^2 + (y_1' - y_2')^2} \leq r_1 + r_2$$

2. Find the time of collision:  
    - $dt = \dfrac{|\mathbf{p_1} - \mathbf{p_2}| - (r_1 + r_2)}{|\mathbf{v_1} - \mathbf{v_2}|}$  

<!-- - Solve the quadratic equation derived from the distance condition to find the time until collision.
which is given by:
$a = |\mathbf{v_1} - \mathbf{v_2}|^2$  
$b = 2 (\mathbf{p_1} - \mathbf{p_2}) \cdot (\mathbf{v_1} - \mathbf{v_2})$  
$c = |\mathbf{p_1} - \mathbf{p_2}|^2 - (r_1 + r_2)^2$  
- The time until collision $dt$ is given by the smallest positive root of the quadratic equation:
$$dt = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$$ -->

3. Adjust motion velocities upon collision:
    - Fact: $v = (v \cdot i) i + (v \cdot j) j$ for any coordinate system with orthonormal basis vectors $\mathbf{i}$ and $\mathbf{j}$.

    - The unit normal vector $\mathbf{n} = \frac{\mathbf{p_1} - \mathbf{p_2}}{|\mathbf{p_1} - \mathbf{p_2}|}$ at the point of collision.
    - The tangential vector $\mathbf{t} = [ -n_y, n_x ] $ is perpendicular to $\mathbf{n}$.

    - $v = (v \cdot n) n + (v \cdot t) t$ where $\mathbf{n}$ is the normal vector and $\mathbf{t}$ is the tangential vector at the point of collision.

    - $v_1 = [v_{1n}, v_{1t}]$ and $v_2 = [v_{2n}, v_{2t}]$, then $v_1' = [v_{2n}, v_{1t}]$ and $v_2' = [v_{1n}, v_{2t}]$.

