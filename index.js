#!/usr/bin/env node
const commander = require("commander");

commander
    .command("generate <fileName>")
    .description("Generate a html file based on a `resume.json` file")
    .option("--resume <relativePath>")
    .action((args, options) => {
        require("./actions/generate")(args, options);
    })

commander.parse(process.argv)