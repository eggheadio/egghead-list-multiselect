import React, { Component } from 'react'
import List from 'components/SelectionList'
import Button from 'components/Button'
import Icon from 'components/Icon'
import { css } from 'glamor'

const scrollSectionStyle = css({
  height: '300px',
  maxHeight: '300px',
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
})

export default class LessonsSelector extends Component {

  componentWillMount = () => {
    this.setState({
      // update this to the relevant sytarting array elements
      lessonList: [
        'akash',
        'vojta',
        'evgeniy',
        'joel',
        'taylor',
        'raquel',
        'pete keen',
      ],
      defaultList: [
        'asdfja',
        'vojsadfta',
        'evgasdfasdeniy',
      ],
      allSelected: false,
    })
  }

  state = {
    // update this to be an empty array
    lessonList: [],
    defaultList: [],
    allSelected: false,
  }

  lessonCheckboxChanged = (event, object, select, remove) => {
    if (event.target.checked === true) {
      select(object)
    } else {
      remove(object)
    }
  }

  toggleSelected = event => {
    this.setState({
      allSelected: !this.state.allSelected,
    })
  }

  clearAllSelected = () => {
    this.setState({
      allSelected: false,
    })
  }

  onSearchInputChanged = event => {
    console.log(event.target.value);
    // get the input and search for appropriate
    // lessons to be updated into this array.
    this.setState({
      lessonList: [
        'soemthing else',
        'react lesosn'
      ]
    })
    if (event.target.value === '') {
      this.setState({
        lessonList: [...this.state.defaultList]
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.lessonList !== this.state.lessonList) {
      this.setState({
        allSelected: false
      })
    }
  }


  render() {
    return (
      <div className="pa5 flex flex-column eh-mw9 bg-white-secondary">
        <List
          selectionList={this.state.lessonList}
          render={(
            selectionList,
            selected,
            select,
            selectAll,
            remove,
            removeAll,
            isSlected,
          ) => (
              <div className="bg-white br2 shadow-1 flex flex-column w-100 overflow-hidden">
                <div className="flex bb bw1 b--black-10">
                  <div className="flex items-center pa3 f4 black avenir w-50  br bw1 b--black-10">
                    {'Prerequisite Content'}
                  </div>
                  <div className="pa2 w-50 flex justify-around">
                    <input
                      type="text"
                      className="f6 block mv2 mh1 w-100 pl1 black avenir w-90 br2 ba bw1 b--black-10 flex"
                      placeholder="Search for lessons"
                      {...inputStyle}
                      onChange={this.onSearchInputChanged}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-column w-50 br bw1 b--black-10 justify-between">
                    <ul className="ma0 pa0" {...scrollSectionStyle}>
                      {selected.map((item, i) => (
                        <li
                          className="bb bw1 b--black-10 ph3 pv2 flex list"
                          key={i}
                          {...lastChildStyle}
                        >
                          <span className="pl3">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-column bg-light-gray w-50 justify-between">
                    <ul {...scrollSectionStyle} className="ma0 pa0">
                      {selectionList.map((item, i) => (
                        <li
                          className="bb bw1 b--black-10 ph3 pv2 list"
                          key={i}
                          {...lastChildStyle}
                        >
                          <input
                            type="checkbox"
                            checked={isSlected(item)}
                            onChange={event =>
                              this.lessonCheckboxChanged(
                                event,
                                item,
                                select,
                                remove,
                              )
                            }
                          />
                          <span className="pl3">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex bt bw1 b--black-10 justify-between">
                  <div className="flex items-center pa3 w-50 br bw1 b--black-10">
                    <div
                      className="f6 self-bottom flex items-center pointer"
                      onClick={() => {
                        removeAll()
                        this.clearAllSelected()
                      }}
                    >
                      <Icon type="cancel" size={"small"} />
                      <span className="pl2">Clear list</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pa3 w-50">
                    <div className="f6">
                      <input
                        type="checkbox"
                        checked={this.state.allSelected}
                        onChange={event => {
                          this.toggleSelected()
                          if (this.state.allSelected) {
                            remove(this.state.lessonList.filter(
                              (item) => isSlected(item)
                            ))
                            this.clearAllSelected()
                          } else {
                            selectAll()
                          }
                        }}
                      />
                      <label className="pl2">Select All</label>
                    </div>
                    <Button
                      className="self-end"
                      outline
                      size="small"
                      color="blue"
                      onClick={event => {
                        removeAll()
                        this.clearAllSelected()
                      }}
                    >
                      Clear list
                    </Button>
                  </div>
                </div>
              </div>
            )}
        />
      </div>
    )
  }
}
