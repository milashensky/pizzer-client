import resource from '@/resources'


export const ORDER_ERROR = 'ORDER_ERROR'
export const ORDER_CREATED = 'ORDER_CREATED'
export const ORDER_CLEAR = 'ORDER_CLEAR'

export const orderError = (errors) => ({type: ORDER_ERROR, errors})
export const createOrder = (id) => ({type: ORDER_CREATED, id})
export const clearOrder = () => ({type: ORDER_CLEAR})


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


export default function orderReducer(state = {errors: {}, status: false}, action) {
    switch (action.type) {
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
