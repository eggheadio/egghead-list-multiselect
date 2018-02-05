import React from 'react'
import ContentActions from 'components/ContentActions'
import {observer, inject} from 'mobx-react'

import NewLessonActionDrawer from '../NewLessonActionDrawer'
import ActionButton from '../ContentListActionButton'
import {NewLessonButton} from 'components/ActionButton'
import {ACTION} from 'lib/itemToActions'

import css from './index.scss'

export const ActionDrawer = inject('contentListStore')(
  observer(({contentListStore, item}) => {
    const {edit_lesson_http_url, edit_series_http_url} = item

    const itemType = edit_lesson_http_url
      ? 'lesson'
      : edit_series_http_url ? 'course' : 'item'

    return (
      <div className={`flex bt bb b--gray-secondary ${css.actionDrawer}`}>
        <div className="flex flex-grow-1 justify-end bg-white-secondary b--gray-secondary">
          <ContentActions
            item={item}
            updateContent={contentListStore.updateItem}
          >
            {({actions}) => (
              <div className="flex justify-center items-center h-100">
                <NewLessonActionDrawer item={item} />
                {(edit_lesson_http_url || edit_series_http_url) && (
                  <div className="flex justify-center items-center h-100">
                    <ActionButton
                      item={item}
                      execute={contentListStore.toggleTagDrawer}
                      {...{
                        label: 'Tag',
                        icon: 'tag',
                        color: 'black',
                      }}
                    />
                  </div>
                )}
                {actions.map(action => (
                  <ActionButton key={action.label} {...action} />
                ))}
              </div>
            )}
          </ContentActions>
        </div>
      </div>
    )
  }),
)
