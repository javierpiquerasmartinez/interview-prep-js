// ============================================
// PROBLEMA: 3Sum (LeetCode #15 - Medium)
// ============================================
// Dado un array de números enteros 'nums', devuelve TODAS las combinaciones
// únicas de tres números que suman a cero.
//
// La solución no debe contener combinaciones duplicadas.
// El orden de la solución no importa.
//
// Ejemplo:
//   Input: nums = [-1, 0, 1, 2, -1, -4]
//   Output: [[-1, -1, 2], [-1, 0, 1]]
//
// Complejidad objetivo: Tiempo O(n²), Espacio O(1) o O(n) para output
// Patrón: Dos Pointers + Ordenamiento
// ============================================

function threeSum(nums) {
  // Ordenamos el array para poder usar dos pointers
  nums.sort((a, b) => a - b);
  const result = [];

  // Iteramos cada número como el primero de la tripla
  for (let i = 0; i < nums.length - 2; i++) {
    const first = nums[i];

    // Optimización: Si el número es positivo, no hay forma de sumar a 0
    if (first > 0) break;

    // Saltamos duplicados para evitar triplas duplicadas
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Usamos dos pointers para encontrar los otros dos números
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = first + nums[left] + nums[right];

      if (sum === 0) {
        // Encontramos una tripla válida
        result.push([first, nums[left], nums[right]]);

        // Saltamos duplicados del pointer izquierdo
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        // Saltamos duplicados del pointer derecho
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        // Movemos ambos pointers
        left++;
        right--;
      } else if (sum < 0) {
        // Necesitamos un número más grande, movemos left hacia la derecha
        left++;
      } else {
        // sum > 0, necesitamos un número más pequeño, movemos right hacia la izquierda
        right--;
      }
    }
  }

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

  const tripletExists = (result, triplet) => {
    return result.some(
      (t) =>
        t[0] === triplet[0] &&
        t[1] === triplet[1] &&
        t[2] === triplet[2]
    );
  };

  const verifySolution = (result, expectedTriplets) => {
    if (result.length !== expectedTriplets.length) return false;
    return expectedTriplets.every((triplet) => tripletExists(result, triplet));
  };

  console.log('\n3Sum Tests:');

  // Test 1: Ejemplo del problema
  let result = threeSum([-1, 0, 1, 2, -1, -4]);
  assert(
    verifySolution(result, [
      [-1, -1, 2],
      [-1, 0, 1],
    ]),
    'Ejemplo: [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]'
  );

  // Test 2: Array con todos ceros
  result = threeSum([0, 0, 0, 0]);
  assert(
    verifySolution(result, [[0, 0, 0]]),
    'Todos ceros: [0,0,0,0] → [[0,0,0]]'
  );

  // Test 3: Array pequeño sin solución
  result = threeSum([-2, 0, 1, 1, 2]);
  assert(
    verifySolution(result, [[-2, 0, 2], [-2, 1, 1]]),
    'Sin duplicados: [-2,0,1,1,2] → [[-2,0,2],[-2,1,1]]'
  );

  // Test 4: Array con negativos
  result = threeSum([-4, -1, -1, 0, 1, 2, -1, -4]);
  assert(
    result.length > 0 && result.every((t) => t[0] + t[1] + t[2] === 0),
    'Múltiples negativos: suma de cada tripla es 0'
  );

  // Test 5: Array con un solo triplete válido
  result = threeSum([-1, 0, 1]);
  assert(
    verifySolution(result, [[-1, 0, 1]]),
    'Mínimo válido: [-1,0,1] → [[-1,0,1]]'
  );

  // Test 6: Array grande sin solución
  result = threeSum([1, 2, 3, 4, 5]);
  assert(result.length === 0, 'Sin solución: [1,2,3,4,5] → []');

  // Test 7: Verificar sin duplicados en resultado
  result = threeSum([-1, 0, 1, -1, -1, 0]);
  const hasDuplicates = result.some(
    (t, i) =>
      result.findIndex(
        (other) =>
          other[0] === t[0] &&
          other[1] === t[1] &&
          other[2] === t[2]
      ) !== i
  );
  assert(!hasDuplicates, 'No hay triplas duplicadas en el resultado');

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
// Tiempo: O(n²)
//   - Ordenamiento: O(n log n)
//   - Loop externo: O(n)
//   - Dos pointers (loop interno): O(n) por cada iteración
//   - Total: O(n log n) + O(n²) = O(n²)
//
// Espacio: O(1) o O(n)
//   - O(1) si no contamos el output (ordenamiento puede ser in-place)
//   - O(n) si consideramos el espacio del ordenamiento y resultado
//
// Alternativa (HashMap):
//   - Tiempo: O(n²) igual
//   - Pero más complejidad de código y manejo de duplicados
// ============================================

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. ORDENAMIENTO ES CLAVE: Ordenar primero hace los dos pointers posibles
//    Explica: "Ordenar me permite usar dos pointers eficientemente"
//
// 2. DOS POINTERS: Después de fijar un número, busca otros dos con dos pointers
//    Left apunta a menor, right a mayor
//    Si suma < 0, movemos left; si > 0, movemos right
//
// 3. MANEJO DE DUPLICADOS: CRÍTICO para evitar resultados duplicados
//    Después de encontrar una solución, salta duplicados en ambos pointers
//    En el loop externo, salta números duplicados
//
// 4. OPTIMIZACIÓN: Si nums[i] > 0, rompe el loop
//    No hay forma de obtener suma 0 si el primer número es positivo
//
// 5. COMPLEJIDAD vs CLARIDAD: O(n²) con dos pointers es mejor que:
//    - HashMap O(n²) - más código
//    - Fuerza bruta O(n³) - mucho más lento
//
// 6. CASOS LÍMITE:
//    - Array de menos de 3 elementos → devuelve []
//    - Todos los elementos iguales (0s, positivos) → cuidado con duplicados
//    - Mezcla de positivos y negativos
//    - Un solo triplete válido
//
// 7. FOLLOW-UPS:
//    ¿Y si quiero K números que sumen X? (generalizar el problema)
//    ¿Cómo optimizar para memoria? (discute trade-offs)
// ============================================
