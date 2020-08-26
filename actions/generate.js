const path = require("path");
const fs = require("fs");

module.exports = (resumeRelativePath, templateRelativePath) => {
    var resumePath, resumeData, resumeJSONObject = undefined;
    try {
        resumePath = path.join(process.cwd(), resumeRelativePath);
        resumeData = fs.readFileSync(resumePath, {encoding: "utf-8"});
        resumeJSONObject = JSON.parse(resumeData);
    } catch(error) {
        if(error.code === "ENOENT") {
            console.log(`Cant find resume at path: ${resumePath}`)
            process.exit(1);
        }
    }
    if(resumeJSONObject === undefined) { console.log("resume cannot be empty"); process.exit(1); }
    

    var templatePath, templatePackage = undefined;
    try {
        templatePath = path.join(process.cwd(), templateRelativePath);
        templatePackage = require(templatePath);
    } catch(error) {
        console.log(error)
        if(error.code === "MODULE_NOT_FOUND") {
            console.log(`Cant find template folder at path: ${templatePath}`)
            process.exit(1);
        }
    }
    if(!templatePackage.render && typeof templatePackage.render !== 'function') { console.log("Template is missing the 'render' function"); process.exit(1); }

    
    const htmlContent = templatePackage.render(resumeJSONObject);
    const writeStream = fs.createWriteStream(path.resolve(process.cwd(), "output.html"));
    writeStream.write(htmlContent, (error) => {
        writeStream.close();
    });
}