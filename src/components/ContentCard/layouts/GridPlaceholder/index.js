import React from 'react'
import Placeholder from 'components/Placeholder'

const GridPlaceholder = () => {
  return (
    <div className="ph3 center eh-mw9">
      <div className="flex flex-wrap justify-center items-center ph2-ns">
        <div
          className="pv2 ph2-ns w-25-l w-50-m w-100 dib"
          style={{maxWidth: '300px'}}
        >
          <Placeholder minHeight="300px" animated />
        </div>
      </div>
    </div>
  )
}

export default GridPlaceholder
