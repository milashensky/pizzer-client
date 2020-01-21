import React from 'react'


export function validatePhone(value) {
    if (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value))
        return
    else
        return 'Invalid phone format'
}


export function validateEmail(value) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
        return
    else
        return 'Invalid email'
}


export function validateOrder(field, value) {
    let errors = []
    let out = [value]
    if (!value) {
        errors.push('Required field')
    }
    switch (field) {
    case 'details':
        return out
    case 'phone':
        errors.push(validatePhone(value))
        break
    case 'email':
        errors.push(validateEmail(value))
        break
    }
    errors = errors.filter(err => err).map((err, i) => (<p key={i} className="field-error">{err}</p>))
    if (errors.length)
        out.push(errors)
    return out
}
