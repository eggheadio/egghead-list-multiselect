import React from 'react'
import Button from 'components/Button'
import Icon from 'components/Icon'
import {inject, observer} from 'mobx-react'

import ItemTagging from 'components/ItemTagging'

const TagLessonStep = ({quickLessonWizardStore}) => (
  <div>
    <div className="bg-white-secondary pa4">
      <ItemTagging
        item={quickLessonWizardStore.lesson}
        onUpdate={patch =>
          quickLessonWizardStore
            .updateLesson(patch)
            .then(quickLessonWizardStore.saveLesson)
        }
      />
    </div>
    <div className="flex flex-column flex-row-ns justify-end pa4">
      <div className="flex flex-column mb2 mb0-ns pr3">
        <Button
          outline
          color="red"
          onClick={e => {
            e.preventDefault()
            quickLessonWizardStore.closeWizard()
          }}
        >
          Close
        </Button>
      </div>
    </div>
    {quickLessonWizardStore.notice && (
      <div className="w-100 pa2 tr">{quickLessonWizardStore.notice}</div>
    )}
  </div>
)

export default inject('quickLessonWizardStore')(observer(TagLessonStep))
