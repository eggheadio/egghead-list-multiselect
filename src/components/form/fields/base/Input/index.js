import React from 'react'
import {observer} from 'mobx-react'
import Maybe from 'components/Maybe'
import Hint from 'components/Hint'
import css from './index.scss'

export default observer(
  ({
    label,
    value,
    placeholder,
    onChange,
    divClassNames,
    labelClassNames,
    wrapperClassNames,
    inputClassNames,
    type = 'text',
    hint,
  }) => (
    <div className={divClassNames}>
      {label && (
        <label className={`flex ${labelClassNames}`}>
          {label}
          {hint && (
            <div className="ml2">
              <Hint payload={hint} />
            </div>
          )}
        </label>
      )}
      <div className={wrapperClassNames}>
        <input
          className={`${inputClassNames} ${css.input}`}
          value={value}
          placeholder={placeholder}
          onChange={event => onChange(event.target.value)}
          type={type}
        />
      </div>
    </div>
  ),
)
