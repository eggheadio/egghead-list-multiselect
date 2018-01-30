import React, { Component, Fragment } from 'react'
import List from "components/react-list";

export default class Test extends Component {


    render() {

        const list = ["akash", "joel", "vojta", "taylor", "evgeniy"]

        return (
            <div>
                <List
                    selectionList={list}
                    render={
                        (selectionList, selected, select, remove) => {

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
                    } />
            </div>
        )
    }
}
