// ============================================
// CONCEPTO: Promises y Async/Await
// ============================================
// Promises manejan operaciones asincrónicas.
// Estados: pending -> fulfilled (resolved) | rejected
// async/await es sintaxis para trabajar con Promises de forma más legible.
// ============================================

// --- Ejercicio 1: Promise.all ---
console.log('=== Ejercicio 1: Promise.all ===');

const exercise1 = async () => {
  const p1 = Promise.resolve(1);
  const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 100));
  const p3 = Promise.resolve(3);

  console.log('Esperando Promise.all...');
  const results = await Promise.all([p1, p2, p3]);
  console.log('Resultados:', results); // [1, 2, 3]
  console.log('Tiempo: ~100ms (el más lento)');
};

exercise1();

// EXPLICACIÓN:
// Promise.all espera TODAS las promises
// Retorna un array con los resultados en el mismo orden
// Si una promise falla, Promise.all falla inmediatamente
// Es más rápido que secuencial

// --- Ejercicio 2: Promise.race ---
console.log('\n=== Ejercicio 2: Promise.race ===');

const exercise2 = async () => {
  const p1 = new Promise((resolve) => setTimeout(() => resolve('lento'), 500));
  const p2 = new Promise((resolve) => setTimeout(() => resolve('rápido'), 100));

  console.log('Usando Promise.race...');
  const result = await Promise.race([p1, p2]);
  console.log('Ganador:', result); // 'rápido'
};

exercise2();

// EXPLICACIÓN:
// Promise.race retorna el resultado de la primera promise que se resuelva
// Ignora el resto de promises
// Útil para timeouts o cuando solo necesitas un resultado

// --- Ejercicio 3: Promise.allSettled ---
console.log('\n=== Ejercicio 3: Promise.allSettled ===');

const exercise3 = async () => {
  const p1 = Promise.resolve(1);
  const p2 = Promise.reject(new Error('Error en p2'));
  const p3 = Promise.resolve(3);

  console.log('Usando Promise.allSettled...');
  const results = await Promise.allSettled([p1, p2, p3]);
  console.log('Resultados:');
  results.forEach((result) => {
    console.log(result);
    // { status: 'fulfilled', value: 1 }
    // { status: 'rejected', reason: Error }
    // { status: 'fulfilled', value: 3 }
  });
};

exercise3();

// EXPLICACIÓN:
// Promise.allSettled espera TODAS las promises (resueltas o rechazadas)
// Retorna un array de objetos con {status, value/reason}
// Es más útil que all cuando quieres todos los resultados sin importar errores

// --- Ejercicio 4: Ejecución secuencial vs paralela ---
console.log('\n=== Ejercicio 4: Secuencial vs Paralela ===');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Secuencial (lento)
const sequentialVersion = async () => {
  console.time('Secuencial');
  const r1 = await delay(100);
  const r2 = await delay(100);
  const r3 = await delay(100);
  console.timeEnd('Secuencial'); // ~300ms
};

// Paralela (rápido)
const parallelVersion = async () => {
  console.time('Paralela');
  const [r1, r2, r3] = await Promise.all([delay(100), delay(100), delay(100)]);
  console.timeEnd('Paralela'); // ~100ms
};

console.log('Comparación de velocidad:');
(async () => {
  await sequentialVersion();
  await parallelVersion();
})();

// EXPLICACIÓN:
// Secuencial: espera cada operación antes de la siguiente (suma tiempos)
// Paralela: todas se ejecutan simultáneamente (toma el tiempo del más lento)
// Usa paralela cuando las operaciones son independientes

// --- Ejercicio 5: Manejo de errores con async/await ---
console.log('\n=== Ejercicio 5: Manejo de errores ===');

const unreliableAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('API falló')), 100);
  });
};

const withTryCatch = async () => {
  try {
    const result = await unreliableAPI();
    console.log('Éxito:', result);
  } catch (error) {
    console.log('Error atrapado:', error.message);
  }
};

const withCatch = async () => {
  const result = await unreliableAPI().catch((error) => {
    console.log('Error en .catch:', error.message);
    return 'valor por defecto';
  });
  return result;
};

(async () => {
  await withTryCatch();
  const res = await withCatch();
  console.log('Resultado:', res);
})();

// EXPLICACIÓN:
// try/catch es más legible para errores sincronos y asincronos
// .catch() es útil para casos específicos
// Siempre maneja errores en código asincrónico

// --- Ejercicio 6: Implementar Promise.all desde cero ---
console.log('\n=== Ejercicio 6: Implementar Promise.all ===');

const myPromiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises) || promises.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// Test la implementación
const testCustomPromiseAll = async () => {
  const p1 = Promise.resolve(10);
  const p2 = new Promise((resolve) => setTimeout(() => resolve(20), 50));
  const p3 = Promise.resolve(30);

  console.log('Probando Promise.all personalizado...');
  const results = await myPromiseAll([p1, p2, p3]);
  console.log('Resultados:', results); // [10, 20, 30]
};

testCustomPromiseAll();

// EXPLICACIÓN:
// Promise.all debe:
// 1. Esperar TODAS las promises
// 2. Mantener el orden de los resultados
// 3. Rechazar si una promise falla
// 4. Resolver inmediatamente si el array está vacío

// --- Ejercicio 7: async/await y loops ---
console.log('\n=== Ejercicio 7: async/await en loops ===');

const exercise7 = async () => {
  const items = [1, 2, 3];

  // MALO: crea 3 promises pero no espera a las anteriores
  console.log('Paralela (mejor para independientes):');
  const promises = items.map((item) => delay(50).then(() => item * 2));
  const resultsParallel = await Promise.all(promises);
  console.log('Resultados:', resultsParallel);

  // BIEN: espera en serie
  console.log('Serial (mejor para dependencias):');
  const resultsSerial = [];
  for (const item of items) {
    await delay(50);
    resultsSerial.push(item * 2);
  }
  console.log('Resultados:', resultsSerial);
};

exercise7();

// EXPLICACIÓN:
// Usa map() + Promise.all para operaciones paralelas
// Usa for...of + await para operaciones secuenciales
// La elección depende si las operaciones dependen unas de otras

// TESTS
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== TESTS: Promises & Async ===');

  // Test 1: Promise.all
  (async () => {
    const results = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);
    assert(
      Array.isArray(results) && results[0] === 1 && results[1] === 2,
      'Promise.all retorna array de resultados'
    );
  })();

  // Test 2: Promise.all falla si una falla
  (async () => {
    try {
      await Promise.all([Promise.resolve(1), Promise.reject(new Error('fail'))]);
      assert(false, 'Debería haber rechazado');
    } catch (e) {
      assert(true, 'Promise.all rechaza si una promise falla');
    }
  })();

  // Test 3: Promise.allSettled no falla
  (async () => {
    const results = await Promise.allSettled([
      Promise.resolve(1),
      Promise.reject(new Error('fail')),
    ]);
    assert(
      results[0].status === 'fulfilled' && results[1].status === 'rejected',
      'Promise.allSettled retorna todos los estados'
    );
  })();

  // Test 4: async/await básico
  (async () => {
    const result = await Promise.resolve(42);
    assert(result === 42, 'await espera promise');
  })();

  // Test 5: try/catch con async
  (async () => {
    try {
      await Promise.reject(new Error('test'));
      assert(false, 'Debería haber fallado');
    } catch (e) {
      assert(e.message === 'test', 'try/catch atrapa errores de promise');
    }
  })();

  // Test 6: myPromiseAll personalizado
  (async () => {
    const results = await myPromiseAll([Promise.resolve(5), Promise.resolve(10)]);
    assert(Array.isArray(results) && results[0] === 5, 'myPromiseAll funciona');
  })();
}

runTests();

console.log('\n=== Fin de Ejercicios ===\n');
