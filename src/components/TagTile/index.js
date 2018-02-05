import React from 'react'
import {css} from 'glamor'

import TrackingLink from 'components/TrackingLink/index'
import colorValues from 'lib/colorValues'

const tagTileClasses = (darkTheme = false) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    flexGrow: 1,
    height: '140px',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: 0,
    transition: '200ms',
    background: colorValues[`${darkTheme ? 'dark-grey' : 'white'}`],
    cursor: 'pointer',
    boxShadow: `0 1px 4px 0 ${darkTheme ? null : `rgba(0,0,0,0.10)`}`,
    ':not(:first-child)': {
      marginLeft: '16px',
    },
    ':hover': {
      boxShadow: `0 0 0 0 ${darkTheme ? null : `rgba(0,0,0,0.10)`}`,
      background: colorValues[`${darkTheme ? 'dark-blue' : 'white'}`],
      '> img': {
        transform: 'scale(1.2)',
        marginBottom: '28px',
      },
      '> span': {
        transform: 'scale(0.9)',
      },
    },
    '@media (min-width: 768px)': {
      width: '210px',
      height: '210px',
      flexGrow: 'initial',
      marginBottom: '24px',
      ':not(:first-child)': {
        marginLeft: 0,
      },
    },
    '@media (min-width: 992px)': {
      width: '184px',
      height: '184px',
    },
  })

class TagTile extends React.Component {
  render() {
    const {tag, darkTheme} = this.props

    return (
      <a href={tag.http_url} className={tagTileClasses(darkTheme)}>
        <img
          src={tag.image}
          title={`${tag.label} Image`}
          className={css({
            transition: '150ms',
            display: 'block',
            width: '40px',
            height: '40px',
            marginBottom: '20px',
          })}
        />
        <span
          className={css({
            transition: '150ms',
            color:
              colorValues[
                `${darkTheme ? 'white-secondary' : 'base-secondary'}`
              ],
            fontSize: '18px',
            lineHeight: '25px',
          })}
        >
          {tag.label}
        </span>
      </a>
    )
  }
}

export default TagTile
