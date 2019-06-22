export function isHtmlElement (node) {
    return node && node.nodeType === Node.ELEMENT_NODE
}

export function isString (obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
}
