function getHeadTag(html) {
	const headStart = html.indexOf("<head>")
	const headEnd = html.indexOf("</head>") + "</head>".length
	const head = html.slice(headStart, headEnd)
	return head
}

function validateHeadTags(head, rule) {
	const allInstancesOfRule = []

	for (let i = 0; i < head.length; i++) {
		if (head[i] === "<") {
			const compareInstanceOfRule = head.slice(i, i + rule.length)

			if (compareInstanceOfRule === rule) {
				const endChars = "/>"
				const metaTagEndIndex = head.indexOf(endChars, i) + endChars.length
				const metaTag = head.slice(i, metaTagEndIndex)
				allInstancesOfRule.push(metaTag)
			}
		}
	}

	return { robotsMetaTags: allInstancesOfRule, head }
}

function scrapeHTML(page) {
	const scrape = [["<body", "</body>"]]
	const ruleTags = ["<meta name=\"robots\""]
	const followRules = ["noindex", "nofollow", "noarchive", "nosnippet"]

	const { html, url } = page

	const scrapedContent = scrape.map((chars) => {
		const charsStart = html.indexOf(chars[0])
		const charsEnd = html.indexOf(chars[1]) + chars[1].length
		const content = html.slice(charsStart, charsEnd)
		return content
	})

	const head = getHeadTag(html)

	const scrapeHeadMetaResult = ruleTags.map((rule) => {
		const { robotsMetaTags } = validateHeadTags(html, rule)

		if (robotsMetaTags.length > 0) {
			const ruleContents = robotsMetaTags.map((ruleInstance) => {
				const splitedMetaTag = ruleInstance.split("\"")
				const robotRules = splitedMetaTag[3].split(", ")
				const ruleList = robotRules.filter((r) => followRules.includes(r))
				return ruleList
			})

			return {
				metaTagsFound: true,
				searchedTag: rule,
				metaRobotRules: ruleContents,
			}
		}

		return {
			metaTagsFound: false,
			searchedTag: rule,
			metaRobotRules: null,
		}
	})

	return {
		url,
		scraped: {
			head,
			body: scrapedContent[0],
		},
		rules: scrapeHeadMetaResult
	}
}

export { scrapeHTML, validateHeadTags }
