// ============================================
// PROBLEMA: Reverse Linked List (LeetCode #206 - Easy)
// ============================================
// Invierte una lista enlazada simple.
//
// Dado el nodo cabeza de una lista enlazada, invierte la lista y devuelve
// la nueva cabeza de la lista invertida.
//
// Ejemplo:
//   Input:  1 -> 2 -> 3 -> 4 -> 5 -> null
//   Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
//
// Complejidad objetivo: Tiempo O(n), Espacio O(1)
// Patrón: Iterativo con punteros
// ============================================

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Solución: Invertir lista iterativamente
// Idea: Usar tres punteros (prev, current, next) para invertir enlaces
function reverseList(head) {
  // prev: apunta al nodo previamente procesado
  // current: nodo que estamos procesando
  let prev = null;
  let current = head;

  while (current !== null) {
    // Guardamos el siguiente nodo antes de cambiar el enlace
    const nextTemp = current.next;

    // Invertimos el enlace: ahora current apunta a prev
    current.next = prev;

    // Avanzamos: prev se mueve a current
    prev = current;

    // current se mueve al siguiente nodo
    current = nextTemp;
  }

  // prev ahora apunta a la nueva cabeza
  return prev;
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

  console.log('\n[Reverse Linked List - LeetCode #206]\n');

  // Test 1: Lista simple de 5 elementos
  const list1 = createList([1, 2, 3, 4, 5]);
  const result1 = reverseList(list1);
  assert(
    JSON.stringify(listToArray(result1)) === JSON.stringify([5, 4, 3, 2, 1]),
    'Test 1: Invertir [1,2,3,4,5] -> [5,4,3,2,1]'
  );

  // Test 2: Lista de 2 elementos
  const list2 = createList([1, 2]);
  const result2 = reverseList(list2);
  assert(
    JSON.stringify(listToArray(result2)) === JSON.stringify([2, 1]),
    'Test 2: Invertir [1,2] -> [2,1]'
  );

  // Test 3: Lista de 1 elemento (edge case)
  const list3 = createList([1]);
  const result3 = reverseList(list3);
  assert(
    JSON.stringify(listToArray(result3)) === JSON.stringify([1]),
    'Test 3: Lista con 1 elemento [1] -> [1]'
  );

  // Test 4: Lista vacía
  const list4 = createList([]);
  const result4 = reverseList(list4);
  assert(
    result4 === null,
    'Test 4: Lista vacía null -> null'
  );

  // Test 5: Lista de 6 elementos
  const list5 = createList([10, 20, 30, 40, 50, 60]);
  const result5 = reverseList(list5);
  assert(
    JSON.stringify(listToArray(result5)) === JSON.stringify([60, 50, 40, 30, 20, 10]),
    'Test 5: Invertir [10,20,30,40,50,60] -> [60,50,40,30,20,10]'
  );

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. CLARIFICA EL PROBLEMA:
//    - ¿Es una lista simple o doblemente enlazada?
//    - ¿Qué retornamos si la lista está vacía?
//    - ¿Podemos modificar la lista original?
//
// 2. ENFOQUE ITERATIVO (Recomendado):
//    - Ventaja: O(1) espacio, más eficiente
//    - Usa 3 punteros: prev, current, next
//    - Cuidado: Guarda next antes de cambiar enlaces
//
// 3. ENFOQUE RECURSIVO (Alternativa):
//    - Ventaja: Elegante, compacto
//    - Desventaja: O(n) espacio (pila de recursión)
//    - Mejor mencionar pero código iterativo es preferido
//
// 4. EDGE CASES a considerar:
//    - Lista vacía (null)
//    - Lista con 1 elemento
//    - Lista con 2 elementos (transición importante)
//    - Lista larga (validar eficiencia O(n))
//
// 5. COMPLEJIDAD:
//    - Tiempo: O(n) - visita cada nodo una vez
//    - Espacio: O(1) - solo usa punteros, sin estructura adicional
//
// 6. VARIACIONES FRECUENTES EN ENTREVISTAS:
//    - Invertir entre posiciones m y n
//    - Invertir en grupos de k elementos
//    - Detectar ciclos en listas
//
// 7. PUNTO CLAVE:
//    El orden de las operaciones es crítico:
//    1. Guardar nextTemp ANTES de cambiar current.next
//    2. Cambiar enlace (current.next = prev)
//    3. Avanzar punteros (prev=current, current=nextTemp)
//
// 8. VISUALIZACIÓN MENTAL:
//    null <- 1 <- 2 <- 3 <- 4 <- 5
//    Es lo que logramos después de procesar cada nodo.
