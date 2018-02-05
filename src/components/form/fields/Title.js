import React from 'react'
import {observer} from 'mobx-react'
import TextArea from './base/TextArea'

export default observer(({item}) => (
  <TextArea
    label="Title"
    value={item.title}
    placeholder="A descriptive phrase to help users find this lesson."
    onChange={e => (item.title = e.target.value)}
    divClassNames="bg-white br2 mb3"
    characterLimit={90}
    toolTip={"This is title's tooltip!"}
    rows={2}
    cols={40}
    isRequired
  />
))
