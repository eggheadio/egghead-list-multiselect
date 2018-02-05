import React from 'react'
import itemToActions from 'lib/itemToActions'

export default class ContentActions extends React.Component {
  render() {
    const {children, item, updateContent} = this.props
    return children({
      actions: itemToActions(item, updateContent),
    })
  }
}
