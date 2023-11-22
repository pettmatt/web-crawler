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

                const url = message.content.toString()
                const result = await fetchAndProcessDataFromUrl(url)

                triggerSender(result)

                channel.ack(message)
            } catch(error) {
                channel.reject(message, false)
            }
        }, { noAck: false })
    })
})
