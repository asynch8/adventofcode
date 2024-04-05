
const treeGrid = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map((line) => line.split(''))
let counter = 0;
for (let y = 0; y < treeGrid.length; y++) {
    const treeX = treeGrid[y];
    for (let x = 0; x < treeX.length; x++) {
        treeXY = treeGrid[y][x];
        const isVis = isVisible(x, y);
        console.log(x, y, treeXY, isVis)
        if (isVis) {
            counter++
        }
    }
}
console.log(counter)

function isVisible(x, y) {
    if (y === 0 || y === treeGrid.length - 1 || x === 0 || x === treeGrid[y].length - 1 ) {
        return true
    }
    //console.log(treeGrid[y][x])
    if (treeGrid[y][x] > treeGrid[y][x-1] && isVisible(x-1, y)) {
        return true
    }
    if (treeGrid[y][x] > treeGrid[y][x+1] && isVisible(x+1, y)) {
        return true
    }
    if (treeGrid[y][x] > treeGrid[y-1][x] && isVisible(x, y-1)) {
        return true
    }
    if (treeGrid[y][x] > treeGrid[y+1][x] && isVisible(x, y+1)) {
        return true
    }
    return false
}