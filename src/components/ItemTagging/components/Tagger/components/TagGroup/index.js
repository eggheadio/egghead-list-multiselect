import React from 'react'
import {map, isEmpty} from 'lodash'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import TagButton from './components/TagButton'

@observer
class TagGroup extends React.Component {
  @observable displayedTags = []
  @observable showMore = false

  componentWillReceiveProps(nextProps) {
    if (nextProps.tagsInContext.length !== this.props.tagsInContext.length) {
      const initiallyDisplayedTags = nextProps.tagsInContext.slice(
        0,
        this.props.truncateNumber,
      )
      this.setDisplayedTags(initiallyDisplayedTags)
    }
  }

  setDisplayedTags = tags => {
    this.displayedTags = tags
  }

  setShowMore = value => {
    if (value) {
      this.setDisplayedTags(this.props.tagsInContext)
    } else {
      const initiallyDisplayedTags = this.props.tagsInContext.slice(
        0,
        this.props.truncateNumber,
      )
      this.setDisplayedTags(initiallyDisplayedTags)
    }
    this.showMore = value
  }

  render() {
    return (
      <div>
        <div className="flex flex-row flex-wrap">
          {!isEmpty(this.props.tagsInContext) &&
            map(this.displayedTags, tag => (
              <TagButton
                key={tag.name}
                onUpdate={this.props.onUpdate}
                item={this.props.item}
                tag={tag}
                field={this.props.field}
              />
            ))}
        </div>
        <div
          onClick={() => this.setShowMore(!this.showMore)}
          className="ma1 pa2 br2 ba pointer b--gray w4 tc"
        >
          Show {this.showMore ? 'Less' : 'More'}
        </div>
      </div>
    )
  }
}

TagGroup.defaultProps = {
  truncateNumber: 8,
}

export default TagGroup
