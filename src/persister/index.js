import { parseTags, attributeFromTag } from "./lib/checker.js"

function processHTMLBody(page) {
    const url = page[0].url
    const head = page[0].details[0].scraped.head
    const body = page[0].details[0].scraped.body

    const linkTags = parseTags(body, "<a", "</a>")
    const links = []

    for (let i = 0; i < linkTags.length; i++) {
        const link = attributeFromTag(linkTags[i], "href")
        links.push(link)
    }

    links = links.filter((link) => link !== "")

    console.log("Tags", linkTags)
    console.log("Links", links)

    return {
        parentPage: url,
        linksFound: links,
        html: {
            head,
            body
        }
    }

    // Next these links should be returned to the validator, and the url of this page 
    // should be returned to the database with a guess what the page contains.
}

export default processHTMLBody
