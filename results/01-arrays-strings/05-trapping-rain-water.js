// ============================================
// PROBLEMA: Trapping Rain Water (LeetCode #42 - Hard)
// ============================================
// Dado un array 'height' que representa un mapa de elevación,
// calcula cuánta agua de lluvia puede ser atrapada después de llover.
//
// El agua puede ser atrapada entre dos barras si:
// - Hay una barra más alta a la izquierda
// - Hay una barra más alta a la derecha
// - El agua llena hasta el nivel del mínimo de esas dos barras
//
// Ejemplo:
//   Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
//   Output: 6
//   Visualización:
//       |
//       | |
//   | | | | | | |
//   |_|_|_|_|_|_|
//   ^^^^^^ ^^
//   Agua atrapada en posiciones 2 (4 unidades) y 5 (2 unidades) = 6
//
// Complejidad objetivo: Tiempo O(n), Espacio O(1)
// Patrón: Dos Pointers con Pre-cálculo de máximos
// ============================================

function trap(height) {
  if (!height || height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let waterTrapped = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // Si la altura izquierda es menor
      if (height[left] >= leftMax) {
        // Es un nuevo máximo a la izquierda
        leftMax = height[left];
      } else {
        // Hay espacio para atrapar agua
        // El agua se llena hasta leftMax (porque hay algo más alto a la derecha)
        waterTrapped += leftMax - height[left];
      }
      left++;
    } else {
      // Si la altura derecha es menor o igual
      if (height[right] >= rightMax) {
        // Es un nuevo máximo a la derecha
        rightMax = height[right];
      } else {
        // Hay espacio para atrapar agua
        // El agua se llena hasta rightMax (porque hay algo más alto a la izquierda)
        waterTrapped += rightMax - height[right];
      }
      right--;
    }
  }

  return waterTrapped;
}

// ============================================
// ALTERNATIVE APPROACH: Pre-calculate left and right max
// (More intuitive but uses O(n) space)
// ============================================
// function trap(height) {
//   if (!height || height.length === 0) return 0;
//
//   const n = height.length;
//   const leftMax = new Array(n);
//   const rightMax = new Array(n);
//
//   // Calcula el máximo a la izquierda para cada posición
//   leftMax[0] = height[0];
//   for (let i = 1; i < n; i++) {
//     leftMax[i] = Math.max(leftMax[i - 1], height[i]);
//   }
//
//   // Calcula el máximo a la derecha para cada posición
//   rightMax[n - 1] = height[n - 1];
//   for (let i = n - 2; i >= 0; i--) {
//     rightMax[i] = Math.max(rightMax[i + 1], height[i]);
//   }
//
//   // Calcula el agua atrapada
//   let waterTrapped = 0;
//   for (let i = 0; i < n; i++) {
//     const minHeight = Math.min(leftMax[i], rightMax[i]);
//     waterTrapped += minHeight - height[i];
//   }
//
//   return waterTrapped;
// }

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\nTrapping Rain Water Tests:');

  // Test 1: Ejemplo del problema
  let result = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
  assert(result === 6, 'Ejemplo: [0,1,0,2,1,0,1,3,2,1,2,1] → 6');

  // Test 2: Array vacío
  result = trap([]);
  assert(result === 0, 'Vacío: [] → 0');

  // Test 3: Un solo elemento
  result = trap([3]);
  assert(result === 0, 'Un elemento: [3] → 0');

  // Test 4: Dos elementos
  result = trap([3, 0, 2]);
  assert(result === 2, 'Tres elementos: [3,0,2] → 2');

  // Test 5: Array descendente (sin agua)
  result = trap([5, 4, 3, 2, 1]);
  assert(result === 0, 'Descendente: [5,4,3,2,1] → 0');

  // Test 6: Array ascendente (sin agua)
  result = trap([1, 2, 3, 4, 5]);
  assert(result === 0, 'Ascendente: [1,2,3,4,5] → 0');

  // Test 7: Simple V-shape
  result = trap([3, 0, 0, 2, 0, 4]);
  assert(result === 10, 'V-shape: [3,0,0,2,0,4] → 10 (2 en medio + 4 a la izquierda)');

  // Test 8: Múltiples válles
  result = trap([3, 0, 2, 0, 4, 0, 5]);
  assert(result === 11, 'Múltiples válles: agua atrapada correctamente');

  // Test 9: Todos ceros
  result = trap([0, 0, 0, 0]);
  assert(result === 0, 'Todos ceros: [0,0,0,0] → 0');

  // Test 10: Todos iguales
  result = trap([2, 2, 2, 2, 2]);
  assert(result === 0, 'Todos iguales: [2,2,2,2,2] → 0');

  // Test 11: Pico en medio
  result = trap([3, 0, 0, 2, 0, 4, 0, 5]);
  assert(result > 0, 'Complejo: agua atrapada es positiva');

  // Test 12: Verificar contra enfoque alternativo
  const testCase = [4, 2, 0, 3, 2, 5];
  result = trap(testCase);
  // Cálculo manual: pos 1 → 2 agua, pos 2 → 4 agua, pos 3 → 2 agua, pos 4 → 3 agua
  // Total esperado: 9
  assert(result === 9, 'Verificación manual: [4,2,0,3,2,5] → 9');

  // Test 13: Caso del análisis teórico
  result = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
  assert(result === 6, 'Caso clásico: suma correcta de agua atrapada');

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
// SOLUCIÓN CON DOS POINTERS (O(1) ESPACIO):
// Tiempo: O(n)
//   - Ambos pointers avanzan exactamente una vez hacia el centro
//   - Cada elemento se procesa una sola vez
//
// Espacio: O(1)
//   - Solo usamos variables: left, right, leftMax, rightMax, waterTrapped
//   - No hay estructuras de datos adicionales
//
// SOLUCIÓN CON PRE-CÁLCULO (O(n) ESPACIO):
// Tiempo: O(n)
//   - Primera pasada: construir leftMax O(n)
//   - Segunda pasada: construir rightMax O(n)
//   - Tercera pasada: calcular agua O(n)
//   - Total: 3 × O(n) = O(n)
//
// Espacio: O(n)
//   - Almacenamos dos arrays de tamaño n (leftMax y rightMax)
//
// ALTERNATIVA STACK:
// Tiempo: O(n)
// Espacio: O(n) para la pila
// Idea: mantener índices de barras en decreasing order
// ============================================

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. INTUICIÓN FÍSICA:
//    El agua en cada posición está limitada por:
//    - La barra más alta a su izquierda
//    - La barra más alta a su derecha
//    - Su propia altura
//    Agua[i] = min(maxLeft[i], maxRight[i]) - height[i]
//
// 2. ENFOQUE DOS POINTERS (ÓPTIMO):
//    Avanzamos desde los extremos hacia el centro.
//    Procesamos el lado con la altura menor.
//    Razón: El agua está limitada por la altura menor.
//    Si height[left] < height[right], podemos confiar en leftMax
//    porque sabemos que hay algo >= height[right] a la derecha.
//
// 3. CLAVE DEL ALGORITMO:
//    if (height[left] >= leftMax) → nuevo máximo, no hay agua
//    else → hay agua: leftMax - height[left]
//
//    Similar para el lado derecho con rightMax.
//
// 4. POR QUÉ FUNCIONA EL MOVIMIENTO INTELIGENTE:
//    Siempre procesamos el lado "limitante" primero.
//    Si left < right y height[left] < height[right],
//    el agua en left está limitada por el máximo visto a la izquierda.
//
// 5. COMPARATIVA DE SOLUCIONES:
//    - Pre-cálculo: más intuitivo, más fácil de entender
//    - Dos pointers: óptimo en espacio, más difícil de derivar
//    Empieza con la intuitiva, luego optimiza.
//
// 6. CASOS LÍMITE:
//    - Array vacío o con 1-2 elementos → sin agua
//    - Arrays monotónicos (solo subida o bajada) → sin agua
//    - Múltiples válles → suma de cada valle
//    - Valores muy grandes/pequeños
//
// 7. VISUALIZACIÓN:
//    Dibuja el problema. Muestra cómo el agua se llena entre las barras.
//    Explica por qué el agua está limitada por min(left, right).
//
// 8. FOLLOW-UPS:
//    ¿Y si lluvia cae en ángulo? (problema diferente)
//    ¿Qué posiciones almacenan el máximo de agua? (tracking)
//    ¿Con obstáculos internos? (variante)
//    ¿Volumen 2D o 3D? (problemas más complejos)
//
// 9. TRAMPA COMÚN:
//    Confundir "máximo a la izquierda" con "todas las alturas a la izquierda".
//    Solo importa el MÁXIMO. El agua se llena hasta el máximo visto hasta ahora.
//
// 10. DERIVACIÓN PASO A PASO:
//    1. Entiende que agua[i] = min(maxLeft, maxRight) - height[i]
//    2. Implementa con pre-cálculo (O(n) espacio)
//    3. Optimiza a dos pointers (O(1) espacio)
//    4. Prueba en casos complejos
// ============================================
