// ============================================
// PROBLEMA: Longest Common Subsequence (LeetCode #1143 - Medium)
// ============================================
// Dados dos strings text1 y text2, retorna la longitud de su subsecuencia
// más larga común (longest common subsequence).
//
// Una subsecuencia común es una subsecuencia que aparece en ambos strings
// en el mismo orden, pero no necesariamente consecutiva.
//
// Ejemplo: text1 = "abcde", text2 = "ace"
// LCS: "ace" -> Longitud = 3
//
// Ejemplo: text1 = "abc", text2 = "abc"
// LCS: "abc" -> Longitud = 3
//
// Complejidad objetivo: Tiempo O(m*n), Espacio O(m*n)
// Patrón: Dynamic Programming - Tabulación 2D
// ============================================

/**
 * Solución: DP Tabulación 2D - Bottom-Up
 *
 * Relación de recurrencia:
 * Si text1[i-1] === text2[j-1]:
 *   dp[i][j] = dp[i-1][j-1] + 1
 * Si son distintos:
 *   dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *
 * dp[i][j] = longitud de LCS de text1[0...i-1] y text2[0...j-1]
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] = LCS de text1[0...i-1] y text2[0...j-1]
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Llenamos la tabla de abajo hacia arriba
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Los caracteres coinciden: tomamos la diagonal + 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // No coinciden: tomamos el máximo de arriba o izquierda
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * Solución optimizada: Espacio O(min(m,n))
 *
 * Observación: Solo necesitamos la fila anterior para calcular la actual
 * Podemos usar solo 2 filas en lugar de m+1 filas
 */
function longestCommonSubsequence_OptimizedSpace(text1, text2) {
  // Usamos el string más corto como la dimensión de la fila
  if (text1.length < text2.length) {
    [text1, text2] = [text2, text1];
  }

  const m = text1.length;
  const n = text2.length;

  let prev = Array(n + 1).fill(0);
  let curr = Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev]; // Intercambiamos filas
  }

  return prev[n];
}

/**
 * Solución con reconstrucción: obtener la subsecuencia real
 *
 * A veces necesitas no solo la longitud, sino la subsecuencia misma
 * Esto requiere guardar decisiones durante el llenado de la tabla
 */
function getLongestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Llenamos la tabla
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruimos la subsecuencia
  const lcs = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      // Los caracteres coinciden: este está en la LCS
      lcs.unshift(text1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      // Vine de arriba
      i--;
    } else {
      // Vine de la izquierda
      j--;
    }
  }

  return {
    length: dp[m][n],
    subsequence: lcs.join(""),
  };
}

// ============================================
// TESTS
// ============================================
function runTests() {
  console.log("🧪 Ejecutando tests para Longest Common Subsequence...\n");

  const testCases = [
    {
      text1: "abcde",
      text2: "ace",
      expected: 3,
      expectedSeq: "ace",
      description: "Ejemplo clásico: 'ace'",
    },
    {
      text1: "abc",
      text2: "abc",
      expected: 3,
      expectedSeq: "abc",
      description: "Strings idénticos",
    },
    {
      text1: "abc",
      text2: "def",
      expected: 0,
      expectedSeq: "",
      description: "Sin subsecuencia común",
    },
    {
      text1: "a",
      text2: "a",
      expected: 1,
      expectedSeq: "a",
      description: "Un carácter igual",
    },
    {
      text1: "a",
      text2: "b",
      expected: 0,
      expectedSeq: "",
      description: "Un carácter distinto",
    },
    {
      text1: "oxcpqrsvwf",
      text2: "sxyspmqpnz",
      expected: 3,
      expectedSeq: "xpq",
      description: "Strings más largos: LCS es 'xpq'",
    },
    {
      text1: "AGGTAB",
      text2: "GXTXAYB",
      expected: 4,
      expectedSeq: "GTAB",
      description: "DNA-like strings: LCS es 'GTAB'",
    },
    {
      text1: "abcdefghijklmnop",
      text2: "bcdefghijklmnopq",
      expected: 15,
      expectedSeq: "bcdefghijklmnop",
      description: "Strings largos con subsecuencia larga",
    },
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach(({ text1, text2, expected, expectedSeq, description }) => {
    const result = longestCommonSubsequence(text1, text2);
    const resultOptSpace = longestCommonSubsequence_OptimizedSpace(text1, text2);
    const resultWithSeq = getLongestCommonSubsequence(text1, text2);

    const success =
      result === expected &&
      resultOptSpace === expected &&
      resultWithSeq.length === expected &&
      resultWithSeq.subsequence === expectedSeq;

    if (success) {
      console.log(`✅ PASS: ${description}`);
      console.log(`   text1: "${text1}"`);
      console.log(`   text2: "${text2}"`);
      console.log(`   Longitud: ${result}`);
      console.log(`   Subsecuencia: "${resultWithSeq.subsequence}"`);
      console.log();
      passed++;
    } else {
      console.log(`❌ FAIL: ${description}`);
      console.log(`   text1: "${text1}", text2: "${text2}"`);
      console.log(`   Expected: ${expected}, Got: ${result}`);
      console.log(`   Expected seq: "${expectedSeq}", Got: "${resultWithSeq.subsequence}"`);
      console.log();
      failed++;
    }
  });

  console.log(`\n📊 Resultados: ${passed} passed, ${failed} failed`);
  console.log(`✨ ${failed === 0 ? "¡Todos los tests pasaron!" : "Hay fallos que corregir"}\n`);
}

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
/*
SOLUCIÓN 1: DP Tabulación 2D Estándar
- Tiempo: O(m * n) - m = len(text1), n = len(text2)
          Dos loops anidados sobre ambas dimensiones
- Espacio: O(m * n) - Matriz de tamaño (m+1) x (n+1)

SOLUCIÓN 2: Espacio Optimizado
- Tiempo: O(m * n) - Mismo número de operaciones
- Espacio: O(min(m, n)) - Solo 2 filas

SOLUCIÓN 3: Con Reconstrucción
- Tiempo: O(m * n) para llenar tabla + O(m + n) para reconstruir
- Espacio: O(m * n) para la tabla + O(m + n) para el resultado

COMPARACIÓN:
- n = 1000: O(n²) = 1M celdas
- n = 10000: O(n²) = 100M celdas
Para espacios muy grandes, la versión optimizada es crucial
*/

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. RECONOCE EL PATRÓN 2D:
   - Dos strings -> usualmente DP 2D
   - "subsecuencia común" es una palabra clave
   - Este es un clásico muy frecuente

2. CONSTRUCCIÓN DE LA TABLA:
   - dp[i][j] representa LCS de text1[0...i-1] y text2[0...j-1]
   - Cuidado: i y j son 1-indexed, pero strings son 0-indexed
   - Fila/columna 0 siempre es 0 (LCS con string vacío es 0)

3. RELACIÓN DE RECURRENCIA:
   - Si chars coinciden: toma la diagonal + 1
   - Si no coinciden: toma el máximo de arriba o izquierda
   - Esto es la clave, explícalo claramente

4. RECONSTRUCCIÓN:
   - Comienza desde dp[m][n] (esquina inferior derecha)
   - Si chars coinciden, incluye en resultado y ve a diagonal
   - Si no, ve al vecino con mayor valor
   - Acumula caracteres y reversa al final (o unshift)

5. CASOS BORDE:
   - Strings vacíos -> return 0
   - Strings idénticos -> return length
   - Sin caracteres comunes -> return 0
   - Un carácter cada uno -> return 0 o 1

6. OPTIMIZACIÓN DE ESPACIO:
   - Solo di que existe si tienes tiempo extra
   - Lo importante es aclarar la lógica primero
   - La optimización requiere entender que solo importa la fila anterior

7. VARIACIONES POSIBLES:
   - "Edit Distance" (Levenshtein): inserciones, borrados, reemplazos
   - "Shortest Common Supersequence": secuencia que contiene ambas
   - "Distinct Subsequences": contar en lugar de encontrar
   - El patrón 2D se aplica a todas

8. SIMILITUDES CON OTROS PROBLEMAS:
   - Climbing Stairs: 1D
   - Coin Change: 1D
   - LCS: 2D (porque depende de DOS strings)
   - Edit Distance: similar a LCS pero con más operaciones
*/

runTests();
