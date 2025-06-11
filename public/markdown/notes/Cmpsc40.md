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
| Law                   | ∨-Version                                         | ∧-Version                                            |
|:----------------------|:--------------------------------------------------|:-----------------------------------------------------|
| **Idempotent laws**   | $p \lor p \equiv p$                               | $p \land p \equiv p$                                 |
| **Associative laws**  | $(p \lor q) \lor r \equiv p \lor (q \lor r)$       | $(p \land q) \land r \equiv p \land (q \land r)$     |
| **Commutative laws**  | $p \lor q \equiv q \lor p$                        | $p \land q \equiv q \land p$                         |
| **Distributive laws** | $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ |
| **Identity laws**     | $p \lor \mathrm{F} \equiv p$                      | $p \land \mathrm{T} \equiv p$                        |
| **Domination laws**   | $p \lor \mathrm{T} \equiv \mathrm{T}$             | $p \land \mathrm{F} \equiv \mathrm{F}$               |
| **Double negation**   | $\neg\neg p \equiv p$                             | $\neg\neg p \equiv p$                                |
| **Complement laws**   | $p \lor \neg p \equiv \mathrm{T}$<br/>$\neg \mathrm{F} \equiv \mathrm{T}$ | $p \land \neg p \equiv \mathrm{F}$<br/>$\neg \mathrm{T} \equiv \mathrm{F}$ |
| **De Morgan’s laws**  | $\neg(p \lor q) \equiv \neg p \land \neg q$       | $\neg(p \land q) \equiv \neg p \lor \neg q$          |
| **Absorption laws**   | $p \lor (p \land q) \equiv p$                     | $p \land (p \lor q) \equiv p$                        |
| **Conditional identities** | $p \to q \equiv \neg p \lor q$               | $p \leftrightarrow q \equiv (p \to q) \land (q \to p)$ |


| Expression                                 | Equivalent Form                         |
|:-------------------------------------------|:----------------------------------------|
| $p \to q$                                 | $\neg p \lor q$                        |
| $p \to q$                                 | $\neg q \to \neg p$                    |
| $p \lor q$                                | $\neg p \to q$                         |
| $p \land q$                               | $\neg\bigl(p \to \neg q\bigr)$         |
| $\neg(p \to q)$                           | $p \land \neg q$                       |
| $(p \to q) \land (p \to r)$               | $p \to (q \land r)$                    |
| $(p \to r) \land (q \to r)$               | $(p \lor q) \to r$                     |
| $(p \to q) \lor (p \to r)$                | $p \to (q \lor r)$                     |
| $(p \to r) \lor (q \to r)$                | $(p \land q) \to r$                    |


| Expression                                 | Equivalent Form                                      |
|:-------------------------------------------|:-----------------------------------------------------|
| $p \leftrightarrow q$                      | $(p \to q) \land (q \to p)$                          |
| $p \leftrightarrow q$                      | $\neg p \leftrightarrow \neg q$                      |
| $p \leftrightarrow q$                      | $(p \land q) \lor (\neg p \land \neg q)$             |
| $\neg\bigl(p \leftrightarrow q\bigr)$     | $p \leftrightarrow \neg q$                           |

## Set

Definition: unordered collection of elements.

- **Set Equality**: $ A = B $ if they contain exactly the same elements.
- **Subset**: $ A \subseteq B $ if every element of $ A $ is also an element of $ B $. $ \forall x (x \in A \rightarrow x \in B) $.
- **Proper Subset**: $ A \subsetneq B $, if $ A \subseteq B $ and $ A \neq B $.
- **Empty Set**: The set with no elements, denoted $ \{\} $ or $ \emptyset $.

Roster method: list elements explicitly.  
Set-builder notation: describe elements via properties.  
Recursion: basis and recursive step.

**Concatenation**: $ A \circ B = \{ab \mid a \in A \text{ and } b \in B \} $

### Cardinality of Sets

- A set $A$ is **finite** if $|A| = n$ for some $n\in\mathbb{N}$.
- A set $A$ is **countably infinite** if there is a bijection $f:\mathbb{N}\to A$ or $\lvert A\rvert = \lvert \mathbb{N}\rvert$.
- **Uncountable:** cannot be put in bijection with $\mathbb{N}$.

| Set                  | Notation       | Cardinality        |
|----------------------|----------------|--------------------|
| Integers             | $\mathbb{Z}$   | countably infinite |
| Positive integers    | $\mathbb{Z}^+$ | countably infinite |
| Nonnegative integers | $\mathbb{N}$   | countably infinite |
| Rational numbers     | $\mathbb{Q}$   | countably infinite |
| Real numbers         | $\mathbb{R}$   | uncountable        |

### Sum and Product Rules

- **Sum Rule (Disjoint Union):** If $A$ and $B$ are disjoint finite sets, then $ |A \cup B| = |A| + |B| $.
- **Union of Non-Disjoint Sets:** If $A,B$ are finite (possibly overlapping), $ |A \cup B| = |A| + |B| - |A\cap B| $.
- **Product Rule (Cartesian Product):** If $A$ and $B$ are finite, then $ |A \times B| = |A|\times|B| $.
    - **Corollary:** $|A^2| = |A|^2$ for any finite set $A$.

### Power Sets

**Definition:** The power set $\mathcal{P}(S)$ is the set of all subsets of $S$.
- If $|S| = n$, then $|\mathcal{P}(S)| = 2^n$.
- For any set $S$, $ \lvert S \rvert < \lvert \mathcal{P}(S)\rvert $

**Example:** If $S = \{1,2,3\}$,  
$
\mathcal{P}(S) = \{\emptyset, \{1\}, \{2\}, \{3\}, \{1,2\}, \{1,3\}, \{2,3\}, \{1,2,3\}\}.
$

## Predicate and Quantification

### Predicate

**Predicate (propositional function)**: a function $ P(x) $ from a given domain to $ \{ T,F \} $  
Can be represented by: input-output table, rule or condition, truth set (elements where P(x) is true)  
For a predicate $ P $ with domain $ X_1 \times \cdots \times X_n $, write $ P(x_1, \ldots, x_n) $ to mean $ P((x_1, \ldots, x_n)) $.

### Quantifier

**Quantification**: to create a proposition from a propositional function.
Highest precedence over all other logical operators

- **Universal Quantification** $ \forall x P(x) $ : $ P(x) $ for all values of $ x $ in the domain. An element where $ P(x) = F $ is a **counterexample**.
- **Existential Quantification** $ \exists x P(x) $ : There exists an element $ x $ in the domain such that $ P(x) $. An element where $ P(x) = T $ is a **witness**.
- **Uniqueness Quantification** $ \exists! x P(x) $ or $ \exists_1 x P(x) $ : There exists a unique $ x $ such that $ P(x) $. (uniqueness quantifier).

DeMorgan's Laws for Quantifiers:
$$
\neg \forall xP(x) \equiv \exists x \neg P(x) \\
\neg \exists xP(x) \equiv \forall x \neg P(x)
$$

**Nested Quantifiers**: order matters, read left to right.

## Arguments and Validity

An **argument** in propositional logic is a sequence of propositions. All but the final proposition in the argument are called **premises** and the final proposition is called the **conclusion**. An argument is **valid** if the truth of all its premises implies that the conclusion is true. An **argument form** in propositional logic is a sequence of compound propositions involving propositional variables. An argument form is valid if no matter which particular propositions are substituted for the propositional variables in its premises, the conclusion is true if the premises are all true.

### Rules of Inference

| Rule of Inference                                                                   | Tautology                                                      | Name                   |
|:------------------------------------------------------------------------------------|:---------------------------------------------------------------|:-----------------------|
| $\begin{aligned}p\\ p \to q\\ \hline \therefore q\end{aligned}$                     | $(p \land (p \to q)) \to q$                                    | Modus ponens           |
| $\begin{aligned}\neg q\\ p \to q\\ \hline \therefore \neg p\end{aligned}$           | $(\neg q \land (p \to q)) \to \neg p$                          | Modus tollens          |
| $\begin{aligned}p \to q\\ q \to r\\ \hline \therefore p \to r\end{aligned}$         | $((p \to q) \land (q \to r)) \to (p \to r)$                    | Hypothetical syllogism |
| $\begin{aligned}p \lor q\\ \neg p\\ \hline \therefore q\end{aligned}$               | $((p \lor q) \land \neg p) \to q$                              | Disjunctive syllogism  |
| $\begin{aligned}p\\ \hline \therefore p \lor q\end{aligned}$                        | $p \to (p \lor q)$                                             | Addition               |
| $\begin{aligned}p \land q\\ \hline \therefore p\end{aligned}$                       | $(p \land q) \to p$                                            | Simplification         |
| $\begin{aligned}p\\ q\\ \hline \therefore p \land q\end{aligned}$                   | $((p) \land (q)) \to (p \land q)$                              | Conjunction            |
| $\begin{aligned}p \lor q\\ \neg p \lor r\\ \hline \therefore q \lor r\end{aligned}$ | $((p \lor q) \land (\neg p \lor r)) \to (q \lor r)$            | Resolution             |

### Rules of Inference for Quantified Statements

- **Universal Instantiation**: If $ \forall x P(x) $ is true, then $ P(c) $ is true for any element $ c $ in the domain.
- **Universal Generalization**: If $ P(c) $ is true for an arbitrary element $ c $, then $ \forall x P(x) $ is true.
- **Existential Instantiation**: If $ \exists x P(x) $ is true, then there exists some element $ c $ such that $ P(c) $ is true.
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
    - **Proof by Contradiction**: Assume the negation of the statement, which is $ \neg (p \rightarrow q) \equiv p \land \neg q $, and derive a contradiction.
- Case-Based Proof
    - **Exhaustive Proof**: Check all possible cases individually.
    - **Proof by Cases**: Break the problem into a finite number of scenarios and prove each one.
    - **Without Loss of Generality**: Simplify a proof by assuming a specific case that can be generalized.
- Existence Proof
    - **Constructive Proof**: Provide a specific example (witness) that satisfies the condition.
    - **Non-constructive Proof**: Show something exists by contradiction or logical argument, without exhibiting it.
- **Uniqueness Proof**: assume two elements $ x $ and $ y $ both satisfy the property, then show $ x = y $.
- Reasoning Strategies
    - **Forward Reasoning**: Start from what you know and derive the conclusion step by step.
    - **Backward Reasoning**: Start from what you want to prove and figure out what needs to be true.
    - **Adapting Existing Proofs**: Modify or reuse the structure of known proofs for similar problems.
    - **Looking for Counterexamples**: Search for examples that disprove a statement (especially useful in testing conjectures).
    - **Universal Generalization**: Prove a property for an arbitrary element, and then conclude it holds for all.

### Mathematical Induction

#### Mathematical Induction

To prove $\forall n \ge b, P(n)$:
1. **Base Step**: Prove $P(b)$.
2. **Inductive Step**: Assume $P(n)$ holds for some $n \ge b$, prove $P(n+1)$.

#### Strong Induction

To prove $\forall n \ge b, P(n)$:
1. **Base Step**: Prove $P(b),P(b+1),\dots,P(b+j)$.
2. **Inductive Step**: Assume $P(b),\dots,P(n)$, prove $P(n+1)$.

#### Structural Induction

To prove $\forall x \in S, P(x)$ when $S$ is recursively defined.
1. **Basis Step**: Show $P(b)$ for each base element $b$.
2. **Recursive Step**: Assume $P$ holds for all smaller ("already constructed") elements; then show it holds for any element formed by the recursive rule.

![Proof](image-1.png)

## Number Theory

### Base-$b$ Expansion

decimal (10), binary (2), octal (8), hexadecimal (16).  
**Base $b$ Expansion**: $(a_{k-1}\dots a_0)_b$.   
Every positive integer $n$ has a unique expansion $ n = a_{k-1} b^{k-1} + a_{k-2} b^{k-2} + \cdots + a_1 b + a_0, \quad 0 \le a_i < b,\ a_{k-1}\neq 0. $

### Divisibility

$ a \mid b $: $ a $ **divides** $ b $ and $ b $ is divisible by $ a $; $ a $ is $ a $ *factor* or *divisor* of $ b $, $ b $ is a *multiple* of $a$. ~ $ $ a $ \nmid $ b $ $

Let $a\neq0$ and $a,b,c$ be integers:

- If $a \mid b$ and $a \mid c$, then $a \mid (b + c)$
- If $a \mid b$, then $a \mid bc$ for all integers $ c $
- If $a \mid b$ and $b \mid c$, then $a \mid c$
- If $a \mid b$ and $a \mid c$, then $a \mid (sb + tc)$ for all integers $s, t$

#### The Division Algorithm

Let $a$ be an integer and $d$ a positive integer. Then there are unique integers $q$ and $r$, with $0 \le r < d$, such that $ a = dq + r $

$d$: **divisor**, $a$: **dividend**, $q$: **quotient**, $r$: **remainder**  
$ q = a \text{ div } d,\ r = a \bmod d$

### Modular Arithmetic

**Congruence**: $a$ is congruent to $b$ modulo $m$, $m$ is *modulus*. $a \equiv b \pmod{m}$ is equivalent to

- $m \mid (a - b)$
- $ (a \bmod m) = (b \bmod m) $
- $ a = b + km $

**Theorems**:
If $a \equiv b \pmod{m}$ and $c \equiv d \pmod{m}$, then

- $a \pm c \equiv b \pm d \pmod{m}$
- $ac \equiv bd \pmod{m}$
- $a^n \equiv b^n \pmod{m}$

Properties:
- $(a + b)\bmod m = \bigl((a\bmod m) + (b\bmod m)\bigr)\bmod m$
- $(ab)\bmod m = \bigl((a\bmod m)\,(b\bmod m)\bigr)\bmod m$.

$\mathbb{Z}_m = \{0,1,\dots,m-1\}$

- $ a +_m b = (a + b) \bmod m $
- $ a \cdot_m b = (a \cdot b) \bmod m $

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

**Fundamental Theorem of Arithmetic**: Every integer $n > 1$ can be written **uniquely** as a product of primes: $ n = p_1^{c_1} p_2^{c_2} \cdots p_r^{c_r} $  
If $n$ is a composite integer, then there exists a prime $p$ such that $p \mid n$ and $ p \le \sqrt{n} $.

### Greatest Common Divisor (gcd)

For integers $a$, $b$ (not both zero), the **greatest common divisor** $\gcd(a,b)$ is the largest positive integer $d$ such that $d \mid a$ and $d \mid b$.

If $ a = \prod\limits_i p_i^{c_i},\ b = \prod\limits_i p_i^{d_i} $, then $ \gcd(a,b) = \prod\limits_i p_i^{\min(c_i, d_i)} $.

The integers $a$ and $b$ are **relatively prime** if $\gcd(a, b) = 1$.

### Least Common Multiple (lcm)

The **least common multiple** $\operatorname{lcm}(a,b)$ is the smallest positive integer divisible by both $a$ and $b$.

If $ a = \prod\limits_i p_i^{c_i},\ b = \prod\limits_i p_i^{d_i} $, then $ \operatorname{lcm}(a,b) = \prod\limits_i p_i^{\max(c_i, d_i)} $.

$ ab = \gcd(a,b)\operatorname{lcm}(a,b) $

### Euclid's Algorithm for gcd

$ \gcd(a, b) = \gcd(a - b, b) $  
$ \gcd(a, b) = \gcd(b, a \bmod b) $

**Bezout's Theorem**: If $a$ and $b$ are positive integers, then there exist integers $s$ and $t$ such that $\gcd(a,b) = sa + tb$

If $a,b,c$ are positive integers such that $\gcd(a,b)=1$ and $a \mid bc$, then $a\mid c$.  
Let $m$ be a positive integer and let $a,b,c$ be integers. If $ac \equiv bc \pmod{m}$ and $\gcd(c,m)=1$, then $a \equiv b \pmod{m}$

## Functions

*Precondition*: statements that describe valid input.  
*Postcondition*: conditions that output should satisfy.

A **function** $f\colon A \to B$ is **well-defined** if assigns exactly one element of $B$ to each element of $A$. We write $ f(a) = b $ if $b$
is the unique element of $B$ that $f$ assigns to $a\in A$.

- The **domain** of $f$ is $A$.
- The **codomain** of $f$ is $B$.
- $b$ is the **image** of $a$, and $a$ is a **preimage** of $b$.
- The **range** (or **image**) of $f$ is the set $\{f(a):a\in A\}$.

Relations:

- **One-to-one (Injective)**: if and only if $f(a)=f(b)\implies a=b$.  
  $|A|\le|B|$ no bigger than
- **Onto (Surjective)**: if and only if $\forall b\in B\ \exists a\in A\ f(a)=b$.  
  $|A|\ge|B|$ no smaller than
- **Bijection**: $f$ is both injective and surjective.
    - $|A|=|B|$
    - **Cantor-Schroder-Bernstein Theorem**: $|A|=|B|$ if and only if $|A|\le|B|$ and $|B|\le|A|$.

### Cantor's Diagonalization (Uncountability of $\mathcal{P}(\mathbb{N})$)

1. **Goal:** Show no bijection $f: \mathbb{N} \to \mathcal{P}(\mathbb{N})$ exists.
2. **Assume** an arbitrary function $f: \mathbb{N} \to \mathcal{P}(\mathbb{N})$.
3. **Construct**  
   $
   D_f = \{\,n \in \mathbb{N} \mid n \notin f(n)\}.
   $
4. **Claim:** $D_f \in \mathcal{P}(\mathbb{N})$ but $D_f\neq f(a)$ for every $a\in\mathbb{N}$.

- If $a \in D_f$, then by definition $a \notin f(a)$. Thus $f(a)\neq D_f$.
- If $a \notin D_f$, then $a \in f(a)$. Again $f(a)\neq D_f$.

5. **Conclusion:** $f$ is not onto, so $\lvert \mathbb{N}\rvert \neq \lvert \mathcal{P}(\mathbb{N})\rvert$.
   Hence $\mathcal{P}(\mathbb{N})$ is uncountable.

## Counting

### Permutations and Combinations

- **Permutation:** An ordered arrangement of all elements of a set of size $n$.  
  Number of permutations:  
  $
  P(n,n) = n!.
  $
- **$r$-Permutation:** An ordered arrangement of $r$ distinct elements chosen from $n$.  
  $
  P(n,r) = n \times (n-1) \times \cdots \times (n - r + 1) = \frac{n!}{(n - r)!}.
  $
- **Combination:** An unordered selection of $r$ elements from $n$.  
  $
  \binom{n}{r} = \frac{n!}{r! \, (n - r)!}.
  $

### Binomial Theorem

For $x,y$ and integer $n\ge0$,
$$
(x+y)^n = \sum\limits_{r=0}^n \binom{n}{r}\,x^{\,n-r}\,y^r.
$$

## Binary Relations

A **binary relation** $R$ **from** $A$ **to** $B$ is any subset $ R \subseteq A \times B $.  
$a R b$ denote $(a, b) \in R$. If $ (a, b) \in R $, then $a$ is related to $b$ by $R$.

When $A=B$, then $R$ is a relation **on** $A$.

$f: A\to B$ is a relation, $(a, f(a)) \in R_f$

#### Alternative Representations

1. **Characteristic Function** $f_{TF}$:  
   $
   f_{TF}\colon A \times B \,\to\, \{\text{T},\,\text{F}\},
   \quad
   f_{TF}(a,b) =
   \begin{cases}
   \text{T} & \text{if } (a,b)\in R,\\
   \text{F} & \text{if } (a,b)\notin R.
   \end{cases}
   $
2. **Adjacency Function** $f_{P}$:  
   $
   f_{P}\colon A \,\to\, \mathcal{P}(B),
   \quad
   f_{P}(a) \;=\; \{\,b\in B : (a,b)\in R\}.
   $
3. **Set‐of‐Pairs Notation**:  
   $
   R = \{\,(a,b)\in A\times B : \text{some condition holds}\}.
   $

### Properties of Relations

Let $R\subseteq A\times A$. Then:

1. **Reflexive**:
   $
   (a,a)\in R,\ \forall a\in A.
   $
2. **Symmetric**:
   $
   (a,b)\in R \to (b,a)\in R ,\ \forall a,b\in A.
   $
3. **Antisymmetric**:
   $
   ((a,b)\in R \land (b,a)\in R) \to a=b ,\ \forall a,b\in A.
   $
4. **Transitive**:
   $
   ((a,b)\in R \land (b,c)\in R) \to (a,c)\in R,\ \forall a,b,c\in A.
   $

### Combining Relations

$R \subseteq A \times B$ and $S \subseteq B \times C$, then the composite of $R$ and $S$, $S \circ R$ is the relation consisting of all ordered pairs $(a, c)$, where $a \in A$, $c \in C$, and there exists an element $b \in B$ such that $(a, b) \in R$ and $(b, c) \in S$.

If $R$ is a relation on $A$, $R^{n+1} = R^n \circ R$

## Equivalence Relations and Partitions

### Equivalence Relation

A relation $R\subseteq A\times A$ is an **equivalence relation** if it is **reflexive**, **symmetric**, and **transitive**.

$a \sim b$ denotes $a$ and $b$ are equivalent elements with respect to a particular equivalence relation.

### Equivalence Class

For $a\in A$, the **equivalence class** of $a$ with respect to $R$ is $ [a]_R = \{\, x\in A : (a,\,x)\in R \} $  
Every equivalence class is nonempty (since $a\in [a]_R$)  
If $b \in [a]_R$, then $b$ is a representative of this equivalence class.

### Partition Induced by an Equivalence Relation

When $R$ is an equivalence relation on $A$, the collection  
$
\{\, [a]_R : a\in A \}
$
is a **partition** of $A$; that is,

1. Each $[a]_R\neq \varnothing.$
2. If $(a,b)\in R$, then $[a]_R = [b]_R.$
3. If $(a,b)\notin R$, then $[a]_R \cap [b]_R = \varnothing.$
4. $\bigcup\limits_{a\in A} [a]_R = A$

Let $R$ be an equivalence relation on a set $S$. Then the equivalence classes of $R$ form a partition of $S$.
Conversely, given a partition $\{A_i \mid i \in I\}$ of the set $S$, there is an equivalence relation $R$ that has the
sets $A_i$, $i \in I$, as its equivalence classes.

- **From Equivalence Relation to Partition**:  
  $
  R \;\mapsto\; \{\,[a]_R : a\in A\,\}.
  $
- **From Partition to Equivalence Relation**:  
  Given a partition $\{A_1,\dots,A_k\}$ of $A$, define  
  $
  R = \{ (x,y)\in A\times A : \exists i,\ x\in A_i \land y\in A_i \}.
  $

### Partial Order

A relation $R\subseteq A\times A$ is a **partial order** if it is **reflexive**, **antisymmetric**, **transitive**.  
$(A, R)$ is a **partially ordered set**, or *poset*. Members of $A$ are elements of the poset.

### Hasse Diagram

For a finite partially ordered set $(A,R)$, the **Hasse diagram** is drawn by:

1. Omitting self-loops $(a,a)$.
2. Omitting edges implied by transitivity: if $(a,c)$ follows from $(a,b)$ and $(b,c)$, do not draw $(a,c)$.
3. Placing elements as nodes in the plane so that if $(a,b)\in R$ (and $a\neq b$), then $b$ is "above" $a$. Draw an undirected edge between $a$ and $b$.
