import React from 'react'
import CheckWatchedIcon from 'components/icons/CheckWatchedIcon'
import PlayIcon from 'components/icons/PlayIcon'
import cn from 'classnames'
import {imageWidthRemNumber} from 'lib/imageWidthRemNumber'
import css from '../ContentListCard/index.scss'

const iconRightDistance = illustrationUrl =>
  (3.5 - imageWidthRemNumber(illustrationUrl)) / 2

const ContentImage = ({
  smallIconUrl,
  labelColor,
  illustrationUrl,
  isHovered,
  completed,
  title,
  subCard = false,
  size = '60',
}) => {
  const source = illustrationUrl ? illustrationUrl : smallIconUrl

  return (
    <div className={`${subCard ? '' : css.contentIconWrapper}`}>
      <div
        className={cn(
          subCard ? 'relative flex align-center' : css.animatedIcon,
          css.contentIconWithCheckMark,
        )}
        style={{height: `${size}px`, width: `${size}px`}}
      >
        <img
          src={source}
          role="presentation"
          className="h-auto tr"
          alt={`Illustration for ${title}`}
          style={{height: `${size}px`, width: `${size}px`}}
        />
        {completed &&
          !subCard && (
            <CheckWatchedIcon
              className={cn(
                'absolute',
                illustrationUrl
                  ? css.checkWatchedIconMedium
                  : css.checkWatchedIconSmall,
              )}
              style={{right: `${iconRightDistance(illustrationUrl)}rem`}}
            />
          )}
      </div>
    </div>
  )
}

export default ContentImage
