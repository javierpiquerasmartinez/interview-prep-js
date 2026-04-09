// ============================================
// PROBLEMA: Longest Substring Without Repeating Characters (LeetCode #3 - Medium)
// ============================================
// Dado un string 's', encuentra la longitud de la SUBSTRING MÁS LARGA
// que no contiene caracteres repetidos.
//
// Substring: una secuencia contigua de caracteres dentro de la string
// (no necesariamente una secuencia lexicográfica)
//
// Ejemplo:
//   Input: s = "abcabcbb"
//   Output: 3
//   Explicación: La substring más larga sin repetir caracteres es "abc"
//   que tiene una longitud de 3
//
// Más ejemplos:
//   Input: s = "bbbbb" → Output: 1 (solo "b")
//   Input: s = "pwwkew" → Output: 3 ("wke")
//
// Complejidad objetivo: Tiempo O(n), Espacio O(min(m, n))
// Patrón: Sliding Window
// m = tamaño del charset, n = longitud del string
// ============================================

function lengthOfLongestSubstring(s) {
  // Mapa para almacenar el último índice visto de cada carácter
  const charIndexMap = new Map();
  let maxLength = 0;
  let left = 0; // Inicio de la ventana

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Si el carácter ya existe en la ventana actual
    if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
      // Movemos el inicio de la ventana después del carácter duplicado anterior
      left = charIndexMap.get(char) + 1;
    }

    // Actualizamos el índice del carácter actual
    charIndexMap.set(char, right);

    // Calculamos la longitud de la ventana actual
    const currentLength = right - left + 1;

    // Actualizamos la longitud máxima
    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
}

// ============================================
// ALTERNATIVE: Using Set (simpler, similar complexity)
// ============================================
// function lengthOfLongestSubstring(s) {
//   const charSet = new Set();
//   let maxLength = 0;
//   let left = 0;
//
//   for (let right = 0; right < s.length; right++) {
//     // Mientras el carácter existe en el set, elimina del inicio
//     while (charSet.has(s[right])) {
//       charSet.delete(s[left]);
//       left++;
//     }
//
//     // Agrega el carácter actual
//     charSet.add(s[right]);
//
//     // Actualiza el máximo
//     maxLength = Math.max(maxLength, right - left + 1);
//   }
//
//   return maxLength;
// }

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\nLongest Substring Without Repeating Characters Tests:');

  // Test 1: Ejemplo del problema
  let result = lengthOfLongestSubstring('abcabcbb');
  assert(result === 3, 'Ejemplo: "abcabcbb" → 3 (substring "abc")');

  // Test 2: Todo repetido
  result = lengthOfLongestSubstring('bbbbb');
  assert(result === 1, 'Todo repetido: "bbbbb" → 1');

  // Test 3: Ejemplo con mezcla
  result = lengthOfLongestSubstring('pwwkew');
  assert(result === 3, 'Mezcla: "pwwkew" → 3 (substring "wke")');

  // Test 4: String vacío
  result = lengthOfLongestSubstring('');
  assert(result === 0, 'Vacío: "" → 0');

  // Test 5: Un carácter
  result = lengthOfLongestSubstring('a');
  assert(result === 1, 'Un carácter: "a" → 1');

  // Test 6: Todos únicos
  result = lengthOfLongestSubstring('abcdefghij');
  assert(result === 10, 'Todos únicos: "abcdefghij" → 10');

  // Test 7: Repetición al final
  result = lengthOfLongestSubstring('au');
  assert(result === 2, 'Dos únicos: "au" → 2');

  // Test 8: Caracteres especiales
  result = lengthOfLongestSubstring('!@#$%^&*()!');
  assert(result === 10, 'Especiales: "!@#$%^&*()!" → 10 (sin el último !)');

  // Test 9: Espacios y números
  result = lengthOfLongestSubstring('a1b2c3a');
  assert(result === 6, 'Números: "a1b2c3a" → 6 (substring "a1b2c3" antes del duplicado)');

  // Test 10: Patrón largo sin repetición al inicio
  result = lengthOfLongestSubstring('dvdf');
  assert(result === 3, 'Patrón: "dvdf" → 3 (substring "vdf")');

  // Test 11: Unicode (caracteres especiales)
  result = lengthOfLongestSubstring('aab');
  assert(result === 2, 'Con repetición: "aab" → 2 (substring "ab")');

  // Test 12: Verificar ventana correcta
  result = lengthOfLongestSubstring('abcdefabcbb');
  assert(result === 6, 'Ventana: "abcdefabcbb" → 6 (substring "abcdef")');

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
// Tiempo: O(n)
//   - right pointer itera de 0 a n-1: O(n)
//   - left pointer solo se mueve hacia adelante (nunca hacia atrás): O(n) total
//   - Operaciones en Map: O(1) por iteración
//   - Total: O(n)
//
// Espacio: O(min(m, n))
//   - m = tamaño del charset (alfabeto: 26 letras, ASCII: 128, Unicode: mayor)
//   - n = longitud del string
//   - Map almacena máximo m caracteres únicos
//   - En el peor caso: O(min(m, n))
//
// Alternativa Set-based:
//   - Tiempo: O(n) en promedio, pero puede ser O(n²) en peor caso
//     si cada carácter requiere eliminar muchos elementos del set
//   - Espacio: O(min(m, n))
// ============================================

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. SLIDING WINDOW PATTERN:
//    Este es el patrón clásico para problemas de "substring/subarray".
//    Dos pointers (left, right) que avanzan en direcciones controladas.
//
// 2. CUÁNDO CONTRAER LA VENTANA:
//    Cuando encontramos un carácter duplicado, movemos left
//    hasta después de la ocurrencia anterior del carácter.
//    Esto es crucial para no perder la solución.
//
// 3. MAP vs SET:
//    - Map: Almacena índice, permite movimiento inteligente de left
//    - Set: Más simple, pero requiere bucle para eliminar duplicados
//    Ambos son válidos, explica la diferencia.
//
// 4. CONDICIÓN IMPORTANTE:
//    "charIndexMap.get(char) >= left"
//    Solo movemos left si el duplicado está en la ventana ACTUAL.
//    Si el duplicado es anterior a left, ignoramos (fue contraído ya).
//
// 5. INVARIANTE DEL ALGORITMO:
//    En cada punto, la ventana [left, right] NO contiene duplicados.
//    Esta invariante se mantiene porque movemos left correctamente.
//
// 6. OPTIMIZACIÓN PARA DIFERENTES CHARSETS:
//    - Si sabes el charset es ASCII (128 caracteres), usa array[128]
//    - Si es solo letras minúsculas, usa array[26]
//    - Para Unicode, usa Map
//
// 7. CASOS LÍMITE:
//    - String vacío → 0
//    - Un carácter → 1
//    - Todo duplicado → 1
//    - Todos únicos → longitud del string
//    - Repetición al inicio vs al final
//
// 8. FOLLOW-UPS:
//    ¿Cuál es la substring más larga? (retorna string, no longitud)
//    ¿Con máximo K caracteres únicos? (variante)
//    ¿Con exactamente K caracteres únicos? (variante más difícil)
//
// 9. EXPLICACIÓN CLARA:
//    "Mantengo una ventana de caracteres sin duplicados.
//    Expando con right. Cuando encuentro duplicado,
//    contraigo con left hasta que el duplicado salga de la ventana."
// ============================================
