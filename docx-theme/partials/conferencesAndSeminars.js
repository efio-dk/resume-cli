const docx = require("docx")
const fs = require("fs");
const { TextRun } = require("docx");
const { conferencesAndSeminars } = require(".");
const json = JSON.parse(fs.readFileSync("resume.json"))

module.exports = () => {
    const doc = new docx.Document({
        styles: {
            paragraphStyles: [
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 32,
                        font: "calibri",
                        color: "000000",
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    },
                },
            ],
        },
    })
    const header = new docx.Paragraph({
        text: "Conferences and Seminars",
        heading: docx.HeadingLevel.HEADING_2,
    });

    doc.addSection
    ({
        children:
        [
            header,

        ]
    })

    return doc;
}