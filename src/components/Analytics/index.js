import React from 'react'
import analytics from '../../lib/analytics'

class Analytics extends React.Component {
  render() {
    return this.props.children({analytics})
  }
}

export default Analytics
