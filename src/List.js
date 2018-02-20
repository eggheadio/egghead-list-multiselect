import React, { Component } from 'react';

function noop() {
}

function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */ arg[0] : arg
  if (!arg && defaultValue) {
    return defaultValue
  } else {
    return arg
  }
}

function composeEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args)
      return event.defaultPrevented
    })
}


class List extends React.Component {

  getStateAndHelpers = () => {
    const {getItemProps, selectItem} = this

    return {
      getItemProps,
      selectItem
    }
  }

  selectItem = () => {
    console.log('do select')
  }

  getItemProps = ({onClick, ...rest}) => {
    return {
      onClick: composeEventHandlers(onClick, () => {
        console.log('click click')
      }),
      ...rest,
    }
  }

  render() {
    const children = unwrapArray(this.props.render || this.props.children, noop)
    const element = unwrapArray(children(this.getStateAndHelpers()))

    return element
  }
}

export default List