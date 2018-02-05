import React from 'react'
import PropTypes from 'prop-types'
import GrayArrow from 'icons/GraySolidCircleArrowIcon'

const ExpandHideToggle = props => {
  let img = null
  let direction = null

  if (props.expanded) {
    direction = 'down'
  } else if (props.hover) {
    direction = 'right'
  }

  if (direction) {
    img = <GrayArrow direction={direction} />
  }

  return img
}

ExpandHideToggle.propTypes = {
  expanded: PropTypes.bool,
  hover: PropTypes.bool,
}

export default ExpandHideToggle
