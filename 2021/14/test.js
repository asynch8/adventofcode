let [polymerTemplate, pairInsertion] = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n\r\n')
pairInsertion = Object.assign(...pairInsertion.split('\r\n').map((e) => {
    const [key, val] = e.split(' -> ')
    return { [key]: val };
}))
const pairs = {}
let count = {}
const letterCount = {}
const uniqueCombos = Object.keys(pairInsertion)
const uniqueChars = Object.values(pairInsertion).filter((v, i, s) => s.indexOf((v) === i))
for (let i = 0; i < uniqueChars.length; i++) {
    letterCount[uniqueChars[i]] = 0;
}
// Prepare resulting pairs and counts for all pairs
while(Object.keys(pairs).length < uniqueCombos.length) {
    for (let i = 0; i < uniqueCombos.length; i++) {
        let pairKey = uniqueCombos[i]
        pairs[pairKey] = [pairKey[0]+pairInsertion[pairKey], pairInsertion[pairKey]+pairKey[1]]
        count[pairKey] = 0
    }
}
const stepsToRun = 10;
// Loop over initial pairs
polymerTemplate.split('').forEach((e) => {
    letterCount[e] += 1
})
for (let i = 0; i < polymerTemplate.length-1; i++) {
    count[polymerTemplate[i]+polymerTemplate[i+1]] = 1
}
// Run steps
console.log('Before running', letterCount, count)
for (let j = 0; j < stepsToRun;j++) {
    const newCount = Object.assign({}, count)
    for (let i = 0; i < Object.keys(count).length; i++) {
        const pairKey = Object.keys(count)[i]
        const [pairA, pairB] = pairs[pairKey]
        const pairCount = count[pairKey];
        // Get resulting pairs from the pre-generated pairKey
        console.log('Adding', pairCount, 'to', pairInsertion[pairKey], pairKey, pairs[pairKey])
        letterCount[pairInsertion[pairKey]] += pairCount
        
        newCount[pairA] += pairCount
        newCount[pairB] += pairCount
        newCount[pairKey] -= pairCount;
     }
    count = newCount
    console.log('After step', j+1, count, letterCount)
}
const sortedCount = Object.keys(letterCount).sort((a, b) => letterCount[a] - letterCount[b])
console.log(letterCount[sortedCount[sortedCount.length - 1]] - letterCount[sortedCount[0]])