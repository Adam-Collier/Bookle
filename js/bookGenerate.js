var glob = require("glob");
var extract = require('extract-zip');

function bookGenerate(){
    holder.querySelectorAll('.books').forEach(function (x) {
        x.remove();
    })
    glob("./books/**/*.opf", function (err, files) {
        if (err) {
            console.log(err);
        }
        // console.log(files);
        // loop through all of the files
        files.forEach(function (x) {
            // read each file
            fs.readFile(x, 'utf-8', function (err, file) {
                // create variables for template literal
                var cover,
                    title,
                    author;
                if (err) {
                    console.log(err);
                }
                // parse string as HTML
                parser = new DOMParser();
                htmlDoc = parser.parseFromString(file, "text/xml");
                // find each cover image path 
                htmlDoc.querySelectorAll('*[id*="cover"]').forEach(function (x) {
                    if (x.getAttribute("href").match(/(jpeg|jpg)/)) {
                        cover = x.getAttribute("href");
                    }
                });
                console.log(cover);

                // find author and title metadata and assign to corresponding var
                Array.from(htmlDoc.querySelectorAll('metadata')["0"].children).forEach(function (el, i) {

                    if (el.nodeName == "dc:creator") {
                        author = el.innerHTML;
                    }
                    if (el.nodeName == "dc:title") {
                        title = el.innerHTML;
                    }
                });
                // console.log(author);
                // console.log(title);

                // create template literal to inject values
                var bookCase = `
                <div class="books">
                    <div>
                        <img  src = "${x.substring(0, x.lastIndexOf("/") + 1)}${cover}">    
                    </div>
                    <h2>${title}</h2>
                    <h3>${author}</h3>
                </div>
            `
                // create book element
                holder.insertAdjacentHTML('beforeend', bookCase);
                // animate each book in
                var last = holder.querySelectorAll('.books:last-child')['0'];
                setTimeout(function () {
                    last.style.webkitAnimation = 'show 500ms forwards'
                }, 100 * (holder.querySelectorAll('.books').length));

                holder.addEventListener('webkitAnimationEnd', function () {
                    this.style.webkitAnimation = '';
                    console.log("animation removed");
                }, false);
            });
        })
    });
}

module.exports = bookGenerate;