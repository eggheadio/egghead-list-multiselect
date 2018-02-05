import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon, {propTypes} from 'components/SvgIcon'
import cn from 'classnames'
import css from './index.scss'

const CheckWatchedIcon = ({direction, className, ...otherProps}) => (
  <SvgIcon className={cn(css.checkWatchedIcon, className)} {...otherProps}>
    <path d="M0,10 C0,4.4771525 4.47593818,0 10,0 L10,0 C15.5228475,0 20,4.47593818 20,10 L20,10 C20,15.5228475 15.5240618,20 10,20 L10,20 C4.4771525,20 0,15.5240618 0,10 L0,10 Z" />
    <polygon
      fill="#FFFFFF"
      points="14.1985738 5.54876706 15.7129595 7.03859052 8.17794207 14.4513959 4.28575799 10.6223399 5.80851376 9.13483208 8.17810767 11.465993"
    />
  </SvgIcon>
)

CheckWatchedIcon.propTypes = {
  ...propTypes,
  className: PropTypes.string,
}

CheckWatchedIcon.defaultProps = {
  title: 'CheckWatchedIcon',
  viewBoxWidth: 20,
  viewBoxHeight: 20,
  width: 20,
  height: 20,
}

export default CheckWatchedIcon
