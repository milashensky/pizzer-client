import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CardContent from 'components/Products/CardContent'
import 'styles/product-list-card.css'


export default function Card (props) {
    return (
        <Link to={`/products/${props.product.slug}`} className="card">
            <CardContent product={props.product}/>
        </Link>
    )
}

Card.propTypes = {
    product: PropTypes.object
}
