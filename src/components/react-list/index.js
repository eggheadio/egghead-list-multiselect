import React, { Component, Fragment } from 'react'

export default class List extends Component {

    state = {
        selected: [],
        selectionList: [],
    }

    componentWillMount = () => {
        const { selectionList } = this.props;

        this.setState({
            selectionList: selectionList
        })
    }

    componentWillReceiveProps = (nextProps) => {
        const { selectionList } = this.props;

        this.setState({
            selectionList: selectionList
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.state === nextState && this.props === this.nextProps) return false;
        return true;
    }



    select = (obj) => {
        console.log(obj);
        // check if the selection exists in the selectionList 
        // if it exists then add it to the selected List
        if (this.state.selectionList.indexOf(obj) >= 0) {
            this.setState({
                selected: [...this.state.selected, obj]
            });
        }
    }

    remove = (obj, index) => {
        console.log(obj);
        // check if the selection exists in the selected list 
        // if it exists then remove it from selected
        const indexInSelected = this.state.selected.indexOf(obj);
        if (indexInSelected >= 0) {
            const frontArrayPart = this.state.selected.slice(0, index)
            const backArrayPart = this.state.selected.slice(index + 1, this.state.selected.length)
            this.setState({
                selected: [...frontArrayPart, ...backArrayPart]
            });
        }
    }



    render() {

        const {
            render
        } = this.props;

        return (
            <Fragment>
                {render(this.state.selectionList, this.state.selected, this.select, this.remove)}
            </Fragment>
        )
    }
}
