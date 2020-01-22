import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DEFAULT_CURRENCY_ID } from '@/redux/contextReducers'
import { validateOrder, renderErrors } from '@/utils/validators'
import { submitOrderThunkCreator, clearOrderStatus } from '@/redux/orderReducers'
import 'styles/checkout-form.css'


const fields = ['name', 'email', 'phone', 'address', 'house', 'appartaments', 'details', 'payment_method']

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {errors: {}, success: false}
    }
    componentDidMount () {
        // this.props.fetchUser()
        this.props.clearOrderStatus()
    }
    submit (e) {
        let form = {}
        let errors = {}
        e.preventDefault()
        fields.forEach(field => {
            [form[field], errors[field]] = validateOrder(field, e.target.elements[field].value)
        })
        this.setState({
            ...this.state,
            errors
        })
        if (!Object.values(errors).filter(x => x).length)
            this.props.submitOrder({...form, products: this.props.products, currency: this.props.currency || DEFAULT_CURRENCY_ID})
    }
    render() {
        const errors = renderErrors({...this.state.errors, ...this.props.errors})
        return (
            <form onSubmit={this.submit.bind(this)} className="checkout-form">
                <div>
                    <h3>Presonal info</h3>
                    <div className="form-group">
                        <input placeholder="Enter your name" name="name" type="text" className={errors.name ? 'invalid' : ''}/>
                        {errors.name}
                    </div>
                    <div className="inline">
                        <div className="form-group">
                            <input placeholder="Email" name="email" type="email" className={errors.email ? 'invalid' : ''}/>
                            {errors.email}
                        </div>
                        <div className="form-group">
                            <input placeholder="Phone number" name="phone" type="text" className={errors.phone ? 'invalid' : ''}/>
                            {errors.phone}
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Delivery</h3>
                    <div className="form-group">
                        <input placeholder="Enter your address" name="address" type="text" className={errors.address ? 'invalid' : ''}/>
                        {errors.address}
                    </div>
                    <div className="inline">
                        <div className="form-group">
                            <input placeholder="House" name="house" type="text" className={errors.house ? 'invalid' : ''}/>
                            {errors.house}
                        </div>
                        <div className="form-group">
                            <input placeholder="Apt #" name="appartaments" type="text" className={errors.appartaments ? 'invalid' : ''}/>
                            {errors.appartaments}
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Notes</h3>
                    <div className="form-group">
                        <textarea placeholder="Details or instuctions to your order" name="details" className={errors.details ? 'invalid' : ''}/>
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
}

CheckoutForm.propTypes = {
    products: PropTypes.array
}


const mapStoreToProps = (state) => ({
    currency: state.context.currency,
    errors: state.order.errors
})
export default connect (mapStoreToProps, {submitOrder: submitOrderThunkCreator, clearOrderStatus})(CheckoutForm)
