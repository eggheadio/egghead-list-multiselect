import React from 'react'
import {observer} from 'mobx-react'
import uuid from 'shortid'
import MultiSelect from './MultiSelect'

export default observer(
  ({
    label,
    valueArray,
    placeholder,
    options,
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
      <MultiSelect
        label={label}
        valueArray={valueArray}
        placeholder={placeholder}
        options={options}
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
