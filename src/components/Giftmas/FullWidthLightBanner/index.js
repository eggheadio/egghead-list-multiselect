import React, {Component} from 'react'
import {css, $} from 'glamor'
import {inject, observer} from 'mobx-react'
import get from 'lodash/get'
import {track} from 'lib/analytics'

import wreath_lg from 'assets/images/wreath-large@2x.png'

const accentColor = css({
  color: '#ED9135',
})

const accentBgColor = css({
  background: '#ED9135',
  ':hover': {
    background: '#DD8125',
  },
})

const banner = css({
  height: '100%',
  width: '100%',
  '@media screen and (min-width: 60em)': {
    height: '375px',
    width: '100%',
  },
  '@media screen and (min-width: 40em)': {
    height: '300px',
    width: '1180px',
  },
})

const wreath = css({
  height: '15em',
  '@media screen and (min-width: 40em)': {
    height: '20em',
  },
  '@media screen and (min-width: 60em)': {
    height: '21em',
  },
})

const bigHeaderStyle = css({
  fontSize: '3rem',
  '@media screen and (min-width: 60em)': {
    fontSize: '4rem',
  },
})

const ysobelRegular = css({
  fontFamily: 'Ysobel W01 Disp Rg',
})

const yosbelSemiBold = css({
  fontFamily: 'Ysobel W01 Disp SmBd',
  fontWeight: '600',
})

class FullWidthLightBanner extends Component {
  render() {
    const {
      discount,
      buttonText,
      time,
      topInfo,
      bottomInfo,
      image,
      tag,
      location,
    } = this.props

    return (
      <div className="bg-white flex justify-center ">
        <div
          {...banner}
          className="w-100 mh3 bg-white flex justify-center items-center flex-column flex-row-ns"
        >
          <img
            {...wreath}
            src={image}
            className="self-start-ns self-center img"
          />
          <div className="ml5-ns mb0-ns mb5 ml0 flex flex-column items-center items-start-ns">
            <p {...accentColor} {...yosbelSemiBold} className="f2 ma0 mh1">
              {topInfo}
            </p>
            <p
              className="black mh1 ma0"
              {...yosbelSemiBold}
              {...bigHeaderStyle}
            >
              {bottomInfo}
            </p>
            <p className="black mh1 f5 fw5 avenir">
              <span className="orange">{discount}</span>
              <span>{time}</span>
            </p>
            <button
              {...accentBgColor}
              className="pv3 pointer bn white ph5 br-pill avenir fw6 f6"
              onClick={() => {
                track('clicked view buy button', {
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
        </div>
      </div>
    )
  }
}

export default FullWidthLightBanner
