#include <iostream>
#include <vector>
#include <utility> // For std::move

class MyData {
private:
    int* data;
public:
    // Parameterized constructor
    MyData(int value) {
        data = new int(value);
        std::cout << "Parameterized: " << *data << "\n";
    }

    // Copy constructor
    MyData(const MyData& other) {
        // Deep copy: allocates new memory and copies the value
        data = new int(*other.data);
        std::cout << "Copy: " << *data << "\n";
    }

    // Move constructor
    MyData(MyData&& other) noexcept {
        // Steal the resource (shallow copy of the pointer)
        data = other.data;
        // Nullify the source pointer
        other.data = nullptr;
        std::cout << "Move\n";
    }

    // Destructor
    ~MyData() {
        if (data)
            std::cout << "Destroying: " << *data << "\n";
        else
            std::cout << "Destroying: nullptr\n";
        delete data; // Delete the memory pointed to by data
    }

    void print() const {
        if (data)
            std::cout << "Data = " << *data << "\n";
        else
            std::cout << "Data = nullptr\n";
    }
};

int main() {
    std::vector<MyData> v;
    v.reserve(3);

    // 1. Create 'a'
    MyData a(10); 

    // 2. push_back(a)
    // 'a' is an lvalue, triggering the Copy Constructor to place a new element in the vector.
    v.push_back(a); 

    // 3. Print 'a' 
    a.print(); 

    // 4. push_back(std::move(a))
    // std::move(a) converts 'a' to an rvalue, triggering the Move Constructor.
    // The resource (the memory holding 10) is moved from 'a' into the vector element.
    v.push_back(std::move(a)); 

    // 5. Print 'a' 
    // 'a' is now in a valid but unspecified state (specifically, a.data is nullptr).
    a.print(); 

    // 6. push_back(MyData(20))
    // MyData(20) is a temporary rvalue, triggering the Parameterized Constructor followed by the Move Constructor (elision may occur).
    v.push_back(MyData(20)); 
    std::cout << "After pushing MyData(20)\n";

    // 7. End of main
    // Vector elements and 'a' are destroyed.
}
