import React from 'react'
import PropTypes from 'prop-types'
import css from './index.scss'
import cn from 'classnames'
import ClockIcon from 'components/icons/ClockIcon'
import StarOutlineIcon from 'components/icons/StarOutlineIcon'
import StarFilledIcon from 'components/icons/StarFilledIcon'
import formatDuration from 'lib/formatDuration'

class DurationFavorited extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
      favorited: props.favorited,
    }
  }

  render() {
    const classes =
      'w-100 pa1 tl mv0 flex flex-row items-center no-underline dark-gray'
    if (this.props.hover && this.props.currentUser) {
      return (
        <div
          className={cn(classes, 'pointer')}
          onMouseEnter={() => this.setState({isHovered: true})}
          onMouseLeave={() => this.setState({isHovered: false})}
        >
          {this.props.currentUser ? (
            <div
              onClick={() => {
                this.setState({favorited: !this.state.favorited})
                this.props.handleContentFavorited(this.props.lesson_id)
              }}
            >
              {this.state.favorited ? (
                <StarFilledIcon className={css.starIcon} />
              ) : (
                <StarOutlineIcon className={css.starIcon} />
              )}
            </div>
          ) : null}
        </div>
      )
    } else {
      return (
        <div className={classes}>
          <ClockIcon className={cn('mr2 dark-gray-secondary', css.clockIcon)} />
          <div
            className={`dark-gray sans-serif ${css.timeDuration} ${
              this.props.completed ? 'base' : 'dark-gray'
            }`}
          >
            {formatDuration(this.props.duration || 0)}
          </div>
        </div>
      )
    }
  }
}

DurationFavorited.propTypes = {
  hover: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  favorited: PropTypes.bool,
  completed: PropTypes.bool,
  lesson_id: PropTypes.string.isRequired,
}

export default DurationFavorited
