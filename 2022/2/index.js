const opponentsOptions = ['A', 'B', 'C']
const myOptions = ['X', 'Y', 'Z']
const calculated = {}
let scoreCounter = 0;
function starOne(line) {
    let [opponentsMove, counterMove] = line
    if (opponentsOptions.indexOf(opponentsMove) === (myOptions.indexOf(counterMove) === 0 ? 2 : myOptions.indexOf(counterMove) - 1)) {
        scoreCounter += 6
    } else if (opponentsOptions.indexOf(opponentsMove) === myOptions.indexOf(counterMove)) {
        scoreCounter += 3
    }
    scoreCounter += myOptions.indexOf(counterMove)+1
    console.log('Star 1', scoreCounter) 
}
function starTwo(line) {
    let temp = 0;
    let [opponentsMove, requiredMove] = line
    //console.log(line)
    if (calculated[opponentsMove+requiredMove]) {
        return calculated[opponentsMove+requiredMove]
    }
    switch(myOptions.indexOf(requiredMove)) {
        case 0:
            console.log('Lose', (opponentsOptions.indexOf(opponentsMove) === 0), (opponentsOptions.indexOf(opponentsMove) === 0) ? 3 : opponentsOptions.indexOf(opponentsMove))
            temp += (opponentsOptions.indexOf(opponentsMove) === 0) ? 3 : opponentsOptions.indexOf(opponentsMove)
            break;
        case 1:
            console.log('Draw', opponentsMove, opponentsOptions.indexOf(opponentsMove) + 1)
            temp += opponentsOptions.indexOf(opponentsMove) + 1
            temp += 3
            break;
        case 2:
            console.log('Win', opponentsOptions.indexOf(opponentsMove) === 2, opponentsOptions.indexOf(opponentsMove), (opponentsOptions.indexOf(opponentsMove) === 2) ? 1 : opponentsOptions.indexOf(opponentsMove) + 1)
            temp += (opponentsOptions.indexOf(opponentsMove) === 2) ? 1 : opponentsOptions.indexOf(opponentsMove) + 2; 
            temp += 6
            break;
    }
    console.log('temp', line, temp)
    calculated[opponentsMove+requiredMove] = temp;
    return temp;
    //scoreCounter += temp
    console.log('Star 2', scoreCounter);
}
//require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(line => line.split(' ')).forEach(starOne);
console.log(require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').map(line => line.split(' ')).map(starTwo).reduce((previousValue, currentValue) => previousValue + currentValue, 0));
console.log(calculated)