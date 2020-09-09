const docx = require("docx")
const fs = require("fs");
const { TextRun, TableRow, TableCell, Paragraph, HeadingLevel, Document, Table, BorderStyle, VerticalAlign, WidthType, TableRowHeight, TableRowHeightAttribute, HeightRule} = require("docx");
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
    const emptyCell = new TableCell({
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
                children: 
                [
                    new TextRun({
                        text: " ",
                        size: 10,
                        font: "calibri"
                    })
                ]
            }),
        ],
        width: {size: 15, type: WidthType.PERCENTAGE}
         
    })
    const redBarCell = new TableCell({
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
            new Paragraph(""),
         ],
         width: {size: 15, type: WidthType.PERCENTAGE}
         
         
    });
    const headerCell = new TableCell({
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
           header
        ],
        width: {size: 85, type: WidthType.PERCENTAGE}
        
    });
    const table = new Table
    ({
        rows: getTitles(),
        
        width: {
        size: 100,
        type: WidthType.PERCENTAGE,
        }
    });
    function getTitles()
    {
        var arr = []
        const redBar = new TableRow({
            children:[
                redBarCell,
                headerCell
            ]
            
        })
        const emptyRow = new TableRow({
            children:[
                emptyCell,
                emptyCell  
            ],
        })
        arr.push(redBar);
        arr.push(emptyRow);
        json.education["conferences"].forEach(Element => 
        {
            var titleAndLocationCell = new TableCell
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
                        children: 
                        [
                            new TextRun({
                                text: Element["title"] + Element["location"],
                                size: 22,
                                font: "calibri"
                            })
                        ]
                    }),
                ],
                width: {size: 85, type: WidthType.PERCENTAGE}
            })
            var dateCell = new TableCell
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
                        children: 
                        [
                            new TextRun({
                                text: Element["date"],
                                size: 22,
                                font: "calibri"
                            })
                        ]
                    }),
                    
                ],
                width: {size: 15, type: WidthType.PERCENTAGE}
                
            })
           var tableRow = new TableRow
           ({
               children:
               [
                    dateCell,
                    titleAndLocationCell
               ]
            
            });
            arr.push(tableRow)
        });
        return arr
    }

    doc.addSection
    ({
        children:
        [
            table,
        ]
    })

    return doc;
}