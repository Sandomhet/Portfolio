---
title: "Basis of a Vector Space"
description: ""
time: "Mon Feb 1, 2024"
---

# Basis of a Vector Space

XOR linear basis: `p[i]` is $0$ or a number whose highest bit is $i$. Every XOR of a subset of the inserted numbers equals the XOR of a subset of the nonzero `p[i]`, and with $cnt$ nonzero `p[i]` there are exactly $2^{cnt}$ distinct values. Insert in $O(\log V)$. Values are `ll` (up to 62 bits).

```cpp
struct LinearBasis {
    static const int B = 62;
    vector<ll> p = vector<ll>(B); bool zero = false; // zero: some nonempty subset XORs to 0
    bool insert(ll x) { //插入构造线性基, false if x was already representable
        for (int i = B - 1; i >= 0; i--) if (x >> i & 1) {
            if (!p[i]) { p[i] = x; return true; }
            x ^= p[i];
        }
        zero = true; //x被消成0，说明能异或出0
        return false;
    }
    bool contains(ll x) { for (int i = B - 1; i >= 0; i--) if (x >> i & 1) x ^= p[i]; return x == 0; }
    ll max_xor(ll x = 0) { for (int i = B - 1; i >= 0; i--) x = max(x, x ^ p[i]); return x; } //最大异或和
    ll min_xor() { //最小异或和 (nonempty subset)
        if (zero) return 0;
        for (int i = 0; i < B; i++) if (p[i]) return p[i];
        return -1; // empty basis
    }
    void merge(const LinearBasis &o) { for (int i = 0; i < B; i++) if (o.p[i]) insert(o.p[i]); } //线性基合并
    vector<ll> reduced() { //将线性基转为对角矩阵, returns the basis from small to large
        vector<ll> r;
        for (int i = B - 1; i >= 0; i--) for (int j = i - 1; j >= 0; j--) if (p[i] >> j & 1) p[i] ^= p[j];
        for (int i = 0; i < B; i++) if (p[i]) r.push_back(p[i]);
        return r;
    }
    ll kth(ll k) { // k-th smallest distinct nonempty-subset XOR (k >= 1), -1 if k is too large
        auto r = reduced();
        if (zero) k--; // 0 is the smallest
        if (k == 0) return 0;
        if (k >= (1LL << r.size())) return -1;
        ll ans = 0;
        for (int i = 0; i < (int)r.size(); i++) if (k >> i & 1) ans ^= r[i];
        return ans;
    }
    ll rank(ll q) { // rank of a representable q among the 2^cnt distinct values in span (0 has rank 1)
        auto r = reduced(); ll ans = 0;
        for (int i = 0; i < (int)r.size(); i++) if (q >> __lg(r[i]) & 1) ans |= 1LL << i; //这一位为1可以参与构造q
        return ans + 1;
    }
};
```

Usage:

```cpp
LinearBasis lb;
for (int i = 1; i <= n; i++) lb.insert(a[i]);
lb.max_xor();      // max XOR of a subset
lb.min_xor();      // min XOR of a nonempty subset
lb.kth(k);         // k-th smallest
lb.contains(x);
lb.merge(other);
```
