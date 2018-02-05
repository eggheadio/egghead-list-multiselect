import React from 'react'
import {isUndefined} from 'lodash'

const ContentCardProgress = ({watched_count, lesson_count}) => {
  const width = isUndefined(watched_count)
    ? 0
    : Math.round(watched_count / lesson_count * 100)
  return (
    <div className="w-100 bg-black-10 relative">
      <div
        className="pv1 bg-orange"
        style={{
          width: `${width}%`,
        }}
      />
    </div>
  )
}

export default ContentCardProgress
