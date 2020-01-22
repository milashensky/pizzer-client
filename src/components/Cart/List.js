import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { convertProductPrice, buildPrice, getDeliveryPrice, buildDeliveryPrice } from '@/utils/price'
import { updateCreator } from '@/redux/cartReducers'


function List (props) {
    let location = useLocation()
    let count = props.cartProducts.reduce((s, item) => s + item[1] - 0, 0)
    let totalPrice = 0
    function buildProducts () {
        const products = props.cartProducts.map(_product => {
            const product = props.productsList.find(x => x.id == _product[0])
            if (!product)
                return {id: 0}
            return {
                ...product,
                quantity: _product[1] - 0,
                convertedPrice: convertProductPrice(product)
            }
        }).filter(x => x.id > 0)
        totalPrice = products.reduce((sum, item) => sum + item.convertedPrice * item.quantity, 0)
        return products
    }
    function removeProduct (e, productId) {
        e.stopPropagation()
        e.preventDefault()
        props.updateCreator(props.cartProducts.filter(x => x[0] != productId))
        return 0
    }
    return (
        <div className={props.className + (location.pathname == '/cart' ? ' checkout-page-active' : '') }>
            <ul className="media-list">
                {
                    buildProducts().map(product => (
                        <Link to={ `/products/${product.slug}` } key={product.id} className="media">
                            <div className="media-img" style={{backgroundImage: `url(/resize/200x200/${product.preview})`}}/>
                            <div className="media-body">
                                <h4 className="media-heading">{product.name}</h4>
                                <span className="quantity">{product.quantity}</span>
                                <span className="price">{buildPrice(product.quantity * product.convertedPrice)}</span>
                                <button type="button" className="close" onClick={(e) => removeProduct(e, product.id)}/>
                            </div>
                        </Link>
                    ))
                }
            </ul>
            <div className="total">
                {
                    count ?
                        <div>
                            <div>
                                <span className="total_item">{count} items</span>
                                <p className="subtotal">{ buildPrice(totalPrice) }</p>
                                <p className="delivery">Delivery: { buildDeliveryPrice(totalPrice) }</p>
                                <h4 className="total_price">{ buildPrice(totalPrice + getDeliveryPrice(totalPrice)) }</h4>
                            </div>
                            <Link to='/cart' className="btn">Checkout</Link>
                        </div>
                        :<div>
                            <span className="total_item">{count} items</span>
                        </div>
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    productsList: state.products.products || [],
    cartProducts: state.cart.products,
    currency: state.context.currency,
    cartUpdated: state.cart.updated
})

export default connect(mapStateToProps, { updateCreator })(List)
