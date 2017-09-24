const {dialog} = require('electron').remote

function openFile(moveAndExtract, bookGenerate){
    // show the open dialog
    dialog.showOpenDialog(function(filePaths){
        // move, extract and regenerate the books
        moveAndExtract(filePaths[0]).then(function(){
            bookGenerate();
        })
    });
}


module.exports = openFile;