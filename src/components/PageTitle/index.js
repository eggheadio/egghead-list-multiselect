import React from 'react'
import {Helmet} from 'react-helmet'
import {get, isString} from 'lodash'
import removeMarkdown from 'remove-markdown'

export default ({title, twitter, description, prepend, contentItem}) => {
  return (
    <Helmet>
      <title itemProp="name" lang="en">{`${prepend ? prepend : ''}${title} ${
        isString(twitter) ? `from @${twitter} ` : ''
      }on @eggheadio`}</title>
      {description &&
        !contentItem && (
          <meta name="description" content={removeMarkdown(description)} />
        )}
      {contentItem && [
        <meta
          name="description"
          content={removeMarkdown(contentItem.summary)}
        />,
        <meta
          property="og:description"
          content={removeMarkdown(contentItem.summary)}
        />,
        <meta
          property="og:image"
          content={contentItem.illustrationUrl || contentItem.smallIconUrl}
        />,
        <meta property="og:title" content={contentItem.title} />,
        <meta property="og:type" content="website" />,
        <meta name="twitter:card" content="product" />,
        <meta name="twitter:site" content="@eggheadio" />,
        <meta
          name="twitter:creator"
          content={`@${contentItem.instructorTwitter}`}
        />,
        <meta name="twitter:title" content={contentItem.title} />,
        <meta name="twitter:url" content={contentItem.contentUrl} />,
        <meta
          name="twitter:description"
          content={removeMarkdown(contentItem.summary)}
        />,
        <meta
          name="twitter:image"
          content={contentItem.illustrationUrl || contentItem.smallIconUrl}
        />,
      ]}
    </Helmet>
  )
}
