import React from 'react'
import cn from 'classnames'
import ExternalTrackingLink from 'components/ExternalTrackingLink'
import TagFolder from 'components/TagFolder'
import {imageWidthRemNumber} from 'lib/imageWidthRemNumber'
import ClockIcon from 'icons/ClockIcon'
import formatDuration from 'lib/formatDuration'
import css from './index.scss'

export default ({
  title,
  instructorAvatarUrl,
  instructorName,
  instructorUrl,
  duration,
  smallIconUrl,
  illustrationUrl,
  label,
  slug,
  tag,
  tagUrl,
}) => {
  const courseImageSource = illustrationUrl ? illustrationUrl : smallIconUrl
  return (
    <div className="
      no-underline
      flex-grow-1
      flex-grow-0-ns
      flex
      flex-column
      flex-row-ns
      justify-between
      justify-start-ns
      black
      avenir
      pv3-ns
      pt3
      pr3-ns
      pb0
      pl3-ns
      relative
      z-2
      w-100
      h-100
      bb
      b--gray-secondary
      br2
      br--top
    ">
      <div className="base pb2 ml2 ml0-ns pb0-ns no-underline w-70-ns w-80-l flex flex-row items-center justify-left flex-shrink-0 flex-shrink-1-ns">
        <div>
          <img
            src={courseImageSource}
            role="presentation"
            className="h-auto tr"
            style={{height: `${imageWidthRemNumber(illustrationUrl)}rem`}}
          />
        </div>
        <div className="flex-grow-1 ml2 ml0-ns">
          <p className="db pl0 pr3 ph3-ns tl fw5 avenir lh-title relative">
            {title}
          </p>
        </div>
      </div>
      <div className="mt2 mt0-ns pt2 pt0-ns pb2 pb0-ns flex flex-row w-60-ns w-50-l">
        <ExternalTrackingLink
          href={instructorUrl}
          className="w-100-ns tl flex items-center dark-gray hover-blue overflow-hidden no-underline self-center"
          data-click-handler="true"
          track={`clicked ${label.toLowerCase()} content list item`}
          trackParams={{
            element: 'instructor',
            [label.toLowerCase()]: slug,
          }}
        >
          <img
            src={instructorAvatarUrl}
            role="presentation"
            className="br-100"
            style={{height: 24, width: 24}}
          />
          <span className={`mh2 sans-serif underline ${css.instructorName}`}>
            {instructorName}
          </span>
        </ExternalTrackingLink>
        <div className="flex flex-column-ns justify-center-ns">
          <div className="flex-shrink-0 flex-shrink-1-ns base flex flex-row items-center justify-center">
            <ClockIcon
              className={cn('mr2 dark-gray-secondary', css.clockIcon)}
            />
            <div className="dark-gray sans-serif" style={{fontSize: 13}}>
              {formatDuration(duration)}
            </div>
          </div>
          <TagFolder tag={tag} tagUrl={tagUrl} extraClasses="dn flex-ns" />
        </div>
      </div>
    </div>
  )
}
