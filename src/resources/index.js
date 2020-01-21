import axios from 'axios'

const apiUrl = window.apiUrl || '/api/'

export default {
    Context: {
        get(data) {
            return axios.get(apiUrl + 'common/context', data)
        },
    },
    Login: {
        post(data) {
            return axios.post(apiUrl + 'common/login', data)
        }
    },
    Logout: {
        post(data) {
            return axios.post(apiUrl + 'common/logout', data)
        }
    },
    Registration: {
        post(data) {
            return axios.post(apiUrl + 'common/registration', data)
        }
    },
    Product: {
        get(data) {
            const slug = data && data.slug ? data.slug + '/' : ''
            return axios.get(apiUrl + 'shop/product/' + slug)
        },
    }
}
