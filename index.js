#!/usr/bin/env node

const commander = require("commander");

commander
    .command("generate")
    .description("generate a html file based on a resume.json file")
    .action((args, options) => {
        require("./actions/generate")(args, options);
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