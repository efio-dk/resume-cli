const path = require("path");

module.exports = (packageRelativePath) => {
    var packagePath = undefined;
    try {
        packagePath = path.join(process.cwd(), packageRelativePath);
        const package = require(packagePath);
        return package;
    } catch(error) {
        console.log(error)
        if(error.code === "MODULE_NOT_FOUND") {
            console.log(`Cant find template folder at path: ${packagePath}`)
            process.exit(1);
        }
    }
}