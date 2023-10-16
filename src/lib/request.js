async function request(link) {
	const url = new URL(link)
	const response = fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error("HTTP request failed:", res.status)
			}

			return res
		})
		.catch((err) => err)

	return new Response(response)
}

export default request
