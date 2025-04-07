---
title: "Tech Interview Essentials"
description: ""
time: "Mon Mar 31, 2025"
lang: "zh"
---

# Tech Interview Essentials

## Table of Contents

## Computer Network

TCP/IP 四层网络模型：应用层，传输层，网络层，数据链路层。  
OSI 七层网络模型：应用层，表示层，会话层，运输层，网络层，链路层，物理层。

TCP：3次握手建立连接，4次挥手断开链接  
可靠传输：校验和，seq序列号/ACK确认，超时重传，快速重传，流量控制（滑动窗口），拥塞控制。  
长连接，短连接

DNS查询：客户，本地域名服务器，根域名服务器，顶级域名服务器，授权域名服务器。  
DNS在进行区域传输的时候使用TCP协议，其它时候则使用UDP协议。

浏览器流程：URL解析，TCP连接，HTTP请求，浏览器接收，页面渲染，断开连接。

Cookie存储在客户端，长时间保存少量数据；Session存储在服务端，短时间记录大量数据。

iPv6把IP地址由32位增加到128位，简化了路由，增加了保密安全性。

跨域：Nginx, CORS.

HTTPS = HTTP + SSL, 安全性更高，消耗资源更多。（三个随机数验证）
Status Code：100提示，200成功，300重定向，400请求错误，500服务器错误

- 100 提示
- 200 成功，204 已创建，206 部分返回
- 300 重定向，301 永久，302 临时，304 缓存返回
- 400 错误请求，403 权限禁止，404 未找到
- 500 服务器内部错误，501 尚未实施，503 服务不可用，504 网关超时。

HTTP1.0 队头阻塞，HTTP1.1 管道网络传输，HTTP2.0 header压缩+多路复用，HTTP3.0 QUIC(UDP)

## Computer Operating System

### CPU

CPU 地址翻译，Virtual Page Number -> Physical Frame Number + Offset.  
CPU 指令周期Pipeline: fetch, decode, execute, memory access, write back.

局部性原理：缓存加速内存访问。

用户态与内核态

CPU 缓存：L1，L2, L3（多核共享）  
组织方式：直接映射缓存，全相联映射缓存，组相联映射缓存。  
替换策略：随机替换，先进先出，最近最少使用（LRU），最不经常使用（LFU）  
缓存一致性：MESI协议（Modified, Exclusive, Shared, Invalid）

ASCII只能表示英文字符，Unicode表示所有字符，UTF-8是一种与ASCII兼容的编码方案。

### Concurrency and Parallelism

并发Concurrency: 单核交替进行，async-await  
并行Parallelism: 多核同时处理

互斥锁会进入阻塞状态，自旋锁会不断检查锁状态。  
读写锁允许多个读线程，1个写线程。

死锁（Deadlock），互相等待对方持有的资源  
条件：互斥条件，占有且等待条件，不可抢占条件，循环等待条件。  
处理：破环一个死锁条件，检查资源分配情况；终止线程，回滚线程，动态资源分配，等待和重试。

### Process and Thread

进程(Process): 资源分配和调度的基本单位，独立运行的程序实体。  
线程(Thread): 最小单位，进程内的一个执行流。  
协程(Coroutine): 用户态的轻量级线程，程序并发。

进程调度算法：时间片轮转（RR）；优先级调度（先到先得，最短任务优先，最短完成时间优先）；多级队列，多级反馈队列。

同步（Synchronous）需要等待返回结果才能进行下一步，异步（Asynchronous）在等待返回结果的同时可以继续执行其他操作。  
阻塞（Blocking）需要调用者等待I/O数据，非阻塞（Non-blocking）可以立即返回一个错误码等待之后再次访问。

## Database (MySQL)

关系的三个范式：每列的原子性，实体的唯一性，主键的依赖性。

MySQL使用B+树进行索引查询，最左匹配原则。  
使用索引：主关键字，字段唯一约束，经常条件查询的，与其他表外键关联的，排序的，分组统计的。

死锁：访问资源顺序不同，间隙锁，自增主键冲突，索引未命中，事务执行时间过长，大量并发更新。

事务（Transaction）的四大特性（ACID）：原子性，一致性，隔离性，持久性。  
并发事务的问题：脏读，幻读，可重复读，不可重复读。

日志：undo log（回滚日志），redo log（重做日志），bin log（归档日志）

## Cache (Redis)

基于内存操作，高效数据结构，单线程，I/O多路复用

AOF and RDB 回写操作。  
过期删除策略：定时删除，惰性删除，定期删除。  
Redis是惰性删除+定期删除。

缓存雪崩：大量缓存数据在同一时间过期或Redis故障宕机；  
缓存击穿：某个热点数据过期；  
缓存穿透：访问数据不在缓存和数据库中。

集群模式：主从，哨兵，切片集群。  


