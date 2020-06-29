import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { ActionRouteNavigate } from '../../store/actions/actions-route'
import close from '../../assets/images/png/close.png'
import './ModalSignUp.less'

const customStyles_modal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '544px',
    height: '290px',
    borderRadius: '4px',
    border: 'solid 1px #979797',
    backgroundColor: '#ffffff'
  }
}

class ModalSignUp extends Component {
  constructor(props) {
    super(props)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  handleCloseModal() {
    this.props.close()
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          onRequestClose={this.props.close}
          contentLabel='Signup Modal'
          className='signUp_Responsive_modal'
          overlayClassName='ReactModal_Overly'
          ariaHideApp={false}>
          < img src={close} className='modalclose' onClick={this.handleCloseModal}></img>
          <div className='flex-center flex-column Signup_modal'>
            <h2 className='title'>Lets create your account</h2>
            <p>
              Please select, what account you want to sign up ?
              </p>
            <div className='choice flex-row'>
              <div className='flex-center as_user' onClick={this.props.user}>
                As user
                </div>
              <div className='flex-center as_provider' onClick={this.props.provider}>
                As Provider
                </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ModalSignUp
