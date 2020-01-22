import resource from '@/resources'


export const ORDER_ERROR = 'ORDER_ERROR'
export const ORDER_CREATED = 'ORDER_CREATED'
export const ORDER_CLEAR = 'ORDER_CLEAR'
export const ORDERS_FETCHED = 'ORDERS_FETCHED'

export const orderError = (errors) => ({type: ORDER_ERROR, errors})
export const createOrder = (id) => ({type: ORDER_CREATED, id})
export const clearOrder = () => ({type: ORDER_CLEAR})
export const ordersFetched = (data) => ({type: ORDERS_FETCHED, data})


export const submitOrderThunkCreator = (data) => {
    return dispatch => {
        resource.Order.post(data).then(resp => {
            if (resp.data.state)
                dispatch(createOrder(resp.data.id))
            else
                dispatch(orderError(resp.data.errors))
        })
    }
}

export const clearOrderStatus = () => {
    return dispatch => {
        dispatch(clearOrder())
    }
}


export const getOrdersThunkCreator = (data) => {
    return dispatch => {
        resource.Order.get(data).then(resp => dispatch(ordersFetched(resp.data)))
    }
}


export default function orderReducer(state = {errors: {}, status: false, orders: [], total: 0}, action) {
    switch (action.type) {
    case ORDERS_FETCHED:
        return {
            ...state,
            orders: action.data.orders || [],
            total: action.data.total || 0
        }
    case ORDER_ERROR:
        return {
            ...state,
            errors: action.errors
        }
    case ORDER_CREATED:
        return {
            ...state,
            status: true,
            id: action.id,
            errors: {}
        }
    case ORDER_CLEAR:
        return {
            ...state,
            status: false,
            errors: {}
        }
    }
    return state
}
