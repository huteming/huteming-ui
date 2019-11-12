export function isHtmlElement (node: Element) {
    return node && node.nodeType === Node.ELEMENT_NODE
}

export function isString (obj: any) {
    return Object.prototype.toString.call(obj) === '[object String]'
}
