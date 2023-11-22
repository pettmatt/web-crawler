import amqp from "amqplib/callback_api.js"

function triggerSender(url, queue = "fetch_bot_queue") {
    amqp.connect(`amqp://broker:test@172.20.0.4:5672`, (error, connection) => {
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
