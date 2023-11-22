import amqp from "amqplib/callback_api.js"
import validateLinks from "./index.js"
import triggerSender from "./sender.js"

amqp.connect("amqp://broker:test@172.20.0.4:5672", (error, connection) => {
	if (error) throw error

	let linkQueue = []
	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "validator_queue"
		channel.assertQueue(queue, { durable: true })
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.consume(queue, async (message) => {
			try {
				const url = message.content.toString()
				// console.log(" [x] Sent %s", url)

				const urlFound = linkQueue.find((object) => object.url === url)

				if (!urlFound) {
					linkQueue.push({
						url: url,
						processed: false,
					})

					const result = await validateLinks(linkQueue)
					
					if (result) {
						triggerSender(result.processedQueue[0].url)
					}
						
					// if (result.linkQueue) {
						// TO DO! At this point it could be good to send the overview 
						// to frontend if url has failed the validation.
					// }
				}

				channel.ack(message)
			} catch(error) {
				channel.reject(message, false)
			}
		}, { noAck: false })
	})
})

setTimeout(() => {
	triggerSender("http://google.com", "validator_queue")
}, 3000)
