import React from 'react'

import renderApp from 'lib/renderApp'

import ContentCard from '../ContentCard'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(ContentCard, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../ContentCard', () => {
      renderApp(ContentCard, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
