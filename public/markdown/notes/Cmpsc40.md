---
title: "CMPSC 40 Discrete Mathematics"
description: "discrete mathematics and mathematical proof"
time: "Wed May 28, 2025"
lang: "en"
---

# Discrete Mathematics

## Table of Contents

## Propositions and Logics

### Definition

**Proposition**: a declarative sentence that is T or F (not both)  
**Propositional variable (sentential)**: variables that represent propositions, denoted as letters $ p, q, r $.  
**Atomic proposition**: propositions that cannot be expressed in terms of simpler propositions.  
**Compound proposition**: new propositions formed from
existing propositions using logical operators.

**Logical Operators** (Propositional Connectives):

- Negation (NOT): $ \neg p $ or $ \sim p $
- Conjunction (AND): $ p \land q $
- Disjunction (OR): $ p \lor q $
- Exclusive (XOR): $ p \oplus q $

**(DNF)** Disjunctive normal form: OR of ANDs.
**(CNF)** Conjunctive normal form: AND of ORs.

### Conditional Proposition

**Conditional Statement (Implication)**: If $ p $, then $ q $, denoted by $ p \rightarrow q $. $ p $ is *hypothesis*,
and $ q $ is *conclusion*.

$
\begin{array}{|c c|c|}
\hline
p & q & p \rightarrow q \\
\hline
T & T & T \\
T & F & F \\
F & T & T \\
F & F & T \\
\hline
\end{array}
$

- Contrapositive: $ \neg q \to \neg p $
- Converse: $ q \to p $
- Inverse: $ \neg p \to \neg q $

The original and contrapositive are equivalent; The converse and inverse are equivalent. (logically equivalent)

**Biconditional Statement (Bi-implications)**: $ p $ if and only if $ q $, denoted by $ p \leftrightarrow q $

$
\begin{array}{|c c|c|}
\hline
p & q & p \leftrightarrow q \\
\hline
T & T & T \\
T & F & F \\
F & T & F \\
F & F & T \\
\hline
\end{array}
$

### Logical Equivalence

**Tautology**: always *True* compound proposition.   
**Contradiction**: always *False* compound proposition.  
**Contingency**: neither tautology nor contradiction.

$ p \equiv q $ denotes logical equivalence if $ p \leftrightarrow q $ is a *tautology*.

**De Morgan's Laws**

- $ \neg (p \land q) \equiv \neg p \lor \neg q $
- $ \neg (p \lor q) \equiv \neg p \land \neg q $

**Conditional Disjunction Equivalence**: $ p \to q \equiv \neg p \lor q $

Logical Equivalence Table:
![alt text](image.png)
![alt text](CDF5FA3C-7D20-4420-82B0-FCB23FC07F8D_1_102_o.jpeg)

## Set

Definition: unordered collection of elements.

- **Set Equality**: $ A = B $ if they contain exactly the same elements.
- **Subset**: $ A \subseteq B $ if every element of $ A $ is also an element
  of $ B $. $ \forall x (x \in A \rightarrow x \in B) $.
- **Proper Subset**: $ A \subsetneq B $, if $ A \subseteq B $ and $ A \neq B $.
- **Empty Set**: The set with no elements, denoted $ \{\} $ or $ \emptyset $.

Roster method: list elements explicitly.
Set-builder notation: describe elements via properties.
Recursion: basis and recursive step.

**Concatenation**: $ A \circ B = \{ab \mid a \in A \text{ and } b \in B \} $

**Function**: domain, codomain, rule mapping.  
A function is well-defined if each input map to exactly one output.
*Precondition*: statements that describe valid input.  
*Postcondition*: conditions that output should satisfy.

## Predicate and Quantification

### Predicate

**Predicate (propositional function)**: a function $ P(x) $ from a given domain to $ \{ T,F \} $
Can be represented by: input-output table, rule or condition, truth set (elements where P(x) is true)
For a predicate $ P $ with domain $ X_1 \times \cdots \times X_n $, write $ P(x_1, \ldots, x_n) $ to
mean $ P((x_1, \ldots, x_n)) $.

### Quantifier

**Quantification**: to create a proposition from a propositional function.
highest precedence over all other logical operators

- **Universal Quantification** $ \forall x P(x) $ : $ P(x) $ for all values of $ x $ in the domain. An element
  where $ P(x) = F $ is a **counterexample**.
- **Existential Quantification** $ \exists x P(x) $ : There exists an element $ x $ in the domain such that $ P(x) $. An
  element where $ P(x) = T $ is a **witness**.
- **Uniqueness Quantification** $ \exists! x P(x) $ or $ \exists_1 x P(x) $ : There exists a unique $ x $ such
  that $ P(x) $. (uniqueness quantifier).

DeMorgan's Laws for Quantifiers:
$
\neg \forall xP(x) \equiv \exists x \neg P(x) \\
\neg \exists xP(x) \equiv \forall x \neg P(x)
$

**Nested Quantifiers**: order matters, read left to right.

## Arguments and Validity

An **argument** in propositional logic is a sequence of propositions. All but the final proposition in the argument are
called **premises** and the final proposition is called the **conclusion**. An argument is **valid** if the truth of all
its premises implies that the conclusion is true. An **argument form** in propositional logic is a sequence of compound
propositions involving propositional variables. An argument form is valid if no matter which particular propositions are
substituted for the propositional variables in its premises, the conclusion is true if the premises are all true.

### Rules of Inference

![alt text](7890D82C-0531-4D46-80E2-C674AC48BECA_1_201_a.jpeg)

### Rules of Inference for Quantified Statements

- **Universal Instantiation**: If $ \forall x P(x) $ is true, then $ P(c) $ is true for any element $ c $ in the domain.
- **Universal Generalization**: If $ P(c) $ is true for an arbitrary element $ c $, then $ \forall x P(x) $ is true.
- **Existential Instantiation**: If $ \exists x P(x) $ is true, then there exists some element $ c $ such that $ P(c) $
  is true.
- **Existential Generalization**: If $ P(c) $ is true for some element $ c $, then $ \exists x P(x) $ is true.

## Proof

### Terms

- **Proposition**: A statement that is true and can be proven, usually less significant than a theorem.
- **Theorem**: A major proven statement based on axioms, definitions, and previously established theorems.
- **Axiom**: A foundational assumption accepted without proof.
- **Proof**: A logical argument establishing the truth of a mathematical statement.
- **Lemma**: A helping theorem used in the proof of a more important result.
- **Corollary**: A statement that follows directly from a theorem.
- **Conjecture**: An unproven statement believed to be true, often awaiting a proof or counterexample.

### Techniques

- Basic Proof
    - **Direct Proof**: Prove a statement by logical steps from known truths.
    - **Proof by Contrapositive**: Instead of proving $ p \rightarrow q $, prove $ \neg q \rightarrow \neg p $.
    - **Vacuous Proof**: When $ p $ is always false, so the implication is trivially true.
    - **Trivial Proof**: When $ q $ is always true regardless of $ p $.
    - **Proof by Contradiction**: Assume the negation of the statement and derive a contradiction.
- Case-Based Proof
    - **Exhaustive Proof**: Check all possible cases individually.
    - **Proof by Cases**: Break the problem into a finite number of scenarios and prove each one.
    - **Without Loss of Generality**: Simplify a proof by assuming a specific case that can be generalized.
- Existence Proof
    - **Constructive Proof**: Provide a specific example (witness) that satisfies the condition.
    - **Non-constructive Proof**: Show something exists by contradiction or logical argument, without exhibiting it.
- Uniqueness Proof
    - assume two elements $ x $ and $ y $ both satisfy the property, then show $ x = y $.
- Reasoning Strategies
    - **Forward Reasoning**: Start from what you know and derive the conclusion step by step.
    - **Backward Reasoning**: Start from what you want to prove and figure out what needs to be true.
    - **Adapting Existing Proofs**: Modify or reuse the structure of known proofs for similar problems.
    - **Looking for Counterexamples**: Search for examples that disprove a statement (especially useful in testing
      conjectures).
    - **Universal Generalization**: Prove a property for an arbitrary element, and then conclude it holds for all.

### Mathematical Induction

strong induction, structural induction.

#### Structural Induction

- **When to Use**: To prove $\forall x \in S.\; P(x)$ when $S$ is recursively defined.
- **Proof Outline**:
    1. **Basis Case**: Show $P(b)$ for each base element $b$.
    2. **Recursive Case**: Assume $P$ holds for all smaller ("already constructed") elements; then show it holds for any
       element formed by the recursive rule.

#### Mathematical Induction

- **When to Use**: To prove $\forall n \ge b.\; P(n)$ where $n$ ranges over integers $\ge b$.
- **Proof Outline**:
    1. **Base Case**: Prove $P(b)$.
    2. **Inductive Step**: Assume $P(n)$ holds for some $n \ge b$; prove $P(n+1)$.

#### Strong Induction

To prove $\forall n\ge b,\;P(n)$:

1. Prove $P(b),P(b+1),\dots,P(b+j)$.
2. Assume $P(b),\dots,P(n)$, prove $P(n+1)$.
   ![ ](image-1.png)

## Number Theory

### Base-$b$ Expansion

decimal (10), binary (2), octal (8), hexadecimal (16).
**Base $b$ Expansion**: $(a_{k-1}\dots a_0)_b$.   
Every positive integer $n$ has a unique
expansion $ n = a_{k-1} b^{k-1} + a_{k-2} b^{k-2} + \cdots + a_1 b + a_0, \quad 0 \le a_i < b,\ a_{k-1}\neq 0. $

### Divisibility

$ a \mid b $: $ a $ **divides** $ b $ and $ b $ is divisible by $ a $; $ a $ is $ a $ *factor* or *divisor*
of $ b $, $ b $ is $ a $ *multiple* of a. ~ $ $ a $ \nmid $ b $ $

Let $a\neq0$ and $a,b,c$ be integers:

1. If $a \mid b$ and $a \mid c$, then $a \mid (b + c)$
2. If $a \mid b$, then $a \mid bc$ for all integers $ c $
3. If $a \mid b$ and $b \mid c$, then $a \mid c$
4. If $a \mid b$ and $a \mid c$, then $a \mid (sb + tc)$ for all integers $s, t$

#### The Division Algorithm

Let $a$ be an integer and $d$ a positive integer. Then there are unique integers $q$ and $r$, with $0 \le r < d$, such
that $ a = d\,q + r $

$d$: **divisor**, $a$: **dividend**, $q$: **quotient**, $r$: **remainder**  
$ q = a \text{ div } d,\ r = a \bmod d$

### Modular Arithmetic

**Congruence**: $a$ is congruent to $b$ modulo $m$, $m$ is *modulus*. $a \equiv b \pmod{m}$ is equivalent to

- $m \mid (a - b)$
- $ (a \bmod m) = (b \bmod m) $
- $ a = b + km $

**Theorems**:
If $a \equiv b \pmod{m}$ and $c \equiv d \pmod{m}$, then
$a + c \equiv b + d \pmod{m}$ and $ac \equiv bd \pmod{m}$
$a^n \equiv b^n \pmod{m}$

$(a + b)\bmod m = \bigl((a\bmod m) + (b\bmod m)\bigr)\bmod m$  
$(ab)\bmod m = \bigl((a\bmod m)\,(b\bmod m)\bigr)\bmod m$.

$\mathbb{Z}_m = \{0,1,\dots,m-1\}$

- $ a +_m b = (a + b) \bmod m $
- $ a \cdot_m b = (a \cdot b) \bmod m $

Standard algebraic laws (addition, multiplication) carry over:

- If $a\equiv b$ and $c\equiv d\pmod m$, then  
  $a\pm c \equiv b\pm d$ and $a\,c\equiv b\,d\pmod m$.
- Powers and inverses (when they exist) also respect congruence.

#### Multiplicative Inverse

If $a$ and $m$ are relatively prime ($\gcd(a,m)=1$) and $m>1$, then there exists a unique integer $a^{-1}$
with $1\le a^{-1}<m$ such that $ aa^{-1}\equiv 1\pmod m $.  
Solve for $ aa^{-1} - tm = 1 $

**Extended Euclidean Algorithm**

**Purpose:** Compute integers $s, t$ such that $ sx + ty = \gcd(x,y) $  
When $\gcd(x,n)=1$, the coefficient $s \pmod n$ is the inverse of $x$.

1. Run Euclid's algorithm while recording quotients.
2. Back-substitute to express $\gcd(x,y)$ as a linear combination.

## Primes and Common Divisors

### Prime and Composite

**Fundamental Theorem of Arithmetic**: Every integer $n > 1$ can be written **uniquely** as a product of
primes: $ n = p_1^{c_1} p_2^{c_2} \cdots p_r^{c_r} $  
If $n$ is a composite integer, then there exists a prime $p$ such that $p \mid n$ and $ p \le \sqrt{n} $.

### Greatest Common Divisor (gcd)

For integers $a$, $b$ (not both zero), the **greatest common divisor** $\gcd(a,b)$ is the largest positive integer $d$
such that $d \mid a$ and $d \mid b$.

If $ a = \prod\limits_i p_i^{c_i},\ b = \prod\limits_i p_i^{d_i} $,
then $ \gcd(a,b) = \prod\limits_i p_i^{\min(c_i, d_i)} $.

The integers $a$ and $b$ are **relatively prime** if $\gcd(a, b) = 1$.

### Least Common Multiple (lcm)

The **least common multiple** $\operatorname{lcm}(a,b)$ is the smallest positive integer divisible by both _a_ and _b_.

$ ab = \gcd(a,b)\operatorname{lcm}(a,b) $

### Euclid's Algorithm for gcd

$ \gcd(a, b) = \gcd(a - b, b) $  
$ \gcd(a, b) = \gcd(b, a \bmod b) $

**Bezout's Theorem**: If $a$ and $b$ are positive integers, then there exist integers $s$ and $t$ such
that $\gcd(a,b) = sa + tb$  
If $a,b,c$ are positive integers such that $\gcd(a,b)=1$ and $a \mid bc$, then $a\mid c$.  
Let $m$ be a positive integer and let $a,b,c$ be integers. If $ac \equiv bc \pmod{m}$ and $\gcd(c,m)=1$,
then $a \equiv b \pmod{m}$

## Week 8 - Monday Lecture Highlights

### Proving Algorithm Correctness

- **findMax Algorithm**
    - **Specification:** returns the maximum of a sequence $a_1,\dots,a_n$.
    - **Proof outline:** use induction on $n$, showing that scanning and maintaining a “current max” yields the true
      maximum.

- **Division Algorithm**
    - **Specification:** given positive integers $n,d$, returns quotient $q$ and remainder $r$ such that  
      $
      n = dq + r,\quad 0\le r<d.
      $
    - **Proof outline:** strong induction on $n$, reducing $n$ by $d$ until the remainder falls below $d$.

---

## Week 8 - Part 2 Highlights

### Cardinality of Sets

- **Finite vs. Infinite**
    - A set $A$ is **finite** if $|A| = n$ for some $n\in\mathbb{N}$.
    - A set is **infinite** if it is not finite.

- **Countably Infinite**
    - A set $A$ is **countably infinite** if there is a bijection $f:\mathbb{N}\to A$.
    - Example: negative integers $\mathbb{Z}^- = \{-1,-2,-3,\dots\}$ via $f(n)=-n-1$.

---

### Functions and Cardinality Relations

A **function** $f\colon A \to B$ assigns exactly one element of $B$ to each element of $A$. We write $ f(a) = b $ if $b$
is the unique element of $B$ that $f$ assigns to $a\in A$.

- The **domain** of $f$ is $A$.
- The **codomain** of $f$ is $B$.
- $b$ is the **image** of $a$, and $a$ is a **preimage** of $b$.
- The **range** (or **image**) of $f$ is the set $\{f(a):a\in A\}$.

Relations:

- **One-to-one (Injective)**  
  if and only if $f(a)=f(b)\implies a=b$.
    - $|A|\le|B|$ no bigger than

- **Onto (Surjective):**  
  if and only if $\forall b\in B\ \exists a\in A\ f(a)=b$.
    - $|A|\ge|B|$ no smaller than

- **Bijection:**  
  $f$ is both injective and surjective.
    - $|A|=|B|$
    - **Cantor-Schroder-Bernstein Theorem**: $|A|=|B|$ if and only if $|A|\le|B|$ and $|B|\le|A|$.

### Comparing Standard Sets

| Set                  | Notation       | Cardinality        |
|----------------------|----------------|--------------------|
| Integers             | $\mathbb{Z}$   | countably infinite |
| Positive integers    | $\mathbb{Z}^+$ | countably infinite |
| Nonnegative integers | $\mathbb{N}$   | countably infinite |
| Rational numbers     | $\mathbb{Q}$   | countably infinite |
| Real numbers         | $\mathbb{R}$   | uncountable        | 2}
