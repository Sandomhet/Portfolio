---
title: "MATH 6A Vector Calculus"
description: "Vector Calculus Cheatsheet"
time: "Thu Mar 20, 2025"
lang: "en"
---

# Vector Calculus

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
$ \vec{n} = \langle a, b, c \rangle $
$ \vec{n} = \vec{u} \times \vec{v} $
$ \vec{n} = \nabla f = f_r \times f_\theta $

Two planes are parallel when their normal vectors are parallel.

## Derivatives

$ \vec{v}(t)' = \langle \vec{x}(t)', \vec{y}(t)', \vec{z}(t)' \rangle $
$ \int\vec{v}(t) = \langle \int\vec{x}(t), \int\vec{y}(t), \int\vec{z}(t) \rangle $
$ (\vec{u}\cdot \vec{v})' = \vec{u}'\cdot \vec{v} + \vec{u}\cdot \vec{v}' $

Curvature
$ \kappa(t) = \frac{|\vec{v}(t)' \times \vec{v}(t)''|}{|\vec{v}(t)'|^3} $

Arc-length parameterization
$
s(t) = \int_{t_0}^t |\vec{r}(u)'|du \\
t = t(s)
$
Replace $ t $ with $ t(s) $
$ \vec{r}(t) $ -> $ \vec{r}(t(s)) = \vec{r}(s) $
$ \vec{r}(s)' = 1 $
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

$ \int_a^b d - c\ dx = \int_a^b \int_c^d 1 dydx $, then $ \int_a^b \int_c^d f(x, y)\ dydx $
Estimating: If $ g \le f \le h $, then $ \int\int_R g dA \le \int\int_R f dA \le \int\int_R h dA $

$
Jacobian =
\begin{vmatrix}
\frac{dx}{dr} & \frac{dy}{dr} \\
\frac{dx}{d\theta} & \frac{dy}{d\theta} \\
\end{vmatrix} = r
$
**Polar Coordinates**: $ \int_0^{2\pi}\int_0^R fr\ drd\theta $
**Cylindrical Coordinates**: $ \int_0^{2\pi}\int_0^R\int_{z_0}^{z_1} fr\ dzdrd\theta $

**Spherical Coordinates**
$ (x, y, z) = (r\sin\phi\cos\theta, r\sin\phi\sin\theta, r\cos\phi) $
The Jacobian is $ r^2\sin\phi $
$ \int_0^{\pi}\int_0^{2\pi}\int_0^R fr^2\sin\phi\ drd\theta d\phi $

### Line Integral

$ \vec{r}(t) = \langle x(t), y(t) \rangle, f(x, y) $
$ \int_a^b f(\vec{r}(t))|\vec{r}(t)'|dt $

$ \vec{F}(x, y) = \langle P(x, y), Q(x, y) \rangle $
$ \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}(t)'dt $
