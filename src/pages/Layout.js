import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Nav from 'components/Nav'
import Products from 'pages/Products'
import Product from 'pages/Products/Product'
import Checkout from 'pages/Checkout'
import Profile from 'pages/Profile'
import PasswordSettings from 'pages/Profile/PasswordSettings'
import Orders from 'pages/Profile/Orders'


function Layout (props) {
    return (
        <div className="layout">
            <Nav user={props.user}/>
            <Switch>
                <Route path="/" exact>
                    <Products/>
                </Route>
                <Route path="/products/:slug">
                    <Product/>
                </Route>
                <Route path="/cart">
                    <Checkout/>
                </Route>
                <Route path="/profile" exact
                    render={ () => props.user ?
                        <Profile/>
                        :<Redirect to={{pathname: '/', }}/>}
                />
                <Route path="/profile/password" exact
                    render={ () => props.user ?
                        <PasswordSettings/>
                        :<Redirect to={{pathname: '/', }}/>}
                />
                <Route path="/orders" exact
                    render={ () => props.user ?
                        <Orders/>
                        :<Redirect to={{pathname: '/', }}/>}
                />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}

export default Layout
