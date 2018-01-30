import React, { Component, Fragment } from 'react'
import List from "components/react-list";
import { isFunction } from "lodash";
import { css } from "glamor"


const box = css({
    height: "16px",
    width: "16px"
})

const rowHeight = css({
    height: "3em"
})

const placeHolderStyle = css({
    "::placeholder": {
        color: "#aaa",
        fontSize: ".6em",
        paddingLeft: "1em",
        alignItem: "center",
        display: "flex"
    }
})

export default class LessonSelector extends Component {

    state = {
        lessonList: ["akash", "joel", "vojta", "taylor", "evgeniy"]
    }

    checkboxChanged = (event, object, index, select, remove) => {
        console.log(event.target.checked);
        if (event.target.checked === true) {
            select(object)
        } else {
            remove(object, index)
        }
    }


    render() {

        return (
            <div className="pa5 flex flex-column items-center eh-mw9 bg-white-secondary">
                <List
                    selectionList={this.state.lessonList}
                    render={
                        (selectionList, selected, select, remove) => {

                            return (

                                <div className="bg-white br2 shadow-1 flex w-100">

                                    <div className="flex flex-column br bw1 b--black-10 w-50">
                                        <div
                                            className="flex items-center pa3 f3 black avenir bb bw1 b--black-10"
                                            {...rowHeight}>
                                            Prerequisite Content
                                            </div>
                                        {
                                            selected.map((item, i) =>
                                                <div className="bb bw1 b--black-10 pa3 flex items-cneter"
                                                    key={i}>
                                                    <div className="dib ba bw1 b--blue br2 bg-light-blue" onClick={() => { remove(item, i) }} {...box}>

                                                    </div>
                                                    <span className="pl3">{item}</span>
                                                </div>)
                                        }
                                        <div className="items-bottom pv4 ph3">
                                            clear list
                                    </div>
                                    </div>
                                    <div className="flex flex-column bg-light-gray w-50">
                                        <div className="pa2 bb bw1 b--black-10 items-center">
                                            <input type="text" className="block ma2 f2 black avenir w-90 br2 ba bw1 b--black-10 flex"
                                                placeholder="place holder"{...placeHolderStyle} />
                                        </div>
                                        {
                                            selectionList.map((item, i) =>
                                                <div className="bb bw1 b--black-10 pa3"
                                                    key={i}>
                                                    <input type="checkbox" onChange={(event) => this.checkboxChanged(event, item, i, select, remove)} />
                                                    <span className="pl3">{item}</span>
                                                </div>)

                                        }
                                        <div className="items-bottom pv4 ph3">
                                            clear list
                                    </div>
                                    </div>

                                </div>
                            );
                        }
                    } />

                <div className="pa5"> second version</div>
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
                                        <button onClick={() => { remove(item, i) }} key={i}> {item} </button>)
                                }
                            </div>
                        </Fragment>);
                    }
                    }
                </List>
            </div>
        )
    }
}
