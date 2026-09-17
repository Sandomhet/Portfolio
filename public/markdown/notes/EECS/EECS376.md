---
title: "EECS 281+376 Algorithms"
description: ""
time: "Thu Sep 17, 2026"
---
# EECS 281+376 Algorithms

## Potential Method

The potential method is a technique used in amortized analysis to analyze the cost of a sequence of operations. It involves assigning a "potential" to each state of the data structure, and then using this potential to bound the total cost of the operations.

1. Define a potential function, upper bound, and initial potential.
2. Show that the potential function strictly decreases after each operation.
3. Use the potential function to bound the amortized cost of each operation.

### Analyzing Euclid's Algorithm

`Euclid(x, y)`

1. Unit of time = one recursive call.
2. Define potential function $S_i = x_i + y_i$.
3. Initial potential is $S_0 = x_0 + y_0$.
4. After each recursive call, the potential decreases, $S_{i+1} < \frac{2}{3} S_i$.
5. Claim: the number of recursive calls is bounded by $O(\log S_0)$.


## Master Theorem

$$T(n) = aT(\frac{n}{b}) + O(n^c \log^k n)$$

Then:

$$T(n) = \begin{cases}  O(n^c \log^k n) & \text{if } a < b^c \\  O(n^c \log^{k+1} n) & \text{if } a = b^c \\  O(n^{\log_b a}) & \text{if } a > b^c  \end{cases}$$

## Recursion

| Recurrence | Example | Big-O Solution |
| :--- | :--- | :--- |
| $T(n) = T(n / 2) + c$ | Binary Search | $O(\log n)$ |
| $T(n) = T(n - 1) + c$ | Linear Search | $O(n)$ |
| $T(n) = 2T(n / 2) + c$ | Tree Traversal | $O(n)$ |
| $T(n) = T(n - 1) + c_1 \cdot n + c_2$ | Selection/etc. Sorts | $O(n^2)$ |
| $T(n) = 2T(n / 2) + c_1 \cdot n + c_2$ | Merge/Quick Sorts | $O(n \log n)$ |

## 2D Table Search

### Improved Binary Partition Search

1. On the middle column, perform a binary search to find the row that contains the target value.
2. If the target value is found, return true.
3. If the target value is not found, recursively search the bottom-left and top-right submatrices.

$T(n) = 2T(n / 2) + O(\log n) = O(n)$


### Stepwise Linear Search

$O(n + m)$ time complexity

1. Start at the **top-right** corner of the table.
2. If the current value is equal to the target, return true.
3. If the current value is greater than the target, move left.
4. If the current value is less than the target, move down.