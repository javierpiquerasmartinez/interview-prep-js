/**
 * PROBLEMA: Paréntesis Válidos (LeetCode #20)
 *
 * DESCRIPCIÓN:
 * Dada una cadena de caracteres que contiene solo los caracteres '(', ')', '{', '}', '[' y ']',
 * determina si la cadena es válida.
 *
 * Una cadena es válida si:
 * 1. Cada paréntesis abierto tiene un paréntesis cerrado correspondiente del mismo tipo
 * 2. Los paréntesis se cierran en el orden correcto
 *
 * EJEMPLOS:
 * - Input: "()" -> Output: true
 * - Input: "()[]{}" -> Output: true
 * - Input: "(]" -> Output: false
 * - Input: "([{}])" -> Output: true
 * - Input: "([)]" -> Output: false
 *
 * COMPLEJIDAD:
 * - Tiempo: O(n) - procesamos cada carácter una vez
 * - Espacio: O(n) - en el peor caso, la pila contiene n/2 elementos
 */

/**
 * SOLUCIÓN: Utiliza una pila (stack) para rastrear paréntesis abiertos
 */
function isValid(s) {
  // Mapeo de paréntesis de cierre a apertura
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  const stack = [];

  for (const char of s) {
    // Si es paréntesis de apertura, lo agregamos a la pila
    if (!pairs[char]) {
      stack.push(char);
    } else {
      // Si es paréntesis de cierre, verificamos que coincida con el tope de la pila
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  // La cadena es válida solo si la pila está vacía
  return stack.length === 0;
}

/**
 * CASOS DE PRUEBA
 */
function runTests() {
  const testCases = [
    // Formato: [input, expected]
    ["()", true],
    ["()[]{}", true],
    ["(]", false],
    ["([{}])", true],
    ["([)]", false],
    ["{[]}", true],
    ["", true],
    ["(", false],
    [")", false],
    ["((", false],
    ["))", false],
    ["([", false],
    ["([)]", false],
    ["({[]})", true],
    ["[({})]", true],
    ["[({})]", true],
    ["}]{}", false],
    ["(()){}[]", true],
    ["(())[]{}", true],
    ["([{}])", true]
  ];

  let passed = 0;
  let failed = 0;

  console.log("=== EJECUTANDO PRUEBAS: isValid() ===\n");

  testCases.forEach(([input, expected], index) => {
    const result = isValid(input);
    const status = result === expected ? "✓ PASS" : "✗ FAIL";

    if (result === expected) {
      passed++;
    } else {
      failed++;
    }

    console.log(`Test ${index + 1}: ${status}`);
    console.log(`  Input: "${input}"`);
    console.log(`  Expected: ${expected}, Got: ${result}\n`);
  });

  console.log("=== RESUMEN ===");
  console.log(`Pasadas: ${passed}/${testCases.length}`);
  console.log(`Fallidas: ${failed}/${testCases.length}`);

  return failed === 0;
}

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * Tiempo: O(n)
 *   - Iteramos cada carácter exactamente una vez
 *   - Cada operación de push/pop en la pila es O(1)
 *
 * Espacio: O(n)
 *   - En el peor caso (todos paréntesis abiertos), la pila crece hasta n
 *   - Ejemplo: "(((((" requiere espacio O(n)
 */

/**
 * CONSEJOS DE ENTREVISTA
 *
 * 1. ENFOQUE CON PILA:
 *    - La pila es ideal para problemas de paréntesis/brackets
 *    - Cuando ves "{[" necesitas saber qué se abrió primero → pila
 *
 * 2. MAPEO DE PARES:
 *    - En lugar de múltiples if/else, usa un objeto para mapear pares
 *    - `pairs[')']` te da directamente el paréntesis de apertura esperado
 *
 * 3. CASOS LÍMITE:
 *    - Cadena vacía: debe retornar true (válida por defecto)
 *    - Paréntesis no balanceados: un carácter de cierre sin apertura
 *    - Orden incorrecto: "([)]" tiene todos los pares pero orden inválido
 *
 * 4. VERIFICACIÓN FINAL:
 *    - No olvides verificar que la pila esté vacía al final
 *    - Si quedan paréntesis abiertos, la cadena no es válida
 *
 * 5. OPTIMIZACIÓN:
 *    - Puedes retornar false inmediatamente si intentas cerrar sin apertura
 *    - Esto te permite salir temprano sin procesar el resto de la cadena
 *
 * 6. PREGUNTA DE SEGUIMIENTO:
 *    - "¿Qué pasaría si también incluimos tipos de paréntesis adicionales?"
 *    - Respuesta: El algoritmo se generaliza fácilmente, solo actualiza el mapeo
 */

// Ejecutar pruebas
const allPassed = runTests();
process.exit(allPassed ? 0 : 1);
