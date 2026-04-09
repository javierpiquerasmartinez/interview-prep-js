// ============================================
// PROBLEMA: Container With Most Water (LeetCode #11 - Medium)
// ============================================
// Dado un array de números enteros 'height' donde cada número representa
// la altura de una línea vertical, encuentra dos líneas que juntas contengan
// la mayor cantidad de agua.
//
// El contenedor está formado por:
//   - El ancho: distancia entre los índices (j - i)
//   - La altura: mín(height[i], height[j])
//   - Área: ancho × altura
//
// Ejemplo:
//   Input: height = [1,8,6,2,5,4,8,3,7]
//   Output: 49
//   Explicación: Las líneas en índice 1 y 8 contienen 8 unidades de agua
//   Área = min(8,7) × (8-1) = 7 × 7 = 49
//
// Complejidad objetivo: Tiempo O(n), Espacio O(1)
// Patrón: Dos Pointers
// ============================================

function maxArea(height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculamos el área con los pointers actuales
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const currentArea = width * currentHeight;

    // Actualizamos el máximo si encontramos un área mayor
    maxWater = Math.max(maxWater, currentArea);

    // Estrategia de dos pointers:
    // Movemos el pointer que apunta a la línea más corta
    // Razón: El área está limitada por la línea más corta.
    // Si movemos el pointer a la línea más larga, el ancho disminuye
    // pero no puede mejorar porque la altura seguirá siendo la del más corto.
    // Solo moviendo el más corto hay chance de encontrar uno más alto.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// ============================================
// TESTS
// ============================================
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\nContainer With Most Water Tests:');

  // Test 1: Ejemplo del problema
  let result = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
  assert(result === 49, 'Ejemplo: [1,8,6,2,5,4,8,3,7] → 49');

  // Test 2: Array ascendente
  result = maxArea([1, 2, 3, 4, 5]);
  assert(result === 6, 'Ascendente: [1,2,3,4,5] → 6 (altura 2, ancho 3)');

  // Test 3: Array descendente
  result = maxArea([5, 4, 3, 2, 1]);
  assert(result === 6, 'Descendente: [5,4,3,2,1] → 6 (altura 2, ancho 3)');

  // Test 4: Array mínimo
  result = maxArea([1, 1]);
  assert(result === 1, 'Mínimo: [1,1] → 1');

  // Test 5: Uno muy alto al inicio, otro al final
  result = maxArea([10, 1, 1, 1, 1, 1, 10]);
  assert(result === 60, 'Altos en extremos: [10,1,1,1,1,1,10] → 60 (altura 10, ancho 6)');

  // Test 6: Todos iguales
  result = maxArea([5, 5, 5, 5, 5]);
  assert(result === 20, 'Todos iguales: [5,5,5,5,5] → 20 (altura 5, ancho 4)');

  // Test 7: Picos en el medio
  result = maxArea([1, 2, 4, 3, 5, 6]);
  assert(result === 12, 'Picos: [1,2,4,3,5,6] → 12 (altura 4, ancho 3)');

  // Test 8: Array con muchos elementos pequeños
  result = maxArea([2, 3, 10, 5, 7, 8, 9]);
  assert(result === 36, 'Diversos: [2,3,10,5,7,8,9] → 36 (altura 9, ancho 4)');

  // Test 9: Verificar que es el máximo
  result = maxArea([4, 3, 2, 1, 4]);
  const allPossibleAreas = [];
  const height = [4, 3, 2, 1, 4];
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = (j - i) * Math.min(height[i], height[j]);
      allPossibleAreas.push(area);
    }
  }
  const bruteForceMax = Math.max(...allPossibleAreas);
  assert(
    result === bruteForceMax,
    'Verificación: resultado es igual al máximo por fuerza bruta'
  );

  console.log('\n✅ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
// Tiempo: O(n)
//   - Un solo pase con dos pointers desde los extremos hacia el centro
//   - Cada posición se visita máximo una vez
//
// Espacio: O(1)
//   - Solo usamos dos variables (pointers y maxWater)
//   - No creamos estructuras adicionales que crecen con n
//
// Alternativa (Fuerza bruta):
//   - Tiempo: O(n²) - dos bucles anidados
//   - Espacio: O(1)
//   - Mucho más lento para arrays grandes
// ============================================

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
// 1. INTUICIÓN DE DOS POINTERS:
//    Comienza en los extremos (máximo ancho posible).
//    El área está limitada por la línea más corta.
//    Para mejorar, necesitamos encontrar una línea más alta.
//
// 2. ¿POR QUÉ MOVER EL POINTER CORTO?
//    Si moveaos el pointer alto, el ancho disminuye.
//    La altura será min(actual, left), que será ≤ altura actual.
//    Entonces el área solo puede disminuir.
//    Moviendo el corto, esperamos encontrar uno más alto.
//
// 3. DEMOSTRACIÓN DE OPTIMALIDAD:
//    Prueba formalmente que el algoritmo no pierde la solución óptima.
//    La idea: si hay una solución mejor "adentro", la encontramos
//    moviendo correctamente los pointers.
//
// 4. VISUALIZACIÓN:
//    Dibuja el problema: dos líneas, el área sombreada entre ellas.
//    Ayuda a entender por qué dos pointers funciona.
//
// 5. IMPLEMENTACIÓN:
//    - Inicializa left=0, right=length-1
//    - Calcula área con min(height[left], height[right]) × (right - left)
//    - Mueve el pointer más corto
//    - Actualiza el máximo
//
// 6. CASOS LÍMITE:
//    - Array de 2 elementos → simple, un área
//    - Todos los mismos números → el primero y último
//    - Números muy variados en altura
//    - Array con altura decreciente
//
// 7. FOLLOW-UPS:
//    ¿Y si no puedes usar dos pointers? (fuerza bruta O(n²))
//    ¿Y si quieres todos los pares con área máxima? (colecta todos)
//    ¿Versión 3D? (problem diferente, más complejo)
// ============================================
