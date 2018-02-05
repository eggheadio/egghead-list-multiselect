import React from 'react'

import renderApp from 'lib/renderApp'

import Footer from '../Footer'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(Footer, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../Footer', () => {
      renderApp(Footer, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
