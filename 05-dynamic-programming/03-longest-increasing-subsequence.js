// ============================================
// PROBLEMA: Longest Increasing Subsequence (LeetCode #300 - Medium)
// ============================================
// Dado un arreglo de números enteros, encuentra la longitud de la
// subsecuencia más larga que está en orden estrictamente creciente.
//
// Una subsecuencia no necesita ser contigua, pero mantiene el orden
// relativo de los elementos del arreglo original.
//
// Ejemplo: nums=[10,9,2,5,3,7,101,18]
// LIS: [2,3,7,101] o [2,3,7,18] -> Longitud = 4
//
// Complejidad: Tiempo O(n²) [DP], O(n log n) [Binary Search]
//              Espacio O(n)
// Patrón: Dynamic Programming - Tabulación
// ============================================

/**
 * Solución 1: DP Tabulación - O(n²) Tiempo
 *
 * Relación de recurrencia:
 * dp[i] = 1 + max(dp[j]) para todos j < i donde nums[j] < nums[i]
 *
 * dp[i] representa la longitud de LIS que termina en nums[i]
 */
function lengthOfLIS_DP(nums) {
  if (nums.length === 0) return 0;

  // dp[i] = longitud de LIS que termina en nums[i]
  const dp = Array(nums.length).fill(1);

  // Para cada elemento, buscamos todos los anteriores
  for (let i = 1; i < nums.length; i++) {
    // Comprobamos todos los elementos antes de i
    for (let j = 0; j < i; j++) {
      // Si encontramos un valor menor, podemos extender esa secuencia
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // El máximo en dp es la respuesta
  return Math.max(...dp);
}

/**
 * Solución 2: Binary Search - O(n log n) Tiempo (OPTIMAL)
 *
 * Idea inteligente:
 * Mantenemos un array `tails` donde tails[i] es el elemento más pequeño
 * que termina una subsecuencia creciente de longitud i+1.
 *
 * Esto permite usar búsqueda binaria para mantener el array ordenado
 * y eficientemente encontrar dónde insertar cada nuevo elemento.
 */
function lengthOfLIS_BinarySearch(nums) {
  if (nums.length === 0) return 0;

  // tails[i] = elemento más pequeño que termina una LIS de longitud i+1
  const tails = [];

  for (const num of nums) {
    // Búsqueda binaria para encontrar la posición de inserción
    let left = 0;
    let right = tails.length;

    // Encontramos la primera posición donde tails[pos] >= num
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Insertamos (o reemplazamos) en esa posición
    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}

/**
 * Solución 3: DP con reconstrucción (obtener la subsecuencia real)
 *
 * A veces en entrevistas preguntan: ¿cuál es la subsecuencia, no solo la longitud?
 */
function getLIS(nums) {
  if (nums.length === 0) return [];

  const dp = Array(nums.length).fill(1);
  const parent = Array(nums.length).fill(-1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        parent[i] = j; // Guardamos de dónde vinimos
      }
    }
  }

  // Encontramos el índice con máxima longitud
  let maxLength = Math.max(...dp);
  let maxIndex = dp.indexOf(maxLength);

  // Reconstruimos la secuencia
  const lis = [];
  let idx = maxIndex;
  while (idx !== -1) {
    lis.unshift(nums[idx]);
    idx = parent[idx];
  }

  return {
    length: maxLength,
    subsequence: lis,
  };
}

// ============================================
// TESTS
// ============================================
function runTests() {
  console.log("🧪 Ejecutando tests para Longest Increasing Subsequence...\n");

  const testCases = [
    {
      nums: [10, 9, 2, 5, 3, 7, 101, 18],
      expected: 4,
      description: "Ejemplo estándar: [2,5,7,101]",
    },
    {
      nums: [0, 1, 0, 4, 4, 4, 3, 2, 1],
      expected: 3,
      description: "Varios iguales: [0,1,4]",
    },
    {
      nums: [3, 10, 2, 1, 20],
      expected: 3,
      description: "[3,10,20]",
    },
    {
      nums: [1],
      expected: 1,
      description: "Un elemento",
    },
    {
      nums: [5, 4, 3, 2, 1],
      expected: 1,
      description: "Secuencia descendente: máximo 1",
    },
    {
      nums: [1, 2, 3, 4, 5],
      expected: 5,
      description: "Secuencia ascendente: toda la secuencia",
    },
    {
      nums: [1, 3, 6, 7, 9, 4, 10, 5, 8],
      expected: 6,
      description: "Mixto: [1,3,6,7,9,10]",
    },
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach(({ nums, expected, description }) => {
    const result_dp = lengthOfLIS_DP(nums);
    const result_bs = lengthOfLIS_BinarySearch(nums);
    const result_with_seq = getLIS(nums);

    const success =
      result_dp === expected && result_bs === expected && result_with_seq.length === expected;

    if (success) {
      console.log(`✅ PASS: ${description}`);
      console.log(`   Input: [${nums.join(", ")}]`);
      console.log(`   DP O(n²): ${result_dp}`);
      console.log(`   Binary Search O(n log n): ${result_bs}`);
      console.log(`   Subsecuencia: [${result_with_seq.subsequence.join(", ")}]`);
      console.log();
      passed++;
    } else {
      console.log(`❌ FAIL: ${description}`);
      console.log(
        `   Expected: ${expected}, DP: ${result_dp}, BS: ${result_bs}\n`
      );
      failed++;
    }
  });

  console.log(`\n📊 Resultados: ${passed} passed, ${failed} failed`);
  console.log(`✨ ${failed === 0 ? "¡Todos los tests pasaron!" : "Hay fallos que corregir"}\n`);
}

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
/*
SOLUCIÓN 1: DP Tabulación O(n²)
- Tiempo: O(n²) - Dos loops anidados
- Espacio: O(n) - Array dp

SOLUCIÓN 2: Binary Search O(n log n) - ÓPTIMA
- Tiempo: O(n log n) - n iteraciones, cada una con búsqueda binaria O(log n)
- Espacio: O(n) - Array tails

La solución con binary search es más rápida pero más difícil de entender.
En entrevistas, la solución O(n²) es aceptable y más fácil de explicar.

COMPARACIÓN:
- n = 1000: O(n²) = 1M operaciones, O(n log n) = ~10K operaciones
- n = 10000: O(n²) = 100M operaciones, O(n log n) = ~130K operaciones
- Para n pequeño, la diferencia no importa. Para n grande, es crucial.
*/

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. EMPIEZA SIMPLE:
   - Comienza con O(n²) si la aclaras bien
   - La mayoría de entrevistadores aceptan esto
   - Si piden optimización, ENTONCES hablamos de binary search

2. EXPLICA LA RELACIÓN DE RECURRENCIA:
   - dp[i] = 1 + max(dp[j]) donde j < i y nums[j] < nums[i]
   - Es decir: el mejor que termina en i es el mejor que termina antes de i, más 1
   - Claridad es más importante que velocidad

3. CASOS BORDE COMUNES:
   - Array vacío -> return 0
   - Un elemento -> return 1
   - Todos decrecientes -> return 1
   - Todos crecientes -> return n

4. DIFERENCIA ENTRE SUBSECUENCIA Y SUBARRAY:
   - SUBSECUENCIA: [1, 3, 4, 7, 8, 10] puede dar [1, 3, 7, 10] (no contiguo)
   - SUBARRAY: debe ser contiguo
   - Este problema es subsecuencia (mantiene orden pero no adyacencia)

5. CUANDO USAR BINARY SEARCH:
   - Si el problema es de competencia o tienes tiempo ilimitado
   - Requiere entender que tails[i] = elemento más pequeño de LIS de longitud i+1
   - Esta insight es difícil de encontrar en la entrevista

6. SI PREGUNTAN "¿CUÁL ES LA SUBSECUENCIA?":
   - Usa la solución con parent[] array
   - Reconstruye desde el final hacia atrás
   - Prepend (unshift) es importante aquí

7. VARIACIONES POSIBLES:
   - "Non-decreasing" en lugar de "strictly increasing" -> cambias < a <=
   - "Longest decreasing subsequence" -> cambias < a >
   - El patrón es idéntico
*/

runTests();
