var path = require('path');
var fs = require("fs");
var glob = require("glob");
var AdmZip = require('adm-zip');


var bookGenerate = require('./js/bookGenerate');
var openFile = require('./js/openFile');
var moveAndExtract = require('./js/moveAndExtract');
var saveEditedBook = require('./js/saveEditedBook');

// require in dependencies for the context menu
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const drag = document.querySelector('.drag')
const holder = document.querySelector('.holder')

// generate books
bookGenerate(holder);

// set the menu variable
const menu = new Menu()
// require context menu items
require('./js/contextMenu');

holder.ondragover = (e) => {
    e.preventDefault()
    console.log("dragging");
    if (path.extname(e.dataTransfer.files[0].path).match(/(epub|mobi)/)) {
        // display drop area
        drag.classList.add('drag-hover')
        // return false;
    }
}
drag.ondragleave = holder.ondragend = () => {
    drag.classList.remove('drag-hover');
    return false;
}
holder.ondrop = (e) => {
    e.preventDefault();
    return false;
}
drag.ondrop = (e) => {
    e.preventDefault()
    // remove drag overlay
    drag.classList.remove('drag-hover');

    var files = [];
    // loop through the dragged files
    for (let f of e.dataTransfer.files) {
        // check files have the correct extension
        var ext = path.extname(f.path);
        if (ext.match(/(epub|mobi)/)) {
            console.log("success");
            // push to files array
            files.push(f.path);
        }
        // moveAndExtract(f.path, bookGenerate);
    }
    console.log(files);
    // map through all of the files added
    files.map(function (x, i) {
        // move and extract the files
        moveAndExtract(x).then(function () {
            // check if all of the files have been extracted
            if (i === files.length - 1) {
                // regenrate the books
                bookGenerate();
            }
        })
    })
    return false;
}
document.querySelector('.add').addEventListener("click", function () {
    openFile(moveAndExtract, bookGenerate);
})





