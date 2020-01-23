import React from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import logo from '@/images/Logo.svg'

export default function Brand() {
    return (
        <Link className="brand" to="/">
            <ReactSVG src={logo}/>
        </Link>
    )
}
