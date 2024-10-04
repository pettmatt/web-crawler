import amqp from "amqplib/callback_api.js"
import * as env from "dotenv"
import validateLinks from "./index.js"
import triggerSender from "./sender.js"
import { extractUrls } from "./lib/utility.js"

env.config()

const user = process.env.RABBITMQ_USER
const password = process.env.RABBITMQ_PASSWORD
const address = process.env.RABBITMQ_ADDRESS
const port = process.env.RABBITMQ_PORT

amqp.connect(`amqp://${user}:${password}@${address}:${port}`, (error, connection) => {
	if (error) throw error

	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "validator_queue"
		channel.assertQueue(queue, { durable: true })
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.prefetch(1)

		channel.consume(queue, async (message) => {
			try {
				const searchTerm = message.content.toString()
				console.log(" [x] Sent %s", searchTerm)

				const searchObject = extractUrls(searchTerm)
				const results = (searchObject.urls)
					? searchObject.urls.map(async url => await validateLinks(url))
					: null

				if (results) {
					triggerSender(results)
				}

				// TO DO! At this point it could be good to send the overview
				// to frontend if url has failed the validation.

				channel.ack(message)
			} catch (err) {
				console.log("consumer rejects the request", err)
				channel.reject(message, false)
			}
		}, { noAck: false })
	})
})
