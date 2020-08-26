#!/usr/bin/env node

const commander = require("commander");

commander
    .command("generate")
    .description("generate a html file based on a resume.json file")
    .option("--resume <relativePath>", "relative path to a resume json file", "resume.json")
    .option("--template <relativePath>", "relative path to a handlebars template folder", "template")
    .action((options) => {
        require("./actions/generate")(options.resume, options.template);
    })

commander.parse(process.argv);