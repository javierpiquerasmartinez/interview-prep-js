// ============================================
// PROBLEMA: Merge Two Sorted Linked Lists (LeetCode #21 - Easy)
// ============================================
// Combina dos listas enlazadas ordenadas en una sola lista ordenada.
//
// Dado el encabezamiento de dos listas enlazadas ordenadas (list1 y list2),
// combina ambas listas en una sola lista ordenada. La nueva lista debe estar
// construida a partir de los nodos de las dos listas originales.
//
// Ejemplo:
//   Input:  list1 = 1 -> 2 -> 4
//           list2 = 1 -> 3 -> 4
//   Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4
//
// Complejidad objetivo: Tiempo O(n+m), Espacio O(1)
// Patrón: Dos punteros / Merge
// ============================================

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Solución: Fusionar dos listas ordenadas con dos punteros
// Idea: Comparar nodos de ambas listas y construir una nueva lista ordenada
function mergeTwoLists(list1, list2) {
  // Crear un nodo dummy para simplificar la lógica (sin caso especial para head)
  const dummy = new ListNode(0);
  let current = dummy;

  // Recorrer ambas listas simultáneamente
  while (list1 !== null && list2 !== null) {
    // Comparar y añadir el nodo más pequeño
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Anexar los nodos restantes de la lista que aún no se acabó
  // Nota: Solo una de estas líneas ejecutará (la otra es null)
  if (list1 !== null) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  // Retornar dummy.next (el verdadero head de la lista fusionada)
  return dummy.next;
}

// Función auxiliar para crear lista enlazada desde array
function createList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
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

  console.log('\n[Merge Two Sorted Linked Lists - LeetCode #21]\n');

  // Test 1: Dos listas normales con superposición
  const list1a = createList([1, 2, 4]);
  const list1b = createList([1, 3, 4]);
  const result1 = mergeTwoLists(list1a, list1b);
  assert(
    JSON.stringify(listToArray(result1)) === JSON.stringify([1, 1, 2, 3, 4, 4]),
    'Test 1: Merge [1,2,4] + [1,3,4] -> [1,1,2,3,4,4]'
  );

  // Test 2: Una lista vacía
  const list2a = createList([]);
  const list2b = createList([0]);
  const result2 = mergeTwoLists(list2a, list2b);
  assert(
    JSON.stringify(listToArray(result2)) === JSON.stringify([0]),
    'Test 2: Merge [] + [0] -> [0]'
  );

  // Test 3: Ambas listas vacías
  const list3a = createList([]);
  const list3b = createList([]);
  const result3 = mergeTwoLists(list3a, list3b);
  assert(
    result3 === null,
    'Test 3: Merge [] + [] -> null'
  );

  // Test 4: Una lista completamente menor que la otra
  const list4a = createList([1, 2, 3]);
  const list4b = createList([4, 5, 6]);
  const result4 = mergeTwoLists(list4a, list4b);
  assert(
    JSON.stringify(listToArray(result4)) === JSON.stringify([1, 2, 3, 4, 5, 6]),
    'Test 4: Merge [1,2,3] + [4,5,6] -> [1,2,3,4,5,6]'
  );

  // Test 5: Listas con diferentes longitudes
  const list5a = createList([1, 5]);
  const list5b = createList([2, 3, 4, 6, 7]);
  const result5 = mergeTwoLists(list5a, list5b);
  assert(
    JSON.stringify(listToArray(result5)) === JSON.stringify([1, 2, 3, 4, 5, 6, 7]),
    'Test 5: Merge [1,5] + [2,3,4,6,7] -> [1,2,3,4,5,6,7]'
  );

  // Test 6: Listas con valores duplicados
  const list6a = createList([1, 1, 1]);
  const list6b = createList([1, 2, 2]);
  const result6 = mergeTwoLists(list6a, list6b);
  assert(
    JSON.stringify(listToArray(result6)) === JSON.stringify([1, 1, 1, 1, 2, 2]),
    'Test 6: Merge [1,1,1] + [1,2,2] -> [1,1,1,1,2,2]'
  );

  // Test 7: Listas con un elemento cada una
  const list7a = createList([5]);
  const list7b = createList([3]);
  const result7 = mergeTwoLists(list7a, list7b);
  assert(
    JSON.stringify(listToArray(result7)) === JSON.stringify([3, 5]),
    'Test 7: Merge [5] + [3] -> [3,5]'
  );

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. CLARIFICA EL PROBLEMA:
//    - ¿Las listas están garantizadas que estén ordenadas?
//    - ¿Podemos crear nuevos nodos o reutilizar los existentes?
//    - ¿Qué retornamos si ambas listas están vacías?
//
// 2. PATRÓN "DUMMY NODE":
//    - Simplifica mucho la lógica
//    - Evita manejar el primer nodo como caso especial
//    - Técnica común en problemas de listas enlazadas
//    - dummy.next es nuestra respuesta final
//
// 3. ALGORITMO DE DOS PUNTEROS (Two Pointers):
//    - Compara valores actuales de ambas listas
//    - Elige el más pequeño y avanza su puntero
//    - Continúa hasta que una lista se agote
//    - Anexa la lista restante al final
//
// 4. EDGE CASES a considerar:
//    - Una o ambas listas vacías
//    - Listas de diferentes longitudes
//    - Valores duplicados entre listas
//    - Todos los elementos de una lista son menores
//
// 5. COMPLEJIDAD:
//    - Tiempo: O(n + m) donde n y m son longitudes de las listas
//    - Espacio: O(1) - solo reutilizamos nodos existentes
//    - No creamos estructura adicional
//
// 6. IMPLEMENTACIÓN SIN DUMMY NODE (Alternativa):
//    - Maneja el primer nodo por separado
//    - Más código, más propenso a errores
//    - Evita esta aproximación si es posible
//
// 7. PUNTO CLAVE:
//    Después de la comparación y avance, SIEMPRE hay una lista que
//    queda parcialmente (o completamente) sin procesar. Simplemente
//    anexamos lo que queda al final.
//
// 8. VARIACIONES FRECUENTES EN ENTREVISTAS:
//    - Merge k listas ordenadas (problema más difícil)
//    - Merge con remoción de duplicados
//    - Reverse mientras merges
//    - Merge manteniendo separadas por algún criterio
//
// 9. RECORDAR:
//    Listas ordenadas + merge = problema clásico
//    Técnica aplicable en: merge sort, multiwaymerge, etc.
