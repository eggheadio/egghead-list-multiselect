import React from 'react'
import {observer} from 'mobx-react'
import Select from 'react-select'
import sharedCss from 'components/form/formStyles.scss'

export default observer(
  ({
    label,
    valueArray,
    placeholder,
    options,
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
          <div className="flex justify-around">
            {valueArray.map(value => valueRenderer(value))}
          </div>
        ) : (
          <Select
            value={valueArray}
            placeholder={placeholder}
            options={options}
            onChange={onChange}
            valueKey={valueKey}
            className={selectClassNames}
            optionRenderer={optionRenderer}
            valueRenderer={valueRenderer}
            resetValue={[]}
            multi
            simpleValue
          />
        )}
      </div>
    </div>
  ),
)
