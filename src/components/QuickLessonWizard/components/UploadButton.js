import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import uuid from 'shortid'
import fileExtension from 'file-extension'
import Icon from 'components/Icon'
import axios from 'axios'
import {isFunction, isEmpty} from 'lodash'
import {inject, observer} from 'mobx-react'

const http = axios.create()

@observer
class LessonUploadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadStatus: false,
      titleUrl: `${props.lesson.slug}-${uuid.generate()}`.replace(
        /[^\w\d_\-.]+/gi,
        '',
      ),
    }
  }

  generateTitleUrl = slug => this.state.titleUrl

  notifyOnStatusUpdate = (status, data) => {
    const {onStatusUpdate} = this.props

    this.setState({uploadStatus: status})

    if (isFunction(onStatusUpdate)) {
      onStatusUpdate({status, data})
    }
  }

  handleUploadPreprocess = (file, next) => {
    this.notifyOnStatusUpdate('preprocess', file)
    next(file)
  }

  handleUploadProgress = (percent, message) => {
    this.notifyOnStatusUpdate('progress', {
      percent,
      message,
    })
    this.setState({percentComplete: percent})
  }

  handleUploadError = message => {
    this.notifyOnStatusUpdate('error', message)
  }

  handleUploadFinish = (signResult, lesson) => {
    const fileUrl = signResult.signedUrl.split('?')[0]

    this.notifyOnStatusUpdate('uploaded', {fileUrl, lesson})

    http
      .request({
        method: 'post',
        url: lesson.process_lesson_video_url,
        data: {
          fileUrl,
          lesson: {
            title_url: this.state.titleUrl,
          },
        },
      })
      .then(lesson => {
        this.notifyOnStatusUpdate('finished', {
          fileUrl,
          lesson,
        })
      })
      .catch(error => {
        this.notifyOnStatusUpdate('error', error)
      })
  }

  render() {
    const {lesson, label} = this.props
    const {uploadStatus, percentComplete} = this.state
    const {signed_s3_upload_url, slug, media_urls} = lesson

    const labels = {
      error: 'Upload Error',
      finished: 'Video is Uploaded and Processing',
      uploaded: 'Video Uploaded',
      progress: `Video Uploading ${percentComplete}%`,
    }

    const styleForStatus = status => {
      const defaultProcessingStyle = 'bg-gray'
      const statusStyle = {
        error: 'bg-dark-red',
        progress: 'bg-dark-blue',
        uploaded: 'bg-dark-blue',
        finished: 'bg-dark-green',
      }
      return statusStyle[status] || defaultProcessingStyle
    }

    const buttonClasses = `
      link 
      dib 
      fw6 
      tracked 
      tc 
      br2 
      ttu 
      ba  
      b--transparent 
      white 
      f6 
      pa2 
      ${
        uploadStatus
          ? styleForStatus(uploadStatus)
          : 'pointer bg-blue hover-bg-dark-blue'
      }
    `

    const inputClasses = `
      absolute
      top-0
      right-0
      ma0
      pa0
      f3
      pointer
      o-0
    `

    const inputContainerClasses = `
      relative
      overflow-hidden
      ma2
      ${buttonClasses}
    `

    return (
      <div>
        <div className={inputContainerClasses}>
          <div className="flex">
            <span>
              {labels[uploadStatus] ||
                label ||
                `${!isEmpty(media_urls) ? 'Replace' : 'Upload'} Lesson Video`}
            </span>
          </div>

          {uploadStatus ? null : (
            <ReactS3Uploader
              className={inputClasses}
              style={{
                filter: 'alpha(opacity=0)',
              }}
              signingUrl={signed_s3_upload_url}
              accept="video/*"
              scrubFilename={filename => {
                return `${this.state.titleUrl}.${fileExtension(filename)}`
              }}
              preprocess={this.handleUploadPreprocess}
              onProgress={this.handleUploadProgress}
              onError={this.handleUploadError}
              onFinish={signResult => {
                this.handleUploadFinish(signResult, lesson)
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

export default LessonUploadButton
