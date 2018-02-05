import React from 'react'
import PropTypes from 'prop-types'
import RoutedPagination from 'components/RoutedPagination'
import ContentList from 'components/ContentList'

const RoutedPaginatedContentList = ({
  total,
  pageSize,
  content_list,
  currentPage,
  requestNextPage,
}) => {
  const maxPage = Math.floor((total - 1) / pageSize) + 1

  return (
    <div className="w-100 ph3-ns">
      <div className="mb4">
        <ContentList content_list={content_list} />
      </div>
      {maxPage > 1 && (
        <RoutedPagination
          paginatorWidth={6}
          selectedPage={currentPage}
          maxPage={maxPage}
          onPageSelected={page => {
            if (currentPage !== page) {
              requestNextPage(page)
            }
          }}
        />
      )}
    </div>
  )
}

RoutedPaginatedContentList.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  requestNextPage: PropTypes.func,
  content_list: PropTypes.array,
}

export default RoutedPaginatedContentList
