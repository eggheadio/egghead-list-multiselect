import React from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'

import {map, get} from 'lodash'

import Icon from 'components/Icon'
import colorValues from 'lib/colorValues'

const isLast = (index, steps) => index === steps.length - 1

const StepItem = ({stepNumber, selectedStep, title, handler, enabled}) => {
  const checkedStyles = css({
    borderColor: colorValues['green'],
    background: colorValues['green'],
    color: colorValues['dark-blue'],
  })
  const activeStyles = css({
    borderColor: colorValues['green'],
    background: colorValues['base'],
    color: colorValues['green'],
  })
  const nonActiveStyles = css({
    borderColor: colorValues['white'],
    background: colorValues['white'],
    color: colorValues['dark-blue'],
  })
  const disabledStyles = css({
    borderColor: colorValues['dark-blue'],
    background: colorValues['dark-blue'],
    color: colorValues['dark-blue-secondary'],
    opacity: 0.5,
  })

  const activityStyles =
    stepNumber <= selectedStep ? activeStyles : nonActiveStyles
  const completedStyles = stepNumber < selectedStep ? checkedStyles : {}

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        position: 'relative',
        paddingBottom: '30px',
      })}
    >
      <div
        className={css(
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32px',
            height: '32px',
            cursor: enabled && 'pointer',
            fontFamily: 'Avenir',
            fontWeight: 500,
            borderRadius: '100%',
            borderWidth: '1px',
            borderStyle: 'solid',
          },
          enabled ? activityStyles : disabledStyles,
          completedStyles,
        )}
        onClick={enabled && handler}
      >
        {stepNumber < selectedStep ? (
          <Icon type="check" color="dark-blue" size="6" />
        ) : (
          stepNumber
        )}
      </div>
      <div
        className={css({
          position: 'absolute',
          bottom: '2px',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          color: colorValues['dark-gray-secondary'],
          opacity: enabled ? 1 : 0.5,
        })}
      >
        {title}
      </div>
    </div>
  )
}

const Separator = ({selectedStep, activeFor, enabled}) => {
  const activeStyles =
    selectedStep >= activeFor
      ? css({background: colorValues['green']})
      : css({background: colorValues['white']})
  return (
    <div
      className={css(
        {
          content: `''`,
          display: 'block',
          width: '100%',
          height: '1px',
          marginTop: '16px',
          background: colorValues['white'],
          opacity: enabled ? 1 : 0.5,
        },
        activeStyles,
      )}
    />
  )
}

class StepsLine extends React.Component {
  render() {
    const {steps, selectedStep, handler} = this.props
    const stepItemWrapperStyles = css({
      display: 'flex',
      width: '100%',
    })

    return (
      <div
        className={css({
          borderRadius: '5px 5px 0 0',
          background: colorValues['base'],
          padding: '30px 25px 25px 25px',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            padding: '0 60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          })}
        >
          {map(steps, (step, index) => {
            const classname = css(
              !isLast(index, steps) ? stepItemWrapperStyles : {},
            )
            const nextStep = steps[index + 1]
            return (
              <div key={index} className={classname}>
                <StepItem
                  stepNumber={index + 1}
                  title={step.title}
                  handler={() => handler(index + 1)}
                  selectedStep={selectedStep}
                  enabled={step.enabled}
                />
                {!isLast(index, steps) && (
                  <Separator
                    selectedStep={selectedStep}
                    activeFor={index + 2}
                    enabled={get(nextStep, 'enabled')}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default StepsLine
