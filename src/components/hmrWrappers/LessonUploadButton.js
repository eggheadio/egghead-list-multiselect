import React from 'react'

import renderApp from 'lib/renderApp'

import LessonUploadButton from '../LessonUploadButton'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(LessonUploadButton, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../LessonUploadButton', () => {
      renderApp(LessonUploadButton, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
