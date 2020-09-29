const fs = require("fs");
const path = require("path")
const ZSchema = require("z-schema");
const ZSchemaErrors = require("z-schema-errors");
const validator = new ZSchema();

module.exports = (resume, schema) => {

    // Load the resume json file
    resume = path.join(process.cwd(), resume);
    var resume_json_object = JSON.parse(fs.readFileSync(resume, { encoding: "utf-8" }));

    // Load the schema json file
    schema = path.join(process.cwd(), schema);
    var schema_json_object = JSON.parse(fs.readFileSync(schema, { encoding: "utf-8" }));

    // Validate the two against eachother
    validator.validate(resume_json_object, schema_json_object, (err, valid) => {
        if(valid) { 
            console.log("valid"); 
        } 
        else {
            err.forEach(e => {
                console.log(e.message);
            });
        }
    });
};