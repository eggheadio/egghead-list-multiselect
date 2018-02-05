import React from 'react'
import PropTypes from 'prop-types'

export const levels = ['1', '2', '3', '4', '5']

const sharedStyle = {
  wordBreak: 'break-word',
}

const Heading = ({children, level}) => (
  <div>
    {
      {
        1: (
          <h1 className={`f1 mt0 normal mb4`} style={sharedStyle}>
            {children}
          </h1>
        ),
        2: (
          <h2 className={`f2 normal mt0 mb3`} style={sharedStyle}>
            {children}
          </h2>
        ),
        3: (
          <h3 className={`f3 normal mt0 mb2`} style={sharedStyle}>
            {children}
          </h3>
        ),
        4: (
          <h4 className={`f4 normal mt0 mb2`} style={sharedStyle}>
            {children}
          </h4>
        ),
        5: (
          <h5 className="f5 bold mt0 mb2" style={sharedStyle}>
            {children}
          </h5>
        ),
      }[level]
    }
  </div>
)

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.oneOf(levels).isRequired,
}

export default Heading
