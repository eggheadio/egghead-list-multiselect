import React from 'react'
import {observer} from 'mobx-react'
import Select from 'react-select'
import sharedCss from 'components/form/formStyles.scss'

export default observer(
  ({
    label,
    value,
    options,
    placeholder,
    onChange,
    valueKey,
    optionRenderer,
    valueRenderer,
    divClassNames,
    labelClassNames,
    wrapperClassNames,
    selectClassNames,
    locked,
  }) => (
    <div className={`${sharedCss.box} ${divClassNames}`}>
      <label className={`${sharedCss.label} ${labelClassNames}`}>{label}</label>
      <div className={wrapperClassNames}>
        {locked ? (
          valueRenderer(value)
        ) : (
          <Select
            value={value}
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            valueKey={valueKey}
            className={selectClassNames}
            optionRenderer={optionRenderer}
            valueRenderer={valueRenderer}
          />
        )}
      </div>
    </div>
  ),
)
