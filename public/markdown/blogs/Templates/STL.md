---
title: "C++ STL Containers Cheat Sheet"
description: ""
time: "Mon Feb 1, 2026"
---

# C++ STL Containers Cheat Sheet

## Table of Contents

## Sequence Containers

### `std::vector<T>`

Dynamic array (most used container)

**Common operations**

```cpp
vector<T> v; // empty vector
vector<T> v(n); // size n, default initialized
vector<T> v(n, x); // size n, initialized to x
vector<T> v2(v1); // copy constructor
vector<T> v2(move(v1)); // move constructor

n = v.size();
cap = v.capacity();

v.reserve(n); // reserve capacity for n elements, no size change
v.resize(n); // resize to n elements, new elements default initialized
v.resize(n, x); // resize to n elements, new elements initialized to x
v.assign(n, x); // assign n elements of value x
v.clear(); // size becomes 0, capacity unchanged

v.emplace_back(x); // construct x in place at the end
v.push_back(x); // append x to the end
v.pop_back(); // remove last element
v[i], v.at(i);
v.front(), v.back();
it = v.begin(), v.end();
v.empty();
v.insert(idx, x); // insert x at index idx
v.erase(idx); // erase element at index idx
```

---

### `std::deque<T>`

Double-ended queue

**Common operations**

```cpp
deque<T> d; // empty deque

d.push_back(x)
d.push_front(x)
d.pop_back()
d.pop_front()
d.front()
d.back()
d[i]
d.size()
```

---

### `std::list<T>`

Doubly linked list

**Common operations**

```cpp
#include <list>

l.push_back(x)
l.push_front(x)
l.pop_back()
l.pop_front()
l.insert(it, x) // insert x before iterator it
l.erase(it) // erase element at iterator it
l.remove(x) // remove all elements equal to x
l.begin(), l.end() // iterators
l.front(), l.back() // access first and last elements
l.size()

l.reverse() // reverse the list
l.sort() // sort the list
advance(it, n) // move iterator it forward by n positions

prev_it = prev(it), --it; // previous iterator
next_it = next(it), ++it; // next iterator

l.splice(pos_it, src); // move all elements from src to this list at pos_it
l.splice(pos_it, src, it); // move element at it from src to this list at pos_it
l.splice(pos_it, src, first_it, last_it); // move range [first_it, last_it) from src to this list at pos_it
```

---

### `std::forward_list<T>`

Singly linked list

**Common operations**

```cpp
fl.push_front(x)
fl.pop_front()
fl.insert_after(it, x)
fl.erase_after(it)
fl.before_begin()
```

---

### `std::array<T, N>`

Fixed-size array

**Common operations**

```cpp
a[i]
a.at(i)
a.front()
a.back()
a.size()
a.fill(x)
```

---

## 2. Associative Containers (Ordered, Tree-Based)

### `std::set<T>`

Unique sorted elements

**Common operations**

```cpp
s.insert(x)
s.erase(x)
s.find(x)
s.count(x)
s.lower_bound(x)
s.upper_bound(x)
s.begin(), s.end()
s.size()
```

---

### `std::multiset<T>`

Sorted elements with duplicates

**Common operations**

```cpp
ms.insert(x)
ms.erase(x)
ms.find(x)
ms.count(x)
ms.lower_bound(x)
```

---

### `std::map<K, V>`

Sorted key-value pairs (unique keys)

**Common operations**

```cpp
m[key]
m.insert({k, v})
m.erase(key)
m.find(key)
m.count(key)
m.lower_bound(key)
m.upper_bound(key)
m.begin(), m.end()
```

---

### `std::multimap<K, V>`

Sorted key-value pairs with duplicate keys

**Common operations**

```cpp
mm.insert({k, v})
mm.erase(key)
mm.find(key)
mm.equal_range(key)
```

---

## 3. Unordered Associative Containers (Hash-Based)

### `std::unordered_set<T>`

**Common operations**

```cpp
us.insert(x)
us.erase(x)
us.find(x)
us.count(x)
us.size()
```

---

### `std::unordered_multiset<T>`

**Common operations**

```cpp
ums.insert(x)
ums.erase(x)
ums.count(x)
```

---

### `std::unordered_map<K, V>`

**Common operations**

```cpp
um[key]
um.insert({k, v})
um.erase(key)
um.find(key) // returns iterator
um.count(key)
```

---

### `std::unordered_multimap<K, V>`

**Common operations**

```cpp
umm.insert({k, v})
umm.erase(key)
umm.equal_range(key)
```

---

## 4. Container Adapters

### `std::stack<T>`

LIFO

**Common operations**

```cpp
st.push(x)
st.pop()
st.top()
st.empty()
st.size()
```

---

### `std::queue<T>`

FIFO

**Common operations**

```cpp
q.push(x)
q.pop()
q.front()
q.back()
q.empty()
q.size()
```

---

### `std::priority_queue<T>`

Heap (max-heap by default)

**Common operations**

```cpp
pq.push(x)
pq.pop()
pq.top()
pq.empty()
pq.size()
```

---

## 5. Special / Modern Containers

### `std::span<T>` (C++20)

Non-owning view

**Common operations**

```cpp
sp[i]
sp.front()
sp.back()
sp.size()
sp.subspan(pos, len)
```

---

### `std::bitset<N>`

Fixed-size bitset

**Common operations**

```cpp
b.set()
b.reset()
b.flip()
b.test(i)
b.count()
```

---

## 6. String (Container-like)

### `std::string`

(technically a container)

**Common operations**

```cpp
s.push_back(c)
s.pop_back()
s += other
s.substr(pos, len)
s.find(x)
s.size()
s.empty()
```

---

## 7. Iterators & Common Utilities (Used Everywhere)

```cpp
begin(), end()
cbegin(), cend()
rbegin(), rend()
```

---

## Quick Interview / CP Summary

| Use case              | Container         |
| --------------------- | ----------------- |
| Dynamic array         | `vector`          |
| Stack                 | `stack`           |
| Queue                 | `queue`           |
| Max/Min heap          | `priority_queue`  |
| Fast lookup           | `unordered_map`   |
| Ordered data          | `map`, `set`      |
| Frequent insert/erase | `list`            |
| Fixed size            | `array`, `bitset` |

---

If you want, I can:

* give **time complexity tables**
* give **CP vs production recommendations**
* give **what NOT to use and why**
* give **C++20/23 STL changes**

Just tell me.
