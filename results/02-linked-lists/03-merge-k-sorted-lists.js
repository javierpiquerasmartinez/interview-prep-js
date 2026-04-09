// ============================================
// PROBLEMA: Merge K Sorted Linked Lists (LeetCode #23 - Hard)
// ============================================
// Combina k listas enlazadas ordenadas en una sola lista ordenada.
//
// Dado un arreglo de k listas enlazadas, cada una ordenada en orden
// ascendente, combina todas las listas en una sola lista ordenada.
//
// Ejemplo:
//   Input:  lists = [[1,4,5],[1,3,4],[2,6]]
//   Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
//
// Complejidad objetivo: Tiempo O(n*log(k)), Espacio O(log(k)) o O(k)
// Patrón: Divide y Conquista / Priority Queue
// ============================================

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// SOLUCIÓN 1: DIVIDE Y CONQUISTA
// Idea: Dividir las k listas en mitades, resolver recursivamente, luego fusionar
// Complejidad: O(n*log(k)) tiempo, O(log(k)) espacio (pila de recursión)
function mergeKListsDivideConquer(lists) {
  if (!lists || lists.length === 0) return null;
  return mergeHelper(lists, 0, lists.length - 1);
}

function mergeHelper(lists, left, right) {
  // Caso base: solo una lista
  if (left === right) return lists[left];

  // Si no hay listas en este rango
  if (left > right) return null;

  // Dividir en mitades
  const mid = Math.floor((left + right) / 2);

  // Resolver recursivamente para ambas mitades
  const leftMerged = mergeHelper(lists, left, mid);
  const rightMerged = mergeHelper(lists, mid + 1, right);

  // Conquista: Fusionar las dos mitades
  return mergeTwoLists(leftMerged, rightMerged);
}

// Función auxiliar para fusionar dos listas (usada por divide y conquista)
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 !== null ? l1 : l2;
  return dummy.next;
}

// Función auxiliar para crear listas desde arrays
function createLists(arrOfArrs) {
  return arrOfArrs.map(arr => {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  });
}

// Función auxiliar para convertir lista a array (para testing)
function listToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// TESTS con assertions
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n[Merge K Sorted Linked Lists - LeetCode #23]\n');

  // Test 1: Ejemplo del problema - 3 listas
  const lists1 = createLists([[1, 4, 5], [1, 3, 4], [2, 6]]);
  const result1 = mergeKListsDivideConquer(lists1);
  assert(
    JSON.stringify(listToArray(result1)) === JSON.stringify([1, 1, 2, 3, 4, 4, 5, 6]),
    'Test 1: Merge [[1,4,5],[1,3,4],[2,6]] -> [1,1,2,3,4,4,5,6]'
  );

  // Test 2: Una sola lista
  const lists2 = createLists([[5]]);
  const result2 = mergeKListsDivideConquer(lists2);
  assert(
    JSON.stringify(listToArray(result2)) === JSON.stringify([5]),
    'Test 2: Merge con 1 lista [[5]] -> [5]'
  );

  // Test 3: Lista vacía de listas
  const lists3 = createLists([]);
  const result3 = mergeKListsDivideConquer(lists3);
  assert(
    result3 === null,
    'Test 3: Merge con 0 listas [] -> null'
  );

  // Test 4: Listas vacías dentro del arreglo
  const lists4 = createLists([[], [], []]);
  const result4 = mergeKListsDivideConquer(lists4);
  assert(
    result4 === null,
    'Test 4: Merge con listas vacías [[], [], []] -> null'
  );

  // Test 5: Mezcla de listas vacías y no vacías
  const lists5 = createLists([[], [1], []]);
  const result5 = mergeKListsDivideConquer(lists5);
  assert(
    JSON.stringify(listToArray(result5)) === JSON.stringify([1]),
    'Test 5: Merge [[], [1], []] -> [1]'
  );

  // Test 6: Muchas listas pequeñas
  const lists6 = createLists([[1], [2], [3], [4], [5]]);
  const result6 = mergeKListsDivideConquer(lists6);
  assert(
    JSON.stringify(listToArray(result6)) === JSON.stringify([1, 2, 3, 4, 5]),
    'Test 6: Merge [[1],[2],[3],[4],[5]] -> [1,2,3,4,5]'
  );

  // Test 7: Listas más grandes con valores duplicados
  const lists7 = createLists([
    [1, 3, 5, 7],
    [2, 4, 6, 8],
    [1, 2, 3]
  ]);
  const result7 = mergeKListsDivideConquer(lists7);
  assert(
    JSON.stringify(listToArray(result7)) === JSON.stringify([1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8]),
    'Test 7: Merge listas grandes con duplicados'
  );

  // Test 8: k = 2 (case especial del problema general)
  const lists8 = createLists([[1, 4, 5], [1, 3, 4]]);
  const result8 = mergeKListsDivideConquer(lists8);
  assert(
    JSON.stringify(listToArray(result8)) === JSON.stringify([1, 1, 3, 4, 4, 5]),
    'Test 8: Merge 2 listas (k=2) [[1,4,5],[1,3,4]] -> [1,1,3,4,4,5]'
  );

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. CLARIFICA EL PROBLEMA:
//    - ¿Todas las listas están ordenadas?
//    - ¿Puede haber listas null en el arreglo?
//    - ¿Cuál es el rango de k (número de listas)?
//    - ¿Cuál es el rango de n (nodos totales)?
//
// 2. ESTRATEGIA DIVIDE Y CONQUISTA (Recomendado):
//    Ventajas:
//    - Complejidad óptima O(n*log(k))
//    - Elegante y eficiente
//    - Fácil de entender y explicar
//
//    Proceso:
//    - Dividir arreglo de listas en mitades
//    - Resolver recursivamente cada mitad
//    - Fusionar los resultados con mergeTwoLists
//
// 3. ANÁLISIS DE COMPLEJIDAD:
//    - Tiempo: O(n*log(k))
//      * n = número total de nodos en todas las listas
//      * k = número de listas
//      * log(k) por niveles de recursión
//      * n por procesar cada nodo en cada nivel
//
//    - Espacio: O(log(k))
//      * Pila de recursión tiene altura log(k)
//      * No hay estructura de datos adicional importante
//
// 4. ALTERNATIVA: Priority Queue / Min Heap
//    - Complejidad: O(n*log(k)) tiempo
//    - Mantener heap de k elementos (heads de listas)
//    - Extraer mínimo, procesar, insertar siguiente
//    - Más fácil de entender pero requiere librería
//
// 5. ENFOQUE SIMPLE (NO RECOMENDADO):
//    - Fusionar listas uno a uno: O(n*k) - muy lento
//    - lists[0] + lists[1] -> merge
//    - resultado + lists[2] -> merge
//    - ... etc
//    - Evitar esta aproximación
//
// 6. EDGE CASES a considerar:
//    - Arreglo vacío de listas
//    - Listas null en el arreglo
//    - Todos los nodos en una lista
//    - Valores muy grandes (overflow)
//    - k = 1 (una sola lista)
//    - k = 2 (dos listas - back to problem #21)
//
// 7. PUNTO CLAVE - DIVIDE Y CONQUISTA:
//    La belleza de este enfoque es que DIVIDE Y CONQUISTA
//    el problema de k listas en merges pares más manejables.
//    Nivel 1: k lists -> k/2 merges de 2 listas
//    Nivel 2: k/2 results -> k/4 merges de 2 listas
//    ... hasta obtener 1 resultado
//
// 8. VARIACIONES FRECUENTES EN ENTREVISTAS:
//    - Merge k listas sin crear nueva estructura
//    - Merge k listas manteniendo orden inverso
//    - Merge k arrays ordenados (array vs lista)
//    - Merge k streams de datos
//
// 9. DIFERENCIA CON #21 (Merge Two Lists):
//    #21: Específicamente 2 listas
//    #23: Generalizar a k listas
//    #23 requiere mejor estrategia: divide & conquer > iterativo
//
// 10. COMUNICACIÓN EN ENTREVISTA:
//     "Voy a usar divide y conquista. Divido las k listas por mitad,
//      resuelvo recursivamente, y luego uso la solución de merge two
//      lists para fusionar los resultados. Esto me da O(n*log(k))."
