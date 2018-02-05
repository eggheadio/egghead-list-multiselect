import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import colors from 'lib/colors'
import Analytics from 'components/Analytics'

export const sizes = ['small', 'medium', 'large', 'xlarge']

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

class RouteLinkButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    trackState: PropTypes.object.isRequired,
    targetPath: PropTypes.string.isRequired,
    trackEventName: PropTypes.string,
    trackParams: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(sizes),
    color: PropTypes.oneOf(colors),
    secondaryColor: PropTypes.oneOf(colors),
    outline: PropTypes.bool,
    childStylesClassName: PropTypes.string,
    icon: PropTypes.string,
    replace: PropTypes.bool,
    sortable: PropTypes.bool,
  }

  static defaultProps = {
    size: 'medium',
    color: 'orange',
    secondaryColor: 'white',
    outline: false,
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
    const {
      replace,
      targetPath,
      trackState,
      trackEventName,
      trackParams,
    } = this.props

    if (this.props.onClick) this.props.onClick(event)

    const to = {
      pathname: targetPath,
      state: trackState,
    }

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

      if (trackEventName) {
        analytics.track(trackEventName, trackParams, updateHistory)
      } else {
        updateHistory()
      }
    }
  }

  render() {
    const {
      children,
      size,
      color,
      secondaryColor,
      outline,
      type,
      disabled,
      icon,
      targetPath,
      trackParams,
      trackEventName,
      onClick,
    } = this.props

    return (
      <Analytics>
        {({analytics}) => (
          <Button
            color={color}
            secondaryColor={secondaryColor}
            size={size}
            outline={outline}
            icon={icon}
            disabled={disabled}
            targetUrl={targetPath}
            trackParams={trackParams}
            onClick={event => {
              this.handleClick(event, analytics)
            }}
          >
            {children}
          </Button>
        )}
      </Analytics>
    )
  }
}

export default RouteLinkButton
