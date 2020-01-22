import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DEFAULT_CURRENCY_ID } from '@/redux/contextReducers'
import { submitOrderThunkCreator } from '@/redux/orderReducers'
import { renderErrors, getForm } from '@/utils/validators'
import ProfileForm from 'components/Customer/ProfileForm'
import AddressForm from 'components/Customer/AddressForm'
import 'styles/checkout-form.css'


const fields = ['name', 'email', 'phone', 'address', 'house', 'appartaments', 'details', 'payment_method']

function CheckoutForm (props) {
    let [formErrors, errorsSet] = useState({})
    let form = React.createRef()
    function submit (e) {
        e.preventDefault()
        let [formData, errors] = getForm(form, fields)
        errorsSet(errors)
        if (!Object.values(errors).filter(x => x).length)
            props.submitOrder({...formData, products: props.products, currency: props.currency || DEFAULT_CURRENCY_ID})
    }
    let errors = renderErrors({...formErrors, ...props.errors})
    return (
        <form onSubmit={submit} className="checkout-form" ref={e => form = e}>
            <ProfileForm errors={errors} title="Presonal info"/>
            <AddressForm errors={errors} title="Delivery"/>
            <div>
                <h3>Notes</h3>
                <div className="form-group">
                    <textarea placeholder="Details or instuctions to your order" name="details" className={errors.details ? 'invalid' : ''} rows="4"/>
                    {errors.details}
                </div>
            </div>
            <div className="form-group">
                <h3>Payment</h3>
                <div className="inline">
                    <label htmlFor="payment-card" className="ckeckcontainer">
                        <input type="radio" id="payment-card" name="payment_method" value="0"/>
                        <span className="checkmark"/>
                        Pay with card to courier
                    </label>
                    <label htmlFor="payment-cash" className="ckeckcontainer">
                        <input type="radio" id="payment-cash" name="payment_method" value="1"/>
                        <span className="checkmark"/>
                        Pay with cash to courier
                    </label>
                </div>
                {errors.payment_method}
            </div>
            <button type="submit" className="btn">Checkout</button>
        </form>
    )
}
CheckoutForm.propTypes = {
    products: PropTypes.array
}


const mapStoreToProps = (state) => ({
    currency: state.context.currency,
    errors: state.order.errors
})
export default connect (mapStoreToProps, {submitOrder: submitOrderThunkCreator})(CheckoutForm)
