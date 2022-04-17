export function isObject(o) {
    return o && typeof o === 'object'
}

export function isRealElement(el) {
    return el.nodeType
}

export function query(el) {
    return typeof el === 'string' ? document.querySelector(el) : el
}

export function isDef(v) {
    return v !== undefined && v !== null
}

export function resolveAsset(options, type, tag) {
    const assets = options[type]
    
    // return assets[tag]
}

export function extend(to, from) {
    return Object.assign({}, from, to)
}