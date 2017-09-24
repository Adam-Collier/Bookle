var glob = require("glob");
var bookGenerate = require('./bookGenerate');
var rimraf = require('rimraf');
const { dialog } = require('electron').remote;
const path = require('path');


menu.append(new MenuItem({
    label: 'Edit', click() {

        // collect all of the existing metadata in variables
        var title = bookElement.querySelector('h2').innerHTML;
        var author = bookElement.querySelector('h3').innerHTML;
        var cover = bookElement.querySelector('img').src;
        // declare variable for metadata we dont yet have
        var description;

        //  escape the square brackets of file name
        var bookFileName = bookElement.dataset.file.replace(/\[/g, '\\[').replace(/\]/g, '\\]');

        // find the relevant .opf file
        glob("./books/" + bookFileName + "/**/*.opf", function (err, files) {
            // read the .opf file
            fs.readFile(files[0], 'utf-8', function (err, data) {
                // parse into a DOM structure
                parser = new DOMParser();
                htmlDoc = parser.parseFromString(data, "text/html");
                // if no description keep textarea empty
                if (htmlDoc.querySelector('description') == undefined) {
                    description = "";
                }
                else {
                    description = htmlDoc.querySelector('description').textContent.replace(/<\/?[^>]+(>|$)/g, "");
                }
                // call promise resolve so html created once description found
                Promise.resolve(data).then(function () {
                    // create the div structure and store in a template literal
                    var editWindow = `
<div data-file="${files[0]}" class="edit">
    <div class="left">
    <div>
    <img src="${cover}" alt="">
    <img class="uploadCover" src="./img/upload.svg">
    </div>
    </div>
    <div class="right">
    <label>Author</label>
    <input type="text" for="CREATOR" placeholder="${author}">
    <label>Title</label>
    <input type="text" for="TITLE" placeholder="${title}">
    <label>Description</label>
    <textarea for="DESCRIPTION" id="description" placeholder = "Write description here...">${description}</textarea>
    <button onclick="saveEditedBook()">SAVE</button>
    </div>
    <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="close" width="100%" height="100%" viewBox="0 0 59 59" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M53.981,1.84l0.217,0.028l0.213,0.047l0.208,0.066l0.201,0.083l0.194,0.101l0.184,0.117l0.173,0.133l0.16,0.147l0.148,0.161l0.132,0.173l0.118,0.184l0.1,0.194l0.084,0.201l0.065,0.208l0.048,0.213l0.028,0.216l0.01,0.218l-0.01,0.218l-0.028,0.216l-0.048,0.213l-0.065,0.208l-0.084,0.202l-0.1,0.193l-0.118,0.184l-0.132,0.173l-0.148,0.161l-49.433,49.433l-0.161,0.148l-0.173,0.133l-0.184,0.117l-0.193,0.101l-0.202,0.083l-0.208,0.066l-0.213,0.047l-0.216,0.028l-0.218,0.01l-0.218,-0.01l-0.216,-0.028l-0.213,-0.047l-0.208,-0.066l-0.202,-0.083l-0.193,-0.101l-0.184,-0.117l-0.173,-0.133l-0.161,-0.148l-0.147,-0.16l-0.133,-0.173l-0.117,-0.184l-0.101,-0.194l-0.083,-0.201l-0.066,-0.208l-0.047,-0.213l-0.028,-0.216l-0.01,-0.218l0.01,-0.218l0.028,-0.216l0.047,-0.213l0.066,-0.208l0.083,-0.202l0.101,-0.193l0.117,-0.184l0.133,-0.173l0.147,-0.161l49.434,-49.434l0.161,-0.147l0.173,-0.133l0.184,-0.117l0.193,-0.101l0.202,-0.083l0.208,-0.066l0.212,-0.047l0.217,-0.028l0.218,-0.01l0.217,0.01Z" style="fill:#000;"/><path d="M4.548,1.84l0.216,0.028l0.213,0.047l0.208,0.066l0.202,0.083l0.193,0.101l0.184,0.117l0.173,0.133l0.161,0.147l49.433,49.434l0.148,0.161l0.132,0.173l0.118,0.184l0.1,0.193l0.084,0.202l0.065,0.208l0.048,0.213l0.028,0.216l0.01,0.218l-0.01,0.218l-0.028,0.216l-0.048,0.213l-0.065,0.208l-0.084,0.201l-0.1,0.194l-0.118,0.184l-0.132,0.173l-0.148,0.16l-0.16,0.148l-0.173,0.133l-0.184,0.117l-0.194,0.101l-0.201,0.083l-0.208,0.066l-0.213,0.047l-0.217,0.028l-0.217,0.01l-0.218,-0.01l-0.217,-0.028l-0.212,-0.047l-0.208,-0.066l-0.202,-0.083l-0.193,-0.101l-0.184,-0.117l-0.173,-0.133l-0.161,-0.148l-49.434,-49.433l-0.147,-0.161l-0.133,-0.173l-0.117,-0.184l-0.101,-0.193l-0.083,-0.202l-0.066,-0.208l-0.047,-0.213l-0.028,-0.216l-0.01,-0.218l0.01,-0.218l0.028,-0.216l0.047,-0.213l0.066,-0.208l0.083,-0.201l0.101,-0.194l0.117,-0.184l0.133,-0.173l0.147,-0.161l0.161,-0.147l0.173,-0.133l0.184,-0.117l0.193,-0.101l0.202,-0.083l0.208,-0.066l0.213,-0.047l0.216,-0.028l0.218,-0.01l0.218,0.01Z" style="fill:#000;"/></svg>
</div>
`;
                    // on click append the template literal to the book container
                    document.querySelector('.holder').insertAdjacentHTML('beforeend', editWindow);
                    // animate element in
                    document.querySelector('.edit').style.webkitAnimation = 'showEdit 600ms forwards'

                    // add a click event to the close button
                    document.querySelector('.close').addEventListener('click', function () {
                        // animate element out
                        document.querySelector('.edit').style.webkitAnimation = 'hideEdit 300ms forwards'
                        // remove the element once the animation has finished/ element isnt visible anymore
                        setTimeout(function () {
                            document.querySelector('.edit').remove();
                        }, 250)
                    });

                    // add a new book cover
                    document.querySelector('.uploadCover').addEventListener('click', function(){
                        // open the dialog window to show files
                        dialog.showOpenDialog({
                            filters: [
                                { name: 'Images', extensions: ['jpg', 'png'] }
                            ],
                            properties: ['openFile']
                        }, function (filePaths) {
                            // find each cover image path 
                            htmlDoc.querySelectorAll('*[id*="cover"]').forEach(function (x) {
                                if (x.getAttribute("href").match(/(jpeg|jpg)/)) {
                                    // console.log('./books' + bookElement.dataset.file + '/' + x.getAttribute("href"))

                                    glob("./books/" + bookFileName + "/**/" + x.getAttribute("href"), function (err, cover) {
                                        console.log(path.dirname(cover[0]))
                                        var coverName = x.getAttribute("href").split('/')
                                        console.log(coverName[coverName.length-1])

                                        fs.writeFileSync(cover[0], fs.readFileSync(filePaths[0]));

                                        

                                        document.querySelector('.left img').src = document.querySelector('.left img').src + "?" + new Date().getTime();

                                        console.log(document.querySelector('.left img'))
                                    })
                                }
                            });
                        });
                    })
                });
            })
        })
    }
}))
// menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({
    label: 'Delete', click(e) {
        console.log(bookElement);
        // get the data-file attribute from the target element
        console.log(bookElement.dataset.file);
        //  escape the square brackets
        var bookFileName = bookElement.dataset.file.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        console.log(bookFileName);
        // find all of the book files with the given name
        glob("./books/**/" + bookFileName + "*", function (err, files) {
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
                        // if file bookFileName delete file else bookFileName delete directory
                        stats.isFile() ? fs.unlinkSync(x) : rimraf.sync(x);
                    })
                )
            })
            // when all of the promises pushed .then method called
            Promise.all(promises).then(function () {
                bookElement.style.webkitAnimation = 'hide 600ms ease-out forwards'
                // remove the element once the animation has finished/ element isnt visible anymore
                setTimeout(function () {
                    bookElement.remove();
                }, 600)
            })
        })
    }
}))