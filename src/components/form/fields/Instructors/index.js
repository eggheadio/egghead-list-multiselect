import React from 'react'
import AsyncDropdown from 'components/AsyncDropdown'

export default class Instructors extends React.Component {
  render() {
    const {lesson, updateItem, getDataUrl} = this.props
    return (
      <div className={`bg-white mt3 mr3-l br2 w-100 w-40-l`}>
        <label
          className={`flex items-center f4 db bb black-90 b--black-20 pa2 h3`}
        >
          Instructors
        </label>
        <div className={`pa3`}>
          <AsyncDropdown
            updateItem={instructor => updateItem({instructor})}
            getDataUrl={getDataUrl}
            selected={lesson.instructor}
            itemLabelProp="full_name"
            itemImageUrlProp="avatar_url"
            placeholder="Search for an instructor."
          />
        </div>
      </div>
    )
  }
}
