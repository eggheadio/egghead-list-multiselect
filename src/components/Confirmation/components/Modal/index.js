import React from 'react'
import Modal from 'react-modal'

export default class extends React.Component {
  componentWillMount() {
    Modal.setAppElement('body')
  }

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
      },
      overlay: {
        zIndex: 999,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(1px)',
      },
    }

    const {isOpen, contentLabel, closeModal, styles, children} = this.props

    return (
      <Modal
        isOpen={isOpen}
        contentLabel={contentLabel}
        onRequestClose={closeModal}
        style={styles ? styles : customStyles}
      >
        {children}
      </Modal>
    )
  }
}
