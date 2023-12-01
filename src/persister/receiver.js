import amqp from "amqplib/callback_api.js"
import * as env from "dotenv"
import processHTMLBody from "./index.js"
import createRecord from "./lib/database.js"
// import triggerSender from "./sender.js"
env.config()

const user = process.env.RABBITMQ_USER
const password = process.env.RABBITMQ_PASSWORD
const address = process.env.RABBITMQ_ADDRESS
const port = process.env.RABBITMQ_PORT

amqp.connect(`amqp://${user}:${password}@${address}:${port}`, (error, connection) => {
	if (error) throw error

	connection.createChannel((error01, channel) => {
		if (error01) throw error01

		const queue = "persister_queue"
		channel.assertQueue(queue, { durable: true })
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

		channel.prefetch(1)

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
					tags: processedPage.page.tags,
				})

				if (response.error) {
					// Send error message to the frontend
					console.log(processedPage)
					console.log(response)
				} else {
					// Send confirmation of the progress to frontend
					// and send links to validator
					console.log(response)
					console.log("Created or updated successfully")
				}

				// Send confirmation to frontend & send links to validator through a loop
				// triggerSender().then(() => triggerSender())

				channel.ack(message)
			} catch (err) {
				console.log("Consumer rejects the request", err)
				channel.reject(message, false)
			}
		}, { noAck: false })
	})
})
