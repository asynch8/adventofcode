const elves = [];
let temp = 0;
require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').forEach((line) => {
    if (line) {
        elves[line ? temp : temp++] = !elves[temp] ? Number(line) : Number(line)+elves[temp]
    } else {
        temp++
    }
})
let sortedElves = elves.sort((a, b) => {
    return b - a
});
console.log('Star 1', elves[0])
console.log('Star 2', elves[0]+elves[1]+elves[2])