export function getCookie (name) {
    const re = new RegExp(name + '=([^;]+)')
    let value = re.exec(document.cookie)
    return (value != null) ? unescape(value[1]) : null
}

export function setCookie (name, value, props) {
    props = props || {}
    let exp = props.expires
    if (typeof exp == 'number' && exp) {
        let d = new Date()
        d.setTime(d.getTime() + exp * 1000)
        exp = props.expires = d
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString()
    }
    value = encodeURIComponent(value)
    let updatedCookie = name + '=' + value
    let propName
    for (propName in props) {
        updatedCookie += '; ' + propName
        let propValue = props[propName]
        if (propValue !== true) {
            updatedCookie += '=' + propValue
        }
    }
    document.cookie = updatedCookie
}

export function deleteCookie (name) {
    setCookie(name, null, {expires: -1})
}
