# CS-165B HW1 Solutions

---

## Problem 1: Probability and Information Theory

### I. Probability

**(a)** X ~ Bernoulli(0.6), Y = 3X + 5

E[X] = 0.6, Var[X] = 0.6 × 0.4 = 0.24

$$E[Y] = 3E[X] + 5 = 3(0.6) + 5 = \mathbf{6.8}$$
$$\text{Var}[Y] = 9 \cdot \text{Var}[X] = 9(0.24) = \mathbf{2.16}$$

**(b)** X ~ N(0,1), Y = 2X + 3

$$E[Y] = 2(0) + 3 = \mathbf{3}$$
$$\text{Var}[Y] = 4 \cdot \text{Var}[X] = 4(1) = \mathbf{4}$$

---

### II. Bayes' Rule

**(a)** P(spam) = 0.2, P(offer|spam) = 0.4, P(offer|non-spam) = 0.05

$$P(\text{offer}) = 0.4(0.2) + 0.05(0.8) = 0.12$$
$$P(\text{spam}|\text{offer}) = \frac{0.4 \times 0.2}{0.12} = \frac{0.08}{0.12} = \mathbf{\frac{2}{3} \approx 0.667}$$

**(b)** P(R|A) = 2/5, P(R|B) = 4/5, P(A) = P(B) = 0.5

$$P(R) = 0.5 \cdot \frac{2}{5} + 0.5 \cdot \frac{4}{5} = 0.6$$
$$P(B|R) = \frac{(4/5)(0.5)}{0.6} = \frac{0.4}{0.6} = \mathbf{\frac{2}{3} \approx 0.667}$$

---

### III. Information Theory

**(a)** Definitions (all logs are base 2 or natural log, consistently):

$$H(P) = -\sum_x P(x)\log P(x)$$
$$H(P,Q) = -\sum_x P(x)\log Q(x)$$
$$D_{KL}(P \| Q) = \sum_x P(x)\log\frac{P(x)}{Q(x)}$$

**(b)** Relationship:

$$H(P,Q) = H(P) + D_{KL}(P \| Q)$$

Derivation:
$$H(P,Q) = -\sum_x P(x)\log Q(x) = -\sum_x P(x)\log P(x) + \sum_x P(x)\log\frac{P(x)}{Q(x)} = H(P) + D_{KL}(P\|Q)$$

---

## Problem 2: Linear Algebra

### I. Matrix Norms

**(a)** Frobenius norm of A = [[1,2],[3,4]]:

$$\|A\|_F = \sqrt{1^2+2^2+3^2+4^2} = \sqrt{30} \approx 5.477$$

**(b)** 1-norm of B = [[-1,2],[3,-4]] (max absolute column sum):

Col 1: |-1|+|3| = 4, Col 2: |2|+|-4| = 6 → **||B||₁ = 6**

**(c)** ∞-norm of C = [[5,-2,3],[1,0,-1]] (max absolute row sum):

Row 1: 5+2+3 = 10, Row 2: 1+0+1 = 2 → **||C||∞ = 10**

---

### II. Matrix Multiplication

**(a)**

$$AB = \begin{bmatrix}1&2\\3&4\end{bmatrix}\begin{bmatrix}2&0\\1&3\end{bmatrix} = \begin{bmatrix}4&6\\10&12\end{bmatrix}$$

**(b)** No, matrix multiplication is not commutative. Using the same A and B:

$$BA = \begin{bmatrix}2&0\\1&3\end{bmatrix}\begin{bmatrix}1&2\\3&4\end{bmatrix} = \begin{bmatrix}2&4\\10&14\end{bmatrix} \neq AB$$

**(c)**

$$Ax = \begin{bmatrix}2&1\\0&3\end{bmatrix}\begin{bmatrix}4\\-1\end{bmatrix} = \begin{bmatrix}7\\-3\end{bmatrix}$$

---

### III. Gradients

**(a)** f(x,y) = 3x² + 2xy + y²

$$\frac{\partial f}{\partial x} = 6x + 2y, \qquad \frac{\partial f}{\partial y} = 2x + 2y$$

**(b)** f(x) = ||Ax - b||²₂ = (Ax-b)ᵀ(Ax-b)

Expand: xᵀAᵀAx - 2bᵀAx + bᵀb

$$\nabla_x f = 2A^\top Ax - 2A^\top b = 2A^\top(Ax - b)$$

**(c)** At x = [1,1]ᵀ:

$$Wx = \begin{bmatrix}1&-1\\0&2\end{bmatrix}\begin{bmatrix}1\\1\end{bmatrix} = \begin{bmatrix}0\\2\end{bmatrix}$$

σ'(Wx) = [0, 1] (ReLU derivative; first element is 0 since z=0 by convention)

Using the chain rule ∂f/∂x = Wᵀ(v ⊙ σ'(Wx)):

$$v \odot \sigma'(Wx) = \begin{bmatrix}3\\-2\end{bmatrix} \odot \begin{bmatrix}0\\1\end{bmatrix} = \begin{bmatrix}0\\-2\end{bmatrix}$$

$$\frac{\partial f}{\partial x} = W^\top \begin{bmatrix}0\\-2\end{bmatrix} = \begin{bmatrix}1&0\\-1&2\end{bmatrix}\begin{bmatrix}0\\-2\end{bmatrix} = \mathbf{\begin{bmatrix}0\\-4\end{bmatrix}}$$

---

## Problem 3: Optimization

### I. Gradient Descent

**(a)** No — since grad² ≥ 0 always, the update w = w − η·grad² always decreases w regardless of the gradient's sign, so it doesn't follow the true gradient direction and can increase the loss.

**(b)** Described below (you need to draw these on the loss curve diagram from the homework):

- **Too small η**: The trajectory takes tiny steps, moving very slowly toward the minimum, essentially crawling along the curve.
- **Suitable η**: The trajectory descends smoothly and converges to the minimum in a reasonable number of steps.
- **Too large η**: The trajectory overshoots the minimum repeatedly, oscillating back and forth and potentially diverging.

---

### II. Overfitting/Underfitting

**(a)** Model A is overfitting because its 35-point gap between training and validation accuracy indicates it memorized the training data rather than learning generalizable patterns; Model B is better for generalization.

**(b)** The phenomenon is **overfitting**. Two ways to avoid it:
1. L2 (or L1) regularization
2. Early stopping (stop training when validation loss starts rising)

---

## Problem 4: Classification

### I. Ranking Classifier

Ranking: x2(+), x3(+), x1(+), x5(+), **x13(-)**, x6(+), x8(+), x7(+), x9(+), x10(+), x12(+), x11(+), **x15(-)**, x4(+), **x14(-)**, x21(-), x17(-), x20(-), x18(-), x22(-), x16(-), x19(-), x25(-), x23(-), x24(-)

**(a)** A ranking error = a negative ranked above a positive.

- x13(-) at position 5: positives ranked below = x6, x8, x7, x9, x10, x12, x11, x4 → **8 errors**
- x15(-) at position 13: positives ranked below = x4 → **1 error**
- x14(-) at position 15: no positives ranked below → **0 errors**

**Total ranking errors = 9**

**(b)** Total (positive, negative) pairs = 12 × 13 = 156

$$\text{Error rate} = \frac{9}{156} = \frac{3}{52} \approx 0.0577$$

**(c)** Coverage curve plots (# negatives covered, # positives covered) as you scan the ranked list:

| Step | Neg covered | Pos covered |
|------|------------|------------|
| Start | 0 | 0 |
| x2,x3,x1,x5 (+) | 0 | 4 |
| x13 (−) | 1 | 4 |
| x6,x8,x7,x9,x10,x12,x11 (+) | 1 | 11 |
| x15 (−) | 2 | 11 |
| x4 (+) | 2 | 12 |
| x14,x21,...,x24 (−) | 13 | 12 |

The curve rises steeply upward (positives) at the start, has a short rightward step at x13, then continues up, then becomes a flat horizontal line to (13,12) at the end.

---

### II. Linear Classifier

Discriminant: 3x₁ + 2x₂ + 4x₃ = 18, norm = √(9+4+16) = **√29**

**(a)** Loss functions (where m = margin):

- **0-1 loss**: L = 1 if m ≤ 0, else 0
- **Hinge loss**: L = max(0, 1 − m)
- **Squared loss (clamped)**: L = (1 − m)² if m ≤ 1, else 0

**(b)**

**Point (2,2,3), y = +1:**
Score = 6+4+12 = 22

$$m = \frac{(22-18)}{\sqrt{29}} \cdot (+1) = \frac{4}{\sqrt{29}} \approx 0.742$$

| Metric | Value |
|--------|-------|
| Margin | 4/√29 ≈ 0.742 |
| 0-1 loss | 0 |
| Hinge loss | 1 − 4/√29 ≈ 0.258 |
| Squared loss | (1 − 4/√29)² ≈ 0.067 |

**Point (3,3,1), y = −1:**
Score = 9+6+4 = 19

$$m = \frac{(19-18)}{\sqrt{29}} \cdot (-1) = \frac{-1}{\sqrt{29}} \approx -0.186$$

| Metric | Value |
|--------|-------|
| Margin | −1/√29 ≈ −0.186 |
| 0-1 loss | 1 |
| Hinge loss | 1 + 1/√29 ≈ 1.186 |
| Squared loss | (1 + 1/√29)² ≈ 1.407 |

---

### III. Classification Basic

From the test set: TP = 1750, FN = 250, FP = 250, TN = 7750

**(a)**
$$\text{Accuracy} = \frac{1750+7750}{10000} = \mathbf{95\%}, \quad \text{Error rate} = \mathbf{5\%}$$

**(b)**
$$\text{FPR} = \frac{250}{8000} = \mathbf{3.125\%}, \quad \text{FNR} = \frac{250}{2000} = \mathbf{12.5\%}$$

**(c)**
$$\text{TPR} = \frac{1750}{2000} = \mathbf{87.5\%}, \quad \text{TNR} = \frac{7750}{8000} = \mathbf{96.875\%}$$

**(d)** Precision = 1750/2000 = 0.875, Recall = 0.875

$$F_1 = \frac{2 \times 0.875 \times 0.875}{0.875+0.875} = \mathbf{0.875}$$

---

## Problem 5: Decision Tree Coding

This requires running the notebook. The key things to implement are typically: the Gini impurity or entropy splitting criterion, recursive tree building, and prediction. If you share the notebook code with the missing sections, I can fill them in for you.