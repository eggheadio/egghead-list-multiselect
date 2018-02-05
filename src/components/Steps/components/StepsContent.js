import React from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'

import colorValues from 'lib/colorValues'

class StepsContent extends React.Component {
  render() {
    const {steps, selectedStep} = this.props

    const componentToShow = steps[selectedStep - 1].component

    return (
      <div
        className={css({
          background: colorValues['gray'],
          borderRadius: '0 0 5px 5px',
          overflow: 'hidden',
        })}
      >
        {componentToShow}
      </div>
    )
  }
}

export default StepsContent
