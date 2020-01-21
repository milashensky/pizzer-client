import resource from '@/resources'

export const IS_CONTEXT_FETCHING = 'IS_CONTEXT_FETCHING'
export const CONTEXT_UPDATED = 'CONTEXT_UPDATED'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const toggleContextFetch = (status) => ({type: IS_CONTEXT_FETCHING, fetching: status})
export const updateContext = (data) => ({type: CONTEXT_UPDATED, data})
export const loginError = (errors) => ({type: LOGIN_FAIL, errors})


function fetchContext (dispatch) {
    resource.Context.get().then(resp => {
        dispatch(updateContext(resp.data))
    }).catch(() => {
        dispatch(toggleContextFetch(false))
    })
}

export const getContextThunkCreator = () => {
    return (dispatch) => {
        dispatch(toggleContextFetch(true))
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


export default function contextReducer(state = {status: 0, id: null}, action) {
    switch (action.type) {
    case IS_CONTEXT_FETCHING:
        return {
            ...state,
            status: action.fetching ? 0: 1
        }
    case CONTEXT_UPDATED:
        return {
            status: 1,
            ...action,
            id: action.data && action.data.id
        }
    case LOGIN_FAIL:
        return {
            ...state,
            status: 1,
            errors: action.errors
        }
    }
    return state
}
