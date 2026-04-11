/**
 * PROBLEMA: Temperaturas Diarias (LeetCode #739)
 *
 * DESCRIPCIÓN:
 * Dado un array de enteros que representan temperaturas diarias,
 * retorna un array donde output[i] es el número de días que debes esperar
 * después del día i para tener una temperatura más cálida.
 * Si no hay un día más cálido, output[i] = 0.
 *
 * EJEMPLOS:
 * - Input: [73,74,75,71,69,72,76,73]
 *   Output: [1,1,4,2,1,1,0,0]
 *   Explicación: El día 0 tiene 73, día 1 tiene 74 (más calor) → 1 día
 *
 * - Input: [30,40,50,60]
 *   Output: [1,1,1,0]
 *
 * - Input: [30,60,90]
 *   Output: [1,1,0]
 *
 * COMPLEJIDAD (Pila Monótona):
 * - Tiempo: O(n) - cada elemento se procesa máximo 2 veces
 * - Espacio: O(n) - pila puede contener hasta n elementos
 */


function dailyTemperatures(temperatures) {
  const stack = []
  const result = new Array(temperatures.length).fill(0)

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0) {
      let [item, ind] = stack.pop()
      if (item < temperatures[i]) {
        result[ind] = i - ind
        continue
      }
      stack.push([item, ind])
      break
    }
    stack.push([temperatures[i], i])
  }

  return result
}

/**
 * CASOS DE PRUEBA
 */
function runTests() {
  const testCases = [
    {
      input: [73, 74, 75, 71, 69, 72, 76, 73],
      expected: [1, 1, 4, 2, 1, 1, 0, 0]
    },
    {
      input: [30, 40, 50, 60],
      expected: [1, 1, 1, 0]
    },
    {
      input: [30, 60, 90],
      expected: [1, 1, 0]
    },
    {
      input: [90, 80, 70, 60],
      expected: [0, 0, 0, 0]
    },
    {
      input: [60, 70, 80, 90],
      expected: [1, 1, 1, 0]
    },
    {
      input: [50],
      expected: [0]
    },
    {
      input: [],
      expected: []
    },
    {
      input: [73, 74],
      expected: [1, 0]
    },
    {
      input: [74, 73],
      expected: [0, 0]
    },
    {
      input: [80, 75, 80],
      expected: [0, 1, 0]
    },
    {
      input: [70, 71, 72, 73, 74],
      expected: [1, 1, 1, 1, 0]
    },
    {
      input: [75, 70, 71, 72, 73],
      expected: [0, 1, 1, 1, 0]
    },
    {
      input: [72, 73, 74, 75, 76],
      expected: [1, 1, 1, 1, 0]
    }
  ];

  let passedStack = 0;
  let passedNaive = 0;
  let failed = 0;

  console.log("=== EJECUTANDO PRUEBAS: dailyTemperatures() ===\n");

  testCases.forEach((testCase, index) => {
    const resultStack = dailyTemperatures(testCase.input);
    const resultNaive = dailyTemperaturesNaive(testCase.input);

    const statusStack = JSON.stringify(resultStack) === JSON.stringify(testCase.expected) ? "✓" : "✗";
    const statusNaive = JSON.stringify(resultNaive) === JSON.stringify(testCase.expected) ? "✓" : "✗";

    if (JSON.stringify(resultStack) === JSON.stringify(testCase.expected)) passedStack++;
    if (JSON.stringify(resultNaive) === JSON.stringify(testCase.expected)) passedNaive++;
    if (JSON.stringify(resultStack) !== JSON.stringify(testCase.expected) ||
      JSON.stringify(resultNaive) !== JSON.stringify(testCase.expected)) {
      failed++;
    }

    console.log(`Test ${index + 1}: Stack ${statusStack} | Naive ${statusNaive}`);
    console.log(`  Input: [${testCase.input.join(', ')}]`);
    console.log(`  Expected: [${testCase.expected.join(', ')}]`);
    console.log(`  Stack: [${resultStack.join(', ')}]`);
    console.log(`  Naive: [${resultNaive.join(', ')}]\n`);
  });

  console.log("=== RESUMEN ===");
  console.log(`Stack: ${passedStack}/${testCases.length}`);
  console.log(`Naive: ${passedNaive}/${testCases.length}`);
  console.log(`Fallidas: ${failed}/${testCases.length}`);

  return failed === 0;
}

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * SOLUCIÓN CON PILA MONÓTONA:
 * Tiempo: O(n)
 *   - Cada elemento se agrega a la pila exactamente una vez
 *   - Cada elemento se remueve de la pila como máximo una vez
 *   - Total: 2n operaciones = O(n)
 *
 * Espacio: O(n)
 *   - Pila puede contener hasta n índices
 *   - Array resultado necesita O(n)
 *
 * SOLUCIÓN INGENUA:
 * Tiempo: O(n²)
 *   - Para cada día (n días)
 *   - Buscamos hacia adelante hasta encontrar un día más cálido
 *   - En el peor caso, iteramos n veces
 *
 * Espacio: O(1)
 *   - Solo el array resultado (no contar output)
 */

/**
 * CONSEJOS DE ENTREVISTA
 *
 * 1. PILA MONÓTONA:
 *    - Ideal cuando necesitas encontrar el "próximo elemento mayor/menor"
 *    - Mantén la pila en orden decreciente (o creciente)
 *    - Procesa hacia atrás si necesitas información futura
 *
 * 2. POR QUÉ FUNCIONA:
 *    - Descartamos índices con temperaturas más bajas
 *    - El tope de la pila siempre tiene el próximo día más cálido
 *    - Evitamos búsqueda bruta
 *
 * 3. IMPLEMENTACIÓN CLAVE:
 *    - while (stack && temps[stack.top()] <= temps[i]): pop()
 *    - Esto mantiene la propiedad monótona
 *    - <= (no solo <) porque no necesitamos mismo día
 *
 * 4. VISUALIZACIÓN MENTAL:
 *    Temperaturas: [73, 74, 75, 71, 69, 72, 76, 73]
 *
 *    De derecha a izquierda:
 *    i=7 (73): pila=[], result[7]=0, push 7
 *    i=6 (76): pila=[7], 73<76, result[6]=0, pop 7, push 6
 *    i=5 (72): pila=[6], 72<76, result[5]=1, push 5
 *    ... y así
 *
 * 5. CASOS LÍMITE:
 *    - Array vacío: retorna []
 *    - Array con un elemento: retorna [0]
 *    - Temperaturas decrecientes: todos ceros
 *    - Temperaturas crecientes: diferencias de índices
 *
 * 6. COMPARACIÓN CON ENFOQUE INGENUO:
 *    - Naive: fácil de entender, O(n²), malo en práctica
 *    - Stack: requiere pensamiento, O(n), óptimo
 *    - Entrevistador aprecia pila monótona
 *
 * 7. VARIACIONES POSIBLES:
 *    - "Próximo elemento mayor" → pila decreciente
 *    - "Elemento mayor a la derecha" → pila creciente
 *    - "Próximo más pequeño" → pila creciente
 *    - El patrón es el mismo, solo inviertes la dirección
 *
 * 8. PREGUNTAS DE SEGUIMIENTO:
 *    - "¿Cómo lo harías con dos pasadas sin pila?"
 *      Respuesta: Una pasada izq→der, otra der→izq
 *    - "¿Y si necesitas múltiples próximos días más cálidos?"
 *      Respuesta: Modifica pila para almacenar múltiples índices
 */

// Ejecutar pruebas
const allPassed = runTests();
process.exit(allPassed ? 0 : 1);
