import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import axios from 'axios'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import TagGroup from './components/TagGroup'

const http = axios.create()

@observer
class Tagger extends React.Component {
  @observable tagsInContext = []

  componentDidMount() {
    http
      .get(`/api/v1/tags?context=${this.props.label.toLowerCase()}`)
      .then(({data}) => {
        this.setTagsInContext(data)
      })
  }

  setTagsInContext = tags => {
    this.tagsInContext = tags
  }

  render() {
    const {tags, label, onUpdate, field, description, className} = this.props
    const classes = classNames('w-50-ns', 'center', className)
    return (
      <form className={classes}>
        <fieldset className="bn ma0 pa0 tl">
          <legend className="f5 f4-ns mb3 black-80">{label}</legend>
          <TagGroup
            item={this.props.item}
            onUpdate={this.props.onUpdate}
            tagsInContext={this.tagsInContext}
            field={this.props.field}
          />
          {description ? (
            <div className="black-50 f6 lh-copy">
              <ReactMarkdown source={description} />
            </div>
          ) : null}
        </fieldset>
      </form>
    )
  }
}

Tagger.propTypes = {
  label: PropTypes.string.isRequired,
  tags: PropTypes.array,
}

export default Tagger
