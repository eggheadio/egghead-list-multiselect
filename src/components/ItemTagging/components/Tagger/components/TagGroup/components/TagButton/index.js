import React from 'react'
import {observable, toJS} from 'mobx'
import {observer} from 'mobx-react'
import css from './index.scss'
import pluralize from 'pluralize'
import {pull, get, toString, some, isUndefined} from 'lodash'

@observer
class TagButton extends React.Component {
  @observable active = null
  @observable hover = false

  constructor(props) {
    super(props)
    this.active = props.active
  }

  componentDidMount() {
    this.setActiveByItem(this.props.item)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.item.id !== this.props.item.id &&
      this.setActiveByItem(nextProps.item)
  }

  setActiveByItem = item => {
    const tags = get(item, 'tags', [])
    const tagIsActive = some(tags, tag => this.props.tag.name === tag.name)
    this.setActive(tagIsActive)
  }

  setActive = value => {
    this.active = value
  }

  setHover = value => {
    this.hover = value
  }

  setActiveAndUpdate = value => {
    this.setActive(value)
    this.props.tag.contexts.forEach(context => {
      const {field} = this.props
      const tagContext = `${pluralize.singular(context)}_list`
      const {name} = this.props.tag
      const item = toJS(this.props.item)

      if (this.active) {
        if (tagContext === field) {
          if (isUndefined(item[tagContext])) item[tagContext] = []
          item[tagContext].push(name)
        }
      } else {
        if (tagContext === field) {
          pull(item[tagContext], name)
        }
      }

      const tags = get(item, tagContext, [])
      this.props.onUpdate({
        [tagContext]: tags,
      })
    })
  }

  render() {
    const {name, image} = this.props.tag

    const inactiveClasses = 'b--gray'
    const activeClasses = `blue ${css['border-blue']} ${css['bg-blue']}`
    const hoverClasses = `b--dark-gray-secondary bg-gray`

    return (
      <div
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        onClick={() => this.setActiveAndUpdate(!this.active)}
        className={`flex flex-row ma1 pa2 br2 ba pointer ${
          this.active ? activeClasses : inactiveClasses
        } ${this.hover && hoverClasses}`}
      >
        {image && (
          <div className="mr2">
            <img src={image} alt={`${name} logo`} width="20" height="20" />
          </div>
        )}
        <div>{name}</div>
      </div>
    )
  }
}

export default TagButton
