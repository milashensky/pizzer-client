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


export function validateFields(field, value) {
    let errors = []
    let out = [value]
    if (!value)
        errors.push('Required field')
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


export function validatePasswords(password1, password2) {
    let errors = []
    if (!password1)
        errors.push('Required field')
    if (password1 !== password2)
        errors.push('Passwords should match')
    if (errors.length)
        return errors
}


export function getForm (formEl, fields) {
    let form = {}
    let errors = {}
    fields.forEach(field => {
        [form[field], errors[field]] = validateFields(field, formEl && formEl.elements[field] && formEl.elements[field].value)
        if (form.new_password1)
            errors.new_password1 = validatePasswords(form.new_password1, form.new_password2)
        if (form.password1)
            errors.password1 = validatePasswords(form.password1, form.password2)
    })
    return [form, errors]
}
