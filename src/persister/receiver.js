import amqp from "amqplib/callback_api.js"
import processHTMLBody from "./index.js"
import triggerSender from "./sender.js"

amqp.connect("amqp://broker:test@172.20.0.4:5672", (error, connection) => {
    if (error) throw error

	connection.createChannel((error01, channel) => {
        if (error01) throw error01

        const queue = "persister_queue"
        channel.assertQueue(queue, { durable: true })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

        channel.consume(queue, (message) => {
            try {
            console.log(" [x] sent %s", message)

            const pageDetails = JSON.parse(message.content.toString())
            const processedPage = processHTMLBody(pageDetails)
            console.log("Page", processedPage)

            channel.ack(message)
            } catch (error) {
                console.log("consumer rejects the request", error)
                channel.reject(message, false)
            }
        }, { noAck: false })
    })
})
