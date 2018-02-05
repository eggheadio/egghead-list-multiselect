import React from 'react'
import ReactOnRails from 'react-on-rails'
import CardGrid2222 from './layouts/CardGrid2222'
import CardGrid2121 from './layouts/CardGrid2121'
import CardGrid2322 from './layouts/CardGrid2322'
import GridPlaceholder from './layouts/GridPlaceholder'
import VerticalListCard from './components/VerticalListCard'
import HorizontalListCard from './components/HorizontalListCard'
import CardList from './components/CardList'

import Card from '../Card'
import CardInfo from './components/CardInfo'

export default props => (
  <Card>
    <CardInfo {...props} />
  </Card>
)

ReactOnRails.register({
  CardGrid2222,
  CardGrid2121,
  CardGrid2322,
  GridPlaceholder,
  VerticalListCard,
  HorizontalListCard,
  CardList,
})
