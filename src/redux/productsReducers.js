import resource from '@/resources'


export const PRODUCTS_UPDATE = 'PRODUCTS_UPDATED'
export const SELECTED_PRODUCT_UPDATE = 'SELECTED_PRODUCT_UPDATED'

export const updateProduct = (product) => ({type: SELECTED_PRODUCT_UPDATE, product})
export const updateProducts = (products) => ({type: PRODUCTS_UPDATE, products})


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


export default function productReducer(state = {products: []}, action) {
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
    }
    return state
}
