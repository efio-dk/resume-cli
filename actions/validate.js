const ZSchema = require("z-schema");
const utility = require("../utility");
const validator = new ZSchema();

module.exports = (resumeRelativePath, schemaRelativePath) => {
    const resumeJSONObject = utility.loadJSON(resumeRelativePath)
    if(resumeJSONObject === undefined) { console.log("resume cannot be empty"); process.exit(1); }

    const schemaJSONObject = utility.loadJSON(schemaRelativePath);
    if(schemaJSONObject === undefined) { console.log("schema cannot be empty"); process.exit(1); }

    const validationResult = validator.validate(resumeJSONObject, schemaJSONObject);
    console.log(validationResult);
}