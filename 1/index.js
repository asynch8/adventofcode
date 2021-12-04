console.log('Part one increase:', require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map((e, i, v) => {
    return i !== 0 ? (e - v[i - 1]) > 0  : null;
}).filter(e => e).length)
console.log('Part two increase:', require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map((e, i, v) => {
    return i > 2 ? (e - v[i - 3]) > 0  : null;
}).filter(e => e).length)