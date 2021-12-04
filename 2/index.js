let coord = { h: 0, d: 0 }
let input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n')
input.forEach((e) => {
    let [action, force] = e.split(' ')
    force = parseInt(force, 10)
    switch(action) {
        case 'forward':
            coord.h += force;
            break;
        case 'up':
            coord.d -= force;
            break;
        case 'down':
            coord.d += force;
            break;
    }
})
console.log(coord.h * coord.d);

coord = { h: 0, d: 0, a: 0 }
input.forEach((e) => {
    let [action, force] = e.split(' ')
    force = parseInt(force, 10)
    switch(action) {
        case 'forward':
            coord.h += force;
            coord.d += force * coord.a;
            break;
        case 'up':
            coord.a -= force;
            break;
        case 'down':
            coord.a += force;
            break;
    }
})
console.log(coord.h * coord.d);