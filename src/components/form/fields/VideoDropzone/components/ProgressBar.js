import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({percentage}) => (
  <div
    className="bg-gray-secondary br-pill flex-grow-1 w-50 mh2"
    style={{
      height: '8px',
    }}
  >
    <div
      className="bg-orange br-pill"
      style={{height: '8px', width: `${percentage}%`}}
    />
  </div>
)

ProgressBar.propTypes = {
  percentage: PropTypes.number,
}

export default ProgressBar
