// ============================================
// PROBLEMA: Number of Islands (LeetCode #200)
// ============================================
// Dado un grid 2D de 'm' x 'n' que contiene '1' (tierra)
// y '0' (agua), encuentra el número de islas.
// Una isla es formada por conectar tierra adyacente horizontalmente
// o verticalmente.
//
// Ejemplo:
// grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Salida: 1 isla
//
// Complejidad objetivo: Tiempo O(m*n), Espacio O(m*n)
// Patrón: Depth-First Search (DFS) en grafo implícito
// ============================================

/**
 * Cuenta el número de islas en un grid 2D
 * @param {character[][]} grid - Grid con '1' (tierra) y '0' (agua)
 * @returns {number} Número de islas
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  // Función DFS para marcar toda una isla como visitada
  function dfs(r, c) {
    // Validar límites del grid
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }

    // Marcar celda actual como visitada (agua)
    grid[r][c] = '0';

    // Explorar los 4 vecinos (arriba, abajo, izquierda, derecha)
    dfs(r - 1, c); // arriba
    dfs(r + 1, c); // abajo
    dfs(r, c - 1); // izquierda
    dfs(r, c + 1); // derecha
  }

  // Iterar sobre cada celda del grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Si encontramos tierra, hemos encontrado una nueva isla
      if (grid[r][c] === '1') {
        islandCount++;
        // Marcar toda la isla como visitada
        dfs(r, c);
      }
    }
  }

  return islandCount;
}

/**
 * Alternativa con BFS (Breadth-First Search) usando cola
 */
function numIslandsBFS(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  function bfs(startR, startC) {
    const queue = [[startR, startC]];
    grid[startR][startC] = '0'; // Marcar como visitado

    while (queue.length > 0) {
      const [r, c] = queue.shift();

      // Explorar 4 direcciones
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
          grid[nr][nc] = '0'; // Marcar como visitado
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islandCount++;
        bfs(r, c);
      }
    }
  }

  return islandCount;
}

// ============================================
// TESTS
// ============================================

function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== Number of Islands (LeetCode #200) ===\n');

  // Test 1: Grid con una isla
  let grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
  ];
  const result1 = numIslands(JSON.parse(JSON.stringify(grid1)));
  assert(result1 === 1, 'Grid con una isla: resultado = 1');

  // Test 2: Grid con múltiples islas
  let grid2 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ];
  const result2 = numIslands(JSON.parse(JSON.stringify(grid2)));
  assert(result2 === 3, 'Grid con tres islas: resultado = 3');

  // Test 3: Grid vacío (solo agua)
  let grid3 = [
    ['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0']
  ];
  const result3 = numIslands(JSON.parse(JSON.stringify(grid3)));
  assert(result3 === 0, 'Grid sin islas: resultado = 0');

  // Test 4: Grid con una sola celda de tierra
  let grid4 = [['1']];
  const result4 = numIslands(JSON.parse(JSON.stringify(grid4)));
  assert(result4 === 1, 'Grid 1x1 con tierra: resultado = 1');

  // Test 5: Grid con una sola celda de agua
  let grid5 = [['0']];
  const result5 = numIslands(JSON.parse(JSON.stringify(grid5)));
  assert(result5 === 0, 'Grid 1x1 con agua: resultado = 0');

  // Test 6: BFS - Grid con múltiples islas
  let grid6 = [
    ['1', '0', '1'],
    ['0', '0', '0'],
    ['1', '0', '1']
  ];
  const result6 = numIslandsBFS(JSON.parse(JSON.stringify(grid6)));
  assert(result6 === 4, 'BFS - Cuatro esquinas: resultado = 4');

  // Test 7: Grid rectangular grande
  let grid7 = [
    ['1', '1', '1', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ];
  const result7 = numIslands(JSON.parse(JSON.stringify(grid7)));
  assert(result7 === 2, 'Grid rectangular: resultado = 2');

  console.log('\n✓ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. ACLARACIÓN INICIAL:
   - Preguntar si el grid está vacio o cómo manejar casos límite
   - Confirmar que "adyacente" significa horizontal/vertical (no diagonal)
   - La matriz se puede modificar o necesitamos preservarla

2. ENFOQUE DFS vs BFS:
   - DFS: Más intuitivo, usa stack recursivo (implícito)
   - BFS: Usa cola explícita, iterativo, mejor para entrevista
   - Ambos tienen O(m*n) en tiempo y espacio

3. OPTIMIZACIONES:
   - Usar visited set si no puedes modificar grid (espacio O(m*n))
   - Evitar duplicación con JSON.parse en tests (solo para copias)

4. ERRORES COMUNES:
   - Olvidar validar límites antes de acceder a grid
   - No marcar como visitado antes de explorar
   - Confundir dimensiones (rows vs cols)

5. VARIACIONES DE ENTREVISTA:
   - Encontrar la isla más grande
   - Contar el perímetro total de todas las islas
   - Actualizar grid con ID de isla (1, 2, 3...)

6. COMPLEJIDAD:
   - Tiempo: O(m*n) - visitamos cada celda una vez
   - Espacio: O(min(m,n)) para DFS recursivo (altura del árbol)
   - O(m*n) si usamos visited set o BFS con cola en peor caso
*/
