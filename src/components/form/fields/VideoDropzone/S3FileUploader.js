import defaults from 'lodash/defaults'
import S3Upload from 'react-s3-uploader/s3upload.js'
import {isFunction} from 'lodash'

export default class S3FileUploader {
  constructor(file, options) {
    this.file = file
    this.preview = file.preview || URL.createObjectURL(file)
    this.opts = defaults(options || {}, {
      signingUrl: '/s3/signUpload',
    })
  }

  getFile() {
    return this.file
  }

  getFileType() {
    return this.getFile().type
  }

  getPreview() {
    return this.preview
  }

  getFilename() {
    return this.getFile().name
  }

  isImage() {
    return /^image\//.exec(this.getFileType())
  }

  getResultS3Filename() {
    return this.result && this.result.filename
  }

  getPublicUrl() {
    return this.result && this.result.publicUrl
  }

  cancel() {
    if (this.upload) {
      this.upload.abortUpload()
      this.upload = null
    }
  }

  markFailed() {
    this.failed = true
  }

  isFailed() {
    return !!this.failed
  }

  notifyOnStatusUpdate = (status, data) => {
    if (isFunction(this.opts.onStatusUpdate)) {
      this.opts.onStatusUpdate({status, data})
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
  }

  handleUploadError = message => {
    this.notifyOnStatusUpdate('error', message)
  }

  handleUploadFinish = (signResult, file) => {
    const fileUrl = signResult.signedUrl.split('?')[0]
    this.notifyOnStatusUpdate('uploaded', {fileUrl, file})
  }

  start() {
    return new Promise((resolve, reject) => {
      this.upload = new S3Upload({
        files: [this.file],
        signingUrl: this.opts.signingUrl,
        signingUrlQueryParams: this.opts.signingUrlQueryParams,
        scrubFilename: this.opts.scrubFilename,
        preprocess: this.handleUploadPreprocess,
        onProgress: this.handleUploadProgress,
        onFinishS3Put: this.handleUploadFinish,
        onError: this.handleUploadError,
      })
    })
  }
}
