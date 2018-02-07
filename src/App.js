import React, { Component } from 'react';
import { StaticRouter } from 'react-router'
import axios from 'axios'
import {some, remove, isEqual, debounce, isUndefined} from 'lodash'
import ContentSelector from "./screens/ContentSelector"
import selectedLessons from './data/selectedLessons'
import allLessons from './data/lessons'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import Downshift from 'downshift'

//replace this with a valid JWT to auth against the API as needed
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwidXNlcl91cmwiOiJodHRwOi8vZWdnaGVhZC5hZjo1MDAwL2FwaS92MS91c2Vycy9jdXJyZW50IiwiZXhwIjoxNTIwNTY0MDAyLCJtZXRhIjp7Im5hbWUiOiJKb2VsIiwiZmlyc3RfbmFtZSI6IkpvZWwiLCJlbWFpbCI6ImpvZWxAZWdnaGVhZC5pbyIsImlkIjoxLCJjYW5fY29udGFjdCI6dHJ1ZSwiaXNfcHJvIjp0cnVlLCJpc19pbnN0cnVjdG9yIjp0cnVlLCJjdXJyZW50X3BsYW4iOiJhNmM1YzgzNiIsImNyZWF0ZWRfYXQiOiIyMDEzLTA4LTMxVDIxOjIxOjEzIiwicHVibGlzaGVkX2xlc3NvbnMiOjcsImluc3RydWN0b3JfaWQiOiJqb2VsLWhvb2tzIiwiY29tcGxldGVkX2xlc3NvbnMiOjEwLCJsYXN0X2xlc3Nvbl93YXRjaGVkX2F0IjoiMjAxNy0xMS0zMFQxMjo1MjoyMiIsImxhc3RfbGVzc29uX3dhdGNoZWQiOiJyZWFjdC1pbXBsZW1lbnQtYS1yZWFjdC1jb250ZXh0LXByb3ZpZGVyIiwibGFzdF9sZXNzb25fY29tcGxldGVkIjoicmVhY3QtaW1wbGVtZW50LWEtcmVhY3QtY29udGV4dC1wcm92aWRlciIsImxhc3RfbGVzc29uX2NvbXBsZXRlZF9hdCI6IjIwMTctMTEtMzBUMTI6NTI6MjIiLCJ0b3RhbCI6MC4wLCJ0cmFuc2FjdGlvbnMiOjAsIm1lbWJlcl9zaW5jZSI6IjIwMTUtMTItMTRUMTA6MTQ6MDMiLCJpbnRlcnZhbCI6Im5ldmVyIiwicGxhbl9uYW1lIjoiTWFuYWdlZCBTdWJzY3JpcHRpb24iLCJjdXJyZW50X2NvdXJzZV90aXRsZSI6IlN0cnVjdHVyZSBBbmd1bGFyIEFwcHMgd2l0aCBBbmd1bGFyIE1hdGVyaWFsIENvbXBvbmVudHMiLCJjdXJyZW50X2NvdXJzZV9kZXNjcmlwdGlvbiI6IkluIHRoaXMgY291cnNlIHdlIHdpbGwgZXhwbG9yZSBpbnRlZ3JhbCBBbmd1bGFyIE1hdGVyaWFsIGNvbXBvbmVudHMuIFdlIHdpbGwgc3RhcnQgd2l0aCBjb21wb25lbnRzIHJlbGF0ZWQgdG8gbmF2aWdhdGlvbiwgbGF5b3V0LCBhbmQgc3RydWN0dXJlLiBXZSB3aWxsIHRoZW4gbW92ZSB0aHJvdWdoIHRoZSB1dGlsaXR5LCBpbnB1dCwgYW5kIGRhdGF0YWJsZSBjb21wb25lbnRzLCBkZW1vbnN0cmF0aW5nIGhvdyBlYWNoIGNhbiBiZSB1c2VkIHRvIHN1aXQgeW91ciBwcm9qZWN04oCZcyBuZWVkcy4gRmluYWxseSB3ZSB3aWxsIHRvdWNoIG9uIHRoZW1pbmcgeW91ciBhcHBsaWNhdGlvbiB0byBjcmVhdGUgYSBjdXN0b20gbG9vayBhbmQgZmVlbCB0aGF0IGZpdHMgd2l0aGluIHRoZSBNYXRlcmlhbCBEZXNpZ24gZ3VpZGVsaW5lcy5cbkJ5IHRoZSBlbmQgb2YgdGhlIGNvdXJzZSB5b3Ugd2lsbCBiZSBjb21mb3J0YWJsZSBsZXZlcmFnaW5nIHRoZSBBbmd1bGFyIE1hdGVyaWFsIGxpYnJhcnkgdG8gY3JlYXRlIGFuIG91dHN0YW5kaW5nIGludGVyZmFjZSBhbmQgdXNlciBleHBlcmllbmNlIVxuIiwiY3VycmVudF9jb3Vyc2VfdXJsIjoiaHR0cHM6Ly9lZ2doZWFkLmlvL2NvdXJzZXMvc3RydWN0dXJlLWFuZ3VsYXItYXBwcy13aXRoLWFuZ3VsYXItbWF0ZXJpYWwtY29tcG9uZW50cyIsImN1cnJlbnRfY291cnNlX3RlY2hub2xvZ3kiOiJBbmd1bGFyIDIiLCJjdXJyZW50X2NvdXJzZV9pc19jb21wbGV0ZSI6ZmFsc2UsImN1cnJlbnRfY291cnNlX2NvbXBsZXRlZF9sZXNzb25fY291bnQiOjAsImN1cnJlbnRfY291cnNlX3N0YXJ0ZWRfb24iOiIyMDE4LTAxLTMxVDE1OjAyOjQ4IiwiY3VycmVudF9jb3Vyc2VfbGFzdF93YXRjaGVkX29uIjpudWxsLCJjdXJyZW50X2NvdXJzZV9uZXh0X2xlc3Nvbl90aXRsZSI6IkFuZ3VsYXIgTWF0ZXJpYWwgQ29tcG9uZW50cyBDb3Vyc2UgT3ZlcnZpZXciLCJjdXJyZW50X2NvdXJzZV9uZXh0X2xlc3Nvbl9zdW1tYXJ5IjoiSW4gdGhpcyBjb3Vyc2Ugd2UnbGwgc3RhcnQgZnJvbSBzY3JhdGNoIGJ5IGluc3RhbGxpbmcgYW5kIGNvbmZpZ3VyaW5nIEFuZ3VsYXIgTWF0ZXJpYWwgdG8gYmUgdXNlZCBpbiBhIHByb2plY3QuIFRoaXMgd2lsbCBpbmNsdWRlIGNvbmZpZ3VyaW5nIGEgY3VzdG9tIEFuZ3VsYXIgTWF0ZXJpYWwgbW9kdWxlIGFzIHdlbGwgYXMgc29tZSBwcmVidWlsdCB0aGVtZXMgYXZhaWxhYmxlIHRvIHVzLlxuV2UnbGwgbG9vayB0aHJvdWdoIHRoZSBNYXRlcmlhbCBhcGkgYXMgd2VsbCBhcyBhcHBseSB0aXBzIGFuZCB0cmlja3Mgb24gY29tbW9uIHByb2JsZW1zIHlvdSdsbCBmYWNlIHdoZW4gYXBwbHlpbmcgdGhpcyBzdHlsZSB0byB5b3VyIGFwcGxpY2F0aW9uLiBXZSdsbCBjb3ZlciB0b3BpY3Mgc3VjaCBhcyBob3cgTWF0ZXJpYWwgaGFuZGxlcyB1c2VyIGlucHV0LCBjb21tb24gTWF0ZXJpYWwgdXRpbGl0eSBjb21wb25lbnRzIChzcGlubmVycywgcHJvZ3Jlc3MgYmFycyBldGMuKSwgYW5kIGhvdyB0byBwcm9wZXJseSBtYW5hZ2UgdGFidWxhciBkYXRhIGFuZCB0aGVtZXMgaW4gQW5ndWxhciBNYXRlcmlhbC5cbkJ5IHRoZSBlbmQgb2YgdGhpcyBjb3Vyc2UsIHlvdSB3aWxsIGJlIGNvbWZvcnRhYmxlIGxldmVyYWdpbmcgdGhlIEFuZ3VsYXIgTWF0ZXJpYWwgY29tcG9uZW50IGxpYnJhcnkgdG8gY3JlYXRlIGFwcGxpY2F0aW9ucyB0aGF0IGxvb2sgYW5kIGZlZWwgZ3JlYXQgYmFzZWQgb24gdGhlIE1hdGVyaWFsIGRlc2lnbiBndWlkZWxpbmVzIGFuZCBoYXZlIGEgaGlnaCBmb2N1cyBvbiBhY2Nlc3NpYmlsaXR5LlxuIiwiY3VycmVudF9jb3Vyc2VfbmV4dF9sZXNzb25fdXJsIjoiaHR0cHM6Ly9lZ2doZWFkLmlvL2xlc3NvbnMvYW5ndWxhci1hbmd1bGFyLW1hdGVyaWFsLWNvbXBvbmVudHMtY291cnNlLW92ZXJ2aWV3In19.5dJgAm43vwS5Xh6I-D-kpY_b_J-kREI6srMMj5WJt5M';

const http = axios.create()

class App extends Component {
  state = {
    selectedLessons,
    allLessons,
    isOpen: false
  }

  handleStateChange = debounce((changes) => {
    if (changes.hasOwnProperty('inputValue') && !isUndefined(changes['inputValue'])) {
      return http
        .get(`http://egghead.af:5000/api/v1/lessons?q=${changes['inputValue']}&size=20&page=1`)
        .then(({data}) => data)
        .then(allLessons => this.setState({allLessons}))
    }
  }, 250)

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
        selectedLessons: [item, ...this.state.selectedLessons],
        isOpen: true
      })
    }

  }

  onDragStart = (initial) => {
    console.log(initial)
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  onDragEnd = (result) => {
    console.log(result);

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const selectedLessons = reorder(
      this.state.selectedLessons,
      result.source.index,
      result.destination.index
    );

    this.setState({
      selectedLessons
    });
  }

  render() {
    return (
      <StaticRouter context={{}}>

        <div className='bg-base vh-100'>
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >

                <List  render={({getItemProps}) => (
                  <Droppable droppableId='contentList'>
                    {(dropProvided, dropSnapshot) => (
                  <div>
                    <div ref={dropProvided.innerRef}>
                      {
                        this.state.selectedLessons.map((item, index) => (
                          <Draggable key={item.slug} draggableId={item.slug} index={index}>
                            {(dragProvided, dragSnapshot) => (

                              <div ref={dragProvided.innerRef}>
                                <div
                                  key={item.slug}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                  {...getItemProps({
                                    onClick: () => this.removeItem(item),
                                    item
                                  })}
                                >
                                  {item.slug}
                                </div>
                                {dragProvided.placeholder}
                              </div>
                            )}
                          </Draggable>
                        ))
                      }
                    </div>
                    {dropProvided.placeholder}
                  </div>
                )}
                </Droppable>
                )}/>

          </DragDropContext>
          <button onClick={() => this.setState({isOpen: !this.state.isOpen})}>open</button>
          <hr/>

          <Downshift
            itemToString={itemToString}
            isOpen={this.state.isOpen}
            selectedItem={this.state.selectedLessons}
            onStateChange={this.handleStateChange}
          >
            {({
                getInputProps,
                getItemProps,
                isOpen,
              }) => (
              <div>
                {!isOpen
                  ? null
                  : <div>
                    <input {...getInputProps()} />
                    {
                      this.state.allLessons.map((item) => (
                        <div key={item.slug} {...getItemProps({
                          onClick: () => this.selectItem(item),
                          item,
                          style: {fontWeight: some(this.state.selectedLessons, item) ? 'bold' : 'normal'}
                        })}>
                          <input readOnly={true} type="checkbox" checked={some(this.state.selectedLessons, item)}/>{item.slug}
                        </div>
                      ))

                    }
                  </div>}
              </div>
            )}
          </Downshift>
        </div>
      </StaticRouter>
    )
  }
}

export default App

function noop() {
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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

function itemToString(item) {
  return item.slug
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
