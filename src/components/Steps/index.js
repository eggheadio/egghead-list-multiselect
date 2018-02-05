import React from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import StepsLine from './components/StepsLine'
import StepsContent from './components/StepsContent'

class Steps extends React.Component {
  render() {
    const {steps, selectedStep, handleSelect} = this.props

    return (
      <div
        className={css({
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto',
        })}
      >
        <StepsLine
          steps={steps}
          selectedStep={selectedStep}
          handler={handleSelect}
        />
        <StepsContent steps={steps} selectedStep={selectedStep}>
          {this.props.children}
        </StepsContent>
      </div>
    )
  }
}

export default Steps
