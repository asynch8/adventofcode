const matrix = {}
const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n\r\n').map(e => e.split('\r\n'))
input[0] = input[0].map(e => e.split(','))
input[0].forEach((e) => {
    const [x, y] = e
    //console.log(e, Object.keys(matrix));
    if (!Object.keys(matrix).includes(y)) {
        matrix[y] = {}
    }
    matrix[y][x] = '#'
    //console.log(matrix)
})
input[1].map(e => e.slice('fold along '.length).split('=')).forEach((e) => {
    const [foldDirection, coord] = e;
    //console.log('Matrix pre-fold', foldDirection, coord, matrix)
    const matrixKeys = Object.keys(matrix);
    if (foldDirection === 'y') {
        for (let y = 0; y < parseInt(matrixKeys[matrixKeys.length-1], 10) - parseInt(coord, 10); y++) {
            let currIndex = y+parseInt(coord, 10)+1;
            if (matrixKeys.includes(""+currIndex)) {
                Object.keys(matrix[currIndex]).forEach((e) => {
                    const newY = parseInt(coord, 10)-y-1;
                    if (!Object.keys(matrix).includes(""+newY)) {
                        matrix[newY] = {}
                    }
                    matrix[newY][e] = '#'
                })
                delete matrix[currIndex];
            }

        }
    } else if (foldDirection === 'x') {
        for (let i = 0; i < matrixKeys.length; i++) {
            const y = matrixKeys[i];
            const xKeys = Object.keys(matrix[y]);
            //console.log('y', y, xKeys, parseInt(parseInt(xKeys[xKeys.length-1], 10), 10), parseInt(coord, 10))
            for (let j = 0; j < parseInt(parseInt(xKeys[xKeys.length-1], 10), 10) - parseInt(coord, 10); j++ ) {
                const currIndex = j+parseInt(coord, 10)+1
                
                if (Object.keys(matrix[y]).includes(""+currIndex)) {
                    const newX = parseInt(coord, 10)-j-1;
                    //console.log(currIndex, parseInt(coord, 10), j)
                    matrix[y][newX] = '#';
                }
                delete matrix[y][currIndex];
            }
        }
    }
    //console.log('Matrix post-fold', matrix)
})
const [yMax, xMax] = getPaperWidth(matrix)
let final = [];
for (let y = 0; y < yMax+1; y++) {
    if (!Object.keys(matrix).includes(""+y)) {
        for (let x = 0; x < xMax; x++) {
            final[x][y] = '.'
        }
    }
    for (let x = 0; x < xMax+1; x++) {
        console.log(x, y)
        if (!final[y]) {
            final[y] = []
        }
        console.log(!Object.keys(matrix).includes(""+y) || !Object.keys(matrix[y]).includes(""+x))
        if (!Object.keys(matrix).includes(""+y) || !Object.keys(matrix[y]).includes(""+x)) {   
            final[y][x] = '.'
        } else {
            final[y][x] = '#'
        }
    }
}
function getPaperWidth(matrix) {
    const yMax = parseInt(Object.keys(matrix).pop())
    const xMax = Object.keys(matrix).map(y => parseInt(Object.keys(matrix[y]).pop(), 10)).sort((a,b) => a-b).pop()
    return [yMax, xMax]
}
console.log(final.map(e => e.join('')).join('\n'));
//console.log(Object.keys(matrix).map(e => Object.keys(matrix[e]).length ).reduce((accum, val) => accum+val))
//console.log(input, matrix)