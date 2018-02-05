import React from 'react'
import colorValues from 'lib/colorValues'
import {css} from 'glamor'
import UploadDialog from './components/UploadDialog'
import UploadingDialog from './components/UploadingDialog'
import Icon from 'components/Icon'

const ScreenStates = {
  REPLACE: '3',
  UPLOAD: '1',
  UPLOADING: '2',
}

const VideoUpload = ({screen}) => {
  return (
    <div
      className={css({
        width: '100%',
        height: '470px',
        maxWidth: '680px',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          padding: '20px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${colorValues['gray-secondary']}`,
          borderRadius: '5px 5px 0 0',
          overflow: 'hidden',
          background: 'white',
        })}
      >
        <h4
          className={css({
            margin: 0,
            fontSize: '20px',
            color: colorValues['base'],
            fontWeight: 500,
          })}
        >
          Video
        </h4>
        {screen === ScreenStates.REPLACE && (
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: colorValues['base'],
            })}
          >
            <Icon type="upload-cloud" color="blue" size="3" />
            <span style={{marginLeft: '5px'}}>Replace video</span>
          </div>
        )}
      </div>
      <div
        className={css({
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
          borderRadius: '0 0 5px 5px',
          overflow: 'hidden',
        })}
      >
        {screen === ScreenStates.UPLOAD ? (
          <UploadDialog />
        ) : screen === ScreenStates.UPLOADING ? (
          <UploadingDialog />
        ) : (
          <img
            src="http://via.placeholder.com/1280x800"
            style={{objectFit: 'cover'}}
          />
        )}
      </div>
    </div>
  )
}

export default VideoUpload
