import React from 'react'
import css from './index.scss'
import Icon from 'components/Icon'
import Analytics from 'components/Analytics'

let inputStyles = 'white b--white-40 focus-b-white-40 bg-transparent'
const commonClasses = `db w-100 pl3 pl5 pv3 lh-copy br2 ba ${
  css['eh-text-field']
} avenir`

const SearchBar = ({placeholder, rightIcon, location}) => {
  return (
    <Analytics>
      {({analytics}) => (
        <div className={`relative`}>
          <input
            type="text"
            placeholder={placeholder}
            onKeyPress={e => {
              const term = e.target.value
              if (e.key === 'Enter' && term) {
                analytics.track(
                  'used search bar',
                  {
                    term,
                    location,
                  },
                  () => {
                    window.location.href = `/search?q=${term}`
                  },
                )
              }
            }}
            className={`${commonClasses} ${inputStyles} ${
              rightIcon ? 'pr5' : 'pr1'
            }`}
          />
          <span className={`absolute white-40 ${css['eh-input-status-icon']}`}>
            <Icon type="search" color="white-40" />
          </span>
          <span
            className={`absolute white-40 ${css['eh-input-status-icon-right']}`}
          >
            {rightIcon}
          </span>
        </div>
      )}
    </Analytics>
  )
}

export default SearchBar
