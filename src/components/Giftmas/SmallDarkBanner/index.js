import React, {Component} from 'react'
import {css, $} from 'glamor'
import {observer, inject} from 'mobx-react'
import get from 'lodash/get'
import {track} from 'lib/analytics'
import emitter from 'react-ab-test/lib/emitter'

const accentColor = css({
  color: '#FCC168',
})

const bgColor = css({
  background: '#232D3B',
})

const banner = css({
  height: '112px',
  width: '426px',
  '@media(max-width: 768px)': {
    width: '100%',
    height: 'auto',
  },
})

const wreath = css({
  width: '156px',
})

const bigHeaderStyle = css({
  fontSize: '34px',
})

const ysobelRegular = css({
  fontFamily: 'Ysobel W01 Disp Rg',
})

const yosbelSemiBold = css({
  fontFamily: 'Ysobel W01 Disp SmBd',
  fontWeight: '600',
})

class SmallDarkBanner extends Component {
  render() {
    const {
      discount,
      time,
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
        className="w-100 ph3 br2 flex justify-between pointer content-between"
        onClick={() => {
          track('clicked gift view button', trackProps).then(result => {
            if (experimentName) {
              emitter.emitWin(experimentName)
            }

            window.location.href = '/gifts'
            window.location.href = tag ? `/gifts?utm_term=${tag}` : '/gifts'
          })
        }}
      >
        <div className="self-center flex flex-column items-left">
          <p {...bigHeaderStyle} {...yosbelSemiBold} className="white ma0">
            {discount}
          </p>
          <p {...accentColor} className="ma0 f4 mv1 avenir">
            {time}
          </p>
        </div>
        <div className="self-top">
          <img {...wreath} src={image} />
        </div>
      </div>
    )
  }
}

export default SmallDarkBanner
