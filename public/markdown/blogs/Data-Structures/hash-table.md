---
title: "Hash Table"
description: "Data structure for efficient key-value mapping."
time: "Mon Nov 10, 2025"
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

<!-- ## Construction of Hash Functions -->

### Cuckoo Hashing

Cuckoo hashing is a collision resolution technique for hash tables that uses two or more hash functions and two or more hash tables. Each key can be stored in one of the tables based on its hash value. If a collision occurs, the existing key is "kicked out" and reinserted into its alternative location, potentially causing further displacements.

(one table, two hash functions in this case)

Operations:
1. **Insertion**: Insert the key based on one of its hash values. If all positions are occupied, remove the existing key and reinsert it into its alternative location, potentially causing further displacements. If a cycle exists, rehash the entire table with new hash functions. $O(1)$ amortized in expectation.
2. **Query**: An element exists if either of its hashed positions contains the key. $O(1)$ worst-case.
3. **Deletion**: Remove the key from the table if it exists.

Analysis:
If $\frac{m}{n} \geq 6$, then
- The expected insertion is $O(1)$.
- The probability that a rehash is needed is $O(\frac{1}{2})$.
- The expected number of rehashes is $O(1)$.
- The expected total time for rehashing is $O(n)$.

```python
class CuckooHashTable:
    TABLE_SIZE = 11
    MAX_LOOP = 20

    def __init__(self):
        self.EMPTY = None
        self.table = [self.EMPTY] * self.TABLE_SIZE
        # store both hash functions in a list
        self.hash_funcs = [
            lambda key: key % self.TABLE_SIZE,
            lambda key: (key // self.TABLE_SIZE) % self.TABLE_SIZE,
        ]

    def search(self, key):
        return any(self.table[h(key)] == key for h in self.hash_funcs)

    def insert(self, key):
        if self.search(key):
            return
        cur_key = key
        for _ in range(self.MAX_LOOP):
            for h in self.hash_funcs:
                pos = h(cur_key)
                if self.table[pos] is self.EMPTY:
                    self.table[pos] = cur_key
                    return
                cur_key, self.table[pos] = self.table[pos], cur_key
        print(f"Rehash needed! Insertion failed for {cur_key}")

    def remove(self, key):
        for h in self.hash_funcs:
            pos = h(key)
            if self.table[pos] == key:
                self.table[pos] = self.EMPTY
                return

    def display(self):
        print("Table:", ["_" if x is None else x for x in self.table])


if __name__ == "__main__":
    ht = CuckooHashTable()
    keys = [20, 50, 53, 75, 100, 67, 105, 3, 36, 39]
    for k in keys:
        ht.insert(k)
    ht.display()
    print("Search 75:", ht.search(75))
    ht.remove(75)
    ht.display()

```

```cpp
#include <vector>
#include <functional>
using namespace std;
class CuckooHashTable {
private:
    vector<int> table1, table2;
    function<size_t(int)> hash1, hash2;
public:
    CuckooHashTable(size_t size, function<size_t(int)> h1, function<size_t(int)> h2)
        : table1(size, -1), table2(size, -1), hash1(h1), hash2(h2) {}
    bool insert(int key) {
        int pos1 = hash1(key) % table1.size();
        if (table1[pos1] == -1) {
            table1[pos1] = key;
            return true;
        }
        int displacedKey = table1[pos1];
        table1[pos1] = key;
        int pos2 = hash2(displacedKey) % table2.size();
        if (table2[pos2] == -1) {
            table2[pos2] = displacedKey;
            return true;
        }
        // Handle further displacements or rehashing as needed
        return false; // Simplified for brevity
    }
    bool contains(int key) {
        int pos1 = hash1(key) % table1.size();
        if (table1[pos1] == key) return true;
        int pos2 = hash2(key) % table2.size();
        return table2[pos2] == key;
    }
    void remove(int key) {
        int pos1 = hash1(key) % table1.size();
        if (table1[pos1] == key) {
            table1[pos1] = -1;
            return;
        }
        int pos2 = hash2(key) % table2.size();
        if (table2[pos2] == key) {
            table2[pos2] = -1;
        }
    }
};
```

## Bloom Filter

A Bloom filter is a space-efficient probabilistic data structure used to test whether an element is a member of a set.  

### Structure

A Bloom filter consists of:
1. A bit array of size $m$, initialized to all 0s.
2. $k$ independent hash functions, each of which maps an element to one of the $m$ array positions uniformly at random. (ideally mutually independent)

### Operations

1. **Insertion**: To add an element, compute the $k$ hash values using the $k$ hash functions. Set the bits at the resulting positions in the bit array to 1.
2. **Query**: To check if an element is in the set, compute the $k$ hash values. 
    - $\forall j, B_{h_j(x)} = 1$ indicates that the element is possibly in the set.
    - $\exists j, B_{h_j(x)} = 0$ indicates that the element is definitely not in the set.
3. No deletion.

### Advantages and Disadvantages

- **Advantages**:
  - **Space-efficient**: Requires significantly less memory than traditional data structures for set membership.
  - **Fast operations**: Both insertion and query operations are performed in constant time, $O(k)$, where $k$ is the number of hash functions.
  - Simple to implement.
- **Disadvantages**:
  - **False positives** but no false negatives: May indicate that an element is in the set when it is not, but will never indicate that an element is not in the set when it actually is.
  - No deletion: Standard Bloom filters do not support deletion of elements.

### Analysis

Given $n$ elements inserted into a Bloom filter with $m$ bits and $k$ hash functions, for a specific bit $B_i$:
$$ P(B_i = 0) = \left(1 - \frac{1}{m}\right)^{kn} = \left(1 - \frac{1}{m}\right)^{m\frac{kn}{m}} \approx e^{-\frac{kn}{m}} $$
(using the approximation $\lim\limits_{x \to \infty} \left(1 - \frac{1}{x}\right)^x = e^{-1}$)
$$ P(B_i = 1) = 1 - P(B_i = 0) \approx 1 - e^{-\frac{kn}{m}} $$
$$ P(\text{false positive}) = P(\forall j, B_{h_j(x)} = 1 | x \notin S) = \left(1 - e^{-\frac{kn}{m}}\right)^k $$

To minimize the false positive rate is to minimize $f(k) = \left(1 - e^{-\frac{kn}{m}}\right)^k$, and is equivalent to minimizing $g(k) = \ln f(k) = k \ln \left(1 - e^{-\frac{kn}{m}}\right)$.

$$
\begin{aligned}
g'(k) = \ln \left(1 - e^{-\frac{kn}{m}}\right) + \frac{kn}{m} \cdot \frac{e^{-\frac{kn}{m}}}{1 - e^{-\frac{kn}{m}}} &= 0 \\
\text{Let } x = e^{-\frac{kn}{m}}, \text{ then } \ln x = -\frac{kn}{m}. &\text{ Thus, } \\
\ln (1 - x) - \ln x \cdot \frac{x}{1 - x} &= 0 \\
(1 - x) \ln (1 - x) &= x \ln x \\
\end{aligned}
$$
The trivial solution is $x = \frac{1}{2}$ when $x = 1 - x$.  
Thus, $k = -\frac{m}{n} \ln x = \frac{m}{n} \ln 2$.

Let $c = \frac{m}{n}$,
$$
g''(c\ln 2) > 0 \Rightarrow \text{minimum} \\
f(c \ln 2) = \left(\frac{1}{2}\right)^{c \ln 2} = e^{-(\ln 2)^2c} \approx 0.6185^c
$$
Notice that, $P(B_i = 0) = P(B_i = 1) = \frac{1}{2}$.

Therefore, the optimal $k$ is:
**$$ k = \frac{m}{n} \ln 2 $$**

### Algorithm

```cpp
#include <vector>
#include <functional>
#include <bitset>
using namespace std;
class BloomFilter {
private:
    vector<function<size_t(const string&)>> hashFunctions;
    bitset<1000> bitArray; // Example size
public:
    BloomFilter(const vector<function<size_t(const string&)>>& funcs) : hashFunctions(funcs) {}
    void insert(const string& key) {
        for (const auto& hashFunc : hashFunctions) {
            size_t index = hashFunc(key) % bitArray.size();
            bitArray.set(index);
        }
    }
    bool contains(const string& key) {
        for (const auto& hashFunc : hashFunctions) {
            size_t index = hashFunc(key) % bitArray.size();
            if (!bitArray.test(index)) {
                return false;
            }
        }
        return true;
    }
};
```

### Applications

Reference: Network applications of Bloom filters (2003).
Bloom filters are widely used in various applications, including:
1. **Database Systems**: To quickly check if a record exists before performing a more expensive database query.
2. **Web Caching**: To determine if a URL is in the cache before fetching it from the web.
3. **Distributed Systems**: To reduce the amount of data transferred between nodes by checking membership before sending data.
4. **Spell Checking**: To quickly check if a word is in a dictionary.
5. **Network Security**: To filter out known malicious URLs or IP addresses.
6. **Blockchain and Cryptocurrencies**: To efficiently verify transactions and blocks without downloading the entire blockchain.

(Google Chrome, Medium, Bitcoin)