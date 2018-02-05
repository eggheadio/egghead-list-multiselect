import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {map} from 'lodash'
import Icon from 'components/Icon'
import {paginationWithDots} from './pagination'
import Button from './components/Button'

const RoutedPagination = props => {
  const {selectedPage, maxPage, onPageSelected} = props

  return (
    <div className="flex justify-center pv3 pv4-ns">
      <div className="flex">
        <Link to={{search: `?page=${selectedPage - 1}`}}>
          <Button
            disabled={selectedPage === 1}
            arrow
            onClick={() => onPageSelected(selectedPage - 1)}
          >
            <Icon
              type="chevron-left"
              name="Previous"
              size="5"
              color={selectedPage === 1 ? 'black-10' : 'black'}
            />
          </Button>
        </Link>

        {map(paginationWithDots(props), (page, index) => {
          if (!page) {
            return (
              <div
                key={index}
                className="flex items-center justify-center w2 h2 fw5 black"
              >
                ...
              </div>
            )
          }

          return (
            <Link
              to={{search: `?page=${page}`}}
              style={{textDecoration: 'none'}}
              key={index}
            >
              <Button
                key={index}
                disabled={!page}
                active={selectedPage === page}
                onClick={() => onPageSelected(page)}
              >
                <div>{page}</div>
              </Button>
            </Link>
          )
        })}

        <Link to={{search: `?page=${selectedPage + 1}`}}>
          <Button
            disabled={selectedPage === maxPage}
            arrow
            onClick={() => onPageSelected(selectedPage + 1)}
          >
            <Icon
              type="chevron-right"
              name="Next"
              size="5"
              color={(selectedPage === maxPage) === 1 ? 'black-10' : 'black'}
            />
          </Button>
        </Link>
      </div>
    </div>
  )
}

RoutedPagination.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  propName: PropTypes.number,
  // eslint-disable-next-line
  paginatorWidth: PropTypes.number,
  onPageSelected: PropTypes.func.isRequired,
}

export default RoutedPagination
