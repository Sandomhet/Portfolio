---
title: "Longest Common Subsequence/Substring (LCS)"
description: ""
time: "Wed Apr 1, 2026"
---

# Longest Common Subsequence/Substring (LCS)

## Longest Common Subsequence

Setup:
- Input: Two strings $A = \{a_1, a_2, \ldots, a_n\}$ and $B = \{b_1, b_2, \ldots, b_m\}$.
- Output: The length of the longest common subsequence of $A$ and $B$.

Steps:
1. Subproblem: $f_{i,j}$ be the length of the longest common subsequence of the prefixes $A[1 \ldots i]$ and $B[1 \ldots j]$.
2. Recurrence relation:
$$
f_{i,j} = \begin{cases}
0 & \text{if } i = 0 \text{ or } j = 0 \\
f_{i-1,j-1} + 1 & \text{if } a_i = b_j \\
\max\{f_{i-1,j}, f_{i,j-1}\} & \text{if } a_i \neq b_j
\end{cases}
$$
3. Answer: $f_{n,m}$.

### Implementation

$O(nm)$ time and $O(nm)$ space.

```cpp
int LCS(string A, string B) {
    int n = A.size(), m = B.size();
    A = " " + A, B = " " + B;
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i] == B[j]) {
                f[i][j] = f[i - 1][j - 1] + 1;
            } else {
                f[i][j] = max(f[i - 1][j], f[i][j - 1]);
            }
        }
    }
    return f[n][m];
}
```

Get the actual longest common subsequence:

```cpp
string getLCS(string A, string B) {
    int n = A.size(), m = B.size();
    A = " " + A, B = " " + B;
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i] == B[j]) {
                f[i][j] = f[i - 1][j - 1] + 1;
            } else {
                f[i][j] = max(f[i - 1][j], f[i][j - 1]);
            }
        }
    }
    string res;
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (A[i] == B[j]) {
            res.push_back(A[i]);
            i--, j--;
        } else if (f[i - 1][j] > f[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    reverse(res.begin(), res.end());
    return res;
}
```

## Longest Common Substring

Setup:
- Input: Two strings $A = \{a_1, a_2, \ldots, a_n\}$ and $B = \{b_1, b_2, \ldots, b_m\}$.
- Output: The length of the longest common substring of $A$ and $B$.

Steps:
1. Subproblem: $f_{i,j}$ be the length of the longest common substring of the prefixes $A[1 \ldots i]$ and $B[1 \ldots j]$ that ends with $a_i$ and $b_j$.
2. Recurrence relation:
$$
f_{i,j} = \begin{cases}
0 & \text{if } i = 0 \text{ or } j = 0 \\
f_{i-1,j-1} + 1 & \text{if } a_i = b_j \\
0 & \text{if } a_i \neq b_j
\end{cases}
$$
3. Answer: $\max\limits_{1 \leq i \leq n, 1 \leq j \leq m} \{f_{i,j}\}$.

### Implementation

$O(nm)$ time and $O(nm)$ space.

```cpp
int LCString(string A, string B) {
    int n = A.size(), m = B.size();
    A = " " + A, B = " " + B;
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i] == B[j]) {
                f[i][j] = f[i - 1][j - 1] + 1;
                ans = max(ans, f[i][j]);
            } else {
                f[i][j] = 0;
            }
        }
    }
    return ans;
}
```

Get the actual longest common substring:

```cpp
string getLCString(string A, string B) {
    int n = A.size(), m = B.size();
    A = " " + A, B = " " + B;
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    int ans = 0, endPos = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i] == B[j]) {
                f[i][j] = f[i - 1][j - 1] + 1;
                if (f[i][j] > ans) {
                    ans = f[i][j];
                    endPos = i;
                }
            } else {
                f[i][j] = 0;
            }
        }
    }
    return A.substr(endPos - ans + 1, ans);
}
```