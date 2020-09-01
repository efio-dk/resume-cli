const fs = require("fs");
const utility = require("../utility");

module.exports = (resumeRelativePath, templateRelativePath, outputRelativePath) => {
    
    const resumeJSONObject = utility.loadJSON(resumeRelativePath);
    const templatePackage = utility.loadPackage(templateRelativePath)

    if(!templatePackage.render && typeof templatePackage.render !== 'function') { console.log("Template is missing the 'render' function"); process.exit(1); }
    
    const htmlContent = templatePackage.render(resumeJSONObject);
    const writeStream = fs.createWriteStream(path.resolve(process.cwd(), outputRelativePath));
    writeStream.write(htmlContent, (error) => {
        writeStream.close();
    });
}