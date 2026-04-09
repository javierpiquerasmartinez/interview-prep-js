/*
 * LeetCode #46: Permutations
 *
 * DESCRIPCIÓN EN ESPAÑOL:
 * Dado un arreglo de números enteros únicos, devuelve todas las permutaciones posibles.
 *
 * Ejemplo:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * ENFOQUE: Backtracking
 * En cada nivel de recursión, elegimos un elemento no utilizado y lo añadimos
 * a la permutación actual. Luego exploramos todas las permutaciones con ese elemento.
 *
 * COMPLEJIDAD:
 * Tiempo: O(n! * n) - n! permutaciones, cada una copia en O(n)
 * Espacio: O(n) - Profundidad de la pila de recursión
 */

class PermutationsBacktracking {
  /**
   * Genera todas las permutaciones usando backtracking.
   * @param {number[]} nums - Arreglo de números únicos
   * @return {number[][]} - Todas las permutaciones posibles
   */
  solve(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = (currentPermutation) => {
      // Caso base: hemos usado todos los elementos
      if (currentPermutation.length === nums.length) {
        result.push([...currentPermutation]);
        return;
      }

      // Exploramos cada elemento no utilizado
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) continue; // Salta si ya está usado

        // Opción: Incluir nums[i] en la permutación actual
        used[i] = true;
        currentPermutation.push(nums[i]);

        // Recursión
        backtrack(currentPermutation);

        // Backtrack: deshacer cambios
        currentPermutation.pop();
        used[i] = false;
      }
    };

    backtrack([]);
    return result;
  }

  /**
   * Solución alternativa usando intercambio (swap).
   * @param {number[]} nums - Arreglo de números únicos
   * @return {number[][]} - Todas las permutaciones posibles
   */
  solveSwap(nums) {
    const result = [];

    const backtrack = (array, start) => {
      // Caso base: hemos alcanzado el final del arreglo
      if (start === array.length - 1) {
        result.push([...array]);
        return;
      }

      // Intercambiamos el elemento en posición 'start' con otros elementos
      for (let i = start; i < array.length; i++) {
        // Intercambio
        [array[start], array[i]] = [array[i], array[start]];

        // Recursión
        backtrack(array, start + 1);

        // Backtrack: deshacer intercambio
        [array[start], array[i]] = [array[i], array[start]];
      }
    };

    backtrack([...nums], 0);
    return result;
  }

  /**
   * Cuenta el número de permutaciones sin generarlas todas.
   * @param {number} n - Tamaño del arreglo
   * @return {number} - Factorial de n
   */
  countPermutations(n) {
    if (n <= 1) return 1;
    return n * this.countPermutations(n - 1);
  }
}

// ============================================================================
// PRUEBAS Y VALIDACIÓN
// ============================================================================

class PermutationsTest {
  static assert(condition, message) {
    if (!condition) {
      throw new Error(`ASSERTION FAILED: ${message}`);
    }
  }

  static deepEqual(actual, expected, message) {
    const actualStr = JSON.stringify(actual.sort());
    const expectedStr = JSON.stringify(expected.sort());
    this.assert(actualStr === expectedStr, message);
  }

  static run() {
    const solver = new PermutationsBacktracking();

    console.log('Ejecutando pruebas para Permutations...\n');

    // Prueba 1: Arreglo [1,2,3]
    console.log('Test 1: nums = [1,2,3]');
    const result1 = solver.solve([1, 2, 3]);
    this.assert(result1.length === 6, 'Debería haber 6 permutaciones (3!)');
    console.log(`✓ Cantidad de permutaciones: ${result1.length}`);
    console.log(`  Primeras 3: ${JSON.stringify(result1.slice(0, 3))}\n`);

    // Prueba 2: Un solo elemento
    console.log('Test 2: nums = [1]');
    const result2 = solver.solve([1]);
    this.deepEqual(result2, [[1]], 'Un elemento debe tener 1 permutación');
    console.log(`✓ Resultado: ${JSON.stringify(result2)}\n`);

    // Prueba 3: Dos elementos
    console.log('Test 3: nums = [1,2]');
    const result3 = solver.solve([1, 2]);
    this.assert(result3.length === 2, 'Dos elementos deben tener 2 permutaciones');
    console.log(`✓ Permutaciones: ${JSON.stringify(result3)}\n`);

    // Prueba 4: Verificar que todas son únicas
    console.log('Test 4: Verificar unicidad');
    const uniqueCheck = new Set(result1.map(JSON.stringify));
    this.assert(uniqueCheck.size === result1.length, 'Todas deben ser únicas');
    console.log(`✓ Todas las ${result1.length} permutaciones son únicas\n`);

    // Prueba 5: Solución con swap
    console.log('Test 5: nums = [1,2,3] (Solución Swap)');
    const result5 = solver.solveSwap([1, 2, 3]);
    this.assert(result5.length === 6, 'Solución swap debe generar 6 permutaciones');
    this.deepEqual(result5, result1, 'Ambas soluciones deben dar igual resultado');
    console.log(`✓ Solución swap genera ${result5.length} permutaciones correctas\n`);

    // Prueba 6: Contar permutaciones
    console.log('Test 6: Contar permutaciones');
    const count4 = solver.countPermutations(4);
    this.assert(count4 === 24, '4! debe ser 24');
    console.log(`✓ 4! = ${count4}`);
    console.log(`✓ 5! = ${solver.countPermutations(5)}`);
    console.log(`✓ 6! = ${solver.countPermutations(6)}\n`);

    // Prueba 7: Cuatro elementos
    console.log('Test 7: nums = [1,2,3,4]');
    const result7 = solver.solve([1, 2, 3, 4]);
    this.assert(result7.length === 24, 'Cuatro elementos deben tener 24 permutaciones (4!)');
    console.log(`✓ Cantidad de permutaciones: ${result7.length}\n`);

    console.log('════════════════════════════════════════════');
    console.log('TODAS LAS PRUEBAS PASARON ✓');
    console.log('════════════════════════════════════════════\n');
  }
}

// ============================================================================
// ANÁLISIS DE COMPLEJIDAD Y CONSEJOS DE ENTREVISTA
// ============================================================================

const COMPLEXITY_ANALYSIS = `
ANÁLISIS DE COMPLEJIDAD:

Solución Backtracking (con bandera used):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tiempo: O(n! * n)
  - Hay n! permutaciones posibles
  - Para cada permutación, copiamos el arreglo: O(n)
  - Total: O(n! * n)

Espacio: O(n)
  - Profundidad máxima de recursión: n
  - Array 'used' de tamaño n
  - No contamos el espacio de output

Solución Swap:
━━━━━━━━━━━━━
Tiempo: O(n! * n)
  - Mismo análisis que la solución anterior
  - Intercambios en lugar de array 'used'

Espacio: O(n)
  - Profundidad de recursión: n
  - O(1) espacio adicional además de la copia inicial

COMPARACIÓN:

┌─────────────────┬──────────────────┬──────────────────┐
│ Aspecto         │ Solución Used    │ Solución Swap    │
├─────────────────┼──────────────────┼──────────────────┤
│ Claridad        │ Muy clara        │ Menos intuitiva  │
│ Espacio extra   │ Array bool [n]   │ Mínimo extra     │
│ Rendimiento     │ Bueno            │ Ligeramente mejor│
│ Implementación  │ Sencilla         │ Más cuidado      │
└─────────────────┴──────────────────┴──────────────────┘

CONSEJOS PARA LA ENTREVISTA:

1. ENTENDER EL PROBLEMA:
   ✓ Clarifica qué es una permutación (orden importa)
   ✓ ¿Todos los elementos deben usarse? (Sí)
   ✓ ¿Pueden haber duplicados? (Generalmente no, pero pregunta)
   ✓ Menciona que n! crece muy rápido

2. VISUALIZAR:
   ✓ Dibuja árbol de decisiones para [1,2,3]
   ✓ Muestra cómo se construye cada permutación
   ✓ Explica qué significa "backtrack"

3. ENFOQUES:
   ✓ Backtracking con bandera: Fácil de entender
   ✓ Swap: Más elegante, menos memoria extra
   ✓ Iterativo (heap's algorithm): Alternativa avanzada

4. OPTIMIZACIONES:
   ✓ Para n > 8, advierte sobre tiempo exponencial
   ✓ Si necesitas solo contar: usa factorial
   ✓ Considera early termination si se requiere

5. PREGUNTAS DE SEGUIMIENTO:
   - ¿Qué pasa si hay elementos duplicados?
   - ¿Cómo generarías solo permutaciones de longitud k?
   - ¿Puedes generar la siguiente permutación lexicográficamente?
   - ¿Cuál es la complejidad si no necesitas copiar?

CASOS DE USO EN LA INDUSTRIA:
- Análisis combinatorio
- Testing exhaustivo de todas las combinaciones
- Algoritmos de optimización (busca en todos los órdenes)
- Problema del viajante (TSP)
- Generación de tokens/contraseñas
`;

console.log(COMPLEXITY_ANALYSIS);

// ============================================================================
// EJECUCIÓN
// ============================================================================

PermutationsTest.run();
