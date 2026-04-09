// ============================================
// PROBLEMA: LRU Cache (LeetCode #146 - Medium)
// ============================================
// DESCRIPCIÓN EN ESPAÑOL:
// Implementa una LRU (Least Recently Used) Cache con capacidad fija.
//
// Operaciones requeridas:
// 1. get(key): Obtener valor. O(1). Si existe, marcar como "recientemente usado"
// 2. put(key, value): Insertar o actualizar. O(1).
//    - Si la cache está llena, eliminar el item MENOS RECIENTEMENTE USADO
//    - Luego insertar el nuevo item
//
// EJEMPLO:
//   cache = new LRUCache(2);
//   cache.put(1, 1);    // {1}
//   cache.put(2, 2);    // {1, 2}
//   cache.get(1);       // retorna 1, {1, 2} -> {2, 1} (1 ahora es reciente)
//   cache.put(3, 3);    // {2, 1} capacidad llena -> elimina LRU (2) -> {1, 3}
//   cache.get(2);       // retorna -1, 2 ya no existe
//
// Complejidad objetivo: get O(1), put O(1)
// Patrón: HashMap + Doubly Linked List O LinkedHashMap
// ============================================

/**
 * SOLUCIÓN 1: Usando Map (JavaScript) + Doubly Linked List
 *
 * En JavaScript, Map mantiene orden de inserción
 * PERO necesitamos reordenar on-the-fly cuando accedemos
 * Por eso usamos una estructura explícita de linked list
 *
 * COMPONENTES:
 * 1. Node: elemento de la linked list (key, value, prev, next)
 * 2. HashMap: key -> Node
 * 3. Doubly Linked List: head -> ... -> tail
 *    - head.next = least recently used
 *    - tail.prev = most recently used
 */

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> Node

    // Nodos sentinel para facilitar operaciones en bordes
    this.head = new Node(0, 0); // fake head (less recently used side)
    this.tail = new Node(0, 0); // fake tail (more recently used side)

    // Conectar head y tail inicialmente
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Obtener valor de la cache
   * Complejidad: O(1)
   */
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key);
    // Mover el node al final (más reciente)
    this._moveToTail(node);
    return node.value;
  }

  /**
   * Insertar o actualizar valor en la cache
   * Complejidad: O(1)
   */
  put(key, value) {
    // Si la key ya existe, actualizar su valor
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      // Mover a la cola (más reciente)
      this._moveToTail(node);
      return;
    }

    // Crear un nuevo node
    const newNode = new Node(key, value);
    this.cache.set(key, newNode);
    // Insertar al final (más reciente)
    this._addToTail(newNode);

    // Si excedemos la capacidad, eliminar el menos recientemente usado
    if (this.cache.size > this.capacity) {
      const lruNode = this.head.next;
      this._removeNode(lruNode);
      this.cache.delete(lruNode.key);
    }
  }

  /**
   * Remover un node de la linked list
   */
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * Mover un node al final (marca como más reciente)
   */
  _moveToTail(node) {
    this._removeNode(node);
    this._addToTail(node);
  }

  /**
   * Agregar un node al final de la lista (más reciente)
   */
  _addToTail(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
}

// ============================================
// SOLUCIÓN 2: Usando Map de JavaScript directamente
// ============================================
// En JavaScript, Map mantiene orden de inserción
// Podemos aprovechar esto eliminando e re-insertando

class LRUCacheSimple {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const value = this.cache.get(key);
    // Marcar como reciente: eliminar e reinsertar
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Eliminar la entrada existente
      this.cache.delete(key);
    }

    // Insertar la nueva entrada (al final)
    this.cache.set(key, value);

    // Si excedemos capacidad, eliminar el primero (menos reciente)
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log("=== Testing LRUCache (Linked List Implementation) ===\n");

  console.log("Test 1: Operaciones básicas");
  const cache1 = new LRUCache(2);
  cache1.put(1, 1);
  cache1.put(2, 2);
  assert(cache1.get(1) === 1, "get(1) returns 1");
  cache1.put(3, 3);
  assert(cache1.get(2) === -1, "get(2) returns -1 after eviction");

  console.log("Test 2: Actualizar valor existente");
  const cache2 = new LRUCache(2);
  cache2.put(1, 1);
  cache2.put(1, 10);
  assert(cache2.get(1) === 10, "Updating key 1 to 10");

  console.log("Test 3: Capacidad de 1");
  const cache3 = new LRUCache(1);
  cache3.put(1, 1);
  cache3.put(2, 2);
  assert(cache3.get(1) === -1, "Only most recent item (2) is kept");
  assert(cache3.get(2) === 2, "get(2) returns 2");

  console.log("Test 4: Evicting least recently used");
  const cache4 = new LRUCache(3);
  cache4.put(1, 1);
  cache4.put(2, 2);
  cache4.put(3, 3);
  cache4.get(1); // Mark 1 as recently used
  cache4.put(4, 4); // Should evict 2 (least recently used)
  assert(cache4.get(2) === -1, "Key 2 was evicted");
  assert(cache4.get(1) === 1, "Key 1 still exists");

  console.log("Test 5: Multiple accesses update recency");
  const cache5 = new LRUCache(2);
  cache5.put(1, 1);
  cache5.put(2, 2);
  cache5.get(1); // 1 becomes recently used
  cache5.put(3, 3); // Should evict 2
  assert(cache5.get(1) === 1, "Key 1 exists");
  assert(cache5.get(2) === -1, "Key 2 was evicted");
  assert(cache5.get(3) === 3, "Key 3 exists");

  console.log("Test 6: Get doesn't affect order if key doesn't exist");
  const cache6 = new LRUCache(2);
  cache6.put(1, 1);
  cache6.put(2, 2);
  cache6.get(3); // non-existent key
  cache6.put(3, 3); // Should evict 1 (still least recently used)
  assert(cache6.get(1) === -1, "Key 1 was evicted");
  assert(cache6.get(2) === 2, "Key 2 exists");

  console.log("Test 7: Larger dataset");
  const cache7 = new LRUCache(5);
  for (let i = 1; i <= 5; i++) {
    cache7.put(i, i * 10);
  }
  // Access 1 and 2 to mark them as recent
  cache7.get(1);
  cache7.get(2);
  // Now add 6, should evict 3 (least recent among 3,4,5)
  cache7.put(6, 60);
  assert(cache7.get(3) === -1, "Key 3 was evicted");
  assert(cache7.get(1) === 10, "Key 1 still exists");

  console.log("\n=== Testing LRUCacheSimple (Map Implementation) ===\n");

  console.log("Test 8: Simple implementation - basic ops");
  const cache8 = new LRUCacheSimple(2);
  cache8.put(1, 1);
  cache8.put(2, 2);
  assert(cache8.get(1) === 1, "get(1) returns 1");
  cache8.put(3, 3);
  assert(cache8.get(2) === -1, "get(2) returns -1 after eviction");

  console.log("Test 9: Simple implementation - eviction");
  const cache9 = new LRUCacheSimple(3);
  cache9.put(1, 1);
  cache9.put(2, 2);
  cache9.put(3, 3);
  cache9.get(1); // Mark 1 as recent
  cache9.put(4, 4); // Evict 2
  assert(cache9.get(2) === -1, "Key 2 was evicted");
  assert(cache9.get(1) === 1, "Key 1 exists");
  assert(cache9.get(4) === 4, "Key 4 exists");

  console.log("Test 10: Simple implementation - capacity 1");
  const cache10 = new LRUCacheSimple(1);
  cache10.put(1, 1);
  cache10.put(2, 2);
  assert(cache10.get(1) === -1, "Only most recent survives");
  assert(cache10.get(2) === 2, "Most recent exists");

  console.log("\n✅ Todos los tests pasaron!");
}
runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. DOS ENFOQUES:

   A) Linked List + HashMap (RECOMENDADO)
      - Doubly Linked List para mantener orden
      - HashMap para acceso O(1)
      - head -> LRU ... MRU -> tail
      - Remover primero después de head
      - Agregar nuevo al final antes de tail

   B) JavaScript Map (SIMPLE pero menos educativo)
      - Map mantiene orden de inserción
      - Eliminar e re-insertar para "marcar como reciente"
      - No impresiona tanto en entrevista

2. POR QUÉ O(1)?
   - HashMap get/set: O(1)
   - Linked list remove: O(1) si tienes el node
   - Linked list move/add: O(1)
   - Operación put/get: max = O(1)

3. CASOS EDGE CASE:
   - Capacidad = 1
   - Acceder a key inexistente
   - Actualizar key existente
   - Todo el cache lleno y necesita evicción

4. ERRORES COMUNES:
   - Confundir cuál es LRU (head.next) vs MRU (tail.prev)
   - Olvidar actualizar la referencia del HashMap
   - No manejar nodos sentinel (head/tail dummies)
   - Olvidar mover a tail después de get o put existente

5. VARIACIONES EN ENTREVISTA:
   - LFU Cache (Least Frequently Used)
   - Agregar TTL (time to live)
   - Agregar operación delete
   - Agregar estadísticas (hits/misses)

6. VISUALIZACIÓN:
   Capacidad = 3

   put(1,1): head <-> [1] <-> tail
   put(2,2): head <-> [1] <-> [2] <-> tail
   put(3,3): head <-> [1] <-> [2] <-> [3] <-> tail
   get(1):   head <-> [2] <-> [3] <-> [1] <-> tail (1 moves to end)
   put(4,4): head <-> [3] <-> [1] <-> [4] <-> tail (2 was evicted)

7. COMPLEJIDAD:
   - Tiempo: get O(1), put O(1)
   - Espacio: O(capacity) para los nodes
*/
