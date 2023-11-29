function parseTags(html, openingTag, closingTag) {
	if (
		typeof html !== "string"
		|| typeof openingTag !== "string"
		|| typeof closingTag !== "string"
	) throw Error("ParseTags: Passed parameters should be strings")

	const tags = []

	// Not scalable! Creates an issue similar to issue 1201626
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1201626

	for (let i = 0; i < html.length; i++) {
		const tagOpeningIndex = html.indexOf(openingTag, i)
		const tagClosingIndex = html.indexOf(closingTag, i) + closingTag.length

		if (tagOpeningIndex !== -1 && tagClosingIndex !== -1) {
			const tag = html.slice(tagOpeningIndex, tagClosingIndex)
			tags.push(tag)

			// Making sure the loop doesn't iterate unnecessary amount
			if (tagOpeningIndex > i) {
				i = tagClosingIndex
			}
		} else {
			break
		}
	}

	return tags
}

function attributeFromTag(tag, attribute) {
	if (typeof tag !== "string" || typeof attribute !== "string") return

	const attributeIndex = tag.indexOf(attribute)

	if (attributeIndex === -1) return

	const startIndex = tag.indexOf("=\"", attributeIndex) + "=\"".length
	const endIndex = tag.indexOf("\"", startIndex + 1)

	if (startIndex === -1 || endIndex === -1) return

	const attributeValue = tag.slice(startIndex, endIndex)
	return attributeValue
}

export { parseTags, attributeFromTag }
