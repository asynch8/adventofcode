const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n')
const tombola = input[0].split(',');
let boardgen = input.slice(1).filter(e => e !== '');
let boards = [];
let boardsWon = {}
console.log(boardgen)
for (let i = 0; i < boardgen.length / 5; i++) {
    // console.log(i * 5, boardgen.slice(i * 5, (i * 5) + 5))
    boards.push(boardgen.slice(i * 5, (i * 5) + 5).map(e => e.split(' ').filter(e => e !== '')));
    // console.log( 'Diagonal', diagonal)
}
console.log('Tombola', tombola)
console.log('Boards', boards)
tombolaloop:
    for (let i = 0; i < tombola.length; i++) {
        //console.log(i * 5, tombola.slice(0, (i * 5) + 5))
        for (let j = 0; j < boards.length; j++) {
            console.log(boards[j])
            const bingos = matrixHasBingo(boards[j], tombola.slice(0, i));
            if (bingos.length > 0) {
                const lastTombola = tombola.slice(i-1, i).pop()
                const countUnpicked = [].concat(
                    ...boards[j].map(e => e.filter(col => tombola.slice(0, i).indexOf(col) === -1).map(e => parseInt(e, 10)))
                ).reduce((accum, currVal) => {
                    return accum + currVal
                });
                console.log(
                    'Bingo', 
                    j, 
                    boards[j],
                    lastTombola, countUnpicked, lastTombola * countUnpicked
                )
                boardsWon[j] = true;
                if (Object.values(boardsWon).length === boards.length) {
                    break tombolaloop;
                }
            }

        }
        
    }
function getCombos(board) {
    
    const diagonal = [];
    // console.log('Board', board)
    for (let j = 0; j < board.length; j++) {
        diagonal.push([].concat(...board.map((e) => {
            return [ e[j] ];
        })))
    }
    return [...board, ...diagonal]
}
function matrixHasBingo(board, tombola) {
    const matrix = getCombos(board);
    console.log(matrix, tombola)
    return matrix.filter((col) => {
        return col.filter((e) => {
            return tombola.indexOf(e) > -1
        }).length === col.length
    })
}
//console.log(input)