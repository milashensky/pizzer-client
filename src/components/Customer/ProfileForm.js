import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileThunkCreator } from '@/redux/profileReducers'


class Form extends React.Component {
    componentDidMount () {
        this.props.getProfile()
    }
    render () {
        let errors = this.props.errors
        return (
            <div>
                <h3>{this.props.title}</h3>
                <div className="form-group">
                    <input placeholder="Enter your name" name="name" type="text" className={errors.name ? 'invalid' : ''} defaultValue={this.props.profile.name}/>
                    {errors.name}
                </div>
                <div className="inline">
                    <div className="form-group">
                        <input placeholder="Email" name="email" type="email" className={errors.email ? 'invalid' : ''} defaultValue={this.props.profile.email}/>
                        {errors.email}
                    </div>
                    <div className="form-group">
                        <input placeholder="Phone number" name="phone" type="text" className={errors.phone ? 'invalid' : ''} defaultValue={this.props.profile.phone}/>
                        {errors.phone}
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
    profile: state.profile.profile
})
export default connect (mapStoreToProps, {getProfile: getProfileThunkCreator})(Form)
