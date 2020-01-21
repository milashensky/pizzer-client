import React from 'react'
import { Link } from 'react-router-dom'
import 'styles/cart-link.css'


export default function CartBtn() {
    let count = 0
    let totalPrice = 0
    let products = []
    function remove (product) {

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
                                products.map(product => {
                                    <Link to={ `products/${product.slug}` } key={product.id} tag="li" className="media">
                                        <div className="media-img" style={{backgroundImage: `url(/resize/300x300/${product.preview})`}}/>
                                        <div className="media-body">
                                            <h4 className="media-heading">{product.name}</h4>
                                            <span className="quantity">{product.quantity}</span>
                                            <span className="price">{product.quantity * product.price}</span>
                                            <button type="button" className="close" onClick="{remove(product)}">
                                                <i className="fa fa-close"/>
                                            </button>
                                        </div>
                                    </Link>
                                })
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
