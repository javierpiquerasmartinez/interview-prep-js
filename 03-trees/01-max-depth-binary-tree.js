/**
 * LeetCode #104: Maximum Depth of Binary Tree
 *
 * Descripción del Problema (Español):
 * Dado un árbol binario, encuentra la profundidad máxima del árbol.
 * La profundidad máxima es el número de nodos en el camino más largo
 * desde la raíz hasta cualquier hoja (nodo sin hijos).
 *
 * Ejemplo:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 *
 * Profundidad máxima = 3 (ruta: 3 -> 20 -> 7)
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
 * @param {TreeNode} root - Raíz del árbol binario
 * @return {number} - Profundidad máxima del árbol
 */
function maxDepth(root) {

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

// Test 1: Árbol balanceado
//     3
//    / \
//   9  20
//     /  \
//    15   7
const test1Root = new TreeNode(3);
test1Root.left = new TreeNode(9);
test1Root.right = new TreeNode(20);
test1Root.right.left = new TreeNode(15);
test1Root.right.right = new TreeNode(7);

assert(maxDepth(test1Root) === 3, "Test 1: Árbol balanceado (DFS)");
assert(maxDepthBFS(test1Root) === 3, "Test 1: Árbol balanceado (BFS)");

// Test 2: Árbol con un solo nodo
const test2Root = new TreeNode(1);
assert(maxDepth(test2Root) === 1, "Test 2: Solo raíz (DFS)");
assert(maxDepthBFS(test2Root) === 1, "Test 2: Solo raíz (BFS)");

// Test 3: Árbol vacío
const test3Root = null;
assert(maxDepth(test3Root) === 0, "Test 3: Árbol vacío (DFS)");
assert(maxDepthBFS(test3Root) === 0, "Test 3: Árbol vacío (BFS)");

// Test 4: Árbol skewed (solo lado derecho)
//   1
//    \
//     2
//      \
//       3
//        \
//         4
const test4Root = new TreeNode(1);
test4Root.right = new TreeNode(2);
test4Root.right.right = new TreeNode(3);
test4Root.right.right.right = new TreeNode(4);

assert(maxDepth(test4Root) === 4, "Test 4: Árbol skewed derecha (DFS)");
assert(maxDepthBFS(test4Root) === 4, "Test 4: Árbol skewed derecha (BFS)");

// Test 5: Árbol completo
//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7
const test5Root = new TreeNode(1);
test5Root.left = new TreeNode(2);
test5Root.right = new TreeNode(3);
test5Root.left.left = new TreeNode(4);
test5Root.left.right = new TreeNode(5);
test5Root.right.left = new TreeNode(6);
test5Root.right.right = new TreeNode(7);

assert(maxDepth(test5Root) === 3, "Test 5: Árbol completo (DFS)");
assert(maxDepthBFS(test5Root) === 3, "Test 5: Árbol completo (BFS)");

// ============================================
// Complejidad de Tiempo y Espacio
// ============================================

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * Solución DFS Recursiva:
 * - Tiempo: O(n) - visitamos cada nodo exactamente una vez
 * - Espacio: O(h) - altura del árbol (stack recursivo)
 *   - Mejor caso: O(log n) si el árbol está balanceado
 *   - Peor caso: O(n) si el árbol está skewed
 *
 * Solución BFS Iterativa:
 * - Tiempo: O(n) - visitamos cada nodo exactamente una vez
 * - Espacio: O(w) - ancho máximo del árbol (cola)
 *   - Mejor caso: O(1) para un árbol degenerado
 *   - Peor caso: O(n) para un árbol completo
 */

// ============================================
// Interview Tips
// ============================================

/**
 * CONSEJOS PARA LA ENTREVISTA
 *
 * 1. CLARIDAD:
 *    - Explica la definición de "profundidad": número de nodos desde raíz hasta hoja
 *    - Confirma si se incluye el nodo raíz en el conteo
 *
 * 2. ENFOQUES MÚLTIPLES:
 *    - DFS recursivo es más natural y elegante
 *    - BFS iterativo evita stack overflow en árboles muy profundos
 *    - Discute trade-offs entre ambos
 *
 * 3. CASOS ESPECIALES:
 *    - Árbol vacío (null)
 *    - Árbol con un solo nodo
 *    - Árboles skewed (solo izquierda o derecha)
 *    - Árboles completamente balanceados
 *
 * 4. OPTIMIZACIONES:
 *    - Si solo necesitas la profundidad, DFS es más eficiente en espacio
 *    - Para árboles muy profundos, BFS es más seguro
 *
 * 5. VARIANTES COMUNES EN ENTREVISTAS:
 *    - "Encuentra la profundidad mínima" (cambiar Math.max a Math.min)
 *    - "Encuentra el camino más largo" (retorna el camino, no solo la longitud)
 *    - "Encuentra todos los caminos raíz a hoja"
 */

console.log("\n✓ Todos los tests pasaron correctamente");
