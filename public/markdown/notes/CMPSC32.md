
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
int (*funcPtr)(int); = [](int x) { return x * x; };

void applyFunction(int x, function<int(int)> func) {
    cout << "Result: " << func(x) << endl;
}
int main() {
    auto square = [](int y) { return y * y; };
    applyFunction(5, square); // Output: Result: 25
    return 0;
}
```

### Transform

```cpp
int main() {
    string s = "abcde";
    transform(s.begin(), s.end(), s.begin(), toupper); // ABCDE
    transform(s.begin() + 2, s.end(), s.begin(), toupper); // CDEde
    cout << s << endl;
    return 0;
}
```

### Lambda Functions

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