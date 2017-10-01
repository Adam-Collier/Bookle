const { app } = require('electron').remote
const path = require('path');
var exec = require('child_process').exec;
var rimraf = require('rimraf');

function moveAndExtract(pathToAddedFile) {
    console.log(pathToAddedFile);

    if (path.extname(pathToAddedFile) == '.epub') {
        // define the path the epub will move too
        var bookPath = app.getAppPath() + '/books/epub/' + path.basename(pathToAddedFile);
        // copy the epub to the /books/epub directory
        fs.writeFileSync(bookPath, fs.readFileSync(pathToAddedFile));

        // define the zip path
        // var zipPath = bookPath.slice(0, bookPath.length - 4) + '.zip';
        var zipPath = bookPath.replace(path.extname(bookPath), ".zip");

        return new Promise(function (resolve, reject) {
            // rename from epub to zip and extract all of the files
            fs.rename(bookPath, zipPath, function () {
                var zip = new AdmZip(zipPath);
                // extract all files to /books path
                resolve(zip.extractAllTo(app.getAppPath() + '/books/' + path.basename(zipPath, '.zip'), false));
            })
        })
    }
    if (path.extname(pathToAddedFile) == '.mobi') {

        return new Promise(function (resolve, reject) {
            var originalFileName = path.basename(pathToAddedFile);
            console.log(originalFileName);
            console.log(path.resolve(__dirname, 'kindleunpack/lib'));

            var p = pathToAddedFile.replace(/[-&\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s/g, '\\ ');

            exec('python kindleunpack.py --epub_version=A ' + p + ' ' + path.resolve(__dirname, '../books'), {
                cwd: path.resolve(__dirname, '../kindleunpack/lib')
            }, function(){
                resolve("this has finished");
            });
            // child.on('close', function () {
            //     rimraf.sync(path.resolve(__dirname, '../books/HDImages'));

            //     rimraf.sync(path.resolve(__dirname, '../books/mobi8'));
            //     fs.rename(path.resolve(__dirname, '../books/mobi7'), path.resolve(__dirname, '../books/' + originalFileName), function () {
            //         console.log("renamed");
            //     })
            // })

        });
    }

}

module.exports = moveAndExtract;