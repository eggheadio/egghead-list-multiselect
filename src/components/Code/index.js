import React from 'react'
import PropTypes from 'prop-types'
import GitHubMessage from './GitHubMessage'
import NonMemberCode from './NonMember'
import IFrame from 'components/IFrame'
import css from './index.scss'

function codeUI({codepen_id, github, jsbin_url, plunker_url}) {
  if (github) {
    return <GitHubMessage {...github} />
  } else if (plunker_url) {
    return <IFrame url={plunker_url} />
  } else if (jsbin_url) {
    return <IFrame url={`//jsbin.com/${jsbin_url}/embed?js`} />
  } else if (codepen_id) {
    return <IFrame url={`http://codepen.io/team/eggheadio/pen/${codepen_id}`} />
  }

  return <NonMemberCode />
}

const Code = props => {
  return (
    <div className={`bg-white black-90 mt2 pt1 br0 br2-l ${css.box}`}>
      {codeUI(props)}
    </div>
  )
}

export default Code
