import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/fp'

const SvgIcon = ({
  className,
  children,
  title,
  height,
  width,
  viewBoxMinWidth,
  viewBoxMinHeight,
  viewBoxWidth,
  viewBoxHeight,
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    viewBox={`${viewBoxMinWidth} ${viewBoxMinHeight} ${viewBoxWidth} ${viewBoxHeight}`}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={`${title}-title`}
  >
    <title id={`${title}-title`}>{title}</title>
    {children}
  </svg>
)

export const propTypes = {
  title: PropTypes.string.isRequired,
  viewBoxMinWidth: PropTypes.number,
  viewBoxMinHeight: PropTypes.number,
  viewBoxWidth: PropTypes.number.isRequired,
  viewBoxHeight: PropTypes.number.isRequired,
}

SvgIcon.propTypes = _.merge(propTypes, {children: PropTypes.node.isRequired})

SvgIcon.defaultProps = {
  viewBoxMinWidth: 0,
  viewBoxMinHeight: 0,
}

export default SvgIcon
