import React from 'react'
import PropTypes from 'prop-types'
import FolderIcon from 'components/icons/FolderIcon'
import ExternalTrackingLink from 'components/ExternalTrackingLink'
import css from './index.scss'

const TagFolder = ({tag, tagUrl, extraClasses}) => {
  if (tag) {
    return (
      <ExternalTrackingLink
        className={`
          w-100
          pa1
          tl
          mv0
          flex-row
          items-center
          no-underline
          dark-gray
          hover-blue
          ${extraClasses ? 'flex-ns' : 'flex'}
          ${extraClasses}
          ${css.tagFolder}
        `}
        data-click-handler="true"
        href={tagUrl}
        track={`clicked tag folder`}
        trackParams={{
          tag: tag,
        }}
      >
        <FolderIcon className="mr2 dark-gray-secondary" />
        <span className={`dark-gray sans-serif underline ${css.tagName}`}>
          {tag}
        </span>
      </ExternalTrackingLink>
    )
  } else {
    return null
  }
}

TagFolder.propTypes = {
  tag: PropTypes.string,
  tagUrl: PropTypes.string,
  extraClasses: PropTypes.string,
}

export default TagFolder
