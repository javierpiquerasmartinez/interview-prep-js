# Binary Tree Algorithm Exercises - Interview Preparation

Complete collection of 4 JavaScript exercises covering essential binary tree algorithms for technical interviews.

## Files Overview

### 01-max-depth-binary-tree.js
**LeetCode #104: Maximum Depth of Binary Tree**
- Finds the longest path from root to any leaf node
- Implementations: DFS recursive, BFS iterative
- Time: O(n), Space: O(h) for DFS, O(w) for BFS
- Perfect for understanding tree traversal basics

### 02-validate-bst.js
**LeetCode #98: Validate Binary Search Tree**
- Validates if a tree is a valid BST
- Implementations: DFS with ranges, In-order traversal
- Time: O(n), Space: O(h)
- Key insight: ALL nodes in left subtree < current node, ALL nodes in right subtree > current node
- Common pitfall: Only checking direct children (incorrect)

### 03-level-order-traversal.js
**LeetCode #102: Binary Tree Level Order Traversal**
- Performs BFS to get nodes grouped by level
- Implementations: BFS with queue, DFS with depth parameter
- Time: O(n), Space: O(w) for BFS, O(h+w) for DFS
- Result: Array of arrays, one per level
- Foundation for many level-based tree problems

### 04-serialize-deserialize.js
**LeetCode #297: Serialize and Deserialize Binary Tree (Hard)**
- Converts tree to string and reconstructs it
- Implementations: Preorder traversal, Level-order traversal
- Time: O(n), Space: O(n)
- Preorder preferred: more compact, first element always root
- Critical for data persistence and inter-system communication

## Running Tests

Each file is standalone and can be run with Node.js:

```bash
node 01-max-depth-binary-tree.js
node 02-validate-bst.js
node 03-level-order-traversal.js
node 04-serialize-deserialize.js
```

All tests use assertions and will exit with status 1 if any test fails.

## File Structure

Each exercise includes:
- **TreeNode class**: Standard binary tree node implementation
- **Problem description**: In Spanish with examples
- **Multiple solutions**: Different approaches with trade-offs
- **Comprehensive test cases**: Edge cases, normal cases, boundary conditions
- **Complexity analysis**: Time and space for all approaches
- **Interview tips**: Common pitfalls, follow-up questions, variations

## Key Concepts Covered

1. **DFS vs BFS**: When to use each approach
2. **Tree traversals**: Preorder, inorder, level-order
3. **Recursion with parameters**: Passing state down the tree
4. **Queue-based algorithms**: Implementing BFS efficiently
5. **Problem variations**: How to adapt solutions for follow-ups
6. **Edge cases**: Empty trees, single nodes, skewed trees

## Interview Tips Summary

- Always clarify problem requirements before coding
- Consider multiple approaches and their trade-offs
- Handle all edge cases systematically
- Explain time/space complexity clearly
- Practice explaining your solution process
- Be ready for follow-up questions about variations
- Code clarity matters: use descriptive names and comments

## Complexity Reference

| Problem | Time | Space |
|---------|------|-------|
| Max Depth (DFS) | O(n) | O(h) |
| Max Depth (BFS) | O(n) | O(w) |
| Validate BST | O(n) | O(h) |
| Level Order | O(n) | O(w) |
| Serialize | O(n) | O(n) |
| Deserialize | O(n) | O(h) |

Where: n = number of nodes, h = height, w = max width

## Next Steps

After mastering these, explore:
- Path sum and path finding problems
- Tree construction problems
- Lowest common ancestor (LCA) problems
- Tree DP problems (Cutting Sticks, House Robber III)
