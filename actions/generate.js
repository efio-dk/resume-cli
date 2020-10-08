const path = require("path");
const fs = require("fs");
const Docxtemplater = require('docxtemplater');
//const ImageModule = require("../node_modules/docxtemplater-image-module/es6");
const ImageModule = require("docxtemplater-image-module-free");

const PizZip = require('pizzip');
const https = require("https");
const Stream = require("stream").Transform;


module.exports = (resumePath, templatePath, destination) => {
  
    var content = fs.readFileSync(path.resolve(process.cwd(), templatePath), 'binary');
    const json = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), resumePath)));
    var zip = new PizZip(content);

    const doc_options = getDocumentOptions();
    const imageModule = getImageModule();


    // Compile the docx document
    var doc;
    try {
        doc = new Docxtemplater()
            .loadZip(zip)
            .setOptions(doc_options)
            .attachModule(imageModule)
            .compile();
    }
    catch(error) {
        errorHandler(error);
    }


    // Save the result
    doc
    .resolveData(json)
    .then(() => {
        console.log("data resolved")
        doc.render();
        console.log("document rendered successfully")
        const buffer = doc.getZip().generate({type: 'nodebuffer'});
        fs.writeFileSync(path.join(process.cwd(), destination), buffer);
    }).catch((e) => {
        errorHandler(e);
    });
}


function getDocumentOptions() {
    const doc_options = {  // Add additional parsing options to the 'docxtemplater' functionality, so we can check what element of an array we are at
        parser: (tag) => {
            return {
                get(scope, context) {
                    if (tag === "$index") {
                        const indexes = context.scopePathItem;
                        return indexes[indexes.length - 1];
                    }
                    if (tag === "$isLast") {
                        const totalLength =
                            context.scopePathLength[context.scopePathLength.length - 1];
                        const index =
                            context.scopePathItem[context.scopePathItem.length - 1];
                        return index === totalLength - 1;
                    }
                    if (tag === "$isFirst") {
                        const index =
                            context.scopePathItem[context.scopePathItem.length - 1];
                        return index === 0;
                    }
                    if (tag === '.') {
                        return scope;
                    }
                    return scope[tag];
                },
            };
        }
    }
    return doc_options;
}

function getImageModule() {
    const opts = {};
    opts.centered = false;
    opts.fileType = "docx"
    opts.getImage = function (tagValue, tagName) {
        console.log(tagValue, tagName);
        return new Promise(function (resolve, reject) {
            getHttpData(tagValue, function (err, data) {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    };

    opts.getSize = function (img, tagValue, tagName) {
        //return [100, 115];
        if (tagName === "profile") return [100, 125];
        if(tagName === "logo") return [100, 50];
        console.log(tagValue, tagName);
        // img is the value that was returned by getImage
        // This is to force the width to 600px, but keep the same aspect ratio
        const sizeOf = require("image-size");
        const sizeObj = sizeOf(img);
        console.log(sizeObj);
        const forceWidth = 100;
        const ratio = forceWidth / sizeObj.width;
        return [
            forceWidth,
            // calculate height taking into account aspect ratio
            Math.round(sizeObj.height * ratio),
        ];
    };

    const imageModule = new ImageModule(opts);
    return imageModule;
}

function getHttpData(url, callback) {
    console.log("getHttpData")
    https
      .request(url, function (response) {
        if (response.statusCode !== 200) {
          return callback(
            new Error(
              `Request to ${url} failed, status code: ${response.statusCode}`
            )
          );
        }
   
        const data = new Stream();
        response.on("data", function (chunk) {
          data.push(chunk);
        });
        response.on("end", function () {
          callback(null, data.read());
        });
        response.on("error", function (e) {
          callback(e);
        });
      })
      .end();
}






///////// ERROR HANDLING //////////
function errorHandler(error) {
    console.log(JSON.stringify({error: error}, replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
}

function replaceErrors(key, value) {
    if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}

