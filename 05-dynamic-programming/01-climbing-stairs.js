// ============================================
// PROBLEMA: Climbing Stairs (LeetCode #70 - Easy)
// ============================================
// Estás subiendo una escalera. Toma n pasos para llegar a la cima.
// Cada vez que subes, puedes dar 1 o 2 pasos. De cuántas formas distintas
// puedes subir hasta la cima?
//
// Ejemplo: n=3 -> 3 formas
//   1+1+1, 1+2, 2+1
//
// Complejidad objetivo: Tiempo O(n), Espacio O(1)
// Patrón: Dynamic Programming - Tabulación (Space Optimization)
// ============================================

/**
 * Solución: DP Tabulación con Optimización de Espacio
 *
 * Relación de recurrencia: dp[i] = dp[i-1] + dp[i-2]
 * - Para llegar al escalón i, puedo venir del i-1 (1 paso) o i-2 (2 pasos)
 *
 * En lugar de un array, mantenemos solo dos variables:
 * - prev1: formas de llegar al paso anterior (i-1)
 * - prev2: formas de llegar a dos pasos antes (i-2)
 *
 * Esto es similar a calcular la serie Fibonacci
 */
function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  let prev2 = 1; // f(1)
  let prev1 = 2; // f(2)

  // Iteramos desde el escalón 3 hasta n
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

/**
 * Solución alternativa: DP con Array (más legible)
 * Complejidad: Tiempo O(n), Espacio O(n)
 */
function climbStairsWithArray(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  const dp = [0, 1, 2];

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// ============================================
// TESTS
// ============================================
function runTests() {
  console.log("🧪 Ejecutando tests para Climbing Stairs...\n");

  const testCases = [
    { input: 1, expected: 1, description: "Un escalón -> 1 forma" },
    { input: 2, expected: 2, description: "Dos escalones -> 2 formas (1+1, 2)" },
    { input: 3, expected: 3, description: "Tres escalones -> 3 formas" },
    { input: 4, expected: 5, description: "Cuatro escalones -> 5 formas" },
    { input: 5, expected: 8, description: "Cinco escalones -> 8 formas" },
    { input: 10, expected: 89, description: "Diez escalones -> 89 formas" },
    { input: 45, expected: 1836311903, description: "45 escalones -> gran número" },
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach(({ input, expected, description }) => {
    const result = climbStairs(input);
    const resultArray = climbStairsWithArray(input);

    if (result === expected && resultArray === expected) {
      console.log(`✅ PASS: ${description}`);
      console.log(`   Input: ${input}, Expected: ${expected}, Got: ${result}\n`);
      passed++;
    } else {
      console.log(`❌ FAIL: ${description}`);
      console.log(`   Input: ${input}, Expected: ${expected}, Got: ${result}\n`);
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
VERSIÓN CON OPTIMIZACIÓN DE ESPACIO (climbStairs):
- Tiempo: O(n) - Iteramos una vez desde 3 hasta n
- Espacio: O(1) - Solo usamos dos variables

VERSIÓN CON ARRAY (climbStairsWithArray):
- Tiempo: O(n) - Iteramos una vez
- Espacio: O(n) - Array de tamaño n

COMPARACIÓN CON RECURSIÓN PURA:
- Recursión sin memoización: O(2^n) - Explosión exponencial
- DP es mucho más eficiente
*/

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. RECONOCE LA ESTRUCTURA:
   - Si la solución se puede dividir en subproblemas, piensa en DP
   - Este problema es similar a Fibonacci

2. RELACIÓN DE RECURRENCIA:
   - Identifica cómo construir dp[i] desde soluciones anteriores
   - Aquí: dp[i] = dp[i-1] + dp[i-2]

3. OPTIMIZACIÓN DE ESPACIO:
   - No siempre necesitas guardar todos los valores anteriores
   - Solo necesitas los últimos 2 valores para este problema
   - Esto reduce O(n) espacio a O(1)

4. CASOS BASE:
   - Siempre especifica claramente los casos base (n=1, n=2)
   - Sin ellos, el algoritmo falla

5. VARIACIONES POSIBLES:
   - ¿Qué pasa si puedes dar 1, 2 o 3 pasos?
   - Simplemente suma dp[i-1] + dp[i-2] + dp[i-3]
   - El patrón es el mismo

6. PRUEBAS:
   - Siempre prueba con valores pequeños primero (n=1,2,3)
   - Luego valores medianos y grandes
   - Verifica que tus números coincidan con Fibonacci si aplica
*/

runTests();
