import React from 'react'
import Select from 'react-select'
import {map} from 'lodash'

class Dropdown extends React.Component {
  state = {
    activeItem: {value: '', label: ''},
  }

  setActiveItem = item => {
    this.setState({activeItem: item}, this.props.onSelect(item.value))
  }

  render() {
    const {activeItem} = this.state
    const {title, items} = this.props
    return (
      <div className="bg-white br3 pb1 shadow-1">
        <div className="bg-gray pa3 black br3 br--top bb b--gray-secondary">
          <h3 className="ma0 fw5">{title}</h3>
        </div>
        <div className="h2 ph3 mv4">
          <Select
            value={activeItem}
            valueKey="name"
            labelKey="label"
            resetValue=""
            options={map(items, item => ({value: item, label: item}))}
            onChange={item => {
              this.setActiveItem(item)
            }}
          />
        </div>
      </div>
    )
  }
}

export default Dropdown
