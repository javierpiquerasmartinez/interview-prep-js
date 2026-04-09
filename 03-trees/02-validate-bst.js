/**
 * LeetCode #98: Validate Binary Search Tree
 *
 * Descripción del Problema (Español):
 * Dado un árbol binario, valida si es un árbol binario de búsqueda (BST) válido.
 *
 * Un árbol binario de búsqueda válido debe cumplir:
 * - El valor del nodo izquierdo < valor del nodo actual
 * - El valor del nodo derecho > valor del nodo actual
 * - IMPORTANTE: Todos los nodos en el subárbol izquierdo < nodo actual
 * - IMPORTANTE: Todos los nodos en el subárbol derecho > nodo actual
 *
 * Ejemplo válido:
 *     2
 *    / \
 *   1   3
 *
 * Ejemplo inválido:
 *     5
 *    / \
 *   1   4  <- 4 no es > 5, por eso inválido
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
 * Solución 1: DFS con Rangos (Recomendado)
 *
 * Estrategia:
 * - Mantener los límites válidos (min, max) para cada nodo
 * - Para subárbol izquierdo: max se actualiza al valor del nodo actual
 * - Para subárbol derecho: min se actualiza al valor del nodo actual
 * - Validar que cada nodo esté dentro de su rango válido
 *
 * @param {TreeNode} root - Raíz del árbol
 * @return {boolean} - True si es un BST válido
 */
function isValidBST(root) {
  function validate(node, min, max) {
    // Caso base: árbol vacío es válido
    if (node === null) {
      return true;
    }

    // El valor actual debe estar dentro del rango válido
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Validar subárbol izquierdo: todos deben ser < node.val
    // Validar subárbol derecho: todos deben ser > node.val
    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  }

  // Iniciar validación con rango infinito
  return validate(root, -Infinity, Infinity);
}

/**
 * Solución 2: In-order Traversal (Alternativa)
 *
 * Estrategia:
 * - En un BST válido, el recorrido in-order (izquierda, nodo, derecha) está ordenado
 * - Recorre el árbol in-order y verifica que los valores estén en orden ascendente
 *
 * @param {TreeNode} root - Raíz del árbol
 * @return {boolean} - True si es un BST válido
 */
function isValidBSTInOrder(root) {
  let lastValue = -Infinity;
  let isValid = true;

  function inOrder(node) {
    if (node === null) {
      return;
    }

    // Recorrer izquierda
    inOrder(node.left);

    // Procesar nodo actual: debe ser mayor que el anterior
    if (node.val <= lastValue) {
      isValid = false;
    }
    lastValue = node.val;

    // Recorrer derecha
    inOrder(node.right);
  }

  inOrder(root);
  return isValid;
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

// Test 1: BST válido
//     2
//    / \
//   1   3
const test1 = new TreeNode(2);
test1.left = new TreeNode(1);
test1.right = new TreeNode(3);

assert(isValidBST(test1) === true, "Test 1: BST válido simple (Rangos)");
assert(isValidBSTInOrder(test1) === true, "Test 1: BST válido simple (InOrder)");

// Test 2: BST inválido (nodo derecho violando propiedad)
//     5
//    / \
//   1   4  <- 4 < 5, por eso inválido
const test2 = new TreeNode(5);
test2.left = new TreeNode(1);
test2.right = new TreeNode(4);

assert(isValidBST(test2) === false, "Test 2: BST inválido (Rangos)");
assert(isValidBSTInOrder(test2) === false, "Test 2: BST inválido (InOrder)");

// Test 3: Árbol con un solo nodo
const test3 = new TreeNode(1);

assert(isValidBST(test3) === true, "Test 3: Un solo nodo (Rangos)");
assert(isValidBSTInOrder(test3) === true, "Test 3: Un solo nodo (InOrder)");

// Test 4: BST válido más grande
//         10
//        /  \
//       5    15
//      / \   / \
//     2   7 12  20
const test4 = new TreeNode(10);
test4.left = new TreeNode(5);
test4.right = new TreeNode(15);
test4.left.left = new TreeNode(2);
test4.left.right = new TreeNode(7);
test4.right.left = new TreeNode(12);
test4.right.right = new TreeNode(20);

assert(isValidBST(test4) === true, "Test 4: BST válido grande (Rangos)");
assert(isValidBSTInOrder(test4) === true, "Test 4: BST válido grande (InOrder)");

// Test 5: Inválido por violación en el subárbol (caso tricky)
//         10
//        /  \
//       5    15
//      / \   / \
//     2   7 12  20
//        /
//       3  <- Pero el nodo es realmente 20, BST inválido porque 20 > 15 pero está en izq de 15
const test5 = new TreeNode(10);
test5.left = new TreeNode(5);
test5.right = new TreeNode(15);
test5.left.left = new TreeNode(2);
test5.left.right = new TreeNode(7);
test5.right.left = new TreeNode(12);
test5.right.right = new TreeNode(20);
// Modificar para hacerlo inválido
test5.right.left = new TreeNode(12);
test5.right.right = new TreeNode(6); // 6 < 15 pero está en el subárbol derecho, INVÁLIDO

assert(isValidBST(test5) === false, "Test 5: BST inválido (violación subárbol) (Rangos)");
assert(isValidBSTInOrder(test5) === false, "Test 5: BST inválido (violación subárbol) (InOrder)");

// Test 6: Árbol vacío
const test6 = null;

assert(isValidBST(test6) === true, "Test 6: Árbol vacío (Rangos)");
assert(isValidBSTInOrder(test6) === true, "Test 6: Árbol vacío (InOrder)");

// Test 7: Solo rama izquierda (skewed)
//     3
//    /
//   2
//  /
// 1
const test7 = new TreeNode(3);
test7.left = new TreeNode(2);
test7.left.left = new TreeNode(1);

assert(isValidBST(test7) === true, "Test 7: Árbol skewed izquierda (Rangos)");
assert(isValidBSTInOrder(test7) === true, "Test 7: Árbol skewed izquierda (InOrder)");

// Test 8: Solo rama derecha (skewed)
// 1
//  \
//   2
//    \
//     3
const test8 = new TreeNode(1);
test8.right = new TreeNode(2);
test8.right.right = new TreeNode(3);

assert(isValidBST(test8) === true, "Test 8: Árbol skewed derecha (Rangos)");
assert(isValidBSTInOrder(test8) === true, "Test 8: Árbol skewed derecha (InOrder)");

// ============================================
// Complejidad de Tiempo y Espacio
// ============================================

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * Ambas Soluciones:
 * - Tiempo: O(n) - visitamos cada nodo exactamente una vez
 * - Espacio: O(h) - altura del árbol (stack recursivo)
 *   - Mejor caso: O(log n) si el árbol está balanceado
 *   - Peor caso: O(n) si el árbol está skewed
 *
 * Comparación:
 * - Solución 1 (Rangos): Más intuitiva y elegante, early termination posible
 * - Solución 2 (InOrder): Útil si necesitas el orden además de validar
 */

// ============================================
// Interview Tips
// ============================================

/**
 * CONSEJOS PARA LA ENTREVISTA
 *
 * 1. CLARIDAD DEL PROBLEMA:
 *    - CRUCIAL: Explicar que TODOS los nodos en subárbol izquierdo < nodo actual
 *    - CRUCIAL: Explicar que TODOS los nodos en subárbol derecho > nodo actual
 *    - Muchos candidatos olvidan esto y solo comprueban hijos directos
 *
 * 2. ERRORES COMUNES:
 *    - ❌ Solo validar: left.val < node.val && right.val > node.val
 *    - ✓ Pasar rangos válidos (min, max) a cada nodo
 *
 * 3. ENFOQUES:
 *    - Solución 1 (Rangos): Recomendada, más clara y eficiente
 *    - Solución 2 (InOrder): Alternativa válida, demuestra conocimiento de traversals
 *
 * 4. CASOS ESPECIALES:
 *    - Árbol vacío (null) - es válido
 *    - Un solo nodo - es válido
 *    - Valores duplicados - depende de problema (aquí no permitidos)
 *    - Valores negativos e infinito - usar -Infinity y Infinity
 *
 * 5. FOLLOW-UP QUESTIONS:
 *    - "¿Qué pasa si los valores pueden tener duplicados?" (cambiar <= y >=)
 *    - "¿Cómo optimizarías para árboles muy profundos?" (usar iterativa con stack)
 *    - "¿Cómo detectarías donde está la violación?" (guardar referencias)
 *
 * 6. VARIANTES EN ENTREVISTAS:
 *    - Validar BST iterativamente
 *    - Recuperar el nodo que viola la propiedad
 *    - Convertir un árbol a BST válido
 */

console.log("\n✓ Todos los tests pasaron correctamente");
