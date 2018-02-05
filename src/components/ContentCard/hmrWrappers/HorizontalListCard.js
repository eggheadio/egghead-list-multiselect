import React from 'react'

import renderApp from 'lib/renderApp'

import HorizontalListCard from '../components/HorizontalListCard'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(HorizontalListCard, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../components/HorizontalListCard', () => {
      renderApp(HorizontalListCard, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
