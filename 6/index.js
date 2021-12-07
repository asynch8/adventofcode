const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split(',')
const endDay = 18;
for (let day = 0; day < endDay; day++) {
    let inputLength = input.length
    for (let i = 0; i < inputLength; i++) {
        if (input[i] === 0) {
            input[i] = 6
            input.push(8)
        } else {
            input[i] -= 1
        }
    }
}
console.log(input.length)