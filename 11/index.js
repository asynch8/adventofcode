const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(e => e.split('').map(c => parseInt(c, 10)))
const steps = 500;
let flashes = 0;
for (let step = 0; step < steps; step++) {
    const flashed = [];
    // Add energy level
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input.length; y++) {
            input[x][y] += 1
        }
    }
    // Flash
    while(
        flashed.length < [].concat(
            ...input.map(e => e.filter(c => c > 9))
        ).length
    ) {
        
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input.length; y++) {
                if (input[x][y] > 9 && !flashed.includes(x+'-'+y)) {
                    increaseAdjecent(x, y);
                    flashed.push(x+'-'+y)
                    flashes++
                }
            }
        }
    }
    // Part two
    if (flashed.length === (input.length * input.length)) {
        console.log('Step', step, flashed.length)
        break;
    }
    // Reset flashed
    for (let i = 0; i < flashed.length; i++) {
        const [x, y] = flashed[i].split('-')
        input[x][y] = 0;
    }
}
function increaseAdjecent(x, y){
    if (x > 0 && y > 0) {
        input[x-1][y-1] += 1
    }
    if (y > 0) {
        input[x][y-1] += 1
    }
    if (x < input.length-1 && y > 0) {
        input[x+1][y-1] += 1
    }
    if (x > 0) {
        input[x-1][y] += 1
    }
    if (x < input.length-1) {
        input[x+1][y] += 1
    }
    if (x > 0 && y < input.length-1) {
        input[x-1][y+1] += 1
    }
    if (y < input.length-1) {
        input[x][y+1] += 1
    }
    if (x < input.length-1 && y < input.length-1) {
        input[x+1][y+1] += 1
    }   
}
console.log('Part one', flashes)