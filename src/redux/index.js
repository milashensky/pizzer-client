import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import context from './contextReducers'
import products from './productsReducers'


const store = createStore(
    combineReducers({
        context,
        products
    }),
    applyMiddleware(thunkMiddleware),
)


export default store
