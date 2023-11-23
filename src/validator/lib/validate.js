async function checkRobotsFile(url) {
	const response = await fetchRequest(`${url}/robots.txt`)
	// const response = `User-agent: *\nDisallow:`
	const rules = {}
	const permission = {
		restrictions: false,
		pagesToIgnore: [],
	}

	// Most likely reason for the request failing is the site doesn't have "/robots.txt" path
	if (response.error) {
		permission.error = {
			error: response.error,
			message: response.message.toString()
		}

		return permission
	}

	response.split("\n").forEach((line) => {
		const [directive, value] = line.trim().split(/\s*:\s*/)

		if (directive && value) {
			if (!Object.prototype.hasOwnProperty.call(rules, directive)) {
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

	return permission
}

async function fetchRequest(url) {
	try {
		const res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Failed to fetch robots.txt: ${res.statusText}`)
		}

		const content = await res.text()
		return content
	} catch (error) {
		const objectError = {
			error: true,
			message: error,
		}

		return objectError
	}
}

export { checkRobotsFile }
