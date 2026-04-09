/*
 * LeetCode #78: Subsets
 *
 * DESCRIPCIÓN EN ESPAÑOL:
 * Dado un arreglo de números enteros donde todos los elementos son únicos,
 * devuelve todos los subconjuntos posibles (el conjunto potencia).
 *
 * Ejemplo:
 * Input: nums = [1,2,3]
 * Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 *
 * ENFOQUE: Backtracking
 * Para cada elemento, decidimos incluirlo o no incluirlo en el subconjunto actual.
 * Exploramos ambas opciones recursivamente.
 *
 * COMPLEJIDAD:
 * Tiempo: O(2^n) - Hay 2^n subconjuntos posibles
 * Espacio: O(n) - Profundidad de la pila de recursión (sin contar output)
 */

class SubsetsBacktracking {
  /**
   * Genera todos los subconjuntos usando backtracking.
   * @param {number[]} nums - Arreglo de números únicos
   * @return {number[][]} - Todos los subconjuntos posibles
   */
  solve(nums) {
    const result = [];

    const backtrack = (index, currentSubset) => {
      // Caso base: hemos procesado todos los elementos
      if (index === nums.length) {
        // Añadimos una copia del subconjunto actual al resultado
        result.push([...currentSubset]);
        return;
      }

      // Opción 1: Incluir el elemento actual
      currentSubset.push(nums[index]);
      backtrack(index + 1, currentSubset);

      // Opción 2: No incluir el elemento actual (backtrack)
      currentSubset.pop();
      backtrack(index + 1, currentSubset);
    };

    backtrack(0, []);
    return result;
  }

  /**
   * Solución alternativa usando iteración.
   * @param {number[]} nums - Arreglo de números únicos
   * @return {number[][]} - Todos los subconjuntos posibles
   */
  solveIterative(nums) {
    const result = [[]];

    for (const num of nums) {
      // Para cada elemento, duplicamos los subconjuntos existentes
      // y añadimos el elemento actual a cada copia
      const newSubsets = result.map(subset => [...subset, num]);
      result.push(...newSubsets);
    }

    return result;
  }
}

// ============================================================================
// PRUEBAS Y VALIDACIÓN
// ============================================================================

class SubsetsTest {
  static assert(condition, message) {
    if (!condition) {
      throw new Error(`ASSERTION FAILED: ${message}`);
    }
  }

  static deepEqual(actual, expected, message) {
    const actualStr = JSON.stringify(actual.map(s => [...s].sort((a, b) => a - b)).sort());
    const expectedStr = JSON.stringify(expected.map(s => [...s].sort((a, b) => a - b)).sort());
    this.assert(actualStr === expectedStr, message);
  }

  static run() {
    const solver = new SubsetsBacktracking();

    console.log('Ejecutando pruebas para Subsets...\n');

    // Prueba 1: Arreglo simple [1,2,3]
    console.log('Test 1: nums = [1,2,3]');
    const result1 = solver.solve([1, 2, 3]);
    this.assert(result1.length === 8, 'Debería haber 8 subconjuntos (2^3)');
    console.log(`✓ Resultado: ${JSON.stringify(result1)}`);
    console.log(`  Cantidad: ${result1.length} subconjuntos\n`);

    // Prueba 2: Arreglo vacío
    console.log('Test 2: nums = []');
    const result2 = solver.solve([]);
    this.deepEqual(result2, [[]], 'Arreglo vacío debe devolver [[]]');
    console.log(`✓ Resultado: ${JSON.stringify(result2)}\n`);

    // Prueba 3: Un solo elemento
    console.log('Test 3: nums = [1]');
    const result3 = solver.solve([1]);
    this.assert(result3.length === 2, 'Un elemento debe tener 2 subconjuntos');
    console.log(`✓ Resultado: ${JSON.stringify(result3)}`);
    console.log(`  Subconjuntos: [], [1]\n`);

    // Prueba 4: Dos elementos
    console.log('Test 4: nums = [0,1]');
    const result4 = solver.solve([0, 1]);
    this.assert(result4.length === 4, 'Dos elementos deben tener 4 subconjuntos');
    console.log(`✓ Resultado: ${JSON.stringify(result4)}\n`);

    // Prueba 5: Solución iterativa
    console.log('Test 5: nums = [1,2,3] (Solución Iterativa)');
    const result5 = solver.solveIterative([1, 2, 3]);
    this.assert(result5.length === 8, 'Versión iterativa debe generar 8 subconjuntos');
    this.deepEqual(result5, result1, 'Backtracking e iterativo deben dar igual resultado');
    console.log(`✓ Resultado iterativo: ${JSON.stringify(result5)}\n`);

    // Prueba 6: Arreglo más grande
    console.log('Test 6: nums = [1,2,3,4]');
    const result6 = solver.solve([1, 2, 3, 4]);
    this.assert(result6.length === 16, 'Cuatro elementos deben tener 16 subconjuntos');
    console.log(`✓ Cantidad de subconjuntos: ${result6.length}\n`);

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

Solución Backtracking:
━━━━━━━━━━━━━━━━━━━━━
Tiempo: O(2^n)
  - Hay 2^n subconjuntos posibles
  - Para cada subconjunto, copiamos elementos: O(n) en promedio
  - Total: O(n * 2^n)

Espacio: O(n)
  - Profundidad máxima de recursión: n
  - No contamos el espacio de output

Solución Iterativa:
━━━━━━━━━━━━━━━━━━
Tiempo: O(n * 2^n)
  - Iteramos n veces
  - En cada iteración duplicamos los subconjuntos existentes
  - Copiar cada subconjunto: O(2^i) donde i es la iteración actual

Espacio: O(1)
  - No usa pila de recursión (sin contar output)

CONSEJOS PARA LA ENTREVISTA:

1. ENTENDER EL PROBLEMA:
   ✓ Clarifica qué es un subconjunto (incluye conjunto vacío)
   ✓ ¿El orden importa en los subconjuntos? (No)
   ✓ Pregunta sobre el tamaño máximo de entrada

2. VISUALIZAR:
   ✓ Dibuja el árbol de recursión para [1,2,3]
   ✓ Muestra cómo se construyen los subconjuntos paso a paso
   ✓ Explica las decisiones en cada nivel (incluir/no incluir)

3. ENFOQUES:
   ✓ Backtracking: Naturalidad intuitiva, fácil de entender
   ✓ Iterativo: Más eficiente en espacio, sin overhead de recursión
   ✓ Bit manipulation: Considera mencionar como alternativa

4. OPTIMIZACIONES:
   ✓ Usa spread operator ([...arr]) para copias eficientes
   ✓ Considera usar referencias si se requiere memoria mínima
   ✓ Para grandes n, advierte sobre tiempo exponencial

5. PREGUNTAS DE SEGUIMIENTO:
   - ¿Qué pasa si los elementos pueden repetirse?
   - ¿Cómo generarías subconjuntos de tamaño exacto k?
   - ¿Puedes hacerlo sin crear copias intermedias?

CASOS DE USO EN LA INDUSTRIA:
- Combinatoria y análisis de combinaciones
- Problemas de configuración y selección
- Machine Learning: feature selection
- Testing: generación de casos de prueba (todos los escenarios)
`;

console.log(COMPLEXITY_ANALYSIS);

// ============================================================================
// EJECUCIÓN
// ============================================================================

SubsetsTest.run();
