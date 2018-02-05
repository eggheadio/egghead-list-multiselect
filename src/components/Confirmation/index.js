import React from 'react'
import PropTypes from 'prop-types'
import {confirmable} from 'react-confirm'
import Modal from './components/Modal'
import Button from 'components/Button'

export default confirmable(
  ({
    okLabel = 'OK',
    okColor = 'green',
    cancelLabel = 'Cancel',
    title,
    confirmation,
    show,
    proceed,
    dismiss,
    cancel,
    url,
    enableEscape = true,
  }) => {
    return (
      <div>
        <Modal isOpen={show} closeModal={dismiss} contentLabel="Modal">
          <div className="flex flex-column h-100">
            <div className="tc mb5">{title ? title : null}</div>
            <div className="mb5 tc">{confirmation}</div>
            <div className="flex justify-around mb3">
              <Button color="dark-gray-secondary" outline onClick={cancel}>
                {cancelLabel}
              </Button>
              {url && !proceed ? (
                <Button color={okColor}>
                  <a href={url} className="no-underline white">
                    {okLabel}
                  </a>
                </Button>
              ) : (
                <Button color={okColor} onClick={proceed}>
                  {okLabel}
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    )
  },
)
