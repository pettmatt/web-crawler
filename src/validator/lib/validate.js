const permission = {
	url: "",
	restrictions: false,
	pagesToIgnore: [],
}

async function fetchRequest(url) {
	try {
		const res = await fetch(`${url}`)

		if (!res.ok) {
			throw new Error(`Failed to fetch robots.txt: ${res.statusText}`)
		}

		const content = await res.text()
		return content
	} catch (err) {
		const objectError = {
			error: true,
			message: err,
		}

		return objectError
	}
}

async function checkRobotsFile(url) {
	// const response = await fetchRequest(`${url}/robots.txt`)
	const response = `
User-agent: *
Disallow:
`
	const rules = {}

	response.split("\n").forEach((line) => {
		const [directive, value] = line.trim().split(/\s*:\s*/)

		if (directive && value) {
			if (!rules.hasOwnProperty(directive)) {
				rules[directive.toLowerCase()] = []
			}

			rules[directive.toLowerCase()].push(value)
		}
	})

	permission.url = url

	if (rules.disallow) {
		// If there are no disallowed pages, there is no point of
		// pointing out that there are restrictions.
		rules["user-agent"].forEach((agent) => {
			if (agent === "*") permission.restrictions = true
		})

		rules.disallow.forEach((page) => {
			if (page) {
				permission.pagesToIgnore.push(page)
			}
		})
	}

	console.log(permission)

	return permission
}

function checkPageHeader(url) {
	const response = fetchRequest(url)
	const content = response

	return new Response(content)
}

export { checkRobotsFile, checkPageHeader }
