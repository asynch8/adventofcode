const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(e => e.trim('\r'))
function unique (v, i, s) {
    return s.indexOf(v) === i
}
function getSizeOfBits(input) {
    let t = {}
    input.forEach((currentValue) => {
        const rowValue = Object.assign({}, ...currentValue.split('').map((value, index) => {
            return {
                [index]: parseInt(value, 10) 
            }
        }));
        t = Object.assign(...Object.keys(rowValue).map((key) => {
            return {
                [key]: (t[key] ?? 0) + (rowValue[key] === 1 ? 1 : -1)
            } 
        }))
    })
    return t;
}
let temp = getSizeOfBits(input);
const gammarate = parseInt(Object.keys(temp).map((key) => {
    if (temp[key] === 0) {
        console.error('SAME AMOUNT OF ZEROS AND ONES FOR KEY', key)
    }
    return temp[key] > 0 ? 1 : 0;
}).join(''), 2);
const epsilon = parseInt(Object.keys(temp).map((key) => {
    if (temp[key] === 0) {
        console.error('SAME AMOUNT OF ZEROS AND ONES FOR KEY', key)
    }
    return temp[key] > 0 ? 0 : 1;
}).join(''), 2);
console.log('Gammarate', gammarate)
console.log('Epsilon', epsilon)
console.log('Power consumption', gammarate * epsilon)


let oxygen = input
let count = 0;
while(oxygen.length > 1 && oxygen.filter(unique).length > 0){
    temp = getSizeOfBits(oxygen);
    oxygen = oxygen.filter((e) => {
        return parseInt(e[count], 10) === (temp[count] >= 0 ? 1 : 0)
    })
    count++;
}
oxygen = parseInt(oxygen.pop(), 2);
console.log('Oxygen', oxygen);

let co2 = input
count = 0;
while(co2.length > 1 && co2.filter(unique).length > 0){
    temp = getSizeOfBits(co2);
    co2 = co2.filter((e) => {
        console.log(e, temp[count])
        return parseInt(e[count], 10) === (temp[count] >= 0 ? 0 : 1)
    })
    count++;
}
co2 = parseInt(co2.pop(), 2);
console.log('Co2', co2);


console.log('Life support rating: ', oxygen * co2)