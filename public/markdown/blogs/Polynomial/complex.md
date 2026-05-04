---
title: "Complex Numbers"
description: ""
time: "Mon Feb 1, 2024"
---

# Complex Numbers

$z = a + bi$ where $a$ is the real part and $b$ is the imaginary part.

- **Addition**: $(a + bi) + (c + di) = (a+c) + (b+d)i$
- **Multiplication**: $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$
- **Conjugate**: $\overline{a + bi} = a - bi$
- **Magnitude**: $|a + bi| = \sqrt{a^2 + b^2}$

## Polar Form and Euler's Formula

**Euler's formula**: 
$$e^{i x} = \cos x + i \sin x$$

$(a, b) = (r \cos \theta, r \sin \theta)$ where $r = \sqrt{a^2 + b^2}$ and $\theta = \arctan(\frac{b}{a})$.  

$z = r (\cos \theta + i \sin \theta) = r e^{i \theta}$

- **Addition**: $z_1 + z_2 = r_1 e^{i \theta_1} + r_2 e^{i \theta_2}$
- **Multiplication**: $z_1 z_2 = r_1 r_2 e^{i (\theta_1 + \theta_2)}$
- **Power**: $z^n = r^n e^{i n \theta}$

## N-th Roots of Unity

The $n$-th roots of unity satisfy $z^n = 1$. These roots are evenly spaced on the unit circle in the complex plane, with each root corresponding to a point at an angle of $\frac{2\pi k}{n}$ radians from the positive real axis for $k = 0, 1, \ldots, n-1$. 

$$
\omega_n = (1, \frac{2\pi}{n}) = e^{i \frac{2\pi}{n}} = \cos(\frac{2\pi}{n}) + i \sin(\frac{2\pi}{n}) \\
and\\ 
\omega_n^k = (1, \frac{2\pi k}{n}) = e^{i \frac{2\pi k}{n}} = \cos(\frac{2\pi k}{n}) + i \sin(\frac{2\pi k}{n}) \\
$$

The **principal** $n$-th root of unity is $\omega_n = e^{i \frac{2\pi}{n}}$, and the other $n$-th roots of unity are given by $\omega_n^k$.

Properties:
- $\omega_n^n = 1$
- $\omega_n^{n/2} = -1$
- Square: $(\omega_n^{k})^2 = \omega_{n/2}^k$
- Conjugate: $\overline{\omega_n^k} = \omega_n^{-k}$
- Conjugate Symmetry: $\omega_n^k = -\omega_n^{k+\frac{n}{2}}$.
- Inverse: $\omega_n^{-k} = \omega_n^{n-k}$ and $\omega_n^k \cdot \omega_n^{-k} = 1$.