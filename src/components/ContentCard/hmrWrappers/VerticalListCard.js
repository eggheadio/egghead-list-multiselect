import React from 'react'

import renderApp from 'lib/renderApp'

import VerticalListCard from '../components/VerticalListCard'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(VerticalListCard, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../components/VerticalListCard', () => {
      renderApp(VerticalListCard, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
