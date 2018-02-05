import React from 'react'
import _ from 'lodash'
import ContentCard from 'components/ContentCard'
import convertToItem from 'lib/convertToItem'

function createGridFromArray(lessons, courses) {
  lessons = _.map(lessons, convertToItem)
  courses = _.map(courses, convertToItem)

  return [
    [lessons[0], lessons[1]],
    [courses[0]],
    [lessons[2], lessons[3]],
    [courses[1]],
  ]
}

const GridItem = ({item}) => (
  <div key={item.slug} className="pa2">
    <ContentCard {...item} />
  </div>
)

const GridColumn = ({column}) => (
  <div className="flex flex-column w-100 w-50-m w-25-l">
    {column.map(item => <GridItem key={item.title} item={item} />)}
  </div>
)

const CardGrid2121 = ({lessons, courses}) => (
  <div className="center flex flex-wrap ph2-ns">
    {createGridFromArray(lessons, courses).map((column, index) => (
      <GridColumn column={column} key={index} />
    ))}
  </div>
)

export default CardGrid2121
