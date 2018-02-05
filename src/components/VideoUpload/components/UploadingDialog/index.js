import React from 'react'
import {css} from 'glamor'
import colorValues from 'lib/colorValues'
import {StyledDialogWrapper} from '../index'

const progress = 34

const UploadingDialog = () => (
  <StyledDialogWrapper>
    <h3
      className={css({
        margin: '0 0 20px 0',
        fontSize: '20px',
        color: colorValues['base'],
        fontWeight: 600,
        textAlign: 'center',
      })}
    >
      Uploading...
    </h3>
    <div
      className={css({
        marginBottom: '30px',
        fontSize: '14px',
        color: colorValues['dark-gray'],
        textAlign: 'center',
      })}
    >
      react_new_final.mp4 (16.2MB)
    </div>
    <div
      className={css({
        display: 'flex',
        width: '100%',
        maxWidth: '460px',
      })}
    >
      <div
        className={css({
          flexGrow: 1,
          alignSelf: 'center',
          background: 'rgba(71, 134, 255, 0.2)',
          borderRadius: '9999px',
        })}
      >
        <div
          className={css({
            background: 'linear-gradient(165.73deg, #8CB3FF 0%, #4785FE 100%)',
            height: '8px',
            borderRadius: '9999px',
            width: `${progress}%`,
          })}
        />
      </div>
      <div
        className={css({
          flexShrink: 0,
          color: colorValues['base'],
          fontSize: '20px',
          fontWeight: 500,
          width: '70px',
          textAlign: 'right',
        })}
      >
        {progress}%
      </div>
    </div>
    <a
      className={css({
        marginTop: '30px',
        fontSize: '14px',
        color: colorValues['dark-gray'],
        textDecoration: 'underline',
        ':hover': {
          textDecoration: 'none',
        },
      })}
      href="#"
    >
      Cancel upload
    </a>
  </StyledDialogWrapper>
)

export default UploadingDialog
