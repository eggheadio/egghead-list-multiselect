import React from 'react'
import {observer} from 'mobx-react'
import DropdownSelect from './DropdownSelect'

export default observer(
  ({
    label,
    value,
    options,
    placeholder,
    onChange,
    labelKey,
    imgKey,
    valueKey,
    divClassNames,
    labelClassNames,
    wrapperClassNames,
    selectClassNames,
    contentClassNames = 'flex items-center',
    imgClassNames,
    locked,
  }) => {
    const renderLabelWithIcon = option => (
      <div className={contentClassNames}>
        <img
          src={option[imgKey]}
          role="presentation"
          className={imgClassNames}
        />
        {option[labelKey]}
      </div>
    )
    return (
      <DropdownSelect
        label={label}
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        valueKey={valueKey}
        optionRenderer={renderLabelWithIcon}
        valueRenderer={renderLabelWithIcon}
        divClassNames={divClassNames}
        labelClassNames={labelClassNames}
        wrapperClassNames={wrapperClassNames}
        selectClassNames={selectClassNames}
        locked={locked}
      />
    )
  },
)
