import resource from '@/resources'

export const DEFAULT_CURRENCY_ID = 840
export const IS_CONTEXT_FETCHING = 'IS_CONTEXT_FETCHING'
export const CONTEXT_UPDATED = 'CONTEXT_UPDATED'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const CURRENCY_FETCHED = 'CURRENCY_FETCHED'

export const updateContext = (data) => ({type: CONTEXT_UPDATED, data})
export const loginError = (errors) => ({type: LOGIN_FAIL, errors})
export const updateCurrency = (currencies) => ({type: CURRENCY_FETCHED, currencies})


function fetchContext (dispatch) {
    resource.Context.get().then(resp => {
        dispatch(updateContext(resp.data))
    })
}

export const getContextThunkCreator = () => {
    return (dispatch) => {
        fetchContext(dispatch)
    }
}

export const getLoginThunkCreator = (data) => {
    return (dispatch) => {
        resource.Login.post(data).then(resp => {
            if (resp.data.state)
                fetchContext(dispatch)
            else
                dispatch(loginError(resp.data.errors || []))
        })
    }
}

export const getLogoutThunkCreator = () => {
    return (dispatch) => {
        resource.Logout.post().then(() => {
            dispatch(updateContext({}))
        })
    }
}

export const getCurrenciesThunkCreator = () => {
    return (dispatch) => {
        resource.Currency.get().then(resp => {
            dispatch(updateCurrency(resp.data))
        })
    }
}

export const updateCurrencyCreator = (data) => {
    return (dispatch) => {
        if (data.id)
            resource.Context.patch(data).then(() => dispatch(updateContext(data)))
        else
            dispatch(updateContext(data))
    }
}


export default function contextReducer(state = {status: 0, id: null}, action) {
    let currency = DEFAULT_CURRENCY_ID
    switch (action.type) {
    case CONTEXT_UPDATED:
        currency = (action.data && action.data.currency) || localStorage.getItem('currency')
        if (!currency)
            currency = DEFAULT_CURRENCY_ID
        localStorage.setItem('currency', currency)
        return {
            ...state,
            status: 1,
            currency: currency,
            id: action.data && action.data.id
        }
    case LOGIN_FAIL:
        return {
            ...state,
            status: 1,
            errors: action.errors
        }
    case CURRENCY_FETCHED:
        window.currencies = action.currencies
        return {
            ...state,
            currencies: action.currencies,
        }
    }
    return state
}
