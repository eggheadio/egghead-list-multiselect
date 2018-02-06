import React, { Component } from 'react';
import { StaticRouter } from 'react-router'
import axios from 'axios'
import {some, remove, isEqual} from 'lodash'
import ContentSelector from "./screens/ContentSelector"
import selectedLessons from './data/selectedLessons'
import allLessons from './data/lessons'

//replace this with a valid JWT to auth against the API as needed
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwidXNlcl91cmwiOiJodHRwOi8vZWdnaGVhZC5kZXY6NTAwMC9hcGkvdjEvdXNlcnMvY3VycmVudCIsImV4cCI6MTUwOTA1NDg1MiwibWV0YSI6eyJuYW1lIjoiSm9lbCIsImZpcnN0X25hbWUiOiJKb2VsIiwiZW1haWwiOiJqb2VsQGVnZ2hlYWQuaW8iLCJpZCI6MSwiY2FuX2NvbnRhY3QiOnRydWUsImlzX3BybyI6dHJ1ZSwiaXNfaW5zdHJ1Y3RvciI6dHJ1ZSwiY3VycmVudF9wbGFuIjoiYTZjNWM4MzYiLCJjcmVhdGVkX2F0IjoiMjAxMy0wOC0zMVQyMToyMToxMyIsInB1Ymxpc2hlZF9sZXNzb25zIjo3LCJpbnN0cnVjdG9yX2lkIjoiam9lbC1ob29rcyIsImNvbXBsZXRlZF9sZXNzb25zIjo1LCJsYXN0X2xlc3Nvbl93YXRjaGVkX2F0IjoiMjAxNy0wNC0yMFQxMzoyODozNiIsImxhc3RfbGVzc29uX3dhdGNoZWQiOiJqYXZhc2NyaXB0LXJlZHV4LWF2b2lkaW5nLWFycmF5LW11dGF0aW9ucy13aXRoLWNvbmNhdC1zbGljZS1hbmQtc3ByZWFkIiwibGFzdF9sZXNzb25fY29tcGxldGVkIjoiamF2YXNjcmlwdC1yZWR1eC1hdm9pZGluZy1hcnJheS1tdXRhdGlvbnMtd2l0aC1jb25jYXQtc2xpY2UtYW5kLXNwcmVhZCIsImxhc3RfbGVzc29uX2NvbXBsZXRlZF9hdCI6IjIwMTctMDQtMjBUMTM6Mjg6MzYiLCJ0b3RhbCI6MC4wLCJ0cmFuc2FjdGlvbnMiOjAsIm1lbWJlcl9zaW5jZSI6IjIwMTUtMTItMTRUMTA6MTQ6MDMiLCJpbnRlcnZhbCI6Im5ldmVyIiwicGxhbl9uYW1lIjoiTWFuYWdlZCBTdWJzY3JpcHRpb24ifX0.52WWyYmOIfJhZS-NW3xXWFQX51zOFnIb6eDkuPPi0IU';


class App extends Component {
  state = {
    selectedLessons,
    allLessons
  }

  removeItem = (item) => {
    this.setState({
      selectedLessons: remove(this.state.selectedLessons, (itemToRemove) => !isEqual(itemToRemove, item))
    })
  }

  selectItem = (item) => {
    if(some(this.state.selectedLessons, item)) {
      this.removeItem(item)
    } else {
      this.setState({
        selectedLessons: [item, ...this.state.selectedLessons]
      })
    }

  }
  render() {
    return (
      <StaticRouter context={{}}>

        <div className='bg-base vh-100'>
          <List render={({getItemProps}) => (
            <div>
              {
                this.state.selectedLessons.map((item) => (
                  <div {...getItemProps({
                    onClick: () => this.removeItem(item),
                    item
                  })}>
                    {item.slug}
                  </div>
                ))

              }
            </div>
          )}/>
          <hr/>
          <List render={({getItemProps}) => (
            <div>
              {
                this.state.allLessons.map((item) => (
                  <div {...getItemProps({
                    onClick: () => this.selectItem(item),
                    item,
                    style: {fontWeight: some(this.state.selectedLessons, item) ? 'bold' : 'normal'}
                  })}>
                    {item.slug}
                  </div>
                ))

              }
            </div>
          )}/>

        </div>
      </StaticRouter>
    )
  }
}

export default App

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
