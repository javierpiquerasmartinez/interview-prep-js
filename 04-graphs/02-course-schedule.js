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
// Patrón: Topological Sort (Kahn's Algorithm - BFS)
// ============================================

/**
 * Determina si todos los cursos pueden ser terminados
 * usando detección de ciclos con Topological Sort (BFS)
 * @param {number} numCourses - Número total de cursos
 * @param {number[][]} prerequisites - Lista de [curso, requisito]
 * @returns {boolean} true si se pueden terminar todos los cursos
 */
function canFinish(numCourses, prerequisites) {
  // Construir grafo de adyacencia y array de in-degree
  const indegree = new Array(numCourses).fill(0);
  const adjacencyList = Array.from({ length: numCourses }, () => []);

  // Llenar el grafo y calcular in-degrees
  for (const [course, prerequisite] of prerequisites) {
    // prerequisite -> course (curso se puede tomar después del requisito)
    adjacencyList[prerequisite].push(course);
    indegree[course]++;
  }

  // Kahn's Algorithm: BFS basado en in-degree
  const queue = [];

  // Encontrar todos los nodos sin dependencias (in-degree = 0)
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  let completedCourses = 0;

  // Procesar nodos sin dependencias
  while (queue.length > 0) {
    const course = queue.shift();
    completedCourses++;

    // Reducir in-degree de vecinos
    for (const nextCourse of adjacencyList[course]) {
      indegree[nextCourse]--;

      // Si un vecino ya no tiene dependencias, agregarlo a cola
      if (indegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // Si completamos todos los cursos, no hay ciclo
  return completedCourses === numCourses;
}

/**
 * Alternativa con DFS para detección de ciclos
 * (detecta ciclos en grafo dirigido)
 */
function canFinishDFS(numCourses, prerequisites) {
  const adjacencyList = Array.from({ length: numCourses }, () => []);

  // Construir grafo
  for (const [course, prerequisite] of prerequisites) {
    adjacencyList[prerequisite].push(course);
  }

  // Estados: 0 = no visitado, 1 = visitando, 2 = visitado
  const state = new Array(numCourses).fill(0);

  function hasCycle(course) {
    // Si estamos visitando nodo actual nuevamente = ciclo
    if (state[course] === 1) return true;
    // Si ya fue visitado completamente = no hay ciclo
    if (state[course] === 2) return false;

    // Marcar como visitando
    state[course] = 1;

    // Revisar todos los vecinos
    for (const nextCourse of adjacencyList[course]) {
      if (hasCycle(nextCourse)) {
        return true;
      }
    }

    // Marcar como completamente visitado
    state[course] = 2;
    return false;
  }

  // Revisar ciclo desde cada nodo
  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (hasCycle(i)) {
        return false; // Ciclo encontrado
      }
    }
  }

  return true; // Sin ciclos
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
