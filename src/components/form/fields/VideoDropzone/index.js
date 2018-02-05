import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {get} from 'lodash'
import Dropzone from 'react-dropzone'
import shortid from 'shortid'
import Icon from 'components/Icon'
import S3FileUploader from './S3FileUploader'
import ReactPlayer from 'components/ReactPlayer'
import SimpleProgress from './components/SimpleProgress'
import CloudUploadIcon from './components/CloudUploadIcon'
import css from './index.scss'
import sharedCss from 'components/form/formStyles.scss'
import ExternalTrackingLink from 'components/ExternalTrackingLink'

const READY = 'ready'
const UPLOADING = 'uploading'
const COMPLETE = 'complete'

@observer
class VideoDropzone extends React.Component {
  constructor(props) {
    super(props)

    this.state = observable.map({
      status: null,
      fileName: '',
      fileSize: 0,
      dropzoneActive: false,
    })
    this.state.status = get(props, 'lesson.media_urls', false)
      ? 'complete'
      : 'ready'
  }

  componentWillMount() {
    this.state.set('inputId', shortid.generate())
  }

  @action
  onStatusUpdate = (status, data) => {
    switch (status) {
      case 'progress':
        this.state.merge({
          progress: {
            percent: data.percent,
            message: `${this.state.fileName} uploading`,
          },
          status: UPLOADING,
        })
        break
      case 'complete':
        this.state.merge({
          progress: {
            isComplete: true,
            message: `${this.state.fileName} upload complete!`,
          },
          status: COMPLETE,
          result: data.fileUrl,
        })
        break
      case 'error':
        this.state.merge({
          error: true,
          progress: {
            hidePercent: true,
            message:
              data.message ||
              `Unknown error during ${this.state.fileName} upload`,
          },
          status: READY,
        })
    }
  }

  @action
  onDragEnter() {
    this.state.dropzoneActive = true
  }

  @action
  onDragLeave() {
    this.state.dropzoneActive = false
  }

  @action
  onDrop(file) {
    this.state.fileName = file.name
    this.state.fileSize = file.size
    if (this.acceptsType(file.type)) {
      return null
    }

    let uploader = new S3FileUploader(file, {
      onStatusUpdate: this.onStatusUpdate,
    })

    this.state.status = UPLOADING

    return Promise.resolve().then(() => uploader.start())
  }

  render() {
    const {lesson} = this.props
    const states = {
      locked: () => (
        <div className="pa5 pointer">
          <div className="flex flex-column items-center">
            <Icon type="exclamation-triangle" color="red" size="1" />
            <div className="mt4 mb4 f4 tc">
              {
                'Videos can not be uploaded until after the initial lesson save.'
              }
            </div>
          </div>
        </div>
      ),
      ready: () => (
        <div className="pa3">
          <div className={css.passive}>
            <div className="pa3">
              <ExternalTrackingLink
                href={lesson.upload_lesson_http_url}
                track="clicked upload video"
                trackParams={{
                  lesson: lesson.slug,
                }}
              >
                <div className="pa5">
                  <div className="flex flex-column items-center">
                    <CloudUploadIcon />
                    <div className="mt4 mb3">
                      {'click here to upload your video'}
                    </div>
                    <div>{'MP4 or MOV, max 100mb.'}</div>
                  </div>
                </div>
              </ExternalTrackingLink>
            </div>
          </div>
        </div>
      ),
      uploading: () => (
        <div className="pa5 flex flex-column items-center">
          <div className="b f4 black-">{'Uploading...'}</div>
          <div className="flex items-center mt3 mb4">
            <div>
              {this.props.mockName ? this.props.mockName : this.state.fileName}
            </div>
            <div className="ml3">
              {this.props.mockSize ? this.props.mockSize : this.state.fileSize}
            </div>
          </div>
          <SimpleProgress
            percentage={
              this.props.mockPercentage
                ? this.props.mockPercentage
                : this.state.progress.percent
            }
          />
          <div className="flex justify-center">
            <button className={`${css.button} mt3 blue underline`}>
              {'Cancel'}
            </button>
          </div>
        </div>
      ),
      complete: () => (
        <div style={{minHeight: '150px', minWidth: '260px'}}>
          <ReactPlayer
            {...this.props.lesson.media_urls}
            poster={this.props.lesson.thumb_nail}
            height="100%"
            width="100%"
            progressFrequency={100}
          />
        </div>
      ),
    }

    return (
      <div className={`bg-white br2 w-100 ${sharedCss.box}`}>
        <label
          htmlFor={this.state.inputId}
          className={`flex justify-between items-center h3 f4 db bb black-90 b--black-20 pa2 ${
            sharedCss.label
          }`}
        >
          <div className="flex">
            {'Video'}
            {this.state.status === UPLOADING && (
              <div className="ml2 dark-gray">{this.state.status}</div>
            )}
          </div>
          {this.state.status === COMPLETE && (
            <ExternalTrackingLink
              href={lesson.upload_lesson_http_url}
              track="clicked upload video "
              trackParams={{
                lesson: lesson.slug,
              }}
            >
              <div className="flex items-center">
                <Icon type="cloud-upload" color="blue" size="3" />
                <div className="ml1 f6">Replace video</div>
              </div>
            </ExternalTrackingLink>
          )}
        </label>
        {states[this.state.status]()}
      </div>
    )
  }
}

export default VideoDropzone
