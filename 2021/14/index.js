let [polymerTemplate, pairInsertion] = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n\r\n')
polymerTemplate = polymerTemplate.split('')
pairInsertion = Object.assign(...pairInsertion.split('\r\n').map((e) => {
    let split = e.split(' -> ')
    return { [split[0]]: split[1] };
}))

const stepsToRun = 10;
for (let i = 0; i < stepsToRun; i++) {
    let toInsert = [];
    const startedAt = new Date();
    
    //console.log(polymerTemplate, i, Object.keys(pairInsertion), pairInsertion[currSlice], currSlice)
    /*if (!Object.keys(pairInsertion).includes(currSlice)) {
        console.error('This does not exist', currSlice, pairInsertion)
    }*/
    console.log('Generating insertions')
    for (let j = 0; j < polymerTemplate.length-1; j++) {
        let currSlice = polymerTemplate.slice(j, j+2).join('')
        //console.log(j+1, currSlice, pairInsertion[currSlice])
        toInsert.push([j+1, pairInsertion[currSlice]])
    }
    console.log('Done generating insertions, took ', (new Date() - startedAt) / 1000)
    //console.log('pre insert', polymerTemplate, toInsert)
    if (toInsert.length === 0) {
        console.error('Somethings wrong')
        break;
    }
    const startedInserting = new Date();
    console.log('inserting')
    for (let j = toInsert.length-1; j >= 0; j--) {
        //console.log(j, toInsert)
        const [index, insertion] = toInsert[j];
        polymerTemplate = [].concat(polymerTemplate.slice(0, index), [insertion], polymerTemplate.slice(index))
        //polymerTemplate = cleanSplice(polymerTemplate, index, 0, insertion)
    }
    console.log('Done inserting, took ', (new Date() - startedInserting) / 1000)
    //console.log('post insert', polymerTemplate)
    console.log('After step', i+1, 'took', (new Date() - startedAt) / 1000, 'seconds')
    //polymerTemplate = cleanSplice(polymerTemplate.split(''), , 0, pairInsertion[currSlice]).join('')
}
function countOccurances(arr) {
    const count = {}
    arr.forEach((e) => {
        // console.log(e, Object.keys(count), !Object.keys(count).includes(e))
        count[e] = !Object.keys(count).includes(e) ? 0 : count[e]+1
    })
    return count
}
const occurances = Object.values(countOccurances(polymerTemplate)).sort((a, b) => a - b)
console.log(occurances[occurances.length - 1], occurances[0], occurances[occurances.length - 1] - occurances[0])