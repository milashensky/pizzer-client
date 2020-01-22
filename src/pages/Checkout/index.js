import React from 'react'
import List from 'components/Cart/List'
import { connect } from 'react-redux'
import { clearOrderStatus } from '@/redux/orderReducers'
import { updateCreator } from '@/redux/cartReducers'
import { getContextThunkCreator } from '@/redux/contextReducers'
import CheckoutForm from 'components/Cart/CheckoutForm'
import OrderSuccess from 'components/Cart/OrderSuccess'
import EmptyCart from 'components/Cart/Empty'
import { buildNiceTime } from '@/utils/time'
import 'styles/checkout.css'


class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {status: false, step: 0}
    }
    componentDidMount () {
        this.props.clearOrderStatus()
    }
    componentDidUpdate () {
        if (this.props.status) {
            this.props.getContext()
            this.setState({...this.state, status: true})
            this.props.clearOrderStatus()
            this.props.updateCreator([])
        }
    }
    toggleStep (n) {
        this.setState({...this.state, step: n})
    }
    render () {
        const deliveryTime = buildNiceTime(Date.now() / 1000 + 3000)
        if (this.state.status)
            return (<OrderSuccess/>)
        if (!this.props.cartProducts.length)
            return (<EmptyCart/>)
        return (
            <div className={`page-checkout step-${this.state.step}`}>
                <div className="form-container">
                    <h1>Checkout</h1>
                    <CheckoutForm products={this.props.cartProducts}/>
                    <a className="btn btn-mobile-back" onClick={() => this.toggleStep(0)}>Change order</a>
                </div>
                <div className="checkout-list">
                    <h3>Order</h3>
                    <p>Will be delivered {deliveryTime}</p>
                    <List className=""/>
                    <a className="btn btn-mobile-confirm" onClick={() => this.toggleStep(1)}>Yes, everything is right</a>
                </div>
            </div>
        )
    }
}

const mapStoreToProps = (state) => ({
    status: state.order.status,
    cartProducts: state.cart.products,
    cartUpdated: state.cart.updated
})
export default connect (mapStoreToProps, {updateCreator, clearOrderStatus, getContext: getContextThunkCreator})(Checkout)
