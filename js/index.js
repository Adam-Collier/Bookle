var path = require('path');
var fs = require("fs");
var glob = require("glob");
var replaceExt = require('replace-ext');
var AdmZip = require('adm-zip');

var bookGenerate = require('./js/bookGenerate');
var openFile = require('./js/openFile');
var moveAndExtract = require('./js/moveAndExtract');

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
    // display drop area
    drag.classList.add('drag-hover')
    // return false;
}
drag.ondragleave = holder.ondragend = () => {
    drag.classList.remove('drag-hover');
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
        if (ext === '.epub' | '.mobi') {
            console.log("success");
            // push to files array
            files.push(f.path);
        } else {
            alert("you fucked up son!");
        }
        // moveAndExtract(f.path, bookGenerate);
    }
    files.map(function (x, i) {
        console.log(x);
        moveAndExtract(x).then(function () {
            if (i == files.length - 1) {
                bookGenerate();
            }
        })
    })
    return false;
}
document.querySelector('.add').addEventListener("click", function () {
    openFile(moveAndExtract, bookGenerate);
})





