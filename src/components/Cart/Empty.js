import React from 'react'
import { Link } from 'react-router-dom'


export default function Empty () {
    return (
        <div className="fullandcenter" style={{flexFlow: 'column'}}>
            <h3>Here is nothing yet!</h3>
            <h4>What are you waiting for?</h4>
            <Link className="btn" to="/">Go eat something</Link>
        </div>
    )
}
