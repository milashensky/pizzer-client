import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { buildProductPrice } from '@/utils/price'
import AddToCart from 'components/Cart/AddBtn'


function Card (props) {
    const product = props.product
    return (
        <div className="d-flex">
            <div className="preview" style={{ backgroundImage: `url(/resize/500x400/${product.preview})` }}/>
            <div className="description">
                <h4>{product.name}</h4>
                <p>{buildProductPrice(product)}</p>
                <AddToCart product={product}/>
            </div>
        </div>
    )
}

Card.propTypes = {
    product: PropTypes.object
}

const mapStateToProps = (state) => ({
    currency: state.context.currency
})
export default connect(mapStateToProps)(Card)
