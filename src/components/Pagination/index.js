import React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'
import Icon from 'components/Icon'
import {paginationWithDots} from './pagination'
import Button from './components/Button'

const Pagination = props => (
  <div className="flex justify-center pv3 pv4-ns">
    <div className="flex">
      <Button
        disabled={props.selectedPage === 1}
        arrow
        onClick={() => props.onPageSelected(props.selectedPage - 1)}
      >
        <Icon
          type="chevron-left"
          name="Previous"
          size="5"
          color={props.selectedPage === 1 ? 'black-10' : 'black'}
        />
      </Button>
      {map(paginationWithDots(props), (page, index) => (
        <Button
          key={index}
          disabled={!page}
          active={props.selectedPage === page}
          onClick={() => props.onPageSelected(page)}
        >
          <div>{page || '...'}</div>
        </Button>
      ))}
      <Button
        disabled={props.selectedPage === props.maxPage}
        arrow
        onClick={() => props.onPageSelected(props.selectedPage + 1)}
      >
        <Icon
          type="chevron-right"
          name="Next"
          size="5"
          color={
            (props.selectedPage === props.maxPage) === 1 ? 'black-10' : 'black'
          }
        />
      </Button>
    </div>
  </div>
)

const odd = (props, propName, componentName) => {
  const value = props[propName]

  if (value) {
    if (value % 2 === 0)
      return new Error(
        `Property ${propName} in ${
          componentName
        } is required to be an ODD number.`,
      )
    return null
  }

  return new Error(`Property ${propName} is required.`)
}

Pagination.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  propName: PropTypes.number,
  // eslint-disable-next-line
  paginatorWidth: odd,
  onPageSelected: PropTypes.func.isRequired,
}

export default Pagination
