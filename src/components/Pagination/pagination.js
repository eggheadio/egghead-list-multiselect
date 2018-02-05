import {range, size, last, first} from 'lodash'

/**
 * This function takes currently selected page, maxPage(i.e. total number of pages)
 * and width for paginator (how much paginator buttons are displayed)
 * and returns array of numbers representing buttons to be displayed by paginator
 */
export const pagination = ({selectedPage, maxPage, paginatorWidth}) => {
  if (maxPage <= paginatorWidth) return range(1, maxPage + 1)
  let result = [selectedPage]
  let cursor = 1
  while (size(result) < paginatorWidth) {
    const leftPage = selectedPage - cursor
    const rightPage = selectedPage + cursor
    if (leftPage >= 1) result = [leftPage, ...result]
    if (rightPage <= maxPage) result = [...result, rightPage]
    cursor += 1
  }
  return result
}

/**
 * Same as pagination, but add null values, representing `...` symbol in pagination
 */
export const paginationWithDots = ({selectedPage, maxPage, paginatorWidth}) => {
  const result = pagination({selectedPage, maxPage, paginatorWidth})
  if (last(result) !== maxPage) {
    result.pop()
    result.pop()
    result.push(null)
    result.push(maxPage)
  }
  if (first(result) !== 1) {
    result.shift()
    result.shift()
    result.unshift(null)
    result.unshift(1)
  }
  return result
}

export default pagination
