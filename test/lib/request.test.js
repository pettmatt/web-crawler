import request from "../../src/lib/request"

test("Makes a basic HTTP request", () => {
	const testReq = request("https://google.com")
		.then((data) => {
			console.log(data)
			expect(data).toBeInstanceOf(Response)
		})
		.catch((err) => fail(`HTTP request failed with following excuse:\n${err}`))

	return testReq
})
