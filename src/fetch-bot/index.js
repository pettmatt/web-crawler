import { scrapeHTML } from "./lib/process.js"

async function fetchAndProcessDataFromUrl(link) {
	const htmlResponses = []
	let index = 0

	const intervalId = setInterval(fetchRequest, 2000)
	await fetchRequest()

	async function fetchRequest() {
		const response = await fetch(link)

		if (response.ok) {
			const html = await response.text()
			htmlResponses.push({ link, html })
			clearInterval(intervalId)
		} else if (index > 1 || response.status === 500) {
			clearInterval(intervalId)
		}

		index++
	}

	const scrapedList = scrapeHTML(htmlResponses)

	return scrapedList
}

export default fetchAndProcessDataFromUrl
