---
title: "EECS 370: Computer Organization and Architecture"
description: ""
time: "Thu Sep 17, 2026"
---
# EECS 370: Computer Organization and Architecture

## Instruction Set Architecture (ISA)

ISA Types:
- Complex Instruction Set Computer (CISC)
- Reduced Instruction Set Computer (RISC)

### LC2K Processor

32-bit processor

$2^{16} = 65536$ words of memory

8 instructions: add, nor, lw, sw, beq, jalr, halt, noop

Instruction Encoding:
1. 31-25: Unused
2. 24-22: Opcode
3. 21-19: reg A
4. 18-16: reg B
5. 15-3: Unused
6. 2-0: destR

## ARM (Legv8) Processor

Use little-endian format

Memory Alignment: 4-byte aligned
- An N-byte data must start at an address that is a multiple of N.
- For a struct, the size of the struct must be a multiple of the largest member's size.

### ABI (Application Binary Interface)

Register conventions:
- X30 is the link register — used to hold return address
- X28 is stack pointer — holds address of top of stack
- X19-X27 are callee-saved — function must save these before writing to them
- X0-15 are caller-saved — function must save live values before call
- X0-X7 used for arguments (memory used if more space is needed) 
- X0 used for return value 

