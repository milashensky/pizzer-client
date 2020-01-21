import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import context from './contextReducers'
import cart from './cartReducers'
import products from './productsReducers'


const store = createStore(
    combineReducers({
        context,
        cart,
        products
    }),
    applyMiddleware(thunkMiddleware),
)


export default store
