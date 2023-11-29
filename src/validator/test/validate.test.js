import validateLinks from "../index.js"

describe("Validator can", () => {
	const robotsRouteTest = []

	test("check robots.txt routes", async () => {
		try {
			// Normally links should be sent in their "proper" form "https://domain.com"
			const links = ["http://robotstxt.org", "google.com"]

			const result1 = await validateLinks(links[0])
			const result2 = await validateLinks(links[1])

			robotsRouteTest.push(result1)
			robotsRouteTest.push(result2)

			expect(result1).toBeInstanceOf(Object)
			expect(result1).toStrictEqual({ restrictions: false, pagesToIgnore: [], url: "http://robotstxt.org" })
			expect(result2).toBeInstanceOf(Object)
			expect(result2).toStrictEqual({
				restrictions: false,
				pagesToIgnore: [],
				error: {
					error: true,
					message: "TypeError: Failed to parse URL from google.com/robots.txt",
				},
			})
		} catch (error) {
			throw new Error(`Validator robots.txt test failed with following excuse:\n${error}`)
		}
	})

	test("return an object with correct properties, depending on if request succeeds or fails", async () => {
		try {
			expect(robotsRouteTest[0]).toHaveProperty("url")
			expect(robotsRouteTest[0]).toHaveProperty("restrictions")
			expect(robotsRouteTest[0]).toHaveProperty("pagesToIgnore")
			expect(robotsRouteTest[1]).toHaveProperty("error")
		} catch (error) {
			throw new Error(`Validator robots.txt test failed with following excuse:\n${error}`)
		}
	})
})
