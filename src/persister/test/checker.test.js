import { parseTags, attributeFromTag } from "../lib/checker"

describe("Checker.js lib", () => {
    test("parseTags returns link tags from a string", async () => {
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
                    <a href="/">This shouldn't be here, but should be found</a>
                </html>
            `
    
            const linkTags = parseTags(html, "<a", "</a>")

            console.log(linkTags)

            // expect(linkTags).toBeInstanceOf(Array)
            // expect(linkTags.length).toBe(3)
            expect(linkTags).toStrictEqual([
                `<a href="/linkToOtherPage">Link 1</a>`,
                `<a href="/duck.com">Link 2</a>`,
                `<a href="/">This shouldn't be here, but should be found</a>`
            ])
        } catch (error) {
            throw new Error(`parseTags function test failed with following excuse:\n${error}`)
        }
    })

    test("parseTags returns an empty array, if given string doesn't include the tag", async () => {
        try {
            const html = ""
            const noTagsFound = parseTags(html, "<body", "</body>")

            expect(noTagsFound).toStrictEqual([])
        } catch (error) {
            throw new Error(`parseTags function test failed with following excuse:\n${error}`)
        }
    })

    test("attributeFromTag returns an attribute from a HTML tag", async () => {
        try {
            const link = attributeFromTag("<a href=\"/internalLink\">Link 1</a>", "href")

            expect(link).toBe("/internalLink")
        } catch (error) {
            throw new Error(`attributeFromTag function test failed with following excuse:\n${error}`)
        }
    })

    test("attributeFromTag returns an empty string, if the element doesn't contain the attribute", async () => {
        try {
            const shouldFail = attributeFromTag("<h1>Test header</h1>", "doesntExist")

            expect(shouldFail).toBe("")
        } catch (error) {
            throw new Error(`attributeFromTag function test failed with following excuse:\n${error}`)
        }
    })
})
