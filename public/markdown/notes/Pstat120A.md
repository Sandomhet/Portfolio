---
title: "PSTAT 120A Introduction to Probability"
description: "Content includes distributions, random variables..."
time: "Sat May 10, 2025"
lang: "en"
---

# PSTAT 120A

## Table of Contents

## Statistics

- **Data**: Collection of observations (e.g., survey responses, measurements).
- **Population**: The complete set of individuals/elements of interest or under study.
- **Sample**: Data collected on a carefully chosen subset of the population.
- **Parameter**: A numerical measure describing a population characteristic.
- **Statistic**: A numerical measure describing a sample characteristic, obtained from observed data.

## Set Theory

- **Set**: A well-defined collection of objects or elements with no ambiguity about membership.
    - **Notation**: Denoted by capital letters (e.g., $ A, B $); elements within curly brackets (
      e.g., $ A = \{2, 4, 6\} $).
    - **Membership**: $ \in $ means "belongs to"; $ \notin $ means "does not belong to."
- **Subset**: $ Y \subseteq X $ if every element of $ Y $ is in $ X $.
- **Proper Subset**: $ Y \subset X $ if $ Y \subseteq X $ and $ X $ has at least one element not in $ Y $.
- **Universal Set ($ \Omega $ or $ S $)**: Contains all elements under consideration.
- **Empty Set ($ \phi $)**: Contains no elements; a subset of every set.
- **Equality of Sets**: $ A = B $ if $ A \subseteq B $ and $ B \subseteq A $.

### Set Operations

- **Intersection ($ A \cap B $)**: Elements in both $ A $ and $ B $.
- **Union ($ A \cup B $)**: Elements in $ A $, $ B $, or both.
- **Complement ($ A^c $)**: Elements in the universal set $ \Omega $ not in $ A $.
- **Difference ($ A \backslash B $)**: Elements in $ A $ but not in $ B $.
- **Cartesian Product ($ A \times B $)**: Set of ordered pairs $ \{(a, b) : a \in A, b \in B\} $.
- **Disjoint Sets**: Sets $ A $ and $ B $ with no common elements ($ A \cap B = \phi $).

### Set Properties

- **Commutative**: $ A \cup B = B \cup A $, $ A \cap B = B \cap A $.
- **Associative**: $ A \cup (B \cup C) = (A \cup B) \cup C $, $ A \cap (B \cap C) = (A \cap B) \cap C $.
- **Distributive**:
  $
  A \cap (B \cup C) = (A \cap B) \cup (A \cap C), \
  A \cup (B \cap C) = (A \cup B) \cap (A \cup C).
  $
- **De Morgan’s Laws**:
  $$
  (A \cup B)^c = A^c \cap B^c, \quad (A \cap B)^c = A^c \cup B^c.
  $$
  Generalized:
  $$
  \left( \bigcup A_i \right)^c = \bigcap A_i^c, \quad \left( \bigcap A_i \right)^c = \bigcup A_i^c.
  $$

### Cardinality

- $ |A| $: Number of elements in set $ A $.
- If $ A \cap B = \phi $, then $ |A \cup B| = |A| + |B| $.
- For any sets: $ |A \cup B| = |A| + |B| - |A \cap B| $.
- For three sets:
  $$
  |A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |A \cap C| + |A \cap B \cap C|.
  $$
- Cartesian product: $ |A \times B| = |A| \times |B| $.

### Counting

**Basic Principle of Counting**:

- For a task with $ k $ independent stages, where stage $ i $ has $ n_i $ choices, total outcomes are:
  $$
  n_1 \times n_2 \times \cdots \times n_k.
  $$

- **Factorial**: $ n! = n \times (n-1) \times \cdots \times 1 $, with $ 0! = 1 $.
- **Permutation $ (n)_k $**: $ n $ order $ k $:
  $$
  (n)_k = \frac{n!}{(n-k)!}
  $$
- **Combination $ \binom{n}{k} $**: $ n $ choose $ k $:
  $$
  \binom{n}{k} = \frac{n!}{k!(n-k)!}.
  $$
- **Multinomial Coefficient**: partition $ n $ items into $ k $ groups:
  $$
  \binom{n}{n_1, n_2, \ldots, n_k} = \frac{n!}{n_1! n_2! \cdots n_k!}, \quad \text{where} \quad n_1 + n_2 + \cdots + n_k = n.
  $$

## Probability

### Random Experiment

- **Random Experiment**: An experiment where all possible outcomes are known, but the specific outcome on a given trial
  cannot be predicted.
- **Sample Space ($ S $ or $ \Omega $)**: The set of all possible outcomes.
- **Elementary Outcome**: A single outcome in the sample space.
- **Event**: A subset of the sample space.

### Probability

- **Classical Approach** (for finite sample spaces with equally likely outcomes):
  $$
  P(A) = \frac{|A|}{|S|}
  $$
- **Relative Frequency Approach**:
  $$
  P(A) \approx \frac{\text{Number of times } A \text{ occurs in } n \text{ trials}}{n},
  $$
- **Axiomatic Definition** (Kolmogorov, 1933):
    - Probability is a function assigning a number $ P(A) $ to each event $ A $ in a class $ \mathcal{F} $ of subsets
      of $ \Omega $, satisfying:
        1. **Axiom 1**: $ 0 \leq P(A) \leq 1 $.
        2. **Axiom 2**: $ P(\Omega) = 1 $.
        3. **Axiom 3** (Countable Additivity): For disjoint events $ A_1, A_2, \ldots $,
           $$
           P\left( A_1 \cup A_2 \cup \cdots \right) = \sum_{i=1}^\infty P(A_i).
           $$
    - The triple $ (\Omega, \mathcal{F}, P) $ is called a **probability space**.

- **Probability Rules** (from Axiomatic Definition):
    - $ P(\phi) = 0 $.
    - For finite disjoint events $ A_1, \ldots, A_n $:
      $$
      P\left( \bigcup_{i=1}^n A_i \right) = \sum_{i=1}^n P(A_i).
      $$
    - Complement: $ P(A^c) = 1 - P(A) $.
    - If $ A \subset B $, then $ P(A) \leq P(B) $.
    - Union of two events:
      $$
      P(A \cup B) = P(A) + P(B) - P(A \cap B).
      $$
    - Union of three events:
      $$
      P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(B \cap C) - P(A \cap C) + P(A \cap B \cap C).
      $$

- **Equally Likely Outcomes**:
    - For a finite sample space with equally likely outcomes, $ P(\omega) = \frac{1}{|\Omega|} $.
    - Probability of event $ A $: $ P(A) = \frac{|A|}{|\Omega|} $.


- **Countable vs. Uncountable Sample Spaces**:
    - **Countable**: Finite or countably infinite (e.g., natural numbers).
        - Probabilities assigned as $ P(\omega_i) = \rho_i $, with $ \sum \rho_i = 1 $.
    - **Uncountable**: Contains intervals (e.g., lifetime of a bulb).
        - Uniform distribution: Picking a number $ X $ uniformly from $ [0, 1] $:
          $$
          P(X \in [a, b]) = b - a, \quad \text{for } 0 \leq a \leq b \leq 1.
          $$

### Sampling Mechanisms

- **With Replacement, Order Matters**:
    - Sample space: $ \Omega = S \times S \times \cdots \times S $ ($ k $-times), where $ S = \{1, 2, \ldots, n\} $.
    - Size: $ |\Omega| = n^k $.
- **Without Replacement, Order Matters**:
    - Sample space: $ \Omega = \{(s_1, s_2, \ldots, s_k) : s_i \in S, s_i \neq s_j \text{ if } i \neq j\} $.
    - Size: $ |\Omega| = (n)_k $.
- **Without Replacement, Order Does Not Matter**:
    - Sample space: Subsets of size $ k $ from $ \{1, 2, \ldots, n\} $.
    - Size: $ |\Omega| = \binom{n}{k} $.

### Conditional Probability

- **Definition**: The conditional probability of $ A $ given $ B $, denoted by $ P(A \mid B) $ is defined as:
  $$
  P(A \mid B) = \frac{P(A B)}{P(B)}
  $$
    - For fixed $ B $, $ P(\cdot \mid B) $ is a probability measure satisfying all probability axioms, called a
      conditional probability measure.

### Multiplication Rule

- **For Two Events**: For any events $ A $ and $ B $:
  $$
  P(AB) = P(B) P(A \mid B) = P(A) P(B \mid A)
  $$
- **For Three Events**: For events $ A, B, C $:
  $$
  P(ABC) = P(A) P(B \mid A) P(C \mid AB),
  $$
- **For $ n $ Events**: For events $ A_1, A_2, \ldots, A_n $:
  $$
  P(A_1 A_2 \cdots A_n) = P(A_1) P(A_2 \mid A_1) P(A_3 \mid A_1 A_2) \cdots P(A_n \mid A_1 \cdots A_{n-1}),
  $$

### Law of Total Probability

- **Partition of $ \Omega $**: A finite collection of events $ \{B_1, \ldots, B_n\} $ is a partition of $ \Omega $ if
  they are pairwise disjoint ($ B_i \cap B_j = \emptyset $ for $ i \neq j $) and their union
  is $ \Omega $ ($ \bigcup_{i=1}^n B_i = \Omega $).
- **Law**: If $ \{B_1, \ldots, B_n\} $ is a partition of $ \Omega $, then for any event $ A $:
  $$
  P(A) = \sum_{i=1}^n P(A \cap B_i) = \sum_{i=1}^n P(A \mid B_i) P(B_i).
  $$

### Bayes' Theorem

- **Two Events**:
  $$
  P(B \mid A) = \frac{P(A \mid B) P(B)}{P(A \mid B) P(B) + P(A \mid B^c) P(B^c)}.
  $$
- **General Form**: Let $ \{B_1, B_2, \ldots, B_n\} $ be a partition of $ \Omega $:
  $$
  P(B_k \mid A) = \frac{P(A \mid B_k) P(B_k)}{\sum_{i=1}^n P(A \mid B_i) P(B_i)}.
  $$
- **Terminology**:
    - $ P(B_k) $: Prior probabilities (beliefs before observing $ A $).
    - $ P(B_k \mid A) $: Posterior probabilities (updated beliefs after observing $ A $).

### Independence of Events

- **Two Events**: Events $ A $ and $ B $ are independent if:
  $ P(A B) = P(A) P(B) $ or equivalently, $ P(A \mid B) = P(A) $.
- **Three Events**: Events $ A, B, C $ are mutually independent if:
    - Pairwise independence holds:
      $
      P(A B) = P(A) P(B), \ P(A C) = P(A) P(C), \ P(B C) = P(B) P(C),
      $
    - And:
      $$
      P(A B C) = P(A) P(B) P(C).
      $$
- **N Events**: $ 2 \leq k \leq n \text{ and } 1 \leq i_1 < i_2 < \cdots < i_k \leq n $
  $$
  P(A_{i_1}A_{i_2}\cdots A_{i_k}) = P(A_{i_1})P(A_{i_2})\cdots P(A_{i_k})
  $$
- **Note**: Pairwise independence does not imply mutual independence.
- **Independence Property**:
    - If $ A $ and $ B $ are independent, then so are $ A $ and $ B^c $, $ A^c $ and $ B $, $ A^c $ and $ B^c $.
    - Proof for $ A $ and $ B^c $:
      $$
      P(A \cap B^c) = P(A) - P(A \cap B) = P(A) - P(A) P(B) = P(A)(1 - P(B)) = P(A) P(B^c).
      $$

### Conditional Independence

- **Definition**: Events $ A $ and $ B $ are conditionally independent given event $ C $ if:
  $$
  P(A B \mid C) = P(A \mid C) P(B \mid C).
  $$
  Denoted as $ (A \perp B) \mid C $.
- **Remarks**:
    - Conditional independence given $ C $ does not imply marginal independence of $ A $ and $ B $.
    - Marginal independence of $ A $ and $ B $ does not imply conditional independence given $ C $.

### Random Variable

- **Definition**: A random variable (RV), denoted by $ X $, is a real-valued function on the sample space $ \Omega $.
  That is, $ X: \Omega \rightarrow \mathbb{R} $, where $ \mathbb{R} $ is the set of all real numbers.
- **Notation**:
    - RVs are denoted by capital letters (e.g., $ X, Y, Z $), unlike mathematical functions (e.g., $ f, g, h $).
    - For a sample point $ \omega \in \Omega $, the value of RV $ X $ is $ X(\omega) $.
    - For a set $ B \subseteq \mathbb{R} $, the
      event $ \{X \in B\} = \{\omega \in \Omega : X(\omega) \in B\} = X^{-1}(B) $.
- **Probability Distribution**: The set of probabilities $ \{P(X \in B) : B \subseteq \mathbb{R}\} $,
  where $ P(X \in B) = P(X^{-1}(B)) $, is called the probability distribution of $ X $.

### Discrete Random Variable

- **Definition**: A RV $ X $ is discrete if it takes values in a finite or countably infinite set,
  i.e., $ X \in \{k_1, k_2, \ldots\} $.
- **Support**: The set $ S(X) $ of possible values of $ X $ with positive probability is called the support of $ X $.
- **Probability Mass Function (PMF)**: The PMF of a discrete RV $ X $ is the function $ p_X $ defined by:
  $$
  p_X(k) = P(X = k), \quad k \in S(X).
  $$
- **Probability for Events**: For any subset $ B \subseteq S(X) $:
  $$
  P(X \in B) = \sum_{k \in B} P(X = k) = \sum_{k \in B} p_X(k).
  $$

### Types of Random Variables

- **Continuous RV**: A RV $ X $ is continuous if it assumes any value in a finite or infinite interval.
- **Mixed RV**: A RV that is neither purely discrete nor continuous (beyond the scope of this course).
- **Degenerate RV**: A RV $ X $ is degenerate if there exists some real value $ a $ such that:
  $$
  P(X = a) = 1.
  $$

### Independence of Random Variables

- **General Definition**: RVs $ X_1, X_2, \ldots, X_n $ defined on the same probability space are independent if:
  $$
  P(X_1 \in B_1, X_2 \in B_2, \ldots, X_n \in B_n) = Pod_{k=1}^n P(X_k \in B_k),
  $$
  for all subsets $ B_1, B_2, \ldots, B_n \subseteq \mathbb{R} $ and $ n \geq 2 $.
- **Discrete RVs**: Discrete RVs $ X_1, X_2, \ldots, X_n $ are independent if:
  $$
  P(X_1 = x_1, X_2 = x_2, \ldots, X_n = x_n) = Pod_{k=1}^n P(X_k = x_k),
  $$
  for all possible values $ x_1, x_2, \ldots, x_n $.

## Distribution

### Bernoulli Distribution

- **Definition**: $ X \sim \text{Ber}(p) $ represents the result of a trial, success of fail, with success
  probablity $ p $, where $ 0 \leq p \leq 1 $, if $ X $ takes values in $ \{0, 1\} $ and:
  $$
  P(X = 1) = p, \quad P(X = 0) = 1 - p.
  $$
- **Interpretation**: Represents the outcome of a single Bernoulli trial (1 for success, 0 for failure).

### Binomial Distribution

- **Definition**: $ X \sim \text{Bin}(n, p) $ represents the number of successful trials out of $ n $ independent trials
  with success probability $ p $. Its possible values are $ \{0, 1, \ldots, n\} $ and its PMF is:
  $$
  P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad k = 0, 1, \ldots, n.
  $$
- **Conditions**:
    - Arises as the sum $ S_n = X_1 + X_2 + \cdots + X_n $, where:
        - Each $ X_i \sim \text{Ber}(p) $ (identical distributions).
        - $ X_1, X_2, \ldots, X_n $ are independent.
- **Property**: The probabilities sum to 1, as per the binomial theorem:
  $$
  \sum_{k=0}^n \binom{n}{k} p^k (1 - p)^{n - k} = (p + 1 - p)^n = 1.
  $$

### Geometric Distribution

- **Definition**: $ X \sim \operatorname{Ge}(p) $ represents the number of trials until the first success in repeated
  independent trials with success probability $ p $. Its support is $ S(X) = \{1, 2, 3, \ldots\} $ and its PMF
  is $ P(X = k) = (1-p)^{k-1} p $, for $ k \geq 1 $.
- **Alternative**: $ Y = X - 1 $ represents the number of failures before the first success, with
  support $ S(Y) = \{0, 1, 2, \ldots\} $ and PMF $ P(Y = k) = (1 - p)^k p $, for $ k \geq 0 $.
  denoted $ Y \sim \operatorname{Ge}(p) $.
- **Memoryless Property**: $ P(X = n + k \mid X > n) = P(X = k) $, for $ n, k \geq 1 $. This means the probability of
  needing $ k $ more trials to get a success, given $ n $ failures, is the same as needing $ k $ trials from the start.
- **Tail Probability**: $ P(X \geq n) = (1-p)^{n-1} $, representing the probability of at least $ n $ trials (
  first $ n-1 $ failures).
- **Special Case**: If $ p = 0 $, then $ P(X = \infty) = 1 $.

### Negative Binomial Distribution

- **Definition**: $ X \sim \operatorname{NB}(k, p) $ represents the number of trials until the $ k $-th success in
  repeated independent trials with success probability $ p $. Its PMF
  is $ P(X = n) = \binom{n-1}{k-1} p^k (1-p)^{n-k} $, for $ n \in \{k, k+1, k+2, \ldots\} $.
  Note: $ \operatorname{NB}(1, p) = \operatorname{Ge}(p) $.
- **Alternative**: $ Y = X - k $ represents the number of failures before the $ k $-th success, with
  support $ S(Y) = \{0, 1, 2, \ldots\} $ and PMF $ P(Y = m) = \binom{m+k-1}{k-1} p^k q^m $, for $ m \geq 0 $.
- **Representation**: $ X = X_1 + X_2 + \cdots + X_k $, where $ X_i \sim \operatorname{Ge}(p) $ are independent, each
  representing trials until the next success.

### Hypergeometric Distribution

- **Definition**: $ X \sim \operatorname{HG}(N, N_A, n) $, represents the number of type $ A $ items in a sample
  of $ n $ items drawn without replacement from a population of $ N $ items.
- **PMF**: Its PMF is $ P(X = k) = \frac{\binom{N_A}{k} \binom{N - N_A}{n - k}}{\binom{N}{n}} $,
  for $ k = 0, 1, \ldots, n $, where $ \max(0, n - N_B) \leq k \leq \min(n, N_A) $.

### Poisson Distribution

- **Definition**: $ X \sim \operatorname{Poi}(\lambda) $, $ \lambda > 0 $ represents the number of rare events in a
  fixed time period, with support $ S(X) = \{0, 1, 2, \ldots\} $ and
  PMF $ P(X = x) = \frac{e^{-\lambda} \lambda^x}{x!} $, for $ x = 0, 1, 2, \ldots $. Used for events like accidents,
  tornadoes, or disease cases.

## Continuous Random Variable

Probablity Density Function (pdf)

$ \int_{-\infty}^{\infty} f(x)dx = 1 $
$ P(a \leq X \leq b) = \int_{a}^{b} f(x)dx $

Cumulative Distribution Function (cdf)
for any random varibles

### Uniform Distribution

$$ f(x \mid a, b) = \frac{1}{b - a} $$

## Continuous Random Variables

- **Definition**: A random variable $ X $ is continuous if it can assume any value in a finite or infinite interval.
- **Probability Assignment**: Probabilities for a continuous rv $ X $, such as $ P(X \in B) $
  for $ B \subset \mathbb{R} $, are defined via a probability density function (pdf). The pdf is conceptualized as the
  limit of discrete histograms.

## Probability Density Function (pdf)

- **Definition**: A function $ f(x) $ is a pdf for a continuous rv $ X $ if:
    - (i) $ f(x) \geq 0 $ (non-negative).
    - (ii) $ \int_{-\infty}^{\infty} f(x) \, dx = 1 $ (total area under the curve equals 1).
- **Probability Calculation**: For $ a \leq b $, $ P(a \leq X \leq b) = \int_a^b f(x) \, dx $, representing the area
  under $ f(x) $ over $ [a, b] $. Since $ P(X = c) = \int_c^c f(x) \, dx = 0 $, probabilities are equal for
  inclusive/exclusive endpoints: $ P(a \leq X \leq b) = P(a < X \leq b) = P(a \leq X < b) = P(a < X < b) $.

### Uniform Distribution

- **Definition**: A continuous rv $ X \sim U(a, b) $ has a uniform distribution on $ [a, b] $ if its pdf
  is $ f(x) = \frac{1}{b-a} $ for $ a \leq x \leq b $, 0 otherwise. Probability
  over $ [c, d] \subseteq [a, b] $: $ P(c \leq X \leq d) = \int_c^d \frac{1}{b-a} \, dx = \frac{d-c}{b-a} $.

### Infinitesimal Method

- **Concept**: The pdf $ f(x) $ is not a probability but approximates probabilities over tiny intervals. For a
  continuous pdf $ f $, if $ f $ is continuous at $ a $,
  then $ P(a < X < a + \varepsilon) \approx f(a) \cdot \varepsilon $, $ P(a - \varepsilon < X < a) \approx f(a) \cdot \varepsilon $,
  and $ P(a - \varepsilon < X < a + \varepsilon) \approx f(a) \cdot 2\varepsilon $ for small $ \varepsilon $.
- **Example**: For $ f(x) = 3x^2 $ on $ (0, 1) $, 0 elsewhere, compare $ P(0.50 < X < 0.51) $:
    - Exact: $ \int_{0.50}^{0.51} 3x^2 \, dx = 0.51^3 - 0.50^3 = 0.00765 $.
    - Approximation: $ f(0.50) \cdot 0.01 = 3 \cdot 0.50^2 \cdot 0.01 = 0.0075 $. Relative error: 2%.
- **Example (Finding pdf)**: A dart hits a board of radius 9 inches, with $ R $ as the distance from the center.
  For $ t \in (0, 9) $, the
  probability $ P(t < R < t + \varepsilon) \approx \frac{2\pi t \varepsilon + \pi \varepsilon^2}{\pi \cdot 9^2} $.
  Thus, $ f_R(t) = \lim_{\varepsilon \to 0} \frac{1}{\varepsilon} P(t < R < t + \varepsilon) = \frac{2t}{81} $,
  for $ t \in (0, 9) $, which is a valid pdf.

## Cumulative Distribution Function (cdf)

The pmf are defined only for discrete rvs and pdf are defined only for continuous rvs. But cdf apply to any rvs.

- **Definition**: The cdf of any rv $ X $ is $ F(x) = P(X \leq x) $, defined for all $ x \in \mathbb{R} $.
  $ P(a < X \leq b) = F(b) - F(a) $.
- **Form**: For a continuous rv, $ F(x) = \int_{-\infty}^x f(t) \, dt $. For a discrete
  rv, $ F(x) = \sum_{k \leq x} P(X = k) $.
- **Discrete cdf Properties**: The cdf graph is a step function, jumping at possible values of $ X $, with jump size
  at $ a $ equal to $ P(X = a) = F(a) - F(a^-) $. The PMF can be recovered from the cdf.

### CDF for Continuous RVs

- **Definition**: For a continuous rv $ X $ with pdf $ f $, the CDF
  is $ F(x) = P(X \leq x) = \int_{-\infty}^x f(t) \, dt $.
- **Finding pdf from CDF**: If $ F $ is continuous and differentiable, the pdf is $ f(x) = F'(x) $. If not
  differentiable, then $ f(x) $ is arbitrary.
- If $ F $ is **piecewise constant** function, then X is a discrete rv with support, the set of jump
  points, $ B = \{x : F(x) − F(x^-) = P(X = x) > 0\} $
- **Properties of CDF**:
    - $ \lim\limits_{x \to -\infty} F(x) = 0 $, $ \lim\limits_{x \to \infty} F(x) = 1 $.
    - **Monotonicity**: If $ x < y $, then $ F(x) \leq F(y) $.
    - **Right continuity**: $ F(a) = \lim\limits_{x \to a^+} F(x) $.
    - **Left limit**: $ F(a^-) = \lim\limits_{x \to a^-} F(x) = P(X < a) $.
    - $ P(X = a) = F(a) - F(a^-) $ (jump size at $ a $). For continuous $ X $, $ F(a) = F(a^-) $.

## Moments of a Random Variable

- **Expectation**: For a function $ g(X) $, $ E[g(X)] = \sum\limits_k g(k) P(X = k) $ (discrete)
  or $ \int_{-\infty}^\infty g(x) f(x) \, dx $ (continuous).
- **n-th Moment**: $ E(X^n) $, where $ g(x) = x^n $.
    - Mean: $ \mu = E(X) = \sum\limits_k k P(X = k)  $.
    - Variance: $ \sigma^2 = \operatorname{Var}(X) = E((X - \mu)^2) = E(X^2) - (E(X))^2 $.
    - Standard Deviation: $ \sigma = \sqrt{\operatorname{Var}(X)} $.
- **Properties**:
    - $ E(aX + b) = aE(X) + b $.
    - $ \operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X) $.
    - $ \operatorname{Var}(X) = 0 $ if and only if $ P(X = c) = 1 $ for some constant $ c $.
    - For rvs $ X_1, \ldots, X_n $: $ E\left(\sum_{k=0}^n a_k X_k\right) = \sum_{k=0}^n a_k E(X_k) $.
    - If
      independent: $ \operatorname{Var}\left(\sum_{k=0}^n a_k X_k\right) = \sum_{k=0}^n a_k^2 \operatorname{Var}(X_k) $.

### Percentiles/Quantiles

- The $ p $-th quantile $ x_p $ satisfies $ P(X \leq x_p) \geq p $ and $ P(X \geq x_p) \geq 1-p $.
- Median: $ x_{0.5} $.
- First and third quartiles: $ x_{0.25} $, $ x_{0.75} $.
- For continuous $ X $, $ F(x_p) = p $, and quantiles are unique.

## Gaussian (Normal) Distribution

- **Standard Normal**: $ Z \sim \mathcal{N}(0, 1) $, pdf $ \varphi(z) = \frac{1}{\sqrt{2\pi}} e^{-\frac{z^2}{2}} $,
  CDF $ \Phi(z) = \int_{-\infty}^z \varphi(s) \, ds $.
    - $ \int_{-\infty}^{+\infty} e^{-\frac{s^2}{2}} ds = \sqrt{2\pi} $
    - $ E(Z) = 0 $, $ \operatorname{Var}(Z) = 1 $.
    - Symmetry: $ \varphi(z) = \varphi(-z) $, $ \Phi(z) = 1 - \Phi(-z) $.
- **General Normal**: $ X = \sigma Z + \mu \sim \mathcal{N}(\mu, \sigma^2) $,
  pdf $ f(x) = F'(x) = \frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{(x - \mu)^2}{2\sigma^2}} $,
  CDF $ F(x) = \Phi\left(\frac{x - \mu}{\sigma}\right) $.
    - $ E(X) = \mu $, $ \operatorname{Var}(X) = \sigma^2 $.

## Central Limit Theorem (CLT) for Binomial Distribution

- **Binomial Setup**: For $ S_n \sim \operatorname{Bin}(n, p) $, $ S_n = X_1 + \cdots + X_n $,
  where $ X_i \sim \operatorname{Ber}(p) $, independent, $ P(X_i = 1) = p $, $ P(X_i = 0) = q = 1-p $.
    - Mean: $ E(S_n) = np $.
    - Variance: $ \operatorname{Var}(S_n) = npq $.
    - PMF: $ P(S_n = k) = \binom{n}{k} p^k q^{n-k} $, computationally intensive for large $ n $.
- **CLT**: For large $ n $, the standardized binomial rv $ \frac{S_n - np}{\sqrt{npq}} $ approximates a standard
  normal $ Z \sim \mathcal{N}(0, 1) $.
    -
    Theorem: $ \lim\limits_{n \to \infty} P\left(a \leq \frac{S_n - np}{\sqrt{npq}} \leq b\right) = \int_a^b \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}} dx = \Phi(b) - \Phi(a) $,
    where $ \Phi $ is the standard normal CDF.
    - Denoted: $ \frac{S_n - np}{\sqrt{npq}} \xrightarrow{d} \mathcal{N}(0, 1) $ (convergence in distribution).
- **Normal Approximation**: For large $ n $
  and $ npq > 10 $, $ P\left(a \leq \frac{S_n - np}{\sqrt{npq}} \leq b\right) \approx \Phi(b) - \Phi(a) $.
- **Continuity Correction**: For integer bounds $ k_1 \leq S_n \leq k_2 $, use:
    - $ P(k_1 \leq S_n \leq k_2) = P(k_1 - \frac{1}{2} \leq S_n \leq k_2 + \frac{1}{2}) \approx \Phi\left(\frac{k_2 + 0.5 - np}{\sqrt{npq}}\right) - \Phi\left(\frac{k_1 - 0.5 - np}{\sqrt{npq}}\right) $.

## Law of Large Numbers (LLN)

- **Theorem**: For $ S_n \sim \operatorname{Bin}(n, p) $, the sample proportion $ \frac{S_n}{n} $ converges to $ p $:
    - $ \lim\limits_{n \to \infty} P\left(\left|\frac{S_n}{n} - p\right| < \varepsilon\right) = 1 $ for
      any $ \varepsilon > 0 $.
- $ \hat{p} = \frac{S_n}{n} $, $ P(|\hat{p} - p| < \varepsilon) \approx 2\Phi\left(\frac{\varepsilon \sqrt{n}}{\sqrt{pq}}\right) - 1 \geq 2\Phi\left(2\varepsilon \sqrt{n}\right) - 1 $.

## Poisson Approximation

- **Poisson Distribution**: $ X \sim \operatorname{Poi}(\lambda) $,
  PMF: $ P(X = k) = e^{-\lambda} \frac{\lambda^k}{k!} $, $ E(X) = \operatorname{Var}(X) = \lambda $.
- **Law of Rare Events**:
  For $ S_n \sim \operatorname{Bin}(n, \frac{\lambda}{n}) $, $ \lim\limits_{n \to \infty}P(S_n = k) = e^{-\lambda} \frac{\lambda^k}{k!} $
    - $ \lim\limits_{n \to \infty} np_n = \lambda $, $ p_n = \frac{\lambda}{n} $
- **General Case**: If $ X $ counts rare, weakly dependent
  events, $ P(X = k) \approx e^{-\lambda} \frac{\lambda^k}{k!} $, where $ \lambda = E(X) $.
- For $ X \sim \text{Bin}(n, p) $ and $ Y \sim \text{Poi}(np) $, then for any
  subset $ A \subseteq \{0, 1, 2, \dots\} $, $ \left| P(X \in A) - P(Y \in A) \right| \leq np^2 $
- **Normal vs. Poisson**: Use normal if $ np(1-p) > 10 $; use Poisson if $ np^2 $ is small.

## Exponential Distribution

- **Definition**: $ X \sim \operatorname{Exp}(\lambda) $, pdf: $ f(x) = \lambda e^{-\lambda x} $ for $ x \geq 0 $, 0
  otherwise.
    - CDF: $ F(t) = 1 - e^{-\lambda t} $ for $ t \geq 0 $, 0 otherwise.
    - $ P(X > t) = e^{-\lambda t} $.
- **Moments
  **: $ E(X) = \frac{1}{\lambda} $, $ E(X^2) = \frac{2}{\lambda^2} $, $ \operatorname{Var}(X) = \frac{1}{\lambda^2} $.
- **Memoryless Property**: $ P(X > t + s \mid X > t) = P(X > s) = e^{-\lambda s} $.
- **Example 6**: $ X \sim \operatorname{Exp}\left(\frac{1}{2}\right) $.
    - $ P\left(X > \frac{7}{2}\right) = e^{-\frac{1}{2} \cdot \frac{7}{2}} = e^{-\frac{7}{4}} $.
    - Median: Solve $ P(X \leq m) = 1 - e^{-\frac{m}{2}} = \frac{1}{2} $,
      so $ e^{-\frac{m}{2}} = \frac{1}{2} $, $ m = 2 \ln 2 \approx 1.386 $.

## Gamma Distribution

- **Gamma Function**: $ \Gamma(r) = \int_0^\infty x^{r-1} e^{-x} \, dx $, $ \Gamma(n) = (n-1)! $ for integer $ n $.
- **Definition**: $ X \sim \operatorname{Ga}(r, \lambda) $,
  pdf: $ f(x) = \frac{\lambda^r}{\Gamma(r)} e^{-\lambda x} x^{r-1} $ for $ x \geq 0 $, 0 otherwise.
    - If $ X_i \sim \operatorname{Exp}(\lambda) $, independent,
      then $ \sum_{i=1}^n X_i \sim \operatorname{Ga}(n, \lambda) $.
- **Moments**: $ E(X) = \frac{r}{\lambda} $, $ \operatorname{Var}(X) = \frac{r}{\lambda^2} $.

## Moment Generating Functions (MGFs)

- **Definition**: For a random variable $ X $, the MGF is $ M(t) = M_X(t) = E[e^{tX}] $, $ t \in \mathbb{R} $, a
  deterministic function of $ t $.
- **Transformation**: If $ Y = aX + b $, then $ M_Y(t) = e^{tb} M_X(at) $.

### Finding Moments from MGF

- **Property**: If $ M_X(t) $ is differentiable at $ t = 0 $, the $ n $-th moment is $ E[X^n] = M_X^{(n)}(0) $. Derived
  from $ M_X^{(n)}(t) = E[X^n e^{tX}] $.
- **Example 5 (Bernoulli)**: $ X \sim \operatorname{Ber}(p) $. $ M_X(t) = (1-p) + p e^t $, $ M_X^{(n)}(t) = p e^t $.
- **Example 6 (Exponential)**: $ X \sim \operatorname{Exp}(\lambda) $, $ M_X(t) = \frac{\lambda}{\lambda - t} $
  for $ t < \lambda $. $ M_X^{(n)}(t) = n! \lambda (\lambda - t)^{-n-1} $,
  so $ E[X^n] = M_X^{(n)}(0) = n! \lambda^{-n} $.
- **Example 7 (Standard Normal)**: $ Z \sim \mathcal{N}(0, 1) $, $ M_Z(t) = e^{t^2 / 2} $.
    - Taylor expansion: $ e^{t^2 / 2} = \sum_{k=0}^\infty \frac{(t^2 / 2)^k}{k!} $.
    - Moments: $ E[Z^n] = 0 $ if $ n $ is odd, $ E[Z^n] = (n-1)!! $ if $ n $ is even (double factorial).

### Equality in Distribution

- **Definition**: $ X \stackrel{d}{=} Y $ if $ P(X \in B) = P(Y \in B) $ for all subsets $ B \subseteq \mathbb{R} $.
  Implies same pmf/pdf, MGF, and $ E[g(X)] = E[g(Y)] $.
- **Theorem**: If $ M_X(t) = M_Y(t) $ for $ t \in (-\delta, \delta) $, then $ X \stackrel{d}{=} Y $.

### Distribution of a function of a random variable $ g(X) $

- **Discrete Case**:
    - PMF: $ P(Y = y) = P(g(X) = y) = \sum\limits_{k: g(k) = y} P(X = k) $.
    - If $ g $ is one-to-one, $ P(Y = y) = P(X = g^{-1}(y)) $.
- **Continuous Case**:
    - **CDF Method**: Find $ F_Y(y) = P(g(X) \leq y) $, then $ f_Y(y) = F_Y'(y) $.
    - **Transformation Method (general)**:
        - For one-to-one
          differentiable $ g $, $ f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy}g^{-1}(y) \right| = \frac{f_X(g^{-1}(y))}{\left| g'(g^{-1}(y)) \right|} $
          for $ y $ such that $ g^{-1}(y) $ exists and $ g'(g^{-1}(y)) \neq 0 $, $ f_Y(y) = 0 $ otherwise.
        - For many-to-one
          differentiable $ g $: $ f_Y(y) = \sum\limits_{\substack{x : g(x) = y \\ g'(x) \neq 0}} \frac{f_X(x)}{|g'(x)|} $.

## Joint Distribution of Random Variables

Let $ X_1, X_2, \ldots, X_n $ be random variables on a sample space $ \Omega $. The random vector is defined
as: $ X = (X_1, X_2, \ldots, X_n): \Omega \rightarrow \mathbb{R}^n $  
The **joint (multivariate) distribution** is: $ P(X \in B) = P((X_1, \ldots, X_n) \in B), B \subseteq \mathbb{R}^n $  
**Marginal distributions** are the distributions of individual coordinates $ X_j $.  
The **joint CDF** is $ F(x_1, \ldots, x_n) = P(X_1 \leq x_1, \ldots, X_n \leq x_n) $

### Joint Distribution of Discrete RVs

**Definition:** Let $ X_1, \ldots, X_n $ be discrete RVs. The **joint PMF** is:

1. $ p(k_1, \ldots, k_n) = P(X_1 = k_1, \ldots, X_n = k_n) \geq 0 $
2. $ \sum\limits_{k_1,\ldots,k_n} p(k_1, \ldots, k_n) = 1 $

For a real-valued function $ g: \mathbb{R}^n \to \mathbb{R} $:
$
E[g(X_1, \ldots, X_n)] = \sum\limits_{k_1,\ldots,k_n} g(k_1, \ldots, k_n) p(k_1, \ldots, k_n)
$

- **Marginal PMF** of $ X_j $:
  $
  p_{X_j}(k) = \sum\limits_{k_1,\ldots,k_{j-1},k_{j+1},\ldots,k_n} p(k_1, \ldots, k_{j-1}, k, k_{j+1}, \ldots, k_n)
  $
- Joint PMF of a subset $ (X_1, \ldots, X_m) $, where $ m < n $:
  $
  p_{X_1,\ldots,X_m}(k_1, \ldots, k_m) = \sum\limits_{k_{m+1},\ldots,k_n} p(k_1, \ldots, k_m, k_{m + 1}, \ldots, k_n)
  $

For two variables $ X $ and $ Y $: $ p_X(x) = \sum_y p_{X,Y}(x, y) $

#### Multinomial Distribution

$ (X_1, \ldots, X_r) \sim \text{Mult}(n, r, p_1, \ldots, p_r) $:
$
P(X_1 = k_1, \ldots, X_r = k_r) = \binom{n}{k_1, \cdots, k_r} p_1^{k_1} \cdots p_r^{k_r}
$

- $ \sum k_j = n $, $ \sum p_j = 1 $, $ k_j \geq 0 $
- Marginal: $ X_j \sim \text{Bin}(n, p_j) $

### Jointly Continuous RVs

**Definition:** RVs $ X_1, \ldots, X_n $ are **jointly continuous** if there exists a **joint density function** $ f $
on $ \mathbb{R}^n $ such that:
$
P((X_1, \ldots, X_n) \in B) = \displaystyle\int \cdots \int_B f(x_1, \ldots, x_n) dx_1 \cdots dx_n
$

- $ f(x_1, \ldots, x_n) \geq 0 $
- $ \int_{-\infty}^\infty \cdots \int_{-\infty}^\infty f(x_1, \ldots, x_n) dx_1 \cdots dx_n = 1 $

**Expectation:
** $ E[g(X_1, \ldots, X_n)] = \displaystyle\int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} g(x_1, \ldots, x_n) f(x_1, \ldots, x_n) dx_1 \cdots dx_n $

**Marginal PDF** $ X_j $:
$
f_{X_j}(x) = \int_{-\infty}^\infty \cdots \int_{-\infty}^\infty f(x_1, \ldots, x_{j-1}, x, x_{j+1}, \ldots, x_n) dx_1 \cdots dx_{j-1} dx_{j+1} \cdots dx_n
$

For two RVs $ X, Y $: $ f_X(x) = \int_{-\infty}^\infty f_{X,Y}(x, y) dy $

**Infinitesimal method
**: $ P(X_1 \in (a_1, a_1 + \varepsilon), \ldots, X_n \in (a_n, a_n + \varepsilon)) \approx f(a_1, \ldots, a_n) \cdot \varepsilon^n $

### Independence of RVs

- **Discrete case:** $ X_1, \ldots, X_n $ are independent if
  $
  p(k_1, \ldots, k_n) = p_{X_1}(k_1) \cdots p_{X_n}(k_n)
  $
- **Continuous case:** $ X_1, \ldots, X_n $ are independent if
  $
  f(x_1, \ldots, x_n) = f_{X_1}(x_1) \cdots f_{X_n}(x_n)
  $
- **CDFs:**
  $
  F(x_1, \ldots, x_n) = Pod_{j=1}^n F_{X_j}(x_j)
  $
- **Functional Independence:**
  If $ X_1, \ldots, X_{m+n} $ are independent, then $ Y = f(X_1, \ldots, X_m) $ and $ Z = g(X_{m+1}, \ldots, X_{m+n}) $
  are independent.

## Uniform Distribution in higher dimensions.

## Sum of Random Variables

**Convolution of Distributions**

### Discrete Case

$
p_{X+Y}(n) = \sum\limits_k P(X = k, Y = n - k) = \sum\limits_k p_{X,Y}(k, n - k)
$
If $ X $ and $ Y $ are **independent**, then:
$
p_{X+Y}(n) = \sum\limits_k p_X(k) p_Y(n - k) = (p_X * p_Y)(n)
$
This is called the **convolution** of $ X $ and $ Y $.

### Continuous Case

$
f_{X+Y}(z) = \int_{-\infty}^{\infty} f_{X,Y}(x, z - x) dx
$
If $ X $ and $ Y $ are **independent**, then:
$
f_{X+Y}(z) = \int_{-\infty}^{\infty} f_X(x) f_Y(z - x) dx = (f_X * f_Y)(z)
$

### Convolutions of Distributions

- If $ X \sim \text{Poisson}(\lambda) $, $ Y \sim \text{Poisson}(\mu) $,
  then $ X + Y \sim \text{Poisson}(\lambda + \mu) $
- If $ X \sim \text{Bin}(n_1, p) $, $ Y \sim \text{Bin}(n_2, p) $, then $ X + Y \sim \text{Bin}(n_1 + n_2, p) $
- If $ X, Y \sim \text{Ge}(p) $, then $ X + Y \sim \text{NB}(2, p),\ P(X + Y = n) = (n-1)p^2(1-p)^{n-2} $
  More generally: $ X_1 + \cdots + X_k \sim \text{NB}(k, p) $
  $ P(X_1 + \cdots + X_k = n) = \binom{n-1}{k-1} p^k (1-p)^{n-k} $
- If $ X_i \sim \mathcal{N}(\mu_i, \sigma_i^2) $,
  then $ X = a_1 X_1 + \cdots + a_n X_n + b \sim \mathcal{N}(\mu, \sigma^2) $
  $
  \mu = \sum a_i \mu_i + b, \quad \sigma^2 = \sum a_i^2 \sigma_i^2
  $
- If $ X_i \sim \text{Exp}(\lambda) $, then $ X_1 + \cdots + X_k \sim \text{Gamma}(k, \lambda) $
  $ f_{X+Y}(z) = \lambda^2 z e^{-\lambda z} $
- If $ X_i \sim \text{Gamma}(\alpha_i, \lambda) $,
  then $ X_1 + \cdots + X_k \sim \text{Gamma}(\alpha, \lambda) $, $ \alpha = \sum\alpha_i $
- If $ X, Y \sim \text{Unif}(0, 1) $, then $
  f_{X+Y}(z) =
  \begin{cases}
  z, & 0 \le z \le 1 \\
  2 - z, & 1 < z \le 2 \\
  0, & \text{otherwise}
  \end{cases}
  $
  $~$

## Exchangeable Random Variables

**Definition**: A sequence of rvs $ X_1, \ldots, X_n $ is **exchangeable** if for any permutation $ (k_1, \ldots, k_n) $
of $ (1, \ldots, n) $, $ (X_1, \ldots, X_n) \overset{d}{=} (X_{k_1}, \ldots, X_{k_n}) $

**Consequences of Exchangeability**:

- Joint probabilities remain invariant under permutation.
- $ X_k $ are identically distributed and have the same marginal distributions. $ X_1 \overset{d}{=} X_{k_1} $ and
  further $ (X_1, \ldots, X_k) \overset{d}{=} (X_{i_1}, \ldots, X_{i_k}) $
- PMF/PDF is symmetric.
- Expectations of symmetric functions do not change under
  permutation: $ E[g(X_1, \ldots, X_k)] = E[g(X_{i_1}, \ldots, X_{i_k})] $

### Independent Identically Distributed (i.i.d) Random Variables

A sequence $ X_1, X_2, \ldots $ is **i.i.d.** if all $ X_i $ are independent and each $ X_i $ has the same probability
distribution.
**Theorem**: An i.i.d. sequence of random variables is exchangeable.

- Let $ X_1, \ldots, X_k $ be sampled without replacement from $ \{1, 2, \ldots, n\} $. Then the sequence is
  exchangeable.
- If $ X_1, \ldots, X_n $ are exchangeable, then the sequence $ g(X_1), \ldots, g(X_n) $ for any function $ g $ is
  exchangable.

## Expectation and Variance of Sums

### Sum of Functions of a Random Vector

- **Linearity of expectation**  
  $ E\bigl[\sum\limits_{i=1}^n g_i(X_i) \bigr] = \sum\limits_{i=1}^n E\bigl[g_i(X_i)\bigr]. $
  > *Note:* Independence is **not** required.
- **Indicator Method**  
  If $X=\sum I_i$ where each $I_i$ is an indicator (bernoulli) rv, then $ E[X] = \sum E[I_i] = \sum P(I_i=1). $
- **Product of expectations**  
  If $X_1,\dots,X_n$ are independent and $g_i$ are functions,
  then $ E\Bigl[\prod\limits_{i=1}^n g_i(X_i)\Bigr] = \prod\limits_{i=1}^n E[\,g_i(X_i)\,] $.
- **Variance of a sum**  
  If $X_1,\dots,X_n$ are independent with $\operatorname{Var}(X_i)<\infty$,
  then $ \operatorname{Var}\bigl(\sum\limits_{i=1}^n X_i) = \sum\limits_{i=1}^n \operatorname{Var}(X_i) $.

- **Sample mean and sample variance**  
  Let $X_1, X_2, \dots$ be i.i.d. rvs with finite mean $\mu$ and variance $\sigma^2$. Define the sample mean of the
  first $ n $ observations $ \overline{X}_n = \frac{1}{n}\sum\limits_{i=1}^n X_i $.
  Then $ E[\overline{X}_n] = \mu, \ \operatorname{Var}(\overline{X}_n) = \frac{\sigma^2}{n} $.
  > *Interpretation:* $\overline{X}_n$ is an unbiased estimator of $\mu$, and its variance shrinks at rate $1/n$.
    - **The effect of averaging**: As $ n \to \infty $, $ \operatorname{Var}(\overline{X}_n) $ vanishes, and
      so $ \overline{X}_n $ converges to mean $ \mu $.

### Moment Generating Functions (MGFs) of Sums

- **MGF of a sum**  
  If $X$ and $Y$ are independent, then $ M_{X+Y}(t) = M_X(t)\,M_Y(t) $.
  More generally, for independent $X_1,\dots,X_n$: $ M_{\sum\limits_i X_i}(t) = \prod\limits_{i=1}^n M_{X_i}(t) $.
- **Uniqueness & distribution of sums**  
  If $M_{X+Y}(t)$ matches the MGF of a known rv $Z$, then $X+Y$ and $Z$ share the same distribution.

## Covariance

- **Definition**: For random variables $X$ and $Y$, the **covariance**
  is $ \mathrm{Cov}(X,Y) = E\bigl[(X-\mu_X)(Y-\mu_Y)\bigr] = E[XY] - E[X]E[Y] $
- $ \mathrm{Cov}(X,X) = \mathrm{Var}(X) $
- **Sign of Covariance**
    - $\mathrm{Cov}(X,Y)>0$: *positively correlated*. $X$ and $Y$ tend to deviate together.
    - $\mathrm{Cov}(X,Y)<0$: *negatively correlated*. $X$ and $Y$ tend to deviate in opposite directions.
    - $\mathrm{Cov}(X,Y)=0$: *uncorrelated*.
- Independent implies uncorrelated, but uncorrelated doesn't imply independent. If $X\perp Y$,
  then $\mathrm{Cov}(X,Y)=0$.

- If $I_A$ and $I_B$ are indicators of events $A$ and $B$,
  then $ \mathrm{Cov}(I_A, I_B) = P(A\cap B) - P(A)P(B) = P(B)\bigl[P(A\mid B)-P(A)\bigr] $  
  In particular, $\mathrm{Cov}(I_A,I_B)=0$ if and only if $A$ and $B$ are independent.

### Variance of Sum (with Covariances)

- For $X_1,\dots,X_n$ with finite variances and covariances,
  $ \mathrm{Var}\Bigl(\sum\limits_{i=1}^n X_i\Bigr) = \sum\limits_{i=1}^n \mathrm{Var}(X_i) + 2\sum\limits_{1\le i<j\le n}\mathrm{Cov}(X_i,X_j) $  
  If they are uncorrelated,
  then $ \mathrm{Var}\Bigl(\sum\limits_{i=1}^n X_i\Bigr) = \sum\limits_{i=1}^n \mathrm{Var}(X_i) $.

### Properties of Covariance

1. **Symmetry**: $\mathrm{Cov}(X,Y)=\mathrm{Cov}(Y,X)$.
2. **Linearity in First Argument**: $\mathrm{Cov}(aX+b,\,Y)=a\,\mathrm{Cov}(X,Y)$.
3. **Bilinearity
   **: $ \mathrm{Cov}\Bigl(\sum\limits_{i=1}^n a_iX_i, \sum\limits_{j=1}^m b_jY_j\Bigr) = \sum\limits_{i=1}^n\sum\limits_{j=1}^m a_i\,b_j \mathrm{Cov}(X_i,Y_j) $

### Correlation Coefficient

$ \mathrm{Corr}(X,Y) = \frac{\mathrm{Cov}(X,Y)}{\sqrt{\mathrm{Var}(X)}\sqrt{\mathrm{Var}(Y)}} $, $ \rho(X,Y) \in [-1, 1] $

**Key Properties**

1. $a\neq0$, then $ \mathrm{Corr}(aX + b, Y) = \frac{a}{\lvert a\rvert} \mathrm{Corr}(X,Y) $.
2. $ \mathrm{Corr}(aX + b, cY + d) = \frac{ac}{\lvert ac\rvert}\mathrm{Corr}(X,Y) $
3. $\mathrm{Corr}(X,Y)=1$ if and only if $ Y = aX + b $ for $a>0$ and $b\in\mathbb{R}$.
4. $\mathrm{Corr}(X,Y)=-1$ if and only if $ Y = aX + b $ for $a<0$ and $b\in\mathbb{R}$.

#### Multinomial Example

- For $(X_1,\dots,X_k)\sim\mathrm{Multinomial}(n, k, p_1,\dots,p_k)$:
  $ \mathrm{Cov}(X_i,X_j)
  = \begin{cases}
  n\,p_i(1-p_i), & i=j,\\
  -n\,p_i\,p_j, & i\neq j.
  \end{cases}
  $
  $ \mathrm{Corr}(X_i,X_j) = -\sqrt{\frac{p_i\,p_j}{(1-p_i)(1-p_j)}} $ for $i\neq j$.

## Tail Bounds and Limit Theorems

### Inequality

- Lemma: If $X \ge Y$, then $ E[X] \ge E[Y] $
- **Markov's Inequality**: $X$ is nonnegative rv and $c>0$, then $ P(X \ge c) \le \frac{E[X]}{c} $.
- **Chebyshev's Inequality**: Let $X$ have mean $\mu$ and variance $\sigma^2$. For
  any $c>0$, $ P(|X-\mu|\ge c) \le \frac{\sigma^2}{c^2} $.  
  Equivalently, $ P(X\ge\mu+c)\le\frac{\sigma^2}{c^2}, \ P(X\le\mu-c)\le\frac{\sigma^2}{c^2}. $

### Law of Large Numbers (LLN)

Let $\{X_i\}$ be i.i.d. with mean $\mu$ and variance $\sigma^2$. Define $ S_n = X_1 + \cdots + X_n $
Then for
every $\varepsilon>0$, $ \lim\limits_{n\to\infty} P\bigl(\bigl|\frac{S_n}{n} - \mu\bigr|<\varepsilon\bigr) = 1 $  
Strong LLN: $ P\bigl(\lim\limits_{n\to\infty} \frac{S_n}{n} = \mu \bigr) = 1 $

### Continuity Theorem for MGFs

Random variables $Y_1, Y_2, Y_3, \ldots$ satisfy $ \lim\limits_{n \to \infty} M_{Y_n}(t) = M_X(t) $ for all $t$ in the
interval $(-\varepsilon, \varepsilon)$. Then for
any $a \in \mathbb{R}$, $ \lim\limits_{n \to \infty} P(Y_n \le a) = P(X \le a) $

### Central Limit Theorem (CLT)

Let $X_1,\dots,X_n$ be i.i.d. with mean $\mu$ and variance $\sigma^2$.
Define $ S_n = \sum\limits_{i=1}^n X_i, \ Z_n = \frac{S_n - n\mu}{\sigma\sqrt{n}} $  
Then for any real $a \le b$, $ \lim\limits_{n\to\infty} P\bigl(a \le Z_n \le b\bigr) = \Phi(b) - \Phi(a) $

#### Monte Carlo Method and Confidence Interval

$
\mu \approx \bar X_n = \frac{1}{n} \sum\limits_{i=1}^n X_i, \quad
\sigma^2 \approx s_n^2 = \frac{1}{n-1}\sum\limits_{i=1}^n (X_i-\bar X_n)^2.
$  
$Z_n = \frac{(\bar X_n - \mu)\sqrt{n}}{s_n}$

## Conditional Distribution

### Conditioning Discrete RVs on an Event

Let $X$ be a discrete rv and $B$ an event with $P(B)>0$.

- The **conditional PMF** of $X$ given $B$:
  $
  p_{X\mid B}(k) = P(X=k\mid B) = \frac{P(\{X=k\}\cap B)}{P(B)}
  $
- The **conditional expectation** of $X$ given $B$:
  $
  E[X\mid B] = \sum\limits_k k\ p_{X\mid B}(k).
  $

Partitioning by events $B_1,\dots,B_n$ with $P(B_i)>0$:

- **Unconditional PMF**:
  $
  p_X(k) = \sum\limits_{i=1}^n p_{X\mid B_i}(k) P(B_i).
  $
- **Unconditional expectation**:
  $
  E[X] = \sum\limits_{i=1}^n E[X | B_i] P(B_i).
  $

### Conditional Distribution for Discrete RVs

Let $X,Y$ be discrete rvs and $y$ such that $P(Y=y)>0$

- The **conditional PMF** of $X$ given $Y=y$:
  $
  p_{X\mid Y}(x\mid y) = P(X=x\mid Y=y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}
  $  
  $ p_{X,Y}(x,y) = p_{X\mid Y}(x\mid y)\ p_Y(y) $
- The **conditional expectation** of $g(X)$ given $Y=y$:
  $
  E[g(X)\mid Y=y] = \sum\limits_x g(x) p_{X\mid Y}(x\mid y)
  $

**Marginalization**:

- $ p_X(x) = \sum\limits_y p_{X | Y}(x \mid y)\ p_Y(y) $
- $ E[X] = \sum\limits_y E[X | Y=y]\ p_Y(y) $

### Conditional Distribution for Jointly Continuous RVs

**Definition.** Let $X,Y$ be jointly continuous with joint PDF $f_{X,Y}(x,y)$ and marginal $f_Y(y)>0$.

- The **conditional PDF** of $X$ given $Y=y$:
  $
  f_{X\mid Y}(x\mid y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}
  $  
  $ f_{X,Y}(x,y) = f_{X\mid Y}(x\mid y) f_Y(y) $
- The **conditional expectation** of $g(X)$ given $Y=y$:
  $
  E[g(X)\mid Y=y] = \int_{-\infty}^{\infty} g(x)\,f_{X\mid Y}(x\mid y)\,dx.
  $
- The **conditional probability** that $X \in A$ given $Y=y$:
  $
  P(X \in A \mid Y=y) = \int_A f_{X\mid Y}(x\mid y) dx
  $

**Averaging Identities**:

- $ f_X(x) = \int_{-\infty}^{\infty} f_{X\mid Y}(x\mid y)\,f_Y(y)\,dy $
- $ E[g(X)] = \int_{-\infty}^{\infty} E[g(X)\mid Y=y] f_Y(y)\,dy $

## Conditional Expectation as a Random Variable

**Definition**: $ v(y)  = E[X \mid Y=y] $ is a number. The **conditional expectation** of $X$ given $Y$ is the random
variable $ E(X \mid Y)  = v(Y) $.  
$ E(aX + b \mid Y) = aE(X \mid Y) + b $

**Tower Property (Law of Total Expectation)**  
$ E\bigl[E(X \mid Y)\bigr]  = E[X] $  
$E[E(g(X)\mid Y)] = E[g(X)].$

$ E[g(X) \mid X] = g(X) $, $ E(X \mid X) = X $

### Multivariate Conditional Distributions

- **Discrete case**  
  $
  p_{X_1,\dots,X_n\mid Y}(x_1,\dots,x_n\mid y) = \frac{p_{X_1,\dots,X_n,Y}(x_1,\dots,x_n,y)}{p_Y(y)}
  $  
  $
  E\bigl[g(X_1,\dots,X_n)\mid Y=y\bigr] = \sum\limits_{x_1,\dots,x_n} g(x_1,\dots,x_n)\,p_{X_1,\dots,X_n\mid Y}(x_1,\dots,x_n\mid y)
  $
- **Continuous case**  
  $
  f_{X_1,\dots,X_n\mid Y}(x_1,\dots,x_n\mid y) = \frac{f_{X_1,\dots,X_n,Y}(x_1,\dots,x_n,y)}{f_Y(y)}
  $  
  $
  E\bigl[g(X_1,\dots,X_n)\mid Y=y\bigr] = \int\cdots\int g(x_1,\dots,x_n)\,f_{X_1,\dots,X_n\mid Y}(x_1,\dots,x_n\mid y)\,dx_1\cdots dx_n.
  $

- **Multivariate law of total expectation:**  
  $
  E\bigl[E[\,g(X_1,\dots,X_n)\mid Y]\bigr] = E\bigl[g(X_1,\dots,X_n)\bigr].
  $
- $ E\bigl[g_1(X_1) + \cdots + g_n(X_n)\mid Y\bigr] = E\bigl[g_1(X_1)\mid Y\bigr] + \cdots + E\bigl[g_n(X_n)\mid Y\bigr] $

### Conditioning and Independence

$X$ and $Y$ are **independent** if and only if

- Discrete: $p_{X\mid Y}(x\mid y)=p_X(x)$ for all $x$, $y$ with $p_Y(y)>0$.
- Continuous: $f_{X\mid Y}(x\mid y)=f_X(x)$ for all $x$, $y$ with $f_Y(y)>0$.

- If $X\perp Y$, then $ E[g(X)\mid Y]=E[g(X)] $ (a constant).

### Conditioning on a random variable fixes its value

$ E\bigl[h(X,Y)\mid Y = y\bigr] = E\bigl[h(X,y)\mid Y = y\bigr] $

**"Pull‐out" property**: $ E\bigl[a(X)\,b(Y)\mid Y\bigr] = b(Y)E\bigl[a(X)\mid Y\bigr] $ 
