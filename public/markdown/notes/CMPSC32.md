
# CMPSC 32 - Object Oriented Design

## Table of Contents

## Hash Tables

### Load Factor

- Load Factor: $\alpha = \frac{n}{m}$ where $n$ is the number of elements in the table and $m$ is the number of slots in the table.
- As $\alpha$ increases, the number of collisions increases, leading to longer chains in chaining and more probes in open addressing.
- A common threshold for resizing a hash table is when $\alpha$ exceeds 0.7.

**Load factor** formulas:
1. Linear Probing: $ \frac{1}{2} (1 + \frac{1}{1 - \alpha}) $
2. Double Hashing: $ \frac{-\ln (1 - \alpha)}{\alpha} $
3. Chaining: $ 1 + \frac{\alpha}{2} $
