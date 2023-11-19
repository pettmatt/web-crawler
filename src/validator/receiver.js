import amqp from "amqplib/callback_api.js"
import validateLinks from "./index.js"
import triggerSender from "./sender.js"

amqp.connect("amqp://172.20.0.4:5672", (error, connection) => {
	if (error) throw error

	connection.createChannel(async (error01, channel) => {
		if (error01) throw error01

		const queue = "validator_queue"
		channel.assertQueue(queue, { durable: false })
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

        channel.consume(queue, async (url) => {
            console.log(" [x] Sent %s", url)
			const urlFound = linkQueue.find((object) => object.url === url)

			if (!urlFound) {
				linkQueue.push({
					url: url,
					processed: false
				})

                const results = await validateLinks(linkQueue)

                if (results) {
                    triggerSender(results)
                }
			}
        }, { noAck: true })
	})
})
