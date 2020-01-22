import React from 'react'
import { connect } from 'react-redux'
import { updateCurrencyCreator as updateCurrency } from '@/redux/contextReducers'
import 'styles/currency-select.css'


function CurrencySelect (props) {
    let selectedCurrency = props.currencies.find(x => x.pk == props.currency)
    if (!selectedCurrency)
        selectedCurrency = {symbol: '$'}
    function setCurrency (currency) {
        props.updateCurrency({currency: currency.pk, id: props.userId})
    }
    return (
        <li className="currency-select">
            <a>{selectedCurrency.symbol}</a>
            <ul>
                {
                    props.currencies.map(currency => (
                        <li onClick={() => setCurrency(currency)} key={currency.pk}>
                            <a>{currency.symbol}</a>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}


const mapStateToProps = (state) => ({
    userId: state.context.id,
    currencies: state.context.currencies,
    currency: state.context.currency
})
export default connect (mapStateToProps, {updateCurrency})(CurrencySelect)
