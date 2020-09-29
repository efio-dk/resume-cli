const path = require("path");
const fs = require("fs");

const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');


module.exports = (resumePath, templatePath, destination) => {
  
    var content = fs.readFileSync(path.resolve(process.cwd(), templatePath), 'binary');
    console.log("asd")
    const json = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), resumePath)));
    var zip = new PizZip(content);

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


    // Compile the docx document
    var doc;
    try {
        doc = new Docxtemplater()
            .loadZip(zip)
            .setOptions(doc_options)
            //.attachModule(imageModule)
            .compile();
    }
    catch(error) {
        // TODO: Add everything from the 'docxtemplater' website, in regards to error handling
        function replaceErrors(key, value) {
            if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                    error[key] = value[key];
                    return error;
                }, {});
            }
            return value;
        }
        console.log(JSON.stringify({error: error}, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
        }
    }

    // Save the result
    doc
    .resolveData(json)
    .then(() => {
        doc.render();
        const buffer = doc.getZip().generate({type: 'nodebuffer'});
        fs.writeFileSync(path.join(process.cwd(), destination), buffer);
    });
}