import amqp from "amqplib/callback_api.js"

const receiver = {
    channel: null,
    connection: null
}

const sender = {
    channel: null,
    connection: null
}

afterAll(() => {
    receiver.channel.close(() => {
        receiver.connection.close()
    })

    sender.channel.close(() => {
        sender.connection.close()
    })
})

describe("Environment is", () => {
    test("able to receive, process and forward requests, through ampq-connections", (done) => {
        try {
            amqp.connect("amqp://172.20.0.4:5672", (error, connection) => {
                if (error) throw error

                connection.createChannel((error01, channel) => {
                    if (error01) throw error01

                    const queue = "persister_queue"
                    channel.assertQueue(queue, { durable: true })

                    receiver.connection = connection
                    receiver.channel = channel

                    channel.consume(queue, async (message) => {
                        console.log(" [x] Sent %s", message)
                        expect(message).toBe("https://example.com") && expect(message).toBeInstanceOf(String)
                        done()
                    }, { noAck: true })
                })
            })

            amqp.connect("amqp://172.20.0.4:5672", (error, connection) => {
                if (error) throw error

                connection.createChannel((error01, channel) => {
                    if (error01) throw error01

                    const queue = "persister_queue"
                    const message = "https://example.com"

                    channel.assertQueue(queue, { durable: true })
                    channel.assertQueue(queue, Buffer.from(message))

                    sender.connection = connection
                    sender.channel = channel
                })
            })
        } catch(error) {
            throw new Error(error)
        }
    })
})
