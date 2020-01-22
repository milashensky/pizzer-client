import React from 'react'


export function validatePhone(value) {
    if (/^\+?[-\s]?\(?[0-9]{1,2}\)?[-\s]?\(?([0-9]{3,4})\)?[-.\s]?([0-9]{2,3})[-.\s]?([0-9]{2,4})[-.\s]?([0-9]{2})?$/.test(value))
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
    errors = errors.filter(err => err)
    if (errors.length)
        out.push(errors)
    return out
}

export function renderErrors(errors) {
    return Object.fromEntries(Object.entries(errors).map(([field, errs]) => {
        if (Array.isArray(errs))
            return [
                field,
                errs.map((err, i) => (<p key={i} className="field-error">{err}</p>))
            ]
        return [field, errs]
    }))
}
