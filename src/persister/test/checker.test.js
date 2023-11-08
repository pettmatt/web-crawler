import linkChecker from "../lib/checker"

describe("Checker function", () => {
    test("Get the link tags from a string", async () => {
        try {
            const html = `
                <html>
                <head>
                    <title>Test head<title>
                    <meta name="robots" content="noarchive" />
                </head>
                <body>
                    <h1>Should not find this</h1>
                    <a href="/linkToOtherPage">Link 1</a>
                    <a href="/duck.com">Link 2</a>
                    <p>Lonely paragraph.</p>
                </body>
                </html>
            `
    
            const linkTags = linkChecker(html)
            console.log("Links", linkTags)
    
            expect(linkTags).toBeInstanceOf(Array)
        } catch (error) {
            throw new Error(`Test failed with following excuse:\n${err}`)
        }
    })
})
