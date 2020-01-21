import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Nav from 'components/Nav'
import Products from 'pages/Products'
import Product from 'pages/Products/Product'

function Layout (props) {
    return (
        <div className="home">
            <Nav user={props.user}/>
            <Switch>
                <Route path="/" exact>
                    <Products/>
                </Route>
                <Route path="/products/:slug">
                    <Product/>
                </Route>
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}

export default Layout
