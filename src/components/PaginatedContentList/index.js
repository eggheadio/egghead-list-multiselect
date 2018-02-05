import React from 'react'
import PropTypes from 'prop-types'
import scrollIntoView from 'scroll-into-view'
import Pagination from 'components/Pagination'
import ContentList from 'components/ContentList'

const PaginatedContentList = ({
  total,
  pageSize,
  content_list,
  currentPage,
  requestNextPage,
}) => {
  const scrollToTop = () => {
    scrollIntoView(this._scroller, {
      time: 50,
      align: {
        top: 1,
        topOffset: 80,
      },
    })
  }

  const maxPage = Math.floor((total - 1) / pageSize) + 1
  return (
    <div className="w-100" ref={scroller => (this._scroller = scroller)}>
      <div className="mb4">
        <ContentList content_list={content_list} paginate={true} />
      </div>
      {maxPage > 1 ? (
        <Pagination
          paginatorWidth={5}
          selectedPage={currentPage}
          maxPage={maxPage}
          onPageSelected={page => {
            if (currentPage !== page) {
              requestNextPage(page)
              scrollToTop()
            }
          }}
        />
      ) : null}
    </div>
  )
}

PaginatedContentList.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  requestNextPage: PropTypes.func,
  content_list: PropTypes.array,
}

export default PaginatedContentList
