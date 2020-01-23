import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCartCreator } from '@/redux/cartReducers'
import 'styles/cart-link.css'


function AddBtn (props) {
    const product = props.product
    function addOne (e) {
        e.stopPropagation()
        props.addToCart(product.id, 1)
    }
    return (
        <span onClick={addOne} className="btn">
            Add to cart
        </span>
    )
}
AddBtn.propTypes = {
    product: PropTypes.object
}


export default connect(() => ({}), { addToCart: addToCartCreator })(AddBtn)
