import React from 'react'
import CardGrid2121 from 'components/ContentCard/layouts/CardGrid2121'
import Placeholder from 'components/Placeholder'
import Maybe from 'components/Maybe'
import Request from 'components/Request'
import {get} from 'lodash'
import Waypoint from 'react-waypoint'
import axios from 'axios'

const http = axios.create()

const MIN_COURSES = 2
const MIN_LESSONS = 4

class Featured extends React.Component {
  state = {featuredCourses: [], featuredLessons: []}
  getContent = () => {
    http.get('/api/v1/footer').then(({data}) => {
      const featuredCourses = get(data, 'featured_courses', [])
      const featuredLessons = get(data, 'featured_lessons', [])

      this.setState({featuredCourses, featuredLessons})
    })
  }
  render() {
    const {featuredCourses, featuredLessons} = this.state
    const hasEnoughContent =
      featuredCourses.length >= MIN_COURSES &&
      featuredLessons.length >= MIN_LESSONS

    return (
      <div>
        {hasEnoughContent ? (
          <div>
            <div className="flex flex-column pt4 pt5-ns pb2 pb3-ns">
              <div className="center ph2 ph3-ns eh-mw9">
                <h2 className="f2 avenir fw5 white tc mt0 mb4 mb5-ns">
                  Featured
                </h2>
                <CardGrid2121
                  courses={featuredCourses}
                  lessons={featuredLessons}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center "
            style={{height: '300px'}}
          >
            <Waypoint onEnter={this.getContent} />
            <div className="pa2 w-25-l w-50-m w-100 dib">
              <Placeholder minHeight="200px" animated />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Featured
