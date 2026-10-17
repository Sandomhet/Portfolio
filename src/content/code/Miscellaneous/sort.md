---
title: "Sorting Algorithms"
description: "An overview of various sorting algorithms, their time and space complexities, and stability."
time: "Sun Nov 2, 2025"
---

# Sorting Algorithms

## Table of Contents

1. [Overview](#overview)
2. [Selection Sort](#selection-sort)
3. [Bubble Sort](#bubble-sort)
4. [Insertion Sort](#insertion-sort)
5. [Merge Sort](#merge-sort)
6. [Quick Sort](#quick-sort)

## Overview

Stability in sorting algorithms refers to the preservation of the relative order of records with equal values. A stable sort will maintain the order of equal elements as they appear in the input.

Table of comparisons:
| Algorithm       | (Best) Time <br> Complexity | (Average) Time <br> Complexity | (Worst) Time <br> Complexity | Space <br> Complexity | Stability      |
|-----------------|------------------------|---------------------------|-------------------------|------------------|-----------------|
| Selection Sort  | $O(n^2)$                 | $O(n^2)$                    | $O(n^2)$                  | $O(1)$             | Not Stable      |
| Bubble Sort     | $O(n)$ or $O(n^2)$           | $O(n^2)$                    | $O(n^2)$                  | $O(1)$             | Stable          |
| Insertion Sort  | $O(n)$                   | $O(n^2)$                    | $O(n^2)$                  | $O(1)$             | Stable          |
| Merge Sort      | $O(n \log n)$            | $O(n \log n)$               | $O(n \log n)$             | $O(n)$             | Stable          |
| Quick Sort      | $O(n \log n)$            | $O(n \log n)$               | $O(n^2)$                  | $O(\log n)$ or $O(n)$ | Not Stable      |

## Selection Sort

It repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the end of the sorted sublist.

- **Time Complexity**: 
    - Best Case: $O(n^2)$
    - Average Case: $O(n^2)$
    - Worst Case: $O(n^2)$
- **Space Complexity**: $O(1)$

```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int k = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[k]) k = j;
        swap(arr[i], arr[k]);
    }
}
```

## Bubble Sort

It repeatedly compares adjacent elements and swaps them if they are in the wrong order.

- **Time Complexity**: 
    - Best Case: $O(n)$ (when the array is already sorted)
    - Best Case without optimization: $O(n^2)$ (don't stop early)
    - Average Case: $O(n^2)$
    - Worst Case: $O(n^2)$ (when the array is sorted in reverse order)
- **Space Complexity**: $O(1)$

```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n - 1; i > 0; i--) {
        bool swapped = false; // Optimization
        for (int j = 0; j < i; j++)
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        if (!swapped) break;
    }
}
```

## Insertion Sort

It repeatedly takes the next element from the input data and inserts it into the correct position in the already sorted part of the array.

- **Time Complexity**: 
    - Best Case: $O(n)$ (when the array is already sorted)
    - Average Case: $O(n^2)$
    - Worst Case: $O(n^2)$ (when the array is sorted in reverse order)
- **Space Complexity**: $O(1)$

```cpp
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

## Merge Sort

Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts each half, and then merges the two sorted halves back together.

- **Time Complexity**: 
    - Best Case: $O(n \log n)$
    - Average Case: $O(n \log n)$
    - Worst Case: $O(n \log n)$
- **Space Complexity**: $O(n)$ (temporary arrays).

```cpp
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> tmp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
        else tmp[k++] = arr[j++];
    }
    while (i <= mid) tmp[k++] = arr[i++];
    while (j <= right) tmp[k++] = arr[j++];
    for (int i = left; i <= right; i++) arr[i] = tmp[i - left];
}
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

## Quick Sort

Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

- **Time Complexity**: 
    - Best Case: $O(n \log n)$ (when the pivot divides the array into two equal halves)
    - Average Case: $O(n \log n)$
    - Worst Case: $O(n^2)$ (when the smallest or largest element is always chosen as the pivot)
- **Space Complexity**: (recursion stack).
    - Best and Average Case: $O(\log n)$ (balanced partitions)
    - Worst Case: $O(n)$ (when the recursion depth is maximum)

```cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low;
    for (int j = low; j < high; j++)
        if (arr[j] < pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    swap(arr[i], arr[high]);
    return i;
}
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```
