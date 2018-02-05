import React from 'react'
import PropTypes from 'prop-types'

import TagFolder from 'components/TagFolder'
import TrackingLink from 'components/TrackingLink'
import ExternalTrackingLink from 'components/ExternalTrackingLink'
import Icon from 'components/Icon'
import LessonStateButton from 'components/LessonStateButtons'
import detailsByLessonState from 'lib/detailsByLessonState'
import DurationFavorited from '../DurationFavorited'
import ContentCardProgress from '../ContentCardProgress'
import DrawerToggle from '../DrawerToggle'
import ContentImage from '../ContentImage'
import ContentRowActionDrawer from './components/ContentRowActionDrawer'

import lessonSummary from './lib/LessonSummaryUtil'
import cn from 'classnames'
import {DropTarget, DragSource} from 'react-dnd'
import {keys, includes, isEmpty, get} from 'lodash'
import axios from 'axios'
import css from './index.scss'

const http = axios.create()

export const ItemTypes = {
  LESSON: 'lesson',
}

const lessonTarget = {
  canDrop(props) {
    const {sortable} = props
    return sortable
  },

  hover(props, monitor) {
    const {id: draggedId} = monitor.getItem()
    const overId = props.item.id

    if (draggedId !== overId) {
      const {index: overIndex} = props.findLesson(overId)
      props.moveLesson(draggedId, overIndex)
    }
  },
}

const lessonSource = {
  canDrag(props) {
    const {sortable} = props
    return sortable
  },

  beginDrag(props, monitor, component) {
    return {
      id: props.item.id,
      originalIndex: props.index,
      originalListItems: props.listItems,
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const {id, originalIndex, originalListItems} = item
    const {listItems} = props
    const didDrop = monitor.didDrop()
    if (!didDrop) {
      props.moveLesson(id, originalIndex)
    } else {
      props.updateLessons(listItems)
    }
  },
}

const SupportingInfo = ({
  state,
  label,
  isPro,
  labelColor,
  item,
  completedCount = 0,
}) => {
  const hasLessonStateButton =
    includes(keys(detailsByLessonState), state) && state !== 'published'
  if (hasLessonStateButton) {
    return <LessonStateButton state={state} />
  } else {
    return (
      <div className="mt2">
        {completedCount > 0 ? (
          <span
            className={`${labelColor || 'blue'} b tracked ttu mr3`}
            style={{fontSize: '12px'}}
          >
            {`${completedCount}/${item.published_lesson_count} completed`}
          </span>
        ) : (
          <span
            className={`${labelColor || 'blue'} b tracked ttu mr3`}
            style={{fontSize: '12px'}}
          >
            {item.state === 'published' && (
              <span>
                {isPro ? 'Pro' : 'Free'} {label}
              </span>
            )}
          </span>
        )}
        <span className="dark-gray">{lessonSummary(item)}</span>
      </div>
    )
  }
}

const ToggleArea = ({...props}) => {
  const {
    showToggleForCourseCard,
    showToggleForLessonCard,
    toggleHandler,
    expanded,
    hover,
    isLesson,
  } = props

  if (showToggleForCourseCard || showToggleForLessonCard) {
    return (
      <div className="flex flex-column self-stretch">
        <DrawerToggle
          onClickHandler={toggleHandler}
          expanded={expanded}
          hover={hover}
        />
      </div>
    )
  }

  if (isLesson) {
    return <div />
  } else {
    return <div className="w-100 w2-ns" />
  }
}

@DropTarget(
  props => props.label.toLowerCase(),
  lessonTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
@DragSource(
  props => props.label.toLowerCase(),
  lessonSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)
class ContentListCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
      expanded: false,
      content_list: [],
    }

    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  setIsHoveredState(isHovered) {
    this.setState({isHovered})
  }

  toggleExpanded(evt) {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  targetHasClickHandler(event) {
    let el = event.target
    while (el) {
      if (el.getAttribute('data-click-handler')) {
        return true
      }
      el = el.parentElement
    }
    return false
  }

  render() {
    const {
      title,
      instructorAvatarUrl,
      instructorName,
      instructorUrl,
      duration,
      contentUrl,
      path,
      smallIconUrl,
      illustrationUrl,
      label,
      labelColor,
      slug,
      tag,
      tagUrl,
      favorited,
      id,
      completed,
      handleContentFavorited,
      currentUser,
      rowSpacing,
      progress,
      new_series_lesson_url,
      index,
      key,
      showItemNumbers,
      listItems,
      item,
      sublist,
      connectDragSource,
      connectDropTarget,
      sortable,
      edit_series_http_url,
      isPro,
    } = this.props

    const {state, lessons, lessons_url, instructor, edit_lesson_http_url} = item
    const {isHovered, expanded, content_list} = this.state

    const isLesson = label.toLowerCase() === 'lesson'
    const showCardProgress = progress && progress.completed_lesson_count > 0
    const hasLessonStateButton = includes(keys(detailsByLessonState), state)

    const showToggleForCourseCard =
      (lessons && !isEmpty(content_list)) || lessons_url || edit_series_http_url
    const showToggleForLessonCard = isLesson && edit_lesson_http_url
    const showHandle = sortable

    const stdWrapperClasses = `
      w-100
      flex
      flex-column flex-row-ns
      items-center
      relative
      ${css.rowWrapper}
      ${css.wrapperHoverStyles}
    `

    const cardBodyClasses =
      'flex items-center flex-column flex-grow-1 self-stretch'
    const cardContentClasses = `w-100 h-100 flex flex-column flex-row-ns flex-grow-1 flex-grow-0-ns
                            no-underline justify-between justify-start-ns black avenir relative z-2 pb0 pl3-ns pr4-ns ${
                              css.innerContent
                            } ${completed && !isHovered ? 'o-60' : ''}`

    const imgTitleClasses = `flex flex-row items-center justify-left flex-shrink-0 flex-grow-1 flex-shrink-1-ns base pb2 ${
      sublist ? 'ml2' : 'ml3'
    } ml0-ns pb0-ns no-underline`

    const titleSectionClasses = 'flex flex-column flex-grow-1 ph3'
    const titleClasses =
      'base no-underline db pl0 tl f4 fw5 avenir pointer lh-title relative'
    const courseTitleClasses = css.title

    const rowSpacingClasses = rowSpacing ? 'mt3' : ''
    const borderClasses = !rowSpacing ? css.cardBorder : ''
    const borderRadiusClasses =
      sublist || (!sublist && !rowSpacing) ? 'br0' : 'br2'
    const shadowClasses = !sublist ? css.cardShadow : ''

    return connectDropTarget(
      <div
        key={key}
        className={`
          overflow-hidden
          b--gray-secondary
          ${rowSpacingClasses}
          ${borderClasses}
          ${borderRadiusClasses} ${!sublist && css.cardBorderRadius}
          ${shadowClasses}
        `}
      >
        <div
          className={`${stdWrapperClasses} ${
            sublist ? 'bg-light-gray' : 'bg-white hover-bg-gray'
          }`}
        >
          <TrackingLink
            id={slug}
            to={{
              pathname: path,
              state: {item},
            }}
            className={`flex h-100 absolute top-0 right-0 bottom-0 left-0`}
            onMouseEnter={() => !sortable && this.setIsHoveredState(true)}
            onMouseLeave={() => !sortable && this.setIsHoveredState(false)}
            track={`clicked ${label.toLowerCase()} content list item`}
            trackParams={{[label.toLowerCase()]: slug}}
            sortable={sortable}
            style={{pointerEvents: 'all'}}
          />

          <div className={cardBodyClasses}>
            <div className={cardContentClasses} style={{height: 'auto'}}>
              <div className={imgTitleClasses} style={{zIndex: '69'}}>
                {connectDragSource(
                  <div
                    className="flex items-center"
                    style={{
                      pointerEvents: 'all',
                      cursor: `${sortable ? 'ns-resize' : 'auto'}`,
                    }}
                  >
                    {showHandle && (
                      <div className={`barsSection dn flex-ns`}>
                        <Icon
                          type="bars"
                          color="dark-gray-secondary"
                          size="5"
                        />
                      </div>
                    )}

                    <div
                      className={`${
                        sublist ? 'flex' : css.contentIconContainer
                      }`}
                    >
                      <ContentImage
                        smallIconUrl={smallIconUrl}
                        labelColor={labelColor}
                        illustrationUrl={illustrationUrl}
                        isHovered={isHovered}
                        completed={completed}
                        size={isLesson ? '24' : '60'}
                        subCard={sublist}
                      />
                    </div>

                    {sortable &&
                      showItemNumbers && (
                        <div
                          className={`dn flex-ns dark-gray ${css.orderNumber}`}
                        >{`${index + 1}`}</div>
                      )}
                  </div>,
                )}

                <div className={titleSectionClasses}>
                  <TrackingLink
                    to={{
                      pathname: path,
                      state: {item},
                    }}
                    className={`${
                      isLesson ? 'mb2 mb0-ns' : courseTitleClasses
                    } ${titleClasses}`}
                    data-click-handler="true"
                    track={`clicked ${label.toLowerCase()} content list item`}
                    trackParams={{
                      element: 'title',
                      [label.toLowerCase()]: slug,
                    }}
                    style={{pointerEvents: 'all'}}
                  >
                    {title}
                  </TrackingLink>

                  <SupportingInfo
                    isPro={isPro}
                    state={state}
                    label={label}
                    labelColor={labelColor}
                    item={item}
                    completedCount={get(progress, 'completed_lesson_count', 0)}
                  />
                </div>
              </div>
              <div
                className={`
                pv2
                pv0-ns
                flex
                flex-row
                w-100
                ${css.infoRow}
              `}
              >
                <ExternalTrackingLink
                  href={instructorUrl}
                  className={cn(
                    `w-100-ns tl flex items-center dark-gray hover-blue overflow-hidden no-underline self-center ${
                      css.instructor
                    }`,
                    css.pointerEventsOn,
                  )}
                  data-click-handler="true"
                  track={`clicked ${label.toLowerCase()} content list item`}
                  trackParams={{
                    element: 'instructor',
                    [label.toLowerCase()]: slug,
                  }}
                  onMouseEnter={() => this.setIsHoveredState(true)}
                >
                  <img
                    src={instructorAvatarUrl}
                    role="presentation"
                    className={`br-100 ${css.instructorAvatar}`}
                  />
                  <span
                    className={`mh2 sans-serif underline ${css.instructorName}`}
                  >
                    {instructorName}
                  </span>
                </ExternalTrackingLink>

                <div className="w-75-ns flex-shrink-0 flex-shrink-1-ns base pl3 flex flex-row flex-column-ns overflow-hidden items-left justify-center">
                  <div
                    className={cn('flex flex-column-ns', css.pointerEventsOn)}
                    onMouseEnter={() => this.setIsHoveredState(true)}
                  >
                    <div className="flex flex-column self-end">
                      <DurationFavorited
                        hover={isHovered}
                        duration={duration}
                        favorited={favorited}
                        completed={completed}
                        lesson_id={id}
                        handleContentFavorited={handleContentFavorited}
                        currentUser={currentUser}
                      />
                      <TagFolder
                        tag={tag}
                        tagUrl={tagUrl}
                        extraClasses="dn flex-ns"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showCardProgress &&
              item.published_lesson_count > 0 && (
                <ContentCardProgress
                  watched_count={progress.completed_lesson_count}
                  lesson_count={item.published_lesson_count}
                />
              )}
          </div>

          <ToggleArea
            showToggleForCourseCard={showToggleForCourseCard}
            showToggleForLessonCard={showToggleForLessonCard}
            toggleHandler={this.toggleExpanded}
            expanded={expanded}
            hover={isHovered}
            isLesson={isLesson}
          />
        </div>

        <ContentRowActionDrawer
          expanded={expanded}
          showLessonList={showToggleForCourseCard || showToggleForLessonCard}
          item={item}
          new_series_lesson_url={new_series_lesson_url}
          edit_series_http_url={edit_series_http_url}
        />
      </div>,
    )
  }
}

ContentListCard.propTypes = {
  completed: PropTypes.bool,
  smallIconUrl: PropTypes.string,
  labelColor: PropTypes.string,
  illustrationUrl: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  instructorAvatarUrl: PropTypes.string,
  instructorName: PropTypes.string,
  duration: PropTypes.number,
  path: PropTypes.string,
  lessons: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tag: PropTypes.string,
  rowSpacing: PropTypes.bool,
  showProgress: PropTypes.bool,
}

export default ContentListCard
