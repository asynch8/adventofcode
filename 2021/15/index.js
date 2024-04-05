const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(e => e.split('').map(c => parseInt(c, 10)))
const visitedNodes = []
const tentativeDistance = { '0-0': 0 }
const lowestDistance = null;
let unvisitedSorted = Object.keys(tentativeDistance)
function getUnvisitedNode() {
    const distances = unvisitedSorted;
    for (let i = 0; i < distances.length; i++) {
        const [ x, y ] = distances[i].split('-');
        return { x: parseInt(x, 10), y: parseInt(y, 10) }
    }
}
 
while(
    (
        !tentativeDistance[`${input[0].length-1}-${input.length-1}`] || 
        tentativeDistance[`${input[0].length-1}-${input.length-1}`] > unvisitedSorted.map(e => tentativeDistance[e])[0]
    )
) {
    const {x, y} = getUnvisitedNode()
    
    const currDistance = tentativeDistance[`${x}-${y}`]
    console.log(x, y, currDistance)
    if (y > 0) {
        if (!Object.keys(tentativeDistance).includes(`${x}-${y-1}`) || (currDistance + input[y-1][x]) < tentativeDistance[`${x}-${y-1}`]) {
            tentativeDistance[`${x}-${y-1}`] = currDistance + input[y-1][x]
        }
    }
    if (x > 0) {
        if (!Object.keys(tentativeDistance).includes(`${x-1}-${y}`) || (currDistance + input[y][x-1]) < tentativeDistance[`${x-1}-${y}`]) {
            tentativeDistance[`${x-1}-${y}`] = currDistance + input[y][x-1]
        }
    }
    if (y < input.length-1) {
        if (!Object.keys(tentativeDistance).includes(`${x}-${y+1}`) || (currDistance + input[y+1][x]) < tentativeDistance[`${x}-${y+1}`]) {
            //console.log(y+1, x, input[y+1])
            tentativeDistance[`${x}-${y+1}`] = currDistance + input[y+1][x]
        }
    }
    if (x < input[0].length-1) {
        if (!Object.keys(tentativeDistance).includes(`${x+1}-${y}`) || (currDistance + input[y][x+1]) < tentativeDistance[`${x+1}-${y}`]) {
            tentativeDistance[`${x+1}-${y}`] = currDistance + input[y][x+1]
        }
    }
    visitedNodes.push(`${x}-${y}`)
    //console.log(visitedNodes)
    unvisitedSorted = Object.keys(tentativeDistance).filter((e) => {
        //console.log(e, !visitedNodes.includes(e));
        return !visitedNodes.includes(e)
    }).sort((a, b) => tentativeDistance[a] - tentativeDistance[b]);
    console.log(unvisitedSorted)
    
}
console.log(Object.values(tentativeDistance).length, ((input.length)*(input[0].length)))
console.log(visitedNodes, Object.assign(...Object.keys(tentativeDistance).sort((a, b) => tentativeDistance[a] - tentativeDistance[b]).map((e) => {return { [e]: tentativeDistance[e] }})))
console.log(tentativeDistance[`${input[0].length-1}-${input.length-1}`])