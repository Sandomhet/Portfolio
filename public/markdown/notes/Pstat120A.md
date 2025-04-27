# PSTAT

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
  $
  (A \cup B)^c = A^c \cap B^c, \quad (A \cap B)^c = A^c \cup B^c.
  $
  Generalized:
  $
  \left( \bigcup A_i \right)^c = \bigcap A_i^c, \quad \left( \bigcap A_i \right)^c = \bigcup A_i^c.
  $

### Cardinality

- $ |A| $: Number of elements in set $ A $.
- If $ A \cap B = \phi $, then $ |A \cup B| = |A| + |B| $.
- For any sets: $ |A \cup B| = |A| + |B| - |A \cap B| $.
- For three sets:
  $
  |A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |A \cap C| + |A \cap B \cap C|.
  $
- Cartesian product: $ |A \times B| = |A| \times |B| $.

### Counting

**Basic Principle of Counting**:

- For a task with $ k $ independent stages, where stage $ i $ has $ n_i $ choices, total outcomes are:
  $
  n_1 \times n_2 \times \cdots \times n_k.
  $

- **Factorial**: $ n! = n \times (n-1) \times \cdots \times 1 $, with $ 0! = 1 $.
- **Permutation $ (n)_k $**: $ n $ order $ k $:
  $
  (n)_k = \frac{n!}{(n-k)!}
  $
- **Combination $ \binom{n}{k} $**: $ n $ choose $ k $:
  $
  \binom{n}{k} = \frac{n!}{k!(n-k)!}.
  $
- **Multinomial Coefficient**: partition $ n $ items into $ k $ groups:
  $
  \binom{n}{n_1, n_2, \ldots, n_k} = \frac{n!}{n_1! n_2! \cdots n_k!}, \quad \text{where} \quad n_1 + n_2 + \cdots +
  n_k = n.
  $

## Probability

### Random Experiment

- **Random Experiment**: An experiment where all possible outcomes are known, but the specific outcome on a given trial
  cannot be predicted.
- **Sample Space ($ S $ or $ \Omega $)**: The set of all possible outcomes.
- **Elementary Outcome**: A single outcome in the sample space.
- **Event**: A subset of the sample space.

### Probability

- **Classical Approach** (for finite sample spaces with equally likely outcomes):
  $
  P(A) = \frac{|A|}{|S|}
  $
- **Relative Frequency Approach**:
  $
  P(A) \approx \frac{\text{Number of times } A \text{ occurs in } n \text{ trials}}{n},
  $
- **Axiomatic Definition** (Kolmogorov, 1933):
    - Probability is a function assigning a number $ P(A) $ to each event $ A $ in a class $ \mathcal{F} $ of subsets
      of $ \Omega $, satisfying:
        1. **Axiom 1**: $ 0 \leq P(A) \leq 1 $.
        2. **Axiom 2**: $ P(\Omega) = 1 $.
        3. **Axiom 3** (Countable Additivity): For disjoint events $ A_1, A_2, \ldots $,
           $
           P\left( A_1 \cup A_2 \cup \cdots \right) = \sum_{i=1}^\infty P(A_i).
           $
    - The triple $ (\Omega, \mathcal{F}, P) $ is called a **probability space**.

- **Probability Rules** (from Axiomatic Definition):
    - $ P(\phi) = 0 $.
    - For finite disjoint events $ A_1, \ldots, A_n $:
      $
      P\left( \bigcup_{i=1}^n A_i \right) = \sum_{i=1}^n P(A_i).
      $
    - Complement: $ P(A^c) = 1 - P(A) $.
    - If $ A \subset B $, then $ P(A) \leq P(B) $.
    - Union of two events:
      $
      P(A \cup B) = P(A) + P(B) - P(A \cap B).
      $
    - Union of three events:
      $
      P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(B \cap C) - P(A \cap C) + P(A \cap B \cap C).
      $

- **Equally Likely Outcomes**:
    - For a finite sample space with equally likely outcomes, $ P(\omega) = \frac{1}{|\Omega|} $.
    - Probability of event $ A $: $ P(A) = \frac{|A|}{|\Omega|} $.


- **Countable vs. Uncountable Sample Spaces**:
    - **Countable**: Finite or countably infinite (e.g., natural numbers).
        - Probabilities assigned as $ P(\omega_i) = \rho_i $, with $ \sum \rho_i = 1 $.
    - **Uncountable**: Contains intervals (e.g., lifetime of a bulb).
        - Uniform distribution: Picking a number $ X $ uniformly from $ [0, 1] $:
          $
          P(X \in [a, b]) = b - a, \quad \text{for } 0 \leq a \leq b \leq 1.
          $

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
  $
  P(A \mid B) = \frac{P(A B)}{P(B)}
  $
    - For fixed $ B $, $ P(\cdot \mid B) $ is a probability measure satisfying all probability axioms, called a
      conditional probability measure.

### Multiplication Rule

- **For Two Events**: For any events $ A $ and $ B $:
  $
  P(AB) = P(B) P(A \mid B) = P(A) P(B \mid A)
  $
- **For Three Events**: For events $ A, B, C $:
  $
  P(ABC) = P(A) P(B \mid A) P(C \mid AB),
  $
- **For $ n $ Events**: For events $ A_1, A_2, \ldots, A_n $:
  $
  P(A_1 A_2 \cdots A_n) = P(A_1) P(A_2 \mid A_1) P(A_3 \mid A_1 A_2) \cdots P(A_n \mid A_1 \cdots A_{n-1}),
  $

### Law of Total Probability

- **Partition of $ \Omega $**: A finite collection of events $ \{B_1, \ldots, B_n\} $ is a partition of $ \Omega $ if
  they are pairwise disjoint ($ B_i \cap B_j = \emptyset $ for $ i \neq j $) and their union
  is $ \Omega $ ($ \bigcup_{i=1}^n B_i = \Omega $).
- **Law**: If $ \{B_1, \ldots, B_n\} $ is a partition of $ \Omega $, then for any event $ A $:
  $
  P(A) = \sum_{i=1}^n P(A \cap B_i) = \sum_{i=1}^n P(A \mid B_i) P(B_i).
  $

### Bayes' Theorem

- **Two Events**:
  $
  P(B \mid A) = \frac{P(A \mid B) P(B)}{P(A \mid B) P(B) + P(A \mid B^c) P(B^c)}.
  $
- **General Form**: Let $ \{B_1, B_2, \ldots, B_n\} $ be a partition of $ \Omega $:
  $
  P(B_k \mid A) = \frac{P(A \mid B_k) P(B_k)}{\sum_{i=1}^n P(A \mid B_i) P(B_i)}.
  $
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
      $
      P(A B C) = P(A) P(B) P(C).
      $
- **Note**: Pairwise independence does not imply mutual independence.
- **Independence Property**:
    - If $ A $ and $ B $ are independent, then so are $ A $ and $ B^c $, $ A^c $ and $ B $, $ A^c $ and $ B^c $.
    - Proof for $ A $ and $ B^c $:
      $
      P(A \cap B^c) = P(A) - P(A \cap B) = P(A) - P(A) P(B) = P(A)(1 - P(B)) = P(A) P(B^c).
      $

### Conditional Independence

- **Definition**: Events $ A $ and $ B $ are conditionally independent given event $ C $ if:
  $
  P(A B \mid C) = P(A \mid C) P(B \mid C).
  $
  Denoted as $ (A \perp B) \mid C $.
- **Remarks**:
    - Conditional independence given $ C $ does not imply marginal independence of $ A $ and $ B $.
    - Marginal independence of $ A $ and $ B $ does not imply conditional independence given $ C $.

### Random Variable

- **Definition**: A random variable (RV), denoted by $ X $, is a real-valued function on the sample space $
  \Omega $. That is, $ X: \Omega \rightarrow \mathbb{R} $, where $ \mathbb{R} $ is the set of all real numbers.
- **Notation**:
    - RVs are denoted by capital letters (e.g., $ X, Y, Z $), unlike mathematical functions (e.g., $ f, g, h $).
    - For a sample point $ \omega \in \Omega $, the value of RV $ X $ is $ X(\omega) $.
    - For a set $ B \subseteq \mathbb{R} $, the event $ \{X \in B\} = \{\omega \in \Omega : X(\omega) \in B\} =
      X^{-1}(B) $.
- **Probability Distribution**: The set of probabilities $ \{P(X \in B) : B \subseteq \mathbb{R}\} $, where $ P(X \in
  B) = P(X^{-1}(B)) $, is called the probability distribution of $ X $.

### Discrete Random Variable

- **Definition**: A RV $ X $ is discrete if it takes values in a finite or countably infinite set, i.e., $ X \in
  \{k_1, k_2, \ldots\} $.
- **Support**: The set $ S(X) $ of possible values of $ X $ with positive probability is called the support of $
  X $.
- **Probability Mass Function (PMF)**: The PMF of a discrete RV $ X $ is the function $ p_X $ defined by:
  $
  p_X(k) = P(X = k), \quad k \in S(X).
  $
- **Probability for Events**: For any subset $ B \subseteq S(X) $:
  $
  P(X \in B) = \sum_{k \in B} P(X = k) = \sum_{k \in B} p_X(k).
  $

### Types of Random Variables

- **Continuous RV**: A RV $ X $ is continuous if it assumes any value in a finite or infinite interval.
- **Mixed RV**: A RV that is neither purely discrete nor continuous (beyond the scope of this course).
- **Degenerate RV**: A RV $ X $ is degenerate if there exists some real value $ a $ such that:
  $
  P(X = a) = 1.
  $

### Independence of Random Variables

- **General Definition**: RVs $ X_1, X_2, \ldots, X_n $ defined on the same probability space are independent if:
  $
  P(X_1 \in B_1, X_2 \in B_2, \ldots, X_n \in B_n) = \prod_{k=1}^n P(X_k \in B_k),
  $
  for all subsets $ B_1, B_2, \ldots, B_n \subseteq \mathbb{R} $ and $ n \geq 2 $.
- **Discrete RVs**: Discrete RVs $ X_1, X_2, \ldots, X_n $ are independent if:
  $
  P(X_1 = x_1, X_2 = x_2, \ldots, X_n = x_n) = \prod_{k=1}^n P(X_k = x_k),
  $
  for all possible values $ x_1, x_2, \ldots, x_n $.

## Distribution

### Bernoulli Distribution

- **Definition**: A RV $ X $ has the Bernoulli distribution with success probability $ p $, where $ 0 \leq p \leq
  1 $, if $ X $ takes values in $ \{0, 1\} $ and:
  $
  P(X = 1) = p, \quad P(X = 0) = 1 - p.
  $
- **Notation**: $ X \sim \text{Ber}(p) $.
- **Interpretation**: Represents the outcome of a single Bernoulli trial (1 for success, 0 for failure).

### Binomial Distribution

- **Definition**: A RV $ X $ has the binomial distribution with parameters $ n $ (positive integer) and $ p $ ($
  0 \leq p \leq 1 $) if its possible values are $ \{0, 1, \ldots, n\} $ and its PMF is:
  $
  P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad k = 0, 1, \ldots, n.
  $
- **Notation**: $ X \sim \text{Bin}(n, p) $.
- **Conditions**:
    - Arises as the sum $ S_n = X_1 + X_2 + \cdots + X_n $, where:
        - Each $ X_i \sim \text{Ber}(p) $ (identical distributions).
        - $ X_1, X_2, \ldots, X_n $ are independent.
- **Property**: The probabilities sum to 1, as per the binomial theorem:
  $
  \sum_{k=0}^n \binom{n}{k} p^k (1 - p)^{n - k} = (p + 1 - p)^n = 1.
  $

### Geometric Distribution

- **Definition**: A RV $ X $ follows the geometric distribution with success parameter $ p $, where $ 0 < p \leq
  1 $, if its support is $ S(X) = \{1, 2, 3, \ldots\} $ and its PMF is:
  $
  P(X = k) = (1 - p)^{k - 1} p, \quad k = 1, 2, 3, \ldots.
  $
- **Notation**: $ X \sim \text{Ge}(p) $.
- **Interpretation**: Represents the number of trials needed to achieve the first success in repeated independent
  Bernoulli trials with success probability $ p $.
- **Special Case**: If $ p = 0 $, then $ P(X = \infty) = 1 $.

### Geometric Distribution

The number of trails for the first success
$ X \sim Ge(p) = P(X = k) = (1 - p)^{k - 1}p $
$ Y \sim Ge(p) = P(Y = k) = (1 - p)^kp $

**Memoryless Property**: $ P(X = n + k \mid X > n) = P(X = k) $

### Negative Binomial Distribution

The number of trails till the first $ k $ successes
$$ X \sim NB(k, p) = P(X = n) = \binom{n - 1}{k - 1}p^k(1 - p)^{n-k} $$

### Hypergeometric Distribution

$$ P(X = k) = \frac{\binom{N_A}{k} \binom{N - N_A}{n - k}}{\binom{N}{n}} $$

### Poisson Distribution

$$ Poi(\lambda) = P(X = x) = \frac{e^{-\lambda}\lambda^x}{x!} $$

