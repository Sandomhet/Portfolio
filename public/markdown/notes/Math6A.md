---
title: "MATH 6A Vector Calculus"
description: "Vector Calculus Cheatsheet"
time: "Thu Mar 20, 2025"
---

# Multivariable Calculus

## Table of Contents

## Vector

Arclength of a curve:
$ L = \int_{a}^{b} \sqrt{(\frac{dx}{dt})^2 + (\frac{dy}{dt})^2} dt = \int_{a}^{b} \sqrt{1 + (\frac{dy}{dx})^2} dx $

Polar Coordinates:
$ r^2 = x^2 + y^2 \\
\theta = \tan^{-1}(\frac{y}{x}) $
$ (x, y) = (r\cos\theta, r\sin\theta) $

$ \vec{c}(t) = \vec{p_1} + t(\vec{p_2} - \vec{p_1}) $

### Dot Product

$ \vec{u} \cdot \vec{v}= |\vec{u}||\vec{v}|\cos\theta $
Parallel: $ \vec{u} \cdot \vec{v}= |\vec{u}||\vec{v}| $
Perpendicular: $ \vec{u} \cdot \vec{v}= 0 $

### Cross Product

$
\vec{u} = \langle x_1, y_1, z_1 \rangle \\
\vec{v} = \langle x_2, y_2, z_2 \rangle \\
\vec{u} \times \vec{v} = \langle y_1z_2-z_1y_2, z_1x_2-x_1z_2, x_1y_2-y_1x_2 \rangle \\
|\vec{u} \times \vec{v}|= |\vec{u}||\vec{v}|\sin\theta
$
The magnitude of the cross product is the area of a parallelogram formed by these two vectors.

## Plane Equation

$ ax + by + cz = d $  
$ \vec{p} = \vec{w} + s\vec{u} + t\vec{v} $

Parallel with:
$ ax + by + cz = 0 $  
$ \vec{p} = s\vec{u} + t\vec{v} $  

Move by $ \langle 2, 3, 4 \rangle $  
$ \vec{p} = \langle 2, 3, 4 \rangle + \vec{w} + s\vec{u} + t\vec{v} $  
$ a(x - 2) + b(y - 3) + c(z - 4) = d $  

Perpendicular:
$ \vec{n} = \langle a, b, c \rangle $.  
$ \vec{n} = \vec{u} \times \vec{v} $.  
$ \vec{n} = \nabla f = f_r \times f_\theta $.  

Two planes are parallel when their normal vectors are parallel.

## Derivatives

$ \vec{v}(t)' = \langle \vec{x}(t)', \vec{y}(t)', \vec{z}(t)' \rangle $.  
$ \int\vec{v}(t) = \langle \int\vec{x}(t), \int\vec{y}(t), \int\vec{z}(t) \rangle $.  
$ (\vec{u}\cdot \vec{v})' = \vec{u}'\cdot \vec{v} + \vec{u}\cdot \vec{v}' $.  

**Curvature**:
$$ \kappa(t) = \frac{|\vec{v}(t)' \times \vec{v}(t)''|}{|\vec{v}(t)'|^3} $$

Arc-length parameterization
$
s(t) = \int_{t_0}^t |\vec{r}(u)'|du \ \\
t = t(s)
$.  
Replace $ t $ with $ t(s) $,
$ \vec{r}(t) $ -> $ \vec{r}(t(s)) = \vec{r}(s) $;
$ \vec{r}(s)' = 1 $.  
Curvature is the same as acceleration.

## Partial Derivatives

Clairaut's Theorem:
The mixed partials with different orders are equal: $ f_{xy} = f_{yx} $

$ (fg)'''' = f''''g + 4f'''g' + 6f''g'' + 4f'g''' + fg'''' $

$ \frac{df}{dt} = \frac{df}{dx}\cdot \frac{dx}{dt} + \frac{df}{dy}\cdot \frac{dy}{dt} + \frac{df}{dz}\cdot \frac{dz}{dt} $

$
F(x, y, z) = 0 \\
\frac{dF}{dy}\cdot \frac{dy}{dz} + \frac{dF}{dz} = 0 \\
\frac{dy}{dz} = -\frac{F_z}{F_y} \\
$

$ f(x, y), x(u, v), y(u, v) $
$
\begin{bmatrix}
f_u & f_v
\end{bmatrix} =
\begin{bmatrix}
f_x & f_y
\end{bmatrix}
\begin{bmatrix}
x_u & x_v \\
y_u & y_v \\
\end{bmatrix}
$

## Optimization

Gradient vector: $ \nabla f(x, y) = \langle f_x, f_y \rangle $
Movement vector: $ \vec{v} = \langle dx, dy \rangle $

### Tangent Plane

$ dz = f_xdx + f_ydy = \nabla f\cdot \vec{v} $
$ \Delta z \approx f_x\Delta x + f_y\Delta y $
$ z = z_0 + f_x(x - x_0) + f_y(y - y_0) $

### Directional Derivative

$ Slope = \frac{rise}{run} = \frac{\nabla f\cdot \vec{v}}{|\vec{v}|} = \nabla f \cdot \vec{u} = |\nabla f||\vec{u}| \cos\theta $

Movement in the direction of the gradient has a maximum slope equal to the magnitude of the gradient.
Movement perpendicular to the gradient has a slope of 0.

### Critical Points

$ f(x, y) $, $ \nabla f = 0 $

Second Derivative Test
$
D(x_0, y_0) =
\begin{vmatrix}
f_{xx} & f_{xy} \\
f_{yx} & f_{yy} \\
\end{vmatrix} =
f_{xx}f_{yy} - {f_{xy}}^2
$
$ D > 0, f_{xx} > 0 $, relative minimum;
$ D > 0, f_{xx} < 0 $, relative maximum;
$ D < 0 $, saddle point;
$ D = 0 $, don't know.

### Lagrange Multipliers

Constraint function: $ g(x, y) = 0 $
$ \nabla f = \lambda \nabla g $
$
f_x = \lambda g_x \\
f_y = \lambda g_y \\
g(x, y) = 0
$

## Double Integrals

Over rectangular region $R = [a, b] \times [c, d]$, a ***Cartesian product*** of intervals.

Definition:
$$\int\int_R f(x, y) dA, \int\int_R f(x, y) dx\ dy$$

**Cavalieri's Principle** (the slice method):
$ \text{Volume} = \int_a^b A(x) dx $, where $ A(x) $ is the area of the cross section at $ x $.  
Therefore, we have,
$$ \begin{aligned}
\int\int_R f(x, y) dA &= \int_a^b \left( \int_c^d f(x, y) dy \right) dx \\
&= \int_c^d \left( \int_a^b f(x, y) dx \right) dy \\
\end{aligned} $$

**Fubini's Theorem**: If $ f $ is continuous on a rectangular region $ R $, then
$$ \int\int_R f(x, y) dA = \int_a^b \int_c^d f(x, y) dy\ dx = \int_c^d \int_a^b f(x, y) dx\ dy $$

If $f(x, y) = g(x)h(y)$, then
$$ \int\int_R f(x, y) dA = \left( \int_a^b g(x) dx \right) \left( \int_c^d h(y) dy \right) $$

Properties:
1. Any continuous function defined on a closed rectangle $R$ is integrable.
2. If the set of discontinuities lies on a finite union of graphs of continuous functions, then $f$ is integrable on $R$.

Mean Value Theorem for Double Integrals:
If $f$ is continuous on a closed, bounded region $R$ with area $A$, then there exists a point $(x_0, y_0)$ in $R$ such that
$$ \int\int_R f(x, y) dA = f(x_0, y_0) \cdot A(R) $$


### Theorems

$ \int_a^b d - c\ dx = \int_a^b \int_c^d 1 dydx $, then $ \int_a^b \int_c^d f(x, y)\ dydx $.  
Estimating: If $ g \le f \le h $, then $ \int\int_R g dA \le \int\int_R f dA \le \int\int_R h dA $

## Change of Coordinates

### Double Integral

$(x, y) \to (u, v)$ where $ x = f_x(u, v) $ and $ y = f_y(u, v) $

**Jacobian Determinant**:
$$ J = \frac{\partial(x, y)}{\partial(u, v)} =
\begin{vmatrix}
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \\
\end{vmatrix} = 
\frac{\partial x}{\partial u} \cdot \frac{\partial y}{\partial v} - \frac{\partial x}{\partial v} \cdot \frac{\partial y}{\partial u}
$$

The change of variables formula is:
$$ \int\int_R f(x, y)\ dx dy = \int\int_S f(f_x(u, v), f_y(u, v)) \left| \frac{\partial(x, y)}{\partial(u, v)} \right| du dv $$

### Triple Integral

$(x, y, z) \to (u, v, w)$ where $ x = f_x(u, v, w) $, $ y = f_y(u, v, w) $, and $ z = f_z(u, v, w) $

**Jacobian Determinant**:
$$ J = \frac{\partial(x, y, z)}{\partial(u, v, w)} =
\begin{vmatrix}
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} & \frac{\partial x}{\partial w} \\
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} & \frac{\partial y}{\partial w} \\
\frac{\partial z}{\partial u} & \frac{\partial z}{\partial v} & \frac{\partial z}{\partial w} \\
\end{vmatrix}
$$

The change of variables formula is:
$$ \int\int\int_R f(x, y, z)\ dx dy dz = \int\int\int_S f(f_x, f_y, f_z) \left| \frac{\partial(x, y, z)}{\partial(u, v, w)} \right| du dv dw $$

The Gaussian integral: $ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $

### Typical Coordinate Systems

#### Polar Coordinate $(r, \theta)$

$ (x, y) = (r\cos\theta, r\sin\theta) $, 
$ \frac{ \partial(x, y) }{ \partial(r, \theta) } = r $

$$ \int_0^{2\pi}\int_0^R f(r, \theta) r\ dr d\theta $$

#### Ellipse

$ (\frac{x}{a})^2 + (\frac{y}{b})^2 = R^2 $  

$ (x, y) = (ar\cos\theta, br\sin\theta) $, 
$ \frac{ \partial(x, y) }{ \partial(r, \theta) } = abr $

$$ \int_0^{2\pi}\int_0^R f(r, \theta) abr\ dr d\theta $$

#### Cylindrical Coordinate $(r, \theta, z)$

$ (x, y, z) = (r\cos\theta, r\sin\theta, z) $, 
$ \frac{ \partial(x, y, z) }{ \partial(r, \theta, z) } = r $

$$ \int_{z_0}^{z_1}\int_0^{2\pi}\int_0^R f(r, \theta, z) r \ dr d\theta dz $$

#### Spherical Coordinate $(r, \theta, \phi)$

$ (x, y, z) = (r\sin\phi\cos\theta, r\sin\phi\sin\theta, r\cos\phi) $, 
$ \frac{ \partial(x, y, z) }{ \partial(r, \theta, \phi) } = r^2\sin\phi $

$$ \int_0^{\pi}\int_0^{2\pi}\int_0^R f(r, \theta, \phi) r^2\sin\phi\ dr d\theta d\phi $$

## Line Integral (Path Integral)

Definition: Integrals over curves. 

$\vec{r}(t) = \langle x(t), y(t) \rangle, a \le t \le b \\
C $ is the curve parameterized by $ \vec{r}(t) $

$ds = |\vec{r}(t)'| dt \\
d\vec{r} = \vec{r}(t)' dt $
$$\int_C f(x, y) ds = \int_a^b f(\vec{r}(t)) |\vec{r}(t)'| dt $$
$$\int_C \vec{F} \cdot d\vec{r} = \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}(t)' dt $$

$ \vec{r}(t) = \langle x(t), y(t) \rangle, f(x, y) $.  
$ \int_a^b f(\vec{r}(t))|\vec{r}(t)'|dt $

$ \vec{F}(x, y) = \langle P(x, y), Q(x, y) \rangle $.  
$ \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}(t)'dt $

$T$ is the unit tangent vector to $C$ at the point $\vec{r}(t)$.
$ \vec{T} = \frac{\vec{r}(t)'}{|\vec{r}(t)'|} $

### Reparameterization

If $ C $ is parameterized by $ \vec{r}(t), a \le t \le b $ and also by $ \vec{p}(s), c \le s \le d $, where $ \vec{r}(t) = \vec{p}(g(t)) $ for some differentiable function $ g(t) $ with $ g(a) = c $ and $ g(b) = d $, then
$$ \int_C f(x, y) ds = \int_a^b f(\vec{r}(t)) |\vec{r}(t)'| dt = \int_c^d f(\vec{p}(s)) |\vec{p}(s)'| ds $$
$$ \int_C \vec{F} \cdot d\vec{r} = \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}(t)' dt = \int_c^d \vec{F}(\vec{p}(s)) \cdot \vec{p}(s)' ds $$

### Line Integrals of Gradient Fields

If $ \vec{F} = \nabla f $, then $ \int_C \vec{F} \cdot d\vec{r} = f(\vec{r}(b)) - f(\vec{r}(a)) $

## Images

Let A be a  matrix with det  and let  be the linear mapping of  to  given by  (matrix multiplication). Then  transforms parallelograms into parallelograms and vertices into vertices. Moreover, if  is a parallelogram,  must be a parallelogram.

A linear transformation matrix $A$ is ***one-to-one*** and ***onto*** if and only if $\det(A) \neq 0$.

$T$ maps $[0, 1] \times [0, 1]$ to the parallelogram spanned by the vectors $\langle a, c \rangle$ and $\langle b, d \rangle$. $T(u, v) = \langle au + bv, cu + dv \rangle$. The area of the parallelogram is $|\det(A)| = |ad - bc|$.

## Applications

### Average Value

The average value of $f$ over a region $R$ is given by
$$ f_{avg} = \frac{\int\int_R f(x, y) dx dy}{\int\int_R dx dy} $$

### Center of Mass

The total mass $M$ of a lamina with density function $\delta(x, y)$ over a region $R$ is given by
$$ M = \int\int_R \delta(x, y) dA $$

The center of mass $(\bar{x}, \bar{y})$ of a lamina with density function $\delta(x, y)$ over a region $R$ is given by
$$ \bar{x} = \frac{\int\int_R x \delta(x, y) dA}{M}, \quad \bar{y} = \frac{\int\int_R y \delta(x, y) dA}{M} $$

### Moment of Inertia

Moments of inertia about the coordinate axes with uniform density $ \delta $ are given by
$$ I_x = \delta \int\int\int_R (y^2 + z^2) dV, \quad I_y = \delta \int\int\int_R (x^2 + z^2) dV, \quad I_z = \delta \int\int\int_R (x^2 + y^2) dV $$

### Gravitational Force

The gravitational force exerted on a point mass $m$ located at the point $(x_0, y_0, z_0)$ by a solid region $R$ with density function $\delta(x, y, z)$ is given by
$$ \vec{F} = Gm \int\int\int_R \frac{\delta(x, y, z)}{r^2} \hat{r} dV $$
$$ |F| = Gm \int\int\int_R \frac{\delta(x, y, z)}{r} dV $$
where $G$ is the gravitational constant, $r$ is the distance from the point mass to the point $(x, y, z)$, and $\hat{r}$ is the unit vector pointing from $(x, y, z)$ to $(x_0, y_0, z_0)$.

### Isaac Newton's Breathtaking Proposition 71

A uniform spherical shell of mass $M$ exerts a gravitational force on a point mass $m$ located outside the shell as if all the shell's mass were concentrated at its center. If the point mass is located inside the shell, the net gravitational force exerted on it by the shell is zero.