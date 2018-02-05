import React from 'react'
import ActionButton from 'components/ActionButton'
import {observer, inject} from 'mobx-react'

export default inject('contentListStore')(observer(ActionButton))
