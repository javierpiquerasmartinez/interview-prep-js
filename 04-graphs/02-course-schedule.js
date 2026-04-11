// ============================================
// PROBLEMA: Course Schedule (LeetCode #207)
// ============================================
// Tienes numCourses cursos etiquetados de 0 a numCourses - 1
// y una lista de requisitos [a,b] que significa que debes tomar
// el curso b antes de poder tomar el curso a.
//
// Determina si puedes terminar todos los cursos.
//
// Ejemplo:
// numCourses = 2, prerequisites = [[1,0]]
// Salida: true (toma curso 0 luego curso 1)
//
// numCourses = 2, prerequisites = [[1,0],[0,1]]
// Salida: false (ciclo detectado)
//
// Complejidad objetivo: Tiempo O(V+E), Espacio O(V+E)
// ============================================

/**
 * Determina si todos los cursos pueden ser terminados
 * usando detección de ciclos con Topological Sort (BFS)
 * @param {number} numCourses - Número total de cursos
 * @param {number[][]} prerequisites - Lista de [curso, requisito]
 * @returns {boolean} true si se pueden terminar todos los cursos
 */
function canFinish(numCourses, prerequisites) {
  let adj = new Array(numCourses).fill(null).map(() => [])
  let inDegree = new Array(numCourses).fill(0)

  let completed = 0

  for (let i = 0; i < prerequisites.length; i++) {
    const [course, req] = prerequisites[i]
    adj[req].push(course)
    inDegree[course]++
  }

  let queue = []

  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }

  while (queue.length > 0) {
    let course = queue.shift()
    completed++
    for (let j = 0; j < adj[course].length; j++) {
      let adjDegree = --inDegree[adj[course][j]]
      if (adjDegree === 0) {
        queue.push(adj[course][j])
      }
    }
  }

  if (completed === numCourses) return true
  return false

}

/**
 * Alternativa con DFS para detección de ciclos
 * (detecta ciclos en grafo dirigido)
 */
function canFinishDFS(numCourses, prerequisites) {
  let adj = new Array(numCourses).fill(null).map(() => [])
  let status = new Array(numCourses).fill(0)

  for (let i = 0; i < prerequisites.length; i++) {
    const [course, req] = prerequisites[i]
    adj[req].push(course)
  }

  function dfs(node, adj, status) {
    if (status[node] === 2) return true
    status[node] = 1
    let res = true
    for (let i = 0; i < adj[node].length; i++) {
      if (status[adj[node][i]] === 1) return false
      if (status[adj[node][i]] === 0) {
        res = res && dfs(adj[node][i], adj, status)
        if (!res) return false
      }
    }
    status[node] = 2
    return res
  }

  let result = true
  for (let i = 0; i < numCourses; i++) {
    result = result && dfs(i, adj, status)
  }

  return result

}

// ============================================
// TESTS
// ============================================

function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== Course Schedule (LeetCode #207) ===\n');

  // Test 1: Orden simple, sin ciclo
  assert(
    canFinish(2, [[1, 0]]) === true,
    'Dos cursos, un requisito: puede completar'
  );

  // Test 2: Ciclo detectado
  assert(
    canFinish(2, [[1, 0], [0, 1]]) === false,
    'Ciclo entre dos cursos: no puede completar'
  );

  // Test 3: Sin requisitos
  assert(
    canFinish(3, []) === true,
    'Tres cursos sin requisitos: puede completar'
  );

  // Test 4: Un solo curso
  assert(
    canFinish(1, []) === true,
    'Un curso sin requisitos: puede completar'
  );

  // Test 5: Cadena lineal
  assert(
    canFinish(4, [[1, 0], [2, 1], [3, 2]]) === true,
    'Cadena lineal 0->1->2->3: puede completar'
  );

  // Test 6: Ciclo en cadena
  assert(
    canFinish(4, [[1, 0], [2, 1], [3, 2], [0, 3]]) === false,
    'Ciclo cerrado: no puede completar'
  );

  // Test 7: Grafo con múltiples componentes
  assert(
    canFinish(5, [[1, 0], [3, 2]]) === true,
    'Dos componentes independientes: puede completar'
  );

  // Test 8: Ciclo auto-referencia
  assert(
    canFinish(1, [[0, 0]]) === false,
    'Curso que depende de sí mismo: ciclo'
  );

  // Test 9: DFS - Orden simple
  assert(
    canFinishDFS(2, [[1, 0]]) === true,
    'DFS: Dos cursos, un requisito'
  );

  // Test 10: DFS - Ciclo
  assert(
    canFinishDFS(2, [[1, 0], [0, 1]]) === false,
    'DFS: Ciclo entre dos cursos'
  );

  // Test 11: Grafo más complejo sin ciclo
  assert(
    canFinish(6, [[1, 0], [2, 0], [3, 1], [3, 2], [5, 3], [5, 4], [4, 0]]) === true,
    'Grafo DAG complejo: puede completar'
  );

  // Test 12: Grafo complejo con ciclo
  assert(
    canFinish(4, [[1, 0], [2, 1], [3, 2], [0, 3]]) === false,
    'Grafo con ciclo: no puede completar'
  );

  console.log('\n✓ Todos los tests pasaron!\n');
}

runTests();

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. ACLARACIÓN INICIAL:
   - Confirmar formato: [a,b] significa "tomar b antes de a"
   - ¿Posibles ciclos? (Sí, es lo que detectamos)
   - ¿Hay duplicados en prerequisites? (Manejar con caution)

2. ENFOQUES:
   A) Kahn's Algorithm (BFS basado en in-degree):
      - Más eficiente en la práctica
      - Fácil de entender
      - Construye orden topológico

   B) DFS con detección de ciclos:
      - Usa 3 estados (no visitado, visitando, visitado)
      - Detecta back-edge = ciclo
      - Más clásico

3. COMPLEJIDAD:
   - Tiempo: O(V + E) donde V = cursos, E = prerequisites
   - Espacio: O(V + E) para grafo + cola/stack
   - V es numCourses, E es length(prerequisites)

4. CONSTRUCCIÓN DEL GRAFO:
   - prerequisite -> course (apunta AL siguiente curso)
   - Calcular in-degree para cada nodo
   - In-degree = número de prerrequisitos

5. VALIDACIÓN:
   - Si completedCourses == numCourses: no hay ciclo
   - Si < numCourses: ciclo existe
   - DFS: back-edge = ciclo

6. OPTIMIZACIONES:
   - Early exit si encontramos ciclo en DFS
   - No necesitamos el orden real (solo validación)
   - Para orden topológico: mantener topological array

7. ERRORES COMUNES:
   - Confundir dirección: b antes de a significa b->a
   - Olvidar procesar nodos sin dependencias
   - No validar que todos los nodos se procesen
   - Perder seguimiento de estados en DFS

8. VARIACIONES:
   - Retornar orden topológico (Kahn's)
   - Detectar todos los ciclos
   - Encontrar curso que causa ciclo
   - Resolver con Union-Find (ciclo = same root)
*/
