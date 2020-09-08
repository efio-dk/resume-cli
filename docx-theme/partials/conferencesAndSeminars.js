const docx = require("docx")
const fs = require("fs");
const { TextRun, TableRow, TableCell, Paragraph, HeadingLevel, Document, Table, BorderStyle, VerticalAlign, WidthType } = require("docx");
const { conferencesAndSeminars } = require(".");
const json = JSON.parse(fs.readFileSync("resume.json"))

module.exports = () => {
    const doc = new Document({
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
    const header = new Paragraph({
        text: "Conferences and Seminars",
        heading: HeadingLevel.HEADING_2,
    });
    const tableCell1 = new TableCell({
         borders:
         {
            bottom:
            {
                style: BorderStyle.OUTSET,
                size: 60,
                color: "red"
            },
            top:
            {
                size: 0,
                color: "white"
            },
            left:
            {
                size: 0,
                color: "white"
            },
            right:
            {
                size: 0,
                color: "white"   
            }
         },
         children:
         [
            new Paragraph(""),
         ],
         width: {size: 12, type: WidthType.PERCENTAGE}
         
    });
    const table = new Table
    ({
        rows:
        [
            new TableRow
            ({
                children: 
                [
                    tableCell1,
                ],
            }),
            getTitles()
        ],
            
    });

    function getTitles()
    {
        var arr = []
        json.education["conferences"].forEach(Element => 
        {
            var tableCell2 = new TableCell
            ({
                borders:
                {
                    bottom:
                    {
                        color: "white"
                    },
                    top:
                    {
                        color: "white"
                    },
                    left:
                    {
                        color: "white"
                    },
                    right:
                    {
                        color: "white"   
                    }
                },
                children:
                [
                    new Paragraph
                    ({
                        text: Element["title"] + Element["location"],
                    }),
                ],
            })
            var tableCell3 = new TableCell
            ({
                borders:
                {
                    bottom:
                    {
                        color: "white"
                    },
                    top:
                    {
                        color: "white"
                    },
                    left:
                    {
                        color: "white"
                    },
                    right:
                    {
                        color: "white"   
                    }
                },
                children:
                [
                    new Paragraph
                    ({
                        text: Element["date"],
                    }),
                ],
                
            })
           var tableRow = new TableRow
           ({
               children:
               [
                    tableCell2,
                    tableCell3
               ]
            
            });
            console.log(tableRow)
            arr.push(tableRow)
        });
        return arr
    }

    doc.addSection
    ({
        children:
        [
            header,
            table,

        ]
    })

    return doc;
}