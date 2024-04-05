
const lowercase = 'abcdefghijklmnopqrstuvxyz'
const paths = [];
const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(e => e.split('-').sort((a, b) => { return b.indexOf('start') - a.indexOf('start') }))
let toCrawl = [['start']]
for (let i = 0; i < toCrawl.length; i++) {
    const currPath = toCrawl[i];
    const availablePaths = getAvailablePathsForCave(currPath[currPath.length - 1]);
    availablePaths.forEach(e => {
        if (e[1] === 'end') {
            const joinedPath = [].concat(currPath, [e[1]]).join('-');
            paths.push(joinedPath)
        } else if (currPath[currPath.length - 1] !== e[1] && (lowercase.indexOf(e[1][0]) === -1 || (e[1] !== 'start' && (!currPath.includes(e[1]) || getCavesVisitedMoreThanOnce(currPath.filter((c) => lowercase.includes(c[0]))).length < 1)))) {
            toCrawl.push([].concat(currPath, [e[1]]))
        }
    })
}
function getAvailablePathsForCave(cave) {
    return input.filter(e => e.indexOf(cave) > -1).map(e => e.sort((a, b) => {
        return b.indexOf(cave) - a.indexOf(cave)
    }))
}
function getCavesVisitedMoreThanOnce(currPath) {
    const counter = {}
    for (let i = 0; i < currPath.length; i++) {
        if (!Object.keys(counter).includes(currPath[i])) {
            counter[currPath[i]] = 0
        }
        counter[currPath[i]] += 1
    }
    return Object.keys(counter).filter((e) => { return counter[e] > 1; })
}
console.log(paths, paths.length);
/*input.filter((e) => {
    return e[0] === 'start'
}).forEach((line) => {
    
    tree[line[0]][line[1]] = {}
    console.log()
})*/

/*console.log(input)*/