// ============================================
// PROBLEMA: Two Sum (LeetCode #1 - Easy)
// ============================================
// Dado un array de números enteros 'nums' y un entero 'target',
// devuelve los ÍNDICES de los dos números que suman el 'target'.
//
// Puedes asumir que cada entrada tiene exactamente una solución.
// No puedes usar el mismo elemento dos veces.
//
// Ejemplo:
//   Input: nums = [2, 7, 11, 15], target = 9
//   Output: [0, 1]
//   Explicación: nums[0] + nums[1] = 2 + 7 = 9
//
// ============================================

function twoSum(nums, target) {
  const result = []
  const found = false
  nums.forEach((num, index) => {
    nums.find((num2, index2) => {
      if (num + num2 === target && index !== index2) {
        result.push(index, index2)
        found = true
        return true
      }
    });
    if (found) return
  });
  console.log(result)
  return result;
}

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, idx) => val === b[idx]);

  console.log('\nTwo Sum Tests:');

  // Test 1: Ejemplo básico del problema
  let result = twoSum([2, 7, 11, 15], 9);
  assert(arraysEqual(result, [0, 1]), 'Ejemplo básico: [2,7,11,15], target=9 → [0,1]');

  // Test 2: Diferentes índices
  result = twoSum([3, 2, 4], 6);
  assert(arraysEqual(result, [1, 2]), 'Índices en el medio: [3,2,4], target=6 → [1,2]');

  // Test 3: Números negativos
  result = twoSum([3, 3], 6);
  assert(arraysEqual(result, [0, 1]), 'Números iguales: [3,3], target=6 → [0,1]');

  // Test 4: Números negativos en array
  result = twoSum([-1, -2, -3, 5, 10], 15);
  assert(arraysEqual(result, [3, 4]), 'Con negativos: [-1,-2,-3,5,10], target=15 → [3,4]');

  // Test 5: Array pequeño
  result = twoSum([1, 2], 3);
  assert(arraysEqual(result, [0, 1]), 'Array mínimo: [1,2], target=3 → [0,1]');

  // Test 6: Números grandes
  result = twoSum([1000, 2000, 3000, 4000], 5000);
  assert(arraysEqual(result, [1, 2]), 'Números grandes: [1000,2000,3000,4000], target=5000 → [1,2]');

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
// Tiempo: O(n)
//   - Recorremos el array una sola vez
//   - Cada búsqueda/inserción en HashMap es O(1)
//
// Espacio: O(n)
//   - En el peor caso, almacenamos n-1 elementos en el mapa
//
// Alternativa ingenua (Fuerza bruta):
//   - Tiempo: O(n²) con dos bucles anidados
//   - Espacio: O(1)
// ============================================

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. COMPLEMENTO: El truco es pensar en "¿Qué número necesito encontrar?"
//    En lugar de buscar pares, busca el complemento: target - num
//
// 2. HASH MAP vs ARRAY: Usa Map/objeto para búsquedas O(1)
//    Un array requeriría buscar en O(n) cada elemento
//
// 3. INDICES, NO VALORES: El problema pide ÍNDICES, no los números
//    Muchos candidatos retornan los valores en lugar de los índices
//
// 4. UNA SOLA PASADA: Con HashMap lo haces en una pasada
//    Explica por qué es mejor que dos pasadas o fuerza bruta
//
// 5. CASOS LÍMITE:
//    - Array con solo 2 elementos
//    - Números negativos
//    - Números duplicados en el array
//    - target = num + num (mismo número dos veces)
//
// 6. FOLLOW-UP PREGUNTAS:
//    ¿Qué pasa si hay múltiples soluciones? (devuelve todas)
//    ¿Y si no hay solución? (lanzar excepción o devolver [-1, -1])
//    ¿Array está ordenado? (si sí, usar dos pointers en O(n) espacio)
// ============================================
