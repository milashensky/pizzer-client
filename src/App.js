import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { getProductsThunkCreator } from '@/redux/productsReducers'
import { getContextThunkCreator, getCurrenciesThunkCreator } from '@/redux/contextReducers'
import { loadCreator as loadCartCreator } from '@/redux/cartReducers'

import Layout from 'pages/Layout'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import NotFound from 'pages/NotFound'
import Loader from 'components/Loader'


class App extends Component {
    componentDidMount () {
        this.props.fetchProducts()
        this.props.getContext()
        this.props.loadCart()
        this.props.fetchCurrencies()
    }
    render () {
        return (
            <Router>
                <div className="App">
                    {
                        this.props.fetched && this.props.currencies && this.props.currencies.length ?
                            <Switch>
                                <Route path="/login" exact
                                    render={props => !this.props.user_id ?
                                        <Login/>
                                        :<Redirect to={{pathname: '/', state: {nextPathname: props.location.pathname}}}/>}
                                />
                                <Route path="/logout" exact
                                    render={props => this.props.user_id ?
                                        <Logout/>
                                        :<Redirect to={{pathname: '/', state: {nextPathname: props.location.pathname}}}/>}
                                />
                                <Route path="/">
                                    <Layout user={this.props.user_id}/>
                                </Route>
                                <Route path="*" exact>
                                    <NotFound/>
                                </Route>
                            </Switch>
                            :
                            <Loader/>
                    }
                </div>
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
