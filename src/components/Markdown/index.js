import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './components/CodeBlock'

const Markdown = ({children}) => (
  <ReactMarkdown
    source={children}
    renderers={Object.assign({}, Markdown.renderers, {
      CodeBlock: CodeBlock,
    })}
  />
)

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Markdown
