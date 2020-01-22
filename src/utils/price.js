import store from '@/redux'
import { DEFAULT_CURRENCY_ID } from '@/redux/contextReducers'


export function getCurrency (currencyId) {
    const state = store.getState()
    const currencies = state.context.currencies || window.currencies
    let currency = currencies.find(x => x.pk == currencyId)
    if (!currency)
        currency = currencies.find(x => x.pk == DEFAULT_CURRENCY_ID)
    return currency
}


export function getSelectedCurrency () {
    const state = store.getState()
    return getCurrency(state.context.currency)
}


export function convertPrice (price, fromCurrencyId) {
    const fromCurrency = getCurrency(fromCurrencyId)
    const toCurrency = getSelectedCurrency()
    return Math.ceil(parseInt(price) * parseFloat(fromCurrency.rate) / parseFloat(toCurrency.rate))
}


export function convertProductPrice (product) {
    return convertPrice(product.price, product.currency)
}


export function buildPrice (price) {
    const currency = getSelectedCurrency()
    return currency.symbol + price / currency.precision
}


export function buildProductPrice (product) {
    return buildPrice(convertProductPrice(product))
}


export function getDeliveryPrice(price) {
    const currency = getSelectedCurrency()
    const usdPrice = Math.ceil(price * currency.rate)
    let deliveryPrice = 0
    if (usdPrice < 2000)
        deliveryPrice = 350
    else if (usdPrice > 35000)
        deliveryPrice = 2500
    return Math.ceil(deliveryPrice / currency.rate)
}


export function buildDeliveryPrice(price) {
    const currency = getSelectedCurrency()
    const dPrice = getDeliveryPrice(price)
    if (!dPrice)
        return 'Free'
    return currency.symbol + dPrice / parseInt(currency.precision)
}
