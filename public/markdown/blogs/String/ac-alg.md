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
struct Trie
{
    int kid[26];//26个字母
    int fail;//失配指针
    int end;//以该节点结尾的单词数量
    #define son ac[rt].kid[i]
}; Trie ac[Z << 2];
int tot = 0;
inline void insert(char s[], int len)
{
    int rt = 0;
    for (int t = 1; t <= len; ++t)
    {
        int i = s[t] - 'a';
        if (!son) son = ++tot;//新建一个节点
        rt = son;//进入下一层
    }
    ++ac[rt].end;
}
void getfail()
{
    queue <int> q;
    int rt = 0;
    for (int i = 0; i < 26; ++i)//初始化失配指针
        if (son)
        {
            ac[son].fail = 0;
            q.push(son);
        }
    while (!q.empty())
    {
        rt = q.front(); q.pop();
        for (int i = 0; i < 26; ++i)
        {
            if (son)
            {
                ac[son].fail = ac[ac[rt].fail].kid[i];//扩展后缀
                q.push(son);
            }
            else son = ac[ac[rt].fail].kid[i];//保证字符串能沿着路径走完
        }
    }
}
inline int match(char s[], int len)
{
    int rt = 0, ans = 0;
    for (int t = 1; t <= len; ++t)
    {
        rt = ac[rt].kid[s[t] - 'a'];//向下走一层
        for (int j = rt; j && ac[j].end != -1; j = ac[j].fail)
            ans += ac[j].end, ac[j].end = -1;//j不断跳fail直到完全失配
    }
    return ans;
}
```
