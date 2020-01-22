import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import PasswordForm from 'components/Customer/PasswordForm'
import { toggleModal } from '@/redux/profileReducers'
import 'styles/modal.css'


function Form (props) {
    function close () {
        document.body.classList.add('closing')
        setTimeout(() => {
            document.body.classList.remove('closing')
            props.toggleModal(false)
        }, 100)
    }
    return (
        <div className={props.className}>
            <a className="btn d-flex" onClick={() => props.toggleModal(true)}>Set password</a>
            <ReactModal isOpen={props.modal}
                onRequestClose={close}
                appElement={document.querySelector('#app')}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                className="modal"
                overlayClassName="modal-overlay">
                <PasswordForm closeFunc={close}/>
            </ReactModal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    modal: state.profile.modal
})
export default connect (mapStateToProps, { toggleModal })(Form)
