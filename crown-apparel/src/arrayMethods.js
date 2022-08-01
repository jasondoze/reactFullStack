const myArray = [1, 2, 3, 4, 5];

// map()
// filter()
// reduce()
const reducer = myArray.reduce(
  (accumulator, currentElement) => accumulator + currentElement,
  0
);
// find()
// includes()
console.log(reducer);
