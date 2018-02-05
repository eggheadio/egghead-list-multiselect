import React from 'react'
import PropTypes from 'prop-types'
import ReactS3Uploader from 'react-s3-uploader'
import uuid from 'shortid'
import fileExtension from 'file-extension'
import Request from 'components/Request'
import Icon from 'components/Icon'
import axios from 'axios'
import {isFunction} from 'lodash'

const http = axios.create()

class LessonUploadButton extends React.Component {
  static propTypes = {
    lesson: PropTypes.shape({
      signed_s3_upload_url: PropTypes.string.required,
      slug: PropTypes.string.required,
      wistia_id: PropTypes.string,
    }),
    label: PropTypes.string,
    onStatusUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      uploadStatus: false,
      title_url: `${props.lesson.slug}-${uuid.generate()}`.replace(
        /[^\w\d_\-.]+/gi,
        '',
      ),
    }
  }

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
            title_url: this.state.title_url,
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
    const {uploadStatus, title_url} = this.state
    const {signed_s3_upload_url, slug, wistia_id} = lesson

    const labels = {
      error: 'Upload Error',
      finished: 'Video Sent to Processing',
      uploaded: 'Video Uploaded',
      progress: 'Video Uploading',
    }

    const styleForStatus = status => {
      const defaultProcessingStyle = 'bg-gray'
      const statusStyle = {
        error: 'bg-dark-red',
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
            {uploadStatus === 'progress' ? (
              <div className="white">
                <Icon type="refresh" size="2" spin className="mr2" />
              </div>
            ) : null}

            <span>
              {labels[uploadStatus] ||
                label ||
                `${wistia_id ? 'Replace' : 'Upload'} Lesson Video`}
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
                return `${title_url}.${fileExtension(filename)}`
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
