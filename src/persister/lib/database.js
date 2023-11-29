async function createRecord(record) {
	try {
		const response = await fetch("http://localhost:3000/sites", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(record),
		})

		const body = await response.json()

		if (response.status === 400) {
			throw new Error({
				statusCode: response.status,
				body,
			})
		}

		return body
	} catch (error) {
		return new Error(`Creating a record failed.\n${error}`)
	}
}

export default createRecord
