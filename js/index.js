var path = require('path');
var fs = require("fs");
var JSZip = require("jszip");
var glob = require("glob");
var cheerio = require("cheerio");

const holder = document.querySelector('.holder')
holder.ondragover = () => {
    console.log("dragging");
    return false;
}
holder.ondragleave = holder.ondragend = () => {
    return false;
}

holder.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
        console.log(path.extname(f.path));
        var ext = path.extname(f.path);
        if (ext === '.epub' | '.mobi') {
            console.log("success");
            holder.insertAdjacentHTML('beforeend', book);
        } else {
            alert("you fucked up son!");
        }
        f.path = f.path.replace(ext, '.zip');
        console.log(f.path);
        fs.readFile(f.path, function (err, data) {
            if (err) throw err;
            JSZip.loadAsync(data).then(function (files) {
                console.log(files.files);
            });
        });
        // console.log('File(s) you dragged here: ', f.path)
    }
    return false;
}

// get files ending in .opf in an array
// glob("./books/**/*.opf", function (err, files) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(files);
//     // loop through all of the files
//     files.forEach(function (x) {
//         // read each file
//         fs.readFile(x, 'utf-8', function (err, file) {
//             // create variables for template literal
//             var cover,
//                 title,
//                 author;
//             if (err) {
//                 console.log(err);
//             }
//             // initialise cheerio to create dom
//             var $ = cheerio.load(file, {
//                 xmlMode: true
//             });
//             // find each cover image and assign to cover variable
//             $('item[id ^= "cover"]').each(function () {
//                 var c = this.attribs.href;
//                 if (c.indexOf('.jp') > -1) {
//                     cover = c;
//                 }
//             })
//             // find author and title metadata and assign to corresponding var
//             $("metadata").children().each(function () {
//                 if (this.name == "dc:creator") {
//                     author = this.children[0].data;
//                 }
//                 if (this.name == "dc:title") {
//                     title = this.children[0].data;
//                 }
//             });
//             // create template literal to inject values
//             var bookCase = `
//                 <div class="books">
//                     <div>
//                         <img  src = "${x.substring(0, x.lastIndexOf("/") + 1)}${cover}">    
//                     </div>
//                     <h2>${title}</h2>
//                     <h3>${author}</h3>
//                 </div>
//             `
//             // create book element
//             holder.insertAdjacentHTML('beforeend', bookCase);
//         });
//     })
// });


glob("./books/**/*.opf", function (err, files) {
    if (err) {
        console.log(err);
    }
    console.log(files);
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
            htmlDoc.querySelectorAll('*[id^="cover"]').forEach(function(x){
                if (x.getAttribute("href").match(/(jpeg|jpg)/)){
                    cover = x.getAttribute("href");
                }
            });
            console.log(cover);
            
            // find author and title metadata and assign to corresponding var
            Array.from(htmlDoc.querySelectorAll('metadata')["0"].children).forEach(function(el, i){
                if(el.nodeName == "dc:creator"){
                    author = el.innerHTML;
                }
                if (el.nodeName == "dc:title") {
                    title = el.innerHTML;
                }
            });
            console.log(author);
            console.log(title);

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
        });
    })
});





