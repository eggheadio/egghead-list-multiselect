import React from 'react'
import _ from 'lodash'
import ContentCard from 'components/ContentCard'
import convertToItem from 'lib/convertToItem'

function createColumns(items, count = 2) {
  return items.reduce((itemGrid, item, index) => {
    const ix = Math.floor(index / count)

    if (!itemGrid[ix]) {
      itemGrid[ix] = []
    }

    itemGrid[ix].push(item)

    return itemGrid
  }, [])
}

function createGridFromArray(items) {
  return createColumns(_.map(items, convertToItem))
}

const CardGrid2222 = ({items}) => (
  <div className="center flex flex-wrap ph2-ns">
    {createGridFromArray(items).map((lessons, index) => (
      <div key={index} className="flex flex-column w-100 w-50-m w-25-l">
        {lessons.map(lesson => (
          <div key={lesson.slug} className="pa2">
            <ContentCard {...lesson} key={lesson.slug} />
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default CardGrid2222
