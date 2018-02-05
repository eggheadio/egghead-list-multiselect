import React from 'react'
import PropTypes from 'prop-types'
import Analytics from 'components/Analytics'

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

/**
 * The public API for rendering a history-aware <a>.
 */
class TrackingLink extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    sortable: PropTypes.bool,
    track: PropTypes.string,
    trackParams: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }

  static defaultProps = {
    replace: false,
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }

  handleClick = (event, analytics) => {
    const {history} = this.context.router
    const {replace, to, track, trackParams} = this.props

    if (this.props.onClick) this.props.onClick(event)

    function updateHistory() {
      if (replace) {
        history.replace(to)
      } else {
        history.push(to)
      }
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault()

      if (track) {
        analytics.track(track, trackParams, updateHistory)
      } else {
        updateHistory()
      }
    }
  }

  render() {
    const {replace, to, track, trackParams, sortable, ...props} = this.props // eslint-disable-line no-unused-vars
    const href = this.context.router.history.createHref(
      typeof to === 'string' ? {pathname: to} : to,
    )

    return (
      <Analytics>
        {({analytics}) => (
          <a
            {...props}
            onClick={event => this.handleClick(event, analytics)}
            href={href}
          />
        )}
      </Analytics>
    )
  }
}

export default TrackingLink
