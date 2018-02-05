import React, {Component} from 'react'
import {css, $} from 'glamor'
import {track} from 'lib/analytics'
import {inject, observer} from 'mobx-react'
import get from 'lodash/get'

const accentColor = css({
  color: '#FECD5B',
})

const accentBgColor = css({
  background: '#ED9135',
  ':hover': {
    background: '#DD8125',
  },
})

const ornamentLeftStyle = css({
  display: 'none',
  '@media screen and (min-width:768px)': {
    display: 'block',
    width: '11em',
    height: '20em',
  },
})

const ornamentRightStyle = css({
  display: 'none',
  '@media screen and (min-width:768px)': {
    display: 'block',
    width: '10em',
    height: '20em',
  },
})

const ysobelRegular = css({
  fontFamily: 'Ysobel W01 Disp Rg',
})

const yosbelSemiBold = css({
  fontFamily: 'Ysobel W01 Disp SmBd',
  fontWeight: '600',
})

const bigHeaderStyle = css({
  fontSize: '2.5em',
  '@media screen and (min-width:40em)': {
    fontSize: '3em',
  },
  '@media screen and (min-width:60em)': {
    fontSize: '4.5em',
  },
})

@inject('giftScreenStore', 'currentUserStore')
@observer
class FullWidthDarkBanner extends Component {
  render() {
    const {
      discount,
      buttonText,
      time,
      topInfo,
      bottomInfo,
      leftImage,
      rightImage,
      buttonLabel,
      tag,
      location,
    } = this.props

    return (
      <div className="bg-transparent flex justify-center">
        <div className="w-100 flex slef-center justify-center">
          <img src={leftImage} {...ornamentLeftStyle} />
          <div className="ma5 flex flex-column items-center">
            <p {...accentColor} {...yosbelSemiBold} className="f2-l f3 ma0 mh1">
              {topInfo}
            </p>
            <p
              className="white mh1 ma0"
              {...yosbelSemiBold}
              {...bigHeaderStyle}
            >
              {bottomInfo}
            </p>
            <p className="white mh1 f5 fw5 avenir">
              <span {...accentColor}>{discount}</span> <span>{time}</span>
            </p>
            <button
              {...accentBgColor}
              className="pointer mt4 bn white ph5 pv3 br-pill avenir fw6 f5"
              onClick={() => {
                track(`clicked gift ${buttonLabel} button`, {
                  location,
                  favoriteTag: get(
                    this.props.currentUserStore,
                    'contentPrefs.favoriteTag',
                  ),
                  lastClicked: get(
                    this.props.currentUserStore,
                    'contentPrefs.lastClicked',
                  ),
                }).then(result => {
                  window.location.href = '/gifts'
                  window.location.href = tag
                    ? `/gifts?utm_term=${tag}`
                    : '/gifts'
                })
              }}
            >
              {buttonText}
            </button>
          </div>
          <img src={rightImage} {...ornamentRightStyle} />
        </div>
      </div>
    )
  }
}

export default FullWidthDarkBanner
