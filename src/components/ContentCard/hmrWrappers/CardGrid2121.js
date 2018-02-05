import React from 'react'

import renderApp from 'lib/renderApp'

import CardGrid2121 from '../layouts/CardGrid2121'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(CardGrid2121, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../layouts/CardGrid2121', () => {
      renderApp(CardGrid2121, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
