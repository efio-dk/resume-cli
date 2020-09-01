#!/usr/bin/env node

const commander = require("commander");

commander
    .command("generate")
    .description("generate a html file based on a resume.json file")
    .option("--resume <relativePath>", "relative path to a resume json file", "resume.json")
    .option("--template <relativePath>", "relative path to a handlebars template folder", "template")
    .option("--output <relativePath>", "relative path for output, with filename", "output.html")
    .action((options) => {
        require("./actions/generate")(options.resume, options.template, options.output);
    })

commander
    .command("validate")
    .description("validate a json file against a json schema")
    .option("--resume <relativePath>", "relative path to the resume.json file", "resume.json")
    .option("--schema <relativePath>", "relative path to the schema.json file", "schema.json")
    .action((options) => {
        require("./actions/validate")(options.resume, options.schema);
    });

commander.parse(process.argv);