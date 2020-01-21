import React from 'react'
import 'styles/loader.css'

export default function Loader() {
    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
