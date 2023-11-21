function validateHeadTags(html, rule) {
	const headStart = html.indexOf("<head>") + "<head>".length
	const headEnd = html.indexOf("</head>")
	const head = html.slice(headStart, headEnd)

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

function scrapeHTML(pages) {
	const scrape = [["<body", "</body>"]]
	const ruleTags = ["<meta name=\"robots\""]
	const followRules = ["noindex", "nofollow", "noarchive", "nosnippet"]

	const validateResult = pages.map((page) => {
		const { html, link } = page

		const scrapeResult = ruleTags.map((rule) => {
			const { robotsMetaTags, head } = validateHeadTags(html, rule)

			const scrapedContent = scrape.map((chars) => {
				const charsStart = html.indexOf(chars[0])
				const charsEnd = html.indexOf(chars[1]) + chars[1].length
				const content = html.slice(charsStart, charsEnd)
				return content
			})

			if (robotsMetaTags.length > 0) {
				const ruleContents = robotsMetaTags.map((ruleInstance) => {
					const splitedMetaTag = ruleInstance.split("\"")
					const robotRules = splitedMetaTag[3].split(", ")
					const ruleList = robotRules.filter((r) => followRules.includes(r))
					return ruleList
				})

				return {
					rule,
					metaTagsFound: true,
					scraped: { head, body: scrapedContent },
					metaTaRobotRules: ruleContents,
				}
			}

			return {
				rule,
				metaTagsFound: false,
				scraped: { head, body: scrapedContent },
			}
		})

		return { page: link, details: scrapeResult }
	})

	return validateResult
}

export { scrapeHTML, validateHeadTags }
