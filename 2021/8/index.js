const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(e => e.split('|').map(n => n.split(' ').filter(n => n != '')))
console.log(input.map((e) => {
    const numbers = {};
    const values = [];
    e[0].sort((a, b) => a.length - b.length).forEach((e) => {
        switch(e.length) {
            case 2:
                numbers[1] = e.split('')
                break;
            case 3:
                numbers[7] = e.split('')
                break;
            case 4:
                numbers[4] = e.split('')
                break;
            case 5:
                // If it has a length of five it can either be 2, 3 or 5
                // if it contains all the letters in 1, then it's 3
                // if it contains the letters in 4 that are not included in 1, then it's 5
                // else it's 2
                if (numbers[1].filter(n =>  e.indexOf(n) > -1).length === numbers[1].length) {
                    numbers[3] = e.split('')
                } else if (numbers[4].filter(n => numbers[1].indexOf(n) === -1 && e.indexOf(n) > -1 ).length === 2) {
                    numbers[5] = e.split('')
                } else {
                    numbers[2] = e.split('')
                }
                
                break;
            case 6:
                // either 0, 6 or 9
                // if entire 4 exists in e, the its 9
                // if it contains entire 1, it's 0
                // else it's 6
                if (numbers[4].filter(n => e.indexOf(n) > -1).length === numbers[4].length) {
                    numbers[9] = e.split('')
                } else if (numbers[1].filter(n => e.indexOf(n) > -1).length === numbers[1].length) {
                    numbers[0] = e.split('')
                } else {
                    numbers[6] = e.split('')
                }
                break;
            case 7:
                numbers[8] = e.split('')
                break;
            default:
                console.log('unknown', e.length)
        }
    })
    e[1].forEach((e) => {
        switch(e.length) {
            case 2:
                values.push(1)
                break;
            case 3:
                values.push(7)
                break;
            case 4:
                values.push(4)
                break;
            case 5:
                if (numbers[2].filter(n => e.indexOf(n) > -1).length === numbers[2].length) {
                    values.push(2)
                } else if (numbers[3].filter(n => e.indexOf(n) > -1).length === numbers[3].length) {
                    values.push(3)
                } else {
                    values.push(5)
                }
                break;
            case 6:
                if (numbers[0].filter(n => e.indexOf(n) > -1).length === numbers[0].length) {
                    values.push(0)
                } else if (numbers[9].filter(n => e.indexOf(n) > -1).length === numbers[9].length) {
                    values.push(9)
                } else {
                    values.push(6)
                }
                break;
            case 7:
                values.push(8)
                break;
            default:
                console.log('unknown', e.length)
        }
    })
    return parseInt(values.join(''), 10)
}).reduce((accum, val) =>  accum + val))