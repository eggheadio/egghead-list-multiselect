import React from 'react'
import { get, some, remove, isEqual, isEmpty, debounce, isUndefined } from 'lodash'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import selectedLessons from './data/selectedLessons'
import allLessons from './data/lessons'
import axios from 'axios'
import { css } from 'glamor'

const http = axios.create() //mobx

const scrollSectionStyle = css({
  height: '500px',
  maxHeight: '500px',
  overflowY: 'auto',
})

const lastChildStyle = css({
  '&:last-child': {
    borderBottomWidth: '0px',
  },
})

const inputStyle = css({
  height: '2.2em',
  textIndent: '1em',
  '::placeholder': {
    color: '#aaa',
    alignItem: 'center',
    display: 'flex',
  },
  borderStyle: 'solid',
  borderWidth: '1px',
})

const iconStyle = css({
  height: "28px",
  width: "28px",
});

const instructorImgStyle = css({
  height: "18px",
  width: "18px",
});

const headingHeight = css({
  height: "48px"
})

const hoverEffect = css({
  ":hover": {
    backgroundColor: "white"
  },
  "transition": "all .2s linear .1s"
})

const reverseHoverEffect = css({
  ":hover": {
    backgroundColor: "#f8f8f8"
  },
  "transition": "all .2s linear .1s"
})

const itemUI = (item) => {
  return (
    <div className="flex items-center ml3">
      <img {...iconStyle} src={get(item, "icon_url")} alt={""} />
      <div className="ml3">
        <div className="f5">{get(item, "title")}</div>
        <div className="flex items-center mt2">
          <img {...instructorImgStyle}
            className="br-pill"
            src={get(item, "instructor.avatar_url")} alt={""} />
          <div className="f5 dark-gray ml2">{get(item, "instructor.slug")}</div>
        </div>
      </div>
    </div>
  )
}


export default class ContentSelector extends React.Component {

  state = {
    selectedLessons, //mobx
    allLessons, //mobx
    isOpen: true
  }

  componentDidMount() {
    if (isUndefined(this.state.selectedLessons) || isEmpty(this.state.selectedLessons)) {
      this.setState({
        isOpen: true
      })
    }
  }


  onToggleClick = () => this.setState({ isOpen: !this.state.isOpen })

  onSearchInputChange = debounce((changes) => { //mobx
    if (changes.hasOwnProperty('inputValue') && !isUndefined(changes['inputValue'])) {
      return http
        .get(`http://egghead.af:5000/api/v1/lessons?q=${changes['inputValue']}&size=20&page=1`)
        .then(({ data }) => data)
        .then(allLessons => this.setState({ allLessons }))
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

    const {
      heading
    } = this.props;

    return (
      <div className="bg-white flex f4 black avenir br2 ma3 overflow-hidden">
        <div className="flex flex-column flex-grow-1 b--black-10">
          <div className="flex items-center justify-between b--black-10 bb pv3 ph4">
            <div {...headingHeight} className="flex items-center fw4 f3">
              {heading}
            </div>

            <div
              {...iconStyle}
              {...reverseHoverEffect}
              className="ba br2 b--black-10 bw1 pa3 pointer flex items-center justify-center"
              onClick={this.onToggleClick}>
              {this.state.isOpen ? '>' : '<'}
            </div>
          </div>

          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            <Droppable droppableId='contentList'>
              {(dropProvided, dropSnapshot) => (
                <div>
                  <div ref={dropProvided.innerRef}
                    {...scrollSectionStyle}
                  >
                    {
                      this.state.selectedLessons.map((item, index) => (
                        <Draggable key={item.slug} draggableId={item.slug} index={index}>
                          {(dragProvided, dragSnapshot) => (

                            <div ref={dragProvided.innerRef}
                              {...lastChildStyle}
                              {...reverseHoverEffect}
                              className="pa3 ph b--black-10 bb" >
                              <div
                                key={item.slug}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                onClick={() => this.removeItem(item)}
                              >
                                {itemUI(item)}
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
          ? null :
          <div
            className="bl b--black-10 bg-light-gray w-50">
            <div className='flex flex-column'>
              <div className='flex flex-row pa3 bb b--black-10'>
                <input onChange={this.onSearchInputChange}
                  className="br2 b--black-10 flex w-100"
                  placeholder="Search"
                  {...inputStyle}
                  {...headingHeight} />
              </div>
              <div {...scrollSectionStyle}>
                {
                  this.state.allLessons.map((item) => {
                    console.log(item);
                    return (
                      <div
                        {...lastChildStyle}
                        {...hoverEffect}
                        className="flex items-center ph2 pv3 bb b--black-10 pointer"
                        key={item.slug}
                        onClick={() => this.selectItem(item)}
                      >
                        <input readOnly={true} type="checkbox"
                          className="ml2"
                          checked={some(this.state.selectedLessons, item)} />
                        {itemUI(item)}
                      </div>
                    )
                  })

                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
