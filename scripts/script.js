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

// 1. Напиши функцию delay(ms), которая возвращает промис, переходящий в состояние "resolved" через ms миллисекунд и который несёт значение 100.
// delay(1000).then(value => console.log(‘Done with ’ + value)); // Done with 100

// function delay(ms) {
//   return new Promise ((res,rej)=>{
//     setTimeout(()=>res(100),ms);
//   })
// }

// delay(1000).then(value => console.log(`Done with ${value}`));

// ----------------------------------------------------------------------

// 2. Напиши функцию в которой будет запрос на http://www.json-generator.com/api/json/get/cfQCylRjuG, из ответа ты получишь поле getUsersData, если значение равно true получи и выведи в консоль данные из http://www.json-generator.com/api/json/get/cfVGucaXPC

// function getData() {
//   fetch('http://www.json-generator.com/api/json/get/cfQCylRjuG')
//   .then(result => result.json())
//   .then(data => {    
//     if (data.getUsersData) { 
//       return fetch('http://www.json-generator.com/api/json/get/cfVGucaXPC');
//     } else {
//       throw new Error('getting data is forbidden');
//     }
//   })
//   .then(result => result.json())
//   .then(data => console.log(data));
// }

// getData();

// ----------------------------------------------------------------------

// 3. Напиши функцию в которой тебе надо будет получить данные по следующим урлам:
// http://www.json-generator.com/api/json/get/cevhxOsZnS
// http://www.json-generator.com/api/json/get/cguaPsRxAi
// http://www.json-generator.com/api/json/get/cfDZdmxnDm
// http://www.json-generator.com/api/json/get/cfkrfOjrfS
// http://www.json-generator.com/api/json/get/ceQMMKpidK

// Когда все данные будут загружены выведи в консоль массив с этими данными, должно быть два варианта этой функции, первый вариант с параллельной загрузкой, второй с последовательной.

// function getParallel(links) {
//   return Promise.all(links.map(link => fetch(link).then(res => res.json())));
// }

// function getNoParallel(links) {
//   return links.reduce((promise, link) => {
//     return promise.then(resultData => {
//       return fetch(link)
//         .then(result => result.json())
//         .then(data => {
//           resultData.push(data);
//           return resultData;
//         });
//     });
//   }, Promise.resolve([]));
// }

// function getData(isParallel) {  
//   const links = [
//     "http://www.json-generator.com/api/json/get/cevhxOsZnS",
//     "http://www.json-generator.com/api/json/get/cguaPsRxAi",
//     "http://www.json-generator.com/api/json/get/cfDZdmxnDm",
//     "http://www.json-generator.com/api/json/get/cfkrfOjrfS",
//     "http://www.json-generator.com/api/json/get/ceQMMKpidK"
//   ];

//   return isParallel ? getParallel(links): getNoParallel(links);
// }

// getData(false) // isParallel on
//   .then(result => {
//     console.log("isParallel off ", result);
//   });

// getData(true) // isParallel off
//   .then(result => {
//     console.log("isParallel on ", result);
//   });

// ----------------------------------------------------------------------

// 4. Написать функцию getResolvedPromise(value), которая возвращает зарезолвленный промис с значением value. Вызвать эту функцию со значением 500. Обработать вызов в then. Если придёт значение больше 300, то выбросить через throw ошибку c текстом ‘Ошибка’. Поймать ошибку через catch и вывести в консоль текст ошибки. Ниже описать finally, который будет выводить в консоль текст ‘This is Finally!’

// function getResolvedPromise(value) {
//   return Promise.resolve(value);
// }

// getResolvedPromise(500)
// .then(val => {
//   if (val > 300) {
//     throw new Error('value is bigger than 300');
//   }
//   return val;
// })
// .catch(e => {
//   console.log(e);
// })
// .finally(() => {
//   console.log('this is Finally!');
// })


// ==========================================================================

// Реализовать метод дублирования элементов массива.
// console.log([1, 2, 3, 4].duplicate()) // [1, 2, 3, 4, 1, 2, 3, 4]

Array.prototype.duplicate = function () {
  return this.concat(this);
};

console.log([23,1,2].duplicate());