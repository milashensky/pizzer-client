import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getLoginThunkCreator } from '@/redux/contextReducers'


function Login (props) {
    let data = {
        email: React.createRef(),
        password: React.createRef(),
    }
    let [formErrors, setErrors] = useState([])
    let errors = [...props.errors, ...formErrors]
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = data.email.value
        const password = data.password.value
        if (!email || !password)
            setErrors(['All fields are required'])
        else {
            setErrors([])
            props.doLogin({email, password})
        }
    }
    return (
        <div className="login">
            <h4>Login</h4>
            <form onSubmit={handleSubmit}>
                { errors.map((err, i) =>
                    <p className="error" key={i}>
                        {err}
                    </p>
                )}
                <input placeholder="email" name="email" type="email" ref={(e) => data.email = e } className={ errors.length ? 'invalid' : '' }/>
                <input placeholder="password" name="password" type="password" ref={(e) => data.password = e } className={ errors.length ? 'invalid' : '' }/>
                <button>Sign in</button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    errors: state.context.errors || [],
    user: state.context.id
})

export default connect(mapStateToProps, {doLogin: getLoginThunkCreator})(Login)
