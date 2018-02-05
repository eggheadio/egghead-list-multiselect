import React from 'react'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Code from 'components/form/fields/Code'
import {inject, observer} from 'mobx-react'

const AddCodeStep = ({quickLessonWizardStore}) => (
  <div>
    <div className="pa3 f9">
      <h3>{quickLessonWizardStore.lesson.title}</h3>
      <p>
        You can paste a code embed URL or configure the Github attributes for
        your lesson.
      </p>
    </div>
    <div className="bg-white-secondary pa4">
      <Code lesson={quickLessonWizardStore.lesson} />
    </div>
    <div className="flex flex-column flex-row-ns justify-end  pa4">
      <div className="flex flex-column mb2 mb0-ns pr3">
        <Button
          outline
          color="red"
          onClick={e => {
            e.preventDefault()
            quickLessonWizardStore.closeWizard()
          }}
          disabled={quickLessonWizardStore.isSaving}
        >
          Close
        </Button>
      </div>

      <div className="flex flex-column mb0-ns">
        <Button
          color="green"
          onClick={() => {
            quickLessonWizardStore.saveLesson().then(() => {
              quickLessonWizardStore.setSelectedStep(4)
            })
          }}
          disabled={quickLessonWizardStore.isSaving}
        >
          Save & Add Tags
        </Button>
      </div>
    </div>
    {quickLessonWizardStore.notice && (
      <div className="w-100 pa2 tr">{quickLessonWizardStore.notice}</div>
    )}
  </div>
)

export default inject('quickLessonWizardStore')(observer(AddCodeStep))
