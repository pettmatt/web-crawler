import amqp from "amqplib/callback_api.js"

function triggerSender(data, queue = "persister_queue") {
    amqp.connect(`amqp://broker:test@172.20.0.4:5672`, (error, connection) => {
        if (error) throw error

        connection.createChannel((error01, channel) => {
            if (error01) throw error01
    
            const message = JSON.stringify(data)
    
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
