---
title: "EECS 376 Algorithms and Proof"
description: ""
time: "Thu Sep 17, 2026"
---
# EECS 376 Algorithms and Proof

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

### Countability and Uncountability

- A set is **countable** if its elements can be put into a one-to-one correspondence with the natural numbers.
- A set is **uncountable** if it is not countable.

Diagonalization.

1. There are countably many Turing Machines, so there are countably many decidable languages.
2. There are uncountably many languages. 
3. Therefore, there exist undecidable languages.