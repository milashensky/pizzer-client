import resource from '@/resources'
import { fetchContext } from '@/redux/contextReducers'


export const PROFILE_UPDATED = 'PROFILE_UPDATED'
export const ADDRESS_UPDATED = 'ADDRESS_UPDATED'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const MODAL_TOGGLED = 'MODAL_TOGGLED'

export const updateProfile = (profile) => ({type: PROFILE_UPDATED, profile})
export const updateAddress = (address) => ({type: ADDRESS_UPDATED, address})
export const updateError = (updating, errors) => ({type: UPDATE_ERROR, updating, errors})
export const modalToggled = (state) => ({type: MODAL_TOGGLED, state})


export const toggleModal = (state) => {
    return dispatch => {
        dispatch(modalToggled(state))
    }
}


export const getProfileThunkCreator = () => {
    return dispatch => {
        resource.Customer.get().then(resp => dispatch(updateProfile(resp.data)))
    }
}
export const updateProfileThunkCreator = (data) => {
    return dispatch => {
        resource.Customer.put(data).then(resp => {
            if (resp.data.status) {
                alert('Success!')
                dispatch(updateProfile(data))
            } else
                dispatch(updateError('profile', resp.data.errors))
        })
    }
}


export const getAddressThunkCreator = () => {
    return dispatch => {
        resource.Address.get().then(resp => dispatch(updateAddress(resp.data)))
    }
}
export const updateAddressThunkCreator = (data) => {
    return dispatch => {
        resource.Address.put(data).then(resp => {
            if (resp.data.status) {
                alert('Success!')
                dispatch(updateAddress(data))
            } else
                dispatch(updateError('address', resp.data.errors))
        })
    }
}


export const updatePasswordThunkCreator = (data) => {
    return dispatch => {
        resource.Customer.patch(data).then(resp => {
            if (resp.data.state) {
                alert('Success!')
                dispatch(modalToggled(false))
                fetchContext(dispatch)
            } else
                dispatch(updateError('password', resp.data.errors))
        })
    }
}


export default function profileReducer(state = {profile: {}, address: {}, errors: {}, modal: false}, action) {
    switch (action.type) {
    case MODAL_TOGGLED:
        return {
            ...state,
            modal: action.state
        }
    case PROFILE_UPDATED:
        return {
            ...state,
            profile: action.profile
        }
    case ADDRESS_UPDATED:
        return {
            ...state,
            address: action.address
        }
    case UPDATE_ERROR:
        return {
            ...state,
            errors: {
                ...state.errors,
                [action.updating]: action.errors
            }
        }
    }
    return state
}
