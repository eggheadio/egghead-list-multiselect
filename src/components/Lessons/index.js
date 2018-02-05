import React from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'
import PaginatedContentList from 'components/PaginatedContentList'
import {capitalize} from 'lodash'

class Lessons extends React.Component {
  componentDidUpdate() {
    findDOMNode(this.lessonContainer).scrollIntoView()
  }

  render() {
    const {
      tag,
      content_list,
      pageSize,
      currentPage,
      total,
      requestNextPage,
    } = this.props

    return (
      <div
        className="pv5 bg-gray"
        ref={node => {
          this.lessonContainer = node
        }}
      >
        <div className="ph3-m ph5-l pt3-l pb2-l center mw8">
          <h2 className="ma0 f2 fw5 avenir tc base-secondary mb4 mb5-l">{`All ${tag.label ||
            capitalize(tag.name)} Lessons`}</h2>
          <PaginatedContentList
            total={total}
            pageSize={pageSize}
            content_list={content_list}
            currentPage={currentPage}
            requestNextPage={requestNextPage}
          />
        </div>
      </div>
    )
  }
}

Lessons.propTypes = {
  tag: PropTypes.object.isRequired,
  content_list: PropTypes.array.isRequired,
}

export default Lessons
