import React from 'react'
import {observer} from 'mobx-react'

export default observer(
  ({
    label,
    value,
    onChange,
    divClassNames,
    inputClassNames,
    labelClassNames,
    labelFirst,
  }) => (
    <div className={divClassNames}>
      {label && <label className={labelClassNames}>{label}</label>}
      <input className={inputClassNames} value={value} onChange={onChange} />
      {label &&
        !labelFirst && <label className={labelClassNames}>{label}</label>}
    </div>
  ),
)
