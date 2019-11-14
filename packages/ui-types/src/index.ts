export function isHtmlElement (node: any) {
    return node && node.nodeType === Node.ELEMENT_NODE
}

export function isString (obj: any) {
    return Object.prototype.toString.call(obj) === '[object String]'
}
