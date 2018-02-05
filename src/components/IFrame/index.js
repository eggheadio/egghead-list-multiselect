import React from 'react'

export default class IFrame extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.url !== this.props.url
  }
  render() {
    const {url} = this.props
    const iframeRefCallback = function iframeRefCallback(iframe) {
      if (iframe) {
        iframe.contentWindow.location.replace(url)
      }
    }
    return (
      <div>
        <iframe
          ref={iframeRefCallback}
          allowTransparency="true"
          frameBorder="0"
          scrolling="no"
          width="100%"
          height="550px"
        />
      </div>
    )
  }
}
