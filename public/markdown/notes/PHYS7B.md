---
title: "PHYS 7B: Basic Physics II"
description: ""
time: "Tue Mar 31, 2026"
---

# PHYS 7B: Basic Physics II

## Table of Contents

## Gravitation

**Universal Law of Gravitation**:
$$
F_G = G \frac{m_1 m_2}{r^2}
$$
where $G \approx 6.67 \times 10^{-11} \, \text{N} \cdot \text{m}^2/\text{kg}^2 $ is the **gravitational constant**.

**Gravitational Field**:
$$
g = \frac{F_G}{m} = G \frac{M}{r^2}
$$

### Satellite Motion

For a satellite in circular orbit around a planet:
$$F_G = \frac{mv^2}{r} = G \frac{Mm}{r^2}$$
which leads to the orbital velocity:
$$v = \sqrt{\frac{GM}{r}}$$

$a_R = \frac{v^2}{r} = \frac{GM}{r^2} = g$ is the centripetal acceleration, which is equal to the gravitational acceleration at that radius.

The period of the satellite is:
$$T = \frac{2\pi r}{v} = 2\pi \sqrt{\frac{r^3}{GM}}$$
This is known as **Kepler's Third Law**.

### Escape Velocity

The escape velocity from a planet is the minimum velocity needed for an object to escape the gravitational pull of the planet without further propulsion:
$$v_{esc} = \sqrt{\frac{2GM}{R}}$$
where $R$ is the radius of the planet.

### Gravitational Potential Energy

The work against gravity to move a mass $m$ from a distance $r_1$ to $r_2$ is given by:
$$W = \int_{r_1}^{r_2} F_G \, dr = \int_{r_1}^{r_2} G \frac{Mm}{r^2} \, dr = G Mm \left( \frac{1}{r_2} - \frac{1}{r_1} \right)$$
The gravitational potential energy at a distance $r$ from a mass $M$ is, where $U(\infty) = 0$:
$$U(r) = -G \frac{Mm}{r}$$

The negative sign indicates that the potential energy is lower (more negative) when the masses are closer together, reflecting the attractive nature of gravity. The potential energy approaches zero as $r$ approaches infinity, which means that it takes an infinite amount of energy to separate the masses completely.

### Gravitational Potential
The gravitational potential $\Phi$ at a distance $r$ from a mass $M$ is defined as the gravitational potential energy per unit mass:
$$\Phi = \frac{U}{m} = -G \frac{M}{r}$$
The gravitational potential is a scalar quantity that represents the potential energy landscape created by a mass. It is negative because gravity is an attractive force, and it approaches zero as the distance from the mass increases. The gravitational potential can be used to calculate the work done by gravity when moving a mass from one point to another, as well as to determine the escape velocity and the behavior of objects in a gravitational field.