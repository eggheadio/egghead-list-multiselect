import React from 'react'
import CardGrid22 from 'components/ContentCard/layouts/CardGrid22'
import ContentList from 'components/ContentList'
import Button from 'components/Button'
import ExternalTrackingLink from 'components/ExternalTrackingLink'
import Dots from 'components/Loading/Dots'
import {isEmpty} from 'lodash'
import Waypoint from 'react-waypoint'
import axios from 'axios'

const http = axios.create()

export class WhatsNew extends React.Component {
  state = {
    series_list: [],
    lessons_list: [],
  }

  getContent() {
    this.fetchSeries()
    this.fetchLessons()
  }

  fetchSeries() {
    http
      .get(
        `/api/v1/series?state=published&load_lessons=false&sort=-published_at`,
      )
      .then(response => {
        this.setState({
          series_list: response.data,
        })
      })
  }

  fetchLessons() {
    http
      .get(`/api/v1/lessons?state=published&sort=-published_at`)
      .then(response => {
        this.setState({
          lessons_list: response.data.slice(0, 6),
        })
      })
  }

  render() {
    const {series_list, lessons_list} = this.state

    return (
      <div className="center bg-gray pb5">
        <Waypoint onEnter={() => this.getContent()} />
        <div className="ph4-l ph1 pv5 eh-mw9 center flex flex-row-l flex-column justify-between items-start-l items-center">
          <div className="flex flex-column items-start-l items-center justify-center avenir">
            <span className="f1-l f3 fw6 avenir base">What&apos;s New</span>
            <span className="f4-l f5 fw5 avenir base o-60 mt2">
              Latest Published Lessons &amp; Courses
            </span>
          </div>
          <div className="mt0 mt3">
            <Button
              outline
              size="medium"
              icon="arrow-right-long"
              color="dark-blue"
              secondaryColor="white"
              targetUrl="/courses"
              trackEventName={`clicked courses`}
            >
              {`Browse all`}
            </Button>
          </div>
        </div>

        <div className="eh-mw9 center flex flex-column flex-row-l w-100 ph3">
          <div className="w-50-l mr3-l pl2-l pt2-l flex-shrink-0">
            {isEmpty(lessons_list) ? (
              <Dots />
            ) : (
              <ContentList content_list={lessons_list} className="br2" />
            )}
          </div>

          <div className="w-50-l pr2-l mt3 mt0-l flex-shrink-0">
            {isEmpty(series_list) ? (
              <Dots />
            ) : (
              <CardGrid22 items={series_list} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export class InProductionContent extends React.Component {
  state = {
    content: [],
  }

  fetchContent() {
    http
      .get(
        `/api/v1/series?with_lessons=true&load_lessons=false&queued=true&size=all`,
      )
      .then(({data}) => {
        this.setState({
          content: data,
        })
      })
  }

  render() {
    const {content} = this.state

    return (
      <div className="pt5 mt0 ph3-ns pv4-ns center bg-base">
        <div className="mt0 mt4-l flex flex-column items-center justify-center avenir tc">
          <span className="f1-l f3 fw6 fw6 mb2 white">Unreleased Courses</span>
          <span className="f6 f5-l fw6 ph3 ph0-ns white o-60">
            There are more courses being created for you.
          </span>
          <span className="f6 f5-l fw6 ph3 ph0-ns white o-60">
            We will let you know as soon as they are complete and ready to
            watch.
          </span>
        </div>

        <div className="flex justify-center items-center w-100 mt5">
          <div className="w-100 w-50-l ph3 ph0-l overflow-hidden br2">
            <Waypoint onEnter={() => this.fetchContent()} />
            {isEmpty(content) ? (
              <Dots />
            ) : (
              <ContentList content_list={content} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
