import React from 'react'
import PropTypes from 'prop-types'
import {includes, first} from 'lodash'
import RequestBase from './components/RequestBase'
import Waypoint from 'react-waypoint'

export const methods = ['get', 'post', 'put', 'delete']

class Request extends React.Component {
  state = {canLoad: false}
  render() {
    const {children, ...rest} = this.props
    const {canLoad} = this.state
    return (
      <Waypoint onEnter={() => this.setState({canLoad: true})}>
        {canLoad && (
          <RequestBase {...rest}>
            {({request, running, error, data, response}) => {
              return children({
                request,
                running,
                error,
                data,
                response,
              })
            }}
          </RequestBase>
        )}
      </Waypoint>
    )
  }
}

Request.propTypes = {
  children: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  lazy: PropTypes.bool,
  auth: PropTypes.bool,
  placeholder: PropTypes.node,
  params: PropTypes.object,
  headers: PropTypes.object,
  body: PropTypes.object,
  onResponse: PropTypes.func,
  onData: PropTypes.func,
  onError: PropTypes.func,
  method: PropTypes.oneOf(methods),
  subscribe: PropTypes.bool,
  subscribeInterval: PropTypes.number,
}

Request.defaultProps = {
  method: first(methods),
  subscribe: false,
  auth: false,
  subscribeInterval: 10000,
}

export default Request
