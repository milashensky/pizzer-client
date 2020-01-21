import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Details from 'components/Products/Details'



export default function Product() {
    let route = useRouteMatch()
    return (
        <div>
            <Details slug={route.params.slug}/>
        </div>
    )
}
