---
title: "CMPSC 32 - Object Oriented Design"
description: "Object-oriented programming concepts including classes, inheritance, polymorphism, and design patterns."
time: "Tue Dec 9, 2025"
---

# CMPSC 32 - Object Oriented Design

## Table of Contents

## Hash Tables

### Load Factor

- Load Factor: $\alpha = \frac{n}{m}$ where $n$ is the number of elements in the table and $m$ is the number of slots in the table.
- As $\alpha$ increases, the number of collisions increases, leading to longer chains in chaining and more probes in open addressing.
- A common threshold for resizing a hash table is when $\alpha$ exceeds 0.7.

**Load factor** formulas:
1. Linear Probing: $ \frac{1}{2} (1 + \frac{1}{1 - \alpha}) $
2. Double Hashing: $ \frac{-\ln (1 - \alpha)}{\alpha} $
3. Chaining: $ 1 + \frac{\alpha}{2} $

### Passing Functions

In object-oriented design, functions can be passed as arguments to other functions or methods. This is often done using function pointers, delegates, or lambda expressions, depending on the programming language.

Function pointers allow you to pass the address of a function to another function. This enables higher-order functions, which can take other functions as parameters or return them as results.

Example of function pointers in C++:
```cpp
#include <iostream>
using namespace std;
int add(int a, int b) { return a + b; }
int operate(int x, int y, int (*func)(int, int)) {
    return func(x, y);
}
typedef int (*FuncPtr)(int, int);
// using FuncPtr = int (*)(int, int);
int operate2(int x, int y, FuncPtr func) {
    return func(x, y);
}
int main() {
    int result = operate(5, 3, add);
    cout << result << endl;
    return 0;
}
```

```cpp
#include <functional>
int add(int a, int b) { return a + b; }
int operate(int x, int y, function<int(int, int)> func) {
    return func(x, y);
}
int main() {
    int result = operate(5, 3, add);
    cout << result << endl;
    return 0;
}
```

## Transform

```cpp
int main() {
    string s = "abcde";
    transform(s.begin(), s.end(), s.begin(), toupper); // ABCDE
    transform(s.begin() + 2, s.end(), s.begin(), toupper); // CDEde
    cout << s << endl;
    return 0;
}
```

## Lambda Functions

Lambda functions are anonymous functions that can be defined in-line. They are often used for short, throwaway functions that are not reused elsewhere.

Example of a lambda function in C++:
```cpp
int add(int x, int y) { return x + y; }
[] () -> int {}
[] () {}
int main() {
    auto add = [](int a, int b) {
        return a + b;
    };
    // Explicit return type
    auto addition = [](int a, int b) -> int {
        return a + b;
    };
    // Captures x by value
    int x = 10;
    auto multiply_by_x = [x](int val) {
        return val * x;
    };
    // Captures y by reference
    int y = 10;
    auto modify_y = [&y]() {
        y += 5;
    };
    // Captures all local variables by value
    auto capture_all_by_value = [=]() {
        return x + y;
    };
    // Captures all local variables by reference
    auto capture_all_by_reference = [&]() {
        x += 5;
        y += 5;
    };
    // Custom comparison for descending order
    sort(s.begin(), s.end(), [](int a, int b) {
        return a > b;
    });
    return 0;
}
```

## Operating Systems

Execute instruction: fetch, decode, execute cycle

5 main components of a computer
1. Processor (CPU)
2. Memory (RAM)
3. Input Devices (Keyboard)
4. Output Devices (Display Screen)
5. Secondary Data Storage (SSD)

Memory Hierarchy:
1. Registers
2. Cache
3. Main Memory (RAM)
4. Flash Disk
5. Traditional Disk
6. Remote Secondary Storage

Virtualization: creating a virtual version of something, such as hardware platforms, storage devices, and network resources.

OS supports **multiprogramming** by managing multiple processes in memory at the same time.

Memory Virtualization:
- OS gives each process a private virtual address space.
- OS maps virtual addresses to physical addresses using a page table.
- Each process needs a unique start address.
- provides isolation, flexibility, and efficient memory usage.

### Persistent Storage

- Persistent storage refers to non-volatile storage that retains data even when the power is turned off.
- Examples include hard drives, solid-state drives (SSDs), and flash memory.

### The OS Kernel

- It is separated from user kernel.  
- It exists in a protected memory area.
- System calls is privileged instruction.

Library calls vs System calls:

### Shell

Unix OS in C language. Unix shell is a command-line interpreter for the Unix OS.

**fork()**: creates a new process (child) by duplicating the current process (parent). Returns the child's PID to the parent and 0 to the child.  
**exec()**: replaces the current process image with a new process image (overlaying). It's the only way to execute a different program within a process.  
**wait()**: makes the parent process wait until all of its child processes have terminated.  

Multiprogramming: multiple programs loaded into memory and executed by the CPU concurrently.

### Process and Thread

- Concurrency is the ability of an OS to manage multiple tasks at the same time.

- Process: an instance of a program in execution. Each process has its own memory space, execution state, and system resources.
- Thread: a lightweight, independent unit of execution within a process. Threads within the same process share the same memory space and resources.

A process can have multiple threads, allowing for concurrent execution of tasks within the same application.

#### Process

Information maintained for each process:
- Process ID (PID)
- Process state (e.g., running, waiting, terminated)
- Program counter (PC)
- CPU registers (execution state)
- Memory management information
- Open file descriptors
- Scheduling information

CPU registers: small, high-speed storage locations within the CPU used to hold data temporarily during execution.

Process States:
1. New: process is being created.
2. **Ready**: process is waiting to be assigned to a CPU. New processes created or processes that is switched out of the CPU go to the ready state.
3. **Running**: process is currently being executed by the CPU.
4. **Blocked** (Waiting): process is waiting for an event (e.g., I/O completion). It moves to the ready state when the event occurs.
5. **Terminated**: process has finished execution, but needs to be cleaned up by the OS.

Process Memory Model:
- Each process has its own virtual memory space divided into segments:
  - Text: contains the executable code.
  - Data: contains global and static variables.
  - Heap: used for dynamic memory allocation.
  - Stack: used for function call management and local variables. 

**Context switching**: saving and restoring the state of a CPU so that multiple processes can share a single CPU resource.

#### Thread

A single thread can only be executed on a single core at a time, but multiple threads can be scheduled on multiple cores.  
Maximum number of threads = number of cores.

Shared among threads: Text, Data, Heap.  
Private to each thread: Stack, Registers, Program Counter. 

Concurrency vs Parallelism:
- **Concurrency**: multiple tasks making progress within the same time frame, but not necessarily simultaneously.
- **Parallelism**: multiple tasks executing simultaneously on multiple processors or cores.

```cpp
#include <iostream>
#include <thread>
using namespace std;
void threadFunction(int id) {
    cout << "Thread " << id << " is running." << endl;
}
int main() {
    thread t1(threadFunction, 1);
    thread t2(threadFunction, 2);
    t1.join(); // await for t1 to finish
    t2.join();
    return 0;
}
```

**Race Condition**: multiple threads access shared data concurrently, and the final outcome depends on the timing of their execution.  
Can only occur when all of the following conditions are met:
1. Shared state: Multiple threads access the same shared data.  
2. Accesses must happen concurrently.
3. At least one thread modifies the shared data.  
4. No proper synchronization mechanism is in place.

**Critical Section**: a section of code that accesses shared resources and must not be concurrently executed by more than one thread.  
**Atomic Operation**: an operation that is indivisible and uninterruptible, ensuring that it completes without interference from other threads. (all or nothing)

Thread synchronization:

Mutex: Mutual Exclusion Lock.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
using namespace std;
mutex mtx; // mutex for critical section
int counter = 0;
void incrementCounter(int id) {
    for (int i = 0; i < 1000; ++i) {
        mtx.lock(); // lock the mutex before entering critical section
        ++counter; // critical section
        mtx.unlock(); // unlock the mutex after leaving critical section
    }
}
int main() {
    thread t1(incrementCounter, 1);
    thread t2(incrementCounter, 2);
    t1.join();
    t2.join();
    cout << "Final counter value: " << counter << endl;
    return 0;
}
```

Deadlock: Multiple threads are blocked forever, each waiting for the other to release a resource.

## Smart Pointers

Three types of smart pointers in C++:
1. `unique_ptr`: owns a resource exclusively. Cannot be copied, only moved.
2. `shared_ptr`: allows multiple pointers to share ownership of a resource. Uses reference counting to manage the resource's lifetime. (Cyclical references can cause memory leaks)
3. `weak_ptr`: a non-owning pointer that references a resource managed by `shared_ptr`. It does not affect the reference count. (cannot be dereferenced directly)

```cpp
#include <memory>
using namespace std;
int main() {
    // unique_ptr example
    unique_ptr<int> p = make_unique<int>(10);
    unique_ptr<int> uptr1(new int(15));
    unique_ptr<int> uptr2 = move(uptr1); // transfer ownership
    // shared_ptr example
    shared_ptr<int> p = make_shared<int>(10);
    shared_ptr<int> sptr1(new int(20));
    shared_ptr<int> sptr2 = sptr1; // shared ownership
    int shared_count = sptr1.use_count(); // reference count

    // weak_ptr example
    weak_ptr<int> wptr = sptr1; // non-owning reference
    shared_ptr<int> sptr3 = wptr.lock(); // convert to shared_ptr
    return 0;
}
```

## Exception Handling

Exception handling is a mechanism for handling runtime errors in a controlled manner. It allows a program to respond to exceptional circumstances (like runtime errors) without crashing.

```cpp
#include <iostream>
using namespace std;
int divide(int a, int b) {
    if (b == 0) {
        throw runtime_error("Division by zero");
    }
    return a / b;
}
int main() {
    try {
        int result = divide(10, 0);
        cout << "Result: " << result << endl;
    } catch (const runtime_error& e) {
        cerr << "Error: " << e.what() << endl;
    }
    return 0;
}
```

## Expressions

Expressions have two properties: **type** and **value category**.

**Lvalue**: an expression that refers to a memory location and allows us to take the address of that location using the address-of operator (&).  
```
int x = 10; // x is an lvalue
```
**Rvalue**: an expression that does not refer to a memory location and cannot have its address taken (temporary value).
```
int x = 10; // 10 is an rvalue
```

Lvalue references: alias for an existing lvalue. Declared using `&`.
```
int x = 10;
int& ref = x; // ref is an lvalue reference to x
const int& cref = 20; // cref is a const lvalue reference to an rvalue
```
Rvalue references: can bind to only rvalues (temporary objects). Declared using `&&`. Used for move semantics.
```
int&& rref = 30; // rref is an rvalue reference to the temporary value 30
```

Move semantics: allows the resources of an rvalue to be "moved" rather than copied, improving performance by avoiding unnecessary copies.  
**Move constructor** and **move assignment operator** are special member functions.

sipmle example of move semantics:

```cpp
class Node {
    int* data;
    Node(int value) : data(new int(value)) {}
    // Move constructor
    Node(Node&& other) noexcept : data(other.data) {
        other.data = nullptr; // leave other in a valid state
    }
    // Move assignment operator
    Node& operator=(Node&& other) noexcept {
        if (this != &other) {
            delete data;
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }
    ~Node() {
        delete data;
    }
};
```

Rules of Five:
1. Destructor
2. Copy Constructor
3. Copy Assignment Operator
4. Move Constructor
5. Move Assignment Operator

stl::move: casts an object to an rvalue, enabling move semantics.

```cpp
#include <utility> // for std::move
std::string str1 = "Hello";
std::string str2 = std::move(str1); // str1 is now in a valid but unspecified state
``` 
