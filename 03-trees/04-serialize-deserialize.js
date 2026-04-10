/**
 * LeetCode #297: Serialize and Deserialize Binary Tree (Hard)
 *
 * Descripción del Problema (Español):
 * Diseña un algoritmo para serializar y deserializar un árbol binario.
 *
 * Serialización: Convertir un árbol binario a una cadena
 * Deserialización: Reconstruir el árbol desde la cadena
 *
 * RESTRICCIÓN: La representación debe ser única y permitir reconstruir
 * el árbol exactamente como era.
 *
 * Ejemplo:
 * Árbol:
 *     1
 *    / \
 *   2   3
 *      / \
 *     4   5
 *
 * Serializado: "1,2,null,null,3,4,null,null,5,null,null"
 * (Preorder traversal con null para nodos faltantes)
 */

// TreeNode class definition
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Codec {
  /**
   * Serializa un árbol binario a string
   * @param {TreeNode} root - Raíz del árbol
   * @return {string} - Representación en string
   */
  serialize(root) {
    let result = []
    function stringifyTree(node) {
      if (node === null) {
        result.push('null')
        return
      }
      result.push(node.val.toString())
      stringifyTree(node.left)
      stringifyTree(node.right)
    }
    stringifyTree(root)
    return result.join(',')
  }


  /**
   * Deserializa un string a árbol binario
   * @param {string} data - String serializado
   * @return {TreeNode} - Raíz del árbol reconstruido
   */
  deserialize(data) {
    let index = 0
    let arrayString = data.split(',')

    function fromStringToTree() {
      let node = arrayString[index]
      index++
      if (node === 'null') return null
      return new TreeNode(
        Number(node),
        fromStringToTree(),
        fromStringToTree()
      )
    }

    return fromStringToTree()

  }
}

class CodecBFS {
  /**
   * Serializa un árbol binario a string
   * @param {TreeNode} root - Raíz del árbol
   * @return {string} - Representación en string
   */
  serialize(root) {
    if (root === null) return "null"
    let queue = [root]
    let result

    while (queue.length > 0) {
      let node = queue.shift()
      if (!node) {
        result = result ? result.concat(',null') : 'null'
        continue
      }
      result = result ? result.concat(',' + node.val) : node.val.toString()
      queue.push(node.left)
      queue.push(node.right)
    }
    return result
  }

  /**
   * Deserializa un string a árbol binario
   * @param {string} data - String serializado
   * @return {TreeNode} - Raíz del árbol reconstruido
   */
  deserialize(data) {
    if (data === 'null') return null
    let serTree = data.split(',')
    const root = new TreeNode(Number(serTree.shift()))
    const queue = [root]
    while (serTree.length > 0) {
      let node = queue.shift()
      let leftV = serTree.shift()
      let rightV = serTree.shift()
      if (leftV === 'null') {
        node.left = null
      } else {
        node.left = new TreeNode(Number(leftV))
        queue.push(node.left)
      }
      if (rightV === 'null') {
        node.right = null
      } else {
        node.right = new TreeNode(Number(rightV))
        queue.push(node.right)
      }
    }
    return root
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

function treeEqual(node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }
  if (node1 === null || node2 === null) {
    return false;
  }
  return (
    node1.val === node2.val &&
    treeEqual(node1.left, node2.left) &&
    treeEqual(node1.right, node2.right)
  );
}

function treeToString(node) {
  if (node === null) {
    return "null";
  }
  return `(${node.val} ${treeToString(node.left)} ${treeToString(node.right)})`;
}

// Test 1: Árbol del ejemplo
//     1
//    / \
//   2   3
//      / \
//     4   5
const test1 = new TreeNode(1);
test1.left = new TreeNode(2);
test1.right = new TreeNode(3);
test1.right.left = new TreeNode(4);
test1.right.right = new TreeNode(5);

const codec1 = new Codec();
const serialized1 = codec1.serialize(test1);
const deserialized1 = codec1.deserialize(serialized1);
assert(
  treeEqual(test1, deserialized1),
  "Test 1: Árbol del ejemplo (Preorder)"
);

const codec1BFS = new CodecBFS();
const serialized1BFS = codec1BFS.serialize(test1);
const deserialized1BFS = codec1BFS.deserialize(serialized1BFS);
assert(
  treeEqual(test1, deserialized1BFS),
  "Test 1: Árbol del ejemplo (BFS)"
);

console.log(`  Serializado (Preorder): ${serialized1}`);
console.log(`  Serializado (BFS): ${serialized1BFS}`);

// Test 2: Árbol con un solo nodo
const test2 = new TreeNode(1);

const codec2 = new Codec();
const serialized2 = codec2.serialize(test2);
const deserialized2 = codec2.deserialize(serialized2);
assert(
  treeEqual(test2, deserialized2),
  "Test 2: Un solo nodo (Preorder)"
);

const codec2BFS = new CodecBFS();
const serialized2BFS = codec2BFS.serialize(test2);
const deserialized2BFS = codec2BFS.deserialize(serialized2BFS);
assert(
  treeEqual(test2, deserialized2BFS),
  "Test 2: Un solo nodo (BFS)"
);

// Test 3: Árbol vacío
const test3 = null;

const codec3 = new Codec();
const serialized3 = codec3.serialize(test3);
const deserialized3 = codec3.deserialize(serialized3);
assert(
  treeEqual(test3, deserialized3),
  "Test 3: Árbol vacío (Preorder)"
);

const codec3BFS = new CodecBFS();
const serialized3BFS = codec3BFS.serialize(test3);
const deserialized3BFS = codec3BFS.deserialize(serialized3BFS);
assert(
  treeEqual(test3, deserialized3BFS),
  "Test 3: Árbol vacío (BFS)"
);

// Test 4: Árbol skewed izquierda
// 1
// /
// 2
// /
// 3
const test4 = new TreeNode(1);
test4.left = new TreeNode(2);
test4.left.left = new TreeNode(3);

const codec4 = new Codec();
const serialized4 = codec4.serialize(test4);
const deserialized4 = codec4.deserialize(serialized4);
assert(
  treeEqual(test4, deserialized4),
  "Test 4: Árbol skewed izquierda (Preorder)"
);

const codec4BFS = new CodecBFS();
const serialized4BFS = codec4BFS.serialize(test4);
const deserialized4BFS = codec4BFS.deserialize(serialized4BFS);
assert(
  treeEqual(test4, deserialized4BFS),
  "Test 4: Árbol skewed izquierda (BFS)"
);

// Test 5: Árbol skewed derecha
// 1
//  \
//   2
//    \
//     3
const test5 = new TreeNode(1);
test5.right = new TreeNode(2);
test5.right.right = new TreeNode(3);

const codec5 = new Codec();
const serialized5 = codec5.serialize(test5);
const deserialized5 = codec5.deserialize(serialized5);
assert(
  treeEqual(test5, deserialized5),
  "Test 5: Árbol skewed derecha (Preorder)"
);

const codec5BFS = new CodecBFS();
const serialized5BFS = codec5BFS.serialize(test5);
const deserialized5BFS = codec5BFS.deserialize(serialized5BFS);
assert(
  treeEqual(test5, deserialized5BFS),
  "Test 5: Árbol skewed derecha (BFS)"
);

// Test 6: Árbol balanceado completo
//         1
//       /   \
//      2     3
//     / \   / \
//    4   5 6   7
const test6 = new TreeNode(1);
test6.left = new TreeNode(2);
test6.right = new TreeNode(3);
test6.left.left = new TreeNode(4);
test6.left.right = new TreeNode(5);
test6.right.left = new TreeNode(6);
test6.right.right = new TreeNode(7);

const codec6 = new Codec();
const serialized6 = codec6.serialize(test6);
const deserialized6 = codec6.deserialize(serialized6);
assert(
  treeEqual(test6, deserialized6),
  "Test 6: Árbol balanceado completo (Preorder)"
);

const codec6BFS = new CodecBFS();
const serialized6BFS = codec6BFS.serialize(test6);
const deserialized6BFS = codec6BFS.deserialize(serialized6BFS);
assert(
  treeEqual(test6, deserialized6BFS),
  "Test 6: Árbol balanceado completo (BFS)"
);

// Test 7: Árbol con valores negativos
const test7 = new TreeNode(-1);
test7.left = new TreeNode(0);
test7.right = new TreeNode(1);

const codec7 = new Codec();
const serialized7 = codec7.serialize(test7);
const deserialized7 = codec7.deserialize(serialized7);
assert(
  treeEqual(test7, deserialized7),
  "Test 7: Árbol con negativos (Preorder)"
);

// Test 8: Árbol incompleto
//     10
//    /  \
//   5    15
//  /      \
// 3       20
const test8 = new TreeNode(10);
test8.left = new TreeNode(5);
test8.right = new TreeNode(15);
test8.left.left = new TreeNode(3);
test8.right.right = new TreeNode(20);

const codec8 = new Codec();
const serialized8 = codec8.serialize(test8);
const deserialized8 = codec8.deserialize(serialized8);
assert(
  treeEqual(test8, deserialized8),
  "Test 8: Árbol incompleto (Preorder)"
);

const codec8BFS = new CodecBFS();
const serialized8BFS = codec8BFS.serialize(test8);
const deserialized8BFS = codec8BFS.deserialize(serialized8BFS);
assert(
  treeEqual(test8, deserialized8BFS),
  "Test 8: Árbol incompleto (BFS)"
);

// ============================================
// Complejidad de Tiempo y Espacio
// ============================================

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * Solución Preorder:
 * - Serialización:
 *   - Tiempo: O(n) - visitamos cada nodo una vez
 *   - Espacio: O(n) - resultado string contiene O(n) valores
 *
 * - Deserialización:
 *   - Tiempo: O(n) - procesamos cada valor una vez
 *   - Espacio: O(h) - stack recursivo, h = altura
 *
 * Solución BFS:
 * - Serialización:
 *   - Tiempo: O(n) - visitamos cada nodo una vez
 *   - Espacio: O(n) - resultado puede contener más nulls que Preorder
 *
 * - Deserialización:
 *   - Tiempo: O(n) - procesamos cada valor una vez
 *   - Espacio: O(w) - cola con ancho máximo w
 *
 * COMPARACIÓN:
 * - Preorder: Más compacto en la serialización, mejor para árboles densos
 * - BFS: Más familiar (como array 2D), mejor para árboles dispersos
 */

// ============================================
// Interview Tips
// ============================================

/**
 * CONSEJOS PARA LA ENTREVISTA (PROBLEMA HARD)
 *
 * 1. CLARIDAD DEL PROBLEMA:
 *    - El problema pide AMBAS: serialize y deserialize
 *    - No hay un único formato correcto, solo que sea válido y consistente
 *    - Debe permitir reconstruir el árbol EXACTAMENTE como era
 *
 * 2. ELECCIÓN DE ESTRATEGIA:
 *    - PREORDER (RECOMENDADO):
 *      + Más compacto (menos nulls)
 *      + Más eficiente en tiempo
 *      + Primer elemento siempre es la raíz
 *    - BFS:
 *      + Más familiar para algunos (como array 2D)
 *      + Menos recursión
 *
 * 3. PUNTOS CLAVE PARA EXPLICAR:
 *    - Por qué necesitamos representar nulls (para distinguir estructura)
 *    - Por qué preorder es óptimo (raíz primero)
 *    - Cómo los índices mantienen el estado durante recursión
 *
 * 4. ERRORES COMUNES:
 *    - ❌ Olvidar incluir nulls en la serialización
 *    - ❌ Cambiar de orden (preorder vs inorder vs postorder) sin justificar
 *    - ❌ No manejar casos especiales (árbol vacío, valores negativos)
 *    - ❌ Ineficiencia: usar shift() en loop (O(n) operación)
 *
 * 5. OPTIMIZACIONES PARA MENCIONAR:
 *    - "Para muy grandes árboles, podría usar streaming"
 *    - "Podría comprimir nulls consecutivos"
 *    - "Podría usar formato binario en lugar de strings"
 *
 * 6. VARIANTES Y FOLLOW-UPS:
 *    - "¿Y si el árbol es muy grande?" (streaming, chunks)
 *    - "¿Y si necesita guardar en disco?" (binary format)
 *    - "¿Y si el árbol tiene mucha profundidad?" (usar BFS, no DFS)
 *    - "¿Cómo optimizar el espacio?" (eliminar nulls finales)
 *    - "¿Cómo hacerlo iterativo?" (usar stack/queue en lugar de recursión)
 *
 * 7. CÓDIGO LIMPIO:
 *    - Separar serialize y deserialize claramente
 *    - Usar índice mutable (variable o parámetro) para deserializar
 *    - Nombrar clases/métodos descriptivamente
 *    - Comentarios en secciones complejas
 *
 * 8. TESTING:
 *    - Probar muchos árboles diferentes
 *    - Árboles skewed, balanceados, incompletos
 *    - Valores negativos, cero, grandes
 *    - Árbol vacío (edge case importante)
 */

console.log("\n✓ Todos los tests pasaron correctamente");
