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
const Universe = (function () {
  
  let instance;

  return class Un {
    constructor() {
      if (typeof instance === 'object') {
        return instance;
      }
      this.size = 100;
      instance = this;
    }
    getSize () {
      return this.size;
    }
    setSize (amount) {
      this.size = amount;
    }
  };
} ());


const a = new Universe();
const b = new Universe();

console.log(b===a);
console.log(a.getSize(), b.getSize());
a.setSize(300);
console.log(a.getSize(), b.getSize());