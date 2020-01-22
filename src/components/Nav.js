import React from 'react'
import { Link } from 'react-router-dom'
import 'styles/nav.css'
import CartBtn from 'components/Cart/NavBtn'
import CurrencySelect from 'components/CurrencySelect'


function Nav (props) {
    function backdrop () {
        document.removeEventListener('click', backdrop)
        while (document.toToggle && document.toToggle.length) {
            let el = document.toToggle.pop()
            el.classList.remove('active')
        }
    }

    function toggle (e) {
        e.currentTarget.classList.toggle('active')
        const state = e.currentTarget.classList.contains('active')
        if (!state)
            document.removeEventListener('click', backdrop)
        else {
            if (!document.toToggle)
                document.toToggle = []
            document.toToggle.push(e.currentTarget)
            document.addEventListener('click', backdrop)
        }
    }
    return (
        <div className="nav">
            <Link className="home" to="/">Home</Link>
            <a className="burger-btn" onClick={toggle}>
                <span/>
            </a>
            <ul className="nav-links">
                <CurrencySelect/>
                <CartBtn/>
                {(
                    props.user ?
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>:
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                )}
            </ul>
        </div>
    )
}

export default Nav
