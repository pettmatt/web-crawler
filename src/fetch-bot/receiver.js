import amqp from "amqplib/callback_api.js"
import fetchAndProcessDataFromUrl from "./index.js"
import triggerSender from "./sender.js"

amqp.connect("amqp://broker:test@172.20.0.4:5672", (error, connection) => {
	if (error) throw error

	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "fetch_bot_queue"
		channel.assertQueue(queue, { durable: true })

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.consume(queue, async (message) => {
			try {
				console.log(" [x] sent %s", message)

				const urlObject = JSON.parse(message.content.toString())
				// TODO: Respect the rules specified in robots.txt
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
