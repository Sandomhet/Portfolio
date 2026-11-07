---
title: "Aho–Corasick Algorithm"
description: "dictionary-matching algorithm that locates elements of a finite set of strings"
time: "Mon Feb 1, 2024"
---

# Aho–Corasick Algorithm

AC自动机算法  
$Kmp$与$Trie$的优美结合，相当于在$Trie$上跑$Kmp$。

一个重要定义：$Fail$指针（失配指针），指向其他路径上与该字母相同的节点。当前路径的模式串的后缀与$fail$
指针指向的模式串前缀相同（与$kmp$类似）。
$Fail$
指针的作用：在对于一个文本串匹配多个模式串时，如果当前模式串已经结束或失配，一般情况下我们需要回溯到根节点再换路递归，但是可以用$fail$
直接跳到下一条路径，而且这条路径是紧接上一条的（并且与文本串对应），这样省去了回溯。因为对于$fail$
指向的那一条路径的前缀已经在这时（被当前模式串）走过了，我们不需再走一遍重复路径。
在跳$fail$指针时不断统计答案，就可以遍历到以该字母为结尾的所有模式串。
构造$Fail$指针：对于每一层的$fail$指针，我们都需要用到上一层的$fail$状态，所以采取$bfs$，分层构造，对于第一层的$fail$
，都指向$0$号根节点（它只是一个虚点）。对于一个节点 x，它的$fail$只需要指向它父亲的$fail$的同字符儿子。

```cpp
struct AC {
    struct Node { int ch[26], fail, end; }; //end: 以该节点结尾的单词数量
    vector<Node> t{Node{}}; vector<int> ord; //0号根节点; ord: BFS order
    int insert(const string &s) { // returns the node of s
        int u = 0;
        for (char c : s) {
            int i = c - 'a';
            if (!t[u].ch[i]) t[u].ch[i] = t.size(), t.push_back(Node{}); //新建一个节点
            u = t[u].ch[i]; //进入下一层
        }
        t[u].end++;
        return u;
    }
    void build() { //构造失配指针
        queue<int> q;
        for (int i = 0; i < 26; ++i) if (t[0].ch[i]) q.push(t[0].ch[i]); //第一层的fail指向根
        while (!q.empty()) {
            int u = q.front(); q.pop();
            ord.push_back(u);
            for (int i = 0; i < 26; ++i) {
                int v = t[u].ch[i];
                if (v) t[v].fail = t[t[u].fail].ch[i], q.push(v); //扩展后缀
                else t[u].ch[i] = t[t[u].fail].ch[i]; //保证字符串能沿着路径走完
            }
        }
    }
    int count_distinct(const string &s) { // number of inserted patterns (with multiplicity) occurring in s
        vector<bool> vis(t.size()); int res = 0;
        for (int u = 0, k = 0; k < (int)s.size(); ++k) {
            u = t[u].ch[s[k] - 'a']; //向下走一层
            for (int j = u; j && !vis[j]; j = t[j].fail) res += t[j].end, vis[j] = 1; //跳fail直到已访问
        }
        return res;
    }
    vector<ll> occurrences(const string &s) { // cnt[node]: occurrences in s of the string ending at node
        vector<ll> cnt(t.size());
        for (int u = 0, k = 0; k < (int)s.size(); ++k) u = t[u].ch[s[k] - 'a'], cnt[u]++;
        for (int i = ord.size() - 1; i >= 0; i--) cnt[t[ord[i]].fail] += cnt[ord[i]]; // fail tree: children before parents
        return cnt;
    }
};
```

Usage:

```cpp
AC ac;
vector<int> id(k);
for (int i = 0; i < k; i++) id[i] = ac.insert(p[i]);
ac.build();
ac.count_distinct(text);           // how many patterns occur at least once
auto cnt = ac.occurrences(text);
cnt[id[i]];                        // number of occurrences of p[i] in text
```
