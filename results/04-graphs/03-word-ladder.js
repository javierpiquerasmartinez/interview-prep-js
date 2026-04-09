// ============================================
// PROBLEMA: Word Ladder (LeetCode #127 - Hard)
// ============================================
// Dado dos palabras, beginWord y endWord, y una lista
// de palabras wordList, encuentra la longitud de la
// secuencia de transformación MÁS CORTA desde beginWord
// a endWord, donde cada palabra en la secuencia difiere
// de la anterior por exactamente UNA letra.
//
// Solo las palabras en wordList son palabras válidas.
// Si no existe transformación, retorna 0.
//
// Ejemplo:
// beginWord = "hit", endWord = "cog"
// wordList = ["hot","dot","dog","lot","log","cog"]
// Salida: 5
// Explicación: "hit" -> "hot" -> "dot" -> "dog" -> "cog"
//
// Complejidad objetivo: Tiempo O(M² * N), Espacio O(M*N)
// M = longitud de palabra, N = número de palabras
// Patrón: BFS en grafo implícito
// ============================================

/**
 * Encuentra la longitud de la transformación más corta
 * @param {string} beginWord - Palabra inicial
 * @param {string} endWord - Palabra objetivo
 * @param {string[]} wordList - Lista de palabras válidas
 * @returns {number} Longitud de la cadena de transformación (0 si imposible)
 */
function ladderLength(beginWord, endWord, wordList) {
  // Convertir a Set para búsqueda O(1)
  const wordSet = new Set(wordList);

  // Si endWord no está en la lista, imposible
  if (!wordSet.has(endWord)) {
    return 0;
  }

  // BFS
  const queue = [[beginWord, 1]]; // [palabra, longitud del camino]
  const visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [currentWord, length] = queue.shift();

    // Si llegamos al endWord
    if (currentWord === endWord) {
      return length;
    }

    // Generar todas las palabras posibles con 1 letra diferente
    const neighbors = getNeighbors(currentWord, wordSet);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.has(neighbor) || visited.add(neighbor);
        queue.push([neighbor, length + 1]);
      }
    }
  }

  // No hay transformación posible
  return 0;
}

/**
 * Obtiene todas las palabras vecinas (difieren por 1 letra)
 * @param {string} word - Palabra actual
 * @param {Set} wordSet - Conjunto de palabras válidas
 * @returns {string[]} Array de palabras válidas vecinas
 */
function getNeighbors(word, wordSet) {
  const neighbors = [];
  const chars = word.split('');

  // Para cada posición en la palabra
  for (let i = 0; i < chars.length; i++) {
    const originalChar = chars[i];

    // Probar cada letra de 'a' a 'z'
    for (let c = 97; c <= 122; c++) { // ASCII 97 = 'a', 122 = 'z'
      const newChar = String.fromCharCode(c);

      // Si es diferente del carácter original
      if (newChar !== originalChar) {
        chars[i] = newChar;
        const newWord = chars.join('');

        // Si la nueva palabra existe en wordSet
        if (wordSet.has(newWord)) {
          neighbors.push(newWord);
        }
      }
    }

    // Restaurar carácter original
    chars[i] = originalChar;
  }

  return neighbors;
}

/**
 * Alternativa: Bidirectional BFS (más eficiente)
 * Expande desde ambos extremos simultáneamente
 */
function ladderLengthBidirectional(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);

  if (!wordSet.has(endWord)) {
    return 0;
  }

  // BFS desde ambos lados
  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  const visited = new Set([beginWord, endWord]);

  let length = 1;

  while (beginSet.size > 0 && endSet.size > 0) {
    // Expandir desde el lado más pequeño
    if (beginSet.size > endSet.size) {
      [beginSet, endSet] = [endSet, beginSet];
    }

    const nextLevel = new Set();

    for (const word of beginSet) {
      const neighbors = getNeighbors(word, wordSet);

      for (const neighbor of neighbors) {
        // Si el vecino está en el otro lado, encontramos el camino
        if (endSet.has(neighbor)) {
          return length + 1;
        }

        // Si no fue visitado, agregarlo para siguiente nivel
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextLevel.add(neighbor);
        }
      }
    }

    beginSet = nextLevel;
    length++;
  }

  return 0;
}


// ============================================
// TESTS
// ============================================

function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== Word Ladder (LeetCode #127) ===\n');

  // Test 1: Ejemplo clásico
  const result1 = ladderLength(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
  );
  assert(result1 === 5, 'hit->cog: hit->hot->dot->dog->cog (longitud 5)');

  // Test 2: Imposible (endWord no en lista)
  const result2 = ladderLength(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log']
  );
  assert(result2 === 0, 'cog no en lista: resultado 0');

  // Test 3: Palabras con una letra diferente
  const result3 = ladderLength(
    'a',
    'b',
    ['a', 'c', 'd']
  );
  assert(result3 === 0, 'a->b sin b en lista: resultado 0');

  // Test 4: Palabras idénticas
  const result4 = ladderLength(
    'hit',
    'hit',
    ['hit']
  );
  assert(result4 === 1, 'Palabra igual a inicio: resultado 1');

  // Test 5: Cadena pequeña
  const result5 = ladderLength(
    'cat',
    'dog',
    ['cat', 'bat', 'bad', 'dad', 'dag', 'dog']
  );
  assert(result5 === 6, 'cat->dog: cat->bat->bad->dad->dag->dog (longitud 6)');

  // Test 6: Múltiples caminos (devuelve el más corto)
  const result6 = ladderLength(
    'hot',
    'dog',
    ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
  );
  assert(result6 === 3, 'hot->dog: hot->dot->dog (longitud 3)');

  // Test 7: Camino sin solución intermedia
  const result7 = ladderLength(
    'a',
    'z',
    ['b', 'c', 'd']
  );
  assert(result7 === 0, 'a->z sin conexión: resultado 0');

  // Test 8: Bidirectional BFS - ejemplo clásico
  const result8 = ladderLengthBidirectional(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
  );
  assert(result8 === 5, 'Bidirectional: hit->cog (longitud 5)');

  // Test 9: Bidirectional BFS - sin solución
  const result9 = ladderLengthBidirectional(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log']
  );
  assert(result9 === 0, 'Bidirectional sin solución: resultado 0');

  // Test 10: Palabras de 4 letras
  const result10 = ladderLength(
    'cold',
    'warm',
    ['cold', 'cord', 'card', 'ward', 'warm', 'cond']
  );
  assert(result10 === 5, 'cold->warm: cold->cord->card->ward->warm (longitud 5)');

  console.log('\n✓ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. ACLARACIÓN INICIAL:
   - Confirmar que una diferencia significa EXACTAMENTE 1 letra
   - ¿Podemos agregar beginWord a wordList si no está?
   - ¿Importa el camino exacto o solo la longitud?
   - ¿Máximo de palabras/letras? (Afecta optimización)

2. ENFOQUES:

   A) BFS Simple (Standard):
      - Desde beginWord hacia endWord
      - Generar vecinos modificando cada posición
      - O(M² * N) tiempo: M² para generar vecinos, N iteraciones BFS
      - Fácil de implementar y entender
      - Bueno para explicación en entrevista

   B) BFS Bidirectional (Optimizado):
      - Expandir simultáneamente desde ambos extremos
      - Se encuentran en el medio
      - Reduce el factor de ramificación
      - Más rápido en la práctica (~2x)
      - Más complejo de implementar

3. COMPLEJIDAD DETALLADA:
   Tiempo: O(M² * N)
   - M² para generar vecinos: M posiciones × 26 letras
   - N palabras máximo: cada palabra puede procesarse una vez
   - wordSet.has() es O(1)

   Espacio: O(M * N)
   - visited Set: O(N) palabras
   - wordSet: O(N) palabras
   - queue: O(N) en peor caso

4. OPTIMIZACIÓN getNeighbors:
   - Usar ASCII (97-122) en lugar de iterar 'a'..'z'
   - Alternativamente:
     const alphabet = 'abcdefghijklmnopqrstuvwxyz'
     for (let c of alphabet)
   - Cache neighbors si son reutilizados

5. VALIDACIONES:
   - Verificar endWord en wordSet al inicio
   - Manejar casos: beginWord === endWord
   - Palabras duplicadas en wordList

6. ERRORES COMUNES:
   - Olvidar agregar beginWord a visited
   - Generar vecinos ineficientemente
   - No devolver 0 cuando es imposible
   - Contar longitud incorrectamente

7. MEJORAS PARA ENTREVISTA:
   - Primero: Simple BFS (fácil, correcto)
   - Luego: Mencionar optimización Bidirectional
   - Opcional: Implementar si hay tiempo

8. PREGUNTAS DE SEGUIMIENTO:
   - ¿Cuál es el camino exacto? (retornar array)
   - ¿Todos los caminos más cortos? (DFS o BFS modificado)
   - ¿Máximo de pasos permitido? (limitar búsqueda)
   - ¿Palabras de longitud variable? (más complejo)

9. ESTRUCTURA BFS:
   const queue = [[word, length]];
   const visited = new Set();
   while (queue.length) {
     const [current, dist] = queue.shift();
     if (current === target) return dist;
     // Generar y procesar vecinos
   }
   return 0;
*/
