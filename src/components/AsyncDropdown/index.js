import React, {Component} from 'react'
import {Div} from 'glamorous'
import {css} from 'glamor'
import Downshift from 'downshift'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import get from 'lodash/get'
import {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  Avatar,
} from './components'

function EggSelector({
  itemToString,
  itemToImageUrl,
  items,
  placeholder,
  ...rest
}) {
  return (
    <Downshift itemToString={itemToString} {...rest}>
      {({
        getLabelProps,
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div className={css({width: '100%', margin: 'auto'})}>
          <Div position="relative">
            <Input
              {...getInputProps({
                isOpen,
                placeholder,
              })}
            />
            {selectedItem ? (
              <ControllerButton
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </Div>
          {!isOpen ? null : (
            <Menu>
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  <Avatar src={itemToImageUrl(item)} /> {itemToString(item)}
                </Item>
              ))}
            </Menu>
          )}
        </div>
      )}
    </Downshift>
  )
}

class AsyncDropdown extends React.Component {
  state = {items: []}

  componentDidMount() {
    const {selected, items = [], updateItem} = this.props

    if (selected) {
      this.setState({selectedItem: selected, items})
      updateItem(selected)
    }
  }

  handleStateChange = debounce((changes, downshiftState) => {
    const {getDataUrl} = this.props
    if (changes.hasOwnProperty('inputValue')) {
      getDataUrl(changes['inputValue']).then(items => this.setState({items}))
    }
  }, 250)

  handleChange = (selectedItem, downshiftState) => {
    const {updateItem} = this.props
    if (updateItem) updateItem(selectedItem)
  }

  render() {
    const {itemLabelProp, itemImageUrlProp, placeholder} = this.props
    return (
      <Div
        css={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <EggSelector
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          items={this.state.items}
          selectedItem={this.state.selectedItem}
          itemToString={i => get(i, itemLabelProp, '')}
          itemToImageUrl={i => get(i, itemImageUrlProp, '')}
          placeholder={placeholder}
        />
      </Div>
    )
  }
}

export default AsyncDropdown
