import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import Analytics from 'components/Analytics'

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

class ExternalTrackingLink extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    track: PropTypes.string,
    trackParams: PropTypes.object,
  }

  handleClick = (event, analytics) => {
    const {href, track, trackParams} = this.props

    if (this.props.onClick) this.props.onClick(event)

    function updateLocation() {
      window.location.href = href
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault()

      if (track) {
        analytics.track(track, trackParams, updateLocation)
      } else {
        updateLocation()
      }
    }
  }

  render() {
    const {track, trackParams, ...props} = this.props // eslint-disable-line no-unused-vars
    return (
      <Analytics>
        {({analytics}) => (
          <a {...props} onClick={event => this.handleClick(event, analytics)} />
        )}
      </Analytics>
    )
  }
}

export default ExternalTrackingLink
