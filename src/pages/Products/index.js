import React from 'react'
import { connect } from 'react-redux'
import { getProductsThunkCreator } from '@/redux/productsReducers'
import Card from 'components/Products/ListCard'


class Products extends React.Component {
    componentDidMount () {
        this.props.fetch()
    }
    render () {
        const products = this.props.products || []
        return (
            <div>
                {products.map((product) =>
                    <Card product={product} key={product.id}/>
                )}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    products: state.products.products,
})

export default connect(mapStateToProps, {fetch: getProductsThunkCreator})(Products)
