import request from "./lib/request"
import handleStream from "./lib/process/stream"

console.log("Hello via Bun!")

const response = await request("https://duck.com")
	.then((res) => res)
	.catch((err) => err)

const res = handleStream(response)

console.log(response)
console.log(res)
