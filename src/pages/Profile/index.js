import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { renderErrors, getForm } from '@/utils/validators'
import { updateProfileThunkCreator, updateAddressThunkCreator } from '@/redux/profileReducers'
import PasswordFormModal from 'components/Customer/PasswordFormModal'
import AddressForm from 'components/Customer/AddressForm'
import ProfileForm from 'components/Customer/ProfileForm'


const fields = {
    profile: ['name', 'email', 'phone'],
    address: ['address', 'house', 'appartaments']
}
function Profile (props) {
    let [formErrors, errorsSet] = useState({profile: {}, address: {}})
    let forms = {
        profile: React.createRef(),
        address : React.createRef()
    }
    function submit(e, type) {
        e.preventDefault()
        let [formData, errors] = getForm(forms[type], fields[type])
        errorsSet({...formErrors, [type]: errors})
        if (!Object.values(errors).filter(x => x).length)
            props[`submit_${type}`](formData)
    }
    function getErrors (type) {
        return renderErrors({...(formErrors[type] || {}), ...(props.errors[type] || {})})
    }
    return (
        <div className="main profile form-container">
            <h1>Profile settings</h1>
            <form onSubmit={(e) => submit(e, 'profile')} className="checkout-form" ref={e => forms['profile'] = e}>
                <ProfileForm errors={getErrors('profile')} title="Presonal info"/>
                <button className="btn">Save</button>
            </form>
            <form onSubmit={(e) => submit(e, 'address')} className="checkout-form" ref={e => forms['address'] = e}>
                <AddressForm errors={getErrors('address')} title="Delivery Address"/>
                <button className="btn">Save</button>
            </form>
            {
                props.context.confirmed ?
                    <div className="my-1"/>
                    :<div className="user-unconfirmed">
                        You need set password!
                    </div>
            }
            <PasswordFormModal className="d-desktop"/>
            <Link className="d-mobile btn" to="/profile/password">Set password</Link>
        </div>
    )
}


const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    address: state.profile.address,
    errors: state.profile.errors,
    context: state.context
})
export default connect (mapStateToProps, {submit_profile: updateProfileThunkCreator, submit_address: updateAddressThunkCreator})(Profile)
