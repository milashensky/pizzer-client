export const CART_UPDATE = 'CART_UPDATE'
export const CART_ADD = 'CART_ADD'

export const updateCart = (products) => ({type: CART_UPDATE, products})
export const addToCart = (productId, quantity) => ({type: CART_ADD, productId, quantity})

function cleanProducts (products) {
    // delete empty
    return products.filter(item => item[1])
}

export function loadSavedProducts () {
    // in: [[product_id, quantity], ...]
    let products = []
    try {
        products = JSON.parse(localStorage.getItem('cart') || '[]')
    } catch (e) {
        console.error('ERROR LOADING CART', e)
    }
    return cleanProducts(products)
}

export function saveProducts (products) {
    // in: [[product_id, quantity], ...]
    localStorage.setItem('cart', JSON.stringify(products))
}


export const loadCreator = () => {
    return dispatch => {
        dispatch(updateCart(loadSavedProducts()))
    }
}


export const updateCreator = (products) => {
    return dispatch => {
        dispatch(updateCart(products))
    }
}


export const addToCartCreator = (productId, quantity) => {
    return dispatch => {
        dispatch(addToCart(productId, quantity))
    }
}


export default function cartReducer(state = {products: [], updated: 0}, action) {
    let products = []
    switch (action.type) {
    case CART_UPDATE:
        products = cleanProducts(action.products)
        saveProducts(products)
        return {
            ...state,
            updated: Date.now(),
            products
        }
    case CART_ADD:
        products = state.products
        if (!state.products.find(x => x[0] == action.productId))
            products.push([action.productId, action.quantity])
        else
            products.map(x => {
                if (action.productId == x[0])
                    x[1] += action.quantity
                return x
            })
        saveProducts(products)
        return {
            ...state,
            updated: Date.now(),
            products
        }
    }
    return state
}
