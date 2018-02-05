import React from 'react'
import {map} from 'lodash'
import convertToItem from 'lib/convertToItem'
import StaticContentListItem from './components/StaticContentListItem'

const StaticContentList = ({content_list}) => {
  const listItems = map(content_list, convertToItem)

  return (
    <div>
      {map(listItems, item => (
        <div key={item.id}>
          <StaticContentListItem {...item} />
        </div>
      ))}
    </div>
  )
}

export default StaticContentList
