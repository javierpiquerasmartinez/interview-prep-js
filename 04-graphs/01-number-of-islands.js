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
// ============================================

/**
 * Cuenta el número de islas en un grid 2D
 * @param {character[][]} grid - Grid con '1' (tierra) y '0' (agua)
 * @returns {number} Número de islas
 */
function numIslands(grid) {
  let numIslands = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        numIslands++
        floodIsland(i, j)
      }
    }
  }
  function floodIsland(i, j) {
    if (grid[i][j] !== '1') return
    grid[i][j] = '*'
    if (i > 0) {
      floodIsland(i - 1, j)
    }
    if (i < grid.length - 1) {
      floodIsland(i + 1, j)
    }
    if (j > 0) {
      floodIsland(i, j - 1)
    }
    if (j < grid[i].length - 1) {
      floodIsland(i, j + 1)
    }
  }

  return numIslands
}



/**
 * Alternativa con BFS (Breadth-First Search) usando cola
 */
function numIslandsBFS(grid) {
  let numIslands = 0
  let queue = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        numIslands++
        queue.push([i, j])
        while (queue.length > 0) {
          let [pieceI, pieceJ] = queue.shift()
          if (grid[pieceI][pieceJ] === '1') {
            grid[pieceI][pieceJ] = '*'
            if (pieceI > 0) queue.push([pieceI - 1, pieceJ])
            if (pieceI < grid.length - 1) queue.push([pieceI + 1, pieceJ])
            if (pieceJ > 0) queue.push([pieceI, pieceJ - 1])
            if (pieceJ < grid[pieceI].length - 1) queue.push([pieceI, pieceJ + 1])
          }
        }
      }
    }
  }
  return numIslands
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
