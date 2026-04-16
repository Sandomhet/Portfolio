---
title: "PHYS 7B: Basic Physics II"
description: "Notes for PHYS 7B: Basic Physics II, covering topics such as gravitation, oscillations, and wave motion."
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

### Geostationary Orbits

A geostationary orbit is a circular orbit around the Earth where the satellite's orbital period matches the Earth's rotation period (24 hours). The radius of a geostationary orbit can be found using Kepler's Third Law:
$$T^2 = \frac{4\pi^2 R^3}{GM}$$
$$R^3 = \frac{GMT^2}{4\pi^2}$$

## Oscillations

### Simple Harmonic Oscillator

Hooke's Law: $F_s = -kx$ where $k$ is the spring constant and $x$ is the displacement from equilibrium.
$$
\begin{aligned}
F &= ma \\
-kx &= m \frac{d^2x}{dt^2} \\
\frac{d^2x}{dt^2} + \frac{k}{m} x &= 0 \\
\omega &= \sqrt{\frac{k}{m}} \\
\end{aligned}
$$
The general solution to the equation of motion is:
$$x(t) = A \cos(\omega t + \phi)$$
where $A$ is the **amplitude**, $\omega$ is the **angular frequency**, and $\phi$ is the **phase** constant determined by initial conditions.
- Period: $ T = \frac{2\pi}{\omega} = 2\pi \sqrt{\frac{m}{k}}$.
- The total energy of the system is conserved and given by:
$$E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2 = \frac{1}{2}kA^2$$
Thus, $x^2 + \left( \frac{v}{\omega} \right)^2 = A^2$.

![](/markdown/images/image-5.png)
![](../images/image-5.png)

### Simple Pendulum

For small angles ($\theta \approx \sin \theta$):
$$
\begin{aligned}
F_\theta &= ma_\theta \\
-mg \sin \theta &= mL\alpha \\
-mg \sin \theta &= mL \frac{d^2\theta}{dt^2} \\
\frac{d^2\theta}{dt^2} + \frac{g}{L} \theta &= 0 \\
\omega &= \sqrt{\frac{g}{L}} \\
\end{aligned}
$$
where $L$ is the length of the pendulum and $g$ is the acceleration due to gravity.

The period is: $T = 2\pi \sqrt{\frac{L}{g}}$

### Physical Pendulum

For a physical pendulum, the moment of inertia $I$ and the distance $d$ from the pivot to the center of mass are used:

$$ \begin{aligned}
\tau &= I \alpha \\
-mgd \sin \theta &= I \frac{d^2\theta}{dt^2} \\
\frac{d^2\theta}{dt^2} + \frac{mgd}{I} \theta &= 0 \\
\omega &= \sqrt{\frac{mgd}{I}} \\
\end{aligned} $$
The period is: $T = 2\pi \sqrt{\frac{I}{mgd}}$

## Wave Motion

**Mechanical waves**: disturbances that propagate through a medium, transferring energy without transferring matter.

**Longitudinal waves**: particles of the medium oscillate parallel to the direction of wave propagation (e.g., sound waves).  
**Transverse waves**: particles of the medium oscillate perpendicular to the direction of wave propagation (e.g., waves on a string).

### Sinusoidal Wave

- **Crest**: the highest point of the wave.
- **Trough**: the lowest point of the wave.
- **Amplitude** ($A$): the maximum displacement of the wave from its equilibrium position. (the height of the crest or trough)
- **Wavelength** ($\lambda$): the distance between two consecutive crests or troughs.
- **Frequency** ($f$): the number of oscillations per unit time.
- **Period** ($T$): the time it takes for one complete oscillation, $T = \frac{1}{f}$.
- **Wave number** ($k$): the spatial frequency, $k = \frac{2\pi}{\lambda}$.
- **Angular frequency** ($\omega$): the temporal frequency of the wave, $\omega = 2\pi f = \frac{2\pi}{T}$.
- **Wave speed** ($v$): the speed at which the wave propagates through the medium, $v = \lambda f = \frac{\lambda}{T} = \frac{\omega}{k}$.

Snapshot
$$ y(x) = A \sin(kx + \phi) $$
Traveling wave
$$y(x, t) = A \sin(kx - \omega t + \phi)$$

### Classical Wave Equation

$$\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2} \frac{\partial^2 y}{\partial t^2}$$
$y$ is the wave function, $x$ is the spatial coordinate, $t$ is time, and $v$ is the wave speed. The left-hand side represents the spatial curvature of the wave, while the right-hand side represents the temporal curvature.

### Transverse Waves on a String

The wave speed on a string is given by:
$$v = \sqrt{\frac{F}{\mu}}$$
where $F$ is the tension force in the string and $\mu = \frac{dm}{dx}$ is the linear mass density.

### Coexisting Waves

**Principle of superposition**: when two or more waves overlap, the resulting wave is the sum of the individual waves.

- **Constructive interference**: when waves are **in phase**, their amplitudes add up, resulting in a larger amplitude.
- **Destructive interference**: when waves are **out of phase**, their amplitudes subtract, resulting in a smaller amplitude or complete cancellation.

### Wave Boundary

- **Fixed boundary**: the wave is reflected and inverted (phase change of $\pi$).
- **Free boundary**: the wave is reflected without inversion (no phase change).

### Standing Waves

- Incident wave: $y_i(x, t) = A \cos(kx - \omega t)$
- Reflected wave: $y_r(x, t) = -A \cos(kx + \omega t)$

Resulting wave: $y(x, t) = 2A \sin(kx) \sin(\omega t)$

$2A \sin(kx)$ is the amplitude of the standing wave, which varies with position $x$. The time-dependent part $\sin(\omega t)$ oscillates between -1 and 1, but the spatial part determines where the nodes and antinodes are located.

- **Nodes**: points where the amplitude is always zero (destructive interference).
- **Antinodes**: points where the amplitude is maximum (constructive interference).
The distance between adjacent nodes or antinodes is $\frac{\lambda}{2}$, and the distance between a node and the nearest antinode is $\frac{\lambda}{4}$.
