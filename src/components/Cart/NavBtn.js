import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import List from 'components/Cart/List'
import 'styles/cart-link.css'


function NavBtn(props) {
    let count = props.cartProducts.reduce((s, item) => s + item[1] - 0, 0)
    return (
        <li className="cart-link">
            <Link to="/checkout" className="cart">
                <span>Cart</span>
                <span className="cart-badge">{count}</span>
            </Link>
            <ul className="dropdown-menu">
                <li>
                    <List className="cart-dropdown"/>
                </li>
            </ul>
        </li>
    )
}


const mapStateToProps = (state) => ({
    cartProducts: state.cart.products,
    cartUpdated: state.cart.updated
})

export default connect(mapStateToProps, {})(NavBtn)
