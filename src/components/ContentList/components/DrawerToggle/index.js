import React from 'react'
import Icon from 'components/Icon'
import css from '../ContentListCard/index.scss'

const DrawerToggle = ({hover, onClickHandler, expanded}) => {
  const arrowRotatedClass = expanded ? css.arrowRotated : ''
  const expandedClass = expanded ? 'bg-white-secondary' : ''

  return (
    <div
      onClick={onClickHandler}
      className={`flex flex-column items-center justify-center center-m w-100 h2 h-100-ns z-5 hover-bg-white-secondary pointer ${
        css.drawerToggle
      } ${expandedClass}`}
    >
      <div className={`${css.arrowHolder} ${arrowRotatedClass}`}>
        <Icon type="arrow-down" color="dark-blue" size="3" />
      </div>
    </div>
  )
}

export default DrawerToggle
