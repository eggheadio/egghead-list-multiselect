import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon, {propTypes} from 'components/SvgIcon'
import cn from 'classnames'
import css from './index.scss'

const RssIcon = ({className, ...otherProps}) => (
  <SvgIcon className={cn(css.rssIcon, className)} {...otherProps}>
    <path d="M14.0233574,6.97659065 C17.2325408,10.1857741 18.999948,14.4558175 19,19 L15.6565009,19 C15.6565009,15.3488998 14.2368596,11.9185242 11.6591936,9.34080635 C9.08147578,6.76308848 5.65110017,5.34349908 2,5.34349908 L2,2 C6.54418251,2 10.814174,3.76740724 14.0233574,6.97659065 Z M2,8.07142857 C8.02606934,8.07142857 12.9285714,12.9739583 12.9285714,19 L9.70696439,19 C9.70696439,14.7503199 6.24959948,11.2930209 2,11.2930209 L2,8.07142857 Z M4.42857143,19 C3.08730846,19 2,17.9126915 2,16.5714286 C2,15.2301656 3.08730846,14.1428571 4.42857143,14.1428571 C5.76983439,14.1428571 6.85714286,15.2301656 6.85714286,16.5714286 C6.85714286,17.9126915 5.76983439,19 4.42857143,19 Z" />
  </SvgIcon>
)

RssIcon.propTypes = {
  ...propTypes,
  className: PropTypes.string,
}

RssIcon.defaultProps = {
  title: 'RssIcon',
  viewBoxWidth: 18,
  viewBoxHeight: 18,
}

export default RssIcon
