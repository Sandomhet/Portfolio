---
title: "CMPSC 64: Computer Organization and Architecture"
description: ""
time: "Mon Jan 5, 2026"
---

# CMPSC 64: Computer Organization and Architecture

## Table of Contents

## Von Neumann Architecture

The 5 main components of a computer: 
1. Processor (CPU)
2. Memory (RAM)
3. Input Devices (Keyboard)
4. Output Devices (Display Screen)
5. Secondary Data Storage (SSD)

Memory is composed of data address and data value. Each memory address stores a data value.

## Binary Number System

**1 byte = 8 bits**

Base 10 (decimal): digits 0-9.  
Base 2 (binary): digits 0 and 1.  
Base 8 (octal): digits 0-7.  
Base 16 (hexadecimal): digits 0-9 and letters A-F.  

**Positional Notation**: each digit represents a power of the base, depending on its position. $x = \sum\limits_{i=0}^{n} d_i b^i$.

**Least Significant Bit (LSB)**: rightmost bit in a binary number.  
**Most Significant Bit (MSB)**: leftmost bit in a binary number.

Hexadecimal and binary table:
| Hex | Binary  | Hex | Binary  |
|-----|---------|-----|---------|
| 0x0   | 0000    | 0x8   | 1000    |
| 0x1   | 0001    | 0x9   | 1001    |
| 0x2   | 0010    | 0xA   | 1010    |
| 0x3   | 0011    | 0xB   | 1011    |
| 0x4   | 0100    | 0xC   | 1100    |
| 0x5   | 0101    | 0xD   | 1101    |
| 0x6   | 0110    | 0xE   | 1110    |
| 0x7   | 0111    | 0xF   | 1111    |

Group 3 binary digits to convert to octal.  
Group 4 binary digits to convert to hexadecimal.  

### Two's Complement (二进制补码)

Positive to negative, negative to positive:
1. Invert all bits (0s to 1s and 1s to 0s).
2. Add 1 to the inverted binary number.

It's a **reversible** algorithm: applying it twice returns the original number.

The MSB indicates the sign of the number.  
In positive binary numbers, MSB is $0$, and trailing 0s do not affect the value. (`00101` = `101` = `5`)  
In negative binary numbers, MSB is $1$, and trailing 1s do not affect the value. (`11101` = `1101` = `-3`)  

Given an n-bit binary number:  
- Unsigned range: $0$ to $2^n - 1$.  
- Signed range: $-2^{n-1}$ to $2^{n-1} - 1$.  

CPU must use a ***fixed*** number of bits to represent numbers.

Out of range results in **overflow**.
carry out bit (C): indicates unsigned overflow.
overflow bit (V): indicates signed overflow.

Overflow conditions for addition:
1. Adding two positive numbers yields a negative result.
2. Adding two negative numbers yields a positive result.



Binary logical operations:
- NOT: $\overline{A}$
- AND: $A \cdot B$
- OR: $A + B$
- XOR: $A \oplus B$
- NAND: $\overline{A \cdot B}$
- NOR: $\overline{A + B}$

Bitwise operations:
- NOT: `~` (tilde); `~(1001) = 0110`
- AND: `&` (ampersand); `(1010 & 1100) = 1000`
    - 1 & b = b
    - 0 & b = 0
- OR: `|` (pipe); `(1010 | 1100) = 1110`
    - 1 | b = 1
    - 0 | b = b
- XOR: `^` (caret); `(1010 ^ 1100) = 0110`
    - 1 ^ b = $\overline{b}$
    - 0 ^ b = b
- Left Shift: `<<`; shifts bits to the left, filling with 0s on the right. `(0011 << 2) = 1100`
- Right Shift: `>>`; shifts bits to the right. For unsigned numbers, fills with 0s on the left. `(1100 >> 2) = 0011` For signed numbers, fills with sign bit (arithmetic shift). `(1100 >> 2) = 1111`

## Machine

$10^{-12} = \text{pico} (p)$  
$10^{-9} = \text{nano} (n)$  
$10^{-6} = \text{micro} (\mu)$  
$10^{-3} = \text{milli} (m)$  
$10^{3} = \text{kilo} (k)$  
$10^{6} = \text{mega} (M)$  
$10^{9} = \text{giga} (G)$  
$10^{12} = \text{tera} (T)$

1. Arithmetic operations
2. Logic operations
3. Assignment operations
4. Branching operations
5. Data memory access operations

CPU Fetch-Execute Cycle:
1. Fetch instruction from memory (using Program Counter, PC).
2. Decode instruction (using Instruction Register, IR).
3. Execute instruction (using Arithmetic Logic Unit, ALU).
4. (Optional) Store result back to memory or register.

Components of CPU: 
1. Arithmetic Logic Unit (ALU)
2. CPU memory
3. Register bank

Simplified CPU Memory Map:
1. Reserved for OS
2. User Variables
3. User Programs
4. Reserved for I/O

core components of CPU
1. Program Counter (PC)
2. Instruction Memory
3. Instruction Register (IR)
4. Register Block
5. Arithmetic Logic Unit (ALU)
6. Data Memory
7. Control Unit

## Assembly Language

Machine language consists of binary instructions that the CPU can execute directly.

Assembly language is a low-level programming language that uses **mnemonic codes** to represent machine-level instructions. Each assembly instruction corresponds directly to a machine code instruction.

Architecture: MIPS

The architecture of MIPS CPU is RISC (Reduced Instruction Set Computer), which uses a small set of simple instructions for efficiency.

Restrictions of MIPS:
1. Can only assign integers directly to registers.
2. Can only perform arithmetic operations between registers, always two numbers.


Components of MIPS program:

1. Comments: start with `#` and extend to the end of the line.
2. Instructions: consist of an operation (opcode) and operands (registers, immediate values, labels).
3. Labels: used to mark locations in code for branching and jumping.

### Segments of MIPS Program

1. `.data` segment: for declaring initialized data or constants.
2. `.text` segment: for the actual code (instructions) of the program.

### Registers

Registers in MIPS (32 total):  
`$zero`: always contains `0` and cannot be overwritten  
`$t0-$t9`: temporary registers (not preserved across function calls)  
- `$v0-$v1`: function return values. Syscall code in `$v0` for system calls
    - `1`: print integer (argument in `$a0`)
    - `4`: print string (argument in `$a0`)
    - `5`: read integer (result in `$v0`)
    - `10`: exit program
- `$a0-$a3`: function arguments  
`$s0-$s7`: saved registers (preserved across function calls)  
`$k0-$k1`: reserved for OS kernel  
`$gp`: global pointer  
`$sp`: stack pointer  
`$fp`: frame pointer  
`$ra`: return address for function calls
`$at`: reserved for assembler  

### Core Instructions

register-types, immediate-types, jump-types, arithmetic-logical-instructions, memory-access-instructions, branching-instructions, pseudo-instructions

#### R-type Instructions

Syntax: `<op> <rd>, <rs>, <rt>`  
(`<operation> <destination_register>, <source_register_1>, <source_register_2>`)

```assembly
add $t0, $t1, $t2      # $t0 = $t1 + $t2
sub $t0, $t1, $t2      # $t0 = $t1 - $t2
and $t0, $t1, $t2      # $t0 = $t1 & $t2
or  $t0, $t1, $t2      # $t0 = $t1 | $t2
xor $t0, $t1, $t2      # $t0 = $t1 ^ $t2
nor $t0, $t1, $t2      # $t0 = ~($t1 | $t2)
nor $t0, $t1, $zero    # $t0 = ~($t1 | 0) = ~$t1

sll $t0, $t1, 2       # $t0 = $t1 << 2 (shift left logical)
srl $t0, $t1, 2       # $t0 = $t1 >> 2 (shift right logical)
```

#### I-type Instructions

Syntax: `<op> <rt>, <rs>, <immediate>`  
(`<operation>(6) <target_register>(5), <source_register>(5), <immediate_value>(16)`), so `immediate` is a 16-bit signed integer.

```assembly
addi $t0, $t1, 10      # $t0 = $t1 + 10
andi $t0, $t1, 0x0F      # $t0 = $t1 & 0x0F
```

`lw <rt>, <offset>(<rs>)`
```assembly
lw $t0, 3($t1)       # Load word from memory address ($t1 + 3) to $t0
sw $t0, 3($t1)       # Store word from $t0 to memory address ($t1 + 3)
```

Branching Instructions:

```assembly
beq $t0, $t1, label   # Branch to "label" if $t0 == $t1
bne $t0, $t1, label   # Branch to "label" if $t0 != $t1
```

#### J-type Instructions

Syntax: `<op> <address>`  
(`<operation>(6) <target_address>(26)`)

```assembly
j label     # Jump to "label"
jal label   # Jump and link to "label" (store return address in $ra)
```

### Pseudo-instructions

```assembly
move $t0, $t1          # Move value from $t1 to $t0
li $t0, 100            # Load immediate: $t0 = 100
la $t0, label         # Load address of "label" into $t0

blt $t0, $t1, label   # Branch to "label" if $t0 < $t1
bgt $t0, $t1, label   # Branch to "label" if $t0 > $t1
ble $t0, $t1, label   # Branch to "label" if $t0 <= $t1
bge $t0, $t1, label   # Branch to "label" if $t0 >= $t1
```

set-less-than instruction:
```assembly
slt $t0, $t1, $t2      # $t0 = ($t1 < $t2) ? 1 : 0
```

### Examples

Print the integer value that's in register `$t0`:
```assembly
li $v0, 1       # syscall code for print integer
move $a0, $t0   # move value from $t0 to $a0 (argument for syscall)
syscall
```

Read an integer from user input and store it in register `$t0`:
```assembly
li $v0, 5       # syscall code for read integer
syscall
move $t0, $v0   # move the read integer from $v0 to $t0
```

Exit the program:
```assembly
li $v0, 10  # syscall code for exit
syscall
```

### Multiplication and Division

```assembly
mult $t1, $t2          # Multiply $t1 by $t2
mflo $t0               # Move the lower 32 bits of the product from LO to $t0
mfhi $t0               # Move the upper 32 bits of the product from HI to $t0

mul $d, $s, $t       # $d = $s * $t
div $s, $t            # Divide $s by $t
mflo $d               # Move the quotient from LO to $d
mfhi $d               # Move the remainder from HI to $d
```

$P = M \times N$ (product result P, multiplicand M, multiplier N)

Multiplication Algorithm:
1. Initialize $P$ to 0.
2. While $M > 0$:
    - If `M & 1` (LSB) is 1, `P += N`.
    - `N << 1` (multiply by 2).
    - `M >> 1` (divide by 2).
3. Return $P$.

Direct proof:  
If $M = \sum\limits_{i=0}^{k} b_i 2^i$, then $P = \sum\limits_{i=0}^{k} (b_i \times 2^i \times N)$, where $b_i$ is the i-th bit of M.

Iterative proof:
1. If $M$ is even, $P = (M / 2) \times (N \times 2)$
2. If $M$ is odd, $P = N + ((M - 1) \times N)$
3. Repeat until $M = 0$


### Note

Direct arithmetic operations on integers are always done in the ALU.

ALU ignores the overflow error for `addu`.

### Memory Access

`.data` segment is used for declaring variables and constants.  
`.text` segment is used for the actual code (instructions) of the program.

Example:
```assembly
.data

num: .word 5           # an integer 5
arr: .word 1, 2, 3     # [1, 2, 3] array of words
buf: .space 16         # reserve 16 bytes of uninitialized space (garbage values)


var2: .byte 0xFF        # byte variable initialized to 255
str1: .asciiz "Hello, World!"  # null-terminated string
newline: .asciiz "\n"   # null-terminated string for newline
```
