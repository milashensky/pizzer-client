import React, { useState } from 'react'
import { connect } from 'react-redux'
import { renderErrors, getForm } from '@/utils/validators'
import { updatePasswordThunkCreator } from '@/redux/profileReducers'


const fields = ['old_password', 'new_password1', 'new_password2']

function Form (props) {
    let [formErrors, errorsSet] = useState({})
    let form = React.createRef()
    function submit (e) {
        e.preventDefault()
        let [data, errors] = getForm(form, fields)
        errorsSet(errors)
        if (!props.confirmed)
            delete errors.old_password
        if (!Object.values(errors).filter(x => x).length)
            props.submit(data)
    }
    let errors = renderErrors({...formErrors, ...props.errors})
    return (
        <form onSubmit={submit} ref={e => form = e}>
            {
                props.closeFunc ?
                    <a onClick={props.closeFunc} className="close"/>
                    :<span/>
            }
            <h3>Password settings</h3>
            {
                !props.confirmed ?
                    <span/>
                    :<div className="form-group my-1">
                        <input placeholder="Enter your password" name="old_password" type="password" className={errors.old_password ? 'invalid' : ''}/>
                        {errors.old_password}
                    </div>
            }
            <div className="form-group my-1">
                <input placeholder="Enter new password" name="new_password1" type="password" className={errors.new_password1 ? 'invalid' : ''}/>
                {errors.new_password1}
            </div>
            <div className="form-group my-1">
                <input placeholder="Repeat" name="new_password2" type="password" className={errors.new_password2 ? 'invalid' : ''}/>
                {errors.new_password2}
            </div>
            <button type="submit">Update</button>
        </form>
    )
}


const mapStoreToProps = (state) => ({
    confirmed: state.context.confirmed,
    errors: state.profile.errors.password
})
export default connect (mapStoreToProps, {submit: updatePasswordThunkCreator})(Form)
