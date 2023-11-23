import { checkRobotsFile } from "./lib/validate.js"

async function validateLinks(url) {
    // Even if this function is kinda useless at the moment, 
    // it can be used to introduce new functionality in the future.
	const robotsObject = await checkRobotsFile(url)
	return robotsObject
}

export default validateLinks
