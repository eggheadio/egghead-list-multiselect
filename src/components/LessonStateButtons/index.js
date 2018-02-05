import React from 'react'
import Icon from 'components/Icon'
import {isUndefined} from 'lodash'
import css from './index.scss'

import detailsByLessonState from 'lib/detailsByLessonState'

const ColorLabel = ({text, color}) => {
  const colorClasses = color === 'white' ? 'ba bw1 black' : `white bg-${color}`
  return (
    <span
      className={`f6 b no-underline br-pill mb2 mb0-ns ph3 pv2 dib ttu dib ${
        colorClasses
      }`}
      href="#"
    >
      {text}
    </span>
  )
}

const LessonStateButton = ({
  state,
  showIcon = false,
  showLabel = false,
  showDescription = true,
  url,
  onClick,
}) => {
  if (isUndefined(detailsByLessonState[state])) {
    return <div />
  }

  return (
    <a
      href={url}
      onClick={onClick}
      className={`no-underline f6 mt2 ${css.lessonStateButton}`}
    >
      <div className="flex items-center">
        {/* Keep below commented out if we will need more statuses in the future */}
        {/* <div className='mr2'>
          {showIcon && detailsByLessonState[state]['icon']}
        </div> */}
        {showLabel && (
          <div className="mr2">
            <ColorLabel
              text={detailsByLessonState[state]['label']}
              color={detailsByLessonState[state]['color']}
            />
          </div>
        )}
        <span className="no-underline helvetica dark-gray">
          {showDescription && detailsByLessonState[state]['description']}
        </span>
      </div>
    </a>
  )
}

export default LessonStateButton
