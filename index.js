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

commander.parse(process.argv);