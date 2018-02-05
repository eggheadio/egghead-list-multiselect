import React from 'react'

import renderApp from 'lib/renderApp'

import CardGrid2222 from '../layouts/CardGrid2222'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(CardGrid2222, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../layouts/CardGrid2222', () => {
      renderApp(CardGrid2222, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
