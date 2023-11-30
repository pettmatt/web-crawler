function parseTags(html, openingTag, closingTag) {
	if (
		typeof html !== "string"
		|| typeof openingTag !== "string"
		|| typeof closingTag !== "string"
	) throw Error("ParseTags: Passed parameters should be strings")

	const tags = []

	// Creating a bug by trying to jump to the next iteration of
	// a open html-tag can result in an issue detailed below.
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1201626

	let searchIndex = 0
	for (let i = 0; i < html.length; i++) {
		const tagOpeningIndex = html.indexOf(openingTag, searchIndex)
		const tagClosingIndex = html.indexOf(closingTag, searchIndex) + closingTag.length

		if (tagOpeningIndex !== -1 && tagClosingIndex !== -1) {
			const tag = html.slice(tagOpeningIndex, tagClosingIndex)
			tags.push(tag)
			// To prevent duplication of a link
			searchIndex = tagClosingIndex
		} else {
			break
		}
	}

	return tags
}

function attributeFromTag(tag, attribute) {
	if (typeof tag !== "string" || typeof attribute !== "string") return

	const attributeIndex = tag.indexOf(attribute)

	if (attributeIndex === -1) return ""

	const startIndex = tag.indexOf("=\"", attributeIndex) + "=\"".length
	const endIndex = tag.indexOf("\"", startIndex + 1)

	if (startIndex === -1 || endIndex === -1) return ""

	const attributeValue = tag.slice(startIndex, endIndex)
	return attributeValue
}

function innerHTMLFromTag(html, openingTag = ">", closingTag = "<") {
	const headerOpenIndex = html.indexOf(openingTag) + openingTag.length
	const headerCloseIndex = html.indexOf(closingTag, headerOpenIndex)
	const innerHTML = (headerOpenIndex !== -1 && headerCloseIndex !== -1)
		? html.substring(
			headerOpenIndex,
			headerCloseIndex,
		)
		: Error("Cannot find opening or closing tags from the string:", html)

	return innerHTML
}

export { parseTags, attributeFromTag, innerHTMLFromTag }
