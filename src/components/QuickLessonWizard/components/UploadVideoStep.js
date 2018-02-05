import React from 'react'
import Button from 'components/Button'

import UploadButton from './UploadButton'
import {inject, observer} from 'mobx-react'

class UploadVideoStep extends React.Component {
  state = {
    uploadStatus: 'waiting',
  }

  status = {
    waiting:
      "Your lesson can now have a video uploaded. Once it is uploaded, it may take a few minutes to process and appear on the lesson's page. Once you receive a notification that the video is processing, you can proceed to adding an embed as well as tags",
    preprocess: 'Your video is uploading.',
    progress: 'Your video is uploading.',
    uploaded: 'Your video is uploading.',
    error:
      'There was a problem uploading your video. You can wait a moment and retry, or let us know in Slack.',
    finished:
      "Your video has been uploaded successfully. You can now continue editing or close this window. If the video doesn't appear immediately please give it a few minutes. It is travelling furiously through a series of tubes",
  }

  onUploadUpdate = ({status, data}) => {
    this.setState({uploadStatus: status})
  }

  render() {
    const {quickLessonWizardStore} = this.props
    const {uploadStatus} = this.state
    const message = this.status[uploadStatus]
    const disabledButtons =
      uploadStatus === 'preprocess' || uploadStatus === 'progress'

    return (
      <div>
        <div className="pa3">
          <h3>{quickLessonWizardStore.lesson.title}</h3>
          <p>{message}</p>
        </div>
        <div className="bg-white-secondary flex flex-column justify-center items-center">
          <div className="pa5">
            <UploadButton
              onStatusUpdate={this.onUploadUpdate}
              lesson={quickLessonWizardStore.lesson}
            />
          </div>
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
              disabled={disabledButtons}
            >
              Close
            </Button>
          </div>

          <div className="flex flex-column mb0-ns">
            <Button
              color="green"
              onClick={() => quickLessonWizardStore.setSelectedStep(3)}
              disabled={disabledButtons}
            >
              Add Code
            </Button>
          </div>
        </div>
        {quickLessonWizardStore.notice && (
          <div className="w-100 pa2 tr">{quickLessonWizardStore.notice}</div>
        )}
      </div>
    )
  }
}

export default inject('quickLessonWizardStore')(observer(UploadVideoStep))
