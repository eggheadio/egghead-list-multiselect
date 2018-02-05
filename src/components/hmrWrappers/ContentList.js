import React from 'react'

import renderApp from 'lib/renderApp'

import ContentList from '../ContentList'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(ContentList, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../ContentList', () => {
      renderApp(ContentList, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
