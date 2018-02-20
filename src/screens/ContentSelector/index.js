import React from 'react'
import {some, remove, isEqual, debounce, isUndefined} from 'lodash'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import selectedLessons from './data/selectedLessons'
import allLessons from './data/lessons'
import axios from 'axios'

//this is actually a component

const http = axios.create() //mobx

export default class ContentSelector extends React.Component {
  state = {
    selectedLessons, //mobx
    allLessons, //mobx
    isOpen: false
  }

  onToggleClick = () => this.setState({isOpen: !this.state.isOpen})

  onSearchInputChange = debounce((changes) => { //mobx
    if (changes.hasOwnProperty('inputValue') && !isUndefined(changes['inputValue'])) {
      return http
        .get(`http://egghead.af:5000/api/v1/lessons?q=${changes['inputValue']}&size=20&page=1`)
        .then(({data}) => data)
        .then(allLessons => this.setState({allLessons}))
    }
  }, 250)

  removeItem = (item) => { //mobx
    this.setState({
      selectedLessons: remove(this.state.selectedLessons, (itemToRemove) => !isEqual(itemToRemove, item))
    })
  }

  selectItem = (item) => { //mobx
    if (some(this.state.selectedLessons, item)) {
      this.removeItem(item)
    } else {
      this.setState({
        selectedLessons: [item, ...this.state.selectedLessons],
        isOpen: true
      })
    }
  }

  onDragStart = (initial) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const selectedLessons = this.reorder(
      this.state.selectedLessons,
      result.source.index,
      result.destination.index
    );

    this.setState({
      selectedLessons
    });
  }

  reorder = (list, startIndex, endIndex) => { //mobx
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  render() {
    return (
      <div className='flex flex-column vh-100'>
        <div className='flex flex-column'>
          <div className='flex flex-row'>
            <button onClick={this.onToggleClick}>{this.state.isOpen ? 'close' : 'open'}</button>
          </div>

          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
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
                                onClick={() => this.removeItem(item)}
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
          </DragDropContext>

        </div>


        {!this.state.isOpen
          ? null
          : <div className='flex flex-column'>
            <div className='flex flex-row'>
            <input onChange={this.onSearchInputChange}/>
            </div>
            {
              this.state.allLessons.map((item) => (
                <div key={item.slug} onClick={() => this.selectItem(item)}
                     style={{fontWeight: some(this.state.selectedLessons, item) ? 'bold' : 'normal'}}>
                  <input readOnly={true} type="checkbox"
                         checked={some(this.state.selectedLessons, item)}/>{item.slug}
                </div>
              ))

            }
          </div>}

      </div>
    )
  }
}
