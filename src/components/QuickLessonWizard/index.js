import React from 'react'

import Steps from 'components/Steps'
import Button from 'components/Button'
import TitleAndSummaryStep from './components/TitleAndSummaryStep'
import UploadVideoStep from './components/UploadVideoStep'
import AddCodeStep from './components/AddCodeStep'
import TagLessonStep from './components/TagLessonStep'
import {Provider, observer, inject} from 'mobx-react'
import QuickLessonWizardStore from './QuickLessonWizardStore'
import Modal from 'react-modal'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'

@inject('currentUserStore')
@observer
class QuickLessonWizard extends React.Component {
  constructor(props) {
    super(props)
    this.quickLessonWizardStore = new QuickLessonWizardStore(
      props.currentUserStore.currentUser,
      props.onUpdate,
      props.onClose,
      props.courses,
      props.lesson || undefined,
    )
    const parsed = queryString.parse(props.location.search)
    if (parsed.upload) {
      this.quickLessonWizardStore.setSelectedStep(2)
    }
  }
  componentDidMount() {
    const parsed = queryString.parse(location.search)
    if (parsed.upload) {
      this.quickLessonWizardStore.setSelectedStep(2)
    }
  }
  render() {
    return (
      <Provider quickLessonWizardStore={this.quickLessonWizardStore}>
        <div>
          <Steps
            selectedStep={this.quickLessonWizardStore.selectedStep}
            handleSelect={this.quickLessonWizardStore.setSelectedStep}
            steps={[
              {
                title: 'Title & Summary',
                enabled: true,
                component: <TitleAndSummaryStep />,
              },
              {
                title: 'Upload video',
                enabled: this.quickLessonWizardStore.canUpload,
                component: <UploadVideoStep />,
              },
              {
                title: 'Add code',
                enabled: this.quickLessonWizardStore.canEdit,
                component: <AddCodeStep />,
              },
              {
                title: 'Tag lesson',
                enabled: this.quickLessonWizardStore.canEdit,
                component: <TagLessonStep />,
              },
            ]}
          />
        </div>
      </Provider>
    )
  }
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    padding: '0',
    border: '1px solid #000',
  },
  overlay: {
    zIndex: 999,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(1px)',
  },
}

export default withRouter(QuickLessonWizard)
