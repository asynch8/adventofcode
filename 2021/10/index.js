const input = require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n')
const openingTags = ['{', '<', '(', '['];
const closingTags = ['}', '>', ')', ']'];
const valueMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
// Part one
console.log(input.length)
console.log(input.map((line) => {
    let depth = 0;
    const tagAtDepth = {}
    for (let i = 0; i < line.length; i++) {
        if (openingTags.includes(line[i])) {
            if (!tagAtDepth[depth]) {
                tagAtDepth[depth] = [];
            }
            tagAtDepth[depth].push(line[i])
            depth++
        } else if (closingTags.includes(line[i])) {
            const openingTag = openingTags[closingTags.indexOf(line[i])];
            //console.log(openingTag, tagAtDepth[depth-1].filter(e => e === openingTag).length)
            if (tagAtDepth[depth-1].filter(e => e === openingTag).length !== tagAtDepth[depth-1].filter(e => e === line[i]).length + 1) {
                //console.log('CORRUPTED', depth, tagAtDepth[depth-1], line[i], tagAtDepth, line)
                return valueMap[line[i]]
            }
            tagAtDepth[depth-1].push(line[i])
            depth--
        }
    }
    return null
}).filter(e => e).length)

const autocompleteScore = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}
// part two
const corruptedLines = input.map((line, index) => {
    let depth = 0;
    const tagAtDepth = {}
    for (let i = 0; i < line.length; i++) {
        if (openingTags.includes(line[i])) {
            if (!tagAtDepth[depth]) {
                tagAtDepth[depth] = [];
            }
            tagAtDepth[depth].push(line[i])
            depth++
        } else if (closingTags.includes(line[i])) {
            const openingTag = openingTags[closingTags.indexOf(line[i])];
            //console.log(openingTag, tagAtDepth[depth-1].filter(e => e === openingTag).length)
            if (tagAtDepth[depth-1].filter(e => e === openingTag).length !== tagAtDepth[depth-1].filter(e => e === line[i]).length + 1) {
                //console.log('CORRUPTED', depth, tagAtDepth[depth-1], line[i], tagAtDepth, line)
                return index
            }
            tagAtDepth[depth-1].push(line[i])
            depth--
        }
    }
    return null
}).filter(e => e !== null);
console.log(corruptedLines.length, input.filter((e, i) => corruptedLines.indexOf(i) === -1).length)
const additions = input.filter((e, i) => corruptedLines.indexOf(i) === -1).map((line) => {
    let additions = [];
    const charCount = {
        '}': 0,
        '>': 0,
        ']': 0,
        ')': 0
    }
    for(let i = line.length -1; 0 <= i; i--) {
        if (closingTags.includes(line[i])) {
            charCount[line[i]] += 1
        } else if (openingTags.includes(line[i])) {
            const closingTag = closingTags[openingTags.indexOf(line[i])];
            if (charCount[closingTag] === 0) {
                additions.push(closingTag)
            } else {
                charCount[closingTag] -= 1
            }
        }
    }
    return additions
}).map((additions) => {
    let sum = 0;
    for (let i = 0; i < additions.length; i++) {
        sum = (sum * 5) + autocompleteScore[additions[i]]
    }
    return sum
});
console.log(additions.sort((a, b) => a - b).length, additions.sort((a, b) => a - b)[Math.floor(additions.length / 2)])