import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const getStyles = ({arrow, active, disabled}) => {
  if (arrow) {
    return disabled
      ? 'mh1 mh3-ns bg-transparent b--black-10 black-10 arrow'
      : 'mh1 mh3-ns bg-transparent pointer b--base-secondary base-secondary arrow enabled'
  }
  if (active) {
    return 'mh1 mh2-ns b--orange bg-orange white'
  }

  return disabled
    ? 'b--transparent mh1 mh2-ns bg-transparent'
    : 'b--transparent mh1 mh2-ns bg-transparent base-secondary pointer enabled'
}

const Button = props => (
  <div className={props.className || ''}>
    <button
      className={`
          flex
          items-center
          justify-center
          w2
          h2
          ba
          br1
          fw5
          eh-transition
          button
          ${getStyles(props)}
          ${props.className || ''}
        `}
      onClick={() => !props.disabled && props.onClick()}
    >
      {props.children}
    </button>
  </div>
)

const StyledButton = styled(Button)`
  .button {
    outline: none;
    font-size: 18px;
    &.enabled:hover {
      border: solid 1px #fd9126;
    }
  }
`

Button.propTypes = {
  // eslint-disable-next-line
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line
  arrow: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default StyledButton
