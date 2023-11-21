import amqp from "amqplib/callback_api.js"
import validateLinks from "./index.js"
import triggerSender from "./sender.js"

amqp.connect("amqp://broker:test@172.20.0.4:5672", (error, connection) => {
	if (error) throw error

	console.log("Setting up amqp connection")
	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "validator_queue"
		channel.assertQueue(queue, { durable: false })
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.consume(queue, async (url) => {
			console.log(" [x] Sent %s", url)

			let linkQueue = []
			const urlFound = linkQueue.find((object) => object.url === url)

			if (!urlFound) {
				linkQueue.push({
					url: url,
					processed: true
				})

				// Because I cannot choose if I want to process one url at a time or a list of them,
				// I will process the urls one by one by sending an array with one item in it, for now.
				const resultQueues = await validateLinks([url])

				if (resultQueues.processedQueue) {
					triggerSender(resultQueues.processedQueue)
				}

				if (resultQueues.linkQueue) {
					// There is a possibility that the validator fails checking a link,
					// which we could try to access again later. At this point we don't keep
					// count of how many times the validator has tried, so this might be spammy'ish.
					// linkQueue = resultQueues.linkQueue.filter((link) => !link.processed)

					// TO DO! At this point it could be good to send the overview
					// of if url has failed the validation to frontend.
				}
			}
		}, { noAck: true })
	})
})

// setInterval(() => {
// 	console.log("Make new request every 2.5 seconds")
// 	triggerSender("Testing . . .", "validator_queue")
// }, 2500)
