import React from 'react'
import css from './index.scss'

const ReversibleToggle = ({options, selected, onClick}) => (
  <div
    className={`flex relative items-center br-pill pointer
      bg-gray-secondary ${selected === 1 ? css.reverse : ''}`}
    onClick={onClick}
  >
    <div className="mh2">{options[1 - selected]}</div>
    <div className="br-pill pa2 man1 bg-green">{options[selected]}</div>
  </div>
)

export default ReversibleToggle
