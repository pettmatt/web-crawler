import { parseTags, attributeFromTag } from "./lib/checker.js"

function processHTMLBody(page) {
	const { url, scraped } = page
	const { head, body } = scraped

	// TODO: Respect the meta tag "rules"
	// TODO: Implement LM to process the data

	const linkTags = parseTags(body, "<a", "</a>")
	let links = []

	for (let i = 0; i < linkTags.length; i++) {
		const link = attributeFromTag(linkTags[i], "href")
		links.push(link)
	}

	links = links.filter((link) => link !== "")

	return {
		parentPage: url,
		linksFound: links,
		html: {
			head,
			body,
		},
	}

	// Next these links should be returned to the validator, and the url of this page
	// should be returned to the database with a guess what the page contains.
}

export default processHTMLBody
