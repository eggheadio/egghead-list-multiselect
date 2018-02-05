import React from 'react'
import PropTypes from 'prop-types'
import Dots from 'components/Loading/Dots'

const Placeholder = ({minHeight}) => {
  return (
    <div className={`w-100 br2`} style={{minHeight: minHeight}}>
      <Dots />
    </div>
  )
}
Placeholder.propTypes = {
  minHeight: PropTypes.string,
}

export default Placeholder
