var glob = require("glob");
var bookGenerate = require('./bookGenerate');
var rimraf = require('rimraf');


menu.append(new MenuItem({
    label: 'Edit', click() {

        // collect all of the existing metadata in variables
        var title = bookElement.querySelector('h2').innerHTML;
        var author = bookElement.querySelector('h3').innerHTML;
        var cover = bookElement.querySelector('img').src;

        // create the div structure and store in a template literal
        var editWindow = `
<div class="edit">
    <div class="left">
    <img src="${cover}" alt="">
    </div>
    <div class="right">
    <label for="author">Author</label>
    <input type="text" placeholder="${author}">
    <label for="Title">Title</label>
    <input type="text" placeholder="${title}">
    <label for="description">Description</label>
    <textarea name="description" id="description" placeholder="add description here"></textarea>
    <button>SAVE</button>
    </div>
    <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="close" width="100%" height="100%" viewBox="0 0 59 59" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M53.981,1.84l0.217,0.028l0.213,0.047l0.208,0.066l0.201,0.083l0.194,0.101l0.184,0.117l0.173,0.133l0.16,0.147l0.148,0.161l0.132,0.173l0.118,0.184l0.1,0.194l0.084,0.201l0.065,0.208l0.048,0.213l0.028,0.216l0.01,0.218l-0.01,0.218l-0.028,0.216l-0.048,0.213l-0.065,0.208l-0.084,0.202l-0.1,0.193l-0.118,0.184l-0.132,0.173l-0.148,0.161l-49.433,49.433l-0.161,0.148l-0.173,0.133l-0.184,0.117l-0.193,0.101l-0.202,0.083l-0.208,0.066l-0.213,0.047l-0.216,0.028l-0.218,0.01l-0.218,-0.01l-0.216,-0.028l-0.213,-0.047l-0.208,-0.066l-0.202,-0.083l-0.193,-0.101l-0.184,-0.117l-0.173,-0.133l-0.161,-0.148l-0.147,-0.16l-0.133,-0.173l-0.117,-0.184l-0.101,-0.194l-0.083,-0.201l-0.066,-0.208l-0.047,-0.213l-0.028,-0.216l-0.01,-0.218l0.01,-0.218l0.028,-0.216l0.047,-0.213l0.066,-0.208l0.083,-0.202l0.101,-0.193l0.117,-0.184l0.133,-0.173l0.147,-0.161l49.434,-49.434l0.161,-0.147l0.173,-0.133l0.184,-0.117l0.193,-0.101l0.202,-0.083l0.208,-0.066l0.212,-0.047l0.217,-0.028l0.218,-0.01l0.217,0.01Z" style="fill:#000;"/><path d="M4.548,1.84l0.216,0.028l0.213,0.047l0.208,0.066l0.202,0.083l0.193,0.101l0.184,0.117l0.173,0.133l0.161,0.147l49.433,49.434l0.148,0.161l0.132,0.173l0.118,0.184l0.1,0.193l0.084,0.202l0.065,0.208l0.048,0.213l0.028,0.216l0.01,0.218l-0.01,0.218l-0.028,0.216l-0.048,0.213l-0.065,0.208l-0.084,0.201l-0.1,0.194l-0.118,0.184l-0.132,0.173l-0.148,0.16l-0.16,0.148l-0.173,0.133l-0.184,0.117l-0.194,0.101l-0.201,0.083l-0.208,0.066l-0.213,0.047l-0.217,0.028l-0.217,0.01l-0.218,-0.01l-0.217,-0.028l-0.212,-0.047l-0.208,-0.066l-0.202,-0.083l-0.193,-0.101l-0.184,-0.117l-0.173,-0.133l-0.161,-0.148l-49.434,-49.433l-0.147,-0.161l-0.133,-0.173l-0.117,-0.184l-0.101,-0.193l-0.083,-0.202l-0.066,-0.208l-0.047,-0.213l-0.028,-0.216l-0.01,-0.218l0.01,-0.218l0.028,-0.216l0.047,-0.213l0.066,-0.208l0.083,-0.201l0.101,-0.194l0.117,-0.184l0.133,-0.173l0.147,-0.161l0.161,-0.147l0.173,-0.133l0.184,-0.117l0.193,-0.101l0.202,-0.083l0.208,-0.066l0.213,-0.047l0.216,-0.028l0.218,-0.01l0.218,0.01Z" style="fill:#000;"/></svg>
</div>
`
        // on click append the template literal to the book container
        document.querySelector('.holder').insertAdjacentHTML('beforeend', editWindow);
        // animate element in
        document.querySelector('.edit').style.webkitAnimation = 'showEdit 600ms forwards'
        // add a click event to the close button
        document.querySelector('.close').addEventListener('click', function () {
            // animate element out
            document.querySelector('.edit').style.webkitAnimation = 'hideEdit 600ms forwards'
            // remove the element once the animation has finished/ element isnt visible anymore
            setTimeout(function () {
                document.querySelector('.edit').remove();
            }, 500)
        });
    }
}))
// menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({
    label: 'Delete', click(e) {
        // get the data-file attribute from the target element
        console.log(bookElement.dataset.file);
        //  escape the square brackets
        var del = bookElement.dataset.file.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
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
            // when all of the promises pushed .then method called
            Promise.all(promises).then(function () {
                bookGenerate();
            })
        })
    }
}))