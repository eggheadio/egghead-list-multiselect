import React from 'react'
import {css} from 'glamor'

import colorValues from 'lib/colorValues'

import {observer} from 'mobx-react'
import Icon from 'components/Icon'
import Hint from 'components/Hint'
import cn from 'classnames'
import sharedCss from 'components/form/formStyles.scss'

const overMax = (length, limit) => length > limit

const isRequiredStyles = css({
  ':after': {
    content: '*',
    color: colorValues['dark-gray-secondary'],
  },
})

export default observer(
  ({
    label,
    value,
    placeholder,
    onChange,
    onBlur,
    divClassNames,
    textAreaClassNames,
    styleTools,
    characterLimit,
    toolTip,
    rows = 15,
    cols = 100,
    isRequired,
    name,
    id,
    minLength,
  }) => (
    <div className={`${sharedCss.box} ${divClassNames}`}>
      <label
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${colorValues['gray-secondary']}`,
          padding: '20px',
        })}
      >
        <span
          className={css(
            {
              color: colorValues['base'],
              fontSize: '18px',
              lineHeight: '24px',
              fontFamily: 'Avenir',
              fontWeight: 500,
              paddingTop: '2px',
            },
            isRequired && isRequiredStyles,
          )}
        >
          {label}
        </span>
        <div
          className={css({
            display: 'flex',
          })}
        >
          {typeof styleTools !== 'undefined' && (
            <div
              className="flex items-center justify-between mr2"
              style={{width: '2rem'}}
            >
              <Icon type="bold" color="black" size="6" />
              <Icon type="italic" color="black" size="6" />
            </div>
          )}
          <div
            className={css({
              fontSize: '14px',
              color: colorValues['dark-gray-secondary'],
              marginRight: '15px',
              fontFamily: 'Avenir',
              display: 'flex',
              alignItems: 'center',
              paddingTop: '1px',
            })}
          >
            {value && `${value.length}/${characterLimit}`}
          </div>
          <Hint />
        </div>
      </label>
      <textarea
        className={css({
          width: '100%',
          resize: 'none',
          border: 'none',
          background: 'none',
          padding: '20px',
          fontSize: '16px',
          lineHeight: '24px',
          fontFamily: 'Avenir',
          color: colorValues['base-secondary'],
          ':focus': {
            outline: 'none',
          },
          '::placeholder': {
            color: colorValues['dark-gray-secondary'],
          },
        })}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        cols={cols}
        maxLength={characterLimit}
        minLength={minLength}
        name={name}
        id={id}
      />
    </div>
  ),
)
