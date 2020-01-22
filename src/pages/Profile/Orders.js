import React from 'react'
import { connect } from 'react-redux'
import Pagination from 'components/Pagination'
import { getOrdersThunkCreator } from '@/redux/orderReducers'
import Order from 'components/Orders/Card'

const PER_PAGE = 5

class Orders extends React.Component {
    constructor () {
        super()
        this.state = {page: 0}
    }
    componentDidMount () {
        this.props.fetchOrders({page: 0, per_page: PER_PAGE})
    }
    setPage(page) {
        this.setState({...this.state, page})
        this.props.fetchOrders({page, per_page: PER_PAGE})
    }
    render () {
        const props = this.props
        return (
            <div className="main">
                <h1>Orders</h1>
                {
                    props.orders.length ?
                        <div className="my-1">
                            {
                                props.orders.map(order =>
                                    <Order {...order} key={order.id}/>
                                )
                            }
                            <div className="my-1">
                                <Pagination total={props.total} page={this.state.page} perPage={PER_PAGE} setPage={(n) => this.setPage(n)}/>
                            </div>
                        </div>
                        :<div className="my-1">
                            No orders yet.
                        </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    orders: state.order.orders,
    total: state.order.total
})
export default connect (mapStateToProps, {fetchOrders: getOrdersThunkCreator})(Orders)
