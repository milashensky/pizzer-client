import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Brand from 'components/Brand'
import Login from 'pages/Login'
import Modal from 'components/Modal'
import 'styles/footer.css'


export default function Footer (props) {
    let [modal, setModal] = useState(false)
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
        <div className="footer">
            <Brand/>
            <ul>
                <Link to="/about">
                    About
                </Link>
                {links}
            </ul>
            <p>Copyright (c) 20200 Alexandr Milashensky All Rights Reserved.</p>
        </div>
    )
}
