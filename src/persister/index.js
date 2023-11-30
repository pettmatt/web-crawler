import { parseTags, attributeFromTag, innerHTMLFromTag } from "./lib/checker.js"

function processHTMLBody(page) {
	const { url, scraped } = page
	const { head, body } = scraped

	// TODO: Respect the meta tag "rules"
	// TODO: Implement LM to process the data

	const linkTags = parseTags(body, "<a", "</a>")
	const headerTag = parseTags(body, "<h1", "</h1>")
	console.log("header tag", headerTag)

	let headerTitle = ""

	if (headerTag.length > 0) {
		headerTitle = innerHTMLFromTag(headerTag[0])
	} else {
		headerTitle = innerHTMLFromTag(head, "<title>", "</title>")
	}

	let links = []

	for (let i = 0; i < linkTags.length; i++) {
		const link = attributeFromTag(linkTags[i], "href")
		links.push(link)
	}

	links = links.filter((link) => link !== "")

	// Next these links should be returned to the validator, and the url of this page
	// should be returned to the database (with a guess what the page contains).

	return {
		linksFound: links,
		page: {
			url,
			header: headerTitle,
		},
		html: {
			head,
			body,
		},
	}
}

export default processHTMLBody
