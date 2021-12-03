const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(e => e.trim('\r'))
let temp = {};
input.forEach((currentValue) => {
    const rowValue = Object.assign({}, ...currentValue.split('').map((value, index) => {
        return {
            [index]: parseInt(value, 10) 
        }
    }));
    temp = Object.assign(...Object.keys(rowValue).map((key) => {
        return {
            [key]: (temp[key] ?? 0) + (rowValue[key] === 1 ? 1 : -1)
        } 
    }))
})
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