import {isEmpty, pickBy, identity, keys, includes} from 'lodash'
import humanizeList from 'humanize-list'

const buildCountsString = counts => {
  let countList = []

  includes(keys(counts), 'updated')
    ? countList.push(`${counts['updated']} updated for review`)
    : null
  includes(keys(counts), 'submitted')
    ? countList.push(`${counts['submitted']} submitted for review`)
    : null
  includes(keys(counts), 'rejected')
    ? countList.push(`${counts['rejected']} waiting for changes`)
    : null
  includes(keys(counts), 'approved')
    ? countList.push(`${counts['approved']} approved`)
    : null

  return humanizeList(countList)
}

const lessonSummary = item => {
  if (isEmpty(item.lessons) && !item.lessons_url) {
    return ''
  }

  const rejected = item.rejected_lessons_count
  const updated = item.updated_lessons_count
  const approved = item.approved_lessons_count
  const submitted = item.submitted_lessons_count

  return buildCountsString(
    pickBy(
      {
        rejected,
        approved,
        submitted,
        updated,
      },
      identity,
    ),
  )
}

export default lessonSummary
