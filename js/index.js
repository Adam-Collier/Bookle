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
    // loop through the dragged files
    for (let f of e.dataTransfer.files) {
        // get path of dragged files
        console.log(path.extname(f.path));
        // check files have the correct extension
        var ext = path.extname(f.path);
        if (ext === '.epub' | '.mobi') {
            console.log("success");
            // call book generator function
        } else {
            alert("you fucked up son!");
        }
        moveAndExtract(f.path, bookGenerate);
    }
    return false;
}
document.querySelector('.add').addEventListener("click", function () {
    openFile(moveAndExtract, bookGenerate);
})





