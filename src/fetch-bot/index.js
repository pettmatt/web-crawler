import request from "./lib/request"
import handleStream from "./lib/process/stream"

console.log("Hello via Node!")

const response = await request("https://pettmatt.com")
	.then((res) => res)
	.catch((err) => err)

const res = handleStream(response)

console.log(response)
console.log(res)
