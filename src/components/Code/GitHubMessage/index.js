import React from 'react'
import PropTypes from 'prop-types'
import css from './index.scss'
import ExternalTrackingLink from 'components/ExternalTrackingLink'
import GithubLogo from './components/GithubLogo'

const GitHubMessage = ({user, repo, branch, lessonSlug}) => {
  let url,
    message = `FIND THE CODE ON GITHUB`

  if (branch) {
    url = `https://github.com/${
      user ? user : 'eggheadio'
    }/${repo}/tree/${branch}`
  } else {
    url = `https://github.com/${user ? user : 'eggheadio'}/${repo}`
  }

  return (
    <div className={`tc avenir ${css.gitHubMessage}`}>
      <GithubLogo />
      <h3 className="mb3">
        Find the code for this lesson on{' '}
        <ExternalTrackingLink
          track="clicked github link"
          trackParams={{
            lesson: lessonSlug,
          }}
          href={url}
          target="_blank"
        >
          Github
        </ExternalTrackingLink>
      </h3>
      <p className="i mb5 dn-m">The branch name corresponds to the lesson.</p>
      <ExternalTrackingLink
        track="clicked github link"
        trackParams={{
          lesson: lessonSlug,
        }}
        href={url}
        className={`br-pill bg-blue no-underline white b inline-block dn-m ${
          css.button
        }`}
        target="_blank"
      >
        {message}
      </ExternalTrackingLink>
    </div>
  )
}

export default GitHubMessage
