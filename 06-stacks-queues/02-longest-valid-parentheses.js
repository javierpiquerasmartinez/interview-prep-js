/**
 * PROBLEMA: Paréntesis Válidos Más Largos (LeetCode #32 - DIFÍCIL)
 *
 * DESCRIPCIÓN:
 * Dada una cadena que contiene solo '(' y ')', encuentra la longitud de la subcadena
 * válida más larga de paréntesis.
 *
 * EJEMPLOS:
 * - Input: "(()" -> Output: 2 (subcadena: "()")
 * - Input: ")()())" -> Output: 4 (subcadena: "()()")
 * - Input: "" -> Output: 0
 * - Input: "(" -> Output: 0
 * - Input: "(())" -> Output: 4
 * - Input: "()(())" -> Output: 6
 *
 * COMPLEJIDAD (Solución con Stack):
 * - Tiempo: O(n) - un solo recorrido de la cadena
 * - Espacio: O(n) - la pila puede contener hasta n elementos
 *
 * NOTA: También existe solución DP con O(n) espacio, pero stack es más elegante
 */

/**
 * SOLUCIÓN 1: Usando una Pila (Stack) - RECOMENDADO
 *
 * Estrategia:
 * - Usar pila para rastrear índices
 * - Mantener un índice de inicio válido
 * - Calcular longitud entre índices válidos
 */
function longestValidParentheses(s) {
  let maxLen = 0;
  const stack = [-1]; // Iniciar con -1 como base

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      // Para '(' agregamos el índice a la pila
      stack.push(i);
    } else {
      // Para ')' removemos el elemento anterior
      stack.pop();

      if (stack.length === 0) {
        // Si pila está vacía, este ')' es inválido
        // Lo usamos como nueva base
        stack.push(i);
      } else {
        // Calculamos longitud desde el índice en el tope de la pila
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}

/**
 * SOLUCIÓN 2: Usando Programación Dinámica (DP) - ALTERNATIVA
 *
 * dp[i] = longitud de la subcadena válida que termina en índice i
 */
function longestValidParenthesesDP(s) {
  if (s.length < 2) return 0;

  const dp = new Array(s.length).fill(0);
  let maxLen = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        // Caso: "....()"
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (dp[i - 1] > 0) {
        // Caso: "....)))" donde hay un válido antes
        const j = i - dp[i - 1] - 1;
        if (j >= 0 && s[j] === '(') {
          dp[i] = dp[i - 1] + 2 + (j > 0 ? dp[j - 1] : 0);
        }
      }
      maxLen = Math.max(maxLen, dp[i]);
    }
  }

  return maxLen;
}

/**
 * CASOS DE PRUEBA
 */
function runTests() {
  const testCases = [
    ["(()", 2],
    [")()())", 4],
    ["", 0],
    ["(", 0],
    [")", 0],
    ["(())", 4],
    ["()(())", 6],
    ["()(()", 2],
    ["()()", 4],
    ["()())", 4],
    ["(()())", 6],
    [")())()()", 4],
    ["(())()", 6],
    ["()()", 4],
    ["(()()", 4],
    ["())", 2],
    ["(", 0],
    [")", 0],
    ["(()()())", 8]
  ];

  let passedStack = 0;
  let passedDP = 0;
  let failed = 0;

  console.log("=== EJECUTANDO PRUEBAS: longestValidParentheses() ===\n");

  testCases.forEach(([input, expected], index) => {
    const resultStack = longestValidParentheses(input);
    const resultDP = longestValidParenthesesDP(input);

    const statusStack = resultStack === expected ? "✓" : "✗";
    const statusDP = resultDP === expected ? "✓" : "✗";

    if (resultStack === expected) passedStack++;
    if (resultDP === expected) passedDP++;
    if (resultStack !== expected || resultDP !== expected) failed++;

    console.log(`Test ${index + 1}: Stack ${statusStack} | DP ${statusDP}`);
    console.log(`  Input: "${input}"`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Stack: ${resultStack}, DP: ${resultDP}\n`);
  });

  console.log("=== RESUMEN ===");
  console.log(`Stack: ${passedStack}/${testCases.length}`);
  console.log(`DP: ${passedDP}/${testCases.length}`);
  console.log(`Fallidas: ${failed}/${testCases.length}`);

  return failed === 0;
}

/**
 * ANÁLISIS DE COMPLEJIDAD
 *
 * SOLUCIÓN STACK:
 * Tiempo: O(n)
 *   - Iteramos cada carácter exactamente una vez
 *   - Operaciones de push/pop son O(1)
 *
 * Espacio: O(n)
 *   - Pila puede contener hasta n índices en el peor caso
 *
 * SOLUCIÓN DP:
 * Tiempo: O(n)
 *   - Un solo recorrido del array
 *
 * Espacio: O(n)
 *   - Array dp de tamaño n
 */

/**
 * CONSEJOS DE ENTREVISTA
 *
 * 1. ENTENDER EL PROBLEMA:
 *    - No se pide validar la cadena completa
 *    - Se pide encontrar la SUBCADENA VÁLIDA MÁS LARGA
 *    - ")()())" es inválida en general, pero contiene "()()" válida
 *
 * 2. ENFOQUE CON STACK:
 *    - Usa índices en lugar de caracteres
 *    - Mantén una "base" con índice -1 para referencias
 *    - Cuando ves ')', calcula longitud desde el nuevo tope
 *
 * 3. ENFOQUE CON DP:
 *    - dp[i] = longitud válida que TERMINA en i
 *    - Solo actualizamos cuando vemos ')'
 *    - Necesitamos verificar si hay '(' correspondiente
 *
 * 4. CASOS LÍMITE IMPORTANTES:
 *    - Cadena vacía: retorna 0
 *    - Un solo paréntesis: retorna 0
 *    - Paréntesis al inicio que no cierren: se ignoran
 *    - ")))(((" retorna 0 (nada válido)
 *
 * 5. DIFERENCIA CLAVE CON VALIDACIÓN:
 *    - En validación, toda la cadena debe ser válida
 *    - Aquí, encontramos la parte válida más larga
 *    - ")(" es inválida pero retorna 0, no error
 *
 * 6. OPTIMIZACIÓN Y TRADE-OFFS:
 *    - Stack: más fácil de entender, espacialmente óptimo respecto a DP
 *    - DP: más intuitivo si ya usaste DP antes
 *    - Ambos son O(n) tiempo y espacio
 *
 * 7. PREGUNTAS DE SEGUIMIENTO:
 *    - "¿Puedes hacerlo sin espacio extra?" Respuesta: Sí, con dos pasadas
 *    - "¿Necesitas el índice de inicio?" Respuesta: Sí, modifica para rastrearlo
 */

// Ejecutar pruebas
const allPassed = runTests();
process.exit(allPassed ? 0 : 1);
