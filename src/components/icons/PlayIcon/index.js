import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon, {propTypes} from 'components/SvgIcon'
import cn from 'classnames'
import css from './index.scss'

const PlayIcon = ({color, className, ...otherProps}) => (
  <SvgIcon
    className={cn(css.icon, css[`icon--${color}`], className)}
    {...otherProps}
  >
    <path d="M16,0 C7.16800002,0 0,7.16800002 0,16 C0,24.8320006 7.16800002,32 16,32 C24.8320006,32 32,24.8320006 32,16 C32,7.16799926 24.8320006,0 16,0 Z M13.318342,22.4271606 C12.8663842,22.7435311 12.5,22.5500512 12.5,21.9931545 L12.5,10.0068455 C12.5,9.45078007 12.867765,9.25743549 13.318342,9.57283938 L21.681658,15.4271606 C22.1336158,15.7435311 22.132235,16.2574355 21.681658,16.5728394 L13.318342,22.4271606 Z" />
  </SvgIcon>
)

PlayIcon.propTypes = {
  ...propTypes,
  className: PropTypes.string,
}

PlayIcon.defaultProps = {
  title: 'PlayIcon',
  viewBoxWidth: 32,
  viewBoxHeight: 32,
  width: 32,
  height: 32,
  color: PropTypes.oneOf(['orange', 'green', 'blue']),
}

export default PlayIcon
