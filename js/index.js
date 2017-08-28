var path = require('path');
var fs = require("fs");
var bookGenerate = require('./js/bookGenerate');
var glob = require("glob");
var extract = require('extract-zip');

const drag = document.querySelector('.drag')
const holder = document.querySelector('.holder')

bookGenerate(holder);

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
        // change the extension from mobi/epub to zip
        f.path = f.path.replace(ext, '.zip');
        // extract zip to directory with basename of path
        extract(f.path, { dir: path.join(__dirname, 'books/'+path.basename(f.path)) }, function (err) {
            // extraction is complete. make sure to handle the err
            if(err){
                console.log(err);
            }
            bookGenerate(holder);
        })
    }
    
    return false;
}





