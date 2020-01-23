import axios from 'axios'
import {getCookie} from '@/utils/cookie'

const apiUrl = window.apiUrl || '/api/'
const updateCSRF = () => {
    axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken')
}

export default {
    Context: {
        get() {
            return axios.get(apiUrl + 'common/context/')
        },
        patch(data) {
            updateCSRF()
            return axios.patch(apiUrl + 'common/context/', data).catch(() => alert('Error occured, try again!'))
        }
    },
    Login: {
        post(data) {
            updateCSRF()
            return axios.post(apiUrl + 'common/login/', data)
        }
    },
    Logout: {
        post(data) {
            updateCSRF()
            return axios.post(apiUrl + 'common/logout/', data)
        }
    },
    Registration: {
        post(data) {
            updateCSRF()
            return axios.post(apiUrl + 'common/registration/', data).catch(() => alert('Error occured, try again!'))
        }
    },
    Product: {
        get(data) {
            const slug = data && data.slug
                ? data.slug + '/'
                : ''
            return axios.get(apiUrl + 'shop/product/' + slug)
        }
    },
    Category: {
        get() {
            return axios.get(apiUrl + 'shop/category/')
        }
    },
    Customer: {
        get() {
            return axios.get(apiUrl + 'common/customer/')
        },
        put(data) {
            updateCSRF()
            return axios.put(apiUrl + 'common/customer/', data).catch(() => alert('Error occured, try again!'))
        },
        patch(data) {
            updateCSRF()
            return axios.patch(apiUrl + 'common/customer/', data).catch(() => alert('Error occured, try again!'))
        }
    },
    Order: {
        get(data) {
            return axios.get(apiUrl + 'shop/order/', {params: data})
        },
        post(data) {
            updateCSRF()
            return axios.post(apiUrl + 'shop/order/', data).catch(() => alert('Error occured, try again!'))
        }
    },
    Currency: {
        get() {
            return axios.get(apiUrl + 'catalogue/currency/')
        }
    },
    Address: {
        get() {
            return axios.get(apiUrl + 'common/address/')
        },
        put(data) {
            updateCSRF()
            return axios.put(apiUrl + 'common/address/', data).catch(() => alert('Error occured, try again!'))
        }
    }
}
