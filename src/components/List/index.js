import React from 'react'
import PropTypes from 'prop-types'
import {map, keys} from 'lodash'

const paddingClassNameBySize = {
  small: 'pa3',
  medium: 'pa3 pa4-ns',
  large: 'pa3 pa5-ns',
}

export const sizes = keys(paddingClassNameBySize)

const List = ({items, size = 'medium', overDark = false}) => (
  <div>
    {map(items, (item, index) => (
      <div
        key={index}
        className={`
          ${paddingClassNameBySize[size]}
          ${
            index < items.length - 1
              ? overDark ? 'bb b--dark-blue' : 'bb b--gray-secondary'
              : ''
          }
        `}
      >
        {item}
      </div>
    ))}
  </div>
)

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  size: PropTypes.oneOf(sizes),
  overDark: PropTypes.bool,
}

export default List
