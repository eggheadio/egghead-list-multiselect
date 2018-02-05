import React from 'react'
import AsyncDropdown from 'components/AsyncDropdown'
import get from 'lodash/get'

export default class Course extends React.Component {
  render() {
    const {lesson, updateItem, getDataUrl} = this.props
    return (
      <div className={`bg-white mt3 mr3-l br2 w-100`}>
        <label
          className={`flex items-center f4 db bb black-90 b--black-20 pa2 h3`}
        >
          Course
        </label>
        <div className={`pa3`}>
          <AsyncDropdown
            updateItem={series => updateItem({series})}
            getDataUrl={getDataUrl}
            selected={get(lesson, 'series')}
            itemLabelProp="title"
            itemImageUrlProp="square_cover_url"
            placeholder="Search for the Course"
          />
        </div>
      </div>
    )
  }
}
