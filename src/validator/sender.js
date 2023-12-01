import amqp from "amqplib/callback_api.js"
import * as env from "dotenv"

env.config()

function triggerSender(url, queue = "fetch_bot_queue") {
	const user = process.env.RABBITMQ_USER
	const password = process.env.RABBITMQ_PASSWORD
	const address = process.env.RABBITMQ_ADDRESS
	const port = process.env.RABBITMQ_PORT

	amqp.connect(`amqp://${user}:${password}@${address}:${port}`, (error, connection) => {
		if (error) throw error

		connection.createChannel((error01, channel) => {
			if (error01) throw error01

			const message = (typeof url === "string") ? url : JSON.stringify(url)

			channel.assertQueue(queue, { durable: true })
			channel.sendToQueue(queue, Buffer.from(message))

			channel.close(() => {
				connection.close()
				process.exit(0)
			})
		})
	})
}

export default triggerSender
