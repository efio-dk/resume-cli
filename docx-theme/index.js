const docx = require("docx");
const fs = require("fs")
const partials = require("./partials")

module.exports = (partialName) => {
    const doc = partials[partialName]()

    docx.Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`${partialName}.docx`, buffer);
    })
}