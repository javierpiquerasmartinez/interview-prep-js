// ============================================
// CONCEPTO: this Keyword (La palabra clave 'this')
// ============================================
// 'this' es una referencia al objeto que está "ejecutando" el código en ese momento.
// Su valor depende de CÓMO se llama la función, no de dónde está definida.
// ============================================

// --- Ejercicio 1: this en funciones regulares vs arrow functions ---
console.log('=== Ejercicio 1: Funciones regulares vs Arrow Functions ===');

const obj = {
  name: 'Objeto',
  regularMethod() {
    console.log('Regular:', this.name);
  },
  arrowMethod: () => {
    console.log('Arrow:', this.name);
  },
};

obj.regularMethod(); // "Objeto" - this se refiere a obj
obj.arrowMethod(); // undefined - this se refiere al scope global (en Node.js, undefined)

// EXPLICACIÓN:
// - En funciones regulares, 'this' está determinado por cómo se llama
// - En arrow functions, 'this' está determinado por el scope donde fue definida
// - Arrow functions NO tienen su propio 'this'

// --- Ejercicio 2: El problema de this en callbacks ---
console.log('\n=== Ejercicio 2: this en callbacks ===');

const user = {
  name: 'Alice',
  greet() {
    console.log(`Hola, soy ${this.name}`);
  },
  delayedGreet() {
    setTimeout(this.greet, 100); // BUG: this se pierde
  },
  delayedGreetFixed() {
    setTimeout(() => this.greet(), 100); // FIXED: arrow function preserva this
  },
};

// user.delayedGreet(); // ERROR: this.name es undefined

console.log('Con arrow function (correcto):');
user.delayedGreetFixed();

// EXPLICACIÓN:
// setTimeout recibe la función sin contexto (desvinculada)
// Con arrow function, 'this' viene del scope externo

// --- Ejercicio 3: bind, call, apply ---
console.log('\n=== Ejercicio 3: bind, call, apply ===');

function introduce(greeting) {
  console.log(`${greeting}, soy ${this.name}`);
}

const person1 = { name: 'Bob' };
const person2 = { name: 'Carol' };

// call: ejecuta inmediatamente
console.log('call:');
introduce.call(person1, 'Hola');

// apply: igual a call pero con array de argumentos
console.log('apply:');
introduce.apply(person2, ['Hola']);

// bind: retorna una nueva función con this vinculado
console.log('bind:');
const greetBob = introduce.bind(person1);
greetBob('Hola');

// EXPLICACIÓN:
// call(this, arg1, arg2, ...): ejecuta con argumentos individuales
// apply(this, [arg1, arg2, ...]): ejecuta con array de argumentos
// bind(this, arg1, arg2, ...): retorna nueva función, puede tener argumentos predefinidos (currying)

// --- Ejercicio 4: Method borrowing ---
console.log('\n=== Ejercicio 4: Method Borrowing ===');

const arr = [1, 2, 3];
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};

// Usar método de Array en objeto array-like
console.log('Usando Array.prototype.join:');
const result = Array.prototype.join.call(arrayLike, ', ');
console.log('Resultado:', result); // "a, b, c"

// EXPLICACIÓN:
// Podemos tomar métodos de un objeto y usarlos en otro objeto
// Siempre y cuando el método acceda a propiedades que el otro objeto tenga
// Muy útil para compatibilidad y reutilización de código

// --- Ejercicio 5: this en métodos de clase ---
console.log('\n=== Ejercicio 5: this en clases ===');

class Button {
  constructor(name) {
    this.name = name;
  }

  // Método regular - this depende de cómo se llama
  handleClick() {
    console.log(`Click en ${this.name}`);
  }

  // Método con arrow - this siempre se refiere a la instancia
  handleClickArrow = () => {
    console.log(`Click (arrow) en ${this.name}`);
  };
}

const btn = new Button('Botón A');
btn.handleClick(); // Funciona

// Problema: si sacamos la función del contexto, se pierde this
const handleClickMethod = btn.handleClick;
// handleClickMethod(); // ERROR: this es undefined

// Solución 1: usar arrow function en la clase
const handleClickArrowMethod = btn.handleClickArrow;
handleClickArrowMethod(); // Funciona porque arrow preserva this

// Solución 2: usar bind
const boundHandle = btn.handleClick.bind(btn);
boundHandle(); // Funciona

// EXPLICACIÓN:
// En clases, los métodos regulares pierden 'this' si se desvinculan
// Las propiedades con arrow functions preservan 'this' porque capturan el 'this' de la instancia

// --- Ejercicio 6: Predice qué es 'this' (desafío) ---
console.log('\n=== Ejercicio 6: Predicción de this (desafío) ===');

const exercise6 = () => {
  const obj = {
    prop: 'valor',
    method() {
      return () => this;
    },
  };

  const arrow = obj.method();
  console.log('this en arrow function:', arrow() === obj); // true
  console.log('Explicación: arrow captura this de method, que es obj');

  // Otro caso:
  const obj2 = {
    prop: 'valor2',
    method: function () {
      const inner = function () {
        console.log('this en inner:', this);
      };
      inner();
    },
  };

  obj2.method(); // this es undefined (o global en modo no estricto)
};

exercise6();

// EXPLICACIÓN:
// La arrow function captura el 'this' lexical (del scope donde fue definida)
// La función inner() no está vinculada a nada, su this es undefined

// TESTS
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== TESTS: this keyword ===');

  // Test 1: this en métodos
  const testObj1 = {
    value: 42,
    getValue() {
      return this.value;
    },
  };
  assert(testObj1.getValue() === 42, 'this en métodos se refiere al objeto');

  // Test 2: call y apply
  const testObj2 = { value: 100 };
  function getValue() {
    return this.value;
  }
  assert(getValue.call(testObj2) === 100, 'call vincula this correctamente');
  assert(getValue.apply(testObj2) === 100, 'apply vincula this correctamente');

  // Test 3: bind
  const testObj3 = { name: 'test' };
  function greet() {
    return this.name;
  }
  const boundGreet = greet.bind(testObj3);
  assert(boundGreet() === 'test', 'bind crea función con this vinculado');

  // Test 4: arrow functions heredan this
  const testObj4 = {
    value: 50,
    getArrow() {
      return (() => this.value)();
    },
  };
  assert(testObj4.getArrow() === 50, 'arrow functions heredan this del scope');

  // Test 5: method borrowing
  const source = { getValue: function () { return this.x; } };
  const target = { x: 999 };
  assert(source.getValue.call(target) === 999, 'method borrowing funciona');

  // Test 6: this en class
  class TestClass {
    constructor() {
      this.value = 77;
    }
    getValue() {
      return this.value;
    }
  }
  const instance = new TestClass();
  const extractedMethod = instance.getValue;
  // Sin bind, this sería undefined
  const boundMethod = instance.getValue.bind(instance);
  assert(boundMethod() === 77, 'bind funciona con métodos de clase');
}

runTests();

console.log('\n=== Fin de Ejercicios ===\n');
