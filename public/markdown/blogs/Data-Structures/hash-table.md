---
title: "Hash Table"
description: "Data structure for efficient key-value mapping."
time: "Wed Jun 5, 2024"
---

# Hash Table

## Table of Contents

## Definition

A hash table is a data structure that maps keys to values for efficient data retrieval. It uses a hash function to compute an index (hash code) into an array of buckets or slots, from which the desired value can be found.  

Denote $U (N)$ as the universe set, $H (m)$ as the hash table set, and $S (n)$ as the set of keys to be stored. A hash function $h: U \to H$ as the hash function. ($n < m << N$.)

## Collision Resolution

Collisions occur when two keys hash to the same index. Common collision resolution techniques include:

1. **Chaining**: Each bucket contains a linked list of all entries that hash to the same index.
2. **Open Addressing**: If a collision occurs, the algorithm searches for the next available slot using a probing sequence.

### Load

Denote $L_i$ as the load of the $i$-th bucket, i.e., the number of elements hashed to that bucket.

### Load Factor

The load factor ($\alpha$) is a measure of how full the hash table is, defined as $\alpha = \frac{n}{m}$, where $n$ is the number of elements and $m$ is the number of buckets. A higher load factor increases the likelihood of collisions and can degrade performance.

When the load factor exceeds a certain threshold (e.g., 0.7), the hash table may be resized (usually doubled) to maintain efficient operations. This involves rehashing all existing keys into the new table.

## Hash Function

A good hash function has the following properties:

1. **Deterministic**: The same input always produces the same output.
2. **Uniform Distribution**: Hash values are evenly distributed across the hash table to minimize collisions.
3. $h(x)$ is mutually independent of $h(y)$ for $x \ne y$.
4. **Efficient**: The hash function should be quick to compute.

Every hash function has a bad input where all elements map to the same bucket.

Naive hash functions include:
- **Division Method**: $h(x) = x \bmod m$
- **Multiplication Method**: $h(x) = \lfloor m (xA \bmod 1) \rfloor$, where $A$ is a constant (e.g., $(\sqrt{5} - 1)/2$).

Optimization: power of two choices (two hash functions)

### Random Hash Function

Theorem: The max load in chaining is about $O(\log n)$ with high probability.

$$(\frac{n}{k})^k \le \binom{n}{k} \le (\frac{ne}{k})^k$$

Let $E_i$ be the event that the $i$-th bucket has load at least $10\log n$. Then $P(E_i) \leq n^{-10}$.

$E = \bigcup\limits_{i=1}^{m} E_i$, $P(E) \leq m \cdot n^{-10} \leq n^{-9}$.

### Two Hash Functions

Theorem: Using two hash functions and placing each element in the less loaded bucket, the maximum load is about $O(\log \log n)$ with high probability.  
For $d\geq 2$ hash functions, the maximum load is about $O(\frac{\log \log n}{\log d})$ with high probability.

### Pairwise Independent Hash Function

(ideally mutually independent)

For any two distinct keys $x$ and $y$, the hash values $h(x)$ and $h(y)$ are uniformly distributed over the output range and are independent of each other. $P(h(x) = a \land h(y) = b) = \frac{1}{m^2}$ for any $a, b$ in the range of the hash function.

### Universal Hash Function

A family of hash functions $\mathcal{H}$ is called universal if for any two distinct keys $x$ and $y$, the probability that they collide (i.e., $h(x) = h(y)$) when $h$ is chosen uniformly at random from $\mathcal{H}$ is at most $\frac{1}{m}$, where $m$ is the number of buckets in the hash table. $P(h(x) = h(y)) \leq \frac{1}{m}$.

1. choose a prime $p > N$ (Merseenne prime preferred, $p = 2^q - 1$)
2. choose $a, b \in [0, p-1]$ uniformly at random
3. define the hash function as $h(x) = ((ax + b) \bmod p) \bmod m$

## Construction of Hash Functions
