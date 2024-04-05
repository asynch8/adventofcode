const ventMap = {};
const input = require('fs')
    .readFileSync('./input.txt', {encoding:'utf8', flag:'r'})
    .split('\r\n')
    .map(
        e => e
            .split(' -> ')
            .map((coords) => {
                return coords.split(',').map(coord => parseInt(coord, 10))
            })
    ).map((coords) => {
        const [coordStart, coordEnd] = coords;
        const [x1, y1] = coordStart;
        const [x2, y2] = coordEnd;
        if (x1 === x2) {
            let lowestNumber = y1 < y2 ? y1 : y2;
            let highestNumber =  y1 < y2 ? y2 : y1
            for (let i = lowestNumber; i <= highestNumber; i++) {
                addToVentmap(x1, i)
            }
        }else if (y1 === y2) {
            let lowestNumber = x1 < x2 ? x1 : x2;
            let highestNumber =  x1 < x2 ? x2 : x1
            for (let i = lowestNumber; i <= highestNumber; i++) {
                addToVentmap(i, y1)
            }
        } else {
            if (x1 < x2 && y1 < y2) {
                for (let i = 0; i <= x2-x1; i++) {
                    addToVentmap(x1+i, y1+i)
                }
            } else if (x1 < x2 && y1 > y2) {
                for (let i = 0; i <= x2-x1; i++) {
                    addToVentmap(x1+i, y1-i)
                }
            } else if (x1 > x2 && y1 > y2) {
                for (let i = 0; i <= x1-x2; i++) {
                    addToVentmap(x2+i, y2+i)
                }
            } else if (x1 > x2 && y1 < y2) {
                for (let i = 0; i <= x1-x2; i++) {
                    addToVentmap(x2+i, y2-i)
                }
            }
        }
        return coords
    })
function addToVentmap(x, y) {
    if (!ventMap[x]) {
        ventMap[x] = {};
    }
    if (!ventMap[x].hasOwnProperty(y)) {
        ventMap[x][y] = 0;
    }
    //console.log(x, y, ventMap[x][y] +1)
    ventMap[x][y] += 1;
}
console.log(Object.keys(ventMap).map(key => Object.values(ventMap[key]).filter(e => e > 1).length ).reduce((accum, val) => accum + val))