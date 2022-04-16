export function isObject(o) {
    return o && typeof o === 'object'
}

export function isRealElement(el) {
    return el.nodeType
}

export function query(el) {
    return typeof el === 'string' ? document.querySelector(el) : el
}