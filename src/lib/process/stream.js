async function createReadableStream(response) {
	const { body } = response
	const reader = body.getReader()
	let result = ""

	// Nothing special, basic convertion of body to rs
	const rs = new ReadableStream({
		start(controller) {
			function push() {
				reader.read()
					.then(({ done, value }) => {
						if (done) {
							controller.close()
						} else {
							controller.enqueue(value)
							result += value
							push()
						}
					})
			}

			push()
		},
	})

	return { rs, result }
}

function handleStream(response) {
	const readableStream = createReadableStream(response)
	return new Response(readableStream)
}

export default handleStream
