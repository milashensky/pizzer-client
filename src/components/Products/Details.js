import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProductsThunkCreator } from '@/redux/productsReducers'

import { Carousel } from 'react-responsive-carousel'
import { buildProductPrice } from '@/utils/price'
import Loader from 'components/Loader'
import AddToCart from 'components/Cart/AddBtn'

import 'styles/product-details.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


class Details extends React.Component {
    componentDidMount () {
        if (!this.props.product || this.props.product.slug !== this.props.slug)
            this.props.fetch({slug: this.props.slug})
    }
    render () {
        const product = this.props.product
        const options = {
            showArrows: false,
            showStatus: false,
            showThumbs: false,
            autoPlay: true,
            dynamicHeight: false
        }
        if (!product || product.slug != this.props.slug)
            return (<Loader/>)
        return (
            <div className="product-details">
                <div className="preview">
                    <Carousel {...options}>
                        {
                            product.photos.map(photo =>
                                <div key={photo.id}>
                                    <img src={`/media/${photo.url}`}/>
                                </div>
                            )
                        }
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
}
Details.propTypes = {
    slug: PropTypes.string
}


const mapStateToProps = (state) => ({
    product: state.products.product,
    currency: state.context.currency
})
export default connect(mapStateToProps, {fetch: getProductsThunkCreator})(Details)
