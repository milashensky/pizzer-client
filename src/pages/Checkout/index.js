import React from 'react'
import List from 'components/Cart/List'
import { connect } from 'react-redux'
import { validateOrder } from '@/utils/validators'
import { clearOrderStatus } from '@/redux/orderReducers'
import { updateCreator } from '@/redux/cartReducers'
import CheckoutForm from 'components/Cart/CheckoutForm'
import OrderSuccess from 'components/Cart/OrderSuccess'
import EmptyCart from 'components/Cart/Empty'
import { buildNiceTime } from '@/utils/time'
import 'styles/checkout.css'


let status = false


function Checkout (props) {
    let container = React.createRef()
    const deliveryTime = buildNiceTime(Date.now() / 1000 + 3000)
    function toggleStep (n) {
        if (n) {
            container.classList.remove('step-0')
            container.classList.add('step-1')
        } else {
            container.classList.remove('step-1')
            container.classList.add('step-0')
        }
    }
    if (props.status) {
        status = true
        props.clearOrderStatus()
        props.updateCreator([])
    }
    if (status)
        return (<OrderSuccess/>)
    if (!props.cartProducts.length)
        return (<EmptyCart/>)
    return (
        <div className='page-checkout step-0' ref={(e) => container = e}>
            <div className="form-container">
                <h1>Checkout</h1>
                <CheckoutForm/>
                <a className="btn btn-mobile-back" onClick={() => toggleStep(0)}>Change order</a>
            </div>
            <div className="checkout-list">
                <h3>Order</h3>
                <p>Will be delivered {deliveryTime}</p>
                <List className=""/>
                <a className="btn btn-mobile-confirm" onClick={() => toggleStep(1)}>Yes, everything is right</a>
            </div>
        </div>
    )
}

const mapStoreToProps = (state) => ({
    status: state.order.status,
    cartProducts: state.cart.products,
    cartUpdated: state.cart.updated
})
export default connect (mapStoreToProps, {updateCreator, clearOrderStatus})(Checkout)
