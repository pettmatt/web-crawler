import { scrapeHTML, validateHeadTags } from "../lib/process"

describe("Validator can", () => {
    test("validate HTML head tags", async () => {
        try {
            const html = `
                <html>
                <head>
                    <title>Test head<title>
                    <meta name="robots" content="noarchive" />
                </head>
                <body>
                    <h1>Test should fail if this is found</h1>
                </body>
                </html>
            `
            const rules = ["noindex", "nofollow", "noarchive", "nosnippet"]
            const validationResult = validateHeadTags(html, rules)

            expect(validationResult).toBeInstanceOf(Object)
        } catch (error) {
            throw new Error(`Head tag validator test failed with following excuse:\n${error}`)
        }
    })

    test("scrape HTML", async () => {
        try {
            const html = `
                <html>
                <head>
                    <meta robots="" />
                </head>
                <body>
                    <h1>Test<h1>
                    <p>Lorem ipsum</p>
                    <a href="/internalLink">Internal</a>
                    <a href="https://google.com">To somewhere</a>
                </body>
                </html>
            `
            const list = [{ link: "https://example.com", html }]
            const scrapedResult = scrapeHTML(list)

            expect(scrapedResult).toBeInstanceOf(Object)
            expect(scrapedResult[0].page).toBeDefined()
            expect(scrapedResult[0].scrapeResult).toBeDefined()
            expect(scrapedResult[0].scrapeResult).toBeInstanceOf(Object)
        } catch(error) {
            throw new Error(`Scrape HTML test failed with following excuse:\n${error}`)
        }
    })
})
