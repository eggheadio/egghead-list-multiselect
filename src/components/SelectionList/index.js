import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction, includes } from 'lodash'

export default class SelectionList extends Component {
    static propTypes = {
        selectionList: PropTypes.array,
        render: PropTypes.func,
        children: PropTypes.func,
    }

    state = {
        selected: [],
        selectionList: [],
    }

    componentWillMount = () => {
        const { selectionList } = this.props
        if (selectionList === undefined || selectionList === []) {
            this.setState({
                selectionList: [],
            })
        } else {
            this.setState({
                selectionList: selectionList,
            })
        }
    }

    componentWillReceiveProps = nextProps => {
        const { selectionList } = this.props

        this.setState({
            selectionList: selectionList,
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.state === nextState && this.props === this.nextProps) return false
        return true
    }

    select = obj => {
        // check if the selection exists in the selectionList
        // if it exists then add it to the selected List
        if (
            this.state.selectionList.indexOf(obj) >= 0 &&
            this.state.selected.indexOf(obj) < 0
        ) {
            this.setState({
                selected: [...this.state.selected, obj],
            })
        }
    }
    selectAll = () => {
        this.setState({
            selected: [...this.state.selectionList],
        })
    }

    remove = obj => {
        // check if the selection exists in the selected list
        // if it exists then remove it from selected
        const indexInSelected = this.state.selected.indexOf(obj)
        if (indexInSelected >= 0) {
            const frontArrayPart = this.state.selected.slice(0, indexInSelected)
            const backArrayPart = this.state.selected.slice(
                indexInSelected + 1,
                this.state.selected.length,
            )
            this.setState({
                selected: [...frontArrayPart, ...backArrayPart],
            })
        }
    }
    removeAll = () => {
        this.setState({
            selected: [],
        })
    }

    isSelected = item => {
        return includes(this.state.selected, item)
    }

    render() {
        const { render, children } = this.props

        let renderFn = render

        if (children && isFunction(children)) {
            renderFn = children
        }

        return (
            <div>
                {renderFn(
                    this.state.selectionList,
                    this.state.selected,
                    this.select,
                    this.selectAll,
                    this.remove,
                    this.removeAll,
                    this.isSelected,
                )}
            </div>
        )
    }
}
