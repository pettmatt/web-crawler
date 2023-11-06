import { scrapeHTML, validateHeadTags } from "../index"

test("Validate HTML head tags", async () => {
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
		console.log("Validator", validationResult)

		expect(validationResult).toBeInstanceOf(Object)
	} catch (error) {
		throw new Error(`Head tag validator test failed with following excuse:\n${err}`)
	}
})
