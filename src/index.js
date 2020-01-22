import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import reduxStore from '@/redux'
import './styles/index.css'
import 'styles/forms.css'


window.currencies = JSON.parse('[{"pk": 978, "code": "EUR", "name": "Euro", "symbol": "\u20ac", "rate": 1.11, "precision": 100}, {"pk": 643, "code": "RUB", "name": "Russian Ruble", "symbol": "\u20bd", "rate": 0.016, "precision": 100}, {"pk": 840, "code": "USD", "name": "US Dollar", "symbol": "$", "rate": 1.0, "precision": 100}]')
ReactDOM.render(
    <Provider store={reduxStore}>
        <App />
    </Provider>,
    document.getElementById('app')
)
