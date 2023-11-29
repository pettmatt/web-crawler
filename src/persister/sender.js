import amqp from "amqplib/callback_api.js"

function triggerSender(url, queue = "validator_queue") {
	const user = "broker"
	const password = "test"

	amqp.connect(`amqp://${user}:${password}@172.20.0.4:5672`, (error, connection) => {
		if (error) throw error

		connection.createChannel((error01, channel) => {
			if (error01) throw error01

			const message = JSON.stringify(url)

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
