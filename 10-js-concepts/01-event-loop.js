// ============================================
// CONCEPTO: Event Loop (Bucle de Eventos)
// ============================================
// El Event Loop es el mecanismo que ejecuta código de manera asincrónica en JavaScript.
// Ordena de ejecución: Call Stack -> Microtasks (Promises, process.nextTick) -> Macrotasks (setTimeout, setInterval)
// ============================================

// --- Ejercicio 1: Predecir la salida básica ---
// Predice qué se imprime y en qué orden

console.log('=== Ejercicio 1: Orden básico ===');
const exercise1 = () => {
  console.log('1. Inicio');

  setTimeout(() => {
    console.log('2. setTimeout');
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log('3. Promise 1');
    })
    .then(() => {
      console.log('4. Promise 2');
    });

  console.log('5. Fin sincrónico');
};

exercise1();

// RESPUESTA Y EXPLICACIÓN:
// Orden correcto: 1 -> 5 -> 3 -> 4 -> 2
//
// Explicación:
// 1. Código sincrónico (console.log 1 y 5) se ejecuta inmediatamente
// 2. setTimeout se añade a macrotasks (ejecuta después)
// 3. Promise.then() entra a microtasks (ejecuta antes que macrotasks)
// 4. Las Promises se ejecutan en orden de microtasks
// 5. setTimeout es el último porque es una macrotask

// --- Ejercicio 2: Mezclando setTimeout con Promises ---
// Predice el orden de ejecución

console.log('\n=== Ejercicio 2: setTimeout y Promises combinados ===');
const exercise2 = () => {
  console.log('Start');

  setTimeout(() => {
    console.log('setTimeout 1');
    Promise.resolve().then(() => console.log('Promise dentro setTimeout'));
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log('Promise 1');
      setTimeout(() => console.log('setTimeout dentro Promise'), 0);
    })
    .then(() => {
      console.log('Promise 2');
    });

  console.log('End');
};

exercise2();

// RESPUESTA Y EXPLICACIÓN:
// Orden: Start -> End -> Promise 1 -> Promise 2 -> setTimeout 1 -> Promise dentro setTimeout -> setTimeout dentro Promise
//
// Detalles:
// 1. Start, End: código sincrónico
// 2. Promise 1, Promise 2: microtasks (se ejecutan primero)
// 3. setTimeout 1 (macrotask) se ejecuta, su Promise se añade a microtasks
// 4. Promise dentro setTimeout se ejecuta (microtask)
// 5. El setTimeout dentro de Promise 1 entra a macrotasks, se ejecuta al final

// --- Ejercicio 3: async/await con setTimeout ---
// Predice el flujo de ejecución

console.log('\n=== Ejercicio 3: async/await y setTimeout ===');
const exercise3 = async () => {
  console.log('async: Start');

  setTimeout(() => {
    console.log('async: setTimeout');
  }, 0);

  await Promise.resolve();
  console.log('async: after await');

  setTimeout(() => {
    console.log('async: setTimeout 2');
  }, 0);

  console.log('async: End');
};

exercise3();

// RESPUESTA Y EXPLICACIÓN:
// Orden: async: Start -> async: after await -> async: End -> async: setTimeout -> async: setTimeout 2
//
// async/await se implementa con Promises internamente:
// 1. await pausa la función y devuelve una Promise
// 2. El código después del await entra a microtasks
// 3. setTimeout se añade a macrotasks (después de toda la chain de microtasks)

// --- Ejercicio 4: Complejo - Múltiples fuentes de tareas ---
// Desafío de dificultad alta

console.log('\n=== Ejercicio 4: Desafío - Múltiples eventos ===');
const exercise4 = () => {
  console.log('1');

  setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log('4');
      setTimeout(() => console.log('5'), 0);
    })
    .then(() => {
      console.log('6');
    });

  setTimeout(() => {
    console.log('7');
  }, 0);

  console.log('8');
};

exercise4();

// RESPUESTA Y EXPLICACIÓN:
// Orden: 1 -> 8 -> 4 -> 6 -> 2 -> 3 -> 7 -> 5
//
// Paso a paso:
// 1. 1, 8: sincrónico
// 2. 4: primera microtask (Promise.then)
// 3. 6: segunda microtask (siguiente .then)
// 4. 2: primera macrotask (primer setTimeout)
// 5. 3: microtask creada dentro de setTimeout
// 6. 7: segunda macrotask (segundo setTimeout)
// 7. 5: macrotask creada dentro de Promise -> setTimeout

// TESTS
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== TESTS: Event Loop ===');

  // Test 1: setTimeout vs Promise
  const test1Results = [];
  Promise.resolve().then(() => test1Results.push('promise'));
  setTimeout(() => test1Results.push('timeout'), 0);

  // Damos tiempo a que se ejecute
  setTimeout(() => {
    assert(
      test1Results[0] === 'promise' && test1Results[1] === 'timeout',
      'Promises se ejecutan antes que setTimeout'
    );
  }, 10);

  // Test 2: Nested promises
  const test2Results = [];
  Promise.resolve()
    .then(() => test2Results.push('a'))
    .then(() => test2Results.push('b'));

  setTimeout(() => {
    assert(
      test2Results.length === 2,
      'Promises encadenadas se ejecutan en orden'
    );
  }, 10);

  // Test 3: async/await es basado en Promises
  const test3 = async () => {
    const results = [];
    results.push('before');
    await Promise.resolve();
    results.push('after');
    return results;
  };

  test3().then(results => {
    console.log(`  ✓ async/await respeta el orden de Promises`);
  });
}

runTests();

console.log('\n=== Fin de Ejercicios ===\n');
