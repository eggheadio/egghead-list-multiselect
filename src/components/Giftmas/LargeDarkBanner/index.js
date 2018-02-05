import React, {Component} from 'react'
import {css, $} from 'glamor'
import {track} from 'lib/analytics'
import emitter from 'react-ab-test/lib/emitter'

const accentColor = css({
  color: '#F9B544',
})

const bgColor = css({
  background: '#232D3B',
})

const banner = css({
  height: '160px',
  '@media(max-width: 30em)': {
    flexWrap: 'wrap',
  },
})

const wreath = css({
  height: '180px',
  '@media(max-width: 60em)': {
    height: '180px',
  },
  '@media(max-width: 30em)': {
    height: '100px',
  },
})

const bigHeaderStyle = css({
  fontSize: '48px',
})

const ysobelRegular = css({
  fontFamily: 'Ysobel W01 Disp Rg',
})

const yosbelSemiBold = css({
  fontFamily: 'Ysobel W01 Disp SmBd',
  fontWeight: '600',
})

const topContainer = css({
  '@media(max-width: 700px)': {
    flexBasis: '50%',
  },
})

const bottomContainer = css({
  '@media(max-width: 700px)': {
    flexBasis: '100%',
  },
})

const onTop = css({
  zIndex: '999',
})

class LargeDarkBanner extends Component {
  render() {
    const {
      discount,
      buttonText,
      time,
      topInfo,
      bottomInfo,
      image,
      tag,
      contentSlug,
      instructorSlug,
      experimentName,
      contentType,
      location,
    } = this.props

    const trackProps = {
      location,
      [contentType]: contentSlug,
      instructor: instructorSlug,
      tag,
    }

    return (
      <div
        {...banner}
        {...bgColor}
        className="w-100 ph3 pb1-ns br2 flex justify-between content-between"
      >
        <div className="self-center flex flex-column" {...topContainer}>
          <p {...accentColor} {...ysobelRegular} className="f3-ns f4 ma0">
            {topInfo}
          </p>
          <p className="white f3-ns f4 ma0" {...yosbelSemiBold}>
            {bottomInfo}
          </p>
        </div>
        <div className="self-top flex justify-around" {...topContainer}>
          <img {...onTop} {...wreath} src={image} />
        </div>
        <div
          className="self-center flex flex-row flex-column-l flex-column-m justify-between items-center"
          {...bottomContainer}
        >
          <button
            onClick={() => {
              track('clicked gift view button', trackProps).then(result => {
                if (experimentName) {
                  emitter.emitWin(experimentName)
                }

                window.location.href = '/gifts'
                window.location.href = tag ? `/gifts?utm_term=${tag}` : '/gifts'
              })
            }}
            className="pv2 bn fw5 f6 black bg-white ph5-l ph5-m ph3 br-pill pointer avenir"
          >
            {buttonText}
          </button>
          <p className="black ma0 mt2 f5 fw5 flex flex-column flex-row-l flex-row-m avenir">
            <span {...accentColor} className="self-end tr">
              {discount}
            </span>
            <span className="white pl1 self-end tr">{time}</span>
          </p>
        </div>
      </div>
    )
  }
}

export default LargeDarkBanner
