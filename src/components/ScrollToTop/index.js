import React from 'react'
import {withRouter} from 'react-router'

// when router location changes the page will scroll to the top...
class ScrollToTop extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
