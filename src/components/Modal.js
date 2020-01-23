import React from 'react'
import ReactModal from 'react-modal'
import 'styles/modal.css'


export default function Modal (props) {
    function close () {
        document.body.classList.add('closing')
        setTimeout(() => {
            document.body.classList.remove('closing')
            props.close()
        }, 300)
    }
    return (
        <ReactModal isOpen={props.isOpen}
            onRequestClose={close}
            appElement={document.querySelector('#app')}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            className={props.big ? 'big modal' : 'modal'}
            overlayClassName="modal-overlay">
            <a onClick={close} className="close"/>
            {props.children}
        </ReactModal>
    )
}
