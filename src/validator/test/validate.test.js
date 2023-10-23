import { checkRobotsFile } from "../lib/validate"

test("Validator robots.txt test", async () => {
	try {
		const req = checkRobotsFile("http://robotstxt.org")
		expect(req).toBeInstanceOf(Object)
	} catch (error) {
		throw new Error(`Validator robots.txt test failed with following excuse:\n${err}`)
	}
})
