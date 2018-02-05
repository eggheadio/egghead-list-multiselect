import React from 'react'
import PropTypes from 'prop-types'
import CardList from '../CardList'
import CardInfo from '../CardInfo'
import css from './index.scss'
import {get} from 'lodash'
import convertToItem from 'lib/convertToItem'

const HorizontalListCard = props => {
  const {labelColor, label} = props

  return (
    <div
      className={`bg-white br2 flex black-90 overflow-hidden ${css.container}`}
    >
      <div style={{width: '280px'}}>
        <CardInfo {...convertToItem(props.playlist)} />
      </div>

      <CardList playlist={props.playlist} />
    </div>
  )
}

export default HorizontalListCard
