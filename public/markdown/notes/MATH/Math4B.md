---
title: "MATH 4B Differential Equation"
description: "Differential Equation Cheatsheet"
time: "Tue Mar 18, 2025"
---

# Ordinary Differential Equation

$ y'=F(x,y) $, $ F(x, y)=0 $ are equilibrium solutions.

## Table of Contents

## Separable ODE

$ \frac{dy}{dx} = F(x, y) = \frac{P(x)}{Q(y)} $

$ \int Q(y)dy = \int P(x)dx + C $

## First Order Linear ODE

$ y' + p(x)y = q(x) $

### The Method of Integrating Factors

$ \mu(x) = e^{\int p(x)dx} $

$ y(x) = \frac{1}{\mu(x)} [\int \mu(x)q(x)dx + C] $

### Modeling

$ y' = ay + b $
$ y = (y_0 + \frac{b}{a})e^{ax} - \frac{b}{a} $

$ y' = ky $
$ y = y_0e^{kt} $

#### Logistic Equation

$ y' = ry(1-\frac{y}{L}) $

$ y = \frac{LA}{A+e^{-rt}}, A = \frac{y_0}{L-y_0} $

$ y = 0 $ is unstable
$ y = L $ is asymptotically stable

### Autonomous ODE

$ y'=F(y) $
$ y(t) = a, F(a)=0 $ are equilibrium solutions.

Phase Diagram:
The sign of $ F(y) $ indicates increasing or decreasing.

Classification of Equilibria:

1. $ F'(a) < 0 $ asymptotically stable
2. $ F'(a) > 0 $ unstable
3. $ F'(a) = 0 $ semi-stable or no conclusion

### Existence and Uniqueness Theorem for Linear ODE

$ y' + p(t)y = q(t), y(t_0) = y_0 $

$ p(t) $ and $ q(t) $ are continuous functions and $ t_0 $ is on that interval.

$ y' = F(t, y), y(t_0) = y_0 $

$ F, \frac{dF}{dy} $ are continuous.

Euler's Method
$ y = y_0 + F(x_0, y_0)(x - x_0) $

## Second Order Linear ODE

$ y'' + p(t)y' + q(t)y = g(t) $
$ p, q, g $ are continuous functions.

Constant Coefficients

### Homogeneous

$ ay'' + by' + cy = 0 $

Superposition Principle: $ y = c_1y_1 + c_2y_2 $, $ y = y_h + y_p $
Wronskian: $ W(y_1, y_2) = \begin{vmatrix} y_1(t_0) & y_2(t_0) \\ y_1'(t_0) & y_2'(t_0) \end{vmatrix} $
Characteristic Equation: $ ar^2 + br + c = 0 $

1. $ y = [e^{r_1t},\ e^{r_2t}] $
2. $ y = [e^{rt},\ te^{rt}] $
3. $ r = \lambda \pm i\mu $, then $ y = [e^{\lambda t}\cos\mu t,\ e^{\lambda t}\sin\mu t] $

Euler's Formula: $ e^{i\theta} = \cos\theta + i\sin\theta $, $ e^{i\pi} + 1 = 0 $

Amplitude and Phase Angle:

$$
c_1\cos(\omega t) + c_2\sin(\omega t) = A\cos(\omega t - \theta) \\
A = \sqrt{c_1^2 + c_2^2},\ \cos\theta = \frac{c_1}{\sqrt{c_1^2 + c_2^2}}
$$

### Inhomogeneous

#### Undetermined Coefficients

$ g(t) $ is

1. polynomial, $ y_p = A_0+A_1t+\dots+A_nt^n $
2. exponential, $ y_p = Ae^{\alpha t} $
3. trigonometric, $ y_p = A\sin\beta t + B\cos\beta t $

When exception happens, multiply by $ t $

#### Variation of Parameters

Assumption: $ v_1'y_1 + v_2'y_2 = 0 $

$ y_p = v_1y_1 + v_2y_2 $
$
W = y_1y_2' - y_2y_1' \\
v_1 = -\int\frac{y_2g}{W}dt \\
v_2 = \int\frac{y_1g}{W}dt \\
$

### Modelling

Spring Mass System: $ mx'' + rx' + kx = F(t) $
RLC Circuit: $ LQ'' + RQ' + \frac{1}{C}Q = E(t) $

High Order Linear ODE with constant coefficients are the same with second order.

## First Order Systems of ODEs

$ x' = Ax + g $

1. Matrix $A$'s eigenvalues and eigenvectors are $ r_1, v_1 $ and $ r_2, v_2 $
   $ x = [e^{r_1t}\vec{v_1},\ e^{r_2t}\vec{v_2}] $
2. $ r, v, u $
   $ (A-rI)u = v $
   $ x = [e^{rt}v, e^{rt}(tv + u)] $

3. $ r_{1,2} = \lambda\pm i\mu $ and $ \vec{v}_{1,2} = \vec{a}\pm i\vec{b} $, then
   $ x_1 = e^{\lambda t}[\cos(\mu t)\vec{a} - \sin(\mu t)\vec{b}] \\
   x_2 = e^{\lambda t}[\sin(\mu t)\vec{a} + \cos(\mu t)\vec{b}] $

Phase Portrait: test $ \begin{pmatrix} 1 \\ 0 \end{pmatrix} $, $ x_2' > 0 $: counterclockwise; $ x_2' < 0 $: clockwise
test the first column or $ A $, $ A_{2,1} > 0 $: counterclockwise; $ A_{2,1} < 0 $: clockwise

Stability of equilibria

- Real eigenvalues
    - $ r_1, r_2 < 0 $, asymptotically stable node
    - $ r_1, r_2 > 0 $, unstable node
    - $ r_1r_2 < 0 $, unstable saddle
- Complex eigenvalues
    - $ \lambda = 0 $, stable center
    - $ \lambda < 0 $, spiral sink
    - $ \lambda > 0 $, spiral source

High order linear DEs can be transformed to first order linear system.

### Nonhomogenous

If $ g $ is a constant vector, a particular equilibrium solution is $ x_p = -A^{-1}g $

#### Undetermined Coefficients

#### Variation of Parameters

The fundamental matrix of homogeneous is $ \Phi(t) $
$ \mu = \int \Phi^{-1}g dt $
$ x_p = \Phi \mu $

### Autonomous

$ \vec{x'} = A\vec{x} + \vec{g} = 0 $

The stability can be determined by $ A $

## Nonlinear Autonomous System of DEs

$
x' = f(x, y) \\
y' = g(x, y) \\
$
$
A =
\begin{bmatrix}
f_x(x_0, y_0) & f_y(x_0, y_0) \\
g_x(x_0, y_0) & g_y(x_0, y_0) \\
\end{bmatrix}
$

## Boundary Value Problem

$ y(a) = y_0, y(b) = y_1 $

nonhomogeneous has unique solution ↔ homogeneous has only trivial solution
nonhomogeneous has no/infinite solution ↔ homogeneous has nontrivial solution
