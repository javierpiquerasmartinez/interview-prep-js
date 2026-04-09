# Interview Prep JavaScript Exercises

Comprehensive exercise files organized by algorithm patterns for technical interview preparation.

## Folder Structure

### 08-binary-search/
Advanced binary search problems requiring deep understanding of edge cases and pattern recognition.

#### 01-search-rotated-array.js
**LeetCode #33 - Search in Rotated Sorted Array (Medium)**
- Pattern: Binary search on rotated array
- Time: O(log n), Space: O(1)
- Key insight: One half is always completely sorted
- 10 test cases covering rotations, edge cases, large arrays

#### 02-median-two-sorted-arrays.js
**LeetCode #4 - Median of Two Sorted Arrays (Hard)**
- Pattern: Binary search on smaller array
- Time: O(log(min(m,n))), Space: O(1)
- Key insight: Partition both arrays into equal halves
- 10 test cases including empty arrays, even/odd lengths, negative values

### 09-design/
System design and data structure implementation problems.

#### 01-lru-cache.js
**LeetCode #146 - LRU Cache (Medium)**
- Pattern: Doubly Linked List + HashMap / JavaScript Map
- Time: O(1) for both get and put
- Space: O(capacity)
- Two implementations:
  - LRUCache: Traditional linked list approach (interview preferred)
  - LRUCacheSimple: JavaScript Map approach (simpler)
- 10 test cases covering eviction, updates, capacity management

## Running the Exercises

Each file is a standalone Node.js script with built-in tests:

```bash
node 08-binary-search/01-search-rotated-array.js
node 08-binary-search/02-median-two-sorted-arrays.js
node 09-design/01-lru-cache.js
```

All tests include:
- Spanish problem descriptions
- Clean, commented solutions
- Comprehensive test assertions
- Complexity analysis
- Interview tips and gotchas

## Key Patterns Covered

1. **Binary Search Variants**
   - Modified binary search for rotated arrays
   - Binary search across multiple arrays
   - Identifying ordered partitions

2. **Data Structure Design**
   - Linked list manipulation
   - HashMap integration
   - O(1) operation guarantee

3. **Interview Techniques**
   - Edge case handling
   - Complexity analysis
   - Time optimization strategies
