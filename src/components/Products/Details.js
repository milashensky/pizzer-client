import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'
import { buildProductPrice } from '@/utils/price'
import Loader from 'components/Loader'
import AddToCart from 'components/Products/CartAddBtn'

import 'styles/product-details.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


export default function Details (props) {
    const product = props.product
    const options = {
        showArrows: false,
        showStatus: false,
        showThumbs: false,
        autoPlay: true,
        dynamicHeight: false
    }
    if (!product)
        return (<Loader/>)
    return (
        <div className="product-details">
            <div className="preview">
                <Carousel {...options}>
                    {product.photos.map(photo =>
                        <div key={photo.id}>
                            <img src={`/media/${photo.url}`}/>
                        </div>
                    )}
                </Carousel>
            </div>
            <div className="description">
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{buildProductPrice(product)}</p>
                <AddToCart product={product}/>
            </div>
        </div>
    )
}

Details.propTypes = {
    product: PropTypes.object
}
