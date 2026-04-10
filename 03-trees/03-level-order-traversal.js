/**
 * LeetCode #102: Binary Tree Level Order Traversal
 *
 * Descripción del Problema (Español):
 * Dado un árbol binario, retorna el recorrido por niveles (BFS).
 * El resultado debe ser una lista de listas donde cada sublista contiene
 * los valores de los nodos en ese nivel, de izquierda a derecha.
 *
 * Ejemplo:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 *
 * Resultado esperado: [[3], [9, 20], [15, 7]]
 */

// TreeNode class definition
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 *
 * @param {TreeNode} root - Raíz del árbol binario
 * @return {number[][]} - Lista de listas con valores por nivel
 */
function levelOrder(root) {
  if (root === null) return []
  let result = []
  let queue = new Queue([root])
  while (queue.nodeQ.length > 0) {
    let levelSize = queue.nodeQ.length
    let levelNodes = []
    for (let i = 0; i < levelSize; i++) {
      let node = queue.pull()
      levelNodes.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(levelNodes)
  }
  return result
}

function levelOrderDFS(root) {
  let result = []

  function orderByLevel(node, level) {
    if (node === null) return
    result[level] = result[level] ? result[level].concat(node.val) : [node.val]
    orderByLevel(node.left, level + 1)
    orderByLevel(node.right, level + 1)
  }

  orderByLevel(root, 0)

  return result
}

function levelOrderWithDepth(root) {
  if (root === null) return []
  let result = []
  let queue = [[root, 0]]
  while (queue.length > 0) {
    let [node, depth] = queue.shift()
    result[depth] = result[depth] ? result[depth].concat(node.val) : [node.val]
    if (node.left) queue.push([node.left, depth + 1])
    if (node.right) queue.push([node.right, depth + 1])
  }
  return result
}


class Queue {
  constructor(nodes) {
    this.nodeQ = nodes
  }
  pull() {
    return this.nodeQ.shift()
  }
  push(node) {
    this.nodeQ.push(node)
  }
}


// ============================================
// Test Cases
// ============================================

function assert(condition, message) {
  if (!condition) {
    console.error(`FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`PASSED: ${message}`);
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    const level1 = arr1[i];
    const level2 = arr2[i];
    if (level1.length !== level2.length) return false;
    for (let j = 0; j < level1.length; j++) {
      if (level1[j] !== level2[j]) return false;
    }
  }
  return true;
}

// Test 1: Árbol del ejemplo
//     3
//    / \
//   9  20
//     /  \
//    15   7
const test1 = new TreeNode(3);
test1.left = new TreeNode(9);
test1.right = new TreeNode(20);
test1.right.left = new TreeNode(15);
test1.right.right = new TreeNode(7);

const expected1 = [[3], [9, 20], [15, 7]];
assert(arraysEqual(levelOrder(test1), expected1), "Test 1: Árbol ejemplo (BFS)");
assert(arraysEqual(levelOrderDFS(test1), expected1), "Test 1: Árbol ejemplo (DFS)");
assert(arraysEqual(levelOrderWithDepth(test1), expected1), "Test 1: Árbol ejemplo (Con Profundidad)");

// Test 2: Árbol con un solo nodo
const test2 = new TreeNode(1);

const expected2 = [[1]];
assert(arraysEqual(levelOrder(test2), expected2), "Test 2: Un solo nodo (BFS)");
assert(arraysEqual(levelOrderDFS(test2), expected2), "Test 2: Un solo nodo (DFS)");

// Test 3: Árbol vacío
const test3 = null;

const expected3 = [];
assert(arraysEqual(levelOrder(test3), expected3), "Test 3: Árbol vacío (BFS)");
assert(arraysEqual(levelOrderDFS(test3), expected3), "Test 3: Árbol vacío (DFS)");

// Test 4: Árbol completamente balanceado (4 niveles)
//           1
//         /   \
//        2     3
//       / \   / \
//      4   5 6   7
//     /
//    8
const test4 = new TreeNode(1);
test4.left = new TreeNode(2);
test4.right = new TreeNode(3);
test4.left.left = new TreeNode(4);
test4.left.right = new TreeNode(5);
test4.right.left = new TreeNode(6);
test4.right.right = new TreeNode(7);
test4.left.left.left = new TreeNode(8);

const expected4 = [[1], [2, 3], [4, 5, 6, 7], [8]];
assert(arraysEqual(levelOrder(test4), expected4), "Test 4: Árbol balanceado (BFS)");
assert(arraysEqual(levelOrderDFS(test4), expected4), "Test 4: Árbol balanceado (DFS)");

// Test 5: Árbol skewed (solo lado izquierdo)
// 1
// /
// 2
// /
// 3
const test5 = new TreeNode(1);
test5.left = new TreeNode(2);
test5.left.left = new TreeNode(3);

const expected5 = [[1], [2], [3]];
assert(arraysEqual(levelOrder(test5), expected5), "Test 5: Árbol skewed izquierda (BFS)");
assert(arraysEqual(levelOrderDFS(test5), expected5), "Test 5: Árbol skewed izquierda (DFS)");

// Test 6: Árbol skewed (solo lado derecho)
// 1
//  \
//   2
//    \
//     3
const test6 = new TreeNode(1);
test6.right = new TreeNode(2);
test6.right.right = new TreeNode(3);

const expected6 = [[1], [2], [3]];
assert(arraysEqual(levelOrder(test6), expected6), "Test 6: Árbol skewed derecha (BFS)");
assert(arraysEqual(levelOrderDFS(test6), expected6), "Test 6: Árbol skewed derecha (DFS)");

// Test 7: Árbol incompleto
//     10
//    /  \
//   5    15
//  /      \
// 3       20
const test7 = new TreeNode(10);
test7.left = new TreeNode(5);
test7.right = new TreeNode(15);
test7.left.left = new TreeNode(3);
test7.right.right = new TreeNode(20);

const expected7 = [[10], [5, 15], [3, 20]];
assert(arraysEqual(levelOrder(test7), expected7), "Test 7: Árbol incompleto (BFS)");
assert(arraysEqual(levelOrderDFS(test7), expected7), "Test 7: Árbol incompleto (DFS)");

// ============================================
// Complejidad de Tiempo y Espacio
// ============================================

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * Solución BFS con Cola:
 * - Tiempo: O(n) - visitamos cada nodo exactamente una vez
 * - Espacio: O(w) - ancho máximo del árbol (cola)
 *   - Mejor caso: O(1) para un árbol degenerado
 *   - Peor caso: O(n) para un árbol completo
 *
 * Solución DFS Recursiva:
 * - Tiempo: O(n) - visitamos cada nodo exactamente una vez
 * - Espacio: O(h) - altura del árbol (stack recursivo) + O(w) para resultado
 *   - Mejor caso: O(log n) si el árbol está balanceado
 *   - Peor caso: O(n) si el árbol está skewed
 *
 * Nota: BFS es generalmente preferida para level-order porque es más intuitiva
 */

// ============================================
// Interview Tips
// ============================================

/**
 * CONSEJOS PARA LA ENTREVISTA
 *
 * 1. CLARIDAD DEL PROBLEMA:
 *    - El resultado debe ser una LISTA DE LISTAS
 *    - Cada sublista contiene un NIVEL del árbol
 *    - Los valores dentro de cada nivel van de izquierda a derecha
 *
 * 2. ESTRUCTURA DE DATOS:
 *    - Cola (Queue) es la estructura natural para BFS
 *    - En JavaScript, podemos usar array y métodos push/shift
 *    - IMPORTANTE: usar queue.shift() es O(n), pero está bien para este problema
 *
 * 3. TRUCO IMPORTANTE:
 *    - Procesar todos los nodos del NIVEL ACTUAL antes de agregar el siguiente
 *    - Usar `levelSize` para saber cuántos nodos procesamos en este nivel
 *
 * 4. ENFOQUES:
 *    - BFS: Natural, eficiente, fácil de explicar (RECOMENDADO)
 *    - DFS: También funciona, pero menos intuitivo para level-order
 *
 * 5. CASOS ESPECIALES:
 *    - Árbol vacío (null) -> []
 *    - Un solo nodo -> [[valor]]
 *    - Árbol completamente desbalanceado
 *    - Árbol completo (máximo ancho)
 *
 * 6. OPTIMIZACIONES:
 *    - Usar Deque en lugar de array si shift() es un problema
 *    - Para árboles muy grandes, procesar nivel a nivel en streaming
 *
 * 7. VARIANTES COMUNES EN ENTREVISTAS:
 *    - "Retorna solo el nodo más a la derecha de cada nivel"
 *    - "Retorna en reverse order (de abajo a arriba)"
 *    - "Retorna en zigzag (izq-der, der-izq, alternando)"
 *    - "Retorna solo nodos hoja"
 *    - "Calcula la suma de cada nivel"
 *
 * 8. CÓDIGO LIMPIO:
 *    - Claramente separar la lógica de "procesamiento de nivel"
 *    - Usar nombres descriptivos (levelSize, currentLevel)
 *    - Comentarios en partes clave
 */

console.log("\n✓ Todos los tests pasaron correctamente");
