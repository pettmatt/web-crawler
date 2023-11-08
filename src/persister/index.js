import { parseTags, attributeFromTag } from "./lib/checker.js"

function main() {
    const html = `
        <body>
        <div>Do not want
            <a href="">Want this 1</a>
            <a href="https://google.com">Want this 2</a>
            <p>paragraph</p>
        </div>
        </body>
    `

    const linkTags = parseTags(html, "<a", "</a>")
    const links = []

    for (let i = 0; i < linkTags.length; i++) {
        const link = attributeFromTag(linkTags[i], "href")
        links.push(link)
    }

    console.log("Tags", linkTags)
    console.log("Links", links)

    // Next these links should be returned to the validator, and the url of this page 
    // should be returned to the database with a guess what the page contains.
}

main()
