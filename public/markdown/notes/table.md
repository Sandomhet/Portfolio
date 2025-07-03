
| Distribution                     | PMF $p_X(k)$                                                   | Mean $\mathrm{E}[X]$ | Variance $\mathrm{Var}(X)$                               |
|:---------------------------------|:---------------------------------------------------------------|:---------------------|:---------------------------------------------------------|
| **Bernoulli** $(p)$              | $p_X(1) = p$, $p_X(0) = 1 - p$                                 | $p$                  | $p(1 - p)$                                               |
| **Binomial** $(n, p)$            | $\dbinom{n}{k} p^k (1 - p)^{n - k}$                            | $np$                 | $np(1 - p)$                                              |
| **Geometric** $(p)$              | $(1-p)^{k-1} p$                                                | $\dfrac{1}{p}$       | $\dfrac{1 - p}{p^2}$                                     |
| **Negative Binomial** $(k, p)$   | $\dbinom{n-1}{k-1} p^k (1-p)^{n-k}$                            | $\dfrac{k}{p}$       | $k \dfrac{1 - p}{p^2}$                                   |
| **Poisson** $(\lambda)$          | $\dfrac{e^{-\lambda}\,\lambda^k}{k!}$                          | $\lambda$            | $\lambda$                                                |
| **Hypergeometric** $(N, N_A, n)$ | $\dfrac{\binom{N_A}{k}\,\binom{N - N_A}{n - k}}{\binom{N}{n}}$ | $\dfrac{nN_A}{N}$    | $n \cdot \dfrac{N_A(N-N_A)}{N^2} \cdot \dfrac{N-n}{N-1}$ |

| Distribution                 | PDF $f(x)$                                                            | Mean $\mathrm{E}[X]$ | Variance $\text{Var}(X)$ |
|------------------------------|-----------------------------------------------------------------------|----------------------|--------------------------|
| **Uniform** $(a, b)$         | $\dfrac{1}{b-a}$                                                      | $\dfrac{a + b}{2}$   | $\dfrac{(b - a)^2}{12}$  |
| **Normal** $(\mu, \sigma^2)$ | $\dfrac{1}{\sqrt{2\pi \sigma^2}} e^{-\tfrac{(x - \mu)^2}{2\sigma^2}}$ | $\mu$                | $\sigma^2$               |
| **Exponential** $(\lambda)$  | $\lambda e^{-\lambda x}$                                              | $\dfrac{1}{\lambda}$ | $\dfrac{1}{\lambda^2}$   |
| **Gamma** $(k, \lambda)$     | $\dfrac{\lambda^k}{\Gamma(k)} e^{-\lambda x} x^{k-1}$                 | $\dfrac{k}{\lambda}$ | $\dfrac{k}{\lambda^2}$   |

| Distribution                   | PMF $p_X(k)$                                                           | Mean $\mathrm{E}[X]$ | Variance $\mathrm{Var}(X)$                         | MGF $M_X(t)$                                             |
|:-------------------------------|:-----------------------------------------------------------------------|:---------------------|:---------------------------------------------------|:---------------------------------------------------------|
| **Bernoulli** $(p)$            | $p_X(1)=p,\;p_X(0)=1-p$                                                | $p$                  | $p(1-p)$                                           | $(1-p)+p\,e^t$                                           |
| **Binomial** $(n,p)$           | $\displaystyle\binom{n}{k}p^k(1-p)^{n-k}$                              | $np$                 | $np(1-p)$                                          | $\bigl[(1-p)+p\,e^t\bigr]^n$                             |
| **Geometric** $(p)$            | $(1-p)^{k-1}p$                                                         | $\tfrac1p$           | $\tfrac{1-p}{p^2}$                                 | $\displaystyle\frac{p\,e^t}{1-(1-p)\,e^t}$               |
| **Negative Binomial** $(k,p)$  | $\displaystyle\binom{n-1}{k-1}p^k(1-p)^{n-k}$                          | $\tfrac{k}{p}$       | $k\;\tfrac{1-p}{p^2}$                              | $\displaystyle\Bigl(\frac{p\,e^t}{1-(1-p)\,e^t}\Bigr)^k$ |
| **Poisson** $(\lambda)$        | $\displaystyle\frac{e^{-\lambda}\,\lambda^k}{k!}$                      | $\lambda$            | $\lambda$                                          | $\displaystyle\exp\bigl(\lambda(e^t-1)\bigr)$            |
| **Hypergeometric** $(N,N_A,n)$ | $\displaystyle\frac{\binom{N_A}{k}\,\binom{N-N_A}{n-k}}{\binom{N}{n}}$ | $\tfrac{nN_A}{N}$    | $n\cdot\frac{N_A(N-N_A)}{N^2}\cdot\frac{N-n}{N-1}$ | N/A                                                      |

| Distribution                | PDF $f(x)$                                                                   | Mean $\mathrm{E}[X]$ | Variance $\mathrm{Var}(X)$ | MGF $M_X(t)$                                               |
|:----------------------------|:-----------------------------------------------------------------------------|:---------------------|:---------------------------|:-----------------------------------------------------------|
| **Uniform** $(a,b)$         | $\displaystyle\frac1{b-a}$                                                   | $\tfrac{a+b}{2}$     | $\tfrac{(b-a)^2}{12}$      | $\displaystyle\frac{e^{b t}-e^{a t}}{(b-a)\,t}$            |
| **Normal** $(\mu,\sigma^2)$ | $\displaystyle\frac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$                | $\sigma^2$                 | $\displaystyle\exp\Bigl(\mu\,t+\tfrac12\sigma^2t^2\Bigr)$  |
| **Exponential** $(\lambda)$ | $\lambda\,e^{-\lambda x}$                                                    | $\tfrac1\lambda$     | $\tfrac1{\lambda^2}$       | $\displaystyle\frac{\lambda}{\lambda - t},\quad t<\lambda$ |
| **Gamma** $(k,\lambda)$     | $\displaystyle\frac{\lambda^k}{\Gamma(k)}x^{\,k-1}e^{-\lambda x}$            | $\tfrac{k}{\lambda}$ | $\tfrac{k}{\lambda^2}$     | $\displaystyle\Bigl(\frac{\lambda}{\lambda - t}\Bigr)^k$   |

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
