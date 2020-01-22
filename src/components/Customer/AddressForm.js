import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAddressThunkCreator } from '@/redux/profileReducers'


class Form extends React.Component {
    componentDidMount () {
        this.props.getAddress()
    }
    render () {
        let errors = this.props.errors
        return (
            <div>
                <h3>{this.props.title}</h3>
                <div className="form-group">
                    <input placeholder="Enter your address" name="address" type="text" className={errors.address ? 'invalid' : ''} defaultValue={this.props.address.address}/>
                    {errors.address}
                </div>
                <div className="inline">
                    <div className="form-group">
                        <input placeholder="House" name="house" type="text" className={errors.house ? 'invalid' : ''} defaultValue={this.props.address.house}/>
                        {errors.house}
                    </div>
                    <div className="form-group">
                        <input placeholder="Apt #" name="appartaments" type="text" className={errors.appartaments ? 'invalid' : ''} defaultValue={this.props.address.appartaments}/>
                        {errors.appartaments}
                    </div>
                </div>
            </div>
        )
    }
}
Form.propTypes = {
    title: PropTypes.string,
    errors: PropTypes.object
}


const mapStoreToProps = (state) => ({
    address: state.profile.address
})
export default connect (mapStoreToProps, {getAddress: getAddressThunkCreator})(Form)
