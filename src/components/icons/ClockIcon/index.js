import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon, {propTypes} from 'components/SvgIcon'
import cn from 'classnames'
import css from './index.scss'

const ClockIcon = ({className, ...otherProps}) => (
  <SvgIcon className={cn(css.clockIcon, className)} {...otherProps}>
    <path d="M8.99199976,1 C13.4160003,1 17,4.58399963 17,9 C17,13.4160003 13.4160003,17 8.99199976,17 C4.57600021,17 1,13.4160003 1,9 C1,4.58400001 4.57600021,1 8.99199976,1 Z M8.99199976,2 C5.13011936,2 2,5.13444872 2,9 C2,12.8655515 5.13011924,16 8.99199976,16 C12.8626325,16 16,12.8647977 16,9 C16,5.13520226 12.8626325,2 8.99199976,2 Z M9.5,5 L9.5,8.75024118 L13.2544333,10.9695773 L12.7455667,11.8304227 L8.5,9.32076576 L8.5,5 L9.5,5 Z" />
  </SvgIcon>
)

ClockIcon.propTypes = {
  ...propTypes,
  className: PropTypes.string,
}

ClockIcon.defaultProps = {
  title: 'ClockIcon',
  viewBoxWidth: 18,
  viewBoxHeight: 18,
}

export default ClockIcon
