import React from 'react'
import _ from 'lodash'
import ContentCard from 'components/ContentCard'
import {get} from 'lodash'
import convertToItem from 'lib/convertToItem'

function createGridFromArray(lessons, courses) {
  lessons = _.map(lessons, convertToItem)
  courses = _.map(courses, convertToItem)

  return [
    [courses[0], lessons[0]],
    [lessons[1], lessons[2], lessons[3]],
    [lessons[4], courses[1]],
    [courses[2], lessons[5]],
  ]
}

const CardGrid2322 = ({lessons, courses}) => (
  <div className="center flex flex-wrap ph2-ns">
    {createGridFromArray(lessons, courses).map((columns, index) => (
      <div key={index} className="flex flex-column w-100 w-50-m w-25-l">
        {columns.map(item => (
          <div key={item.slug} className="pa2">
            <ContentCard {...item} />
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default CardGrid2322
