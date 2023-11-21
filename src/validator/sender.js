import amqp from "amqplib/callback_api.js"

async function triggerSender(messageValue, queue = "persister_queue") {
    amqp.connect(`amqp://broker:test@172.20.0.4:5672`, async (error, connection) => {
        if (error) throw error
    
        connection.createChannel(async (error01, channel) => {
            if (error01) throw error01
    
            const message = JSON.stringify(messageValue)
    
            channel.assertQueue(queue, { durable: false })
            channel.sendToQueue(queue, Buffer.from(message))
    
            console.log(" [x] Sent %s", message)

            await channel.close(() => {
                connection.close()
            })
        })
    })
}

export default triggerSender
