const path = require("path");
const fs = require("fs");
const ZSchema = require("z-schema");
const validator = new ZSchema();

module.exports = (resumeRelativePath, schemaRelativePath) => {

    var resumePath, resumeData, resumeJSONObject = undefined;
    try {
        resumePath = path.join(process.cwd(), resumeRelativePath);
        resumeData = fs.readFileSync(resumePath, {encoding: "utf-8"})
        resumeJSONObject = JSON.parse(resumeData);
    } catch(error) {
        if(error.code === "ENOENT") {
            console.log(`Cant find resume at path: ${resumePath}`)
            process.exit(1);
        }
    }
    if(resumeJSONObject === undefined) { console.log("resume cannot be empty"); process.exit(1); }


    var schemaPath, schemaData, schemaJSONObject = undefined;
    try {
        schemaPath = path.join(process.cwd(), schemaRelativePath);
        schemaData = fs.readFileSync(schemaPath, { encoding: "utf-8"});
        schemaJSONObject = JSON.parse(schemaData);
    } catch(error) {
        if(error.code === "ENOENT") {
            console.log(`Cant find schema at path: ${schemaPath}`)
            process.exit(1);
        }
    }
    if(schemaJSONObject === undefined) { console.log("schema cannot be empty"); process.exit(1); }


    const validationResult = validator.validate(resumeJSONObject, schemaJSONObject);
    console.log(validationResult);
}