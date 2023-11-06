function validateHeadTags(html, rule) {
	const headStart = html.indexOf("<head>") + "<head>".length
	const headEnd = html.indexOf("</head>")
	const head = html.slice(headStart, headEnd)

	const allInstancesOfRule = []

	for (let i = 0; i < head.length; i++) {
		if (head[i] === "<") {
			const testInstanceOfRule = head.slice(i, i + rule.length)
			if (testInstanceOfRule === rule) {
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
	const ruleTags = ["<meta name=\"robots\""]
	const scrape = [["<body>", "</body>"]]
	const followRules = ["noindex", "nofollow", "noarchive", "nosnippet"]

	const validateResult = pages.map((page) => {
		const { html, link } = page

		const scrapeResult = ruleTags.map((rule) => {
			const { robotsMetaTags, head } = validateHeadTags(html, rule)

			const scrapedContent = scrape.map((chars) => {
				const charsStart = html.indexOf(chars[0]) + chars[0].length
				const charsEnd = html.indexOf(chars[1])
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
					scraped: { head, scrapedContent },
					metaTagRules: ruleContents,
				}
			}

			return {
				rule,
				metaTagsFound: false,
				scraped: { head, scrapedContent },
			}
		})

		return { page: link, scrapeResult }
	})

	return validateResult
}

async function main() {
	const links = [
		"https://pettmatt.com",
		"https://yle.fi",
	]

	const htmlResponses = []

	for (let link of links) {
		// Add features that are common for bots.
		// For example if fetch request fails -> fait 2 secs and try again
		const response = await fetch(link)
		const html = await response.text()
		htmlResponses.push({ link, html })
	}

	const scrapedList = scrapeHTML(htmlResponses)
	
	for(let page of scrapedList) {
		console.log(page.scrapeResult)
	}
}

main()
