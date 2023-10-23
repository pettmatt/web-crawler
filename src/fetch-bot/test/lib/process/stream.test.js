import handleStream from "../../../lib/process/stream"
import request from "../../../lib/request"

test("Handles the stream of the response", async () => {
	try {
		const response = request("https://duck.com")
			.then((res) => res)
			.catch((err) => err)

		const res = handleStream(response)
		expect(res).toBeInstanceOf(Response)
	} catch (err) {
		throw new Error(`Failed to read from readable stream with following excuse:\n${err}`)
	}
})
