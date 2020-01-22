import React from 'react'
import { connect } from 'react-redux'
import Modal from 'components/Modal'
import PasswordForm from 'components/Customer/PasswordForm'
import { toggleModal } from '@/redux/profileReducers'
import 'styles/modal.css'


function Form (props) {
    function close () {
        props.toggleModal(false)
    }
    return (
        <div className={props.className}>
            <a className="btn d-flex" onClick={() => props.toggleModal(true)}>Set password</a>
            <Modal isOpen={props.modal} close={close}>
                <PasswordForm/>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    modal: state.profile.modal
})
export default connect (mapStateToProps, { toggleModal })(Form)
