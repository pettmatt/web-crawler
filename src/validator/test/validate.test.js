import validateLinks from "../index.js"

describe("Validator can", () => {
    let robotsRouteTest = null

    test("check robots.txt routes", async () => {
        try {
            const queue = [
                {
                    url: "http://robotstxt.org",
                    processed: true
                },
                {
                    url: "google.com", // Normally links should be sent in their "proper" form "https://domain.com"
                    processed: false
                }
            ]

            const results = await validateLinks(queue)
            robotsRouteTest = results
    
            expect(results).toBeInstanceOf(Object)
        } catch (error) {
            throw new Error(`Validator robots.txt test failed with following excuse:\n${error}`)
        }
    })

    test("return an object with processedQueue and urlQueue properties", async () => {
        expect(robotsRouteTest.processedQueue).toBeDefined()
        expect(robotsRouteTest.urlQueue).toBeDefined()
    })

    test("return an object with correct properties and values", async () => {
        expect(robotsRouteTest.processedQueue).toHaveProperty("[0].url")
        expect(robotsRouteTest.processedQueue).toHaveProperty("[0].restrictions")
        expect(robotsRouteTest.processedQueue).toHaveProperty("[0].pagesToIgnore")
        expect(robotsRouteTest.processedQueue).toHaveProperty("[0].error")
        expect(robotsRouteTest.urlQueue).toStrictEqual([
            {
                "processed": true,
                "url": "http://robotstxt.org"
            },
            {
                "processed": true,
                "url": "google.com"
            }
        ])
    })
})
