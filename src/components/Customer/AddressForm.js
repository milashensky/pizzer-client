import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAddressThunkCreator } from '@/redux/profileReducers'


let user = null
function Form (props) {
    if (user != props.user) {
        user = props.user
        props.getAddress()
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div className="form-group">
                <input placeholder="Enter your address" name="address" type="text" className={props.errors.address ? 'invalid' : ''} defaultValue={props.address.address}/>
                {props.errors.address}
            </div>
            <div className="inline">
                <div className="form-group">
                    <input placeholder="House" name="house" type="text" className={props.errors.house ? 'invalid' : ''} defaultValue={props.address.house}/>
                    {props.errors.house}
                </div>
                <div className="form-group">
                    <input placeholder="Apt #" name="appartaments" type="text" className={props.errors.appartaments ? 'invalid' : ''} defaultValue={props.address.appartaments}/>
                    {props.errors.appartaments}
                </div>
            </div>
        </div>
    )
}
Form.propTypes = {
    title: PropTypes.string,
    errors: PropTypes.object
}


const mapStoreToProps = (state) => ({
    address: state.profile.address,
    user: state.context.id
})
export default connect (mapStoreToProps, {getAddress: getAddressThunkCreator})(Form)
