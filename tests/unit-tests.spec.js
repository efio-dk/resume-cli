const { returnYearOrYears } = require("../parserUtility");
const { returnFirstName } = require("../parserUtility");
const { abbreviateMiddleNames } = require("../parserUtility");

describe("TestYearYears", () => {
    test("It should return year", () => {
        var tag = '$years'
        var scope = {
                        'group-name':'Distributed data stores & relational databases',
                        name:'DB2',
                        level:'2',
                        years:'1',
                        'last-used':'2014'
                    }
        var context = {
            num: 3,
            meta: {
              part: {
                type: 'placeholder',
                value: '$years',
                offset: 670,
                endLindex: 1442,
                lIndex: 1442
              }
            },
            scopeList: [
              {
                basics: [Object],
                work: [Array],
                education: [Object],
                skills: [Object]
              },
              { 'technical-skills': [Array], 'working-areas': [Array] },
              {
                'group-name': 'Distributed data stores & relational databases',
                technologies: [Array]
              },
              {
                'group-name': 'Distributed data stores & relational databases',
                name: 'DB2',
                level: '2',
                years: '1',
                'last-used': '2014'
              }
            ],
            resolved: undefined,
            scopePath: [ 'skills', 'technical-skills', 'technologies' ],
            scopePathItem: [ 0, 1, 12 ],
            scopePathLength: [ 1, 2, 13 ]
          }
        expect("year").toEqual(returnYearOrYears(tag,scope,context));
    })
    test("It should return years", () => {
        var tag = '$years'
        var scope = {
                        'group-name':'Distributed data stores & relational databases',
                        name:'DB2',
                        level:'2',
                        years:'5',
                        'last-used':'2014'
                    }
        var context = {
            num: 3,
            meta: {
              part: {
                type: 'placeholder',
                value: '$years',
                offset: 670,
                endLindex: 1442,
                lIndex: 1442
              }
            },
            scopeList: [
              {
                basics: [Object],
                work: [Array],
                education: [Object],
                skills: [Object]
              },
              { 'technical-skills': [Array], 'working-areas': [Array] },
              {
                'group-name': 'Distributed data stores & relational databases',
                technologies: [Array]
              },
              {
                'group-name': 'Distributed data stores & relational databases',
                name: 'DB2',
                level: '2',
                years: '5',
                'last-used': '2014'
              }
            ],
            resolved: undefined,
            scopePath: [ 'skills', 'technical-skills', 'technologies' ],
            scopePathItem: [ 0, 1, 12 ],
            scopePathLength: [ 1, 2, 13 ]
          }
        expect("years").toEqual(returnYearOrYears(tag,scope,context));
    })
})

describe("TestReturnFirstName", () => {
    test("It should return only the firstname", () => {
        var tag = '$firstName name'
        var scope = {
                        name: 'Kristian Østergaard Martensen',
                        label: 'Programmer',
                        picture: 'https://www.efio.dk/images/team/kristian.jpg',
                        born: '1984',
                        'resume-version': 'v2020.02',
                        'it-experience': '14',
                        email: 'kristian@efio.dk',
                        phone: '+45 5376 7138',
                    }
        var context = {
            num: 1,
            meta: {
              part: {
                type: 'placeholder',
                value: '$firstName name',
                offset: 310,
                endLindex: 806,
                lIndex: 806
              }
            },
            scopeList: [
              {
                basics: [Object],
                work: [Array],
                education: [Object],
                skills: [Object]
              },
              {
                name: 'Kristian Østergaard Martensen',
                label: 'Programmer',
                picture: 'https://www.efio.dk/images/team/kristian.jpg',
                born: '1984',
                'resume-version': 'v2020.02',
                'it-experience': '14',
                email: 'kristian@efio.dk',
                phone: '+45 5376 7138',
                website: 'https://efio.dk',
                title: 'Senior DevOps Engineer and container specialist',
                header: "'s area of expertise covers",
                'area-expertise': [Array],
                location: [Object],
                profiles: [Array],
                languages: [Array],
                'company-details': [Object]
              }
            ],
            resolved: undefined,
            scopePath: [ 'basics' ],
            scopePathItem: [ 0 ],
            scopePathLength: [ 1 ]
          }
        expect("Kristian").toEqual(returnFirstName(tag,scope,context));
    })
})

describe("TestAbbreviateMiddleNames", () => {
    test("It should return the full name, but with middlename abbreviated", () => {
        var tag = '$abbreviateMiddleNames name'
        var scope = {
                        name: 'Kristian Østergaard Martensen',
                        label: 'Programmer',
                        picture: 'https://www.efio.dk/images/team/kristian.jpg',
                        born: '1984',
                    }
        var context = {
            num: 1,
            meta: {
              part: {
                type: 'placeholder',
                value: '$abbreviateMiddleNames name',
                offset: 19,
                endLindex: 99,
                lIndex: 99
              }
            },
            scopeList: [
              {
                basics: [Object],
                work: [Array],
                education: [Object],
                skills: [Object]
              },
              {
                name: 'Kristian Østergaard Martensen',
                label: 'Programmer',
                picture: 'https://www.efio.dk/images/team/kristian.jpg',
                born: '1984',
                'resume-version': 'v2020.02',
                'it-experience': '14',
                email: 'kristian@efio.dk',
                phone: '+45 5376 7138',
                website: 'https://efio.dk',
                title: 'Senior DevOps Engineer and container specialist',
                header: "'s area of expertise covers",
                'area-expertise': [Array],
                location: [Object],
                profiles: [Array],
                languages: [Array],
                'company-details': [Object],
            resolved: undefined,
            scopePath: [ 'basics' ],
            scopePathItem: [ 0 ],
            scopePathLength: [ 1 ],
            }
        ]
        }
        expect("Kristian Ø. Martensen ").toEqual(abbreviateMiddleNames(tag,scope,context));
    })
})