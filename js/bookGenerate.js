var glob = require("glob");
var path = require("path");

function bookGenerate() {

    // remove pre existing books
    holder.querySelectorAll('.books').forEach(function (x) {
        x.remove();
    })
    // glob to find the opf files easier
    glob("./books/**/*.opf", function (err, files) {
        // create empty array to store objects
        var booksArray = [];
        // go through each file
        files.forEach(function (x) {
            // create an object to store the metadata
            var metaObject = {};
            // add the file property and value
            metaObject.file = x;

            // read and parse into DOM structure
            var file = fs.readFileSync(x, 'utf-8');

            parser = new DOMParser();
            htmlDoc = parser.parseFromString(file, "text/xml");

            Array.from(htmlDoc.querySelectorAll('metadata')["0"].children).forEach(function (el, i) {

                if (el.nodeName == "dc:creator") {
                    // add author property to metaObject
                    metaObject.author = el.innerHTML;
                }
                if (el.nodeName == "dc:title") {
                    // add title property to metaObject
                    metaObject.title = el.innerHTML;
                }
            });

            // find each cover image path 
            htmlDoc.querySelectorAll('*[id*="cover"]').forEach(function (x) {
                if (x.getAttribute("href").match(/(jpeg|jpg)/)) {
                    metaObject.cover = x.getAttribute("href") + "?" + new Date().getTime();
                }
            });

            // push object to the array
            booksArray.push(metaObject);
        })
        // sort the array alphabetically by author
        booksArray.sort(function (a, b) {
            return (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0);
        });

        // empty array for Promise.all
        var promises = [];
        // loop through all of the files
        booksArray.forEach(function (x) {

            var fileName = x.file.split('/')[2];
            // new promise constructor for each book (makes promiseable)
            var bookPromise = new Promise(function (resolve, reject) {
                // create variables for template literal
                var cover,
                    title,
                    author;

                // create template literal to inject values
                var bookCase = `
                <div data-file = "${fileName}" class="books">
                    <div>
                        <img  src = "${x.file.substring(0, x.file.lastIndexOf("/") + 1)}${x.cover}">    
                    </div>
                    <h2>${x.title}</h2>
                    <h3>${x.author}</h3>
                </div>
            `
                // create book element
                holder.insertAdjacentHTML('beforeend', bookCase);
                // animate each book in
                var last = holder.querySelectorAll('.books:last-child')['0'];
                setTimeout(function () {
                    last.style.webkitAnimation = 'show 1s forwards'
                }, 180 * (holder.querySelectorAll('.books').length));

                // listen for when the animation finishes and remove
                holder.addEventListener('webkitAnimationEnd', function handler(e) {
                    this.style.webkitAnimation = '';
                    console.log("animation removed");
                    // remove the event listener for other functions
                    this.removeEventListener('webkitAnimationEnd', arguments.callee);
                }, false);

                // resolve the data from readFile
                resolve();
            })
            // push each promise to the array
            promises.push(bookPromise);
        })
        console.log(promises);
        // When all promises collected promise all is thennable
        Promise.all(promises).then(function () {
            // add event context menu event listener to each .book
            document.querySelectorAll(".books").forEach(function (x) {
                x.addEventListener('contextmenu', (e) => {
                    e.preventDefault()
                    bookElement = e.target.closest(".books");
                    menu.popup(remote.getCurrentWindow())
                }, false)
            })
        })
    });
}

module.exports = bookGenerate;






