const process = require("process");
// console.log(process.argv)
// console.log(process.argv.slice(2))

// const [operation,number1,number2] = process.argv.slice(2)
// Grabbing the first argument from the command line, if not provided, default to 'Guest User'
// const name = args[0] || 'Guest User'

// console.log (`Hello ,${name}!`)

// Simple command line calculator

// const a = Number(number1)
// const b = Number(number2)
// if(operation === 'add') {
//     console.log(`${a} + ${b} = ${a + b}`)
// }else if (operation === 'subtract') {
//     console.log(`${a} - ${b} = ${a - b}`)
// }
// else if (operation === 'multiply') {
//     console.log(`${a} * ${b} = ${a * b}`)
// }
// else if (operation === 'divide') {
//     if (b === 0 || a === 0) {
//         console.log('Error: Division by zero is not allowed.')
//     } else {
//         console.log(`${a} / ${b} = ${a / b}`)
//     }
// }
// else {
//     console.log('Invalid operation. Please use add, subtract, multiply, or divide.')
// }

// More complex greeting program

const [name, age, petName, petType] = process.argv.slice(2);

console.log(process.argv.slice(2));

try {
    if (age < 0) {
      console.log(
        "Error: Age cannot be negative You have to exist to join the cool club.",
      );
    } else if (age < 18) {
      console.log(
        `Hello, ${name}! You are ${age} years old. You have a ${petType} named ${petName}. You are unable to join the cool club.`,
      );
    } else if (age >= 18) {
      console.log(
        `Hello, ${name}! You are ${age} years old. You have a ${petType} named ${petName}. You are able to join the cool club!`,
      );
    }
} catch (error) {
    console.error("An error occurred:", error.message);
    
}
