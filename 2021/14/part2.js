let [polymerTemplate, pairInsertion] = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n\r\n')
pairInsertion = Object.assign(...pairInsertion.split('\r\n').map((e) => {
    let split = e.split(' -> ')
    return { [split[0]]: split[1] };
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
for (let i = 0; i < polymerTemplate.length-1; i++) {
    count[polymerTemplate[i]+polymerTemplate[i+1]] = 1
}
// Run steps

for (let j = 0; j < stepsToRun;j++) {
    const newCount = Object.assign({}, count)
    for (let i = 0; i < Object.keys(count).length; i++) {
        const pairKey = Object.keys(count)[i]
        // Get resulting pairs from the pre-generated pairKey
        const [pairA, pairB] = pairs[pairKey]
        const pairCount = count[pairKey];
        newCount[pairA] += pairCount
        newCount[pairB] += pairCount
        newCount[pairKey] -= pairCount;
     }
    count = newCount
    console.log('After step', j+1, count)
}
const charCount = {}
for (let i = 0; i < uniqueChars.length; i++) {
    charCount[uniqueChars[i]] = 0;
}
for (let i = 0; i < Object.keys(count).length; i++) {
    const pairKey = Object.keys(count)[i]
    const pairCount = count[pairKey];
    charCount[pairKey[0]] += pairCount
    charCount[pairKey[1]] += pairCount
 }
 console.log(charCount)
 const sortedCount = Object.keys(charCount).sort((a, b) => charCount[a] - charCount[b])
 const highestEndVal = sortedCount[sortedCount.length - 1] === polymerTemplate[0] || sortedCount[sortedCount.length - 1] === polymerTemplate[polymerTemplate.length-1] ? 1 : 0 
 const lowestEndVal = sortedCount[0] === polymerTemplate[0] || sortedCount[0] === polymerTemplate[polymerTemplate.length-1] ? 1 : 0
 console.log(sortedCount[sortedCount.length - 1], polymerTemplate[polymerTemplate.length-1] )
 console.log(polymerTemplate[polymerTemplate.length-1], polymerTemplate[0])
 console.log(highestEndVal,lowestEndVal)
 console.log(charCount[sortedCount[sortedCount.length - 1]]+highestEndVal, charCount[sortedCount[0]]/2,
    (((charCount[sortedCount[sortedCount.length - 1]]+highestEndVal)/2) - ((charCount[sortedCount[0]]+lowestEndVal)/2)))