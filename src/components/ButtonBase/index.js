import React, {Component} from 'react'
import PropTypes from 'prop-types'
import analytics, {track} from '../../lib/analytics'

const isModifiedEvent = event => {
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

class ButtonBase extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
  }

  onClick = event => {
    const {targetUrl, trackEventName, trackParams, disabled} = this.props
    if (disabled === true) {
      event.preventDefault()
      return
    }

    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault()

      if (trackEventName) {
        analytics.track(trackEventName, trackParams, () => {
          window.location.href = targetUrl
        })
      } else if (targetUrl) {
        window.location.href = targetUrl
      }
    }
  }

  render() {
    const {children, disabled} = this.props

    return this.props.render({
      children: children,
      disabled: disabled,
      onClick: this.onClick,
    })
  }
}

export default ButtonBase
