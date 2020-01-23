import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { getProductsThunkCreator } from '@/redux/productsReducers'
import { getContextThunkCreator, getCurrenciesThunkCreator } from '@/redux/contextReducers'
import { loadCreator as loadCartCreator } from '@/redux/cartReducers'

import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Products from 'pages/Products'
import Product from 'pages/Products/Product'
import Checkout from 'pages/Checkout'
import Profile from 'pages/Profile'
import PasswordSettings from 'pages/Profile/PasswordSettings'
import Orders from 'pages/Profile/Orders'
import Loader from 'components/Loader'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import About from 'pages/About'


class App extends Component {
    componentDidMount () {
        this.props.fetchProducts()
        this.props.getContext()
        this.props.loadCart()
        this.props.fetchCurrencies()
    }
    render () {
        const props = this.props
        return (
            <Router onUpdate={() => window.scrollTo(0, 0)}>
                {
                    props.fetched && props.currencies && props.currencies.length ?
                        <div className="layout">
                            <Nav user={props.user_id}/>
                            <Switch>
                                <Route path="/" exact>
                                    <Products/>
                                </Route>
                                <Route path="/products/:slug" exact>
                                    <Product/>
                                </Route>
                                <Route path="/cart" exact>
                                    <Checkout/>
                                </Route>
                                <Route path="/about" exact>
                                    <About/>
                                </Route>
                                <Route path="/profile" exact
                                    render={ () => props.user_id ?
                                        <Profile/>
                                        :<Redirect to={{pathname: '/', }}/>}
                                />
                                <Route path="/profile/password" exact
                                    render={ () => props.user_id ?
                                        <PasswordSettings/>
                                        :<Redirect to={{pathname: '/', }}/>}
                                />
                                <Route path="/orders" exact
                                    render={ () => props.user_id ?
                                        <Orders/>
                                        :<Redirect to={{pathname: '/', }}/>}
                                />
                                <Route path="/login" exact
                                    render={() => !props.user_id ?
                                        <Login/>
                                        :<Redirect to={{pathname: '/'}}/>}
                                />
                                <Route path="/logout" exact
                                    render={() => props.user_id ?
                                        <Logout/>
                                        :<Redirect to={{pathname: '/'}}/>}
                                />
                                <Redirect from='*' to='/' />
                            </Switch>
                        </div>
                        :
                        <Loader/>
                }
                <Footer user={props.user_id}/>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_id: state.context.id,
        currencies: state.context.currencies,
        fetched: state.context.status
    }
}
export default connect(mapStateToProps, {getContext: getContextThunkCreator, loadCart: loadCartCreator, fetchProducts: getProductsThunkCreator, fetchCurrencies: getCurrenciesThunkCreator})(App)
