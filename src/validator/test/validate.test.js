import { checkRobotsFile } from "../lib/validate.js"

test("Validator robots.txt test", async () => {
	try {
		const txtObject = checkRobotsFile("http://robotstxt.org")
		console.log("Txt", txtObject)
		expect(txtObject).toBeInstanceOf(Object)
		expect(txtObject).toBe({
			robotsTxt: {
				url: "http://robotstxt.org",
				restrictions: false,
				pagesToIgnore: [],
			},
		})
	} catch (error) {
		throw new Error(`Validator robots.txt test failed with following excuse:\n${err}`)
	}
})
