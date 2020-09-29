#!/usr/bin/env node
const process = require("process");
const cmd = require("commander");
const actions = require("./actions");


// ENTRY POINT
cmd
    .name("efio-cli")
    .usage("<command> [options]");


// COMMAND: validate
cmd
    .command("validate")
    .description("validate a resume json file - Returns { 0 } on success")
    .option("--resume <relativePath>", "path to resume json file", "resume.json")
    .option("--schema <relativePath>", "path to the schema json file to validate against", "schema.json")
    .action((options) => {
        actions.validate(options.resume, options.schema);
    });


// COMMAND: generate
cmd
    .command("generate")
    .description("generate a resume in the docx format")
    .option("--resume <relativePath>", "path to resume json file", "docx-theme/resume.json")
    .option("--template <relativePath>", "path to the desired docx template", "docx-theme/template.docx")
    .option("--destination <relativePath>", "path to the desired output location", "output.docx")
    .action((options) => {
        actions.generate(options.resume, options.template, options.destination);
    });



// EXPOSE PROCESS ARGUEMENTS FOR THE COMMANDER MODULE
cmd.parse(process.argv);

// DEFAULT TO HELP IF NOTHING IS SPECIFIED
if(process.argv.length < 3){
    cmd.help();
}