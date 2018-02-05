import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Icon'
import css from './index.scss'

const sizes = ['small', 'large']
const backgrounds = ['dark', 'light']
const buttonsTypes = ['cta', 'navigation']

const InPageCallout = ({
  size,
  background,
  logoUrl,
  text,
  buttonType,
  buttonText,
  onDismiss,
}) => {
  const commonClasses = css.commonClasses
  const sizeClasses = size === 'small' ? css.sizeSmall : css.sizeLarge
  const backgroundClasses =
    background === 'dark' ? css.backgroundDark : css.backgroundLight
  const logo = logoUrl ? <img src={logoUrl} alt="" className="db mr3" /> : null
  const buttonCommonClasses = css.buttonCommonClasses
  const buttonBgClass =
    buttonType === 'cta'
      ? 'bg-orange hover-bg-orange-secondary'
      : 'bg-blue hover-bg-blue-secondary'
  const iconHolderClasses = css.iconHolder
  const iconHolderBorderClass =
    background === 'dark' ? css.iconHolderBorderLight : css.iconHolderBorderDark
  const iconColorClass = background === 'dark' ? 'white-70' : 'dark-gray'
  return (
    <div
      className={`
      flex
      flex-column
      flex-row-ns
      items-center
      mb3
      pl2
      pl3-ns
      pv2
      pv3-ns
      center
      br2
      ba
      relative
      ${commonClasses}
      ${sizeClasses}
      ${backgroundClasses}
    `}
    >
      <div className="flex items-center flex-grow-1">
        {logo}
        <div>{text}</div>
      </div>
      {buttonText && (
        <a
          href=""
          className={`
          br-pill
          white
          fw6
          lh-solid
          ph3
          ph4-ns
          ttu
          nowrap
          no-underline
          relative
          mt2
          mt0-ns
          ml3-ns
          self-start
          self-center-ns
          ${buttonCommonClasses}
          ${buttonBgClass}
        `}
        >
          {buttonText}
        </a>
      )}
      <button
        className="absolute right-0 top-0 h-100 bg-transparent bn"
        onClick={onDismiss}
      >
        <div
          className={`
          pointer
          flex
          justify-center
          items-center
          ${iconHolderClasses}
          ${iconHolderBorderClass}
        `}
        >
          <Icon type="cancel" color={iconColorClass} size="5" />
        </div>
      </button>
    </div>
  )
}

InPageCallout.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(sizes).isRequired,
  background: PropTypes.oneOf(backgrounds).isRequired,
  buttonType: PropTypes.oneOf(buttonsTypes).isRequired,
  buttonText: PropTypes.string,
}

export default InPageCallout
