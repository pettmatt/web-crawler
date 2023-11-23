import { scrapeHTML } from "./lib/process.js"

async function fetchAndProcessDataFromUrl(url) {
	let htmlResponse = null
	let index = 0

	const intervalId = setInterval(fetchRequest, 2000)
	await fetchRequest()

	async function fetchRequest() {
		const response = await fetch(url)

		if (response.ok) {
			const html = await response.text()
			htmlResponse = { url, html }
			clearInterval(intervalId)
		} else if (index > 1 || response.status === 500) {
			clearInterval(intervalId)
		}

		index++
	}

	const scrapedList = scrapeHTML(htmlResponse)

	return scrapedList
}

export default fetchAndProcessDataFromUrl
