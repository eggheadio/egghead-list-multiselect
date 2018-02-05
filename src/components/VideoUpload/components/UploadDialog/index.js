import React from 'react'
import colorValues from 'lib/colorValues'
import {StyledDialogWrapper} from '../index'
import UploadLogo from './videoUploadLogo.png'
import {css} from 'glamor'

export const ChooseButton = () => (
  <div
    className={css({
      position: 'relative',
      marginBottom: '30px',
    })}
  >
    <button
      className={css({
        transition: '150ms',
        background: colorValues['blue'],
        border: `2px solid ${colorValues['blue']}`,
        color: colorValues['white'],
        borderRadius: '9999px',
        fontSize: '13px',
        letterSpacing: '1px',
        lineHeight: '16px',
        textAlign: 'center',
        fontWeight: 600,
        textTranform: 'uppercase',
        padding: '12px 24px',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 1,
        ':hover': {
          background: colorValues['white'],
          color: colorValues['blue'],
        },
      })}
      type="button"
    >
      CHOOSE VIDEO TO UPLOAD
    </button>
    <input
      className={css({
        position: 'absolute',
        width: '1px',
        height: '1px',
        zIndex: 0,
        opacity: 0,
      })}
      type="file"
    />
  </div>
)

const UploadDialog = () => (
  <StyledDialogWrapper>
    <img
      className={css({
        width: '130px',
        marginBottom: '40px',
      })}
      src={UploadLogo}
    />
    <ChooseButton />
    <span>MP4 or MOV, max 20mb</span>
  </StyledDialogWrapper>
)

export default UploadDialog
