import React from 'react'
import {take, get} from 'lodash'
import ContentCard from 'components/ContentCard'
import convertToItem from 'lib/convertToItem'
import {isEmpty} from 'lodash'
import Dots from 'components/Loading/Dots'

const createGridFromArray = content => {
  return [[content[0], content[1]], [content[2], content[3]]]
}

const CardGrid = ({items}) => {
  return (
    <div className="flex ph5-m">
      {createGridFromArray(items).map((columns, index) => (
        <div className="w-50" key={index}>
          {columns.map(item => {
            return (
              <div className="pa2" key={item.slug}>
                <ContentCard {...convertToItem(item)} key={item.slug} />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const CardGrid22 = ({items}) => {
  if (isEmpty(items)) {
    return <Dots />
  }

  return (
    <div className="dn db-ns">
      <CardGrid items={take(items, 4)} />
    </div>
  )
}

export default CardGrid22
