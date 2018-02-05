import React from 'react'
import {observer} from 'mobx-react'
import TextArea from './base/TextArea'

export default observer(({item, field}) => (
  <TextArea
    label="Summary"
    value={item[field]}
    placeholder="Please be descriptive, but brief. Talk to the user, not at them. SEO is important! Markdown is supported."
    onChange={e => (item[field] = e.target.value)}
    divClassNames="bg-white br2 flex-grow-1"
    styleTools={true}
    characterLimit={1024}
    toolTip={"This is Description's tooltip!"}
    rows={7}
    cols={40}
  />
))
