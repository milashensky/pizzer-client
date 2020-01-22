import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import context from './contextReducers'
import cart from './cartReducers'
import order from './orderReducers'
import products from './productsReducers'
import profile from './profileReducers'


const store = createStore(
    combineReducers({
        context,
        cart,
        order,
        profile,
        products
    }),
    applyMiddleware(thunkMiddleware),
)


export default store
