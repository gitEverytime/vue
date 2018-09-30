export default function filterXss(a) {
    return a.replace(/[\<]/g, "(")
        .replace(/[\>]/g, ")")
        .replace(/[\r\n\t\\]/g, " ")
        .replace(/[\"]/g, "'")
}
