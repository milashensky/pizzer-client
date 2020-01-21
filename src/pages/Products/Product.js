import React from 'react'
import { connect } from 'react-redux'
import { getProductsThunkCreator } from '@/redux/productsReducers'
import { withRouter } from 'react-router-dom'
import Details from 'components/Products/Details'



class Product extends React.Component {
    componentDidMount () {
        if (!this.props.product || this.props.product.slug !== this.props.match.params.slug)
            this.props.fetch(this.props.match.params)
    }
    render() {
        return (
            <div>
                <Details product={this.props.product}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    product: state.products.product,
})

export default connect(mapStateToProps, {fetch: getProductsThunkCreator})(withRouter(Product))
