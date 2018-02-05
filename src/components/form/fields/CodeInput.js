import React from 'react'
import {observer} from 'mobx-react'
import Input from './base/Input'

export default observer(({label, value, placeholder, onChange, type, hint}) => (
  <Input
    label={label}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    divClassNames=""
    labelClassNames="db pl3 pt3"
    inputClassNames="pa2 br2"
    wrapperClassNames="pa3"
    errorClassNames="b--red"
    type={type}
    hint={hint}
  />
))
