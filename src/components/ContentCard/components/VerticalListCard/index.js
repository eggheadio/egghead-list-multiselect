import React from 'react'
import PropTypes from 'prop-types'
import CardList from '../CardList'
import CardInfo from '../CardInfo'
import {get} from 'lodash'
import convertToItem from 'lib/convertToItem'

const VerticalListCard = props => {
  const containerStyle = {width: '280px'}
  const {labelColor, label} = props

  return (
    <div
      className="bg-white br2 flex flex-grow-1 justify-between flex-column black-90 overflow-hidden"
      style={containerStyle}
    >
      <CardList playlist={props.playlist} height="200px" />

      <CardInfo {...convertToItem(props.playlist)} />
    </div>
  )
}

export default VerticalListCard
