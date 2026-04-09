// ============================================
// PROBLEMA: Search in Rotated Sorted Array (LeetCode #33 - Medium)
// ============================================
// DESCRIPCIÓN EN ESPAÑOL:
// Se te da un array de números ordenado que ha sido rotado en algún punto.
// Por ejemplo: [0,1,2,4,5,6,7] rotado produce [4,5,6,7,0,1,2]
// Encuentra el índice del valor objetivo en O(log n).
// Retorna -1 si no existe.
//
// RESTRICCIONES:
// - El array no contiene duplicados
// - La búsqueda debe ser O(log n) (búsqueda binaria)
// - No se puede usar sort() o métodos built-in
//
// Complejidad objetivo: Tiempo O(log n), Espacio O(1)
// Patrón: Binary Search + Identificar mitad ordenada
// ============================================

/**
 * SOLUCIÓN:
 * 1. Usar dos pointers (izq, der) para búsqueda binaria
 * 2. En cada paso, identificar CUÁL mitad está ordenada (izq o der)
 * 3. Si el target está en la mitad ordenada, buscar allí
 * 4. Si no, buscar en la otra mitad
 *
 * CLAVE: En un array rotado, SIEMPRE una mitad está completamente ordenada
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // El target está en el medio
    if (nums[mid] === target) {
      return mid;
    }

    // Determinar cuál mitad está ordenada
    // Si izquierda está ordenada
    if (nums[left] <= nums[mid]) {
      // El target está en la mitad izquierda ordenada
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        // El target debe estar en la mitad derecha (posiblemente desordenada)
        left = mid + 1;
      }
    }
    // Si derecha está ordenada
    else {
      // El target está en la mitad derecha ordenada
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        // El target debe estar en la mitad izquierda (posiblemente desordenada)
        right = mid - 1;
      }
    }
  }

  return -1;
}

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log("Test 1: Array rotado, target presente");
  assert(search([4, 5, 6, 7, 0, 1, 2], 0) === 4, "search([4,5,6,7,0,1,2], 0) === 4");

  console.log("Test 2: Array rotado, target presente");
  assert(search([4, 5, 6, 7, 0, 1, 2], 3) === -1, "search([4,5,6,7,0,1,2], 3) === -1");

  console.log("Test 3: Array sin rotación (start)");
  assert(search([1], 1) === 0, "search([1], 1) === 0");

  console.log("Test 4: Array pequeño, target no existe");
  assert(search([1, 3], 3) === 1, "search([1,3], 3) === 1");

  console.log("Test 5: Array pequeño, target no existe");
  assert(search([1, 3], 0) === -1, "search([1,3], 0) === -1");

  console.log("Test 6: Rotación mínima");
  assert(search([3, 1], 1) === 1, "search([3,1], 1) === 1");

  console.log("Test 7: Target al inicio");
  assert(search([4, 5, 6, 7, 0, 1, 2], 4) === 0, "search([4,5,6,7,0,1,2], 4) === 0");

  console.log("Test 8: Target al final");
  assert(search([4, 5, 6, 7, 0, 1, 2], 2) === 6, "search([4,5,6,7,0,1,2], 2) === 6");

  console.log("Test 9: Array grande sin rotación");
  const largeArray = Array.from({ length: 100 }, (_, i) => i);
  assert(search(largeArray, 50) === 50, "Large array: find 50");

  console.log("Test 10: Array grande con rotación");
  const rotatedLarge = [...largeArray.slice(70), ...largeArray.slice(0, 70)];
  // rotatedLarge = [70,71,...,99,0,1,...,69]
  // So 50 is at index 80 (70 + 30 = 100, so 50-70=-20, -20+100=80)
  assert(search(rotatedLarge, 50) === 80, "Rotated large array: find 50");

  console.log("\n✅ Todos los tests pasaron!");
}
runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. INTUICIÓN CLAVE:
   - Un array rotado tiene dos partes ordenadas
   - Siempre una mitad (izq o der) está completamente ordenada
   - Usa esto para descartar mitades en O(log n)

2. GOTCHAS COMUNES:
   - Confundir <= vs < en comparaciones
   - No identificar correctamente cuál mitad está ordenada
   - Olvidar revisar los bordes (left, right)

3. VARIACIONES:
   - ¿Qué si hay duplicados? (LeetCode #81)
     Necesitas manejar nums[left] == nums[mid] == nums[right]
   - ¿Encuentra el punto de rotación?
     Similar pero retorna el índice del pivot

4. PASOS DE DEPURACIÓN:
   - Traza el ejemplo [4,5,6,7,0,1,2], target=0
   - Dibuja el árbol de decisiones en papel
   - Verifica que cada rama sea O(log n)

5. COMPLEJIDAD:
   - Tiempo: O(log n) - búsqueda binaria
   - Espacio: O(1) - solo variables
*/
