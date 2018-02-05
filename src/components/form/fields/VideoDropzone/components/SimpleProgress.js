import React from 'react'
import ProgressBar from './ProgressBar'

const SimpleProgress = ({percentage}) => (
  <div className="flex items-center w-100">
    <ProgressBar percentage={percentage} />
    <div className="ml2" style={{whiteSpace: 'nowrap'}}>{`${
      percentage
    } %`}</div>
  </div>
)

export default SimpleProgress
