import React from 'react'
import { connect } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import Card from 'components/Products/ListCard'
import Categories from 'components/Products/Categories'
import ModalCard from 'components/Products/ModalCard'
import pizza1 from '@/images/pizza1.jpg'
import pizza2 from '@/images/pizza2.jpg'
import pizza3 from '@/images/pizza3.jpg'
import 'styles/products.css'
import 'styles/products-container.css'
import 'styles/carousel.css'


function Products (props) {
    const options = {
        showArrows: false,
        showStatus: false,
        showThumbs: false,
        autoPlay: true,
        interval: 7000,
        infiniteLoop: true,
        dynamicHeight: false
    }
    let products = props.products || []
    if (props.category)
        products = products.filter(x => x.category == props.category)
    return (
        <div className="products-page">
            <div className="presentation">
                <Carousel {...options}>
                    <div className="slide-1">
                        <img src={pizza2}/>
                        <div className="slide-description">
                            <h3>you cannot buy happiness, they say</h3>
                            <h2>but we have pizza</h2>
                            <h1>checkmate</h1>
                        </div>
                    </div>
                    <div className="slide-2">
                        <img src={pizza1}/>
                        <div className="slide-description">
                            <h3>our pizza is so tasteful because </h3>
                            <h2>in each one we leave a piece of </h2>
                            <h1>ourselves</h1>
                        </div>
                    </div>
                    <div className="slide-3">
                        <img src={pizza3}/>
                        <div className="slide-description">
                            <h2>the clocks are ticking</h2>
                            <h3>there is no better time</h3>
                            <h1><a href="#products">order now</a></h1>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className="products-container" id="products">
                <Categories/>
                {products.map((product) =>
                    document.body.clientWidth < 900 ?
                        <Card product={product} key={product.id}/>
                        :<ModalCard product={product} key={product.id}/>
                )}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    products: state.products.products,
    category: state.products.category
})

export default connect(mapStateToProps, {})(Products)
