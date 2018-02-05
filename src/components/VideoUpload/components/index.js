import React from 'react'
import glamorous from 'glamorous'
import colorValues from 'lib/colorValues'

export const StyledDialogWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  color: colorValues['base'],
  fontSize: '14px',
  lineHeight: '16px',
})
