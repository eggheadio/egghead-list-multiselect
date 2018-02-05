import React, {Component} from 'react'
import List from 'components/SelectionList'
import Button from 'components/Button'
import {css} from 'glamor'

const scrollSectionStyle = css({
  height: '250px',
  maxHeight: '250px',
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
      lessonList: [
        'akash',
        'vojta',
        'evgeniy',
        'joel',
        'taylor',
        'raquel',
        'pete keen',
      ],
      allSelected: false,
    })
  }

  state = {
    lessonList: [
      'akash',
      'vojta',
      'evgeniy',
      'joel',
      'taylor',
      'raquel',
      'pete keen',
    ],
    allSelected: false,
  }

  lessonCheckboxChanged = (event, object, select, remove) => {
    console.log(event.target.checked)
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
                    className="f6 block ma2 pl1 black avenir w-90 br2 ba bw1 b--black-10 flex"
                    placeholder="Search for lessons"
                    {...inputStyle}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-column w-50 br bw1 b--black-10 justify-between">
                  <ul className="ma0 pa0" {...scrollSectionStyle}>
                    {selected.map((item, i) => (
                      <li
                        className="bb bw1 b--black-10 pa3 flex list"
                        key={i}
                        {...lastChildStyle}
                      >
                        <span className="pl3">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="items-bottom pa4 bt bw1 b--black-10">
                    <div
                      className="f6"
                      onClick={() => {
                        removeAll()
                        this.clearAllSelected()
                      }}
                    >
                      Clear list
                    </div>
                  </div>
                </div>
                <div className="flex flex-column bg-light-gray w-50 justify-between">
                  <ul {...scrollSectionStyle} className="ma0 pa0">
                    {selectionList.map((item, i) => (
                      <li
                        className="bb bw1 b--black-10 pa3 list"
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
                  <div className="flex items-bottom ph3 pv4 bt bw1 b--black-10 justify-between">
                    <div className="f6 self-start flex items-center">
                      <input
                        type="checkbox"
                        checked={this.state.allSelected}
                        onChange={event => {
                          this.toggleSelected()
                          if (this.state.allSelected) {
                            removeAll()
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
            </div>
          )}
        />
      </div>
    )
  }
}
