import { parseTags, attributeFromTag, innerHTMLFromTag } from "./lib/checker.js"

function processHTMLBody(page) {
	const { url, scraped } = page
	const { head, body } = scraped

	// TODO: Respect the meta tag "rules"
	// TODO: Implement LM to determing the tags

	const linkTags = parseTags(body, "<a", "</a>")
	const headerTag = parseTags(body, "<h1", "</h1>")

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

	return {
		linksFound: links,
		page: {
			url,
			header: (headerTitle instanceof Error) ? links : headerTitle,
			tags: [],
		},
		html: {
			head,
			body,
		},
	}
}

export default processHTMLBody
