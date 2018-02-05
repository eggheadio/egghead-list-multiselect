import React from 'react'
import PropTypes from 'prop-types'
import ContentListCard, {ItemTypes} from './components/ContentListCard'
import axios from 'axios'
import convertToItem from 'lib/convertToItem'
import {DropTarget, DragDropContext, DragSource} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
  isEmpty,
  isUndefined,
  map,
  reduce,
  isEqual,
  find,
  compact,
  isFunction,
} from 'lodash'
import Dots from 'components/Loading/Dots'
import ContentListStore from './state/contentListStore'
import {Provider, observer} from 'mobx-react'
import {toJS} from 'mobx'
import move from 'lib/move'
import sortBy from 'sort-by'

const http = axios.create()

const lessonContainerTarget = {
  drop(props, monitor) {},
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.LESSON, lessonContainerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
@observer
class ContentList extends React.Component {
  static propTypes = {
    content_list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    rowSpacing: PropTypes.bool,
    showProgress: PropTypes.bool,
    paginate: PropTypes.bool,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.moveLesson = this.moveLesson.bind(this)
    this.findLesson = this.findLesson.bind(this)
    this.contentListStore = new ContentListStore(props.content_list)
    props.url && this.contentListStore.loadItems(props.url)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.paginate ||
      nextProps.content_list !== this.props.content_list
    ) {
      this.contentListStore.setItems(nextProps.content_list)
    }
  }

  handleContentFavorited = item_id => {
    const {items, setItems} = this.contentListStore
    const item = find(items, {slug: item_id})

    http
      .post(`/api/v1/lessons/${item.slug}/favorites/toggle`)
      .then(({data}) => {
        const replaceItemIfFound = (acc, item) =>
          acc.concat(data.slug === item.slug ? data : item)
        const newContent = reduce(items, replaceItemIfFound, [])
        setItems(newContent)
      })
  }

  findLesson(id) {
    const {items} = this.contentListStore
    const item = items.filter(l => l.id === id)[0]

    return {
      item,
      index: items.indexOf(item),
    }
  }

  moveLesson(id, originalIndex) {
    const {index} = this.findLesson(id)
    const {items, setItems} = this.contentListStore
    setItems(move(toJS(items), originalIndex, index))
  }

  sortedItems = () => {
    const {items} = this.contentListStore
    const {
      sortable,
      sort = sortBy('series_row_order', '-updated_at'),
    } = this.props

    if (!sortable && sort) {
      return map(compact(toJS(items.sort(sort))), convertToItem)
    }

    return map(items, convertToItem)
  }

  render() {
    const {items} = this.contentListStore
    const {
      sortable,
      currentUser,
      rowSpacing,
      showProgress,
      showItemNumbers,
      sublist,
      connectDropTarget,
    } = this.props

    const listItems = this.sortedItems()

    const sectionClasses = rowSpacing ? 'mh3 mh0-ns' : ''

    return (
      <Provider contentListStore={this.contentListStore}>
        {connectDropTarget(
          <div className={sectionClasses}>
            {sublist &&
              isEmpty(items) && (
                <div className="bg-white-secondary">
                  <Dots />
                </div>
              )}
            {map(listItems, (item, index) => {
              return (
                <ContentListCard
                  key={item.id}
                  handleContentFavorited={this.handleContentFavorited}
                  currentUser={currentUser}
                  showItemNumbers={showItemNumbers}
                  index={index}
                  sublist={sublist}
                  sortable={sortable}
                  updateLessons={this.contentListStore.updateLessons}
                  moveLesson={this.moveLesson}
                  findLesson={this.findLesson}
                  listItems={listItems}
                  rowSpacing={rowSpacing}
                  {...item}
                />
              )
            })}
          </div>,
        )}
      </Provider>
    )
  }
}

export default ContentList
