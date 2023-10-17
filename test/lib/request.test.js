import request from "../../src/lib/request"

// Reason why "throw new Error" is used and not "fail":
// https://github.com/jestjs/jest/issues/11698

test("Makes a basic HTTP request", async () => {
	try {
		const req = request("https://google.com")
		expect(req).toBeInstanceOf(Response)
	} catch (error) {
		throw new Error(`HTTP request failed with following excuse:\n${err}`)
	}
})
