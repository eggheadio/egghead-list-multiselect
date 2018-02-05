import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import customConfirm from 'lib/customConfirm'
import css from './ActionButton.scss'

class ActionButton extends React.Component {
  confirmRequest = (confirmText, options, request) => {
    customConfirm(confirmText, options).then(
      () => {
        request()
      },
      () => {
        return false
      },
    )
  }

  render() {
    const {
      label,
      icon,
      iconSize,
      color,
      url,
      execute,
      noBorder,
      borderRight,
      item,
      itemType,
      confirmText,
    } = this.props
    const buttonClasses = `dib tc h-100 dark-gray no-underline pointer hover-bg-white ${
      noBorder ? '' : `b--gray-secondary ${borderRight ? 'br' : 'bl'}`
    } ${css.actionButton}`
    const confMsg = !confirmText
      ? `Are you sure you want to ${label.toLowerCase()} "${item}"?`
      : confirmText

    const okLabel =
      label && itemType && !customConfirm ? `Yes, ${label} ${itemType}` : 'OK'

    const doConfirmOrAction = confirmText
      ? () =>
          this.confirmRequest(confMsg, {okLabel: okLabel, url: url}, execute)
      : execute

    const ButtonBody = () => (
      <div
        className="flex items-center justify-center pv3 ph4"
        key={label}
        onClick={doConfirmOrAction}
      >
        <div className="mr1">
          <Icon type={icon} color={color} size={iconSize} />
        </div>
        <span className="f6 dark-blue ml2">{label}</span>
      </div>
    )

    return (
      <a className={buttonClasses}>
        <ButtonBody />
      </a>
    )
  }
}

ActionButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string,
  execute: PropTypes.func,
  noBorder: PropTypes.bool,
  borderRight: PropTypes.bool,
  confirmText: PropTypes.string,
}

export const NewLessonButton = ({url, onClick, item = 'item', itemType}) => (
  <a
    href={url}
    className={`dib tc h-100 dark-gray no-underline pointer hover-bg-white bl b--gray-secondary ${
      css.actionButton
    }`}
  >
    <div className="flex items-center justify-center pv3 ph4">
      <div className="mr1">
        <Icon type="add" color="green" />
      </div>
      <span className="f6 dark-blue ml2">Create a New Lesson</span>
    </div>
  </a>
)

export default ActionButton
