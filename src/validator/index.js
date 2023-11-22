import { checkRobotsFile } from "./lib/validate.js"

// This file is responsible for listening events, queueing,
// forwarding data and forwarding validated links to fetch bot.
// const queue = [
//     {
//         url: "http://robotstxt.org",
//         processed: true
//     },
//     {
//         url: "google.com",
//         processed: false
//     }
// ]

async function validateLinks(queue) {
    const linkQueue = queue

	const processedQueue = await Promise.all(queue.map(async (page, index) => {
		let object = null

		if (!page.processed) {
			const robotsObject = await checkRobotsFile(page.url)
			
			object = robotsObject
			
			linkQueue[index].processed = true
		}

		return object
	}))

	return {
        processedQueue: processedQueue.filter((object) => object !== null),
        linkQueue
    }
}

// const results = await validateLinks([
//     {
//         url: "http://robotstxt.org",
//         processed: false
//     }
// ])
// console.log("Results", results)

export default validateLinks
