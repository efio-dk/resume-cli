const path = require("path");
const fs = require("fs");

module.exports = (jsonRelativePath) => {
    var jsonPath = undefined;
    try {
        jsonPath = path.join(process.cwd(), jsonRelativePath);
        const data = fs.readFileSync(jsonPath, {encoding: "utf-8"});
        const JSONObject = JSON.parse(data);
        return JSONObject;
    } catch(error) {
        if(error.code === "ENOENT") {
            console.log(`Cant find resume at path: ${jsonPath}`)
            process.exit(1);
        }
    }
}