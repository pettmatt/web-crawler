import { checkRobotsFile } from "./lib/validate.js"

// This file is responsible for listening events, queueing,
// forwarding data and forwarding validated links to fetch bot.
const queue = [{
	url: "http://robotstxt.org",
	processed: false,
},
{
	url: "google",
	processed: true,
}]

async function validateLinks() {
	const processedQueue = await Promise.all(queue.map(async (page, index) => {
		let object = null

		if (!page.processed) {
			const robotsObject = await checkRobotsFile(page.url)

			object = {
				robotsTxt: robotsObject,
			}

			queue[index].processed = true
		}

		return object
	}))

	// Returns a list that doesn't contain null values
	return processedQueue.filter((object) => object !== null)
}

const results = await validateLinks()
console.log("Results", results)
