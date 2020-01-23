import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from 'pages/Login'
import Modal from 'components/Modal'
import CartBtn from 'components/Cart/NavBtn'
import CurrencySelect from 'components/CurrencySelect'
import Brand from 'components/Brand'
import 'styles/nav.css'


function Nav (props) {
    let [modal, setModal] = useState(false)

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
    let links = !props.user ?
        [
            <li className="d-mobile" key='loginm'>
                <Link to="/login">Login</Link>
            </li>,
            <li className="d-desktop" key='logind'>
                <a onClick={() => setModal(true)}>Login</a>
                <Modal isOpen={!props.user && modal} close={() => setModal(false)}>
                    <Login/>
                </Modal>
            </li>
        ]
        :[
            <li key="profile">
                <Link to="/profile">Profile</Link>
            </li>,
            <li key="orders">
                <Link to="/orders">Orders</Link>
            </li>,
            <li key="logout">
                <Link to="/logout">Logout</Link>
            </li>
        ]
    return (
        <div className="nav">
            <Brand/>
            <CartBtn/>
            <a className="burger-btn" onClick={toggle}>
                <span/>
            </a>
            <ul className="nav-links">
                <CurrencySelect/>
                {links}
            </ul>
        </div>
    )
}

export default Nav
