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

## Greedy Algorithms

### Greedy Core Property

- A problem exhibits the greedy choice property if a globally optimal solution can be arrived at by making a locally optimal choice at each step.
- A problem exhibits optimal substructure if an optimal solution to the problem contains optimal solutions to its subproblems.

### Exchange Argument

Core idea: we can transform any optimal solution into a solution given by our greedy algorithm by exchanging elements, without losing optimality.

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

## Majority Element

A majority element in an array is an element that appears more than $\frac{n}{2}$ times, where $n$ is the size of the array.

### Boyer-Moore Voting Algorithm

$O(n)$ time, $O(1)$ space

1. Initialize a candidate element and a count.
2. Iterate through the array:
   - If the count is zero, set the current element as the candidate and set count to 1.
   - If the current element is equal to the candidate, increment the count.
   - If the current element is not equal to the candidate, decrement the count.
3. After the iteration, the candidate is the majority element if it exists. (Iterate again to confirm if the candidate is indeed the majority element.)

```cpp
int findMajorityElement(vector<int>& nums) {
    int candidate = 0, count = 0;
    for (int num : nums) {
        if (count == 0) candidate = num, count = 1;
        else if (num == candidate) count++;
        else count--;
    }
    // Verify if the candidate is indeed the majority element
    count = 0;
    for (int num : nums)
        if (num == candidate)
            count++;
    return (count > nums.size() / 2) ? candidate : -1; // Return -1 if no majority element exists
}
```

### Divide and Conquer Approach

$O(n \log n)$ time, $O(\log n)$ space

1. Divide the array into two halves.
2. Recursively find the majority element in each half.
3. If both halves return the same majority element, that is the majority element for the entire array.
4. If they return different elements, count the occurrences of each in the entire array and return the one that appears more than n/2 times, if any.

### Misra-Gries Algorithm

To find elements that appear more than $\frac{n}{k}$ times in an array.

$O(n)$ time, $O(k)$ space

1. Initialize a map to store up to k-1 candidate elements and their counts.
2. Iterate through the array:
   - If the current element is in the map, increment its count.
   - If the current element is not in the map and the map has less than k-1 elements, add the current element to the map with a count of 1.
   - If the current element is not in the map and the map has k-1 elements, decrement the count of each element in the map. Remove any elements whose count drops to zero.
3. After processing the array, the map contains potential candidates. Verify each candidate by counting its occurrences in the original array.


## Automata and Finite State Machines

- Alphabet: A finite set of symbols. $\Sigma = \{a, b, c, ...\}$
- String: A finite sequence of symbols from the alphabet.
    - Empty string: $\epsilon$.
    - $a^k$: $k$ repetitions of symbol $a$.
    - $a^*$: Zero or more repetitions of symbol $a$.
    - $a^+$: One or more repetitions of symbol $a$.
- Language: A set of strings over an alphabet.
- Automaton: A mathematical model of computation that processes input strings and transitions between states.

### Decision Problems

A decision problem is a problem that can be answered with a yes or no.

Representation: $L \subseteq \Sigma^*$, $f: \Sigma^* \to \{0, 1\}$.

### Deterministic Finite Automaton (DFA)

Definition: A DFA is a 5-tuple $(\Sigma, Q, \delta, q_0, F)$ where:
- $\Sigma$ is a finite input alphabet.
- $Q$ is a finite set of states.
- $\delta: Q \times \Sigma \to Q$ is the transition function.
- $q_0 \in Q$ is the initial state.
- $F \subseteq Q$ is the set of accepting states.

A DFA of a language $L$ satisfies the following properties:
1. For every string $w \in L$, the DFA ends in an accepting state after processing $w$.
2. For every string $w \notin L$, the DFA ends in a non-accepting state after processing $w$.

Fact: If there is a DFA that accepts a language $L$, then there is a DFA that accepts the complement of $L$.

## Turing Machines

Definition: A Turing machine is a 7-tuple $(Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})$ where:
- $\Sigma$ is a finite input alphabet.
- $\Gamma$ is a finite tape alphabet, where $\Sigma \subseteq \Gamma$ and $\sqcup \in \Gamma$ is the blank symbol.
- $Q$ is a finite set of states.
- $q_0 \in Q$ is the initial state.
- $q_{accept} \in Q$ is the accepting state.
- $q_{reject} \in Q$ is the rejecting state.
- $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$ is the transition function.

The language of a TM $M$ is $L(M) = \{ w \in \Sigma^* \mid M \text{ accepts } w \}$.

A Turing Machine $M$ **recognizes** a language $L$ if $L(M) = L$. 
- accepts all strings in $L$
- rejects or loops on all strings not in $L$.

A Turing Machine $M$ **decides** a language $L$ if it recognizes $L$ and halts on all inputs.
- accepts all strings in $L$
- rejects all strings not in $L$.

A language $L$ is **decidable** if there exists a Turing Machine that decides it. Otherwise, it is **undecidable**.