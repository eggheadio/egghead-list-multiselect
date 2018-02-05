import React from 'react'
import {isUndefined} from 'lodash'

import {NewLessonButton} from 'components/ActionButton'

const NewLessonActionDrawer = ({item}) => {
  const {new_series_lesson_http_url} = item

  if (isUndefined(new_series_lesson_http_url)) {
    return null
  }
  return (
    <div>
      {new_series_lesson_http_url && (
        <NewLessonButton url={new_series_lesson_http_url} />
      )}
    </div>
  )
}

export default NewLessonActionDrawer
