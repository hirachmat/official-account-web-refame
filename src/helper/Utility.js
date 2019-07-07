function capitalizeString(string) {
    let str = string.replace(/\b\w/g, l => l.toUpperCase())

    return str
}

export default {
    capitalizeString
}