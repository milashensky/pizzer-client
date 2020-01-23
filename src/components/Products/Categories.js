import React from 'react'
import { connect } from 'react-redux'
import { getCategoriesThunkCreator, setCategoryCreator } from '@/redux/productsReducers'
import image from '@/images/pizza1.jpg'
import 'styles/categories.css'


class Categories extends React.Component {
    componentDidMount () {
        this.props.fetchCategories()
    }
    render () {
        const props = this.props
        return (
            <ul className="categories">
                <li onClick={() => props.setCategory(0)} key={0} className={!props.category ? 'active': ''}>
                    <div className="category-logo" style={{backgroundImage: `url(${image})`}}/>
                    <h3>All</h3>
                </li>
                {
                    props.categories.map(category => (
                        <li onClick={() => props.setCategory(category.id)} key={category.id} className={category.id == props.category ? 'active': ''}>
                            <div className="category-logo" style={{backgroundImage: `url(/media/${category.logo})`}}/>
                            <h3>{category.name}</h3>
                        </li>
                    ))
                }
            </ul>
        )
    }
}


const mapStoreToProps = (state) => ({
    categories: state.products.categories,
    category: state.products.category
})
export default connect (mapStoreToProps, {fetchCategories: getCategoriesThunkCreator, setCategory: setCategoryCreator})(Categories)
