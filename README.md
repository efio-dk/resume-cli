# resume-cli
A CLI tool to populate a docx template with the data inside a json file

## Setup / Install
run `git clone https://github.com/efio-dk/resume-cli.git`

followed by `npm link`

Test installation by running `resume-cli -h`

## Prerequisites
A `.json` file containing data

A `.docx` file acting as a template for the final document


## Usage
run `resume-cli -h` to view the help section

### Generate a docx file
run `resume-cli generate --resume <path> --template <path> --destination <path>`

where `--resume` is a path to the `.json` file

where `--template` is a path to the `.docx` template file

where `--destination` is a path to the desired output destination for the final document


### Validate a json file against a json schema
run `resume-cli validate --resume <path> --schema <path>`

where `--resume` is a path to the `.json` file containing the data

where `--schema` is a path to the `.json` file containing the schema

## Usage with docker
run `docker build -t resume-cli -f Dockerfile .`

### Case 1: Bare minimum
run `docker run --rm -v "<outputDirectory>:/app/data" resume-cli generate --destination data/output.docx`

where `<outputDirectory>` is the path to the directory where the final output is supposed to saved

### Case 2: Data and template resides in attached volume
run `docker run --rm -v "<outputDirectory>:/app/data" resume-cli generate --resume data/<dataFile>.json --template data/<templateFile>.docx --destination data/output.docx`

where `<outputDirectory>` is the path to the directory where the final output is supposed to saved
