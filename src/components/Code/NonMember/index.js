import React from 'react'
import css from './index.scss'

const GitHubMessage = () => (
  <div className={`tc avenir ${css.nonMemberMessage}`}>
    <h3 className="mb3 pv4">
      egghead members have access to source code for this lesson.
    </h3>

    <a
      href="/pricing?from=lesson%20code"
      className={`br-pill bg-blue no-underline white b inline-block dn-m ${
        css.button
      }`}
    >
      JOIN TODAY TO UNLOCK THE CODE
    </a>
  </div>
)

export default GitHubMessage
