import resource from '@/resources'


export const PRODUCTS_UPDATE = 'PRODUCTS_UPDATED'
export const SELECTED_PRODUCT_UPDATE = 'SELECTED_PRODUCT_UPDATED'
export const CATEGORY_FETCHED = 'CATEGORY_FETCHED'
export const CATEGORY_SET = 'CATEGORY_SET'

export const updateProduct = (product) => ({type: SELECTED_PRODUCT_UPDATE, product})
export const updateProducts = (products) => ({type: PRODUCTS_UPDATE, products})
export const categoriesFetched = (categories) => ({type: CATEGORY_FETCHED, categories})
export const setCategory = (category) => ({type: CATEGORY_SET, category})


export const getProductsThunkCreator = (data) => {
    return dispatch => {
        resource.Product.get(data).then(resp => {
            if (data && data.slug)
                dispatch(updateProduct(resp.data))
            else
                dispatch(updateProducts(resp.data))
        })
    }
}


export const getCategoriesThunkCreator = () => {
    return dispatch => {
        resource.Category.get().then(resp => dispatch(categoriesFetched(resp.data)))
    }
}

export const setCategoryCreator = (id)  => {
    return dispatch => {
        dispatch(setCategory(id))
    }
}



export default function productReducer(state = {products: [], categories: [], category: 0}, action) {
    switch (action.type) {
    case PRODUCTS_UPDATE:
        return {
            ...state,
            products: action.products
        }
    case SELECTED_PRODUCT_UPDATE:
        return {
            ...state,
            product: action.product
        }
    case CATEGORY_FETCHED:
        return {
            ...state,
            categories: action.categories
        }
    case CATEGORY_SET:
        return {
            ...state,
            category: action.category
        }
    }
    return state
}
