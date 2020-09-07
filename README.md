## Setup / Install
run `git clone https://github.com/efio-dk/resume-cli.git`

followed by `npm link`

verify setup with `resume-cli`

## Usage
run `resume-cli -h` to view the help section

and `resume-cli <command> -h` for specific information about a command


## For developers - DOCX Generation
add a javascript file to `resume-cli\docx-theme\partials`

add a entry to the `resume-cli\docx-theme\partials\index.js` with the newly created javascript file to export it

```javascript
const docx = require("docx")

module.exports = () => {
    const doc = new docx.Document();

    return doc;
}
```

run `node . test partialName` to generate a docx file