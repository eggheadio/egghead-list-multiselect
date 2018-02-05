import React from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'

const containerClasses = `
  bg-white 
  flex 
  flex-grow-1 
  justify-between 
  flex-column 
  black-90 
  br2 
`

const shadowStyle = css({
  boxShadow: '0 1px 3px 0 rgba(50,50,50,0.15)',
})

class Card extends React.Component {
  static propTypes = {
    overflow: PropTypes.bool,
  }

  render() {
    const containerStyle = {width: '280px'}
    const {overflow} = this.props
    return (
      <div
        {...shadowStyle}
        className={`${containerClasses} ${overflow ? '' : 'overflow-hidden'}`}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Card
