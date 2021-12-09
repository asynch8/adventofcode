const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(e => e.split('').map(n => parseInt(n, 10)))
const Underscore = "\x1b[4m"
const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const BgRed = "\x1b[41m"
const Yellow='\033[43m'
let lowPoints = [];
for(let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
        if ((x+1 < input.length && input[x][y] >= input[x+1][y])) {
            continue;
        }
        if (x-1 >= 0 && input[x][y] >= input[x-1][y]) {
            continue;
        }
        if (y+1 < input[x].length && input[x][y] >= input[x][y+1]) {
            continue;
        }
        if (y-1 >= 0 && input[x][y] >= input[x][y-1]) {
            continue;
        }
        lowPoints.push({ x, y })
    }
}
// Part one
console.log(lowPoints.map(lowPoint => input[lowPoint.x][lowPoint.y] ).reduce((accum, val) => accum+val)+lowPoints.length)
let basins = [];
for (let i = 0; i < lowPoints.length; i++) {
    let lowPoint = lowPoints[i]
    let basin = [lowPoint];
    for(let i = 0; i < basin.length; i++) {
        let point = basin[i]
        let e = input[point.x][point.y]
        //console.log(point, point.x+1 < input.length, point.x, input.length, input[point.x+1]);
        if (point.x+1 < input.length && (e+1 < input[point.x+1][point.y] || e < input[point.x+1][point.y]) && 9 > input[point.x+1][point.y]) {
            addToBasin(basins, basin, { x: point.x+1, y: point.y })
        }
        if (point.x-1 >= 0 && (e+1 < input[point.x-1][point.y] || e < input[point.x-1][point.y]) && 9 > input[point.x-1][point.y]) {
            addToBasin(basins, basin, { x: point.x-1, y: point.y })
        }
        if (point.y+1 < input[point.x].length && (e+1 < input[point.x][point.y+1] || e < input[point.x][point.y+1]) && 9 > input[point.x][point.y+1]) {
            addToBasin(basins, basin, { x: point.x, y: point.y +1 })
        }
        if (point.y-1 >= 0 && (e+1 < input[point.x][point.y-1] || e < input[point.x][point.y-1]) && 9 > input[point.x][point.y-1]) {
            addToBasin(basins, basin, { x: point.x, y: point.y -1 })
        }
    }
    basins.push(basin)
}
function addToBasin(basins, basin, newcoord) {
    if ([].concat(...basins, basin).filter((c) => {
        return c.x === newcoord.x && c.y === newcoord.y
    }).length === 0) {
        //console.log(newcoord, input[newcoord.x][newcoord.y])
        basin.push(newcoord)
    }
}

function drawGrid(input, basins) {
    return input.map((col, x) => col.map(
        (e, y) => {
            if ( [].concat(...basins).filter((c) => {
                return c.x === x && c.y === y
            }).length === 0) {
                return e
            } else if (lowPoints.filter((c) => {
                return c.x === x && c.y === y
            }).length > 0) {
                return `${Yellow}${e}${Reset}`
            } else {
                return `${BgRed}${e}${Reset}`
            }
        }
    ).join('')).join('\n')
}
// Used for debugging
console.log(drawGrid(input, basins))
console.log('Part two', basins.sort((a, b) => b.length - a.length).map(e => e.length).slice(0, 3).reduce((accum, val) => accum * val))