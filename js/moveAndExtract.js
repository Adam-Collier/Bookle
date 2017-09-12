const { app } = require('electron').remote

function moveAndExtract(pathToAddedFile, generateLibrary) {
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

module.exports = moveAndExtract;