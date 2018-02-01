import React, { Component, Fragment } from 'react'
import List from "components/react-list";
import { css } from "glamor"

const scrollSectionStyle = css({
    height: "250px",
    maxHeight: "250px",
    overflowY: "auto"
})

const lastChildStyle = css({
    "&:last-child": {
        borderBottomWidth: "0px"
    }
})

const inputStyle = css({
    height: "2em",
    "::placeholder": {
        color: "#aaa",
        paddingLeft: "1em",
        alignItem: "center",
        display: "flex"
    }
})

export default class LessonSelector extends Component {

    state = {
        lessonList: ["akash", "vojta", "evgeniy", "joel", "taylor", "raquel", "pete keen"]
    }

    checkboxChanged = (event, object, select, remove) => {
        console.log(event.target.checked);
        if (event.target.checked === true) {
            select(object)
        } else {
            remove(object)
        }
    }

    render() {

        return (
            <div className="pa5 flex flex-column items-center eh-mw9 bg-white-secondary">
                <List
                    selectionList={this.state.lessonList}
                    render={
                        (selectionList, selected, select, selectAll, remove, removeAll) => {
                            return (
                                <div className="bg-white br2 eh-shadow-1 flex flex-column w-100">
                                    <div className="flex bb bw1 b--black-10">
                                        <div className="flex items-center pa3 f4 black avenir w-50  br bw1 b--black-10">
                                            {"Prerequisite Content"}
                                        </div>
                                        <div className="pa2 items-center w-50" >
                                            <input type="text" className="block ma2 black avenir w-80 br2 ba bw1 b--black-10 flex"
                                                placeholder="place holder"{...inputStyle} />
                                        </div>
                                    </div>

                                    <div className="flex flex-row">
                                        <div className="flex flex-column w-50 br bw1 b--black-10 justify-between">
                                            <ul className="ma0 pa0" {...scrollSectionStyle}>
                                                {
                                                    selected.map((item, i) =>
                                                        <li className="bb bw1 b--black-10 pa3 flex list"
                                                            key={i} {...lastChildStyle}>
                                                            <span className="pl3">{item}</span>
                                                        </li>)
                                                }
                                            </ul>
                                            <div className="items-bottom pa4 bt bw1 b--black-10">
                                                <div className="f6" onClick={() => { removeAll() }}> Clear list </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-column bg-light-gray w-50 justify-between">
                                            <ul {...scrollSectionStyle} className="ma0 pa0">
                                                {
                                                    selectionList.map((item, i) =>
                                                        <li className="bb bw1 b--black-10 pa3 list"
                                                            key={i} {...lastChildStyle}>
                                                            <input type="checkbox" onChange={(event) => this.checkboxChanged(event, item, select, remove)} />
                                                            <span className="pl3">{item}</span>
                                                        </li>)
                                                }
                                            </ul>
                                            <div className="flex items-bottom pa4 bt bw1 b--black-10 justify-between">
                                                <div className="f6 self-start" onClick={() => { selectAll() }}> Select All </div>
                                                <div className="f6 self-end" onClick={() => { removeAll() }}> Clear list </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }} />

                <div className="pa5"> second type </div>
                <List
                    selectionList={this.state.lessonList}>
                    {(selectionList, selected, select, remove) => {

                        return (<Fragment>
                            <div>
                                {
                                    selectionList.map((item, i) =>
                                        <button onClick={() => select(item)} key={i}> {item} </button>)
                                }
                            </div>
                            <div>
                                {
                                    selected.map((item, i) =>
                                        <button onClick={() => { remove(item) }} key={i}> {item} </button>)
                                }
                            </div>
                        </Fragment>);
                    }
                    }
                </List>
            </div>)
    }
}
