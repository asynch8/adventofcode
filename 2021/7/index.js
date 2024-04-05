const pattern = [];
const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split(',').map(e => parseInt(e, 10)).sort((a, b) => a -b)
const min = input[0]
const max = input[input.length -1]
let mostEfficientFuel = null;
for (let i = min; i <= max; i++) {
    let fuel = 0;
    for (let j = 0; j < input.length; j++) {
        if (input[j] !== i) {
            fuel += getPattern(Math.abs(input[j] - i))
        }
        if (mostEfficientFuel && fuel > mostEfficientFuel) {
            break;
        }
    }
    if (!mostEfficientFuel || mostEfficientFuel > fuel) {
        mostEfficientFuel = fuel;
    }
}
function getPattern(x) {
    if (!pattern[x]) {
        for (let i = pattern.length - 1; i <= x; i++) {
            pattern[i] = (pattern[i - 1] ?? 0) + i;
        }
    }
    return pattern[x];
}
console.log('Most efficient fuel', mostEfficientFuel)