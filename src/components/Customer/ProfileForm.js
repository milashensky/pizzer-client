import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileThunkCreator } from '@/redux/profileReducers'


let user = null
function Form (props) {
    if (user != props.user) {
        user = props.user
        props.getProfile()
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div className="form-group">
                <input placeholder="Enter your name" name="name" type="text" className={props.errors.name ? 'invalid' : ''} defaultValue={props.profile.name}/>
                {props.errors.name}
            </div>
            <div className="inline">
                <div className="form-group">
                    <input placeholder="Email" name="email" type="email" className={props.errors.email ? 'invalid' : ''} defaultValue={props.profile.email}/>
                    {props.errors.email}
                </div>
                <div className="form-group">
                    <input placeholder="Phone number" name="phone" type="text" className={props.errors.phone ? 'invalid' : ''} defaultValue={props.profile.phone}/>
                    {props.errors.phone}
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
    profile: state.profile.profile,
    user: state.context.id
})
export default connect (mapStoreToProps, {getProfile: getProfileThunkCreator})(Form)
