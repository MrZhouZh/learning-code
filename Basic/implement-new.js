/**
 * 实现 new
 * refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
 * 
 */
const implementNew = (constructor, ...args) => {
    const that = Object.create(constructor.prototype)
    const obj = constructor.apply(that, args)
    if (obj && typeof obj === 'object') {
        return obj
    } else {
        return that
    }
}

function Car() {}

const car1 = implementNew(Car)
const car2 = implementNew(Car)

console.log(car1.year)  // undefined
Car.prototype.year = '1990'
car1.year = '1993'
console.log(car1.year)  // '1993'
console.log(car2.year)  // '1990'

