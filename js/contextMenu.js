var glob = require("glob");
var bookGenerate = require('./bookGenerate');
var rimraf = require('rimraf');


menu.append(new MenuItem({ label: 'Edit', click() { console.log('item 1 clicked') } }))
// menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({
    label: 'Delete', click(e) {
        // get the data-file attribute from the target element
        console.log(delElement.dataset.file);
        //  escape the square brackets
        var del = delElement.dataset.file.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        console.log(del);
        // find all of the book files with the given name
        glob("./books/**/" + del + "*", function (err, files) {
            if (err) {
                console.log(err);
            }
            console.log(files);
            // store all of the promises in an array
            var promises = [];
            // loop over the found paths
            files.forEach(function (x) {
                // push each promise to the promises array
                promises.push(
                    // check if the file is a directory or a file
                    fs.stat(x, function (err, stats) {
                        console.log(stats.isFile());
                        // if file delete file else delete directory
                        stats.isFile() ? fs.unlinkSync(x) : rimraf.sync(x);
                    })
                )
            })
            // when all of the promises pushed then method called
            Promise.all(promises).then(function () {
                bookGenerate();
            })
        })
    }
}))