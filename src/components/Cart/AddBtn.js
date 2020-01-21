import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCartCreator } from '@/redux/cartReducers'
import 'styles/cart-link.css'


function AddBtn (props) {
    const product = props.product
    return (
        <a onClick={() => props.addToCart(product.id, 1)} className="btn">
            Add to cart
        </a>
    )
}
AddBtn.propTypes = {
    product: PropTypes.object
}


export default connect(() => ({}), { addToCart: addToCartCreator })(AddBtn)
