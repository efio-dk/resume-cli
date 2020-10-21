const path = require("path");
const fs = require("fs");

const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;


module.exports = (documentPath, destination) => {

    const inputPath = path.resolve(process.cwd(), documentPath);
    const outputPath = path.resolve(process.cwd(), destination);

    var Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = '7e45dc32-5f97-47e5-9032-0254ecedb5e0';

    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

    var inputFile = Buffer.from(fs.readFileSync(inputPath).buffer);

    apiInstance.convertDocumentAutodetectToPdf(inputFile, (err, data, response) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("converted to pdf succesfully")
            fs.writeFileSync(outputPath, data);
        }
    });
}