var fs = require('fs');
var glob = require('glob');

function saveEditedBook() {
    
    var edit = document.querySelector('.edit');

    // assign .opf path to a variable
    var opfFile = edit.dataset.file;
    // read the .opf file
    fs.readFile(opfFile, 'utf-8', function (err, data) {
        // parse the file into a dom structure
        var parser = new DOMParser();
        htmlDoc = parser.parseFromString(data, "text/html");
        // go though each input
        edit.querySelectorAll('input, textarea').forEach(function (x) {
            console.log(x);
            // grab the 'for' value
            var bookAttribute = x.attributes.for.value;
            console.log(bookAttribute);
            // find the title or author and change value
            Array.from(htmlDoc.querySelectorAll('metadata')["0"].children).forEach(function (el, i) {
                console.log(el.nodeName);

                // check if input is empty
                if (x.value !== '') {
                    // find relevant tag name in .opf file
                    if (el.nodeName == "DC:" + bookAttribute) {
                        el.innerHTML = x.value
                    }
                    if (el.nodeName == "DESCRIPTION") {
                        el.innerHTML = x.value;
                    }
                }
            });
            // if description node doesnt exist, create tags and add description
            if (!htmlDoc.querySelector('description')) {
                var descriptionHTML = "<description>" + x.value + "</description>"
                htmlDoc.querySelector('metadata').insertAdjacentHTML('beforeend', descriptionHTML)
            }
        })
        // turn DOM structure back into a string and write the file
        xmlString = (new XMLSerializer()).serializeToString(htmlDoc);
        fs.writeFileSync(opfFile, xmlString, 'utf-8');
        // animate edit window out
        document.querySelector('.edit').style.webkitAnimation = 'hideEdit 600ms forwards'
        // remove the element once the animation has finished/ element isnt visible anymore
        setTimeout(function () {
            document.querySelector('.edit').remove();
        }, 500)
        // regenerate books
        bookGenerate();
    })
}


module.exports = saveEditedBook;