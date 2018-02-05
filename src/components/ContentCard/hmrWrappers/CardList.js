import React from 'react'

import renderApp from 'lib/renderApp'

import CardList from '../components/CardList'

function wrappedApp(props, railsContext, domNodeId) {
  renderApp(CardList, props, railsContext, domNodeId)
  if (module.hot) {
    module.hot.accept('../components/CardList', () => {
      renderApp(CardList, props, railsContext, domNodeId)
    })
  }
}

export default wrappedApp
