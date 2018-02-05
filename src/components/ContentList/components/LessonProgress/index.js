import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {isUndefined} from 'lodash'

// import css from '../ContentListCard/index.scss';

class LessonProgress extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {lessons, onClickHandler, expanded, isHovered, progress} = this.props
    if (!lessons) {
      return null
    }

    const total = lessons.length

    const classes = 'ph3 f5 tl fw5 dark-gray overflow-hidden'

    return (
      <div
        className={cn(
          'flex flex-row items-center pointer',
          css.pointerEventsOn,
        )}
        data-click-handler="true"
        onClick={onClickHandler}
        onMouseEnter={this.props.onMouseEnter}
        style={{height: '1.5rem'}}
      >
        {isUndefined(progress) ? (
          <div className={classes}>{lessons.length} lessons</div>
        ) : (
          <div className={`${classes} flex flex-row items-center`}>
            {progress.completed_lesson_count}/{total} lessons
          </div>
        )}
      </div>
    )
  }
}

LessonProgress.propTypes = {
  lessons: PropTypes.array,
  onClickHandler: PropTypes.func,
  expanded: PropTypes.bool,
  isHovered: PropTypes.bool,
}

export default LessonProgress
