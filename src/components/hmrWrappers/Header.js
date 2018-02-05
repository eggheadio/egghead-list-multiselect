import React from 'react'

import renderApp from 'lib/renderApp'

import Header from '../Header'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(Header, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../Header', () => {
      renderApp(Header, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
