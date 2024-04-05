let currentPath = '/';
let currentCommand = '';
const filetree = {
    name: '/',
    type: 'directory',
    children: []
};
const currDirr = filetree
function getCurrFiletree(path) {
    let temp = filetree
    const splitPath = path.split('/').filter(e => e)
    //console.log(splitPath)
    for (let i = 0; i < splitPath.length; i++) {
        //console.log('found', filetree.children, filetree.children.find(e => e.name === splitPath[i]), splitPath, i)
        temp = temp.children.find(e => e.name === splitPath[i])
    }
    return temp
}
require('fs').readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\r\n').forEach((e) => {
    //console.log(e)
    const splitCommand = e.split(' ');
    if (e[0] === '$') {
        switch(splitCommand[1]) {
            case 'cd':
                if (splitCommand[2].startsWith('/')) {
                    //console.log(currentPath, splitCommand[2])
                    currentPath = splitCommand[2]
                }else if(splitCommand[2] === '..') {
                    //console.log('..', currentPath, currentPath.split('/').slice(0, -1).join('/') || '/')
                    currentPath = currentPath.split('/').slice(0, -1).join('/') || '/'
                } else {
                    //console.log(currentPath, `${currentPath !== '/' ? currentPath : ''}/${splitCommand[2]}`)
                    currentPath = `${currentPath !== '/' ? currentPath : ''}/${splitCommand[2]}`
                }
                //console.log(currentPath)
                break;
            case 'ls':
                currentCommand = 'ls';
                break;
        }
    } else {
        console.log('running command from previous session', currentCommand)
        if (currentCommand === 'ls') {
            const currFileTree = getCurrFiletree(currentPath)
            //console.log('CurrFileTree', currFileTree, currentPath)
            const child = {
                name: splitCommand[1],
                type: splitCommand[0] === 'dir' ? 'directory' : 'file',
            };
            if (splitCommand[0] === 'dir') {
                child.children = []
            } else {
                child.size = Number(splitCommand[0])
            }
            //console.log('Appending', child, 'to', currentPath, currFileTree)
            currFileTree.children.push(child)
        }
    }
});
let size = 0;
let smallEnough = [];
function getDirectorySize(ft) {
    /*const currElement = filetree.children.find((e) => {
        return e.name === dir
    })*/
    const directories = ft.children.filter(e => e.type === 'directory')
    for (let i = 0; i < directories.length; i++) {
        directories[i].size = getDirectorySize(directories[i])
        if (directories[i].size < 100000) { // Star 1
            size += directories[i].size;
        }
    }
    const files = ft.children.filter(e => e.type === 'file')
    const totalFileSize = files.reduce((accum, val) => accum += val.size, 0)
    const totalDirectorySize = directories.reduce((accum, val) => accum += val.size, 0)
    //console.log(directories, files, totalFileSize, totalDirectorySize)
    return totalFileSize+totalDirectorySize
}
filetree.size = getDirectorySize(filetree)
const totalSpace = 70000000;
const requiredSpace = 30000000;
const needToDelete = requiredSpace-(totalSpace-filetree.size)
function getSmallestDir(ft, path='/') {
    let smallestDir = null;
    for (let i = 0; i < ft.children.length; i++) {
        const currentElement = ft.children[i];
        if (currentElement.type === 'directory') {
            //console.log('', currentElement.size, needToDelete, currentElement.size >= needToDelete)
            if (currentElement.size >= needToDelete) {
                //console.log('Is big enough', !smallestDir, currentElement.size < smallestDir, smallestDir, currentElement.size)
                if (!smallestDir || currentElement.size < smallestDir) {
                    //console.log('Setting smallest directory', currentElement.size)
                    smallestDir = currentElement.size
                }
                const smallestSubFolder = getSmallestDir(currentElement, path+currentElement.name+'/')
                //console.log('SmallestFoler', !smallestDir, smallestSubFolder < smallestDir, smallestDir, smallestSubFolder)
                if (smallestSubFolder && (!smallestDir || smallestSubFolder < smallestDir)) {
                    smallestDir = smallestSubFolder;
                }
                
            }
            //console.log('Smallest', smallestDir)
        }
    }
    //console.log(smallestDir)
    return smallestDir
}
//filetree.children.filter((e) => {
//    return e.type === 'directory'
//}).forEach((e) => {
//    e.size = getDirectorySize(e.name, filetree);
//})
console.log(filetree)
//console.log(size)
console.log(getSmallestDir(filetree))


/*console.log(filetree.children.filter((child) => {
    return child.type === 'directory' && child.size < 100000;
}))*/