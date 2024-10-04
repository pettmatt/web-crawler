import amqp from "amqplib/callback_api.js"
import * as env from "dotenv"
import fetchAndProcessDataFromUrl from "./index.js"
import triggerSender from "./sender.js"

env.config()

const user = process.env.RABBITMQ_USER
const password = process.env.RABBITMQ_PASSWORD
const address = process.env.RABBITMQ_ADDRESS
const port = process.env.RABBITMQ_PORT

amqp.connect(`amqp://${user}:${password}@${address}:${port}`, (error, connection) => {
	if (error) throw error

	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "fetch_bot_queue"
		channel.assertQueue(queue, { durable: true })
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.prefetch(1)
		channel.consume(queue, async (message) => {
			try {
				const urlObject = JSON.parse(message.content.toString())
				console.log(" [x] sent %s", urlObject)

				const result = await fetchAndProcessDataFromUrl(urlObject.url)
				triggerSender(result)

				channel.ack(message)
			} catch (err) {
				console.log("consumer rejects the request", err)
				channel.reject(message, false)
			}
		}, { noAck: false })
	})
})
