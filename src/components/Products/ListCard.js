import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { buildProductPrice } from '@/utils/price'
import 'styles/product-list-card.css'


function Card (props) {
    const product = props.product
    return (
        <Link to={`/products/${product.slug}`} className="card">
            <div className="preview" style={{ backgroundImage: `url(/resize/500x400/${product.preview})` }}/>
            <div className="description">
                <p>{product.name}</p>
                <p>{buildProductPrice(product)}</p>
            </div>
        </Link>
    )
}

Card.propTypes = {
    product: PropTypes.object
}


const mapStateToProps = (state) => ({
    currency: state.context.currency
})
export default connect(mapStateToProps)(Card)
