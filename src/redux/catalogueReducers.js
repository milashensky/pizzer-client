import resource from '@/resources'


export const PRODUCTS_UPDATE = 'PRODUCTS_UPDATED'

export const updateProduct = (product) => ({type: SELECTED_PRODUCT_UPDATE, product})


export const getProductsThunkCreator = (data) => {
    return dispatch => {
        resource.Product.get(data).then(resp => {
            dispatch(updateProducts(resp.data))
        })
    }
}


export default function contextReducer(state = {products: []}, action) {
    switch (action.type) {
    case PRODUCTS_UPDATE:
        return {
            ...state,
            products: action.products
        }
    return state
}
