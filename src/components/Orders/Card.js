import React from 'react'
import { buildNiceDateTime } from '@/utils/time'
import { buildPriceCurrency, convertPriceTo } from '@/utils/price'
import 'styles/order-card.css'


export default function Card (props) {
    return (
        <div className="order-item">
            <div clas="order-id">
                <h5>ID:</h5>
                {props.id}
            </div>
            <div className="ordered-at">
                <h5>At:</h5>
                {buildNiceDateTime(props.created_at)}
            </div>
            <div className="order-products">
                <h5>Producs:</h5>
                <div>
                    {
                        props.products_data.map(product =>
                            <div key={product.id}>
                                <p>{product.name}</p>
                                <p className="price">{product.quantity} x {buildPriceCurrency(convertPriceTo(product.price, product.currency, props.currency), props.currency)}</p>
                            </div>
                        )
                    }
                    <p className="subtotal">Subtotal: {buildPriceCurrency(props.products_price, props.currency)}</p>
                    <p className="delivery-price">Delivery: {buildPriceCurrency(props.total_price - props.products_price, props.currency)}</p>
                    <p className="total-price">Total: {buildPriceCurrency(props.total_price, props.currency)}</p>
                </div>
            </div>
            <div className="order-delivery">
                <h5>Delivery to:</h5>
                <div>
                    {props.delivery_data.address}, house {props.delivery_data.home}, app # {props.delivery_data.appartaments}
                </div>
            </div>
            <div className="order-contacts">
                <h5>Contacts:</h5>
                <div>
                    <p>Name: {props.customer_data.name}</p>
                    <p>Email: {props.customer_data.email}</p>
                    <p>Phone: {props.customer_data.phone}</p>
                </div>
            </div>
        </div>
    )
}
