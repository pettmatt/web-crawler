function addProtocol(url) {
    if (url.includes("http://" || "https://"))
        return url
    else
        return "https://" + url
}

export function extractUrls(searchTerm) {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g
    const matches = searchTerm.match(urlRegex)

    const urls = (matches) ? matches.map(url => addProtocol(url)) : null

    return {
        urls: urls,
        original: searchTerm,
    }
}