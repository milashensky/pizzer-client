import React from 'react'
import PropTypes from 'prop-types'
import 'styles/pagination.css'


const MAX_PADDING = 2

export default function Pagination (props) {
    const pages = Math.ceil(props.total / props.perPage)
    let pagesBefore = []
    let pagesAfter = []
    for (let i = 0; i < pages; i++) {
        if (i < props.page)
            pagesBefore.push(i)
        if (i > props.page)
            pagesAfter.push(i)
    }
    let children = []
    function buildChildLink (i, handler) {
        if (i === undefined) return
        let ops = {
            className: 'link',
            key: `pgl-${i}`
        }
        if (i === props.page)
            ops.className = 'link active'
        if (handler)
            ops.onClick = () => handler(i)
        children.push(<a {...ops}>{i + 1}</a>)
    }
    buildChildLink(pagesBefore.shift(), props.setPage)
    if (pagesBefore.length > MAX_PADDING)
        children.push(<div className='dots' key="dots-b">...</div>)
    pagesBefore.reverse().slice(0, MAX_PADDING).reverse().forEach(i => {
        buildChildLink(i, props.setPage)
    })
    buildChildLink(props.page)
    pagesAfter.splice(0, MAX_PADDING).forEach(i => {
        buildChildLink(i, props.setPage)
    })
    if (pagesAfter.length > MAX_PADDING)
        children.push(<div className='dots' key="dots-a">...</div>)
    buildChildLink(pagesAfter.pop(), props.setPage)
    let current = props.page * props.perPage + 1
    let upper = current + props.perPage - 1
    if (current > props.total)
        current = props.total
    if (upper > props.total)
        upper = props.total
    children.push(<div className='info' key="info">Showed {current} - {upper} of {props.total}</div>)
    return (
        <div className="pagination">
            {children}
        </div>
    )
}
Pagination.propTypes = {
    total: PropTypes.number,
    page: PropTypes.number,
    perPage: PropTypes.number,
    setPage: PropTypes.func
}
