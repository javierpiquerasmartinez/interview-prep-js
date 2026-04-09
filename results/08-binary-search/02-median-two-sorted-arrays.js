// ============================================
// PROBLEMA: Median of Two Sorted Arrays (LeetCode #4 - Hard)
// ============================================
// DESCRIPCIÓN EN ESPAÑOL:
// Dados dos arrays ordenados nums1 y nums2 de tamaños m y n respectivamente,
// encuentra la MEDIANA de los dos arrays combinados.
//
// La mediana es:
// - Si longitud total es par: promedio de los dos elementos del medio
// - Si es impar: el elemento del medio
//
// RESTRICCIONES:
// - Solución debe ser O(log(min(m, n)))
// - No puedes simplemente combinar y ordenar O(m+n)
// - Los arrays pueden estar vacíos
//
// Complejidad objetivo: Tiempo O(log(min(m,n))), Espacio O(1)
// Patrón: Binary Search en el array más pequeño
// ============================================

/**
 * SOLUCIÓN EXPLICADA:
 *
 * IDEA: Partir los arrays en dos mitades de forma que:
 * 1. La mitad izquierda tenga (m + n + 1) // 2 elementos
 * 2. Todos en izquierda <= todos en derecha
 * 3. Usar búsqueda binaria en el array PEQUEÑO
 *
 * PASOS:
 * 1. Asegurar que nums1 es el array menor (para simplificar)
 * 2. Hacer búsqueda binaria en nums1 por la posición de corte
 * 3. Calcular posición correspondiente en nums2
 * 4. Validar que left_max <= right_min
 * 5. Calcular mediana basada en paridad
 */
function findMedianSortedArrays(nums1, nums2) {
  // Asegurar que nums1 es el array menor para optimizar
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    // cut1 es la cantidad de elementos de nums1 en la mitad izquierda
    const cut1 = Math.floor((left + right) / 2);
    // cut2 es la cantidad de elementos de nums2 en la mitad izquierda
    const cut2 = Math.floor((m + n + 1) / 2) - cut1;

    // Elementos máximos de la izquierda
    const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];

    // Elementos mínimos de la derecha
    const right1 = cut1 === m ? Infinity : nums1[cut1];
    const right2 = cut2 === n ? Infinity : nums2[cut2];

    // Validar que la partición es válida
    if (left1 <= right2 && left2 <= right1) {
      // Partición válida encontrada
      const maxLeft = Math.max(left1, left2);
      const minRight = Math.min(right1, right2);

      // Si la longitud total es par
      if ((m + n) % 2 === 0) {
        return (maxLeft + minRight) / 2;
      }
      // Si la longitud total es impar
      else {
        return maxLeft;
      }
    } else if (left1 > right2) {
      // cut1 es muy grande, necesitamos reducirlo
      right = cut1 - 1;
    } else {
      // cut1 es muy pequeño, necesitamos aumentarlo
      left = cut1 + 1;
    }
  }

  return -1; // Nunca se llega aquí si los inputs son válidos
}

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log("Test 1: Arrays de igual tamaño, longitud par");
  assert(
    findMedianSortedArrays([1, 3], [2]) === 2,
    "findMedianSortedArrays([1,3], [2]) === 2"
  );

  console.log("Test 2: Arrays diferentes, longitud impar");
  assert(
    findMedianSortedArrays([1, 2], [3, 4]) === 2.5,
    "findMedianSortedArrays([1,2], [3,4]) === 2.5"
  );

  console.log("Test 3: Un array vacío");
  assert(findMedianSortedArrays([], [1]) === 1, "findMedianSortedArrays([], [1]) === 1");

  console.log("Test 4: Ambos arrays vacíos (edge case)");
  // En LeetCode, asumen que al menos uno tiene elementos
  // Pero lo manejamos gracefully
  assert(
    isNaN(findMedianSortedArrays([], [])),
    "findMedianSortedArrays([], []) === NaN"
  );

  console.log("Test 5: Arrays con valores negativos");
  assert(
    findMedianSortedArrays([-2, -1], [3, 4]) === 1,
    "findMedianSortedArrays([-2,-1], [3,4]) === 1"
  );

  console.log("Test 6: Primer array mucho más pequeño");
  assert(
    findMedianSortedArrays([0, 0], [0, 0, 0, 0, 0]) === 0,
    "findMedianSortedArrays([0,0], [0,0,0,0,0]) === 0"
  );

  console.log("Test 7: Segundo array mucho más pequeño");
  assert(
    findMedianSortedArrays([1, 1, 1, 1, 1], [2, 2]) === 1,
    "findMedianSortedArrays([1,1,1,1,1], [2,2]) === 1"
  );

  console.log("Test 8: Arrays grandes con valores diferentes");
  const arr1 = [1, 3, 5, 7, 9];
  const arr2 = [2, 4, 6, 8, 10];
  assert(
    findMedianSortedArrays(arr1, arr2) === 5.5,
    "findMedianSortedArrays([1,3,5,7,9], [2,4,6,8,10]) === 5.5"
  );

  console.log("Test 9: Todos elementos en primera mitad");
  assert(
    findMedianSortedArrays([1, 2], [100, 101]) === 51,
    "findMedianSortedArrays([1,2], [100,101]) === 51"
  );

  console.log("Test 10: Valores grandes");
  assert(
    findMedianSortedArrays([1000000], [1000001]) === 1000000.5,
    "findMedianSortedArrays([1000000], [1000001]) === 1000000.5"
  );

  console.log("\n✅ Todos los tests pasaron!");
}
runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. INTUICIÓN CLAVE:
   - No necesitas combinar los arrays
   - Usa búsqueda binaria en el array PEQUEÑO
   - La clave es partir correctamente: izquierda = (m+n+1)//2 elementos
   - Valida que max(izq) <= min(der)

2. WHY O(log(min(m,n)))?
   - Buscamos binariamente en el array pequeño
   - Cada iteración reduce el espacio de búsqueda a la mitad
   - log(min(m,n)) divisiones por 2

3. CASOS EDGE CASE:
   - Un array vacío: fácil, la mediana es del otro
   - Ambos vacíos: no permitido en LeetCode
   - Un elemento vs varios: funciona
   - Valores negativos: funciona, no afecta lógica

4. ERRORES COMUNES:
   - Olvidar usar cut2 = (m+n+1)//2 - cut1 (CRUCIAL)
   - Confundir Infinity vs valores reales en bordes
   - No manejar paridad correctamente
   - Búsqueda binaria en array grande en lugar de pequeño

5. VISUALIZACIÓN:
   nums1: [1, 3] | cut1=1
   nums2: [2]   | cut2=1

   Izquierda:  [1] + [2] = {1, 2}   -> max = 2
   Derecha:    [3] + []  = {3}      -> min = 3

   Total = 3 elementos (impar) -> mediana = max(izq) = 2

   Otro ejemplo:
   nums1: [1, 3] | cut1=2
   nums2: [2]   | cut2=0

   Izquierda:  [1, 3]     = {1, 3}   -> max = 3
   Derecha:    [] + [2]   = {2}      -> min = 2

   3 > 2, INVÁLIDO -> reducir cut1

6. COMPLEJIDAD:
   - Tiempo: O(log(min(m,n))) - búsqueda binaria en array pequeño
   - Espacio: O(1) - solo variables temporales
*/
