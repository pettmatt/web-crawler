import { scrapeHTML, validateHeadTags } from "../lib/process.js"

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

	test("scrape HTML with correct structure", async () => {
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
			const site = { url: "https://example.com", html }
			const scrapedResult = scrapeHTML(site)

			expect(scrapedResult).toBeInstanceOf(Object)
			expect(scrapedResult.url).toBeDefined()
			expect(scrapedResult.url).toBe("https://example.com")
			expect(scrapedResult.scraped).toBeDefined()
			expect(scrapedResult.scraped).toBeInstanceOf(Object)
			// expect(scrapedResult.scraped).toStrictEqual({
			// 	head: "<head><meta robots=\"\" /></head>",
			// 	body: `<body>
			// 		<h1>Test<h1>
			// 		<p>Lorem ipsum</p>
			// 		<a href="/internalLink">Internal</a>
			// 		<a href="https://google.com">To somewhere</a>
			// 	</body>`,
			// })

			expect(scrapedResult.rules).toBeDefined()
			expect(scrapedResult.rules).toBeInstanceOf(Object)
			expect(scrapedResult.rules).toStrictEqual([
				{
					metaTagsFound: false,
					searchedTag: "<meta name=\"robots\"",
					metaRobotRules: null,
				},
			])
		} catch (error) {
			throw new Error(`Scrape HTML test failed with following excuse:\n${error}`)
		}
	})
})