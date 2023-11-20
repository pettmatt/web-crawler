import amqp from "amqplib"

async function triggerSender(messageValue, queue = "persister_queue") {
    amqp.connect(`amqp://172.20.0.4:5672`, async (error, connection) => {
        if (error) throw error
    
        connection.createChannel((error01, channel) => {
            if (error01) throw error01
    
            const message = JSON.stringify(messageValue)
    
            channel.assertQueue(queue, { durable: false })
            channel.sendToQueue(queue, Buffer.from(message))
    
            console.log(" [x] Sent %s", message)
        })

        setTimeout(() => {
            connection.close()
            process.exit(0)
        }, 1000)
    })
}

export default triggerSender
