// ============================================
// CONCEPTO: Prototypes y Herencia Prototípica
// ============================================
// JavaScript usa herencia basada en prototipos, no en clases (aunque tiene sintaxis de class).
// Cada objeto tiene una referencia interna [[Prototype]] que forma una cadena de búsqueda.
// ============================================

// --- Ejercicio 1: Prototype chain básica ---
console.log('=== Ejercicio 1: Prototype Chain ===');

const exercise1 = () => {
  const animal = {
    kind: 'animal',
    speak() {
      console.log(`${this.name} hace sonido`);
    },
  };

  const dog = Object.create(animal);
  dog.name = 'Perro';
  dog.bark = function () {
    console.log(`${this.name} ladra`);
  };

  console.log('dog.kind:', dog.kind); // 'animal' (del prototipo)
  console.log('dog.name:', dog.name); // 'Perro' (propio)

  dog.speak(); // Perro hace sonido (heredado)
  dog.bark(); // Perro ladra (propio)

  // Ver la cadena de prototipos
  console.log('dog.__proto__ === animal:', dog.__proto__ === animal);
  console.log('animal.__proto__ === Object.prototype:', animal.__proto__ === Object.prototype);
};

exercise1();

// EXPLICACIÓN:
// Object.create(proto) crea un objeto cuyo [[Prototype]] es 'proto'
// Cuando accedemos a una propiedad, JavaScript busca en: objeto -> prototipo -> prototipo del prototipo -> ...
// Si no encuentra, retorna undefined

// --- Ejercicio 2: Object.create vs class ---
console.log('\n=== Ejercicio 2: Object.create vs ES6 Class ===');

// Forma antigua (prototípica)
function AnimalOld(name) {
  this.name = name;
}
AnimalOld.prototype.speak = function () {
  console.log(`${this.name} hace sonido`);
};

// Forma nueva (ES6 class)
class AnimalNew {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} hace sonido`);
  }
}

const dog1 = new AnimalOld('Rex');
const dog2 = new AnimalNew('Max');

dog1.speak();
dog2.speak();

// Son equivalentes internamente
console.log('typeof AnimalOld:', typeof AnimalOld);
console.log('typeof AnimalNew:', typeof AnimalNew);

// EXPLICACIÓN:
// La sintaxis 'class' es azúcar sintáctico para funciones constructoras
// Internamente funcionan igual: el prototype contiene los métodos

// --- Ejercicio 3: Herencia prototípica ---
console.log('\n=== Ejercicio 3: Herencia prototípica ===');

function Vehicle(brand) {
  this.brand = brand;
}
Vehicle.prototype.drive = function () {
  console.log(`Conduciendo ${this.brand}`);
};

function Car(brand, doors) {
  Vehicle.call(this, brand); // Llamar constructor padre
  this.doors = doors;
}

// Configurar herencia: Car.prototype hereda de Vehicle.prototype
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car; // Restaurar constructor

Car.prototype.openDoors = function () {
  console.log(`Abriendo ${this.doors} puertas`);
};

const myCar = new Car('Toyota', 4);
myCar.drive(); // Heredado de Vehicle
myCar.openDoors(); // Propio de Car

console.log('myCar instanceof Car:', myCar instanceof Car);
console.log('myCar instanceof Vehicle:', myCar instanceof Vehicle);

// EXPLICACIÓN:
// Para heredar, necesitamos:
// 1. Llamar Vehicle.call(this, brand) en Car
// 2. Object.create para configurar la cadena prototípica
// 3. Restaurar constructor para que instanceof funcione correctamente

// --- Ejercicio 4: Equivalencia entre prototype y class ---
console.log('\n=== Ejercicio 4: Prototype vs Class (equivalencia) ===');

// Version con prototype
function PersonProto(name, age) {
  this.name = name;
  this.age = age;
}
PersonProto.prototype.greet = function () {
  return `Hola, soy ${this.name}`;
};
PersonProto.prototype.birthday = function () {
  this.age++;
};

// Version con class
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hola, soy ${this.name}`;
  }
  birthday() {
    this.age++;
  }
}

const p1 = new PersonProto('Alice', 30);
const p2 = new PersonClass('Bob', 25);

console.log('PersonProto instance:', p1.greet()); // Mismo resultado
console.log('PersonClass instance:', p2.greet());

// Ambos métodos funcionan igual, class es sintaxis más limpia

// EXPLICACIÓN:
// La sintaxis 'class' es más clara y moderna
// Pero internamente sigue usando prototipos
// Usar class en código moderno es la mejor práctica

// --- Ejercicio 5: Modificar prototipos (con cuidado) ---
console.log('\n=== Ejercicio 5: Modificar prototipos ===');

// Ejemplo: extender Array (NO RECOMENDADO en producción, pero útil para entender)
const arrayProto = () => {
  // En lugar de modificar Array.prototype, creamos un método personalizado
  const myCustomArray = Object.create(Array.prototype);
  myCustomArray.double = function () {
    return this.map(x => x * 2);
  };

  myCustomArray.push(1, 2, 3);
  const doubled = myCustomArray.double();
  console.log('Array doblado:', doubled);
};

arrayProto();

// EXPLICACIÓN:
// Modificar prototipos built-in es peligroso (colisiones de nombres)
// En su lugar, crear nuevos objetos con Object.create es más seguro
// Polyfills usan prototipos, pero deben ser cuidadosos

// --- Ejercicio 6: Lookup de propiedades (desafío) ---
console.log('\n=== Ejercicio 6: Lookup de propiedades ===');

const exercise6 = () => {
  const obj = {};
  obj.toString = 'mi toString';

  console.log('obj.toString:', obj.toString); // 'mi toString' (propiedad propia)
  console.log('obj.hasOwnProperty:', obj.hasOwnProperty); // función (del Object.prototype)

  // hasOwnProperty revisa solo propiedades propias
  console.log('obj.hasOwnProperty("toString"):', obj.hasOwnProperty('toString')); // true
  console.log('obj.hasOwnProperty("hasOwnProperty"):', obj.hasOwnProperty('hasOwnProperty')); // false
};

exercise6();

// EXPLICACIÓN:
// hasOwnProperty solo devuelve true para propiedades propias del objeto
// Si no existe en el objeto, busca en el prototipo
// Esta es la forma segura de revisar propiedades

// TESTS
function runTests() {
  const assert = (condition, msg) => {
    if (!condition) throw new Error(`FAIL: ${msg}`);
    console.log(`  ✓ ${msg}`);
  };

  console.log('\n=== TESTS: Prototypes ===');

  // Test 1: Object.create
  const proto = { x: 10 };
  const obj = Object.create(proto);
  assert(obj.x === 10, 'Object.create hereda del prototipo');

  // Test 2: Constructor function
  function TestClass(val) {
    this.val = val;
  }
  TestClass.prototype.getVal = function () {
    return this.val;
  };
  const inst = new TestClass(42);
  assert(inst.getVal() === 42, 'Métodos en prototype son accesibles');

  // Test 3: Herencia de prototipo
  function Parent() {
    this.parentProp = 'parent';
  }
  function Child() {
    this.childProp = 'child';
  }
  Child.prototype = Object.create(Parent.prototype);
  const child = new Child();
  assert(child instanceof Parent, 'instanceof funciona con herencia');

  // Test 4: hasOwnProperty
  const testObj = { own: 'value' };
  assert(testObj.hasOwnProperty('own') === true, 'hasOwnProperty detecta propiedades propias');
  assert(testObj.hasOwnProperty('toString') === false, 'hasOwnProperty ignora propiedades heredadas');

  // Test 5: Búsqueda en cadena de prototipos
  const obj1 = { a: 1 };
  const obj2 = Object.create(obj1);
  obj2.b = 2;
  assert(obj2.a === 1, 'Búsqueda encuentra propiedades en prototipo');
  assert(obj2.b === 2, 'Propiedades propias tienen precedencia');

  // Test 6: ES6 class es equivalente a prototype
  class TestClassES6 {
    constructor(val) {
      this.val = val;
    }
    getVal() {
      return this.val;
    }
  }
  const instES6 = new TestClassES6(99);
  assert(instES6.getVal() === 99, 'ES6 class funciona igual que constructor function');
}

runTests();

console.log('\n=== Fin de Ejercicios ===\n');
