import React from 'react'
import 'styles/loader.css'
import pizza from '@/images/pizza.svg'


export default function Loader() {
    return (
        <div className="fullandcenter">
            <div className="loader">
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
                <div style={{backgroundImage: `url(${pizza})`}}/>
            </div>
        </div>
    )
}
