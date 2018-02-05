import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'

const Error = ({children}) => (
  <div className="red b flex items-center">
    <div>
      <Icon type="warning" color="red" size="4" />
    </div>
    <span className="pl2">{children}</span>
  </div>
)

Error.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Error
