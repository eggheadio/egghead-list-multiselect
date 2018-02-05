import React from 'react'
import {isUndefined, toString, mapValues} from 'lodash'
import ContentList from 'components/ContentList'
import ItemTagging from 'components/ItemTagging'
import {ActionDrawer} from '../../ActionDrawer'
import {inject, observer} from 'mobx-react'

@inject('contentListStore')
@observer
export default class ContentRowActionDrawer extends React.Component {
  render() {
    const {
      expanded,
      showLessonList,
      item,
      new_series_lesson_url,
      edit_series_http_url,
    } = this.props

    const {tagDrawerOpen, saveItem, updateItem} = this.props.contentListStore

    const canSort = !isUndefined(item.edit_series_http_url)

    if (expanded) {
      return (
        <div>
          <ActionDrawer item={item} />
          {tagDrawerOpen && (
            <div className="bg-white-secondary pa4">
              <ItemTagging
                item={item}
                onUpdate={patch => {
                  const contentIsCourse = !isUndefined(item.square_cover_url)
                  saveItem(
                    {
                      [contentIsCourse ? 'series' : 'lesson']: {
                        ...mapValues(patch, toString),
                      },
                    },
                    item.url,
                  ).then(updateItem)
                }}
              />
            </div>
          )}
          {expanded &&
            showLessonList &&
            (item.lessons || item.lessons_url) && (
              <div>
                <ContentList
                  url={item.lessons_url}
                  new_series_lesson_url={new_series_lesson_url}
                  edit_series_http_url={edit_series_http_url}
                  sortable={canSort}
                  showItemNumbers
                  sublist={true}
                />
              </div>
            )}
        </div>
      )
    }

    return <div />
  }
}
