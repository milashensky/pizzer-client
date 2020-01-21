import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCreator } from '@/redux/cartReducers'
import 'styles/cart-link.css'


function CartBtn(props) {
    let count = props.cartProducts.reduce((s, item) => s + item[1] - 0, 0)
    let totalPrice = 0
    function buildProducts () {
        const products = props.cartProducts.map(product => ({
            id: 0,
            price: 0,
            ...props.productsList.find(x => x.id == product[0]),
            quantity: product[1] - 0
        }))
        totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return products
    }
    function removeProduct (e, productId) {
        e.stopPropagation()
        e.preventDefault()
        props.updateCreator(props.cartProducts.filter(x => x[0] != productId))
        return 0
    }
    return (
        <li className="cart-link">
            <Link to="/cart" className="cart">
                <span>Cart</span>
                <span className="cart-badge" v-if="count">{count}</span>
            </Link>
            <ul className="dropdown-menu">
                <li>
                    <div className="cart-dropdown">
                        <ul className="media-list">
                            {
                                buildProducts().map(product => (
                                    <Link to={ `/products/${product.slug}` } key={product.id} tag="li" className="media">
                                        <div className="media-img" style={{backgroundImage: `url(/resize/200x200/${product.preview})`}}/>
                                        <div className="media-body">
                                            <h4 className="media-heading">{product.name}</h4>
                                            <span className="quantity">{product.quantity}</span>
                                            <span className="price">{product.quantity * product.price}</span>
                                            <button type="button" className="close" onClick={(e) => removeProduct(e, product.id)}/>
                                        </div>
                                    </Link>
                                ))
                            }
                        </ul>
                        <div className="total">
                            <div>
                                <h4 className="total_price">{ totalPrice }</h4>
                                <span className="total_item">{count} items</span>
                            </div>
                            <a className="btn">Checkout</a>
                        </div>
                    </div>
                </li>
            </ul>
        </li>
    )
}


const mapStateToProps = (state) => ({
    productsList: state.products.products || [],
    cartProducts: state.cart.products,
    cartUpdated: state.cart.updated
})

export default connect(mapStateToProps, { updateCreator })(CartBtn)
