import express from "express"
import amqp from "amqplib"
import bodyParser from "body-parser"
import * as env from "dotenv"

const app = express()
app.use(bodyParser.json())
env.config()

const port = process.env.PORT
const queue = "web_queue"

let channel
const user = process.env.RABBITMQ_USER
const password = process.env.RABBITMQ_PASSWORD
const address = process.env.RABBITMQ_ADDRESS
const brokerPort = process.env.RABBITMQ_PORT

amqp.connect(`amqp://${user}:${password}@${address}:${brokerPort}`)
    .then((connection) => connection.createChannel())
    .then((ch) => {
        channel = ch
		console.log(" [*] Web API broker connection achieved!")
        return channel.assertQueue(queue)
    })
    .catch((error) => console.error("Error connecting to broker", error))

app.post("/send", async (req, res) => {
    const { message } = req.body

    if (!message) {
        return res.status(400).json({
			message: "Message is required."
		})
    }

    channel.sendToqueue(queue, Buffer.from(message))
    console.log(" [x] Sent %s", message)

    res.status(200).json({
		message: "Message sent to broker."
	})
})

app.get("/receive", async (req, res) => {
    channel.consume(queue, (message) => {
        if (message !== null) {
            const message = message.content.toString()
            console.log(` [x] Received %s`, message)
            channel.ack(message) // Acknowledge message after processing

            res.status(200).json({
				message: `Received message: ${message}`
			})
        } else {
            res.status(404).json({
				message: "No messages in queue."
			})
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
