const appearedTwice = {}
const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').forEach((e) => {
    const firstHalf = e.substring(0, e.length / 2);
    const secondHalf = e.substring(e.length / 2);
    firstHalf.split('').forEach((e) => {
        if(secondHalf.indexOf(e) > -1) {
            if (!appearedTwice[e]) {
                appearedTwice[e] = 0
            }
            appearedTwice[e] = items.indexOf(e)+1;
            console.log(firstHalf, secondHalf, e, items.indexOf(e)+1)
        }
    })
})
console.log(appearedTwice)
console.log(Object.values(appearedTwice).reduce((accum, value) => accum += value, 0))