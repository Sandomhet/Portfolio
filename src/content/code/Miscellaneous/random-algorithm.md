---
title: "Hill Climbing and Simulated Annealing Algorithms"
description: "爬山算法和模拟退火"
time: "Mon Feb 1, 2024"
---

# Hill Climbing and Simulated Annealing Algorithms

Hill climbing only moves to better neighbors and can get stuck in a local optimum. Simulated annealing also accepts a worse neighbor with probability $e^{-\Delta / T}$ (Metropolis criterion, $\Delta > 0$ is how much worse), where the temperature $T$ decreases geometrically; early on it explores, later it behaves like hill climbing. Keep the current point and the best point separately.

```cpp
using State = pair<double, double>; // change to the problem's state (a point here)
// minimize f over states; neighbor(s, T) returns a random state near s (step size ~ T)
State anneal(State cur, function<double(State)> f, function<State(State, double)> neighbor, double T = 3000, double down = 0.996, double eps = 1e-15) {
    static mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    uniform_real_distribution<double> U(0, 1);
    State best = cur; double fc = f(cur), fb = fc; //best: 最优解；cur: 当前解
    while (T > eps) {
        State nx = neighbor(cur, T);
        double fn = f(nx), delta = fn - fc;
        if (delta < 0 || exp(-delta / T) > U(rng)) cur = nx, fc = fn; //根据Metropolis准则保留
        if (fc < fb) best = cur, fb = fc;
        T *= down; //不断降温
    }
    return best;
}
```

Usage:

```cpp
// 吊打XXX: point minimizing sum of w[i] * dist(p, (x[i], y[i]))
mt19937 rng(114514); uniform_real_distribution<double> U(-1, 1);
auto f = [&](State p) {
    double s = 0;
    for (int i = 1; i <= n; i++) s += hypot(p.first - x[i], p.second - y[i]) * w[i];
    return s;
};
auto nb = [&](State p, double T) { return State(p.first + U(rng) * T, p.second + U(rng) * T); };
State best = {avgx, avgy};
for (int t = 0; t < 5; t++) best = anneal(best, f, nb); // restart a few times while time allows
```