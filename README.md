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
