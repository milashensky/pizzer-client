import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'components/Modal'
import Details from 'components/Products/Details'
import CardContent from 'components/Products/CardContent'
import 'styles/product-list-card.css'


export default function Card (props) {
    let [modal, setModal] = useState(false)
    return (
        <a onClick={() => setModal(true)} className="card">
            <CardContent product={props.product}/>
            <Modal isOpen={modal} close={() => setModal(false)} big={true}>
                <Details slug={props.product.slug}/>
            </Modal>
        </a>
    )
}

Card.propTypes = {
    product: PropTypes.object
}
