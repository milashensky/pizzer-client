import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCartCreator } from '@/redux/cartReducers'
import 'styles/cart-link.css'


function AddBtn (props) {
    const product = props.product
    return (
        <a onClick={() => props.addToCart(product.id, 1)}>
            Add to cart
        </a>
    )
}
AddBtn.propTypes = {
    product: PropTypes.object
}

const m = () => ({
})

export default connect(m, { addToCart: addToCartCreator })(AddBtn)
