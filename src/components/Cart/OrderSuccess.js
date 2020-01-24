import React from 'react'
import { Link } from 'react-router-dom'


export default function OrderSuccess () {
    return (
        <div className="fullandcenter" style={{flexFlow: 'column'}}>
            <h3>Success!</h3>
            <h4>Soon you will eat tasty imaginary food!</h4>
            <h4>You can see all your orders</h4>
            <Link className="btn" to="/orders">Here</Link>
        </div>
    )
}
