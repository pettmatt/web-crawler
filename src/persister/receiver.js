import amqp from "amqplib/callback_api.js"
import processHTMLBody from "./index.js"
import createRecord from "./lib/database.js"
// import triggerSender from "./sender.js"

amqp.connect("amqp://broker:test@172.20.0.4:5672", (error, connection) => {
	if (error) throw error

	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "persister_queue"
		channel.assertQueue(queue, { durable: true })

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.consume(queue, async (message) => {
			try {
				console.log(" [x] sent %s", message)

				const pageDetails = JSON.parse(message.content.toString())
				const processedPage = processHTMLBody(pageDetails)

				// Send found links to the validator, remember to send them through a loop
				// const foundLinks = processedPage.linksFound

				// The record object is generated here based on the scraped data from a site
				// TODO: Create a function that generates details that are needed for creating a record
				const response = await createRecord({
					url: processedPage.page.url,
					header: processedPage.page.header,
					description: "",
					tags: [],
				})

				if (response.error) {
					console.log(response)
				} else {
					console.log(response)
					console.log("Created or updated successfully")
				}

				// Send confirmation to frontend
				// triggerSender().then(() => triggerSender())

				channel.ack(message)
			} catch (err) {
				console.log("consumer rejects the request", err)
				channel.reject(message, false)
			}
		}, { noAck: false })
	})
})
