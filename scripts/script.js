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

// Array.prototype.duplicate = function () {
//   return this.concat(this);
// };

// console.log([23,1,2].duplicate());

// ==========================================================================

// Bind, Call, Apply.

// Реализовать apply с помощью call (название - myApply).
// Реализовать call с помощью apply (название - myCall).
// Реализовать bind с помощью call (название - myBindByCall).

// console.log(obj1.foo.myApply(obj2, [5, 5])); // 40
// console.log(obj1.foo.myApply(obj2, [5, 5, 10])); // 50
// console.log(obj1.foo.myCall(obj2, 5, 5, 20)); // 60
// console.log(obj1.foo.myCall(obj2, 5, 5, 10, 20)); // 70

// const f1 = obj1.foo.myBindByCall(obj2, 5, 5);
// console.log(f1()); // 40
// const f2 = obj1.foo.myBindByCall(obj2, 5, 5, 10);
// console.log(f2()); // 50

// const obj1 = {
//   a: 20,
//   foo: function(...numbers) {
//     return this.a + numbers.reduce((prev, curr) => prev + curr);
//   }
// };

// const obj2 = {
//   a: 30
// };

// Function.prototype.myCall = function(target, ...paramArr) {
//   return this.apply(target, paramArr);
// };

// Function.prototype.myApply = function(target, paramArr) {
//   return this.call(target, ...paramArr);
// };

// Function.prototype.myBindByCall = function(target, ...paramArr) {
//   return () => this.call(target, ...paramArr);
// };

// console.log(obj1.foo.myApply(obj2, [5, 5])); // 40
// console.log(obj1.foo.myApply(obj2, [5, 5, 10])); // 50
// console.log(obj1.foo.myCall(obj2, 5, 5, 20)); // 60
// console.log(obj1.foo.myCall(obj2, 5, 5, 10, 20)); // 70

// const f1 = obj1.foo.myBindByCall(obj2, 5, 5);
// console.log(f1()); // 40
// const f2 = obj1.foo.myBindByCall(obj2, 5, 5, 10);
// console.log(f2()); // 50

// ----------------------------------------------------------------------

// Написать полифил на Object.create.

// const obj = {
//   a: 1
// };

// const obj2 = objectCreate(obj, {
//   p: {
//     value: 20
//   },
//   k: {
//     value: 30
//   }
// });

// function objectCreateOld(protoObj, targetObj = {}) {
//   return Object.setPrototypeOf(
//     Object.fromEntries(
//       Object.entries(targetObj).map(arr =>
//         arr.map(elem => (typeof elem === "object" ? elem.value : elem))
//       )
//     ),
//     protoObj
//   );
// }

// function objectCreate(protoObj, targetObj = {}) {
//   const flattenedObj = Object.fromEntries(
//     Object.entries(targetObj).map(arr =>
//       arr.map(elem => (typeof elem === "object" ? elem.value : elem))
//     )
//   );
//   function test(obj) {
//     Object.entries(obj).forEach(arr => {
//       this[arr[0]] = arr[1];
//     });
//   }
//   test.prototype = { ...protoObj };
//   return new test(flattenedObj);
// }

// console.log(obj2); // { p: 20, k: 30, __proto__: { a: 1 } }

// function A() {}
// A.prototype.c = function() {};
// function B() {}
// B.prototype = objectCreate(A.prototype);
// var b = new B();
// ----------------------------------------------------------------------

// Написать свою реализацию new в виде функции myNew.

// function myNew(func) {
//   const obj = {};
//   Object.setPrototypeOf(obj, func.prototype);
//   const result = func.call(obj);
//   return typeof result === "object" ? result : obj;
// }

// function F() {
//   this.a = 10;
// }

// function A() {
//   return { b: 1 };
// }

// F.prototype.foo = function() {
//   return this.a;
// };

// const a = myNew(A);
// const b = myNew(F);
// console.log(a); // { a: 10, __proto__: { foo, constructor } }
// console.log(b);
// console.log(b.foo()); // 10

// ==========================================================================

// 1.Реализовать функцию throttleTime
// function myFunc(someVal) {
//   console.log("test " + someVal);
// }

// const throttleFunc = throttleTime(myFunc, 1500);
// throttleFunc(10);

// setTimeout(() => {
//   throttleFunc(20);
// }, 1100);

// setTimeout(() => {
//   throttleFunc(1000);
// }, 1900);

// function throttleTime(func, time) {
//   let isReadyToLaunch = true;
//   const throttleHandler = () => (isReadyToLaunch = true);

//   return function(val) {
//     if (isReadyToLaunch) {
//       isReadyToLaunch = false;
//       setTimeout(throttleHandler, time);
//       return func(val);
//     }
//   };
// }

// 2. Реализовать функцию debounceTime

// function myFunc(val) {
//   console.log("test " + val);
// }

// function debounceTime(func, time) {
//   let timerId = 0;

//   return function(...args) {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => func(...args), time);
//   };
// }

// const debounceFunc = debounceTime(myFunc, 500);
// debounceFunc(20);

// ==========================================================================

// Реализовать функцию, принимающую строку “a.b.c.d” и возвращающая объект со свойством объектом - a, со свойством объектом - b, со свойством объектом - с, со свойством d, равным null. Можно передать любую строку в указанном формате х.х.х.х.х.х…, и получить объект с вложенными объектами и завершающим null.

// Версия с рекурсией

// function stringToObj(str) {
//   const letters = str.split(".");

//   function objMaker(i=0) {
//     let obj = {};
//     if (letters.length - 1 === i) {
//       obj[letters[i]] = null;
//     } else {
//       obj[letters[i]] = objMaker(i + 1);
//     }
//     return obj;
//   }

//   return objMaker();
// }
// console.log(stringToObj("x.x.s.v.a.s.x"));

// Версия чз редьюс

// function stringToObj(str) {
//   let resultObj = {};
//   str.split(".").reduce((obj, letter) => {
//     obj[letter] = {};
//     return obj[letter];
//   }, resultObj);
//   return resultObj;
// }

// console.log(stringToObj("a.b.c.d"));

// --------------------------------------------------------------------------------------------

// Реализовать функции объединения, пересечения, разности элементов двух массивов:
// Объединение - union(a, b)
// Пересечение - intersection(a, b)
// Разность - difference(a, b)

// -----------------------------------------------------------------------------

// console.log(union([4, 5, 7, 2, 1, 5], [1, 2, 3, 7, 9]));
// [4, 5, 7, 2, 1, 3, 9]

// es5
// function union(arr1, arr2) {
//   let resultArr = arr1.concat(arr2);
//   for (let i = 0; i < resultArr.length; i++) {
//     for (let j = i+1; j < resultArr.length; j++) {
//       if (resultArr[i] === resultArr[j]) {
//         resultArr.splice(j,1);
//       }
//     }
//   }
//   return resultArr;
// }

// чз set
// console.log(union([4, 5, 7, 2, 1, 5], [1, 2, 3, 7, 9]));
// // [4, 5, 7, 2, 1, 3, 9]
// function union (arr1, arr2) {
//   return (Array.from(new Set([...arr1, ...arr2])));
// }

// -----------------------------------------------------------------------------

// console.log(intersection([1, 2, 3], [4, 3, 2])); // [2, 3]

// function intersection(arr1, arr2) {
//   return arr1.filter(num => arr2.includes(num));
// }

// -----------------------------------------------------------------------------

// console.log(diff([1, 2, 3, 7, 9], [4, 5, 7, 2, 1, 5])); // [3, 9]
// console.log(diff([4, 5, 7, 2, 1, 5], [1, 2, 3, 7, 9])); // [4, 5]

// function diff(arr1, arr2) {
//   const result = [];
//   arr1.forEach(num => {
//     if (!arr2.includes(num) && !result.includes(num) ) {
//       result.push(num);
//     }
//   });
//   return result;
// }

// -----------------------------------------------------------------------------
// Анаграммы

// const input = [
//   "вертикаль",
//   "кильватер",
//   "апельсин",
//   "спаниель",
//   "австралопитек",
//   "ватерполистка",
//   "кластер",
//   "сталкер",
//   "стрелка"
// ];

// function isAnagramChecker(str1, str2) {
//   return (
//     str1.length === str2.length &&
//     str1.split("").every(letter => str2.includes(letter))
//   );
// }

// function anagrams(arr) {
//   let arrCopy = [...arr];
//   let result = [];

//   for (let i = 0; i < arrCopy.length; i++) {
//     let set = new Set();
//     set.add(arrCopy[i]);
//     for (let j = i; j < arrCopy.length; j++) {
//       if (isAnagramChecker(arrCopy[i], arrCopy[j])) {
//         set.add(arrCopy[j]);
//         i=j;
//       }
//     }
//     result.push(Array.from(set));
//   }
//   return result;
// }

// console.log(anagrams(input));

// ===================================================================================

// 4. Написать функцию sum, которая работает с многим количеством последовательных вызовов. Должны работать следующие вызовы:

// console.log(sum(1)(2)(3)()); // 6
// console.log(sum(1)(2)(3)(4) + 1); // 11
// console.log(sum(1)(2)(3)(4)(5) + 1); // 16

// function sum (num) {
//   let sum = num;

//   function func (nextNum) {
//     if (nextNum === undefined) {
//       return sum;
//     }
//     sum+=nextNum;
//     return func;
//   }

//   func.valueOf = function () {
//     return sum;
//   };

//   return func;
// }

// =======================================================================

// 5. Написать  функцию prop, в которую передается ключ для получение значение по этому ключу.

// const tweeps = [
//   { name: 'Peter', age: 20 },
//   { name: 'Mary', age: 32 }
// ];

// const prop = field => obj => obj[field];

// // 'Mentioned by Peter, Mary'
// const str = 'Mentioned by ' + tweeps.map(prop('name')).join(', ');
// // ‘They are 20, 32’
// const agesStr = `They are ${tweeps.map(prop('age')).join(',')}`

// console.log(str);
// console.log(agesStr);

// =======================================================================

// let x = false && ''          // x = false
// x = false || ''              // x = ''
// x = '' || 'Yes'              // x = 'Yes'
// x = {} && 'Some'             // x = 'Some'
// x = {} || 'Some'             // x = {}
// x = {a: 10} && 'Some'        // x = 'Some'
// x = {a: 10} || 'Some'        // x = {a:10}
// x = 0 || true                // x = true
// x = null || 0                // x = 0
// x = undefined && 0           // x = undefined
// x = '' || 0 && true          // x = 0
// x = {} || 0 && true          // x = {}
// x = false || {} && true      // x = true

// =======================================================================

// 7.   Написать функцию compose, add, mul. add и mul - каррированные функции (только на 2 вызова). функция compose принимает неограниченное кол-во функций и применяет эти функции в обратном порядке.

// const mul = num => num2 => num * num2;
// const add = num => num2 => num + num2;
// const compose = (...args) => num =>
//   args.reduceRight((nextArg, func) => func(nextArg), num);

// const composed = compose(mul(2), add(5), add(2));
// console.log(composed(3)); // 20
// console.log([1, 2, 6].map(composed)); // [16, 18, 26]
