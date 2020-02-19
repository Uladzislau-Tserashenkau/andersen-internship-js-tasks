// Singleton 

// class Universe {
  
//   constructor () {
//     if (typeof Universe.instance === 'object' ) {
//       return Universe.instance;
//     }
//     this.size = 100;
//     Universe.instance = this;
//     return Universe.instance;
//   }

//   getSize () {
//     return this.size;
//   }

//   setSize (amount) {
//     this.size = amount;
//   }
// }

// const a = new Universe();
// const b = new Universe();

// console.log(a===b); // true
// console.log(a.getSize(), b.getSize());
// a.setSize(200);
// console.log(a.getSize(), b.getSize());

// ===========================================

// Singleton (using closure)
// const Universe = (function () {
  
//   let instance;

//   return class Un {
//     constructor() {
//       if (typeof instance === 'object') {
//         return instance;
//       }
//       this.size = 100;
//       instance = this;
//     }
//     getSize () {
//       return this.size;
//     }
//     setSize (amount) {
//       this.size = amount;
//     }
//   };
// } ());


// const a = new Universe();
// const b = new Universe();

// console.log(b===a);
// console.log(a.getSize(), b.getSize());
// a.setSize(300);
// console.log(a.getSize(), b.getSize());

// ===========================================================

// es6 to es5 inheritance

// es6 code:

// class Person {
//   constructor (name) {
//     this.name = name;
//   }

//   getName () {
//     return this.name;
//   }
// }


// class Man extends Person {
//   constructor (name, facialHair) {
//     super(name);
//     this.facialHair = facialHair;
//   }

//   getName () {
//     return `Name: ${super.getName()}`;
//   }
  
//   getFacialHair () {
//     return this.facialHair;
//   }
// }

// const person = new Person('somebody');
// console.log(person.getName()); // somebody

// const man = new Man('Viktor', true);
// console.log(man.getName()); // Name: Viktor
// console.log(man.getFacialHair()); // true

// es5 code:

// var Person = function (name) {
//   this.name = name;
// };

// Person.prototype.getName = function () {
//   return this.name;
// };

// var person1 = new Person("John");
// console.log(person1.getName());

// var Man = function (name, facialHair) {
//   Person.apply(this, arguments);
//   this.facialHair = facialHair;
// };

// Man.prototype = Object.create(Person.prototype);
// Man.constructor = Man;
// Man.prototype.getName = function () {
//   return 'Name: '+Person.prototype.getName.call(this);
// };
// Man.prototype.getFacialHair = function () {
//   return this.facialHair;
// };

// var man1 = new Man('Peter', true);
// console.log( man1.getFacialHair() );
// console.log( man1.getName() );
// console.log( man1 instanceof Man);
// console.log( man1 instanceof Person);

// ========================================================

// task3-functional-inheritance

// function Person (name) {
//   var that = {};
//   that.name = name;
//   that.getName = function () {
//     return that.name;
//   };
//   return that;
// }

// function Man (name, facialHair) {
//   var that = Person(name);
//   that.facialHair = facialHair;
//   var parentGetName = that.getName;
//   that.getName = function () {
//     return 'Name: ' + parentGetName();
//   };
//   that.getFacialHair = function () {
//     return that.facialHair;
//   };
//   return that;
// }

// const pers1 = Person('Peter');
// console.log(pers1.getName());

// const man1 = Man('Greg', true);
// console.log(man1.getFacialHair());
// console.log(man1.getName());

// ========================================

