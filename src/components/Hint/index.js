import React from 'react'
import Icon from 'components/Icon'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Maybe from 'components/Maybe'
import css from './index.scss'

@observer
class Hint extends React.Component {
  @observable
  state = {
    visible: false,
  }
  render() {
    return (
      <div
        onMouseEnter={() => (this.state.visible = true)}
        onMouseLeave={() => (this.state.visible = false)}
        className={`flex items-center justify-center relative ${css.hint}`}
      >
        <Icon type="question-circle" color="dark-gray-secondary" size="5" />
        <Maybe condition={this.state.visible}>
          <div className={`absolute mb2 ${css.tooltip}`}>
            {this.props.payload}
          </div>
        </Maybe>
      </div>
    )
  }
}

export default Hint
