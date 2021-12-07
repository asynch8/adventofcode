const fishOnDay = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split(',').map((e) => { return fishOnDay[e] += 1 })
const endDay = 256;
for (let day = 0; day < endDay; day++) {
    const newFish = fishOnDay[0];
    for (let i = 0; i < Object.keys(fishOnDay).length - 1; i++) {
        fishOnDay[i] = fishOnDay[ i + 1 ]
    }
    fishOnDay[8] = newFish;
    fishOnDay[6] += newFish;
    console.log('Day:', day+1, 'newFish:', newFish, 'Total fish:', Object.values(fishOnDay).reduce((accum, val) => { return accum + val }))
}