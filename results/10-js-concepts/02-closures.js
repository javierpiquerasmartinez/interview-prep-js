// ============================================
// CONCEPTO: Closures (Cierres)
// ============================================
// Un closure es una función que captura y "recuerda" variables del scope externo,
// incluso después de que la función externa haya terminado de ejecutarse.
// Las funciones en JavaScript siempre crean closures.
// ============================================

// --- Ejercicio 1: El clásico bug del for-loop ---
// Predice qué imprime este código

console.log('=== Ejercicio 1: Bug del for-loop con var ===');
const exercise1Bug = () => {
  console.log('Bug con VAR:');
  var functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push(function () {
      return i;
    });
  }

  functions.forEach((fn, index) => {
    console.log(`Función ${index} retorna: ${fn()}`);
  });
};

exercise1Bug();

// RESPUESTA Y EXPLICACIÓN:
// Salida: Función 0 retorna: 3, Función 1 retorna: 3, Función 2 retorna: 3
//
// ¿Por qué? Con 'var', la variable i es function-scoped (no block-scoped).
// Todas las funciones comparten la MISMA variable i.
// Cuando las funciones se ejecutan, i ya es 3 (después del loop).

// --- Ejercicio 1b: Soluciones al bug ---
console.log('\nSoluciones al bug:\n');

console.log('Solución 1: Usar LET (recomendado)');
const exercise1Fix1 = () => {
  let functions = [];

  for (let i = 0; i < 3; i++) {
    functions.push(function () {
      return i;
    });
  }

  functions.forEach((fn, index) => {
    console.log(`  Función ${index} retorna: ${fn()}`);
  });
};

exercise1Fix1();

// EXPLICACIÓN: Con 'let', cada iteración crea una NUEVA variable i en su propio scope.
// Cada función captura su propia i.

console.log('\nSolución 2: IIFE (Immediately Invoked Function Expression)');
const exercise1Fix2 = () => {
  var functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push(
      (function (j) {
        return function () {
          return j;
        };
      })(i)
    );
  }

  functions.forEach((fn, index) => {
    console.log(`  Función ${index} retorna: ${fn()}`);
  });
};

exercise1Fix2();

// EXPLICACIÓN: La IIFE crea un nuevo scope con su propio parámetro j.
// Cada función captura su propia j.

// --- Ejercicio 2: Variables privadas con closures ---
// Implementar un patrón común de privacidad

console.log('\n=== Ejercicio 2: Variables privadas con closures ===');

const createCounter = () => {
  let count = 0; // Variable privada

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
};

const counter = createCounter();
console.log('Incrementar:', counter.increment()); // 1
console.log('Incrementar:', counter.increment()); // 2
console.log('Decrementar:', counter.decrement()); // 1
console.log('Obtener:', counter.getCount()); // 1

// EXPLICACIÓN:
// La variable 'count' NO es accesible directamente desde afuera.
// Solo se puede acceder a través de los métodos que tienen acceso al closure.
// Esto crea una auténtica variable privada.

// --- Ejercicio 3: Function Factories (Fábricas de funciones) ---
// Crear múltiples funciones con comportamiento personalizado

console.log('\n=== Ejercicio 3: Function Factories ===');

const createMultiplier = (factor) => {
  return function (number) {
    return number * factor;
  };
};

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log('Double 5:', double(5)); // 10
console.log('Triple 5:', triple(5)); // 15
console.log('Quadruple 5:', quadruple(5)); // 20

// EXPLICACIÓN:
// createMultiplier retorna una función que "recuerda" el parámetro factor.
// Cada función devuelta es independiente pero comparte la lógica.
// Muy útil para crear funciones personalizadas.

// --- Ejercicio 4: Memoización usando closures ---
// Cachear resultados de funciones costosas

console.log('\n=== Ejercicio 4: Memoización ===');

const createMemoizedFibonacci = () => {
  const cache = {}; // Cache privado

  return function fib(n) {
    if (n in cache) {
      console.log(`  (cache hit para fib(${n}))`);
      return cache[n];
    }

    if (n <= 1) {
      return n;
    }

    const result = fib(n - 1) + fib(n - 2);
    cache[n] = result;
    return result;
  };
};

const fibonacci = createMemoizedFibonacci();

console.log('Primera llamada fib(5):');
const result1 = fibonacci(5);
console.log('Resultado:', result1);

console.log('\nSegunda llamada fib(5):');
const result2 = fibonacci(5);
console.log('Resultado:', result2);

// EXPLICACIÓN:
// El objeto 'cache' es privado al closure.
// La función memoizada solo calcula valores que no están en caché.
// Esto mejora dramáticamente la performance en funciones recursivas.

// --- Ejercicio 5: Captura de variables en bucles (desafío) ---
// Predice qué imprime

console.log('\n=== Ejercicio 5: Captura de variables en bucles ===');

const exercise5 = () => {
  const operations = [];

  for (let i = 0; i < 3; i++) {
    operations.push(() => {
      let x = i * 2;
      return () => x;
    });
  }

  console.log('Resultado:');
  operations.forEach((opFactory, idx) => {
    const operation = opFactory();
    console.log(`  Operación ${idx}: ${operation()}`);
  });
};

exercise5();

// RESPUESTA: 0, 2, 4
// EXPLICACIÓN:
// 'let i' crea una nueva variable en cada iteración.
// Cada closure captura su propia i.
// La función anidada captura la variable x = i * 2.

// TESTS
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== TESTS: Closures ===');

  // Test 1: Variables privadas
  const counter1 = createCounter();
  counter1.increment();
  counter1.increment();
  assert(counter1.getCount() === 2, 'Contador privado funciona correctamente');
  assert(
    counter1.count === undefined,
    'Variable count es verdaderamente privada'
  );

  // Test 2: Cada closure es independiente
  const counter2 = createCounter();
  assert(counter2.getCount() === 0, 'Nuevos closures tienen estado independiente');

  // Test 3: Function factories
  const times5 = createMultiplier(5);
  assert(times5(2) === 10, 'Function factory crea funciones personalizadas');
  assert(times5(3) === 15, 'Function factory maneja múltiples llamadas');

  // Test 4: Memoización
  let callCount = 0;
  const memoizedFunc = (() => {
    const cache = {};
    return (x) => {
      if (x in cache) return cache[x];
      callCount++;
      cache[x] = x * 2;
      return cache[x];
    };
  })();

  memoizedFunc(5);
  memoizedFunc(5);
  assert(callCount === 1, 'Memoización evita cálculos duplicados');

  // Test 5: Closure captura variables correctamente
  const makeAdder = (a) => (b) => a + b;
  const add10 = makeAdder(10);
  assert(add10(5) === 15, 'Closures anidados capturan variables correctamente');
}

runTests();

console.log('\n=== Fin de Ejercicios ===\n');
