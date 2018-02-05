import React from 'react'

import renderApp from 'lib/renderApp'

import CardGrid2322 from '../layouts/CardGrid2322'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(CardGrid2322, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../layouts/CardGrid2322', () => {
      renderApp(CardGrid2322, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
