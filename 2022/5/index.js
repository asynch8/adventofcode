const stacks = []
require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').forEach((e) => {
    if (e.startsWith('move')) {
        const [,amount,,from,,to] = e.split(' ')
        stacks[to].unshift(...stacks[from].slice(0, amount))
        stacks[from].splice(0, amount)
    } else if (e[1] && e[1] !== '1') {
        let col = 0;
        for (let x = 1; x < e.length; x += 4) {
            col++;
            if (!stacks[col]) {
                stacks[col] = []
            }
            if (e[x] !== ' ') {
                stacks[col].push(e[x])
            } 
        }
    }   
})
console.log('Star 2', stacks.map(e => e[0]).join(''))