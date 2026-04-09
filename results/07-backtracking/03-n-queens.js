/*
 * LeetCode #52: N-Queens II
 *
 * DESCRIPCIÓN EN ESPAÑOL:
 * El problema de las n-reinas es el problema de colocar n reinas en un tablero
 * de ajedrez de n×n de manera que ninguna reina se ataque entre sí.
 *
 * Este es la VERSIÓN II: Solo contar el número de soluciones válidas,
 * no es necesario retornar las posiciones.
 *
 * Ejemplo:
 * Input: n = 4
 * Output: 2
 * Explicación: Hay exactamente 2 soluciones válidas para un tablero 4x4
 *
 * Input: n = 1
 * Output: 1
 *
 * ENFOQUE: Backtracking con Constraint Checking
 * - Colocamos reinas fila por fila (una reina por fila)
 * - Para cada fila, intentamos colocar la reina en cada columna
 * - Verificamos si la posición es segura (no hay conflicto)
 * - Si es segura, continuamos recursivamente a la siguiente fila
 * - Si completamos todas las filas, encontramos una solución
 *
 * COMPLEJIDAD:
 * Tiempo: O(N!) - En el peor caso, exploramos N! permutaciones
 * Espacio: O(N) - Profundidad de la pila de recursión
 */

class NQueensCounter {
  /**
   * Cuenta el número de soluciones válidas para el problema de n-reinas.
   * @param {number} n - Tamaño del tablero (n x n)
   * @return {number} - Número de soluciones válidas
   */
  solveNQueens(n) {
    let count = 0;
    const cols = new Set();      // Columnas ocupadas
    const diag1 = new Set();     // Diagonales descendentes (row - col)
    const diag2 = new Set();     // Diagonales ascendentes (row + col)

    const backtrack = (row) => {
      // Caso base: colocamos todas las reinas
      if (row === n) {
        count++;
        return;
      }

      // Intentamos colocar una reina en cada columna de la fila actual
      for (let col = 0; col < n; col++) {
        const d1 = row - col; // Diagonal descendente
        const d2 = row + col; // Diagonal ascendente

        // Verificamos si la posición es segura
        if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
          continue; // Esta columna ya está atacada
        }

        // Colocamos la reina
        cols.add(col);
        diag1.add(d1);
        diag2.add(d2);

        // Recursión a la siguiente fila
        backtrack(row + 1);

        // Backtrack: removemos la reina
        cols.delete(col);
        diag1.delete(d1);
        diag2.delete(d2);
      }
    };

    backtrack(0);
    return count;
  }

  /**
   * Solución que también retorna todas las posiciones de las reinas.
   * Útil para visualizar las soluciones.
   * @param {number} n - Tamaño del tablero
   * @return {string[][][]} - Tableros con soluciones válidas
   */
  solveNQueensWithBoard(n) {
    const results = [];
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();
    const positions = []; // positions[row] = col

    const backtrack = (row) => {
      if (row === n) {
        // Construimos la representación del tablero
        const board = [];
        for (let r = 0; r < n; r++) {
          const rowStr = [];
          for (let c = 0; c < n; c++) {
            rowStr.push(positions[r] === c ? 'Q' : '.');
          }
          board.push(rowStr.join(''));
        }
        results.push(board);
        return;
      }

      for (let col = 0; col < n; col++) {
        const d1 = row - col;
        const d2 = row + col;

        if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
          continue;
        }

        cols.add(col);
        diag1.add(d1);
        diag2.add(d2);
        positions[row] = col;

        backtrack(row + 1);

        cols.delete(col);
        diag1.delete(d1);
        diag2.delete(d2);
      }
    };

    backtrack(0);
    return results;
  }

  /**
   * Verifica si una configuración de reinas es válida.
   * @param {number[]} positions - Array donde positions[row] = col
   * @return {boolean} - true si es válida
   */
  isValidConfiguration(positions) {
    const n = positions.length;
    for (let row = 0; row < n; row++) {
      for (let otherRow = row + 1; otherRow < n; otherRow++) {
        const col = positions[row];
        const otherCol = positions[otherRow];

        // Misma columna
        if (col === otherCol) return false;

        // Misma diagonal
        if (Math.abs(row - otherRow) === Math.abs(col - otherCol)) {
          return false;
        }
      }
    }
    return true;
  }
}

// ============================================================================
// PRUEBAS Y VALIDACIÓN
// ============================================================================

class NQueensTest {
  static assert(condition, message) {
    if (!condition) {
      throw new Error(`ASSERTION FAILED: ${message}`);
    }
  }

  static run() {
    const solver = new NQueensCounter();

    console.log('Ejecutando pruebas para N-Queens II...\n');

    // Prueba 1: n = 1
    console.log('Test 1: n = 1');
    const result1 = solver.solveNQueens(1);
    this.assert(result1 === 1, 'Para n=1, debe haber 1 solución');
    console.log(`✓ Soluciones válidas: ${result1}\n`);

    // Prueba 2: n = 2
    console.log('Test 2: n = 2');
    const result2 = solver.solveNQueens(2);
    this.assert(result2 === 0, 'Para n=2, no hay soluciones válidas');
    console.log(`✓ Soluciones válidas: ${result2}\n`);

    // Prueba 3: n = 3
    console.log('Test 3: n = 3');
    const result3 = solver.solveNQueens(3);
    this.assert(result3 === 0, 'Para n=3, no hay soluciones válidas');
    console.log(`✓ Soluciones válidas: ${result3}\n`);

    // Prueba 4: n = 4
    console.log('Test 4: n = 4');
    const result4 = solver.solveNQueens(4);
    this.assert(result4 === 2, 'Para n=4, debe haber 2 soluciones');
    console.log(`✓ Soluciones válidas: ${result4}\n`);

    // Prueba 5: n = 5
    console.log('Test 5: n = 5');
    const result5 = solver.solveNQueens(5);
    this.assert(result5 === 10, 'Para n=5, debe haber 10 soluciones');
    console.log(`✓ Soluciones válidas: ${result5}\n`);

    // Prueba 6: n = 6
    console.log('Test 6: n = 6');
    const result6 = solver.solveNQueens(6);
    this.assert(result6 === 4, 'Para n=6, debe haber 4 soluciones');
    console.log(`✓ Soluciones válidas: ${result6}\n`);

    // Prueba 7: n = 8 (el clásico)
    console.log('Test 7: n = 8 (El clásico tablero de ajedrez)');
    const result8 = solver.solveNQueens(8);
    this.assert(result8 === 92, 'Para n=8, debe haber 92 soluciones');
    console.log(`✓ Soluciones válidas: ${result8}\n`);

    // Prueba 8: Visualizar soluciones de 4x4
    console.log('Test 8: Visualizar tableros de 4x4');
    const boards4 = solver.solveNQueensWithBoard(4);
    this.assert(boards4.length === 2, 'Debe haber 2 tableros para n=4');
    console.log('Primera solución:');
    boards4[0].forEach(row => console.log('  ' + row));
    console.log('Segunda solución:');
    boards4[1].forEach(row => console.log('  ' + row));
    console.log();

    // Prueba 9: Validar configuraciones
    console.log('Test 9: Validar configuraciones');
    const validConfig = [1, 3, 0, 2]; // n=4, segunda solución
    const isValid = solver.isValidConfiguration(validConfig);
    this.assert(isValid, 'Configuración [1,3,0,2] debe ser válida para n=4');
    console.log(`✓ Configuración [${validConfig.join(',')}] es válida\n`);

    // Prueba 10: Progresión de soluciones
    console.log('Test 10: Progresión de soluciones por tamaño');
    console.log('┌───────┬─────────────────┐');
    console.log('│ n     │ # Soluciones    │');
    console.log('├───────┼─────────────────┤');
    for (let n = 1; n <= 8; n++) {
      const count = solver.solveNQueens(n);
      console.log(`│ ${n}     │ ${count.toString().padStart(15)} │`);
    }
    console.log('└───────┴─────────────────┘\n');

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
━━━━━━━━━━━━━━━━━━━━━━
Tiempo: O(N!)
  - En el peor caso, exploramos hasta N! ramas del árbol de decisión
  - Para cada fila, tenemos un máximo de N opciones de columna
  - Con constraint checking, podemos eliminar muchas ramas
  - En promedio, es mucho mejor que N!

Espacio: O(N)
  - Profundidad máxima de recursión: N
  - Three Sets (cols, diag1, diag2) con máximo N elementos
  - No contamos el espacio de output

Constraint Checking:
━━━━━━━━━━━━━━━━━━━━
Verificar si es segura colocar una reina: O(1)
  - Usamos Sets para búsqueda O(1) en columnas y diagonales
  - d1 = row - col: identifica diagonal descendente única
  - d2 = row + col: identifica diagonal ascendente única

OPTIMIZACIONES CLAVE:

1. Colocamos una reina por fila:
   - Garantiza que no hay dos reinas en la misma fila
   - Reduce el espacio de búsqueda significativamente

2. Usamos Sets para tracking:
   - O(1) para verificar conflictos
   - O(1) para agregar/remover reinas

3. Early termination:
   - Si no hay soluciones en una rama, backtrack inmediatamente
   - Evitamos explorar ramas inútiles

NÚMEROS DE SOLUCIONES:
┌───┬───────┬────────────────┐
│ n │ Sols  │ Observación    │
├───┼───────┼────────────────┤
│ 1 │ 1     │ Trivial        │
│ 2 │ 0     │ Imposible      │
│ 3 │ 0     │ Imposible      │
│ 4 │ 2     │ Primer válido  │
│ 5 │ 10    │               │
│ 6 │ 4     │               │
│ 7 │ 40    │               │
│ 8 │ 92    │ Clásico        │
│ 9 │ 352   │               │
│ 10│ 724   │               │
│ 12│ 14200 │ Crece rápido   │
└───┴───────┴────────────────┘

CONSEJOS PARA LA ENTREVISTA:

1. ENTENDER EL PROBLEMA:
   ✓ Clarifica que una reina ataca horizontal, vertical y diagonal
   ✓ Una solución válida tiene exactamente N reinas
   ✓ LeetCode #52 pide solo contar, #51 pide retornar configuraciones

2. VISUALIZAR:
   ✓ Dibuja un tablero 4x4 y muestra las 2 soluciones
   ✓ Explica por qué n=2 y n=3 no tienen soluciones
   ✓ Muestra cómo se usan las diagonales para evitar conflictos

3. EXPLICAR DIAGONALES:
   ✓ Diagonal descendente: row - col es constante
   ✓ Diagonal ascendente: row + col es constante
   ✓ Esto permite identificación única y búsqueda O(1)

4. STRATEGY:
   ✓ Colocar una reina por fila simplifica el problema
   ✓ Usar Sets para constraint checking O(1)
   ✓ Mencion que esto es mejor que verificar toda la junta

5. PREGUNTAS DE SEGUIMIENTO:
   - Versión #51: Retorna todas las soluciones (retorna tableros)
   - ¿Cómo optimizarías para n grande?
   - ¿Hay soluciones para n=2 y n=3? ¿Por qué?
   - ¿Cómo usarías simetría para optimizar?

6. COMPARACIÓN CON OTRAS SOLUCIONES:
   - Fuerza bruta: Verificar todos los C(n²,n) = n! / (n!(n²-n)!) combinaciones
   - Nuestro enfoque: Solo O(N!) en el peor caso, pero con podas

CASOS DE USO EN LA INDUSTRIA:
- Problemas de asignación y conflictos
- Constraint satisfaction problems (CSP)
- Verificación de horarios y recursos
- Diseño de circuitos sin cruces
- Problemas de cobertura
`;

console.log(COMPLEXITY_ANALYSIS);

// ============================================================================
// EJECUCIÓN
// ============================================================================

NQueensTest.run();
