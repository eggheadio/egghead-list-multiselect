import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import SvgIcon, {propTypes} from 'components/SvgIcon'
import css from './index.scss'

const GrayArrowIcon = ({direction, className, ...otherProps}) => (
  <SvgIcon
    className={cn(css.icon, css[`icon--${direction}`], className)}
    {...otherProps}
  >
    <rect
      id="bubble"
      className={css.iconCircle}
      transform="translate(9.000000, 9.000000) rotate(-90.000000) translate(-9.000000, -9.000000) "
      x="0"
      y="0"
      width="18"
      height="18"
      rx="9"
    />
    <polygon
      id="arrow"
      fill="#FFFFFF"
      transform="translate(10.000000, 9.000000) rotate(-90.000000) translate(-10.000000, -9.000000) "
      points="6.17499987 6 10 9.70850198 13.8250001 6 15 7.14170031 10 12 5 7.14170031"
    />
  </SvgIcon>
)

GrayArrowIcon.propTypes = {
  ...propTypes,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  className: PropTypes.string,
}

GrayArrowIcon.defaultProps = {
  title: 'GrayArrowIcon',
  viewBoxWidth: 18,
  viewBoxHeight: 18,
  width: 18,
  height: 18,
}

export default GrayArrowIcon
