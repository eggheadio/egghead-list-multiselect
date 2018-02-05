import React from 'react'
import PropTypes from 'prop-types'
import hljs from 'highlight.js'
const h = React.createElement

class CodeBlock extends React.Component {
  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.refs.code)
  }

  render() {
    return h(
      'pre',
      null,
      h(
        'code',
        {
          ref: 'code',
          className: this.props.language,
        },
        this.props.literal,
      ),
    )
  }
}

CodeBlock.propTypes = {
  literal: PropTypes.string,
  language: PropTypes.string,
}

export default CodeBlock
