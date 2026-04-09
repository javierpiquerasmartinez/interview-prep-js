// ============================================
// CONCEPTO: Patrones avanzados de JavaScript
// ============================================
// Patrones funcionales y utilitarios que aparecen constantemente en entrevistas.
// Se espera que puedas implementarlos desde cero.
// ============================================

// --- Ejercicio 1: Debounce ---
// Espera a que paren los eventos antes de ejecutar

console.log('=== Ejercicio 1: Debounce ===');

const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Ejemplo: búsqueda en tiempo real
let searchCount = 0;
const expensiveSearch = (query) => {
  searchCount++;
  console.log(`Búsqueda #${searchCount}: "${query}"`);
};

const debouncedSearch = debounce(expensiveSearch, 300);

console.log('Simulando keypresses rápidos...');
debouncedSearch('j');
debouncedSearch('ja');
debouncedSearch('jav');
debouncedSearch('java');
debouncedSearch('javascript');

// Solo se ejecuta UNA VEZ después de 300ms de inactividad
setTimeout(() => {
  console.log(`Total de búsquedas ejecutadas: ${searchCount}`);
}, 500);

// EXPLICACIÓN:
// Debounce cancela el timer anterior cada vez que se llama
// Solo ejecuta cuando deja de haber llamadas por 'delay' ms
// Muy útil para: búsquedas, resize, input en formularios

// --- Ejercicio 2: Throttle ---
// Ejecuta como máximo cada X milisegundos

console.log('\n=== Ejercicio 2: Throttle ===');

const throttle = (func, limit) => {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Ejemplo: evento de scroll
let scrollCount = 0;
const onScroll = () => {
  scrollCount++;
  console.log(`Scroll event #${scrollCount}`);
};

const throttledScroll = throttle(onScroll, 200);

console.log('Simulando scroll rápido...');
throttledScroll();
throttledScroll();
throttledScroll(); // Ignorado
throttledScroll(); // Ignorado

setTimeout(() => {
  throttledScroll(); // Ejecutado (200ms pasaron)
  console.log(`Total scrolls ejecutados: ${scrollCount}`);
}, 250);

// EXPLICACIÓN:
// Throttle permite ejecutar como máximo cada 'limit' ms
// Ignora llamadas durante el periodo
// Muy útil para: scroll, mouse move, resize eventos frecuentes

// --- Ejercicio 3: Curry Function ---
// Convierte function(a, b, c) en function(a)(b)(c)

console.log('\n=== Ejercicio 3: Curry Function ===');

const curry = (func) => {
  const arity = func.length; // Número de parámetros

  return function curried(...args) {
    if (args.length >= arity) {
      return func.apply(this, args);
    } else {
      return (...nextArgs) => curried.apply(this, args.concat(nextArgs));
    }
  };
};

// Ejemplo
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log('Curry de add(a, b, c):');
console.log('curriedAdd(1)(2)(3):', curriedAdd(1)(2)(3)); // 6
console.log('curriedAdd(1, 2)(3):', curriedAdd(1, 2)(3)); // 6
console.log('curriedAdd(1)(2, 3):', curriedAdd(1)(2, 3)); // 6

// Beneficio: creación de funciones especializadas
const add5And = curriedAdd(5);
const add5And10 = add5And(10);
console.log('add5And10(20):', add5And10(20)); // 35

// EXPLICACIÓN:
// Curry divide una función en funciones de un solo argumento
// Permite aplicación parcial (partial application)
// Muy usado en programación funcional

// --- Ejercicio 4: Deep Clone (copia profunda) ---
// Copiar objeto con todos los niveles anidados

console.log('\n=== Ejercicio 4: Deep Clone ===');

const deepClone = (obj, seen = new WeakMap()) => {
  // Manejar primitivos y null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Detectar ciclos
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  // Manejar Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Manejar Array
  if (Array.isArray(obj)) {
    const cloned = [];
    seen.set(obj, cloned);
    obj.forEach((item, index) => {
      cloned[index] = deepClone(item, seen);
    });
    return cloned;
  }

  // Manejar Object
  const cloned = {};
  seen.set(obj, cloned);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key], seen);
    }
  }
  return cloned;
};

// Ejemplo con objeto anidado complejo
const original = {
  name: 'Alice',
  hobbies: ['lectura', 'código'],
  address: {
    city: 'NYC',
    coords: { lat: 40, lng: -74 },
  },
  joinDate: new Date(2020, 0, 1),
};

const cloned = deepClone(original);
cloned.address.city = 'LA';
cloned.hobbies[0] = 'programación';

console.log('Original city:', original.address.city); // NYC
console.log('Cloned city:', cloned.address.city); // LA
console.log('Original hobby:', original.hobbies[0]); // lectura
console.log('Cloned hobby:', cloned.hobbies[0]); // programación

// EXPLICACIÓN:
// Deep clone copia recursivamente todo el árbol de objetos
// Maneja referencias cíclicas con WeakMap
// JSON.stringify funciona para objetos simples pero pierde funciones y Dates

// --- Ejercicio 5: Implementar Array.flat() ---
// Aplanar arrays anidados

console.log('\n=== Ejercicio 5: Array.flat ===');

const flatArray = (arr, depth = Infinity) => {
  if (depth === 0) return arr;

  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatArray(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};

console.log('Array sin aplanar: [1, [2, [3, [4]]]]');
console.log('flat(0):', flatArray([1, [2, [3, [4]]]], 0)); // [1, [2, [3, [4]]]]
console.log('flat(1):', flatArray([1, [2, [3, [4]]]], 1)); // [1, 2, [3, [4]]]
console.log('flat(2):', flatArray([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]
console.log('flat(Infinity):', flatArray([1, [2, [3, [4]]]])); // [1, 2, 3, 4]

// EXPLICACIÓN:
// Reduce + recursión para aplanar arrays
// El parámetro depth controla cuántos niveles aplanar
// Infinity aplana completamente

// --- Ejercicio 6: Memoize (decorador de caché) ---
// Cachear resultados de función

console.log('\n=== Ejercicio 6: Memoize ===');

const memoize = (func) => {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`  (cache hit para args: ${key})`);
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// Función costosa
const expensiveCalculation = (n) => {
  console.log(`  Calculando fib(${n})...`);
  if (n <= 1) return n;
  return expensiveCalculation(n - 1) + expensiveCalculation(n - 2);
};

const memoizedFib = memoize(expensiveCalculation);

console.log('Primera llamada:');
const result1 = memoizedFib(5);
console.log(`fib(5) = ${result1}`);

console.log('\nSegunda llamada (del caché):');
const result2 = memoizedFib(5);
console.log(`fib(5) = ${result2}`);

// EXPLICACIÓN:
// Memoize crea un caché basado en los argumentos
// Las llamadas posteriores con los mismos argumentos usan el caché
// Mejora dramáticamente la performance de funciones puras

// --- Ejercicio 7: Partial Application ---
// Fijar algunos argumentos de una función

console.log('\n=== Ejercicio 7: Partial Application ===');

const partial = (func, ...fixedArgs) => {
  return (...moreArgs) => func(...fixedArgs, ...moreArgs);
};

const multiply = (a, b, c) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiplyBy2, 3);

console.log('multiply(2, 3, 4):', multiply(2, 3, 4)); // 24
console.log('multiplyBy2(3, 4):', multiplyBy2(3, 4)); // 24
console.log('multiplyBy2And3(4):', multiplyBy2And3(4)); // 24

// EXPLICACIÓN:
// Partial application fija algunos argumentos
// Retorna una nueva función que espera los argumentos restantes
// Diferente de curry: partial espera todos al mismo tiempo, curry uno por uno

// TESTS
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== TESTS: Advanced Patterns ===');

  // Test 1: Debounce
  let callCount = 0;
  const debouncedFunc = debounce(() => callCount++, 100);
  debouncedFunc();
  debouncedFunc();
  debouncedFunc();
  setTimeout(() => {
    assert(callCount === 1, 'Debounce ejecuta una sola vez');
  }, 150);

  // Test 2: Throttle
  let throttleCount = 0;
  const throttledFunc = throttle(() => throttleCount++, 100);
  throttledFunc();
  throttledFunc();
  throttledFunc();
  assert(throttleCount === 1, 'Throttle ejecuta inmediatamente');

  // Test 3: Curry
  const curriedMultiply = curry((a, b, c) => a * b * c);
  assert(curriedMultiply(2)(3)(4) === 24, 'Curry funciona');
  assert(curriedMultiply(2, 3)(4) === 24, 'Curry parcial funciona');

  // Test 4: Deep Clone
  const obj = { a: { b: { c: 1 } } };
  const clonedObj = deepClone(obj);
  clonedObj.a.b.c = 2;
  assert(obj.a.b.c === 1, 'Deep clone es independiente');

  // Test 5: Flat Array
  const nested = [1, [2, [3, 4]]];
  const flat1 = flatArray(nested, 1);
  assert(flat1.length === 3, 'flatArray(depth=1) funciona');
  const flatAll = flatArray(nested);
  assert(flatAll[3] === 4, 'flatArray(infinity) aplana completamente');

  // Test 6: Memoize
  let calcCount = 0;
  const countingFunc = () => {
    calcCount++;
    return 42;
  };
  const memoized = memoize(countingFunc);
  memoized();
  memoized();
  assert(calcCount === 1, 'Memoize cachea resultados');

  // Test 7: Partial
  const divide = (a, b) => a / b;
  const divideBy2 = partial(divide, 10);
  assert(divideBy2(2) === 5, 'Partial application funciona');
}

runTests();

console.log('\n=== Fin de Ejercicios ===\n');
