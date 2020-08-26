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
    .action((args, options) => {
        require("./actions/validate")(args, options);
    });

commander.parse(process.argv);