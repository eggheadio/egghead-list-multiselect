import React from 'react'
import PropTypes from 'prop-types'
import {convertTime} from 'lib/TimeUtil'
import classNames from 'classnames'

import axios from 'axios'

const http = axios.create()

import css from './CardList.scss'

const CardListItem = ({item, extraClasses}) => {
  const {watched, current, icon_url, title, duration} = item
  const href = item.http_url
  const length = convertTime(duration)
  const itemClasses = classNames(
    'flex items-start relative dark-blue f6 lh-solid pointer pv3 pl4 pr3 bg-animate hover-bg-white no-underline ',
    css['card-progress-list-item'],
  )
  const textClasses = classNames(
    'ml2 flex justify-between flex-grow-1 lh-copy overflow-hidden',
    css['lesson-title'],
  )

  const watchedClasses = classNames('', css.watched)
  const watchedTitleClasses = 'dark-gray'
  const currentClasses = classNames(css.current)

  return (
    <a
      href={href}
      className={`${itemClasses} ${extraClasses} ${
        watched ? watchedClasses : ''
      } ${current ? currentClasses : ''}`}
    >
      <img src={icon_url} className="mt1 h1" alt="" />
      <div className={`${textClasses} ${watched ? watchedTitleClasses : ''}`}>
        <div style={{fontSize: '12px'}}>{title}</div>
        <div className="ml3 tr o-60" style={{fontSize: '12px'}}>
          {length}
        </div>
      </div>
    </a>
  )
}
CardListItem.propTypes = {
  item: PropTypes.object.isRequired,
}
class CardList extends React.Component {
  state = {}
  componentDidMount() {
    const {playlist} = this.props
    if (playlist.lessons) {
      this.setState({lessons: playlist.lessons})
    } else if (playlist.lessons_url) {
      http
        .get(playlist.lessons_url)
        .then(({data}) => this.setState({lessons: data}))
    }
  }
  render() {
    const {playlist, height} = this.props
    const containerStyle = {
      width: '280px',
      height: `${height ? height : '384px'}`,
    }
    return (
      <div
        className="bg-white flex flex-grow-1 justify-between flex-column eh-shadow-1"
        style={containerStyle}
      >
        <div className="bg-white-secondary self-stretch h-100 br2 overflow-y-scroll">
          {this.state.lessons && (
            <ul
              className={classNames(
                'list pa0 ma0 overflow-hidden',
                css['card-progress-list'],
              )}
            >
              {this.state.lessons.map((i, k) => {
                const extraClasses =
                  playlist[k + 1] && playlist[k + 1]['current']
                    ? 'pre-next'
                    : null
                return (
                  <li key={k}>
                    <CardListItem item={i} extraClasses={extraClasses} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

CardList.propTypes = {
  playlist: PropTypes.object.isRequired,
}

export default CardList
