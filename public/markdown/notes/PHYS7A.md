---
title: "PHYS 7A: Basic Physics I"
description: ""
time: "Mon Jan 5, 2026"
---

# PHYS 7A: Basic Physics I

## Table of Contents

1. Classical Mechanics
2. Quantum Mechanics
3. Relativistic Mechanics
4. Quantum Field Theory

## Motion

Define the origin to have a coordinate system. The position vector: $\vec{x}$.

**Distance**: total length of the path traveled.  
**Displacement**: how far moved from initial position, regardless of path taken. It has both ***magnitude*** and ***direction***, which is a vector. $\Delta x = x_2 - x_1$

**Speed**: scalar, how fast an object is moving. $speed = \frac{distance}{time}$  
**Velocity**: vector, rate of change of displacement. $velocity = \frac{displacement}{time}$
- *Average velocity*: $\bar{v} = \frac{\Delta x}{\Delta t}$. It is the ***slope*** between two points.
- *Instantaneous velocity*: $v = \lim\limits_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt}$. It is the ***slope*** of the ***tangent line*** at a point.

**Acceleration**: vector, rate of change of velocity.
- *Average acceleration*: $\bar{a} = \frac{\Delta v}{\Delta t}$
- *Instantaneous acceleration*: $a = \lim\limits_{\Delta t \to 0} \frac{\Delta v}{\Delta t} = \frac{dv}{dt} = \frac{d^2x}{dt^2}$

Position function: $x(t)$  
Velocity function: $v(t) = \frac{dx}{dt}$  
Acceleration function: $a(t) = \frac{dv}{dt} = \frac{d^2x}{dt^2}$

### 1D Kinematics with Constant Acceleration

1. $v_t = v_0 + at$
2. $x_t = x_0 + v_0t + \frac{1}{2}at^2$
3. $v_t^2 - v_0^2 = 2a(x_t - x_0) = 2a\Delta x$
4. $x_t = x_0 + \frac{1}{2}(v_0 + v_t)t$

### Free Fall

All objects fall with the same constant gravitational acceleration $g \approx 9.81 m/s^2$ downward, neglecting air resistance.

Simple free fall:
1. $v_t = gt$
2. $y_t = \frac{1}{2}gt^2$
3. $v_t^2 = 2gy_t$
4. $y_t = \frac{1}{2}vt$

General free fall:
1. $v_t = v_0 - gt$
2. $y_t = y_0 - \frac{1}{2}gt^2$
3. $v_t^2 - v_0^2 = -2g(y_t - y_0) = -2g\Delta y$
4. $y_t = y_0 + \frac{1}{2}(v_0 + v_t)t$

### 1D Kinematics with Varying Acceleration

- $v(t) = v_0 + \int_{t_0}^{t} a(t) dt$
- $x(t) = x_0 + \int_{t_0}^{t} v(t) dt$

### 2D Kinematics

### Projectile Motion

- Initial velocity components:
  - $v_{0x} = v_0 \cos \theta$
  - $v_{0y} = v_0 \sin \theta$
- Horizontal motion: constant velocity
  - $v_x(t) = v_{0x}$
  - $x(t) = x_0 + v_{0x}t$
- Vertical motion: constant acceleration
  - $v_y(t) = v_{0y} - gt$
  - $y(t) = y_0 + v_{0y}t - \frac{1}{2}gt^2$
- Time of flight: $t = \frac{2v_{0y}}{g}$
  - General case: $t = \frac{v_{0y} + \sqrt{v_{0y}^2 + 2gy_0}}{g}$
- Range:   
$\begin{aligned} 
R 
&= v_{0x} t_g \\
&= v_0 \cos \theta \cdot \frac{2v_0 \sin \theta}{g} \\
&= \frac{v_0^2 \sin 2\theta}{g} \\
\end{aligned}$
  - Maximum range at $\theta = 45^\circ$
- Maximum height: $H = \frac{v_{0y}^2}{2g}$
- Angle: $\theta = \arctan \left( \dfrac{v_y}{v_x} \right)$

A ball is fired directly at a target located a horizontal distance $D$ away and a vertical height $H$ above the launch point. At the instant the ball is launched, the target is released and begins to free fall.  
The ball will always hit the target, regardless of the initial speed of the ball, because $\tan \theta = \frac{v_y}{v_x} = \frac{H}{D}$.


## Forces

**Force**: a vector action that can change an object's motion. $\vec{F}$ in Newtons (N).  
**Principle of Superposition**: The net force acting on an object is the vector sum of all individual forces acting on it. $\vec{F}_{net} = \sum \vec{F}_i$

### Newton's Laws of Motion

#### First Law (Law of Inertia)

First Law: An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by a net external force.

**Inertia**: the tendency of an object to resist changes in its state of motion. The greater the mass of an object, the greater its inertia.  
**Mass** is a measure of an object's inertia, regardless of its location. $m$ in kilograms (kg).  
**Weight** is the gravitational force acting on an object. $\vec{W} = m\vec{g}$ in Newtons (N).

#### Second Law

Second Law: The net force acting on an object is equal to the mass of the object multiplied by its acceleration. Alternatively, an object subjected to a net force will accelerate in the direction of the net force, with a magnitude proportional to the net force and inversely proportional to its mass.
$\vec{F}_{net} = m\vec{a}$.  
$\vec{F}_X = m\vec{a}_X$, $\vec{F}_Y = m\vec{a}_Y$

Therefore, $1 N = 1 kg·m/s²$  

#### Third Law

Third Law: For every action, there is an equal and opposite reaction. If object A exerts a force on object B, then object B exerts a force of equal magnitude but in the opposite direction on object A. $\vec{F}_{AB} = -\vec{F}_{BA}$

### Free Body Diagrams

A free body diagram is a graphical representation used to visualize the forces acting on an object. It helps in analyzing the motion of the object by isolating it from its surroundings and representing all the external forces acting upon it.

### Common Forces

- **Gravitational Force**: $G = F_g = mg$.
- **Normal Force**: $F_N$, perpendicular contact force exerted by a surface on an object.
- **Tension Force**: $F_T$, pulling force exerted by a rope or string. Equal and opposite on the two ends, otherwise the rope would break.
- **Frictional Force**: $\vec{f}$, opposes relative motion between two surfaces in contact.
  - Static Friction: $\vec{f}_s \le \mu_s \vec{N}$
  - Kinetic Friction: $\vec{f}_k = \mu_k \vec{N}$
- **Air Resistance**: $\vec{f}_{air}$, opposes motion through air, often modeled as $\vec{f}_{air} = -bv$ or $\vec{f}_{air} = -cv^2$

### Machines

#### Simple Machines

Simple machines are devices that change the direction or magnitude of a force, making it easier to perform work. The six classical simple machines are:

1. Lever
2. Wheel and Axle
3. Pulley
4. Inclined Plane
5. Wedge
6. Screw

#### Pulley

A pulley consists of a wheel with a grooved rim through which a rope or cable can run to change the direction of the applied force. Pulleys can be used to lift heavy loads with less effort.

- Fixed Pulley: Changes the direction of the force. Mechanical advantage = 1.
- Movable Pulley: Reduces the amount of input force needed to lift a load. Mechanical advantage = 2.
- Block and Tackle: Combination of fixed and movable pulleys. Mechanical advantage = number of supporting rope segments.