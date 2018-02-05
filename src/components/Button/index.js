import React, {Component} from 'react'
import PropTypes from 'prop-types'
import colors from 'lib/colors'
import css from './index.scss'
import Icon from 'components/Icon'
import ButtonBase from 'components/ButtonBase'

export const sizes = ['small', 'medium', 'large', 'xlarge']

class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(sizes),
    color: PropTypes.oneOf(colors),
    secondaryColor: PropTypes.oneOf(colors),
    outline: PropTypes.bool,
    childStylesClassName: PropTypes.string,
    icon: PropTypes.string,
  }

  static defaultProps = {
    size: 'medium',
    color: 'orange',
    secondaryColor: 'white',
    outline: false,
  }

  state = {
    isHovered: false,
  }

  handlerMouseOver = item => {
    this.setState({
      isHovered: true,
    })
  }

  handlerMouseLeave = item => {
    this.setState({
      isHovered: false,
    })
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
      targetUrl,
      trackParams,
      trackEventName,
      onClick,
    } = this.props

    return (
      <ButtonBase
        disabled={disabled}
        targetUrl={targetUrl}
        trackParams={trackParams}
        trackEventName={trackEventName}
        onClick={onClick}
        render={({children, disabled, onClick}) => (
          <div>
            <button
              type={type}
              className={`
          flex items-center justify-center
          f6 fw6 ttu b
          ba br-pill
          ${!disabled && 'pointer'}
          ${disabled && 'o-30'}
          ${css.borderWidth}
          b--${color}
          ${
            outline
              ? this.state.isHovered
                ? `bg-${color} ${color}`
                : `bg-transparent ${secondaryColor}`
              : this.state.isHovered
                ? `${css.hovered} bg-${color}`
                : `bg-${color}`
          }
          ${css[size]}
        `}
              onClick={type ? undefined : onClick}
              disabled={disabled}
              onMouseOver={this.handlerMouseOver}
              onMouseLeave={this.handlerMouseLeave}
            >
              <div
                className={`${'flex justify-between items-center'}
              ${
                outline
                  ? this.state.isHovered ? secondaryColor : color
                  : secondaryColor
              }
              `}
              >
                <div className="flex justify-between items-center">
                  {children}
                  {icon && (
                    <div className="ml3">
                      <Icon
                        type={icon}
                        color={
                          outline
                            ? this.state.isHovered ? secondaryColor : color
                            : secondaryColor
                        }
                        size="3"
                      />
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        )}
      >
        {children}
      </ButtonBase>
    )
  }
}

export default Button
